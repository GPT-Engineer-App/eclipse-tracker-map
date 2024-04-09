import { Box } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const EclipsePath = ({ path }) => {
  return (
    <Box position="absolute" top={0} left={0} width="100%" height="100%" pointerEvents="none">
      {path.map((coordinate, index) => (
        <Box key={index} position="absolute" top={`${50 - (coordinate.latitude / 180) * 100}%`} left={`${50 + (coordinate.longitude / 360) * 100}%`} transform="translate(-50%, -50%)" color="red.500" fontSize="2xl">
          <FaMapMarkerAlt />
        </Box>
      ))}
    </Box>
  );
};

export default EclipsePath;
