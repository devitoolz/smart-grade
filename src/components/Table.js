import React from 'react';
import { TableBody, TableHead, TableContainer, Pagination } from '../styles/TableStyle';

const Table = ({ header, data, children }) => {
  const width = header.map(item => item.width + 'fr').join(' ');

  return (
    <>
      <TableContainer>
        <TableHead template={width}>
          {header.map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
        </TableHead>
        <TableBody template={width}>
          {children}
          {Array(10 - data.length)
            .fill()
            .map((_, index) => (
              <div key={index}>
                {Array(header.length)
                  .fill()
                  .map((_, index) => (
                    <div key={index}></div>
                  ))}
              </div>
            ))}
        </TableBody>
      </TableContainer>
      <Pagination>gdgd</Pagination>
    </>
  );
};

export default Table;
