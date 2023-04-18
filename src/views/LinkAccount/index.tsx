import { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme
} from '@mui/material';
import Navigation from '@/components/Navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LinkAccount = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Link Account</title>
      </Head>
      <Navigation title="Link Account" />
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
                    justifyContent={"center"}
                    alignItems="center"
                    width="100%"
                    height="100%"
                  >
                    <img
                      src={"/static/images/svgs/link_group.svg"}
                      alt={"link account"}
                      loading="lazy"
                    />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Link New Account" sx={{ padding: "23px 20px 0" }} />
                  <CardContent sx={{ paddingTop: "10px" }}>
                    <Box>
                      <Typography
                        component={"p"}
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "20px",
                        }}
                      >
                        {"Login into your amazon account and once you see the words ‘Something went wrong!’"}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="20px"
                      justifyContent={"center"}
                      width="100%"
                      marginTop={"50px"}
                    >
                      <FormControl
                        sx={{ width: '100%' }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-username"
                          type={'text'}
                          startAdornment={
                            <InputAdornment position="start">
                              <img
                                alt="username"
                                src="/static/images/svgs/person.svg"
                                width="24px"
                                height="24px"
                              />
                            </InputAdornment>
                          }
                          label="Username"
                        />
                      </FormControl>
                      <FormControl
                        sx={{ width: '100%' }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          startAdornment={
                            <InputAdornment position="start">
                              <img
                                alt="password"
                                src="/static/images/svgs/password_key.svg"
                                width="24px"
                                height="24px"
                              />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{
                                  color: "#00000033"
                                }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </Box>
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
                      >
                        Submit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}
// Login.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>
export default LinkAccount;