import MuiButton from '@mui/material/Button';

export default function Button({ text, color, ...rest }) {
  return (
    <MuiButton
      sx={{ height: '100%', borderColor: 'primary.contrastText' }}
      variant="outlined"
      color={color}
      fullWidth
      {...rest}
    >
      {text}
    </MuiButton>
  );
}
