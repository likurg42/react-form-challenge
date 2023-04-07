import { PropsWithChildren } from 'react';
import { Container, styled } from '@mui/material';

const MainContainerStyles = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const MainContainer = ({ children }: PropsWithChildren) => (
  <MainContainerStyles maxWidth="xs">
    {children}
  </MainContainerStyles>
);
