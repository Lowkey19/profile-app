import React, { ChangeEvent, FunctionComponent, SyntheticEvent, useState, useContext } from 'react';
import moment from 'moment';
import { Tabs, Tab, TextField, InputLabel, MenuItem, FormControl, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';

import UserContext from '../providers/user';

const TabContainer = styled.div`
  border-bottom: 1px solid gray;
`;

const Container = styled.div`
  display: flex;
  padding: 30px 50px 0;
  flex-direction: column;
  height: 190px;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
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

const StyledTextField = styled(TextField)`
  width: 100%;
  > div {
    border-radius: 20px;
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  > div {
    border-radius: 20px;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FunctionComponent<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Container>{children}</Container>
      )}
    </div>
  );
}


interface Props {
  onChange?: (key: string, newVal: string) => void;
}

const ProfileTab: FunctionComponent<Props> = ({ onChange }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { store } = useContext(UserContext);

  const initialState = {
    city: '',
    address: '',
    email: '',
    phoneNumber: '',
  }
  
  const [user, setUser] = useState(initialState);

  const handleChangeCity = (e: SelectChangeEvent) => {
    setUser({
      ...user,
      city: e.target.value as string,
    });
    if (typeof onChange === 'function') onChange('city', e.target.value as string);
  };

  const handleUserChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [key]: e.target.value,
    })
    if (typeof onChange === 'function') onChange(key, e.target.value);
  }

  return (
    <>
      <TabContainer>
        <Tabs
          onChange={handleChange}
          value={value}
          selectionFollowsFocus
          centered
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Address" />
          <Tab label="Contact Information" />
          <Tab label="Phones" />
          <Tab label="Profile" />
        </Tabs>
      </TabContainer>
      <TabPanel value={value} index={0}>
        <FieldContainer>
          <Label>City:</Label>
          <StyledFormControl>
            <InputLabel>City</InputLabel>
            <Select
              value={user.city}
              label="City"
              onChange={handleChangeCity}
            >
              <MenuItem value={"City 1"}>City 1</MenuItem>
              <MenuItem value={"City 2"}>City 2</MenuItem>
              <MenuItem value={"City 3"}>City 3</MenuItem>
            </Select>
          </StyledFormControl>
        </FieldContainer>
        <FieldContainer>
          <Label>Address:</Label>
          <StyledTextField placeholder='Input Address' label='Address' value={user.address} onChange={handleUserChange('address')}/>
        </FieldContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FieldContainer>
          <Label>Email:</Label>
          <StyledTextField placeholder='Input Email address' label='Email address' value={user.email} onChange={handleUserChange('email')}/>
        </FieldContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FieldContainer>
          <Label>Phone number:</Label>
          <StyledTextField placeholder='Input Phone number' label='Phone number' value={user.phoneNumber} onChange={handleUserChange('phoneNumber')}/>
        </FieldContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>Id: {store.selectedUser.id}</Typography>
        <Typography>First name: {store.selectedUser.firstName}</Typography>
        <Typography>Last name: {store.selectedUser.lastName}</Typography>
        <Typography>Birth Date: {moment(store.selectedUser.birthDate).format('YYYY-MM-DD') || ''}</Typography>
        <Typography>City: {store.selectedUser.city}</Typography>
        <Typography>Address: {store.selectedUser.address}</Typography>
        <Typography>Email: {store.selectedUser.email}</Typography>
        <Typography>Phone number: {store.selectedUser.phoneNumber}</Typography>
      </TabPanel>
    </>
  );
}

export default ProfileTab;