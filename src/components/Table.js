import React, { useEffect, useState } from 'react';
import {
  TableBody,
  TableHead,
  TableContainer,
  Pagination,
  PageButton,
  PrevNextButton,
  TableNoData,
  TableLayout,
} from '../styles/TableStyle';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const Table = ({ header, data, children, hasPage, maxPage, pending }) => {
  const width = header?.map(item => item.width + 'fr').join(' ');

  const [query, setQuery] = useSearchParams();
  const currentPage = query.get('page') ? parseInt(query.get('page')) : 1;
  const [listIndex, setListIndex] = useState(0);

  const [pageList, setPageList] = useState([1]);

  useEffect(() => {
    if (maxPage) {
      const maxListIndex = Math.ceil(maxPage / 5) - 1;
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
    }
  }, [maxPage, listIndex]);

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
    <TableLayout>
      <TableContainer>
        {header ? (
          <TableHead template={width}>
            {header?.map((item, index) => (
              <div key={index}>{item.title}</div>
            ))}
          </TableHead>
        ) : null}
        {pending ? (
          <TableNoData>
            <FontAwesomeIcon icon={faSpinner} />
            <span>로딩 중</span>
          </TableNoData>
        ) : data && header ? (
          <>
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
      {data && hasPage && (
        <Pagination>
          {maxPage !== 0 ? (
            <PrevNextButton onClick={prevPage} isFirst={currentPage === 1 ? true : false}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </PrevNextButton>
          ) : null}
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
          {maxPage !== 0 ? (
            <PrevNextButton onClick={nextPage} isLast={currentPage === maxPage ? true : false}>
              <FontAwesomeIcon icon={faChevronRight} />
            </PrevNextButton>
          ) : null}
        </Pagination>
      )}
    </TableLayout>
  );
};

export default Table;
