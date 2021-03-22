import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

// import './styles.css';

import { Container } from './styles';

interface Props {
  onFileUploaded: (file: File) => void;
  avatarUrl: string;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded, avatarUrl }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl || avatarUrl ? (
        <img src={selectedFileUrl || avatarUrl} alt="Avatar do usuário" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </Container>
  );
};

export default Dropzone;
