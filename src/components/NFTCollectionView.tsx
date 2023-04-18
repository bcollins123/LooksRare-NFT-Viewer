import {
  Box,
  Image,
  Stack,
  Text,
  Heading,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { NFT_COLLECTION_ADDRESSES } from "../constants";

export default function NFTCollectionView() {

  return (
    <>
      <Center>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {NFT_COLLECTION_ADDRESSES.map((nft: any, key) => {
            return (
              <GridItem key={key} p={6}>
                <Box
                  role={"group"}
                  p={6}
                  maxW={"330px"}
                  w={"full"}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  pos={"relative"}
                  zIndex={1}
                >
                  <Box
                    rounded={"lg"}
                    mt={-12}
                    pos={"relative"}
                    height={"230px"}
                    _after={{
                      transition: "all .3s ease",
                      content: '""',
                      w: "full",
                      h: "full",
                      pos: "absolute",
                      top: 5,
                      left: 0,
                      // backgroundImage: `url(${nft?.image_url})`,
                      filter: "blur(15px)",
                      zIndex: -1,
                    }}
                    _groupHover={{
                      _after: {
                        filter: "blur(20px)",
                      },
                    }}
                  >
                    <Image
                      rounded={"lg"}
                      height={230}
                      width={282}
                      objectFit={"cover"}
                      src={nft?.image_url}
                      alt={nft?.name}
                    />
                  </Box>
                  <Stack pt={10} align={"center"}>
                    <Text
                      color={"gray.500"}
                      fontSize={"sm"}
                      textTransform={"uppercase"}
                    ></Text>
                    <Heading
                      fontSize={"2xl"}
                      fontFamily={"body"}
                      fontWeight={500}
                    >
                      {nft?.name}
                    </Heading>
                  </Stack>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Center>
    </>
  );
}
