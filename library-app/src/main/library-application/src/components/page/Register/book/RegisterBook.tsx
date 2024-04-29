import { Avatar, Breadcrumb, Button, Dropdown, Flex, Input, MenuProps, Modal, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { BookOutlined, DownOutlined, FieldNumberOutlined, UserOutlined } from '@ant-design/icons';
import { addBook } from '../../../../api/book/book-api';
import { items } from '../../../../data/data';

export const RegisterBook = () => {
  const [bookNameStatus, setBookNameStatus] = useState<'' | 'error' | 'warning' | undefined>('');
  const [bookClassificationStatus, setBookClassificationStatus] = useState<'' | 'error' | 'warning' | undefined>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const initialValues = {
    bookName: { value: '', errorText: '※ 도서명은 필수 입력사항입니다.' },
    bookClassification: { value: '', errorText: '※ 분류는 필수 입력사항입니다.' }
  };

  const [values, setValues] = useState(initialValues);

  const handleBookNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setBookNameStatus(newValue === '' ? 'error' : '');
    setValues({ ...values, bookName: { ...values.bookName, value: newValue } });
  };
  const handleBookNameBlur = () => {
    if (values.bookName.value === '') {
      setBookNameStatus('error');
    } else {
      setBookNameStatus('');
    }
  };

  const handleClassificationChange = (value: string) => {
    setBookClassificationStatus(value === '' ? 'error' : '');
    setValues({ ...values, bookClassification: { ...values.bookClassification, value: value } });
  };

  const handleBookClassificationBlur = () => {
    if (values.bookClassification.value === '') {
      setBookClassificationStatus('error');
    } else {
      setBookClassificationStatus('');
    }
  };

  const onSubmit = (data: { name: string; type: string }) => {
    if (values.bookName.value === '' || values.bookClassification.value === '') {
      setModalOpen(true);
    } else {
      addBook(data).then(() => setSuccessModalOpen(true));
    }
  };

  const selectedType = items.find(i => i.label === values.bookClassification.value)?.value || '';

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
            <span style={{ marginRight: '10px', textAlign: 'center' }}>도서명</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                style={{ width: '250px' }}
                size="large"
                placeholder="도서명을 입력해주세요"
                onChange={handleBookNameChange}
                onBlur={handleBookNameBlur}
                name={'bookName'}
                status={bookNameStatus}
                value={values.bookName.value}
              />
              {bookNameStatus === 'error' && (
                <span style={{ color: 'red' }}>{bookNameStatus === 'error' ? values.bookName.errorText : ''}</span>
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
            <span style={{ marginRight: '10px', minWidth: '42px', textAlign: 'center' }}>분류</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Select
                placeholder="분류를 선택해주세요"
                size={'large'}
                onChange={handleClassificationChange}
                style={{ width: 250 }}
                options={items}
                onBlur={handleBookClassificationBlur}
                status={bookClassificationStatus}
                value={values.bookClassification.value}
              />
              {bookClassificationStatus === 'error' && (
                <span style={{ color: 'red' }}>
                  {bookClassificationStatus === 'error' ? values.bookClassification.errorText : ''}
                </span>
              )}
            </div>
          </div>
          <Button
            type="primary"
            size={'large'}
            onClick={() =>
              onSubmit({
                name: values.bookName.value,
                type: values.bookClassification.value
              })
            }
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
        okButtonProps={{ style: { textAlign: 'center' } }}
      >
        <p style={{ textAlign: 'center' }}>책이 성공적으로 등록되었습니다!!</p>
      </Modal>
    </>
  );
};
