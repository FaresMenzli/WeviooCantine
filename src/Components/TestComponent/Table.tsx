// Table.tsx
import React, { useEffect, useState } from 'react';
import { User } from '../../Models/User';
import { Dish } from '../../Models/Dish';
import { Trash } from 'react-bootstrap-icons';
import styles from './Table.module.css'


type DataType = User | Dish;
interface ITableProps {
  data: DataType[] ;
  itemsPerPage: number;
}

const Table: React.FC<ITableProps> = ({ data, itemsPerPage }) => {
  useEffect(() => {
    console.log((typeof(data[0])))
  }, [])
  
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page: number): void => {
    setCurrentPage(page);
  };
  const handleNextPage = (): void => {
    if (currentPage!=totalPages)
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = (): void => {
    if (currentPage!=1)
    setCurrentPage(currentPage - 1);
  };

  const renderTableData = (): JSX.Element[] => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item: DataType, index: number) => (
      <tr className='text-center ' key={index}>
        <td>{'userId' in item ? (item as User).userId : (item as Dish).dishId}</td>
        <td>{'userFirstName' in item ? (item as User).userFirstName : (item as Dish).dishName}</td>
        <td>{'userLastName' in item ? (item as User).userLastName : (item as Dish).dishPrice}</td>
        <td>{'userEmail' in item ? (item as User).userEmail : (item as Dish).dishCategory}</td>
        <td>   <Trash color="red" className="clickable"></Trash></td>
        

      </tr>
    ));
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    pageNumbers.push(<li onClick={handlePrevPage} className={`me-1 ${currentPage === 1 ? 'transparent':'clickable'}`}>&laquo;</li>)
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li  key={i} onClick={() => handleClick(i)} className={`clickable me-1 ${currentPage === i ? 'active ' : ''}` }>
          {i}
        </li>
      );
    }
    pageNumbers.push(<li onClick={handleNextPage} className={`  ${currentPage === totalPages ? 'transparent':'clickable'}`}>&raquo;</li>);
    return pageNumbers;
  };

  return (
    <div className='mb-5'>
      <table className={`${'userId' in data[0] ? 'userListTable' : 'dishListTable'}`}>
        <thead >
          <tr >
            <th className='white textShadow'>ID</th>
            <th>{'userId' in data[0] ? 'First Name' : 'DishName'}</th>
            <th>{'userId' in data[0]  ? 'Last Name' : 'Dish Price'}</th>
            <th>{'userId' in data[0] ? 'Email' : 'Dish Category'}</th>
            <th>{'userId' in data[0]  ? 'Delete' : 'Delete'}</th>
            {/* <th>{'userId' in data[0] ? 'Update Role' : ''}</th> */}
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
        <tfoot className='text-center'>
        <tr >
            <th>ID</th>
            <th>{'userId' in data[0] ? 'First Name' : 'DishName'}</th>
            <th>{'userId' in data[0]  ? 'Last Name' : 'Dish Price'}</th>
            <th>{'userId' in data[0] ? 'Email' : 'Dish Category'}</th>
            <th>{'userId' in data[0]  ? 'Delete' : 'Delete'}</th>
           {/*  <th>{'userId' in data[0] ? 'Update Role' : ''}</th> */}
          </tr>
        </tfoot>
      </table>
      <ul className={`${styles.pagination} mb-5 mt-3 white bg-dark fw-bold `}>{renderPageNumbers()}</ul>
    </div>
  );
};

export default Table;
