import React, { SetStateAction, useState } from "react";
import { useGetInterPropertiesInfoQuery } from "../../apis/inter_properties/queries";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InterPropertyCard from "../../components/items/cards/inter_property";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const InterProperties = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) =>
    setSearch(e.target.value);

  const { data: interProperties } = useGetInterPropertiesInfoQuery();
  const filteredProperties = interProperties?.filter(property =>
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
        international properties
      </Typography>
      <Grid item xs={6} textAlign="end" sx={{ margin: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-inter-property")}
        >
          <AddIcon /> Add
        </Button>
      </Grid>
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
                <InterPropertyCard key={index} property={property} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default InterProperties;
