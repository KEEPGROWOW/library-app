import { Empty, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { loanReturnHistory } from '../../../../api/book/book-api';
import { AlignType } from '../../../../types/types';

export const LoadReturnList = () => {
  const [data, setData] = useState<any>([]);

  const dataSources: any[] = [];
  data.forEach((user: any) => {
    user.books.forEach((book: any) => {
      const bookName = book.name || '';
      const isReturn = book.isReturn ? '반납완료' : '대출중';
      dataSources.push({
        name: user.name,
        bookName: bookName,
        isReturn: isReturn
      });
    });
  });

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      width: '40%',
      ellipsis: true,
      align: 'center' as typeof AlignType
    },
    {
      title: '책이름',
      dataIndex: 'bookName',
      width: '30%', // 전체 너비의 30%,
      align: 'center' as typeof AlignType
    },
    {
      title: '대여상태',
      dataIndex: 'isReturn',
      align: 'center' as typeof AlignType,
      width: '30%'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await loanReturnHistory();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      {
        <Table
          dataSource={dataSources}
          locale={{
            emptyText: (
              <Empty
                description="대출 / 반납 내역이 없습니다"
                style={{ padding: '20px' }}
                image={Empty.PRESENTED_IMAGE_DEFAULT}
              />
            )
          }}
          pagination={false}
          columns={columns}
        />
      }
    </>
  );
};
