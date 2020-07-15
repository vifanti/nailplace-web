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
    display: flex;
    flex-direction: column;
    width: 340px;
    text-align: center;

    h2 {
      margin-bottom: 10px;
    }

    a {
      text-decoration: none;
    }

    a:first-of-type {
      margin-top: 8px;
      font-size: 14px;
      color: #f27983;
    }

    a button {
      margin-top: 8px;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      /* svg {
        margin-top: -2px;
        margin-right: 10px;
      } */
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

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
  min-height: 100vh;
`;
