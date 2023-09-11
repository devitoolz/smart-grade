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
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { PulseLoader } from 'react-spinners';
import { TableProps } from '../types/components';

const Table = ({
  header,
  data,
  children,
  hasPage,
  maxPage,
  pending,
  error,
  dashboard,
}: TableProps) => {
  const width = header?.map(item => item.width + 'fr').join(' ');

  const [query, setQuery] = useSearchParams();
  const currentPage = query.get('page') ? parseInt(query.get('page') as string) : 1;
  const [listIndex, setListIndex] = useState<number>(0);

  const [pageList, setPageList] = useState<Array<number>>([1]);

  if (maxPage) {
    maxPage === -1 ? (maxPage = 1) : (maxPage += 1);
  }

  useEffect(() => {
    if (maxPage) {
      const maxListIndex = Math.ceil(maxPage / 5) - 1;
      const startIndex = (listIndex + 1) * 5 - 4;
      let length: number = 0;
      if (maxListIndex === listIndex) {
        length = maxPage % 5 === 0 ? 5 : maxPage % 5;
      } else if (listIndex < maxListIndex) {
        length = 5;
      }
      const list = Array(length)
        .fill('')
        .map((_, index) => startIndex + index);
      setPageList(list);
    }
  }, [maxPage, listIndex]);

  useEffect(() => {
    setListIndex(Math.floor((currentPage - 1) / 5));
  }, [query]);

  const movePage = (num: number) => {
    query.set('page', num.toString());
    setQuery(query);
  };

  const prevPage = () => {
    if (currentPage == 1) return;
    query.set('page', (currentPage - 1).toString());
    setQuery(query);
  };

  const nextPage = () => {
    if (currentPage == maxPage) return;
    query.set('page', (currentPage + 1).toString());
    setQuery(query);
  };

  return (
    <TableLayout dashboard={dashboard}>
      <TableContainer>
        {header ? (
          <TableHead template={width}>
            {header.map((item, index) => (
              <div key={index}>{item.title}</div>
            ))}
          </TableHead>
        ) : null}
        {pending ? (
          <TableBody template={width}>
            <div className="table-loading">
              <PulseLoader color="#47b5ff" margin={6} size={12} speedMultiplier={0.7} />
              <span>로딩 중...</span>
            </div>
            {Array(dashboard ? 9 : 10)
              .fill('')
              .map((_, index) => (
                <div key={index}>
                  {Array(header?.length)
                    .fill('')
                    .map((_, index) => (
                      <div key={index}></div>
                    ))}
                </div>
              ))}
          </TableBody>
        ) : data && header ? (
          <>
            <TableBody template={width}>
              {children}
              {Array((dashboard ? 9 : 10) - data.length)
                .fill('')
                .map((_, index) => (
                  <div key={index}>
                    {Array(header.length)
                      .fill('')
                      .map((_, index) => (
                        <div key={index}></div>
                      ))}
                  </div>
                ))}
            </TableBody>
          </>
        ) : error ? (
          <TableNoData>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>데이터를 불러오지 못했습니다.</span>
          </TableNoData>
        ) : null}
      </TableContainer>
      {data && hasPage && (
        <Pagination>
          {maxPage ? (
            <PrevNextButton onClick={prevPage} isFirst={currentPage === 1 ? true : false}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </PrevNextButton>
          ) : null}
          {pageList.map(page => {
            const isCurrent = currentPage === page;
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
          {maxPage ? (
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
