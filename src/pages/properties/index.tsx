import React, { SetStateAction, useState } from "react";
import { useGetPropertiesInfoQuery } from "../../apis/properties/queries";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Grid,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import PropertyCard from "../../components/items/cards/property";

const Properties = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) =>
    setSearch(e.target.value);

  const { data: properties } = useGetPropertiesInfoQuery();

  const filteredProperties = properties?.filter(property =>
    property.name.toLowerCase().includes(search.toLowerCase())
  );

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
        properties
      </Typography>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "default",
          p: 1,
          backgroundColor: "#10141f",
          borderColor: "none",
          mb: 2,
        }}
      >
        <InputBase
          placeholder="Search for Properties..."
          value={search}
          onChange={handleSearch}
          sx={{
            ml: 1,
            flex: 1,
            color: "white",
            border: "none",
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon
                sx={{
                  width: 20,
                  height: 20,
                  color: "white",
                }}
              />
            </InputAdornment>
          }
        />
      </Paper>
      <Grid container gap={4}>
        {filteredProperties &&
          filteredProperties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box p={1}>
                <PropertyCard key={index} property={property} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Properties;
