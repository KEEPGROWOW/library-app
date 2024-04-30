import { Breadcrumb } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const BreadCrumb = () => {
  const routerLocation = useLocation();

  const breadCrumbMenu = [
    {
      firstStep: '등록하기',
      secondStep: '사용자',
      url: '/user/register',
      baseUrl: '/register'
    },
    {
      firstStep: '등록하기',
      secondStep: '도서',
      url: '/book/register',
      baseUrl: '/register'
    },
    {
      firstStep: '목록',
      secondStep: '사용자 목록',
      url: '/user/list',
      baseUrl: '/list'
    },
    {
      firstStep: '목록',
      secondStep: '도서 목록',
      url: '/book/list',
      baseUrl: '/list'
    },
    {
      firstStep: '대출/반납하기',
      secondStep: '대출하기',
      url: '/book/loan',
      baseUrl: '/loan'
    },
    {
      firstStep: '대출/반납하기',
      secondStep: '반납하기',
      url: '/return/loan',
      baseUrl: '/loan'
    },
    {
      firstStep: '대출/내역',
      url: '/history'
    },
    {
      firstStep: '통계',
      url: '/statistic'
    }
  ];

  const exactMenu = breadCrumbMenu.find(b => b.url === routerLocation.pathname);
  return (
    <Breadcrumb style={{ margin: '16px', fontSize: '18px' }} separator=">">
      <Breadcrumb.Item href={exactMenu?.baseUrl}>{exactMenu?.firstStep}</Breadcrumb.Item>
      {exactMenu && exactMenu.secondStep && <Breadcrumb.Item>{exactMenu?.secondStep}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};
