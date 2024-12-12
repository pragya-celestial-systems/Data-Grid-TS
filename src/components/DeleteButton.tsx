import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useButtonStyles = makeStyles({
  buttonContainer: {
    width: '100svw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '1rem',
    background: 'whitesmoke',
    boxSizing: 'border-box',
  },
});

interface ButtonProps {
  onDelete: () => void;
}

function DeleteButton({ onDelete }: ButtonProps) {
  const classes = useButtonStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="error" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteButton;
