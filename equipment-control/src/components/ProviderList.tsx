import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { BiDevices } from "react-icons/bi";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { providerIdAtom } from "../atoms/providerIdAtom";
import { trpc } from "../utils/trpc";
import { useAtom } from "jotai";
import type { z } from "zod";

type ProviderListProps = {
  onClose: () => void;
};

export function ProviderList({ onClose }: ProviderListProps) {
  const { data: providers } = trpc.provider.getAll.useQuery();
  const [, setProviderId] = useAtom(providerIdAtom);
  return (
    <Box>
      {providers?.map((provider) => (
        <Button
          onClick={() => {
            setProviderId(provider.id);
            onClose();
          }}
          display={"flex"}
          justifyContent={"space-between"}
          h={"3.5rem"}
          w="100%"
          key={provider.id}
        >
          <List>
            <ListItem
              display="flex"
              width={"50%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <ListIcon as={BiDevices} color="green.500" mr={"1rem"} />
                <Stack display={"flex"} alignItems={"start"}>
                  <Text textTransform={"uppercase"}>{provider.codigo}</Text>
                  <Text fontSize={"0.7rem"} textTransform={"uppercase"}>
                    {provider.nome}
                  </Text>
                </Stack>
              </Stack>
              <Box>
                <Text textTransform={"uppercase"}>
                  Status: {provider.active === true ? "Ativo" : "Inativo"}
                </Text>
              </Box>
            </ListItem>
          </List>
        </Button>
      ))}
    </Box>
  );
}
