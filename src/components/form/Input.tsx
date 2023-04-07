import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form';

export interface Props {
  id: string;
  label: string;
  name: string,
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  type?: 'text' | 'tel';
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef(({ type = 'text', ...props }: Props, ref) => (
  <TextField
    {...props}
    type={type}
    inputRef={ref}
  />
));
