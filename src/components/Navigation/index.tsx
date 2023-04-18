import { ArrowBackIos, Forward } from '@mui/icons-material';
import {
  Box,
  alpha,
  lighten,
  styled,
  useTheme,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router'
const NavigationWrapper = styled(Box)(
  ({ theme }) => `
      height: ${theme.header.height};
      color: ${theme.header.textColor};
      padding: ${theme.spacing(0, 2)};
      right: 0;
      z-index: 6;
      background-color: ${alpha(theme.header.background, 0.95)};
      backdrop-filter: blur(3px);
      position: fixed;
      width: 100%;
      @media (min-width: ${theme.breakpoints.values.lg}px) {
          left: ${theme.sidebar.width};
          width: auto;
      }
  `
);

const Navigation = ({ title }: { title: string }) => {

  const theme = useTheme();
  const router = useRouter();
  return (
    <NavigationWrapper
      position={"relative"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.7),
              0.15
            )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.2
            )}, 0px 5px 22px -4px ${alpha(
              theme.colors.alpha.black[100],
              0.1
            )}`
      }}
    >

      <Box
        display="flex"
        alignItems="center"
        width={"100%"}
        marginTop={"44px"}
        height={"48px"}
      >
        <IconButton aria-label="delete" onClick={() => {router.back()}}>
          <ArrowBackIos />
        </IconButton>
        <Box
          position={"absolute"}
          left={0}
          right={0}
          marginLeft={"auto"}
          marginRight={"auto"}
          width="200px"
          padding={"0"}
        >
          <Typography
            component={"p"}
            sx={{
              color: theme.header.titleColor,
              textAlign: "center",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "24px",
            }}
          >
            {title}
          </Typography>
        </Box>

      </Box>

    </NavigationWrapper>
  );
};

export default Navigation;