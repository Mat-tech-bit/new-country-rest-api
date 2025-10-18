


import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import NavAndSearch from "../navbar/page";

type CountryType = {
  name: { common: string };
  population: number;
  region: string;
  capital: string;
  flags: { png: string; svg: string; alt?: string };
};

const url =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";

const CountryDisplay = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("failed  to fetch Country");
        const data: CountryType[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("failed to fetch countries", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
  }, []);

  // filtered countries
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion
      ? country.region.toLocaleLowerCase() ===
        selectedRegion.toLocaleLowerCase()
      : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      <Container sx={{ py: 4 }}>
        <NavAndSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setselectedRegion={setSelectedRegion}
        />
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredCountries.map((country) => {
              return (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={country.name.common}
                >
                 
                    <Card
                      sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}
                    >
                      <CardMedia
                        component="img"
                        image={country.flags.png}
                        alt="failed to fetch country flag"
                        height="160"
                      />
                      <CardContent>
                        <Typography variant="h4">
                          {country.name.common}
                        </Typography>
                        <Typography>
                          <strong>POPULATION: </strong>
                          {country.population.toLocaleString()}
                        </Typography>
                        <Typography>
                          {" "}
                          <strong>REGION: </strong>
                          {country.region}
                        </Typography>
                        <Typography>
                          {" "}
                          <strong>CAPITAL: </strong>
                          {country.capital}
                        </Typography>
                      </CardContent>
                    </Card>
                
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default CountryDisplay;
