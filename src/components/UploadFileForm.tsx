import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from '../store/hooks';
import { setTableData } from '../store/slices/table.slice';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useFromStyles = makeStyles({
  container: {
    height: '100svh',
    width: '100svw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: '2rem',
    background: 'whitesmoke',
    borderRadius: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    width: '300px',
  },
  fileInput: {
    padding: '0.5rem',
    border: '1px solid lightgrey',
    color: 'grey',
    fontWeight: 700,
  },
  selectedFileText: {
    fontWeight: 700,
    color: 'green',
  },
  button: {
    marginTop: '1rem !important',
  },
  dropzone: {},
});

function UploadFileForm() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<object[]>([]);
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'], 'text/csv': ['.csv'] },
    multiple: false,
  });

  const classes = useFromStyles();

  async function fetchFileData(endPoint: string) {
    if (!file) return;

    const splittedArray = endPoint.split('/');

    const formData = new FormData();

    if (splittedArray[5] === 'json') {
      formData.append('jsonFile', file);
    } else {
      formData.append('csvFile', file);
    }

    const response = await axios.post(endPoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setData(response.data);
  }

  async function handleFileUpload() {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const allowedTypes = ['application/json', 'text/csv'];
    if (!allowedTypes.includes(file.type)) {
      alert('You can upload only .json or .csv files.');
      return;
    }

    try {
      if (file.type === 'application/json') {
        await fetchFileData(`${process.env.REACT_APP_API_URL}/api/parser/json`);
      } else if (file.type === 'text/csv') {
        await fetchFileData(`${process.env.REACT_APP_API_URL}/api/parser/csv`);
      }

      const updatedData = data.map((item) => ({
        ...item,
        unique_key: uuidv4(),
      }));

      dispatch(setTableData(updatedData));
    } catch (error) {
      console.error(error);
      toast.error(
        'Something went wrong while uploading the file. Please try again.',
      );
    }
  }

  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
          <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className={classes.fileInput}>Drop the file here...</p>
            ) : (
              <p className={classes.fileInput}>
                Drag & drop a file here, or click to select one
              </p>
            )}
            {file && (
              <p className={classes.selectedFileText}>
                Selected file: {file.name}
              </p>
            )}
          </div>
          <Button
            onClick={handleFileUpload}
            variant="contained"
            className={classes.button}
          >
            Upload
          </Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default UploadFileForm;
