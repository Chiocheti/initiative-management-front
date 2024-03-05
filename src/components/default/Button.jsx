import MuiButton from '@mui/material/Button';

export default function Button({ text, color, ...rest }) {
  return (
    <MuiButton sx={{ height: '100%' }} variant="outlined" color={color} fullWidth {...rest}>
      {text}
    </MuiButton>
  );
}
