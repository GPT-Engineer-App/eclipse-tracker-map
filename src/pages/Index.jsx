import { useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import EclipsePath from "../components/EclipsePath";

const Index = () => {
  const [eclipseData, setEclipseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEclipseData()
      .then((data) => {
        setEclipseData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching eclipse data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const fetchEclipseData = async () => {
    try {
      const response = await fetch("https://docs.radiantdrift.com/solar-eclipses/eclipse-paths");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch eclipse data");
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" mt={8}>
        Upcoming Solar Eclipses
      </Heading>
      {isLoading ? (
        <Box textAlign="center" mt={8}>
          <Spinner size="xl" />
          <Text mt={4}>Loading eclipse data...</Text>
        </Box>
      ) : error ? (
        <Box textAlign="center" mt={8}>
          <Text color="red.500">{error}</Text>
        </Box>
      ) : (
        <Box mt={8}>
          {}
          <Box width="100%" height="600px" bgImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcHxlbnwwfHx8fDE3MTI2MzAwMTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" bgSize="cover" bgPosition="center" position="relative">
            {eclipseData.map((eclipse, index) => (
              <Box key={index}>
                {}
                <EclipsePath path={eclipse.path} />
                {}
                <Box mt={4}>
                  <Heading as="h2" size="lg">
                    Solar Eclipse on {eclipse.date}
                  </Heading>
                  <Text>Path of totality passes over:</Text>
                  <ul>
                    {eclipse.path.map((coordinate, index) => (
                      <li key={index}>{coordinate.name}</li>
                    ))}
                  </ul>
                  <Text>Historical landmarks in the path:</Text>
                  <ul>
                    {eclipse.landmarks.map((landmark, index) => (
                      <li key={index}>{landmark}</li>
                    ))}
                  </ul>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Index;
