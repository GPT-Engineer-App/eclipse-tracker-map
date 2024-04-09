import { useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Index = () => {
  const [eclipseData, setEclipseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch eclipse data from an API or load from a local file
    fetchEclipseData()
      .then((data) => {
        setEclipseData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching eclipse data:", error);
        setIsLoading(false);
      });
  }, []);

  const fetchEclipseData = async () => {
    // Replace this with your actual data fetching logic
    // You can use an API or load data from a local file
    return Promise.resolve([
      {
        date: "2023-04-08",
        path: [
          { lat: 37.7749, lng: -122.4194, name: "San Francisco, CA" },
          { lat: 40.7128, lng: -74.006, name: "New York City, NY" },
          // Add more coordinates for the eclipse path
        ],
        landmarks: ["Golden Gate Bridge", "Statue of Liberty"],
      },
      // Add more eclipse data objects
    ]);
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
      ) : (
        <Box mt={8}>
          {/* Render the 3D map */}
          <Box width="100%" height="600px" bgImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcHxlbnwwfHx8fDE3MTI2MzAwMTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" bgSize="cover" bgPosition="center" position="relative">
            {eclipseData.map((eclipse, index) => (
              <Box key={index}>
                {/* Render the eclipse path */}
                <Box position="absolute" top={0} left={0} width="100%" height="100%" pointerEvents="none">
                  {eclipse.path.map((coordinate, index) => (
                    <Box key={index} position="absolute" top={`${50 - (coordinate.lat / 180) * 100}%`} left={`${50 + (coordinate.lng / 360) * 100}%`} transform="translate(-50%, -50%)" color="red.500" fontSize="2xl">
                      <FaMapMarkerAlt />
                    </Box>
                  ))}
                </Box>
                {/* Render eclipse details */}
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
