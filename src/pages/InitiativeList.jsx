import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '../components/default/Button';
import AddNewList from '../components/initiativeList/AddNewList';
import AdventureItem from '../components/initiativeList/AdventureItem';

const listSchema = Yup.object({
  adventures: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Digite o nome do personagem'),
      initiative: Yup.number().required('Digite a iniciativa do personagem'),
      life: Yup.number().required('Digite a vida do personagem'),
      armor: Yup.number().required('Digite a ca do personagem'),
      status: Yup.array().of(Yup.string()),
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

  const savedAdventuresList = useRef([]);

  useEffect(() => {
    function findData() {
      const getAdventures = Cookies.get('adventures');
      const getSavedAdventuresList = Cookies.get('savedAdventures');

      if (getAdventures) {
        setValue('adventures', JSON.parse(getAdventures));
      }
      if (getSavedAdventuresList) {
        savedAdventuresList.current = JSON.parse(getSavedAdventuresList);
      }
    }

    findData();
  }, [setValue]);

  function saveData(savedAdventures) {
    Cookies.set('adventures', JSON.stringify(watch('adventures')));
    Cookies.set('savedAdventures', JSON.stringify(savedAdventures));
  }

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
        <AddNewList addItem={addItem} saveData={saveData} savedAdventuresList={savedAdventuresList.current} />

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
          <AdventureItem
            key={field.id}
            watch={watch}
            register={register}
            errors={errors}
            setValue={setValue}
            index={index}
            order={order}
            up={up}
            down={down}
            handleRemoveAdventure={handleRemoveAdventure}
            fieldsAdventures={fieldsAdventures}
          />
        ))}
      </Box>
    </Box>
  );
}
