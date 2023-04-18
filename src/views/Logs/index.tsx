import { useState, useEffect } from "react";
import SidebarLayout from "@/layouts/SidebarLayout";
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import clsx from "clsx";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";

import { useRouter } from "next/router";
//
import styles from './Logs.module.scss'
import paths from "@/constants/paths";

import { useAppSelector, useAppDispatch } from "@/store/hook";
import { getAuthToken } from "@/services/http.service";
import { getSession } from 'next-auth/react';
import Navigation from "@/components/Navigation";


const Logs = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.system);


  useEffect(() => {
    let apiSubscribed = true;
    const getSettings = async () => {
      const data = {
        token: getAuthToken()
      }
      if (apiSubscribed) {
        // const res = await getUserSettings(data);
      }
    };

    getSettings();

    return () => {
      apiSubscribed = false;
    }
  }, [])

  return (
    <>
      <Head>
        <title>Logs</title>
      </Head>
      <Navigation title="Logs" />
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
        <Container maxWidth="lg" sx={{ padding: "20px 16px" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Card>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems="center"
                  width="100%"
                  height="100%"
                  p="20px"
                >
                  <Typography component="span" className={styles.countryLabel}>
                    Swidon
                  </Typography>
                  <p>
                    <Typography component="span" className={styles.arrivalLabel}>
                      10:00:00 AM
                    </Typography>
                  </p>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems="center"
                  width="100%"
                  height="100%"
                  px="20px"
                >
                  <Typography component="span" className={styles.timeLabel}>
                    Saturday 10/30
                  </Typography>
                  <p>
                    <Typography component="span" className={styles.timeLabel}>
                      05:45 AM - 09:45 AM
                    </Typography>
                  </p>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
  )
}
// Logs.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default Logs;
