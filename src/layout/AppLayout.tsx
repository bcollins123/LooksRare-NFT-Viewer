import { ReactNode } from "react";

// import Navbar Header
import Header from "@/components/Header";

// import Footer
import Footer from "@/components/Footer";
import { Flex } from "@chakra-ui/react";

interface AppLayoutProps {
  children: ReactNode;
}

// define wrap App Layout
export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Flex minH="100vh" flexDir="column">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};
