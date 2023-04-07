import { styled } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const FormEl = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

interface Props {
  handleSubmit: (e: React.BaseSyntheticEvent) => Promise<void>;
}

export const Form = ({ children, handleSubmit }: Props & PropsWithChildren) => (
  <FormEl onSubmit={handleSubmit}>
    {children}
  </FormEl>
);
