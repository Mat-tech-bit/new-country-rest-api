"use client"
import React from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeToggleButton } from "../theme";


type NavAndSearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedRegion: string;
  setselectedRegion: (value: string) => void;
};

const NavAndSearch: React.FC<NavAndSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setselectedRegion,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setselectedRegion(event.target.value as string);
  };

  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Where in the World
          </Typography>
          <ThemeToggleButton />
        </Box>
        <Box
          sx={{
            py: "10px",
            px: "10px",
            margin: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <TextField
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: { xs: "100%", sm: "100%", md: "100%" } }}
              value={searchQuery}
              placeholder="Search for a country"
              variant="filled"
              InputProps={{
                disableUnderline: true, // removes the bottom outline
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ minWidth: 145 }}>
            {" "}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                filter by region
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRegion}
                label="filter by region"
                onChange={handleChange}
              >
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">Americas</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default NavAndSearch;
