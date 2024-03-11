import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PushPinIcon from '@mui/icons-material/PushPin';
import SaveIcon from '@mui/icons-material/Save';
import ShieldIcon from '@mui/icons-material/Shield';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '../default/Button';
import TextInput from '../default/TextInput';

const listSchema = Yup.object({
  name: Yup.string().required('Digite o nome do personagem'),
  initiative: Yup.number().required('Digite a iniciativa do personagem'),
  life: Yup.number().required('Digite a vida do personagem'),
  armor: Yup.number().required('Digite a ca do personagem'),
  savedAdventures: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Digite o nome do personagem'),
      initiative: Yup.number().required('Digite a iniciativa do personagem'),
      life: Yup.number().required('Digite a vida do personagem'),
      armor: Yup.number().required('Digite a ca do personagem'),
    }),
  ),
});

export default function AddNewList({ addItem }) {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
    resetField,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(listSchema),
    defaultValues: {
      name: '',
      initiative: '',
      life: '',
      armor: '',
      savedAdventures: [],
    },
  });

  const {
    fields: fieldsSavedAdventures,
    prepend: prependSavedAdventure,
    remove: removeSavedAdventure,
  } = useFieldArray({
    control,
    name: 'savedAdventures',
  });

  const [save, setSave] = useState(false);

  async function pushData({ savedAdventures, ...rest }) {
    if (save) {
      prependSavedAdventure(rest);
      setSave(false);
    }

    addItem(rest);

    resetField('name');
    resetField('initiative');
    resetField('life');
    resetField('armor');
  }

  function handleUpdateSave() {
    setSave(!save);
  }

  function sendSaveAdventure(index) {
    setValue('name', watch(`savedAdventures.${index}.name`));
    setValue('life', watch(`savedAdventures.${index}.life`));
    setValue('armor', watch(`savedAdventures.${index}.armor`));
  }

  return (
    <>
      <Container component="form" sx={{ my: 1, p: 2, borderRadius: 2, bgcolor: 'background.paper' }} maxWidth="md">
        <Grid container>
          <Grid item xs={6} sm={6} md={6}>
            <Typography
              sx={{ color: 'primary.contrastText' }}
              component="h3"
              textAlign="center"
              fontWeight="bold"
              fontSize="20px"
            >
              NOME
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} textAlign="center">
            <PushPinIcon color="info" />
          </Grid>
          <Grid item xs={2} sm={2} md={2} textAlign="center">
            <FavoriteIcon color="error" />
          </Grid>
          <Grid item xs={2} sm={2} md={2} textAlign="center">
            <ShieldIcon color="warning" />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} md={6}>
            <TextInput watch={watch} register={register} errors={errors?.name} name="name" variant="standard" />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <TextInput
              watch={watch}
              register={register}
              errors={errors?.initiative}
              name="initiative"
              type="number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <TextInput
              watch={watch}
              register={register}
              errors={errors?.life}
              name="life"
              type="number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <TextInput
              watch={watch}
              register={register}
              errors={errors?.armor}
              name="armor"
              type="number"
              variant="standard"
            />
          </Grid>

          <Grid item xs={2} sm={1} md={2}>
            <Checkbox
              checked={save}
              icon={<SaveIcon color="primary" />}
              checkedIcon={<SaveIcon color="warning" />}
              onClick={handleUpdateSave}
            />
          </Grid>

          <Grid item xs={10} sm={11} md={10}>
            <Button text="adicionar" onClick={handleSubmit(pushData)} />
          </Grid>
        </Grid>
      </Container>

      {fieldsSavedAdventures.length > 0 ? (
        <Container component="form" sx={{ my: 1, p: 2, borderRadius: 2, bgcolor: 'background.paper' }} maxWidth="md">
          <Grid container>
            <Grid item xs={1.5} sm={1} md={1.5} />

            <Grid item xs={5} sm={6} md={5}>
              <Typography
                sx={{ color: 'primary.contrastText' }}
                component="h3"
                textAlign="center"
                fontWeight="bold"
                fontSize="20px"
              >
                NOME
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2} textAlign="center">
              <FavoriteIcon color="error" />
            </Grid>

            <Grid item xs={2} sm={2} md={2} textAlign="center">
              <ShieldIcon color="warning" />
            </Grid>
          </Grid>

          {fieldsSavedAdventures.map((field, index) => (
            <Grid key={field.id} container spacing={1}>
              <Grid item xs={1.5} sm={1} md={1.5}>
                <IconButton onClick={() => removeSavedAdventure(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>

              <Grid item xs={5} sm={6} md={5} alignSelf="center" textAlign="center">
                <TextInput
                  watch={watch}
                  register={register}
                  name={`savedAdventures.${index}.name`}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={2} sm={2} md={2} alignSelf="center" textAlign="center">
                <TextInput
                  watch={watch}
                  register={register}
                  name={`savedAdventures.${index}.life`}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={2} sm={2} md={2} alignSelf="center" textAlign="center">
                <TextInput
                  watch={watch}
                  register={register}
                  name={`savedAdventures.${index}.armor`}
                  variant="standard"
                />
              </Grid>

              <Grid item xs={1.5} sm={1} md={1.5}>
                <IconButton onClick={() => sendSaveAdventure(index)}>
                  <PersonAddIcon color="info" />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Container>
      ) : null}
    </>
  );
}
