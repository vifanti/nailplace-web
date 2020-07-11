import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  white?: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: #000;
  height: 56px;
  border-radius: 8px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 20px;
  transition: background-color 0.2s;

  ${(props) =>
    props.white &&
    css`
      background: #fff;
      border: solid 2px #000;
      color: #000;
    `};

  &:hover {
    ${(props) =>
      props.white
        ? css`
            background: ${shade(0.1, '#fff')};
          `
        : css`
            background: ${shade(0.8, '#fff')};
          `};
  }
`;
