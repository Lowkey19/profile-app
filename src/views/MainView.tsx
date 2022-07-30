import React, { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

import { createUser } from '../api/user';
import ProfileForm from '../components/ProfileForm';
import ProfileTab from '../components/ProfileTab';
import ImageUploader from '../components/ImageUploader';
import { IUser } from '../api/user/types';
import UserContext from '../providers/user';
import { hasEmptyFields } from '../helpers/formValidation';

const Container = styled.div`
  margin: 50px 100px;
  border-radius: 30px;
  background-color: rgba(245, 250, 250, 0.65);
`;

const FormContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  > button {
    width: 150px;
    background-color: #002447;
    font-size: 18px;
    border-radius: 27px;
    margin: 20px;
  }
`;

const MainView: FunctionComponent = () => {
  const initialState: IUser = {
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    birthDate: new Date(),
    city: '',
    address: '',
    email: '',
    phoneNumber: '',
  }
  const [value, setValue] = useState(initialState);
  const { dispatch } = useContext(UserContext);

  const handleChange = (key: string, newVal: string | Date) => {
    setValue({
      ...value,
      [key]: newVal,
    });
  };

  const handleSubmit = () => {
    createUser(value, dispatch);
  };

  const disableSubmit = (): boolean => {
    const { firstName, lastName, birthDate } = value;
    return hasEmptyFields([firstName, lastName, birthDate.toDateString()]);
  }
  
  return (
    <Container>
      <FormContainer>
        <ImageUploader />
        <ProfileForm onChange={handleChange} />
      </FormContainer>
      <ProfileTab onChange={handleChange} />
      <ActionContainer>
        <Button variant='contained' onClick={handleSubmit} disabled={disableSubmit()}>
          Save
        </Button>
      </ActionContainer>
    </Container>
  );
};

export default MainView;