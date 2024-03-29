import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo.svg';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SigInFormData {
  email: string;
  password: string;
}

type LocationState = {
  from: { pathname: string };
};

const UserSignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState;

  const pathname = locationState?.from?.pathname;

  const handleSubmit = useCallback(
    async (data: SigInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate(pathname ?? '/users/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, navigate, pathname, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="NailPlace" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Entrar como usuário</h2>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Link to="/forgot-password">Esqueci minha senha</Link>

            <Button type="submit">Entrar</Button>

            <Link to="/signup/users">
              <Button white>
                {/* <FiLogIn /> */}
                Criar conta
              </Button>
            </Link>
          </Form>
          <Link to="/">
            Voltar
            <FiArrowRight />
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default UserSignIn;
