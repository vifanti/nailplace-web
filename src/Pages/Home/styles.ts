import styled from 'styled-components';

import signInBackgroundImg from '../../assets/background-mobile.png';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  align-items: stretch;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

  filter: blur(5px);
  -moz-filter: blur(5px);
  -webkit-filter: blur(5px);
  -o-filter: blur(5px);
`;

export const Title = styled.h1``;
