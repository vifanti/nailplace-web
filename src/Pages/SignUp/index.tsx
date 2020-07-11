import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiCreditCard,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .max(14, 'No máximo 14 dígitos'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          confirmEmail: Yup.string()
            .required('Confirme o e-mail')
            .email('Digite um email válido')
            .oneOf([Yup.ref('email')], 'Os e-mails devem ser iguais'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirmPassword: Yup.string()
            .min(6, 'No mínimo 6 dígitos')
            .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Vocá já pode fazer seu logon no NailPlace.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro. Tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="NailPlace" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Faça seu cadastro</h2>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="confirmEmail"
              icon={FiMail}
              placeholder="Confirme o e-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirme a senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
