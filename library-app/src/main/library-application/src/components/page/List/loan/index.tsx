import React from 'react';
import { Avatar, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookOutlined, UserAddOutlined } from '@ant-design/icons';
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import KeyboardReturnSharpIcon from '@mui/icons-material/KeyboardReturnSharp';
import styled from 'styled-components';
import { StyledCard } from '../../../../styles/common';

export const LoanList = () => {
  const navigate = useNavigate();

  // 호버 시 변경될 테두리 색상

  return (
    <Flex gap="middle" justify={'space-evenly'} align={'flex-start'}>
      <div>
        <StyledCard
          styles={{ header: { borderBottom: 0, height: '300px' } }}
          onClick={() => navigate('/book/loan')}
          title={
            <Avatar
              className={'avatar-user'}
              style={{ width: '100px', height: '100px' }}
              size={'large'}
              icon={<LibraryBooksSharpIcon className={'avatar-icon'} />}
            />
          }
          bordered={true}
        >
          <p>대출하기</p>
        </StyledCard>
      </div>
      <div>
        <StyledCard
          styles={{ header: { borderBottom: 0, height: '300px' } }}
          onClick={() => navigate('/return/loan')}
          title={
            <Avatar
              className={'avatar-book'}
              style={{ width: '100px', height: '100px' }}
              size={'large'}
              icon={<KeyboardReturnSharpIcon className={'avatar-icon'} />}
            />
          }
          bordered={true}
        >
          <p style={{ fontWeight: 'bold' }}>반납하기</p>
        </StyledCard>
      </div>

      {/*<RegisterUser />*/}
      {/*<RegisterBook />*/}
    </Flex>
    // <div>
    //   <RegisterUser />
    //   <RegisterBook />
    // </div>
  );
};
