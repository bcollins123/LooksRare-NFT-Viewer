import type { NextPage } from "next";
import NextLink from "next/link";
import { NFT_COLLECTION_ADDRESSES } from "../../constants";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";
import router from "next/router";

const Collections: NextPage = () => {
  const [address, setAddress] = useState("");
  const onViewCollection = () => {
    router.push(`/collections/${address}`);
  };
  return (
    <Container maxW={"6xl"} py={{ base: 20, md: 24 }}>
      <Heading mb={4}>Collection</Heading>
      <Box>
        <UnorderedList m={12}>
          {NFT_COLLECTION_ADDRESSES.map((address) => (
            <ListItem key={address}>
              <NextLink href={`/collections/${address}`} passHref>
                <Link color="green.500">{address}</Link>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>

        <Container maxW={"sm"} mt={4}>
          <FormControl mb={2}>
            <Input
              placeholder="Collection Address"
              isRequired
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <Button size="md" width="100%" onClick={onViewCollection}>
            View Collection
          </Button>
        </Container>
      </Box>
    </Container>
  );
};

export default Collections;
