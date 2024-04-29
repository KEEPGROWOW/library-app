import { Empty, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getBookStatistics } from '../../../../api/book/book-api';
import { AlignType, BookClassification } from '../../../../types/types';

export const StatisticList = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getBookStatistics();
      setData(result);
    };
    fetchData();
  }, []);

  const dataSource =
    data.length > 0 &&
    data.map((d: { type: string; count: number }) => {
      return { type: BookClassification[d.type].label || '', count: d.count };
    });

  const columns = [
    { title: '등록된 책 분류', dataIndex: 'type', width: '60%', align: 'center' as typeof AlignType },
    { title: '총 권 수', dataIndex: 'count', width: '40%', align: 'center' as typeof AlignType }
  ];

  return (
    <Table
      pagination={false}
      locale={{
        emptyText: (
          <Empty
            description="저장된 통계가 없습니다"
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            style={{ padding: '20px' }}
          />
        )
      }}
      dataSource={dataSource}
      columns={columns}
    ></Table>
  );
};
