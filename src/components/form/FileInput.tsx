import {
  Control, Controller, FieldValues, Path,
} from 'react-hook-form';
import Dropzone from 'react-dropzone';
import {
  List, ListItem, ListItemIcon, ListItemText, Paper, styled,
} from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';

const FileInputWrapper = styled(Paper)(() => ({
  backgroundColor: '#eee',
  textAlign: 'center',
  cursor: 'pointer',
  padding: '10px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#D5D5D5',
  },
}));

const UploadIcon = styled(CloudUpload)(() => ({
  marginTop: '16px',
  color: '#888',
  fontSize: '42px',
}));

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const FileInput = <T extends FieldValues>({ control, name }: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <>
        <Dropzone onDrop={onChange}>
          {({ getRootProps, getInputProps }) => (
            <FileInputWrapper {...getRootProps()} variant="outlined">
              <>
                <UploadIcon />
                <input name={name} onBlur={onBlur} {...getInputProps()} />
                <p>Drag &apos;n&apos; drop files here, or click to select file</p>
              </>
            </FileInputWrapper>
          )}
        </Dropzone>
        <List>
          {value && value.map((f: File) => (
            <ListItem key={`${f.name}`}>
              <ListItemIcon>
                <InsertDriveFile />
              </ListItemIcon>
              <ListItemText primary={f.name} secondary={f.size} />
            </ListItem>
          ))}
        </List>
      </>
    )}
  />
);
