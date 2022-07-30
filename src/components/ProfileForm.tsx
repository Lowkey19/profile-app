import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Typography, TextField } from '@mui/material';
import styled from 'styled-components';

import DatePicker from './DatePicker';

interface Props {
  onChange?: (key: string, newVal: string | Date) => void;
}

const Container = styled.div`
  flex: 2;
  padding: 20px;
  > p {
    font-size: 24px;
    font-weight: bold;
    color: #002447;
  }
`;

const Title = styled(Typography)`
  display: block;
  border-bottom: 1px solid #808080;
  margin-bottom: 20px !important;
`;

const Label = styled.label<{ important?: boolean }>`
  width: 200px;
  margin-right: 50px;
  font-size: 20px;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  text-align: left;
  display: inline-block;
  position: relative;
  color: #002447; 
  ${({ important }) =>
    important &&
    `
  &::after {
    content: '*';
    position: absolute;
    top: 0;
    margin-left: 2px;
    color: #B30000;
  }
  `}
`;

const BirthDateLabel = styled(Label)`
  margin-right: 11px !important;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  > div {
    border-radius: 20px;
  }
`;

const FormContainer = styled.div``;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileForm: FunctionComponent<Props> = ({ onChange }) => {  
  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
  }

  const [user, setUser] = useState(initialState);

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [key]: e.target.value,
    })
    if (typeof onChange === 'function') onChange(key, e.target.value);
  }

  const handleBirthDate = (d: Date) => {
    setUser({
      ...user,
      birthDate: d,
    })
    if (typeof onChange === 'function') onChange('birthDate', d);
  }

  return (
    <Container>
      <Title>Personal</Title>
      <FormContainer>
        <FieldContainer>
          <Label>ID:</Label>
          <StyledTextField placeholder='Input ID' label='ID' value={user.id} onChange={handleChange('id')}/>
        </FieldContainer>
        <FieldContainer>
          <Label important>First Name:</Label>
          <StyledTextField placeholder='Input First Name' label='First Name' value={user.firstName} onChange={handleChange('firstName')} />
        </FieldContainer>
        <FieldContainer>
          <Label important>Last Name:</Label>
          <StyledTextField placeholder='Input Last Name' label='Last Name' value={user.lastName} onChange={handleChange('lastName')}/>
        </FieldContainer>
        <FieldContainer>
          <Label>Full Name:</Label>
          <StyledTextField placeholder='Full Name' label='Full Name' helperText='This value is composite from first and last name' value={user.firstName && user.lastName && `${user.firstName} ${user.lastName}`} disabled/>
        </FieldContainer>
        <FieldContainer>
          <BirthDateLabel important>Birth Date:</BirthDateLabel>
          <DatePicker
            date={user.birthDate}
            onChange={handleBirthDate}
          />
        </FieldContainer>
      </FormContainer>
    </Container>
  );
}

export default ProfileForm;