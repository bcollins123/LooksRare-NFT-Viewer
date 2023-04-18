import type { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import router from "next/router";
import {
  getAskOrders,
  getCollectionInformation,
  getCollectionStats,
} from "apis";
import OrderTable, { Order } from "@/components/OrderTable";

interface CollectionPageProps {
  address: string;
}

const Collection: NextPage<CollectionPageProps> = ({ address }) => {
  const { colorMode } = useColorMode();
  const [tokenId, setTokenId] = useState(0);
  const [cursor, setCursor] = useState("");
  const { isLoading: isOrderLoading, data: newAskOrders } = getAskOrders(
    address,
    cursor
  );
  const [askOrders, setAskOrders] = useState<Array<Order>>([]);
  const { isLoading: isInfoLoading, data: collectionInformation } =
    getCollectionInformation(address);
  const { isLoading: isStatsLoading, data: collectionStats } =
    getCollectionStats(address);

  const onLoadMore = () => {
    setCursor(newAskOrders.at(-1)?.hash);
  };

  const onViewNFT = () => {
    router.push(`/collections/${address}/${tokenId}`);
  };

  useEffect(() => {
    if (newAskOrders) {
      setAskOrders([...askOrders, ...newAskOrders]);
    }
  }, [newAskOrders]);

  if (isInfoLoading || isStatsLoading) {
    return (
      <Container maxW={"7xl"} my={{ base: 20, md: 24 }}>
        Loading...
      </Container>
    );
  }

  return (
    <Container maxW={"7xl"} my={{ base: 20, md: 24 }} position="relative">
      <Container
        maxW={"7xl"}
        backgroundImage={collectionInformation.bannerURI}
        py={8}
      >
        <Container
          maxW={"4xl"}
          py={4}
          backgroundColor={
            colorMode === "dark"
              ? "rgba(0, 0, 0, 0.9)"
              : "rgba(255, 255, 255, 0.9)"
          }
          borderRadius={16}
        >
          <Flex>
            <Image
              src={collectionInformation.logoURI}
              width={120}
              height={120}
              mr={4}
              border="3px solid"
            />
            <Flex flexDirection="column" justifyContent="flex-end">
              <Heading size="2xl" mb={4}>
                {collectionInformation.name}
              </Heading>
              <Text fontSize="2xl">
                {collectionInformation.symbol} (
                {Number(collectionStats.totalSupply) + 1}NFTs)
              </Text>
            </Flex>
          </Flex>
          <Text mt={4}>{collectionInformation.description}</Text>
          <Flex gap={10} mt={8}>
            <Box>
              <Text>Floor Price</Text>
              <Text fontSize="xl" fontWeight={700}>
                {formatEther(collectionStats.floorPrice)}
              </Text>
            </Box>
            <Box>
              <Text>MarketCap</Text>
              <Text fontSize="xl" fontWeight={700}>
                {formatEther(collectionStats.marketCap)}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Container>
      <Container maxW={"sm"} mt={4}>
        <FormControl mb={2}>
          <Input
            type="number"
            placeholder="Token id"
            isRequired
            value={tokenId}
            onChange={(e) => setTokenId(Number(e.target.value))}
            min={0}
          />
        </FormControl>
        <Button size="md" width="100%" onClick={onViewNFT}>
          View NFT
        </Button>
      </Container>
      <Heading fontSize="2xl" mt={8}>
        Ask Order Table
      </Heading>
      <OrderTable isLoading={isOrderLoading} data={askOrders} />
      {newAskOrders && newAskOrders.length === 20 && (
        <Button onClick={onLoadMore} mt={4}>
          Load More...
        </Button>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      address: context?.query?.address,
    },
  };
};

export default Collection;
