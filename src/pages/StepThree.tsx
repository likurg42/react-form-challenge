import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from '../components/MainContainer';
import { Form } from '../components/form/Form';
import { FileInput } from '../components/form/FileInput';
import { PrimaryButton } from '../components/Button';

interface FormValues {
  files: File[],
}

export const StepThree = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/result');
  };
  return (
    <MainContainer>
      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
      >
        😀 Step Three
      </Typography>
      <Form handleSubmit={handleSubmit(onSubmit)}>
        <FileInput<FormValues> name="files" control={control} />
        <PrimaryButton>Finish</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
