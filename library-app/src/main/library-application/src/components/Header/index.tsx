import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

export const MainHeader: React.FC = () => {
  const routerLocation = useLocation();
  const [activeIndex, setActiveIndex] = useState('');

  // URL이 변경될 때마다 활성화된 메뉴를 찾아서 설정
  useEffect(() => {
    // 현재 URL
    const currentUrl = routerLocation.pathname;
    // items 배열에서 현재 URL에 해당하는 키를 찾기
    const activeItem = items.find(item => currentUrl.includes(item.url));
    // 해당 키를 찾았다면 해당 키를 activeIndex로 설정
    if (activeItem) {
      setActiveIndex(activeItem.key);
    }
  }, [routerLocation.pathname]);

  const items = [
    {
      key: '1',
      label: '등록하기',
      url: '/register'
    },
    {
      key: '2',
      label: '목록',
      url: '/list'
    },
    {
      key: '3',
      label: '대출/반납 내역',
      url: '/history'
    },
    {
      key: '4',
      label: '대출/반납하기',
      url: '/loan'
    },
    {
      key: '5',
      label: '통계',
      url: '/statistic'
    }
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeIndex]} // 메뉴 활성화를 위해 selectedKeys를 사용합니다.
        style={{ fontSize: '18px', flex: 1, minWidth: 0 }}
      >
        {items.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.url}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};
