"use client";

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
import Link from "next/link";

type CountryType = {
  name: { common: string };
  population: number;
  region: string;
  capital: string[];
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
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data: CountryType[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion
      ? country.region.toLowerCase() === selectedRegion.toLowerCase()
      : true;
    return matchesSearch && matchesRegion;
  });

  return (
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
          {filteredCountries.map((country) => (
            <Grid
              key={country.name.common}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ textDecoration: "none" }}
            >
              <Link
                href={`/countryDisplay/${country.name.common}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
                  <CardMedia
                    component="img"
                    image={country.flags.png}
                    alt={country.flags.alt || country.name.common}
                    height="160"
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {country.name.common}
                    </Typography>
                    <Typography>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </Typography>
                    <Typography>
                      <strong>Region:</strong> {country.region}
                    </Typography>
                    <Typography>
                      <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CountryDisplay;
