import {
  Card,
  Grid,
  CardContent,
  Typography,
  styled
} from '@mui/material';
interface FormDataType {
  totalCost: string;
  totalTax: string;
  area: string;
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  height: '150px',
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
              <CardContent>
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
                  <Grid item xs={12}>
                    <Img alt="complex" src={p.display_image} />
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {`$${p.prices.base_price}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cost: {p.totalCost}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tax: {p.totalTax}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
