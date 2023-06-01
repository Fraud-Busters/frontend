import { FC } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CSVDataPreview } from './CSVDataPreview';

export const PreviewModal: FC<{
  csvData: string[][];
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}> = ({ csvData, isOpen, onClose, onDownload }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-10">
        <div className="relative my-6 mx-auto w-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-base-300 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Preview Result</h3>

              <AiOutlineCloseCircle
                size={30}
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <CSVDataPreview csvData={csvData} />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
