import { yupResolver } from '@hookform/resolvers/yup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShieldIcon from '@mui/icons-material/Shield';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '../components/default/Button';
import TextInput from '../components/default/TextInput';
import AddNewList from '../components/initiativeList/AddNewList';

const listSchema = Yup.object({
  adventures: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Digite o nome do personagem'),
      initiative: Yup.number().required('Digite a iniciativa do personagem'),
      life: Yup.number().required('Digite a vida do personagem'),
      armor: Yup.number().required('Digite a ca do personagem'),
    }),
  ),
});

export default function InitiativeList() {
  const {
    formState: { errors },
    register,
    control,
    resetField,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(listSchema),
    defaultValues: {
      adventures: [],
    },
  });

  const {
    fields: fieldsAdventures,
    prepend: prependAdventure,
    remove: removeAdventure,
  } = useFieldArray({
    control,
    name: 'adventures',
  });

  const [order, setOrder] = useState(0);

  function addItem(item) {
    prependAdventure(item);

    const adventures = watch('adventures');

    let maxInitiative = 0;
    adventures.forEach((adventure) => {
      if (adventure.initiative > maxInitiative) maxInitiative = adventure.initiative;
    });

    const updatedList = [];

    for (let initiative = 0; initiative <= maxInitiative; initiative += 1) {
      for (let index = 0; index < adventures.length; index += 1) {
        if (adventures[index].initiative === initiative) {
          updatedList.unshift(adventures[index]);
        }
      }
    }

    setValue('adventures', updatedList);
  }

  function up(index) {
    const initiativeToDown = watch(`adventures.${index - 1}`);
    const initiativeToUp = watch(`adventures.${index}`);

    setValue(`adventures.${index}`, initiativeToDown);
    setValue(`adventures.${index - 1}`, initiativeToUp);
  }

  function down(index) {
    const initiativeToDown = watch(`adventures.${index}`);
    const initiativeToUp = watch(`adventures.${index + 1}`);

    setValue(`adventures.${index}`, initiativeToUp);
    setValue(`adventures.${index + 1}`, initiativeToDown);
  }

  function pushOrder() {
    if (order === fieldsAdventures.length - 1) {
      setOrder(0);
    } else {
      setOrder(order + 1);
    }
  }

  function handleRemoveAdventure(index) {
    if (index === watch('adventures').length - 1) {
      setOrder(0);
    }

    removeAdventure(index);
  }

  return (
    <Box display={useMediaQuery('(min-width:900px)') ? 'flex' : 'block'}>
      <Box width={useMediaQuery('(min-width:900px)') ? '30vw' : null} mx={1}>
        <AddNewList addItem={addItem} />

        {fieldsAdventures.length > 0 ? (
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6} md={6}>
              <Button text="PROXIMO" onClick={pushOrder} />
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
              <Button text="LIMPAR" onClick={() => resetField('adventures')} />
            </Grid>
          </Grid>
        ) : null}
      </Box>

      <Box width={useMediaQuery('(min-width:900px)') ? '70vw' : null} mx={1}>
        {fieldsAdventures.map((field, index) => (
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
            key={field.id}
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
              <Grid item xs={8} sm={4} md={4} alignSelf="center" textAlign="center">
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
              <Grid item xs={4} sm={2} md={2} alignSelf="center" textAlign="center">
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
              <Grid item xs={4} sm={2} md={2} alignSelf="center" textAlign="center">
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
              <Grid item xs={4} sm={2} md={2} alignSelf="center" textAlign="center">
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
            </Grid>
          </Container>
        ))}
      </Box>
    </Box>
  );
}
