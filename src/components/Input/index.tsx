import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error, Select } from './styles';

interface Style {
  [key: string]: string | number;
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'type'> & {
    name: string;
    containerStyle?: Style;
    icon?: React.ComponentType<IconBaseProps>;
    type?: 'select' | React.HTMLInputTypeAttribute;
    selectOptions?: { label: string; value: string | number }[];
  };

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  type,
  selectOptions,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement & HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField, clearError } =
    useField(name);

  useEffect(() => {
    if (type === 'select') {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        getValue: ref => {
          if (!ref.state.value) {
            return '';
          }
          return ref.state.value.value;
        },
        setValue: (ref, value) => {
          ref.select.setValue(value);
        },
      });

      return;
    }
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, type]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    clearError();
  }, [clearError]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const switchInputType = useCallback(() => {
    switch (type) {
      case 'select':
        return (
          <Select
            options={selectOptions}
            classNamePrefix="react-select"
            onFocus={handleInputFocus}
            defaultInputRef={defaultValue}
            ref={inputRef}
            onBlur={handleInputBlur}
            isErrored={!!error}
            isFilled={isFilled}
            isFocused={isFocused}
            {...rest}
          />
          // <select
          //   onFocus={handleInputFocus}
          //   defaultValue={defaultValue}
          //   ref={inputRef}
          //   onBlur={handleInputBlur}
          //   {...rest}
          // >
          //   {selectOptions &&
          //     selectOptions.map(option => (
          //       <option key={option.value} value={option.value}>
          //         {option.label}
          //       </option>
          //     ))}
          // </select>
        );

      default:
        return (
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            ref={inputRef}
            {...rest}
          />
        );
    }
  }, [
    defaultValue,
    error,
    handleInputBlur,
    handleInputFocus,
    isFilled,
    isFocused,
    rest,
    selectOptions,
    type,
  ]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}

      {switchInputType()}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
