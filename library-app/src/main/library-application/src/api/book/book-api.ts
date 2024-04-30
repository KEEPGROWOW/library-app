import axios from 'axios';

export const getBooks = async () => {
  const response = await axios.get(`http://localhost:8080/book`);
  return response.data;
};
export const addBook = async (data: { name: string; type: string }) => {
  await axios.post('http://localhost:8080/book', data);
};

export const updateBook = async (data: { id: number; name: string }) => {
  await axios.put(`http://localhost:8080/book`, data);
};

export const deleteBook = async (bookId: number) => {
  await axios.delete(`http://localhost:8080/book/${bookId}`);
};
export const loanReturnHistory = async () => {
  const response = await axios.get('http://localhost:8080/user/loan');
  return response.data;
};

export const addLoan = async (data: { userName: string; bookName: string }) => {
  await axios.post('http://localhost:8080/book/loan', data);
};

export const returnBook = async (data: { userName: string; bookName: string }) => {
  await axios.put('http://localhost:8080/book/return', data);
};

export const getBookStatistics = async () => {
  const response = await axios.get(`http://localhost:8080/book/stat`);
  return response.data;
};
