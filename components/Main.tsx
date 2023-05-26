import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useLogout } from '../hooks';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export const UploadCSV: FC<{
  setCsvData: Dispatch<SetStateAction<string[][]>>;
  setCsvFile: Dispatch<SetStateAction<File | null>>;
  csvFile: File | null;
}> = ({ setCsvData, csvFile, setCsvFile }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          let rows = text.split('\n');
          rows = rows.filter((row) => row !== '');
          const data = rows.map((row) => row.split(','));
          setCsvData(data);
          setCsvFile(file);
        }
      };

      reader.readAsText(file);
    },
    [setCsvData, setCsvFile]
  );

  const removeFile = () => {
    setCsvData([]);
    setCsvFile(null);
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'text/csv': ['.csv'],
      },
      maxFiles: 1,
    });

  const borderColor = useMemo(() => {
    if (isDragAccept) {
      return '#00e676';
    }

    if (isDragReject) {
      return '#ff1744';
    }

    if (isFocused) {
      return '#2196f3';
    }

    return '#eeeeee';
  }, [isDragAccept, isDragReject, isFocused]);

  return (
    <>
      <section className="flex flex-col justify-center items-center w-3/4 md:w-[480px]">
        <div
          {...getRootProps({
            style: {
              borderColor,
            },
          })}
          className={`border-2 relative rounded-sm border-dashed p-6 cursor-pointer w-full md:h-20 flex flex-col justify-center items-center text-center`}
        >
          <input {...getInputProps()} />
          <p>
            {csvFile
              ? `
                ${csvFile.name} - ${csvFile.size} bytes
              `
              : 'Drag and drop some your csv file here, or click to select files'}
          </p>

          {csvFile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="absolute top-0 right-0 p-1 cursor-pointer hover:bg-gray-200 rounded-full transition duration-300 ease-in-out"
            >
              <AiOutlineCloseCircle size={20} />
            </button>
          )}
        </div>
        <button
          disabled={!csvFile}
          className="btn btn-primary mt-5 px-10 w-full"
        >
          Predict
        </button>
      </section>
    </>
  );
};

const CSVDataPreview: FC<{ csvData: string[][] }> = ({ csvData }) => {
  const displayedData = useMemo(() => csvData.slice(0, 10), [csvData]);
  const isEmpty = !displayedData.length;
  return (
    <>
      <div className="overflow-x-auto">
        {isEmpty && (
          <p className="text-center text-gray-500">No data to display</p>
        )}
        {!isEmpty && (
          <table className="table table-compact w-full">
            <tbody>
              {displayedData.map((row, index) => {
                row = [String(index + 1), ...row];
                return (
                  <tr key={index}>
                    {row.map((cell, index) => {
                      return <td key={index}>{cell}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export const Main: FC = () => {
  const logout = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [isUploadActive, setIsUploadActive] = useState(true);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  return (
    <>
      <nav className="px-10 h-16 top-0 py-10 left-0 w-full">
        <ul className="flex justify-between h-full items-center">
          <li>FB</li>
          <li>
            <button
              className={`btn btn-accent ${
                isLoggingOut ? 'btn-disabled cursor-not-allowed' : ''
              }`}
              disabled={isLoggingOut}
              onClick={() => {
                setIsLoggingOut(true);
                toast
                  .promise(logout(), {
                    loading: 'Logging out...',
                    success: 'Logged out successfully',
                    error: 'Logging out failed',
                  })
                  .finally(() => {
                    setIsLoggingOut(false);
                  });
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* <main className="flex w-full min-h-screen flex-col justify-center items-center"> */}
      <main className="w-full h-full flex flex-col items-center mt-32 flex-1">
        {/* <div className="tabs mb-5 absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}
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
            Preview Data
          </a>
        </div>
        <section className="flex w-full h-full flex-col items-center mt-5 overflow-x-auto">
          {isUploadActive && (
            <UploadCSV
              setCsvData={setCsvData}
              setCsvFile={setCsvFile}
              csvFile={csvFile}
            />
          )}
          {!isUploadActive && <CSVDataPreview csvData={csvData} />}
        </section>
      </main>
    </>
  );
};
