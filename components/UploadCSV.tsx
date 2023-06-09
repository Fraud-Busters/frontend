import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export const UploadCSV: FC<{
  setCsvData: Dispatch<SetStateAction<string[][]>>;
  setCsvFile: Dispatch<SetStateAction<File | null>>;
  csvFile: File | null;
}> = ({ setCsvData, csvFile, setCsvFile }) => {
  const [isUploading, setIsUploading] = useState(false);
  const api = useAxiosPrivate();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles[0];
      setCsvFile(file);

      // if size > 10 MB whe dont need to show the preview
      if (file.size < 1e7) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const text = e.target?.result;
          if (typeof text === 'string') {
            let rows = text.split('\n');
            rows = rows.filter((row) => row !== '');
            const data = rows.map((row) => row.split(','));
            setCsvData(data);
          }
        };

        reader.readAsText(file);
      }
    },
    [setCsvData, setCsvFile]
  );

  const removeFile = () => {
    setCsvData([]);
    setCsvFile(null);
  };

  const predict = async () => {
    const formData = new FormData();
    formData.append('file', csvFile as Blob);
    setIsUploading(true);
    try {
      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCsvFile(null);
      setCsvData([]);

      toast.success('File uploaded');
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.status;

        if (code === 413) {
          toast.error('File too large');
        } else {
          toast.error('Failed to upload file');
        }
      } else {
        toast.error('Failed to upload file');
      }
    } finally {
      setIsUploading(false);
    }
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
              : 'Drag and drop your csv file here, or click to select file'}
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
          onClick={predict}
          className={`btn btn-primary mt-5 px-10 w-full ${
            isUploading ? 'loading' : ''
          }`}
        >
          Upload
        </button>
      </section>
    </>
  );
};
