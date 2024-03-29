import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo.svg';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .min(6, 'No mínimo 6 dígitos')
            .required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas devem ser iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('password/reset', {
          password,
          password_confirmation,
          token,
        });

        // history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro resetar sua senha. Tente novamente',
        });
      }
    },
    [addToast, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="NailPlace" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Resetar senha</h2>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
