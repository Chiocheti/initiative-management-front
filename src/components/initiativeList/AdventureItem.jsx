import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShieldIcon from '@mui/icons-material/Shield';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import StatusList from '../../utils/StatusList';
import TextInput from '../default/TextInput';

export default function AdventureItem({
  watch,
  register,
  errors,
  setValue,
  index,
  order,
  up,
  down,
  handleRemoveAdventure,
  fieldsAdventures,
}) {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    function findStatus() {
      setStatus(watch(`adventures.${index}.status`) || []);
    }

    findStatus();
  }, [watch, index]);

  function handleChange(event) {
    setStatus(event.target.value);
    setValue(`adventures.${index}.status`, event.target.value);
  }

  function itemSelect(value, message) {
    return (
      <MenuItem value={value} key={value} sx={{ height: '30px' }}>
        <Tooltip title={message} placement="left">
          <Checkbox
            checked={status.indexOf(value) > -1}
            icon={<PersonAddAlt1Icon color="green" />}
            checkedIcon={<PersonRemoveIcon color="red" />}
          />
        </Tooltip>
        <Typography color="#00ffbe">{value}</Typography>
      </MenuItem>
    );
  }

  return (
    <Container
      sx={{
        my: 1,
        p: 0.5,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: order === index ? 2 : 0,
        borderColor: 'primary.contrastText',
      }}
      component="form"
      maxWidth="md"
    >
      <Grid container spacing={1}>
        <Grid item xs={4} sm={2} md={2} textAlign="center">
          <ButtonGroup variant="text" size="large">
            <IconButton onClick={() => handleRemoveAdventure(index)}>
              <DeleteIcon color="error" />
            </IconButton>

            {index !== 0 ? (
              <IconButton onClick={() => up(index)}>
                <ArrowDropUpIcon color="warning" />
              </IconButton>
            ) : null}

            {index !== fieldsAdventures.length - 1 ? (
              <IconButton onClick={() => down(index)}>
                <ArrowDropDownIcon color="warning" />
              </IconButton>
            ) : null}
          </ButtonGroup>
        </Grid>
        <Grid item xs={8} sm={4} md={3} alignSelf="center" textAlign="center">
          <TextInput
            watch={watch}
            register={register}
            name={`adventures.${index}.name`}
            variant="standard"
            focused={order === index}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2} md={1} alignSelf="center" textAlign="center">
          <TextInput
            watch={watch}
            register={register}
            name={`adventures.${index}.initiative`}
            variant="standard"
            focused={order === index}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PushPinIcon color="info" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2} md={1.5} alignSelf="center" textAlign="center">
          <TextInput
            watch={watch}
            register={register}
            errors={errors?.adventures?.[index]?.life}
            name={`adventures.${index}.life`}
            variant="standard"
            focused={order === index}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FavoriteIcon color="error" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2} md={1} alignSelf="center" textAlign="center">
          <TextInput
            watch={watch}
            register={register}
            errors={errors?.adventures?.[index]?.armor}
            name={`adventures.${index}.armor`}
            variant="standard"
            focused={order === index}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShieldIcon color="warning" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={4} sm={2} md={3.5} alignSelf="center" textAlign="center">
          <FormControl fullWidth focused={order === index}>
            <Select
              multiple
              value={status}
              onChange={handleChange}
              renderValue={(selected) => selected.join(', ')}
              variant="standard"
              fullWidth
              focused={order === index}
              color="primary"
              sx={{
                '& .MuiSelect-select': {
                  color: '#00ffbe',
                },
              }}
            >
              {StatusList().map((option) => itemSelect(option.value, option.message))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
