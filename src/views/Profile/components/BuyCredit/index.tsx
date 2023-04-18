import { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import styles from './BuyCredit.module.scss';

const BuyCredit = ({ credits }: { credits: number }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttonArray = [
    {
      index: 0,
      value: 2,
      selected: selectedIndex === 0,
    },
    {
      index: 1,
      value: 10,
      selected: selectedIndex === 1,
    },
    {
      index: 2,
      value: 30,
      selected: selectedIndex === 2,
    },
    {
      index: 3,
      value: 50,
      selected: selectedIndex === 3,
    },
  ];

  const handleClickButtons = (index: number) => {
    setSelectedIndex(index);
  }

  return (
    <Box>
      <Card>
        <CardHeader title={`Credits: ${credits}`} sx={{ padding: "30px 17px 10px" }} className={styles.title} />
        <CardContent sx={{ paddingTop: "10px" }}>
          <Box>
            <Typography
              component={"p"}
              className={styles.subLabel}
            >
              {"Each credit allows you to accept one shift with our system"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt="30px"
          >
            {buttonArray.map((b, index) => (
              <Button
                key={index}
                variant={b.selected ? "contained" : "outlined"}
                className={b.selected ? clsx(styles.creditButton, styles.selected) : clsx(styles.creditButton)}
                onClick={() => handleClickButtons(b.index)}
              >
                {b.value}
              </Button>
            ))}
          </Box>
          <Box
          >
            <Box component="h3" className={styles.title}>
              Resellers
            </Box>
            <Box
              component="p"
              className={styles.subLabel}
            >
              Contact our support and let us know that you are interested in reselling to receive discounted prices for purchases of 100 credits or more.
            </Box>
          </Box>
          <Box
            mt="40px"
          >
            <Box component="p" className={styles.subLabel}>
              Invoice item:
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="p" className={styles.subLabel}>
                {credits} Credits
              </Typography>
              <Typography component="p" sx={{ color: "#54CCA1" }}>£20.00</Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            marginTop={"20px"}
          >
            <Button
              sx={{
                width: "100%",
                color: "white",
                height: "56px"
              }}
              variant="contained"
              color="primary"
            >
              Buy Now
            </Button>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            marginTop={"20px"}
          >
            <Button
              sx={{
                width: "100%",
                color: "white",
                height: "56px"
              }}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BuyCredit;