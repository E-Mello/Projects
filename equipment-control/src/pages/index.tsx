import { Flex, Image } from "@chakra-ui/react";

import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return (
    // Componente em volta da imagem
    <Flex
      w={[
        "25%", // 0-30em
        "50%", // 30em - 48em
        "75%", // 48em - 62em
        "100%", // 62em+
      ]}
      h={[
        "25%", // 0-30em
        "50%", // 30em - 48em
        "75%", // 48em - 62em
        "100%", // 62em+
      ]}
      display={"flex"}
      pos={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* Imagem padrão do home */}
      <Image
        src="unimed.svg"
        fallbackSrc="../../public/unimed.svg"
        alt="unimed"
        w={[
          "12.5rem", // 0-30em
          "25rem", // 30em - 48em
          "37.5rem", // 48em - 62em
          "50rem", // 62em+
        ]}
        h={[
          "12,5%", // 0-30em
          "25rem", // 30em - 48em
          "37.5rem", // 48em - 62em
          "50rem", // 62em+
        ]}
        opacity={0.1}
      />
    </Flex>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
