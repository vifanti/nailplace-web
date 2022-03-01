import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import px2vw from '../../../utils/px2vw';
import signInBackgroundImg from '../../../assets/background-mobile.png';

export const Container = styled.div`
  display: flex;

  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;

  /* display: flex; */

  width: 100%;
  min-height: 100vh;

  /* min-height: 100vh; */

  /* display: flex; */
  /* align-items: stretch; */

  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

  filter: blur(5px);
  -moz-filter: blur(5px);
  -webkit-filter: blur(5px);
  -o-filter: blur(5px);
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateY(-80px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  /* position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000; */

  animation: ${appearFromLeft} 1s;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.8);

  width: 100%;
  /* max-height: 100vh; */
  max-width: 880px;
  /* min-height: 500px; */

  border-radius: 30px;
  margin: 20px;
  padding: 48px 48px;

  text-align: center;
`;

export const Title = styled.h1``;

export const Buttons = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Button = styled(Link)`
  text-decoration: none;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: solid 2px #000;
  width: ${px2vw(275, 320)};
  height: 312px;
  border-radius: 30px;

  margin-top: 24px;

  background: #fff;

  transition: transform 0.1s, box-shadow 0.1s;

  img {
    width: 200px;
    height: 200px;
  }

  h2 {
    padding-bottom: 12px;
    border-bottom: solid 2px #000;
  }

  @media (min-width: 768px) {
    width: ${px2vw(260, 768)};
  }

  @media (min-width: 1024px) {
    width: 312px;
  }

  &:hover {
    box-shadow: 3px 3px 5px 0px #f2b3ca;
    transform: translate(-2px, -2px);
    -webkit-transform: translate(-2px, -2px);
    -o-transform: translate(-2px, -2px);
    -moz-transform: translate(-2px, -2px);
  }

  &:active {
    box-shadow: 0px 0px 0px #f2b3ca;
    transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
    -o-transform: translate(0px, 0px);
    -moz-transform: translate(0px, 0px);
  }
`;
