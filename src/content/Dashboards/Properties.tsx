import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  styled
} from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { addToListedProperties } from '@/store/properties';
interface FormDataType {
  totalCost: string;
  totalTax: string;
  area: string;
}

const Img = styled('img')({

  display: 'block',
  height: '150px',
  width: '100%',
  maxWidth: '100%',
  maxHeight: '150px',
});

const Properties = ({ properties }: { properties: any[] }) => {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const dispatch = useAppDispatch();
  // ** Actions
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClickProperty = (p: any) => {
    setSelectedProperty(p);
    setDialogOpen(true);
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    setDialogOpen(false);
    const newProperty = {
      ...selectedProperty,
      ...formData
    }
    dispatch(addToListedProperties(newProperty));
    setSelectedProperty(null);
    setFormData(null);
  }

  return (
    <>
      <Grid container spacing={3}>
        {properties.map((p) => (
          <Grid key={p.id} xs={12} sm={6} md={3} item>
            <Card
              sx={{
                height: '350px',
                maxHeight: '350px'
              }}
              onClick={() => handleClickProperty(p)}
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
                          {p.address.full}
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
      <Dialog open={dialogOpen} onClose={handleClose}>
        <form noValidate autoComplete='off' onSubmit={handleFormSubmit}>
          <DialogTitle>{selectedProperty?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add more details for the property.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="total_cost"
              name="totalCost"
              label="Total Cost"
              type="text"
              fullWidth
              variant="standard"
              value={formData?.totalCost || ''}
              onChange={handleFormDataChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="total_tax"
              name="totalTax"
              label="Total Tax"
              type="text"
              fullWidth
              variant="standard"
              value={formData?.totalTax || ''}
              onChange={handleFormDataChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="area"
              name="area"
              label="Area"
              type="text"
              fullWidth
              variant="standard"
              value={formData?.area || ''}
              onChange={handleFormDataChange}
            />


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Properties;
