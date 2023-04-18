import React, { useState } from 'react';
import Head from 'next/head';
import withAuth from "@/withAuth";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import Navigation from '@/components/Navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import BuyCredit from './components/BuyCredit';
import { useAppDispatch } from '@/store/hook';
import { loggedOut } from '@/store/auth';
import { signOut } from "next-auth/react";

const Profile = () => {
  const theme = useTheme();
  const [credits, setCredits] = useState(25);
  const [buySectionShow, setBuySectionShow] = useState(false);
  const dispatch = useAppDispatch();
  // const handleClickBuyMore = () => {
  //   setBuySectionShow(true);
  // };

  const handleClickContact = () => {

  };

  const handleClickLogout = () => {
    dispatch(loggedOut());
    signOut();
  }

  // const handleClickAddAccounts = () => {

  // };

  const listArr = [
    // {
    //   title: `Credits: ${credits}`,
    //   buttonTitle: "Buy More",
    //   action: handleClickBuyMore
    // },
    {
      title: `Support`,
      buttonTitle: "Contact",
      action: handleClickContact
    },
    // {
    //   title: `Accounts`,
    //   buttonTitle: "Add Accounts",
    //   action: handleClickAddAccounts
    // },
  ]

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Navigation title="Profile" />
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          display: 'block',
          flex: 1,
          pt: `${theme.header.height}`,
          [theme.breakpoints.up('lg')]: {
            ml: `${theme.sidebar.width}`
          }
        }}
      >
        <Box display="block">
          <Container maxWidth="lg" sx={{ padding: "20px 16px" }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <Card sx={{ height: "162px" }}>
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    justifyContent={"center"}
                    alignItems="center"
                    width="100%"
                    height="100%"
                  >
                    <img
                      src={"/static/images/svgs/user-profile.svg"}
                      alt={"link account"}
                      loading="lazy"
                    />
                    <Typography
                      component={"p"}>
                      {"john@gmail.com"}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              {buySectionShow ? (
                <Grid item xs={12}>
                  <BuyCredit credits={credits} />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Card>
                    <CardContent sx={{ paddingTop: "10px" }}>
                      <Box>
                        <List dense sx={{
                          padding: 0
                        }}>
                          {listArr.map((item, index) => (
                            <React.Fragment key={index}>
                              <ListItem
                                sx={{
                                  padding: "20px 0",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  component={"p"}
                                  sx={{
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    lineHeight: "20px",
                                    color: "#32406D",
                                    opacity: "0.9"
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                <Button
                                  variant="text"
                                  sx={{
                                    textTransform: "uppercase",
                                    padding: 0,
                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                  }}
                                  onClick={item.action}
                                >
                                  {item.buttonTitle}
                                </Button>
                              </ListItem>
                              {index % 3 !== 2 &&
                                <Divider />
                              }
                            </React.Fragment>
                          ))}
                        </List>
                      </Box>
                      {/* <Box
                      component={"p"}
                      sx={{
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "20px",
                        color: "#AEBBE4",
                      }}
                    >
                      Add multiple accounts that can run and accept shifts at the same time
                    </Box> */}
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        marginTop={"40px"}
                      >
                        <Button
                          sx={{
                            width: "100%",
                            color: "white",
                            height: "56px"
                          }}
                          variant="contained"
                          color="primary"
                          onClick={handleClickLogout}
                        >
                          Logout
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}
// Login.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>
// export default withAuth(Profile);
export default Profile;
