import React from 'react';
import { Avatar, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import { StyledCard } from '../../../styles/common';
import BallotSharpIcon from '@mui/icons-material/BallotSharp';
export const List = () => {
  const navigate = useNavigate();

  return (
    <Flex gap="middle" justify={'space-evenly'} align={'flex-start'}>
      <div>
        <StyledCard
          styles={{ header: { borderBottom: 0, height: '300px' } }}
          onClick={() => navigate('/user/list')}
          title={
            <Avatar className={'avatar-user'} size={'large'} icon={<BallotSharpIcon className={'avatar-icon'} />} />
          }
          bordered={true}
        >
          <p style={{ fontWeight: 'bold' }}>사용자 목록</p>
        </StyledCard>
      </div>
      <div>
        <StyledCard
          styles={{ header: { borderBottom: 0, height: '300px' } }}
          onClick={() => navigate('/book/list')}
          title={
            <Avatar
              className={'avatar-user'}
              size={'large'}
              icon={<LibraryBooksSharpIcon className={'avatar-icon'} />}
            />
          }
          bordered={true}
        >
          <p style={{ fontWeight: 'bold' }}>도서 목록</p>
        </StyledCard>
      </div>
    </Flex>
  );
};
