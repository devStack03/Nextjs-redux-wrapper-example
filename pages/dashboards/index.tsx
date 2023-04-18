import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import type { GetServerSideProps } from "next/types";
import { useEffect, useState } from 'react';
import Properties from '@/content/Dashboards/Properties';

function DashboardCrypto(props: any) {

  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      const data = await fetch('/api/properties').then((res) => res.json());
      console.log(data);
      if (data.rows.length) {
        setProperties(data.rows);
      }
    };
    getProperties();
  }, [])
  return (
    <>
      <Head>
        <title>Dashboard</title>
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
            <Properties properties={properties}/>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;


export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
       
    }
  }
}