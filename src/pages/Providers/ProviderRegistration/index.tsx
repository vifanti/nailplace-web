import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import axios from 'axios';
import logoImg from '../../../assets/logo.svg';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';

import Dropzone from '../../../components/Dropzone';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
  Container,
  Content,
  AddressContainer,
  Legend,
  ServiceListContainer,
  ServiceListTitleContainer,
  ServiceListTitle,
  ServiceListInstruction,
  ServiceList,
  ServiceItem,
  ServiceImage,
  ServiceTitle,
} from './styles';

interface ProviderFormData {
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  houseNumber: string;
  latitude: number;
  longitude: number;
}

export interface Service {
  id: number;
  title: string;
  image_url: string;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const ProviderRegistration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { updateUser, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const [ufs, setUfs] = useState([]);

  useEffect(() => {
    if (!user.provider) {
      api
        .get('providers', {
          params: {
            user_id: user.id,
          },
        })
        .then((response) => {
          const [provider] = response.data;

          if (provider) {
            updateUser({ ...user, provider });
            history.push('/provider/dashboard');
          }
        });
    }
  }, [history, updateUser, user]);

  useEffect(() => {
    api.get('services').then((response) => {
      setServices(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufInitials = response.data.map((uf: { sigla: string }) => {
          return { label: uf.sigla, value: uf.sigla };
        });

        setUfs(ufInitials);
      });
  }, []);

  function handleSelectService(id: number): void {
    const alreadySelected = selectedServices.findIndex(
      (service) => service === id,
    );
    if (alreadySelected >= 0) {
      const filteredServices = selectedServices.filter(
        (service) => service !== id,
      );

      setSelectedServices(filteredServices);
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  }

  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const zipCode = event.target.value;
    if (zipCode.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${event.target.value}/json/`)
        .then((response) => {
          if (!response.data.erro) {
            if (zipCode.substring(0, 2) === '13') {
              formRef.current?.setFieldValue('country', 'Brasil');
            }
            const { uf, localidade, bairro, logradouro } = response.data;
            formRef.current?.setData({
              uf,
              city: localidade,
              neighborhood: bairro,
              street: logradouro,
            });
          }
        });
    }
  };

  const handleSubmit = useCallback(
    async (data: ProviderFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          latitude: Yup.number().required('Latitude obrigatória'),
          longitude: Yup.number().required('Longitude obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { latitude, longitude } = data;

        const formData = {
          user_id: user.id,
          latitude,
          longitude,
          services: selectedServices.join(','),
        };

        const response = await api.post('/providers', formData);

        updateUser({ ...user, provider: response.data });

        history.push('/provider/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil de prestador cadastrado!',
          description:
            'Suas informações de prestador de serviço foram cadastradas com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro do prestador',
          description:
            'Ocorreu um erro ao cadastrar as informações de prestador. Tente novamente',
        });
      }
    },
    [addToast, history, selectedServices, updateUser, user],
  );

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
      <img src={logoImg} alt="NailPlace" />
      <Content>
        <h2>Conclua o cadastro de prestador</h2>
        <Dropzone onFileUploaded={handleAvatarChange} />
        <Form style={{ width: '100%' }} ref={formRef} onSubmit={handleSubmit}>
          <AddressContainer>
            <Legend>
              <h2>Endereço de atendimento</h2>
            </Legend>
            <Input
              name="zipCode"
              placeholder="CEP"
              onChange={handleZipCodeChange}
            />
            <Input name="country" placeholder="País" />
            {/* <Input name="uf" placeholder="UF" /> */}
            <Select options={ufs} />
            <Input name="city" placeholder="Cidade" />
            <Input name="neighborhood" placeholder="Bairro" />
            <Input name="street" placeholder="Rua" />
            <Input name="houseNumber" placeholder="Número" />
          </AddressContainer>

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

          {/* <ServiceListContainer>
            <ServiceListTitleContainer>
              <ServiceListTitle>Serviços prestados</ServiceListTitle>
              <ServiceListInstruction>
                Selecione um ou mais serviços
              </ServiceListInstruction>
            </ServiceListTitleContainer>
            <ServiceList>
              {services.map((service) => (
                <ServiceItem
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  selectedService={
                    !!selectedServices.find((s) => s === service.id)
                  }
                >
                  <ServiceImage src={service.image_url} />
                  <ServiceTitle>{service.title}</ServiceTitle>
                </ServiceItem>
              ))}
            </ServiceList>
          </ServiceListContainer> */}

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ProviderRegistration;
