//Começar dnv
import { Flex, Image } from "@chakra-ui/react";

import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return (
    <Flex
      w={"100%"}
      h={"100%"}
      display={"flex"}
      pos={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        src="unimed.svg"
        fallbackSrc="../../public/unimed.svg"
        alt="unimed"
        w={"50rem"}
        h={"50rem"}
        opacity={0.1}
      />
    </Flex>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
