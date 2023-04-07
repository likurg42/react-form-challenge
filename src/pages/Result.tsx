import {
  Button,
  List, ListItem, ListItemIcon, ListItemText,
  Paper, styled,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { InsertDriveFile } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useState } from 'react';
import ReactConfetti from 'react-confetti';
import { MainContainer } from '../components/MainContainer';
import { useFormContext } from '../hooks/useFormContext';

const LinkStyled = styled(Link)(() => ({
  all: 'unset',
}));

const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const Result = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { data, resetValues } = useFormContext();
  const { files } = data;
  const entries = Object.entries(data).filter(([key]) => key !== 'files'
    && key !== 'hasPhone');

  const handleSubmit = async () => {
    const formData = new FormData();

    if (data.files) {
      data.files.forEach((file) => {
        formData.append('files', file, file.name);
      });
    }

    entries.forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch('/submit', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 200) {
        setSuccess(true);
        const result = await Swal.fire('Great Job', 'You\'ve passed challenge', 'success');
        if (result.isConfirmed) {
          resetValues();
          navigate('/');
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        await Swal.fire('Error', e.message, 'error');
      }
    }
  };

  if (success) {
    return <ReactConfetti />;
  }

  return (
    <MainContainer>
      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
      >
        📃 Form Values
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Field
              </TableCell>
              <TableCell align="right">
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries && entries.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell align="right">{value.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files && (
        <>
          <Typography
            component="h2"
            variant="h5"
            textAlign="center"
          >
            📦 Files
          </Typography>
          <List>
            {files.map((f: File) => (
              <ListItem key={`${f.name}${f.size}`}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={f.name} secondary={f.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Footer>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        <Button variant="outlined">
          <LinkStyled to="/">Start over</LinkStyled>
        </Button>
      </Footer>
    </MainContainer>
  );
};
