import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  padding: 0 0 0 16px;
  width: 100%;

  border: 2px solid #000;
  color: #000;

  display: flex;
  align-items: center;

  position: relative;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #f27983;
      border-color: #f27983;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #f27983;
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    height: 60px;
    color: #000;
    width: 100%;

    &::placeholder {
      color: #888;

      ${props =>
        props.isFocused &&
        css`
          color: #f27983;
        `}
    }
  }

  select {
    flex: 1;
    background: transparent;
    border: 0;
    height: 60px;
    color: #000;
    width: 100%;

    &::placeholder {
      color: #888;

      ${props =>
        props.isFocused &&
        css`
          color: #f27983;
        `}
    }
  }

  .container {
    flex: 2;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

export const Select = styled(ReactSelect)<ContainerProps>`
  flex: 1;

  .react-select__control {
    border: none;

    &:hover {
      border: none;
      box-shadow: none;
    }

    &:not(:hover) {
      border: none;
      box-shadow: none;
    }
  }

  .react-select__placeholder {
    color: #888;

    ${props =>
      props.isFocused &&
      css`
        color: #f27983;
      `}
  }

  .react-select__value-container {
    padding: 0;
    div {
      margin: 0;
    }
  }

  .react-select__single-value {
    color: #000;
  }

  .react-select__menu {
    color: #000;
  }

  input {
    height: 60px;
  }
`;
