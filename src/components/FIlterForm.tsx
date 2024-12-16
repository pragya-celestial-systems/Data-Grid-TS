import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTableData } from '../context/TableData';
import { makeStyles } from '@mui/styles';
import { usePagination } from '../context/PaginationContext';
import { useAppSelector } from '../store/hooks';

const useFormStyles = makeStyles({
  formContainer: {
    width: '80%',
    margin: '2rem auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: '100px',
    padding: '0.8rem 0',
    fontSize: '1rem',
  },
});

interface SelectInterface {
    [key : string] : string
}

export default function InputAdornments() {
  const classes = useFormStyles();
  const data = useAppSelector((state) => state.tableData.data);
  const { setTableData } = useTableData();
  const [headings, setHeadings] = React.useState<string[]>([]);
  const { setIsFiltering, setCurrentPage } = usePagination();
  const [query, setQuery] = React.useState<string>('');
  const [select, setSelect] = React.useState<SelectInterface>({
    column: '',
    queryType: '',
  });

  React.useEffect(() => {
    if (data) {
      setHeadings(Object.keys(data[0]));
    }
  }, [data]);

  function validateFormData() {
    if (select.column === '') {
      return false;
    } else if (select.queryType === '') {
      return false;
    } else if (query === '') {
      return false;
    } else {
      return true;
    }
  }

  function handleSearch() {
    const isValid = validateFormData();

    if (!isValid) {
      alert('Please fill the required fields.');
      return;
    }

    setIsFiltering(true);
    setCurrentPage(0);

    if (select.queryType === 'contains') {
      filterContains();
      return;
    }

    if (select.queryType === 'equals') {
      filterEquals();
      return;
    }

    if (select.queryType === 'greater-than') {
      filterGreaterThan();
      return;
    }

    if (select.queryType === 'less-than') {
      filterLessThan();
      return;
    }
  }

  function filterContains() {
    const filteredData = data.filter((d) => {
      const columnValue = d[select.column];
      return (
        columnValue &&
        columnValue.toString().toLowerCase().includes(query.toLowerCase())
      );
    });

    setTableData(filteredData);
  }

  function filterEquals() {
    const filteredData = data.filter((d) => {
      const columnValue = d[select.column];
      return (
        columnValue &&
        columnValue.toString().toLowerCase() === query.trim().toLowerCase()
      );
    });

    setTableData(filteredData);
  }

  function filterGreaterThan() {
    if (isNaN(Number(query))) {
      alert('Query must be a number');
      return;
    }

    const filteredData = data.filter((d) => {
      const column = d[select.column];
      return column && Number(column) > Number(query);
    });

    setTableData(filteredData);
  }

  function filterLessThan() {
    if (isNaN(Number(query))) {
      alert('Query must be a number');
      return;
    }

    const filteredData = data.filter((d) => {
      const column = d[select.column];
      return column && Number(column) < Number(query);
    });

    setTableData(filteredData);
  }

  function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
  }

  function handleResetSearch() {
    setTableData(data);
    setSelect({ column: '', queryType: '' });
    setQuery('');
    setIsFiltering(false);
  }

  function handleChangeValue(e: SelectChangeEvent<string>) {
    const { name, value } = e.target;

    setSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className={classes.formContainer}>
      <InputLabel
        id="demo-simple-select-label"
        sx={{ marginRight: '5px' }}
        required
      >
        Column
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={select.column}
        name="column"
        onChange={handleChangeValue}
      >
        {headings.length > 0 &&
          headings.map((heading, index) => (
            <MenuItem key={index} value={heading}>
              {heading}
            </MenuItem>
          ))}
      </Select>
      <InputLabel
        required
        id="demo-simple-select-label"
        sx={{ margin: 'auto 5px auto 10px' }}
      >
        Query Type
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={select.queryType}
        name="queryType"
        onChange={handleChangeValue}
      >
        <MenuItem value="equals">Equals</MenuItem>
        <MenuItem value="less-than">Less Than</MenuItem>
        <MenuItem value="greater-than">Greater Than</MenuItem>
        <MenuItem value="contains">Contains</MenuItem>
      </Select>
      <TextField
        required
        value={query}
        onChange={handleChangeQuery}
        label="Search Data"
        id="outlined-start-adornment"
        sx={{ m: 1, width: '25ch' }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        className={classes.button}
      >
        Search
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleResetSearch}
        color="error"
      >
        Reset
      </Button>
    </div>
  );
}
