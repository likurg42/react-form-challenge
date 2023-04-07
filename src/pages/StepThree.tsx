import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from '../components/MainContainer';
import { Form } from '../components/form/Form';
import { FileInput } from '../components/form/FileInput';
import { PrimaryButton } from '../components/Button';
import { MainFormValues } from '../types/form';
import { useFormContext } from '../hooks/useFormContext';

type FormValues = Pick<MainFormValues, 'files'>;

export const StepThree = () => {
  const { data, setValues } = useFormContext();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { files: data.files },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const navigate = useNavigate();
  const onSubmit = (formValues: FormValues) => {
    setValues({ files: formValues.files });
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
