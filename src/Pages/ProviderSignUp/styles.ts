import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
from{
  opacity: 0;
  transform: translateX(50px);
}
to{
  opacity: 1;
  transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  img {
    margin-bottom: 40px;
  }

  form {
    width: 340px;
    text-align: center;

    h2 {
      margin-bottom: 28px;
    }

    fieldset {
      margin-top: 42px;
      min-inline-size: auto;
      border: 0;

      legend {
        margin-bottom: 8px;
        text-align: left;
      }
    }

    fieldset:first-of-type {
      margin-top: 0px;
    }
  }

  > a {
    color: #f27983;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: ${shade(0.4, '#F27983')};
    }
  }
`;

export const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 8px;

  div {
    margin-top: 0;
  }

  div:first-of-type {
    max-width: 64px;
    border-right: 0;
    input {
      text-align: right;
      /* padding-right: 8px; */
      width: 100%;
    }
  }

  div:last-of-type {
    border-left: 0;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 8px;

  div {
    margin-top: 0;
    input {
      width: 100%;
    }
  }

  div:first-of-type {
    width: 50%;
    margin-right: 8px;
  }

  div:last-of-type {
    width: 50%;
  }
`;

export const VerticalBar = styled.div`
  display: flex;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;

  div {
    border-left: 2px solid #ccc !important;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
  min-height: 100vh;
`;
