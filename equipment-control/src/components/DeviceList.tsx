import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";

import { BiDevices } from "react-icons/bi";
import React from "react";
import { deviceIdAtom } from "../atoms/deviceIdAtom";
import { trpc } from "../utils/trpc";
import { useAtom } from "jotai";

type DeviceListProps = {
  onClose: () => void;
};

export function DeviceList({ onClose }: DeviceListProps) {
  const { data: devices } = trpc.device.getAll.useQuery();
  const [, setDeviceId] = useAtom(deviceIdAtom);
  return (
    <Box>
      {devices?.map((device) => (
        <Button
          onClick={() => {
            setDeviceId(device.id);
            onClose();
          }}
          display={"flex"}
          justifyContent={"space-between"}
          h={"3.5rem"}
          w="100%"
          key={device.id}
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
                  <Text textTransform={"uppercase"}>{device.modelo}</Text>
                  <Text fontSize={"0.7rem"} textTransform={"uppercase"}>
                    {device.serie}
                  </Text>
                </Stack>
              </Stack>
              <Box>
                <Text textTransform={"uppercase"}>
                  Status: {device.active === true ? "Ativo" : "Inativo"}
                </Text>
              </Box>
            </ListItem>
          </List>
        </Button>
      ))}
    </Box>
  );
}
