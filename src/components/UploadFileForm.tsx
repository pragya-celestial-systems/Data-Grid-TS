import { Button } from '@mui/material';
import axios from 'axios';
import React, { SetStateAction, useCallback, useState } from 'react';
import { setTableData } from '../store/slices/table.slice';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@mui/styles';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch } from '../store/hooks';

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
  input: {
    outline: 'none',
  },
  button: {
    marginTop: '1rem !important',
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
});

function UploadFileForm() {
//   const onDrop = useCallback((acceptedFiles : SetStateAction<FileInterface>) => {
  const onDrop = useCallback((acceptedFiles : object[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const [file, setFile] = useState<object | null>(null);
  const [data, setData] = useState<object[]>([]);
  const dispatch = useAppDispatch();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'], 'text/csv': ['.csv'] },
    multiple: false,
  });
  const classes = useFromStyles();

  async function fetchJsonData() {
    if (!file) return;
    const formData = new FormData();
    formData.append('jsonFile', file);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/parser/json`,
      formData,
    );

    const dataStr = JSON.stringify(response.data);
    setData(JSON.parse(dataStr));
  }

  async function fetchCsvData() {
    const formData = new FormData();
    formData.append('csvFile', file);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/parser/csv`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const dataArray = response.data;
    setData(dataArray);
  }

  function addUniqueKey() {
    const updatedData = data.map((item: object) => ({
      ...item,
      unique_key: uuidv4(),
    }));

    return updatedData;
  }

  async function handleFileUpload() {
    if (!file) {
      alert('Please select the file first.');
      return;
    }

    const allowedTypes = ['application/json', 'text/csv'];
    if (!allowedTypes.includes(file.type)) {
      alert('You can upload only .json or .csv files.');
      return;
    }

    try {
      if (file.type === 'application/json') {
        fetchJsonData();
      }

      if (file.type === 'text/csv') {
        fetchCsvData();
      }

      const updatedData = addUniqueKey();
      dispatch(setTableData(updatedData));
    } catch (error) {
      console.error(error);
      alert('Something went wrong while uploading file. Please try again!');
    }
  }

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div {...getRootProps()} className={classes.dropzone}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className={classes.fileInput}>Drop the file here...</p>
          ) : (
            <p className={classes.fileInput}>
              Drag 'n' drop a file here, or click to select one
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
  );
}

export default UploadFileForm;
