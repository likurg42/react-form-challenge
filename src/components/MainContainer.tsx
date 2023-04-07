import { PropsWithChildren } from 'react';
import { Container } from '@mui/material';

export const MainContainer = ({ children }: PropsWithChildren) => (
  <Container maxWidth="xs">
    {children}
  </Container>
);
