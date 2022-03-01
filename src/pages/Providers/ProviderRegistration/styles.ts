import styled from 'styled-components';

interface ServiceItemProps {
  selectedService: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;

  /* border: 2px;
  border-color: red;
  border-style: solid;*/
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding: 24px;

  /* border: 2px;
  border-color: red;
  border-style: solid; */
`;

export const AddressContainer = styled.fieldset`
  margin-top: 32px;
  min-inline-size: auto;
  border: 0;
`;

export const Legend = styled.legend`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h2 {
    font-size: 24px;
  }
`;

export const ServiceListContainer = styled.fieldset`
  margin-top: 40px;
  min-inline-size: auto;
  border: 0;
`;

export const ServiceListTitleContainer = styled.legend`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ServiceListTitle = styled.h2`
  font-size: 24px;
`;

export const ServiceListInstruction = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #000;
`;

export const ServiceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
`;

export const ServiceItem = styled.li<ServiceItemProps>`
  height: 180px;
  padding: 16px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  border: 2px solid #f27983;

  background: ${(props) => (props.selectedService ? '#f2b3ca' : '#fff')};

  text-align: center;

  cursor: pointer;
`;

export const ServiceImage = styled.img`
  width: 90px;
  height: 90px;
`;

export const ServiceTitle = styled.span`
  flex: 1;
  margin-top: 12px;

  display: flex;
  align-items: center;
  color: #000;
`;
