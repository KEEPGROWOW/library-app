import { deleteUser, getUserList, updateUser } from '../../../../api/user/user-api';
import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, Modal, Space, Spin, Table } from 'antd';
import { deleteBook, getBooks, updateBook } from '../../../../api/book/book-api';
import { AlignType, BookClassification } from '../../../../types/types';

export const BookList = () => {
  const [data, setData] = useState<any>([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [successUpdateModalOpen, setSuccessUpdateModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const initialValues = {
    bookId: 0,
    bookName: { value: '', errorText: '※ 도서명은 필수 입력사항입니다.' }
  };
  const [values, setValues] = useState(initialValues);
  const [bookNameStatus, setBookNameStatus] = useState<'' | 'error' | 'warning' | undefined>('');
  const [loading, setLoading] = useState(false);
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getBooks();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataSources =
    data.length > 0 &&
    data.map((d: { id: number; name: string; type: string }) => {
      return {
        id: d.id,
        name: d.name,
        type: BookClassification[d.type]?.label || ''
      };
    });

  const columns = [
    {
      title: '도서명',
      dataIndex: 'name',
      width: '40%',
      ellipsis: true,
      align: 'center' as typeof AlignType
    },
    {
      title: '분류',
      dataIndex: 'type',
      width: '30%', // 전체 너비의 30%,
      align: 'center' as typeof AlignType
    },
    {
      title: '수정/삭제',
      dataIndex: 'action',
      align: 'center' as typeof AlignType,
      width: '30%',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setUpdateModal(true);
              setValues({
                bookId: record.id,
                bookName: {
                  ...values.bookName,
                  value: record.name
                }
              });
            }}
          >
            수정
          </Button>
          <Button
            onClick={() => {
              setDeleteModal(true);
              setValues({
                ...values,
                bookId: record.id
                // bookName: {
                //   ...values.bookName,
                //   value: record.name
                // },
              });
            }}
          >
            삭제
          </Button>
        </Space>
      )
    }
  ];

  const onSubmit = (data: { id: number; name: string }) => {
    if (values.bookName.value === '') {
      setModalOpen(true);
    } else {
      updateBook(data)
        .then(() => setSuccessUpdateModalOpen(true))
        .then(() => fetchData());
    }
  };

  const onDeleteSubmit = (bookId: number) => {
    deleteBook(bookId).then(() => setSuccessModalOpen(true));
  };

  return (
    <>
      {loading && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      <Table
        dataSource={dataSources}
        pagination={false}
        columns={columns}
        locale={{
          emptyText: (
            <Empty
              description="등록된 도서가 없습니다"
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              style={{ padding: '20px' }}
            />
          )
        }}
      />

      <Modal
        open={updateModal}
        width={450}
        styles={{ body: { marginLeft: '10px' } }}
        title={<p style={{ textAlign: 'center' }}>수정</p>}
        onCancel={() => {
          setUpdateModal(false);
          setBookNameStatus('');
          setValues(initialValues);
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                setUpdateModal(false);
                setBookNameStatus('');
                setValues(initialValues);
              }}
            >
              취소
            </Button>
            <Button type={'primary'} onClick={() => onSubmit({ id: values.bookId, name: values.bookName.value })}>
              수정하기
            </Button>
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            padding: '7px',
            width: '350px',
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px', textAlign: 'center' }}>이름</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              style={{ width: '300px' }}
              size="large"
              value={values.bookName.value}
              placeholder="도서명을 입력해주세요"
              onBlur={handleBookNameBlur}
              onChange={handleBookNameChange}
              status={bookNameStatus}
            />
            {bookNameStatus === 'error' && (
              <span style={{ color: 'red' }}>{bookNameStatus === 'error' ? values.bookName.errorText : ''}</span>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteModal}
        title={<p style={{ textAlign: 'center' }}>삭제</p>}
        onCancel={() => {
          setDeleteModal(false);
          setBookNameStatus('');
          setValues(initialValues);
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                setDeleteModal(false);
                setBookNameStatus('');
                setValues(initialValues);
              }}
            >
              취소
            </Button>
            <Button type={'primary'} onClick={() => onDeleteSubmit(values.bookId)}>
              삭제하기
            </Button>
          </div>
        }
      >
        <p style={{ textAlign: 'center' }}>저장된 도서 정보가 삭제되며, 다시 복구할 수 없습니다. 삭제하시겠습니까?</p>
      </Modal>

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
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {' '}
            <Button
              onClick={() => {
                setSuccessUpdateModalOpen(false);
                setValues(initialValues);
                setUpdateModal(false);
              }}
              type={'primary'}
              style={{ textAlign: 'center' }}
            >
              확인
            </Button>
          </div>
        }
        open={successUpdateModalOpen}
      >
        <p style={{ textAlign: 'center' }}>도서 정보가 성공적으로 수정되었습니다!!</p>
      </Modal>

      <Modal
        okText={'확인'}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                setSuccessModalOpen(false);
                setValues(initialValues);
                setDeleteModal(false);
              }}
              type={'primary'}
              style={{ textAlign: 'center' }}
            >
              확인
            </Button>
          </div>
        }
        open={successModalOpen}
      >
        <p style={{ textAlign: 'center' }}>도서 정보가 성공적으로 삭제되었습니다!!</p>
      </Modal>
    </>
  );
};
