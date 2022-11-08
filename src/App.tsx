import { Grid, Center, Skeleton } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchCharacter } from "./api/fetchCharacter";
import { CharacterCard } from "./components/CharacterCard";

function App() {
  const { isLoading, data } = useQuery({
    queryFn: fetchCharacter,
  });

  if (isLoading) {
    return (
      <Center mt="3rem">
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          <Skeleton w="600px" height="220px" border="8px" />
          <Skeleton w="600px" height="220px" border="8px" />
          <Skeleton w="600px" height="220px" border="8px" />
          <Skeleton w="600px" height="220px" border="8px" />
        </Grid>
      </Center>
    );
  }
  return (
    !isLoading &&
    Boolean(data?.results.length) && (
      <Center mt="3rem">
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          {data?.results.map((char) => (
            <CharacterCard char={char} key={char.id} />
          ))}
        </Grid>
      </Center>
    )
  );
}

export default App;
