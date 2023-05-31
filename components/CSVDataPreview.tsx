import { FC, useMemo } from 'react';

export const CSVDataPreview: FC<{ csvData: string[][] }> = ({ csvData }) => {
  const displayedData = useMemo(() => csvData.slice(0, 10), [csvData]);
  const isEmpty = !displayedData.length;

  const header = csvData[0];
  const body = csvData.slice(1);

  return (
    <>
      <div className="overflow-x-auto mt-5 w-full">
        {!isEmpty && (
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                {header.map((cell, index) => {
                  return <th key={index}>{cell}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {body.map((row, index) => {
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
