import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import type { GetServerSideProps } from "next/types";
import { useEffect, useState } from 'react';
import Properties from '@/content/Dashboards/Properties';
import { useAppSelector } from '@/store/hook';
import ListedProperties from '@/content/Dashboards/ListedProperties';

function Listed(props: any) {
  const { data } = useAppSelector(state => state.listed);
  return (
    <>
      <Head>
        <title>Listed Properties</title>
      </Head>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item lg={12} xs={12} mt={4}>
            <ListedProperties properties={data} />
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

Listed.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Listed;


export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {

    }
  }
}