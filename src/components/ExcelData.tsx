import React from 'react';
import { ExcelDataProps, ObjectType } from '../types/components';
import { ExcelDataLayout } from '../styles/ExcelDataStyle';
import { ModalStyle } from '../styles/MyStyleCSS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import CommonButton from './CommonButton';
import api from '../apis/api';

const ExcelData = ({
  excelDataHeader,
  excelData,
  setExcelData,
  excelDataHasError,
  setExcelDataHasError,
  viewData,
  postData,
}: ExcelDataProps) => {
  const template = excelDataHeader?.map(item => item.width + 'fr').join(' ');

  const handleSubmit = () => {
    const payloadList = excelData.map(data => {
      let payload: ObjectType = {};
      postData.forEach(key => {
        if (key in data) {
          payload[key] = data[key];
        }
      });
      return payload;
    });

    if (excelDataHasError) {
      alert('양식을 형식에 맞게 수정 후 다시 시도해주세요.');
      return;
    }
  };

  const handleCancel = () => {
    setExcelData(null);
    setExcelDataHasError(false);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 'auto', width: '800px' }}>
        <div className="modal-title-small">
          <div>일괄 계정 생성</div>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <div className="modal-contents">
          <ExcelDataLayout template={template}>
            <div className="excel-table-header">
              {excelDataHeader?.map(item => <div key={item.title}>{item.title}</div>)}
            </div>
            <div className="excel-table-body">
              {excelData?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="excel-table-content">
                    {viewData.map((key, index) => {
                      return (
                        <div key={`${key}-${index}`}>
                          {item[key] === 'M' ? '남' : item[key] === 'F' ? '여' : item[key]}
                        </div>
                      );
                    })}
                    {item.error && (
                      <div className="excel-table-content-error">
                        <span>
                          <FontAwesomeIcon icon={faTriangleExclamation} />
                          {item.error}
                        </span>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
              {excelData?.length <= 7 &&
                Array(7 - (excelData?.length ?? 0))
                  .fill('')
                  .map((_, index) => (
                    <div key={index} className="excel-table-content">
                      {excelData?.map((_, index) => <div key={index}></div>)}
                    </div>
                  ))}
            </div>
          </ExcelDataLayout>
        </div>
        <div className="modal-footer">
          <CommonButton value="생성" onClick={handleSubmit} btnType="modal" />
          <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default ExcelData;
