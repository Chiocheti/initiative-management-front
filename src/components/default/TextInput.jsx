import TextField from '@mui/material/TextField';

export default function TextInput({ watch, register, errors, name, label, variant, focused, ...rest }) {
  return (
    <TextField
      defaultValue={0}
      label={label}
      variant={variant}
      size="small"
      fullWidth
      focused={focused}
      error={!!errors}
      helperText={errors?.message}
      InputLabelProps={{
        shrink: !!watch(name),
        color: 'primary',
      }}
      sx={{
        input: {
          color: 'primary.contrastText',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '28px',
        },
      }}
      {...register(name)}
      {...rest}
    />
  );
}
