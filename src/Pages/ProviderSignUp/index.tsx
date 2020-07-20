import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  // FiCreditCard,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  PhoneNumberContainer,
  VerticalBar,
  // InputGroup,
  Background,
} from './styles';

interface SignUpFormData {
  phoneDDI: string;
  phoneNumber: string;
  name: string;
  email: string;
  password: string;
}

const ProviderSignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const phoneRegExp = /\d{2}\9\d{8}/g;

        const schema = Yup.object().shape({
          phoneNumber: Yup.string()
            .required('Número obrigatório')
            .matches(phoneRegExp, 'Phone number is not valid'),
          name: Yup.string().required('Nome obrigatório'),
          // cpf: Yup.string()
          //   .required('CPF obrigatório')
          //   .max(14, 'No máximo 14 dígitos'),
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

        console.log({
          ...data,
          phoneNumber: data.phoneDDI + data.phoneNumber,
        });

        await api.post('/users', {
          ...data,
          phoneNumber: data.phoneDDI + data.phoneNumber,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/provider-registration');

        addToast({
          type: 'success',
          title: 'Usuário cadastrado!',
          description: 'Complete o seu cadastro.',
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
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="NailPlace" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Cadastro do prestador</h2>
            <fieldset>
              <legend>
                <h4>Dados de login</h4>
              </legend>
              <PhoneNumberContainer>
                <Input
                  name="phoneDDI"
                  value="+55"
                  disabled
                  maxLength={5}
                  type="tel"
                />
                <VerticalBar>
                  <div />
                </VerticalBar>
                <Input name="phoneNumber" placeholder="Número de telefone" />
              </PhoneNumberContainer>
              <Input name="name" icon={FiUser} placeholder="Nome" />
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
            </fieldset>

            {/* <fieldset>
              <legend>
                <h4>Dados pessoais</h4>
              </legend>
              <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
            </fieldset> */}

            {/* <fieldset>
              <legend>
                <h4>Selecione o local de atendimento no mapa</h4>
              </legend>
              <InputGroup>
                <Input name="country" placeholder="País" />
                <Input name="state" placeholder="UF" />
              </InputGroup>
              <InputGroup>
                <Input name="city" icon={FiUser} placeholder="Cidade" />
                <Input name="neighborhood" icon={FiUser} placeholder="Bairro" />
              </InputGroup>
              <InputGroup>
                <Input name="street" icon={FiUser} placeholder="Rua" />
                <Input name="houseNumber" icon={FiUser} placeholder="Nº" />
              </InputGroup>
            </fieldset> */}

            <Button type="submit">Continuar o cadastro</Button>
          </Form>

          <Link to="/provider-signin">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ProviderSignUp;
