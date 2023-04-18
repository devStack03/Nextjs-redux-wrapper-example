import {
  Card,
  Grid,
  CardContent,
  Typography,
  styled
} from '@mui/material';

const Img = styled('img')({
  display: 'block',
  height: '150px',
  width: '100%',
  maxWidth: '100%',
  maxHeight: '150px',
});

const ListedProperties = ({ properties }: { properties: any[] }) => {
  console.log(properties);
  return (
    <>
      <Grid container spacing={3}>
        {properties && properties.map((p) => (
          <Grid key={p.id} xs={12} sm={6} md={3} item>
            <Card
              sx={{
                height: '350px',
                maxHeight: '350px'
              }}
            >
              <CardContent sx={{
                px: 0
              }}>
                {/* <Paper
                sx={{
                  p: 2,
                  margin: 'auto',
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              > */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ paddingTop: '0 !important' }}>
                    <Img alt="complex" src={p.display_image} />
                  </Grid>
                  <Grid item xs={12} sm container p={2}>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div" pl={2}>
                          {`$${p.prices.base_price}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" pl={2}>
                          Cost: {p.totalCost}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" pl={2}>
                          Tax: {p.totalTax}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" pl={2}>
                          Area: {p.area}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        4.5
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Paper> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ListedProperties;
