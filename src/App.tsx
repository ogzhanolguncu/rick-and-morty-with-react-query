import { Grid, Center, Skeleton, Flex, Text, Box } from "@chakra-ui/react";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchEpisodes } from "./api/fetchEpisodes";
import { CharacterCard } from "./components/CharacterCard";

function App() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: (context) => fetchEpisodes(context.pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.info.next;
    },
  });
  // console.log(hasNextPage, data);
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
    <Center mt="3rem" px="1rem" flexDirection="column" gap="1rem">
      {data?.pages.map((page) =>
        page?.results.map((episode) => (
          <Flex
            key={episode.id}
            direction="column"
            color="#fff"
            fontWeight="600"
            fontSize="24px"
            gap="15px"
            border="2px solid #718f9b"
            p="1rem"
            borderRadius="0.5rem"
          >
            <Box>
              <Text>
                {episode.name} - #{episode.episode}
              </Text>
              <Text>{episode.air_date}</Text>
            </Box>
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={6}
            >
              {episode.characters.slice(0, 6).map((charUrl) => (
                <CharacterCard charUrl={charUrl} key={charUrl} />
              ))}
            </Grid>
          </Flex>
        ))
      )}
      <Flex color="#fff" mb="2rem">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </Flex>
    </Center>
  );
}

export default App;
