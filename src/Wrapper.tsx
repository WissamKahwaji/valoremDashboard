import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MuiTheme from "./libs/mui/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import Routes from "./routes";

const Wrapper = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CssBaseline>
        <MuiTheme>
          <Routes />
          <ToastContainer />
        </MuiTheme>
      </CssBaseline>
    </QueryClientProvider>
  );
};

export default Wrapper;
