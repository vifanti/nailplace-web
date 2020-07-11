import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  white?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  white,
  loading,
  ...rest
}) => (
  <Container type="button" white={white} {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
