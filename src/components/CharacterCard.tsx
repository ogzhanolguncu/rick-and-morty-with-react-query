import { Flex, VStack, HStack, Text, Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchCharacter } from "../api/fetchCharacter";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  charUrl: string;
};
export const CharacterCard = ({ charUrl }: Props) => {
  const { data: char, isLoading } = useQuery({
    queryKey: [`key-${charUrl}`],
    queryFn: () => fetchCharacter(charUrl),
  });

  if (!char || isLoading) {
    return <Box>Loading!!!</Box>;
  }

  return (
    <Flex
      key={char.id}
      bg="rgb(60, 62, 68)"
      borderRadius="0.5rem"
      boxShadow="rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;"
      maxWidth="440px"
      width="440px"
      height="220px"
    >
      <LazyLoadImage
        src={char.image}
        alt={`image of ${char.name}`}
        width="220px"
        height="220px"
        effect="blur"
        style={{
          flex: "2 1 0%",
        }}
      />
      <VStack flex="3 1 0%" p="1rem" color="#f5f5f5" alignItems="flex-start">
        <Text fontSize="1.5rem" fontWeight="700">
          {char.name}
        </Text>
        <HStack>
          <Box
            bg={char.status === "Alive" ? "green.500" : "red.300"}
            h="9px"
            w="9px"
          />
          <Text fontSize="16px" fontWeight="500">
            {char.status} - {char.species}
          </Text>
        </HStack>
        <Box fontSize="16px" fontWeight="500">
          <Text color="rgb(158, 158, 158)">Last known location:</Text>
          <Text>{char.location.name}</Text>
        </Box>
        {/* <Box fontSize="16px" fontWeight="500">
          <Text color="rgb(158, 158, 158)">First seen in:</Text>
          <Text>{char.name}</Text>
        </Box> */}
      </VStack>
    </Flex>
  );
};
