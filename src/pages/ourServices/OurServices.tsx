import React from "react";
import { useGetOurServicesInfoQuery } from "../../apis/out_services/queries";
import { Box, Grid, Typography } from "@mui/material";
import ServiceCard from "../../components/items/cards/ourServices";

const OurServices = () => {
  const { data: servicesInfo } = useGetOurServicesInfoQuery();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        services
      </Typography>
      <Grid container gap={4}>
        {servicesInfo &&
          servicesInfo.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box p={1}>
                <ServiceCard service={service} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default OurServices;
