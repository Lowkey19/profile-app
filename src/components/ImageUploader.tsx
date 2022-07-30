import React, { FunctionComponent } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

import logo from '../assets/avatar.png';

const Container = styled.div`
  flex: 1;
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

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImagePlaceHolder = styled.img`
  cursor: pointer;
  height: 400px;
  width: 400px;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageUploader: FunctionComponent = () => {
  return (
    <Container>
      <Title>Picture</Title>
      <ImageContainer>
        <ImagePlaceHolder src={logo} />
      </ImageContainer>
    </Container>
  );
}

export default ImageUploader;