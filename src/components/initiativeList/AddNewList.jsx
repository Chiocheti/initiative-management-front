import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid } from '@mui/material';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '../default/Button';
import TextInput from '../default/TextInput';
import Title from '../default/Title';

const listSchema = Yup.object({
  name: Yup.string().required('Digite o nome do personagem'),
  initiative: Yup.number().required('Digite a iniciativa do personagem'),
});

export default function AddNewList({ addItem }) {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
    resetField,
  } = useForm({
    resolver: yupResolver(listSchema),
    defaultValues: {
      name: '',
      initiative: '',
    },
  });

  const toFocus = useRef(null);

  function pushData(data) {
    addItem(data);
    resetField('initiative');

    if (toFocus.current) {
      toFocus.current.focus();
    }
  }

  return (
    <Container
      component="form"
      sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: 'background.paper' }}
      maxWidth="md"
      onSubmit={handleSubmit(pushData)}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={8}>
          <Title text="NOME DO PERSONAGEM" />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Title text="INICIATIVA" />
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <TextInput
            watch={watch}
            register={register}
            errors={errors?.name}
            name="name"
            variant="standard"
            inputRef={toFocus}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextInput
            watch={watch}
            register={register}
            errors={errors?.initiative}
            name="initiative"
            type="number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button text="Adicionar" onClick={handleSubmit(pushData)} />
        </Grid>
      </Grid>
    </Container>
  );
}
