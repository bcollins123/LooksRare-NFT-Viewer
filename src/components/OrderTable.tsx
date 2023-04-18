import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
} from "@chakra-ui/react";
import { EXCHANGE_CONTRACT_ADDRESS, WETH_ADDRESS } from "../constants";
import { convertTimestampToDateTime, parseBalance } from "utils";
import { erc20ABI, useAccount, useContract, useSigner } from "wagmi";
import EXCHANGE_ABI from "../contracts/Exchange.json";
import { ethers } from "ethers";

export interface Order {
  amount: string;
  collectionAddress: string;
  currencyAddress: string;
  endTime: number;
  hash: string;
  isOrderAsk: boolean;
  minPercentageToAsk: number;
  nonce: string;
  params: string;
  price: string;
  r: any;
  s: any;
  signature: any;
  signer: string;
  startTime: number;
  status: string;
  strategy: string;
  tokenId: string;
  v: any;
}

interface OrderTableProps {
  data: Array<Order>;
  isLoading: boolean;
}

export default function OrderTable({ data, isLoading }: OrderTableProps) {
  const { address: walletAddress } = useAccount();
  const { data: signer } = useSigner();
  const exchangeContract = useContract({
    address: EXCHANGE_CONTRACT_ADDRESS,
    abi: EXCHANGE_ABI,
    signerOrProvider: signer,
  });

  if (isLoading) {
    return <p>Loading table...</p>;
  }

  const onBuy = async (row: Order) => {
    const takerBidOrder = {
      isOrderAsk: false,
      taker: walletAddress,
      price: row?.price,
      tokenId: row?.tokenId,
      minPercentageToAsk: row?.minPercentageToAsk,
      params: [],
    };
    const makerAskOrder = {
      isOrderAsk: row.isOrderAsk,
      signer: row.signer,
      collection: row.collectionAddress,
      price: row.price,
      tokenId: row.tokenId,
      amount: row.amount,
      strategy: row.strategy,
      currency: row.currencyAddress,
      nonce: row.nonce,
      startTime: row.startTime,
      endTime: row.endTime,
      minPercentageToAsk: row.minPercentageToAsk,
      params: row.params || [],
      v: row.v,
      r: row.r,
      s: row.s,
    };
    try {
      if (makerAskOrder.currency === WETH_ADDRESS) {
        const tx = await exchangeContract.matchAskWithTakerBidUsingETHAndWETH(takerBidOrder, makerAskOrder, { value: takerBidOrder.price });
        await tx.wait();
      } else {
        const erc20 = new ethers.Contract(makerAskOrder.currency, erc20ABI, signer)
        let result = await erc20.approve(EXCHANGE_CONTRACT_ADDRESS, ethers.constants.MaxUint256).then((tx: any) => tx.wait());
        console.log(result);
        result = await exchangeContract.matchAskWithTakerBid(takerBidOrder, makerAskOrder).then((tx: any) => tx.wait());
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderButton = (row: Order) => {
    if (row.status === "VALID") {
      return <Button onClick={() => onBuy(row)}>Buy</Button>;
    }
    return null;
  };

  return (
    <>
      {!data || isLoading ? (
        <Text>Loading table...</Text>
      ) : (
        <TableContainer maxHeight={500} overflowY="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Token Id</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
                <Th>Price</Th>
                <Th>Currency</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row: Order, index: number) => (
                <Tr key={index}>
                  <Td>{row.tokenId}</Td>
                  <Td>{convertTimestampToDateTime(row.startTime)}</Td>
                  <Td>{convertTimestampToDateTime(row.endTime)}</Td>
                  <Td>{parseBalance(row.price)}</Td>
                  <Td>{row.currencyAddress}</Td>
                  <Td>{row.status}</Td>
                  <Td>{renderButton(row)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
