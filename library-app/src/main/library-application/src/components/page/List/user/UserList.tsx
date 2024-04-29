import { deleteUser, getUserList, updateUser } from '../../../../api/user/user-api';
import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, Modal, Space, Table } from 'antd';
import { AlignType } from '../../../../types/types';

export const UserList = () => {
  const [data, setData] = useState<any>([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [successUpdateModalOpen, setSuccessUpdateModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const initialValues = {
    userId: 0,
    userName: { value: '', errorText: '※ 이름은 필수 입력사항입니다.' },
    userAge: { value: 0, errorText: '' }
  };
  const [values, setValues] = useState(initialValues);
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

  const fetchData = async () => {
    const result = await getUserList();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const dataSources =
    data.length > 0 &&
    data.map((d: any) => {
      return {
        id: d.id,
        name: d.name,
        age: d.age
      };
    });

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      width: '40%',
      ellipsis: true,
      align: 'center' as typeof AlignType
    },
    {
      title: '나이',
      dataIndex: 'age',
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
                userId: record.id,
                userName: {
                  ...values.userName,
                  value: record.name
                },
                userAge: { ...values.userAge, value: record.age }
              });
            }}
          >
            수정
          </Button>
          <Button
            onClick={() => {
              setDeleteModal(true);
              setValues({
                userId: record.id,
                userName: {
                  ...values.userName,
                  value: record.name
                },
                userAge: { ...values.userAge, value: record.age }
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
    if (values.userName.value === '') {
      setModalOpen(true);
    } else {
      updateUser(data)
        .then(() => setSuccessUpdateModalOpen(true))
        .then(() => fetchData());
    }
  };

  const onDeleteSubmit = (userName: string) => {
    deleteUser(userName).then(() => setSuccessModalOpen(true));
  };

  return (
    <>
      {
        <Table
          dataSource={dataSources}
          pagination={false}
          columns={columns}
          locale={{
            emptyText: (
              <Empty
                description="등록된 사용자가 없습니다"
                style={{ padding: '20px' }}
                image={Empty.PRESENTED_IMAGE_DEFAULT}
              />
            )
          }}
        />
      }
      <Modal
        open={updateModal}
        width={450}
        styles={{ body: { marginLeft: '10px' } }}
        title={<p style={{ textAlign: 'center' }}>수정</p>}
        onCancel={() => {
          setUpdateModal(false);
          setUserNameStatus('');
          setValues(initialValues);
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                setUpdateModal(false);
                setUserNameStatus('');
                setValues(initialValues);
              }}
            >
              취소
            </Button>
            <Button type={'primary'} onClick={() => onSubmit({ id: values.userId, name: values.userName.value })}>
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
      </Modal>

      <Modal
        open={deleteModal}
        title={<p style={{ textAlign: 'center' }}>삭제</p>}
        onCancel={() => {
          setDeleteModal(false);
          setUserNameStatus('');
          setValues(initialValues);
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                setDeleteModal(false);
                setUserNameStatus('');
                setValues(initialValues);
              }}
            >
              취소
            </Button>
            <Button
              type={'primary'}
              onClick={() => onDeleteSubmit(values.userName.value)}
              // onClick={() => de({ name: values.userName.value, age: values.userAge.value })}
            >
              삭제하기
            </Button>
          </div>
        }
      >
        <p style={{ textAlign: 'center' }}>저장된 유저 정보가 삭제되며, 다시 복구할 수 없습니다. 삭제하시겠습니까?</p>
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
        <p style={{ textAlign: 'center' }}>사용자 정보가 성공적으로 수정되었습니다!!</p>
      </Modal>

      <Modal
        okText={'확인'}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {' '}
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
        <p style={{ textAlign: 'center' }}>사용자 정보가 성공적으로 삭제되었습니다!!</p>
      </Modal>
    </>
  );
};
