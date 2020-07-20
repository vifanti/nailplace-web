import styled from 'styled-components';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;
