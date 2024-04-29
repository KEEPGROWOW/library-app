import React from 'react';
import { Avatar, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import { StyledCard } from '../../../styles/common';
import BookmarkAddSharpIcon from '@mui/icons-material/BookmarkAddSharp';
export const Register = () => {
  const navigate = useNavigate();

  return (
    <Flex gap="middle" justify={'space-evenly'} align={'flex-start'}>
      <div>
        <StyledCard
          styles={{ header: { borderBottom: 0, height: '300px' } }}
          onClick={() => navigate('/user/register')}
          title={
            <Avatar size={'large'} className={'avatar-user'} icon={<PersonAddSharpIcon className={'avatar-icon'} />} />
          }
          bordered={true}
        >
          <p style={{ fontWeight: 'bold' }}>사용자 등록</p>
        </StyledCard>
      </div>
      <div>
        <StyledCard
          styles={{ header: { borderBottom: 0, height: '300px' } }}
          onClick={() => navigate('/book/register')}
          title={
            <Avatar
              className={'avatar-book'}
              size={'large'}
              icon={<BookmarkAddSharpIcon className={'avatar-icon'} />}
            />
          }
          bordered={true}
        >
          <p style={{ fontWeight: 'bold' }}>도서 등록</p>
        </StyledCard>
      </div>
    </Flex>
  );
};
