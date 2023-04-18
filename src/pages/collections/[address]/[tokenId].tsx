import type { NextPage, GetServerSidePropsContext } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { useAccount, useContractRead } from "wagmi";
import {
  Box,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  Text,
  Center,
  Link,
  Container,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { getTokenInformation } from "apis";
import NFT_ABI from "../../../contracts/NFT.json";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      address: context.params!.address,
      tokenId: context.params!.tokenId,
    },
  };
}

interface TokenIdPageProps {
  address: string;
  tokenId: number;
}

type Attribute = {
  id: string;
  traitType: string;
  value: string;
  displayType: string;
  count: string;
};

const TokenId: NextPage<TokenIdPageProps> = ({ address, tokenId }) => {
  const { isLoading, data } = getTokenInformation(address, tokenId);
  const { address: walletAddress } = useAccount();
  const { data: ownerAddress } = useContractRead({
    address: address,
    abi: NFT_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  });
  const { data: totalSupply } = useContractRead({
    address: address,
    abi: NFT_ABI,
    functionName: "totalSupply",
  });
  if (isLoading) {
    return (
      <Container maxW={"7xl"} my={{ base: 20, md: 24 }}>
        Loading...
      </Container>
    );
  }
  return (
    <Container maxW={"7xl"} my={{ base: 20, md: 24 }} position="relative">
      <Box py="30px">
        <Flex flexDirection={["column", "column", "column", "row"]}>
          <Stack spacing={6}>
            <Box
              position="relative"
              bg="gray.100"
              minHeight={["300px", "400px", "500px"]}
              minWidth={["300px", "400px", "500px"]}
            >
              <Center>
                <Image
                  src={data.imageURI}
                  alt={data.name}
                  height={500}
                  width={500}
                  priority
                />
              </Center>
            </Box>
            <Flex justify="space-between">
              {tokenId > 0 && (
                <Box mr="auto">
                  <NextLink
                    href={`/collections/${address}/${+tokenId - 1}`}
                    passHref
                  >
                    <Button as="a" leftIcon={<ArrowBackIcon />}>
                      Previous token
                    </Button>
                  </NextLink>
                </Box>
              )}
              {tokenId < Number(totalSupply) - 1 && (
                <Box ml="auto">
                  <NextLink
                    href={`/collections/${address}/${+tokenId + 1}`}
                    passHref
                  >
                    <Button as="a" rightIcon={<ArrowForwardIcon />}>
                      Next token
                    </Button>
                  </NextLink>
                </Box>
              )}
            </Flex>
          </Stack>
          <Box pl={["0", "0", "0", "40px"]} pt={["40px", "40px", "40px", "0"]}>
            <Stack spacing={6}>
              <Stack spacing={1}>
                <Text>Name</Text>
                <Text fontWeight="bold" color="green.500">
                  {data.name}
                </Text>
              </Stack>
              <Stack spacing={1}>
                <Text>Collection</Text>
                <Text fontWeight="bold" color="green.500">
                  {data.collection.name}
                </Text>
              </Stack>
              <Stack spacing={1}>
                <Text>Token ID</Text>
                <Text fontWeight="bold" color="green.500">
                  {data.tokenId}
                </Text>
              </Stack>
              <Stack spacing={1}>
                <Text>Description</Text>
                <Text fontWeight="bold" color="green.500">
                  {data.description}
                </Text>
              </Stack>
              <Stack spacing={1}>
                <Text>Owner</Text>
                <Text fontWeight="bold" color="green.500">
                  {ownerAddress === walletAddress ? (
                    <Link
                      href={`https://etherscan.io/address/${walletAddress}`}
                      isExternal
                      target="_blank"
                    >
                      Your NFT
                    </Link>
                  ) : (
                    <Link
                      href={`https://etherscan.io/address/${ownerAddress}`}
                      isExternal
                      target="_blank"
                    >
                      {ownerAddress}
                    </Link>
                  )}
                </Text>
              </Stack>
              <Stack spacing={2}>
                <Text>Attributes</Text>
                <SimpleGrid columns={[2, 3, 4, 3, 4]} spacing={3}>
                  {data.attributes.map((attribute: Attribute) => (
                    <Box
                      key={attribute.value}
                      fontWeight="medium"
                      bg="gray.100"
                      justifyItems="center"
                      alignItems="center"
                      rounded="md"
                      p="10px"
                    >
                      <Text color="green.500" fontSize="sm">
                        {attribute.traitType}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {attribute.value}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default TokenId;
