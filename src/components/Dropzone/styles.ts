import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  width: 100%;
  background: rgba(242, 179, 202, 0.2);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  outline: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    border: 1px dashed #f2b3ca;
  }

  p {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed #f2b3ca;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;
    text-align: center;

    svg {
      color: #f2b3ca;
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
  }
`;
