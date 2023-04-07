import { Button, styled } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const PrimaryButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 1),
}));

export const PrimaryButton = ({ children }: Props) => (
  <PrimaryButtonStyled
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
  >
    {children}
  </PrimaryButtonStyled>
);
