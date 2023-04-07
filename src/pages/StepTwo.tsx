import { ChangeEvent } from 'react';
import { Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { Input } from '../components/form/Input';
import { Form } from '../components/form/Form';
import { PrimaryButton } from '../components/Button';
import { MainContainer } from '../components/MainContainer';

interface FormValues {
  email: string;
  phoneNumber: number;
  hasPhone: boolean;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email name is a required field'),
  phoneNumber: yup.number().typeError('Phone should contain only number'),
});

const normalizePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const phoneNumber = parsePhoneNumberFromString(value);
  e.target.value = !phoneNumber ? value : phoneNumber?.formatInternational();
};

export const StepTwo = () => {
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const hasPhone = watch('hasPhone');

  const onSubmit = () => {
    navigate('/step-3');
  };

  return (
    <MainContainer>
      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
      >
        🦄 Step 2
      </Typography>
      <Form handleSubmit={handleSubmit(onSubmit)}>
        <Input
          {...{ ...register('email'), some: 'some' }}
          id="email"
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Checkbox {...register('hasPhone')} color="primary" />
          }
          label="Do you have a phone"
        />
        {hasPhone && (
          <Input
            label="Phone number"
            id="phoneNumber"
            type="tel"
            {...register('phoneNumber', {
              onChange: normalizePhoneNumber,
            })}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
