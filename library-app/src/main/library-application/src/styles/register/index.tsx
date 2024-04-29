import styled from 'styled-components';
import { Avatar, Input as AntInput } from 'antd';

// 외부 컨테이너 스타일링
export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

// 내부 컨테이너 스타일링
export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// 아바타 스타일링
export const ItemCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

// 입력 필드 스타일링
export const Input = styled(AntInput)`
  width: 300px;
  margin-bottom: 20px;
`;
