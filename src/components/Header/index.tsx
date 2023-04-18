import { useEffect, useState } from "react";
import Link from "next/link";

// import chakra-ui to use it's component
import {
  Box,
  Flex,
  Container,
  Stack,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Icon,
  useColorMode,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

// import chakra-ui icons to use close icon, hamburger icon
import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

// import component to struct Header Navbar Component
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/Header/MobileNav";
import { DesktopNav } from "@/components/Header/DesktopNav";

// import connect wallets Modal
import WalletModal from "@/components/WalletModal";

// import wagmi
import { useAccount, useDisconnect } from "wagmi";

const Header = () => {
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // error fix "Next Hydration Error"
  const [isConnectedButton, setIsConnectedButton] = useState(false);

  useEffect(() => {
    setIsConnectedButton(isConnected);
  }, [isConnected]);

  // when click the connect wallet button, occurs this event
  const connectWalletClick = () => {
    setIsWalletModalOpen(true);
  };

  // when click the close connec wallet button, occurs this event
  const WalletModalClose = () => {
    setIsWalletModalOpen(false);
  };

  // render connect wallet button or connected wallet address with disconnect button
  const renderWalletConnectButton = () => {
    // if connected, display address and disconnect button

    if (isConnectedButton) {
      return (
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <Button
              rightIcon={<ChevronDownIcon />}
              colorScheme="green"
              w="fit-content"
            >
              {address?.slice(0, 8) + "..." + address?.slice(-8)}
            </Button>
          </PopoverTrigger>
          <PopoverContent _focus={{ boxShadown: "none" }} w="fit-content">
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Button
                  w="194px"
                  variant="ghost"
                  justifyContent="space-between"
                  fontWeight="normal"
                  onClick={(e) => disconnect()}
                  fontSize="sm"
                >
                  Disconnect
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    } else {
      // if is connected, display connect wallets button
      return (
        <Button
          colorScheme="green"
          onClick={connectWalletClick}
          w="fit-content"
        >
          Connect Wallets
        </Button>
      );
    }
  };

  return (
    <Box>
      <Flex
        as={"header"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="999"
        justify={"center"}
        className="backdrop-blur-[5px]"
        css={{
          backgroundColor: useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          ),
        }}
      >
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex
            flex={{ base: "0", md: "auto" }}
            ml={{ base: -2 }}
            mr={{ base: 6, md: 0 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isMobileNavOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              size={"sm"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex
            flex={{ base: 1, md: "auto" }}
            justify={{ base: "start", md: "start" }}
          >
            <Link href={"/"} passHref>
              <Stack
                as={"a"}
                direction={"row"}
                alignItems={"center"}
                spacing={{ base: 2, sm: 4 }}
              >
                <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} />
                <Heading
                  as={"h1"}
                  fontSize={"xl"}
                  display={{ base: "none", md: "block" }}
                >
                  LooksRare
                </Heading>
              </Stack>
            </Link>
          </Flex>

          <Stack
            direction={"row"}
            align={"center"}
            spacing={{ base: 6, md: 8 }}
            flex={{ base: 1, md: "auto" }}
            justify={"flex-end"}
          >
            <DesktopNav display={{ base: "none", md: "flex" }} />

            {/* render the connect wallet */}

            {renderWalletConnectButton()}

            <IconButton
              size={"sm"}
              variant={"ghost"}
              aria-label={"Toggle Color Mode"}
              onClick={toggleColorMode}
              icon={
                colorMode == "light" ? (
                  <MoonIcon w={18} h={18} />
                ) : (
                  <SunIcon w={18} h={18} />
                )
              }
            />
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={isMobileNavOpen} />
      <WalletModal isOpen={isWalletModalOpen} closeModal={WalletModalClose} />
    </Box>
  );
};

export default Header;
