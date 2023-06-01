import { FC, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { CSVDataPreview } from './CSVDataPreview';
import { UploadCSV } from './UploadCSV';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Prediction } from '../interfaces';
import { PreviewModal } from './PreviewModal';

export const BADGE_COLOR: { [key: string]: string } = {
  COMPLETED: 'badge-success',
  PROCESSING: 'badge-warning',
  FAILED_TO_UPLOAD: 'badge-error',
  FAILED_TO_PROCESS: 'badge-error',
  PENDING: 'badge-primary',
  UPLOADED: 'badge-secondary',
};

export const STATUS_MAP: { [key: string]: string } = {
  COMPLETED: 'Completed',
  PROCESSING: 'Processing',
  FAILED_TO_UPLOAD: 'Failed to Upload',
  FAILED_TO_PROCESS: 'Failed to Process',
  PENDING: 'Pending',
  UPLOADED: 'Uploaded',
};

export const UploadHistory: FC<{
  onOpen: (previewData: string[][], id: string, filename: string) => void;
  download: (id: string, realFilename: string) => void;
}> = ({ onOpen, download }) => {
  const [data, setData] = useState<Prediction[]>([]);
  const [deleteId, setDeleteId] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const api = useAxiosPrivate();

  const onDelete = async (id: string) => {
    try {
      setDeleteId(id);
      await api.delete(`/predictions/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
    } finally {
      setDeleteId('');
    }
  };

  const getData = async () => {
    try {
      setIsFetching(true);
      const { data } = await api.get('/predictions');
      const histories = data.data;

      setData(histories);
    } catch (err) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex w-full mb-2">
        <button
          className={`btn btn-info ${isFetching ? 'loading' : ''}`}
          onClick={getData}
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>File Name</th>
              <th>Uploaded At</th>
              <th>Status</th>
              <th>Result</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map((history, idx) => {
              const formattedDate = new Date(history.createdAt).toLocaleString(
                'en-US',
                {
                  timeStyle: 'short',
                  dateStyle: 'long',
                }
              );
              const no = idx + 1;
              const hasResult = !!history.outKey;
              const status = STATUS_MAP[history.status];
              const badgeColor = BADGE_COLOR[history.status];
              const isDeleting = history.id === deleteId;

              let failedResultTxt = 'Processing';

              if (history.status.includes('FAILED')) {
                failedResultTxt = 'Failed';
              }

              const err = history.errorMsg;

              return (
                <tr key={history.id} className="hover">
                  <td>{no}</td>
                  <td>{history.filename}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <div className={`${err ? 'tooltip' : ''}`} data-tip={err}>
                      <span className={`badge ${badgeColor}`}>{status}</span>
                    </div>
                  </td>
                  <td className="flex flex-col">
                    <button
                      className={`
                    btn btn-accent
                    ${hasResult ? '' : 'btn-disabled cursor-not-allowed'}
                    ${err ? 'tooltip' : ''}
                  `}
                      data-tip={err}
                      onClick={() => download(history.id, history.filename)}
                    >
                      {hasResult ? 'Download' : failedResultTxt}
                    </button>

                    {hasResult && (
                      <button
                        className="btn btn-secondary my-2"
                        onClick={() =>
                          onOpen(
                            history.previewResult,
                            history.id,
                            history.filename
                          )
                        }
                      >
                        Preview
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => onDelete(history.id)}
                      className={`w-full btn btn-error ${
                        isDeleting ? 'loading' : ''
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const Main: FC = () => {
  const api = useAxiosPrivate();
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [isUploadActive, setIsUploadActive] = useState(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreviewData, setCsvPreviewData] = useState<string[][]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [downloadData, setDownloadData] = useState({
    filename: '',
    id: '',
  });

  const onOpenRow = (previewData: string[][], id: string, filename: string) => {
    setCsvPreviewData(previewData);
    setDownloadData({
      filename,
      id,
    });
    setIsPreviewModalOpen(true);
  };

  const onClose = () => {
    setIsPreviewModalOpen(false);
    setCsvPreviewData([]);
    setDownloadData({
      filename: '',
      id: '',
    });
  };

  const download = async (id: string, realFilename: string) => {
    const res = await api.get(`/download/${id}`, { responseType: 'blob' });
    const filename = `result_${realFilename}`;

    const href = window.URL.createObjectURL(res.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', filename); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const onDownload = async () => {
    await download(downloadData.id, downloadData.filename);
  };

  return (
    <>
      <Navbar />
      <main className="w-full h-full flex flex-col items-center mt-32 flex-1 sm:px-10 px-5 pb-5">
        <PreviewModal
          isOpen={isPreviewModalOpen}
          onClose={onClose}
          csvData={csvPreviewData}
          onDownload={onDownload}
        />
        <div className="tabs mb-5">
          <a
            className={`
            tab tab-bordered ${isUploadActive ? 'tab-active' : ''}
          `}
            onClick={() => setIsUploadActive(true)}
          >
            Upload CSV
          </a>
          <a
            className={`
            tab tab-bordered ${isUploadActive ? '' : 'tab-active'}
          `}
            onClick={() => setIsUploadActive(false)}
          >
            History
          </a>
        </div>
        <section className="flex w-full h-full flex-col items-center mt-5">
          {isUploadActive && (
            <>
              <UploadCSV
                setCsvData={setCsvData}
                setCsvFile={setCsvFile}
                csvFile={csvFile}
              />
              <CSVDataPreview csvData={csvData} />
            </>
          )}

          {!isUploadActive && (
            <UploadHistory onOpen={onOpenRow} download={download} />
          )}
        </section>
      </main>
    </>
  );
};
