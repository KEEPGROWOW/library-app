import styled from 'styled-components';
import { Card } from 'antd';

// 호버 시 변경될 테두리 색상
const hoverBorderColor = '#1890ff';

//
export const StyledCard = styled(Card)`
  transition: border-color 0.5s; // 호버 시 테두리 색상이 부드럽게 변경되도록 transition 추가
  border: 3px solid #d9d9d9;
  background-color: white;
  width: 300px;
  min-height: 500px;
  text-align: center;

  p {
    color: #d9d9d9;
    font-size: 16px;
    font-weight: bold;
  }
  .avatar-user {
    width: 100px;
    height: 100px;
    .avatar-icon {
      width: 200px;
      height: 50px;
    }
  }

  .avatar-book {
    width: 100px;
    height: 100px;
    .avatar-icon {
      width: 200px;
      height: 50px;
    }
  }
  &:hover {
    .avatar-user {
      background-color: #1677ff;
    }
    p {
      transition: color 0.5s; // 호버 시 테두리 색상이 부드럽게 변경되도록 transition 추가

      font-size: 20px;
      color: #001529;
    }
    .avatar-book {
      background-color: #1677ff;
    }
    border-color: ${hoverBorderColor}; // 호버 시 테두리 색상 변경
  }
`;
