import React, { FC, PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const MuiTheme: FC<PropsWithChildren<{}>> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#161d2f",
      },
      secondary: {
        main: "#C5A867",
      },
    },
    components: {
      MuiOutlinedInput: {
        defaultProps: {
          color: "secondary",
        },
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C5A867",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C5A867",
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
