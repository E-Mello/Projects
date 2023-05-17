import { Box, Flex, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import type { IconType } from "react-icons/lib";

interface NavItemProps {
  navSize: string;
  title: string;
  icon: IconType;
  active?: boolean;
  description?: string;
}

export function NavItem({ navSize, title, icon, active }: NavItemProps) {
  // Add a state variable to store the current media query
  const [currentMediaQuery, setCurrentMediaQuery] =
    useState<MediaQueryList | null>(null);

  // Use the useEffect hook to listen for changes in the media query
  useEffect(() => {
    // Create the media query to match the resolution between 48em and 62em
    const mediaQuery = window.matchMedia(
      "(min-width: 48em) and (max-width: 62em)"
    );

    // Update the current media query state when the media query matches
    if (mediaQuery.matches) {
      setCurrentMediaQuery(mediaQuery);
    }

    // Add an event listener to update the current media query state when the media query changes
    const handleMediaQueryChange = () => {
      setCurrentMediaQuery(mediaQuery);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []); // The empty array ensures that the effect only runs on mount and unmount

  // Use the current media query state to determine the navSize
  const responsiveNavSize = currentMediaQuery ? "small" : navSize;

  return (
    // O componente NavItem é responsável por representar os links, ele é propriamente dito o link
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      h="100%"
      alignItems={responsiveNavSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Box
          background={active ? "#AEC8CA" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecorationStyle: "none", backgroundColor: "#AEC8CA" }}
          w={responsiveNavSize == "large" ? "100%" : "small"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#AEC8CA" : "gray.500"}
              />
              <Text
                ml={5}
                display={responsiveNavSize == "small" ? "none" : "flex"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Box>
      </Menu>
    </Flex>
  );
}
