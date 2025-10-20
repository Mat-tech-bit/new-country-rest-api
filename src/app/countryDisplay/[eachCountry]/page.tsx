"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";

type CountryType = {
  name: { common: string; official: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: { png: string; svg: string; alt?: string };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
};

export default function EachCountryPage() {
const { eachCountry } = useParams<{ eachCountry: string }>();

  const [country, setCountry] = useState<CountryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${eachCountry}?fullText=true`)

        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [eachCountry]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  if (!country)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Country not found.</Typography>
      </Container>
    );

  return (
    <Container sx={{ py: 5 }}>
      <Link href="/countryDisplay">
        <Button variant="contained" sx={{ mb: 3 }}>
          Back
        </Button>
      </Link>

      <Card sx={{ display: "flex", flexWrap: "wrap", gap: 4, p: 3 }}>
        <CardMedia
          component="img"
          image={country.flags.png}
          alt={country.flags.alt || country.name.common}
          sx={{ width: 320, borderRadius: 2 }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            {country.name.common}
          </Typography>
          <Typography>
            <strong>Official Name:</strong> {country.name.official}
          </Typography>
          <Typography>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </Typography>
          <Typography>
            <strong>Region:</strong> {country.region}
          </Typography>
          <Typography>
            <strong>Subregion:</strong> {country.subregion || "N/A"}
          </Typography>
          <Typography>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </Typography>
          <Typography>
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </Typography>
          <Typography>
            <strong>Currency:</strong>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => `${c.name} (${c.symbol})`)
                  .join(", ")
              : "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
