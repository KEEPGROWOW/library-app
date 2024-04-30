import { Avatar, Button, Flex, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { BookOutlined } from '@ant-design/icons';
import { addLoan } from '../../../../api/book/book-api';

export const RegisterLoan = () => {
  const initialValues = {
    userName: { value: '', errorText: '※ 대여자명은 필수 입력사항입니다.' },
    bookName: { value: '', errorText: '※ 도서명은 필수 입력사항입니다.' }
  };

  const [values, setValues] = useState(initialValues);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState<'' | 'error' | 'warning' | undefined>('');
  const [bookNameStatus, setBookNameStatus] = useState<'' | 'error' | 'warning' | undefined>('');
  const handleUserNameBlur = () => {
    if (values.userName.value === '') {
      setUserNameStatus('error');
    } else {
      setUserNameStatus('');
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValues({ ...values, userName: { ...values.userName, value: newValue } });
  };

  const handleBookNameBlur = () => {
    if (values.bookName.value === '') {
      setBookNameStatus('error');
    } else {
      setBookNameStatus('');
    }
  };

  const handleBookNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValues({ ...values, bookName: { ...values.bookName, value: newValue } });
  };

  const onSubmit = (data: any) => {
    if (values.userName.value === '') {
      setModalOpen(true);
    } else {
      addLoan(data).then(() => setSuccessModalOpen(true));
    }
  };

  return (
    <>
      <Flex gap="middle" vertical justify={'center'}>
        <Flex justify={'center'} align={'center'} vertical>
          <Avatar size={100} icon={<BookOutlined />} style={{ backgroundColor: '#1677ff', marginBottom: '20px' }} />
          <div
            style={{
              display: 'flex',
              padding: '7px 11px',
              width: '350px',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '20px',
              alignItems: 'center'
            }}
          >
            <span style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'center' }}>이름</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                style={{ width: '250px' }}
                size="large"
                value={values.userName.value}
                placeholder="이름을 입력해주세요"
                onBlur={handleUserNameBlur}
                onChange={handleUserNameChange}
                status={userNameStatus}
              />
              {userNameStatus === 'error' && (
                <span style={{ color: 'red' }}>{userNameStatus === 'error' ? values.userName.errorText : ''}</span>
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '7px 11px',
              width: '350px',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '20px',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '10px', textAlign: 'center' }}>도서명</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                style={{ width: '250px' }}
                size="large"
                placeholder="도서명을 입력해주세요"
                onBlur={handleBookNameBlur}
                onChange={handleBookNameChange}
                status={bookNameStatus}
                value={values.bookName.value}
              />
              {bookNameStatus === 'error' && (
                <span style={{ color: 'red' }}>{bookNameStatus === 'error' ? values.bookName.errorText : ''}</span>
              )}
            </div>
          </div>

          <Button
            type="primary"
            size={'large'}
            onClick={() => {
              onSubmit({ userName: values.userName.value, bookName: values.bookName.value });
            }}
          >
            저장
          </Button>
        </Flex>
      </Flex>

      <Modal
        open={modalOpen}
        okText={'확인'}
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={() => setModalOpen(false)}
        okButtonProps={{ style: { textAlign: 'center' } }}
      >
        <p style={{ textAlign: 'center' }}>필수값을 전부 입력해주세요!!</p>
      </Modal>
      <Modal
        onCancel={() => {
          setSuccessModalOpen(false);
          setValues(initialValues);
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type={'primary'}
              onClick={() => {
                setSuccessModalOpen(false);
                setValues(initialValues);
              }}
            >
              확인
            </Button>
          </div>
        }
        open={successModalOpen}
      >
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>도서가 성공적으로 대여되었습니다!!</p>
      </Modal>
    </>
  );
};
