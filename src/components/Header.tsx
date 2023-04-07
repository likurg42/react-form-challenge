import { styled } from '@mui/material';

const Title = styled('h1')({
  margin: 0,
  textShadow: '1px 1px darkmagenta',
  fontSize: 40,
  color: 'deeppink',
  textAlign: 'center',
});

export const Header = () => (
  <header>
    <Title>
      The Ultimate Form Challenge
    </Title>
  </header>
);
