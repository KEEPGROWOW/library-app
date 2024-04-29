import axios from 'axios';

export const getUserList = async () => {
  const response = await axios.get('http://localhost:8080/user');
  return response.data;
};

export const addUser = async (data: { name: string; age?: number }) => {
  await axios.post('http://localhost:8080/user', data);
};

export const updateUser = async (data: { id: number; name: string; age?: number }) => {
  await axios.put(`http://localhost:8080/user`, data);
};

export const deleteUser = async (userName: string) => {
  await axios.delete(`http://localhost:8080/user?name=${userName}`);
};
