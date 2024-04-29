import { Avatar, Button, Flex, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { addUser } from '../../../../api/user/user-api';

export const RegisterUser = () => {
  const initialValues = {
    userName: { value: '', errorText: '※ 이름은 필수 입력사항입니다.' },
    userAge: { value: '', errorText: '' }
  };

  const [values, setValues] = useState(initialValues);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState<'' | 'error' | 'warning' | undefined>('');

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

  const handleUserAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValues({ ...values, userAge: { ...values.userAge, value: newValue } });
  };

  const onSubmit = (data: any) => {
    if (values.userName.value === '') {
      setModalOpen(true);
    } else {
      addUser(data).then(() => setSuccessModalOpen(true));
    }
  };

  return (
    <>
      <Flex gap="middle" vertical justify={'center'}>
        <Flex justify={'center'} align={'center'} vertical>
          <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#1677ff', marginBottom: '20px' }} />
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
            <span style={{ marginRight: '10px', textAlign: 'center' }}>이름</span>
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
            <span style={{ marginRight: '10px', textAlign: 'center' }}>나이</span>

            <Input
              style={{ width: '250px' }}
              size="large"
              placeholder="나이를 입력해주세요"
              onChange={handleUserAgeChange}
              value={values.userAge.value}
            />
          </div>

          <Button
            type="primary"
            size={'large'}
            onClick={() => {
              onSubmit({ name: values.userName.value, age: values.userAge.value });
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
        okText={'확인'}
        width={350}
        open={successModalOpen}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                setSuccessModalOpen(false);
                setValues(initialValues);
              }}
              type={'primary'}
              style={{ textAlign: 'center' }}
            >
              확인
            </Button>
          </div>
        }
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p style={{ textAlign: 'center' }}>사용자가 성공적으로 등록되었습니다!!</p>
      </Modal>
    </>
  );
};
