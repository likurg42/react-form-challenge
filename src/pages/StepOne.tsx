import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/Button';
import { Input } from '../components/form/Input';
import { Form } from '../components/form/Form';
import { MainContainer } from '../components/MainContainer';

interface FormValues {
  firstName: string;
  lastName: string;
}

const schema = yup.object().shape({
  firstName: yup.string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First name is a required field'),
  lastName: yup.string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last name is a required field'),
});

export const StepOne = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/step-2');
  };

  return (
    <MainContainer>
      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
      >
        🦄 Step 1
      </Typography>
      <Form handleSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName', {
            required: 'First name is required',
          })}
          id="firstName"
          label="First Name"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          {...register('lastName', {
            required: 'Last name is required',
          })}
          id="lastName"
          label="Last Name"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
