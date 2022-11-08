import {
  Flex,
  VStack,
  HStack,
  Image as ChakraImage,
  Text,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import type { Character } from "../api/fetchCharacter";
import { fetchEpisodes } from "../api/fetchEpisodes";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  char: Character;
};
export const CharacterCard = ({ char }: Props) => {
  const { data } = useQuery({
    queryKey: [`key-${char?.id}`],
    queryFn: () => fetchEpisodes(char.episode[0]),
  });

  return (
    <Flex
      key={char.id}
      bg="rgb(60, 62, 68)"
      borderRadius="0.5rem"
      boxShadow="rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;"
      w="600px"
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
        <Box fontSize="16px" fontWeight="500">
          <Text color="rgb(158, 158, 158)">First seen in:</Text>
          <Text>{data?.name}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};
