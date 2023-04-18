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
  // useTheme
} from '@mui/material';
import IOSSwitch from "@/components/Switch/IOSSwitch";
import clsx from "clsx";
import styles from "./Filter.module.scss";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import paths from "@/constants/paths";

import { useAppSelector, useAppDispatch } from "@/store/hook";
import { getSystemStatusSpec, pauseSystem, runSystem } from "@/store/status";
import settingsService from "@/services/settings.service";
import { getAuthToken } from "@/services/http.service";
import { getSession } from 'next-auth/react';
import { getUserSettings, updateUserSettings } from "@/utils/api/http";

export interface UserSettings {
  mon: SettingValue | null;
  tue: SettingValue | null;
  wed: SettingValue | null;
  thur: SettingValue | null;
  fri: SettingValue | null;
  sat: SettingValue | null;
  sun: SettingValue | null;
}

export interface SettingValue {
  st: string;
  bt: number;
  e: boolean;
  et: string;
}


export function parseUserSettings(data: any): UserSettings {
  let resp = {}
  for (let ke of Object.keys(data)) {
    resp[ke] = data[ke]
  }

  return resp as UserSettings
}

const Filter = () => {
  // const theme = useTheme();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.system);
  const dateArray = [
    {
      index: 0,
      key: 'sun',
      label: "S",
      title: "Sunday",
      editing: selectedIndex === 0,
      selected: selectedIndex === 0,
    },
    {
      index: 1,
      key: 'mon',
      label: "M",
      title: "Monday",
      editing: selectedIndex === 1,
      selected: selectedIndex === 1,
    },
    {
      index: 2,
      label: "T",
      key: 'tue',
      title: "Monday",
      editing: selectedIndex === 2,
      selected: selectedIndex === 2,
    },
    {
      index: 3,
      label: "W",
      key: 'wed',
      title: "Wednesday",
      editing: selectedIndex === 3,
      selected: selectedIndex === 3,
    },
    {
      index: 4,
      label: "T",
      key: 'thur',
      title: "Thursday",
      editing: selectedIndex === 4,
      selected: selectedIndex === 4,
    },
    {
      index: 5,
      label: "F",
      key: 'fri',
      title: "Friday",
      editing: selectedIndex === 5,
      selected: selectedIndex === 5,
    },
    {
      index: 6,
      label: "S",
      key: 'sat',
      title: "Saturday",
      editing: selectedIndex === 6,
      selected: selectedIndex === 6,
    },
  ];

  const [arriveTimeValue, setArriveTimeValue] = useState(50);
  const [dayTimeValue, setDayTimeValue] = useState([5, 17]);
  const [rejectAllChecked, setRejectAllChecked] = useState(false);

  const [userSettings, setUserSettings] = useState<UserSettings>(null);
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
  const [telegramUserId, setTelegramUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!window.Telegram.WebApp.isExpanded) {
      window.Telegram.WebApp.expand();
    }

    // window.Telegram.WebApp.enableClosingConfirmation();

    // window.Telegram.WebApp.MainButton.color = '#22c55e';
    // window.Telegram.WebApp.MainButton.text = `Checkout`;

    // window.Telegram.WebApp.MainButton.isActive = true;
    // window.Telegram.WebApp.MainButton.isVisible = true;
    const search = window.Telegram.WebApp.initData
    if (search) {
      const converted = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
      console.log(JSON.parse(converted.user));
      const user = JSON.parse(converted.user);

      setTelegramUsername(user.username);
      setTelegramUserId(user.id);
    }


    // window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
    //   router.push(paths.profile);
    // });
  }, [router]);

  useEffect(() => {
    let apiSubscribed = true;
    const getSettings = async () => {
      const data = {
        token: getAuthToken()
      }
      if (apiSubscribed) {
        const res = await getUserSettings(data);
        console.log(res);
        // setUserSettings(parseUserSettings(res));
        setUserSettings(res);
      }
    };

    getSettings();

    return () => {
      apiSubscribed = false;
    }
  }, [])


  // custom
  const getPreviousSettings = () => {
    let previousSettings = { ...userSettings };
    const previousValue = previousSettings[dateArray[selectedIndex].key];

    return { previousSettings, previousValue }
  }
  // ** Actions
  const handleClickDateButtons = (index: number) => {
    setSelectedIndex(index);
  }

  const handleChangeStatus = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(runSystem());
    } else {
      dispatch(pauseSystem());
    }
  };

  const handleChangeArriveTime = (event, newValue: number) => {
    setArriveTimeValue(newValue);
    if (!userSettings) return;
    let { previousSettings, previousValue } = getPreviousSettings();
    previousValue.bt = newValue;
    setUserSettings({ ...previousSettings });
  };

  const handleChangeDayTimeRange = (event, newValue: Array<number>) => {
    setDayTimeValue(newValue);
    if (!userSettings) return;
    let { previousSettings, previousValue } = getPreviousSettings()
    previousValue.st = convertTimeToString(newValue[0]);
    previousValue.et = convertTimeToString(newValue[1]);
    setUserSettings({ ...previousSettings });
  };

  const handleChangeRejectAll = (event) => {
    setRejectAllChecked(event.target.checked);
    if (!userSettings) return;
    let { previousSettings, previousValue } = getPreviousSettings()
    previousValue.e = event.target.checked;
    setUserSettings({ ...previousSettings });
  }

  const handleClickSave = async () => {
    console.log(userSettings)
    const session = await getSession();
    if (session && userSettings) {
      console.log(session)
      const data = {
        token: session.user.accessToken,
        userId: session.user.id,
        setting: JSON.stringify(userSettings)
      }

      // const res = await settingsService.updateUserSettings(data);
      const res = await updateUserSettings(data);
      console.log(res);
      alert(res.msg)
    }
    
  }

  return (
    <>
      <Head>
        <title>WeJustGrab</title>
      </Head>
      <Container maxWidth="lg" sx={{ padding: "20px 16px" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card sx={{ height: "60px", mb: 3 }}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
                p="20px"
              >
                <Typography component="span" className={styles.rowTitle}>
                  Telegram Username: <span style={{ color: `${getSystemStatusSpec(status).color}` }}>{`${telegramUsername}`}</span>
                </Typography>
              </Box>
            </Card>
            <Card sx={{ height: "60px", mb: 3 }}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
                p="20px"
              >
                <Typography component="span" className={styles.rowTitle}>
                  Telegram UserId: <span style={{ color: `${getSystemStatusSpec(status).color}` }}>{`${telegramUserId}`}</span>
                </Typography>
              </Box>
            </Card>
            <Card sx={{ height: "60px" }}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
                p="20px"
              >
                <Typography component="span" className={styles.rowTitle}>
                  System Status: <span style={{ color: `${getSystemStatusSpec(status).color}` }}>{`${getSystemStatusSpec(status).label}`}</span>
                </Typography>
                <IOSSwitch sx={{ m: 0 }} checked={checked} onChange={handleChangeStatus} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ padding: "20px" }}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Typography component="span" className={styles.arriveTitle}>
                  Time To Arrive
                </Typography>
                <p>{`${userSettings && Object.keys(userSettings).length ? userSettings[dateArray[selectedIndex].key].bt : arriveTimeValue}min`}</p>
              </Box>
              <Box width="100%">
                <Slider
                  value={userSettings && Object.keys(userSettings).length ? userSettings[dateArray[selectedIndex].key].bt : arriveTimeValue}
                  aria-label="time to arrive"
                  valueLabelDisplay="auto"
                  onChange={handleChangeArriveTime}
                />
                <p className={styles.subLabel}>Ignore offers that start less than {arriveTimeValue} minutes form now.</p>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box display={"flex"} alignItems="center" justifyContent="space-between">
              {dateArray.map((d, index) => (
                <Button
                  key={index}
                  variant={d.selected ? "contained" : "outlined"}
                  className={d.selected ? clsx(styles.dateButton, styles.selected) : clsx(styles.dateButton)}
                  onClick={() => handleClickDateButtons(d.index)}
                >
                  {d.label}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ padding: "20px" }}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Typography component="span" className={styles.arriveTitle}>
                  {dateArray[selectedIndex].title}
                </Typography>
                <p>
                  {userSettings && Object.keys(userSettings).length &&
                    <span>
                      {/* {`${userSettings[dateArray[selectedIndex].key].st.toFixed(2)}-${userSettings[dateArray[selectedIndex].key].et.toFixed(2)}`} */}
                      {userSettings[dateArray[selectedIndex].key].st} - {userSettings[dateArray[selectedIndex].key].et}
                    </span>
                  }
                </p>
              </Box>
              <Box width="100%" mb={"20px"}>
                <Slider
                  min={0}
                  max={24}
                  getAriaLabel={() => 'Time range'}
                  value={userSettings && Object.keys(userSettings).length ? [convertStringToTimeValue(userSettings[dateArray[selectedIndex].key].st), convertStringToTimeValue(userSettings[dateArray[selectedIndex].key].et)] : dayTimeValue}
                  onChange={handleChangeDayTimeRange}
                  valueLabelDisplay="auto"
                  getAriaValueText={() => 'Time range'}
                />
                <p className={styles.subLabel}>Select your avalibility range for Monday.</p>
              </Box>
              <Divider />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
                mt="14px"
              >
                <div>
                  <Typography component="span" className={styles.rejectAll}>
                    Reject All
                  </Typography>
                  <p className={styles.subLabel}>Ignore all offers for Monday</p>
                </div>
                <IOSSwitch
                  sx={{ m: 0 }}
                  checked={userSettings && Object.keys(userSettings).length ? userSettings[dateArray[selectedIndex].key].e : rejectAllChecked}
                  onChange={handleChangeRejectAll}
                />
              </Box>
            </Card>
          </Grid>
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
                <IOSSwitch sx={{ m: 0 }} defaultChecked />
              </Box>
              <Divider />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
                width="100%"
                height="100%"
                p="20px"
              >
                <Typography component="span" className={styles.countryLabel}>
                  London
                </Typography>
                <IOSSwitch sx={{ m: 0 }} defaultChecked />
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
                  onClick={handleClickSave}
                >
                  Save
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
Filter.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default Filter;

const convertStringToTimeValue = (v: string) => {

  if (v.toLocaleLowerCase().includes('pm')) {
    const a = v.split(':');
    return (parseInt(a[0]) + 12);
  } else if (v.toLocaleLowerCase().includes('am')) {
    const a = v.split(':');
    return parseInt(a[0]);
  }
  return 0;
}

const convertTimeToString = (t: number) => {
  if (t > 12) {
    return `${t - 12}:00PM`
  }
  return `${t}:00AM`
}