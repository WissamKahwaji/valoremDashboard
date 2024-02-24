import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <Stack
      justifyContent={"center"}
      direction={"row"}
      alignItems={"center"}
      minHeight={"97vh"}
    >
      <Typography variant="h4" component={"h1"}>
        you are un authorized to access Valorem Real Estate{" "}
        <Link to={"/sign-in"}>sign in</Link>{" "}
      </Typography>
    </Stack>
  );
};

export default UnAuthorized;
