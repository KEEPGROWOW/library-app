import React, { useEffect } from 'react';
// import './App.css';
// import './global.css';
import { Layout, theme } from 'antd';
import { MainHeader } from './components/Header';
import { Register } from './components/page/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { BreadCrumb } from './components/BreadCrumb';
import { RegisterUser } from './components/page/Register/user/RegisterUser';
import { RegisterBook } from './components/page/Register/book/RegisterBook';
import { UserList } from './components/page/List/user/UserList';
import { List } from './components/page/List';
import { LoadReturnList } from './components/page/List/loan/LoadReturnList';
import { RegisterLoan } from './components/page/Register/loan/RegisterLoan';
import { LoanList } from './components/page/List/loan';
import { RegisterReturn } from './components/page/Register/return/RegisterReturn';
import { BookList } from './components/page/List/book/BookList';
import { StatisticList } from './components/page/List/statistic/StatisticList';

function App() {
  const { Content, Footer } = Layout;

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 300px); /* 화면 높이에서 Header와 Footer의 높이를 뺀 값 */
    background-color: ${props => colorBgContainer};
  `;

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.pathname = '/register';
    }
  }, []);

  return (
    <Router>
      <Layout style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <MainHeader />
        <BreadCrumb />
        <Container>
          <Content style={{ padding: '0 48px', width: '100%', height: '100%', background: colorBgContainer }}>
            <Routes>
              <Route path={'/register'} element={<Register />} />
              <Route path={'/user/register'} element={<RegisterUser />} />
              <Route path={'/book/register'} element={<RegisterBook />} />
              <Route path={'/list'} element={<List />} />
              <Route path={'/user/list'} element={<UserList />} />
              <Route path={'/book/list'} element={<BookList />} />
              <Route path={'/loan'} element={<LoanList />} />
              <Route path={'/book/loan'} element={<RegisterLoan />} />
              <Route path={'/return/loan'} element={<RegisterReturn />} />
              <Route path={'/history'} element={<LoadReturnList />} />
              <Route path={'/statistic'} element={<StatisticList />} />
            </Routes>
          </Content>
        </Container>

        <Footer
          style={{
            textAlign: 'center',
            background: colorBgContainer,
            position: 'fixed',
            bottom: '50px',
            width: '100%'
          }}
        >
          SAYY Design ©{new Date().getFullYear()} Created by SAYY
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
