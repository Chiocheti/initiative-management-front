import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Title({ text }) {
  return (
    <Grid>
      <Typography
        sx={{ color: 'primary.contrastText' }}
        bgcolor="paper"
        component="h3"
        variant="subtitle1"
        textAlign="center"
        fontWeight="bold"
      >
        {text}
      </Typography>
    </Grid>
  );
}
