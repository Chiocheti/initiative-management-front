import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Title({ text }) {
  return (
    <Grid>
      <Typography
        sx={{ color: 'primary.contrastText' }}
        bgcolor="paper"
        component="h3"
        textAlign="center"
        fontWeight="bold"
        fontSize="12px"
      >
        {text}
      </Typography>
    </Grid>
  );
}
