import { yupResolver } from '@hookform/resolvers/yup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '../components/default/Button';
import TextInput from '../components/default/TextInput';
import AddNewList from '../components/initiativeList/AddNewList';

const listSchema = Yup.object({
  initiatives: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Digite o nome do personagem'),
      initiative: Yup.number().required('Digite a iniciativa do personagem'),
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
      initiatives: [],
    },
  });

  const {
    fields: fieldsInitiatives,
    prepend: prependInitiative,
    remove: removeInitiative,
  } = useFieldArray({
    control,
    name: 'initiatives',
  });

  const [order, setOrder] = useState(0);

  function addItem(item) {
    prependInitiative(item);

    const initiatives = watch('initiatives');

    let maxInitiative = 0;
    initiatives.forEach((initiative) => {
      if (initiative.initiative > maxInitiative) maxInitiative = initiative.initiative;
    });

    const updatedList = [];

    for (let initiative = 0; initiative <= maxInitiative; initiative += 1) {
      for (let index = 0; index < initiatives.length; index += 1) {
        if (initiatives[index].initiative === initiative) {
          updatedList.unshift(initiatives[index]);
        }
      }
    }

    setValue('initiatives', updatedList);
  }

  function up(index) {
    const initiativeToDown = watch(`initiatives.${index - 1}`);
    const initiativeToUp = watch(`initiatives.${index}`);

    setValue(`initiatives.${index}`, initiativeToDown);
    setValue(`initiatives.${index - 1}`, initiativeToUp);
  }

  function down(index) {
    const initiativeToDown = watch(`initiatives.${index}`);
    const initiativeToUp = watch(`initiatives.${index + 1}`);

    setValue(`initiatives.${index}`, initiativeToUp);
    setValue(`initiatives.${index + 1}`, initiativeToDown);
  }

  function pushOrder() {
    if (order === fieldsInitiatives.length - 1) {
      setOrder(0);
    } else {
      setOrder(order + 1);
    }
  }

  return (
    <Box display="flex">
      <Box width="30vw" mx={1}>
        <Container component="form" sx={{ my: 1, p: 2, borderRadius: 2, bgcolor: 'background.paper' }} maxWidth="md">
          <AddNewList addItem={addItem} />
        </Container>

        {fieldsInitiatives.length > 0 ? (
          <Container component="form" sx={{ my: 1, p: 2, borderRadius: 2, bgcolor: 'background.paper' }} maxWidth="md">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <Button text="PRoximo" onClick={pushOrder} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Button text="limpar" onClick={() => resetField('initiatives')} />
              </Grid>
            </Grid>
          </Container>
        ) : null}
      </Box>

      <Box width="70vw" mx={1}>
        {fieldsInitiatives.map((field, index) => (
          <Container
            sx={{
              my: 1,
              p: 0.5,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: order === index ? 2 : 0,
              borderColor: 'primary.contrastText',
            }}
            maxWidth="md"
            key={field.id}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={2} textAlign="center">
                <ButtonGroup variant="text" size="large">
                  <IconButton onClick={() => removeInitiative(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>

                  {index !== 0 ? (
                    <IconButton onClick={() => up(index)}>
                      <ArrowDropUpIcon color="warning" />
                    </IconButton>
                  ) : null}

                  {index !== fieldsInitiatives.length - 1 ? (
                    <IconButton onClick={() => down(index)}>
                      <ArrowDropDownIcon color="warning" />
                    </IconButton>
                  ) : null}
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={7}>
                <TextInput
                  watch={watch}
                  register={register}
                  errors={errors?.name}
                  name={`initiatives.${index}.name`}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  focused={order === index}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <TextInput
                  watch={watch}
                  register={register}
                  errors={errors?.name}
                  name={`initiatives.${index}.initiative`}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  focused={order === index}
                />
              </Grid>
            </Grid>
          </Container>
        ))}
      </Box>
    </Box>
  );
}
