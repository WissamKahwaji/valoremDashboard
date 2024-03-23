import React, { SetStateAction, useState } from "react";
import { useGetPropertiesInfoQuery } from "../../apis/properties/queries";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Grid,
  InputAdornment,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import PropertyCard from "../../components/items/cards/property";
import { typeProperty, subTypeProperty } from "../../apis/properties/type";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Properties = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<typeProperty | "">("");
  const [filterSubType, setFilterSubType] = useState<subTypeProperty | "">("");
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) =>
    setSearch(e.target.value);

  const { data: properties } = useGetPropertiesInfoQuery();

  const filteredProperties = properties?.filter(
    property =>
      property.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? property.type === filterType : true) &&
      (filterSubType ? property.subType === filterSubType : true)
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
        Properties
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
        <Select
          value={filterType}
          onChange={e => setFilterType(e.target.value as typeProperty | "")}
          displayEmpty
          inputProps={{ "aria-label": "Select property type" }}
          sx={{
            color: "white",
            "& .MuiSelect-icon": {
              color: "white",
            },
          }}
          IconComponent={ExpandMoreIcon}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value={typeProperty.COMMERCIAL}>Commercial</MenuItem>
          <MenuItem value={typeProperty.RESIDENTIAL}>Residential</MenuItem>
        </Select>
        {filterType === typeProperty.RESIDENTIAL && (
          <Select
            value={filterSubType}
            onChange={e =>
              setFilterSubType(e.target.value as subTypeProperty | "")
            }
            displayEmpty
            inputProps={{ "aria-label": "Select property subtype" }}
            sx={{
              color: "white",
              "& .MuiSelect-icon": {
                color: "white",
              },
            }}
            IconComponent={KeyboardArrowRightIcon}
          >
            <MenuItem value="">All Subtypes</MenuItem>
            <MenuItem value={subTypeProperty.OFF_PLAN}>Off Plan</MenuItem>
            <MenuItem value={subTypeProperty.SECONDARY}>
              Secondary Projects
            </MenuItem>
          </Select>
        )}
      </Paper>
      <Grid container gap={4}>
        {filteredProperties &&
          filteredProperties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <PropertyCard property={property} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Properties;
