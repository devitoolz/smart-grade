import React from 'react';
import { TableBody, TableHead, TableContainer, Pagination } from '../styles/TableStyle';
import { useSearchParams } from 'react-router-dom';

const Table = ({ header, data, children }) => {
  const width = header.map(item => item.width + 'fr').join(' ');

  const [query, setQuery] = useSearchParams();
  const test = () => {
    query.set('page', 1);
    setQuery(query);
  };

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
      <Pagination>
        <button onClick={test}>Test</button>
      </Pagination>
    </>
  );
};

export default Table;
