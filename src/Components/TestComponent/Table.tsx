// Table.tsx
import React, { useState } from 'react';

interface IDataItem {
  id: number;
  name: string;
  age: number;
  // Add more properties if needed
}

interface ITableProps {
  data: IDataItem[];
  itemsPerPage: number;
}

const Table: React.FC<ITableProps> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page: number): void => {
    setCurrentPage(page);
  };

  const renderTableData = (): JSX.Element[] => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item: IDataItem, index: number) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.age}</td>
        {/* Add more columns as needed */}
      </tr>
    ));
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} onClick={() => handleClick(i)} className={currentPage === i ? 'active' : undefined}>
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </div>
  );
};

export default Table;
