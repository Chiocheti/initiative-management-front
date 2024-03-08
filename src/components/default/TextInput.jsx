import TextField from '@mui/material/TextField';

export default function TextInput({ watch, register, errors, name, label, variant, focused, ...rest }) {
  return (
    <TextField
      defaultValue={0}
      label={label}
      variant={variant}
      fullWidth
      focused={focused}
      error={!!errors}
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
          fontSize: '16px',
        },
      }}
      {...register(name)}
      {...rest}
    />
  );
}
