import React, { useEffect, useState } from 'react';
import {
  TableBody,
  TableHead,
  TableContainer,
  Pagination,
  PageButton,
  PrevNextButton,
  TableNoData,
} from '../styles/TableStyle';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const Table = ({ header, data, children, hasPage, maxPage }) => {
  const width = header?.map(item => item.width + 'fr').join(' ');

  const [query, setQuery] = useSearchParams();
  const currentPage = query.get('page') ? parseInt(query.get('page')) : 1;
  const [listIndex, setListIndex] = useState(0);
  const maxListIndex = Math.ceil(maxPage / 5) - 1;

  const [pageList, setPageList] = useState([]);

  const makePageList = () => {
    const startIndex = (listIndex + 1) * 5 - 4;
    let length;
    if (maxListIndex === listIndex) {
      length = maxPage % 5 === 0 ? 5 : maxPage % 5;
    } else if (listIndex < maxListIndex) {
      length = 5;
    }
    const list = Array(length)
      .fill()
      .map((_, index) => startIndex + index);
    setPageList(list);
  };

  useEffect(() => {
    makePageList();
  }, [listIndex]);

  useEffect(() => {
    setListIndex(parseInt((currentPage - 1) / 5));
  }, [query]);

  const movePage = num => {
    query.set('page', num);
    setQuery(query);
  };

  const prevPage = () => {
    if (currentPage == 1) return;
    query.set('page', currentPage - 1);
    setQuery(query);
  };

  const nextPage = () => {
    if (currentPage == maxPage) return;
    query.set('page', currentPage + 1);
    setQuery(query);
  };

  return (
    <>
      <TableContainer>
        {data && header ? (
          <>
            <TableHead template={width}>
              {header?.map((item, index) => (
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
          </>
        ) : (
          <TableNoData>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>데이터를 불러오지 못했습니다.</span>
          </TableNoData>
        )}
      </TableContainer>
      {hasPage && (
        <Pagination>
          <PrevNextButton onClick={prevPage} isFirst={currentPage === 1 ? true : false}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </PrevNextButton>
          {pageList.map(page => {
            const isCurrent = parseInt(currentPage) === page;
            return (
              <PageButton
                onClick={() => movePage(page)}
                key={page}
                isCurrent={!currentPage && page === 1 ? true : isCurrent}
              >
                {page}
              </PageButton>
            );
          })}
          <PrevNextButton onClick={nextPage} isLast={currentPage === maxPage ? true : false}>
            <FontAwesomeIcon icon={faChevronRight} />
          </PrevNextButton>
        </Pagination>
      )}
    </>
  );
};

export default Table;
