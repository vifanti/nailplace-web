import React, { useCallback, useState } from 'react';

import logoImg from '../../assets/logo.svg';
import Dropzone from '../../components/Dropzone';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Container, Content } from './styles';

const ProviderRegistration: React.FC = () => {
  const [isSalon, setIsSalon] = useState(false);
  const { updateUser } = useAuth();
  const { addToast } = useToast();

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
        <img src={logoImg} alt="NailPlace" />
        <Dropzone onFileUploaded={handleAvatarChange} />
      </Content>
    </Container>
  );
};

export default ProviderRegistration;
