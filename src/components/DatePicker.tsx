import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Props {
  label?: string;
  date?: Date;
  onChange?: (date: Date) => void;
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
  > div > div {
    border-radius: 20px !important;
  }
`;

const DatePicker: FunctionComponent<Props> = ({ label, date, onChange }) => {
  const [value, setValue] = useState<Date | null>(date || new Date());

  useEffect(() => {
    if (date) setValue(date);
  }, [date])

  const handleChange = (d: Date | null) => {
    if (d) {
      setValue(d);
      if (typeof onChange === 'function') onChange(d);
    }
  }

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Container>
  );
}

export default DatePicker;