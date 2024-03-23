import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioButtonProps {
  label: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  val?: string;
}

const MuiTypeRadioButton: React.FC<RadioButtonProps> = ({
  label,
  options,
  onChange,
  val,
}) => {
  const [value, setValue] = useState(val ?? "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel id="property-type-label" sx={{ color: "white" }}>
          {label}
        </FormLabel>
        <RadioGroup
          id="property-type"
          aria-labelledby="property-type-label"
          value={value}
          onChange={handleChange}
          row
        >
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              control={<Radio sx={{ color: "white" }} color="secondary" />}
              label={option.label}
              value={option.value}
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default MuiTypeRadioButton;
