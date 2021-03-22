import React, { useCallback, useRef, useState } from 'react';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.svg';
import Dropzone from '../../components/Dropzone';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';

import api from '../../services/api';

import { Container, Content, Logo } from './styles';
import Button from '../../components/Button';

const ProviderRegistration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [isSalon, setIsSalon] = useState(false);
  const { updateUser, user } = useAuth();
  const { addToast } = useToast();

  console.log(user.avatar_url);

  const handleAvatarChange = useCallback(
    (file: File) => {
      if (file) {
        const data = new FormData();

        data.append('avatar', file);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Content>
        {/* <Logo src={logoImg} alt="NailPlace" /> */}
        <h2>Conclua o cadastro de prestador</h2>
        <Dropzone
          onFileUploaded={handleAvatarChange}
          avatarUrl={user.avatar_url}
        />
        <Form style={{ width: '100%' }} ref={formRef} onSubmit={() => {}}>
          <Input
            name="latitude"
            icon={FiMoreHorizontal}
            placeholder="Latitude"
          />
          <Input
            name="longitude"
            icon={FiMoreVertical}
            placeholder="Longitude"
          />

          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ProviderRegistration;
