import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";

export default function Banner() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to LooksRare <br />
            <Text as={"span"} color={"green.400"}>
              NFT Viewer
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was in the 1960s with the
            release of sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like PageMaker including versions
            of Lorem Ipsum.
          </Text>
        </Stack>
      </Container>
    </>
  );
}
