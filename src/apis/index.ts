import { useQuery } from "react-query";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

export const getCollectionInformation = (address: string) => {
  const { isLoading: isInfoLoading, data: collectionInformation } = useQuery(
    `collectionInformation-${address}`,
    () =>
      fetch(
        `https://api.looksrare.org/api/v1/collections?address=${address}`
      ).then((res) => res.json())
  );
  return { isLoading: isInfoLoading, data: collectionInformation?.data };
}

export const getCollectionStats = (address: string) => {
  const { isLoading: isStatsLoading, data: collectionStats } = useQuery(
    `collectionStats-${address}`,
    () =>
      fetch(
        `https://api.looksrare.org/api/v1/collections/stats?address=${address}`
      ).then((res) => res.json())
  );
  return { isLoading: isStatsLoading, data: collectionStats?.data };
}

export const getTokenInformation = (address: string, tokenId: number) => {
  const { isLoading: isStatsLoading, data: tokenInformation } = useQuery(
    `tokenInformation-${address}-${tokenId}`,
    () =>
      fetch(
        `https://api.looksrare.org/api/v1/tokens?collection=${address}&tokenId=${tokenId}`
      ).then((res) => res.json())
  );
  return { isLoading: isStatsLoading, data: tokenInformation?.data };
}

export const getAskOrders = (address: string, cursor: string) => {
  let url = `https://api.looksrare.org/api/v1/orders?isOrderAsk=true&collection=${address}&sort=NEWEST`;
  if (cursor) {
    url = `${url}&pagination[cursor]=${cursor}`;
  }
  const { isLoading: isOrdersLoading, data: askOrders } = useQuery(
    ["orders", address, cursor],
    () => fetch(url).then((res) => res.json()),
    { keepPreviousData: true }
  );
  return { isLoading: isOrdersLoading, data: askOrders?.data };
}
