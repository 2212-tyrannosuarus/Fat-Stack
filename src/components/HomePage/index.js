import React, { ReactElement } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Icon,
  Card,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

export const Homepage = () => {
  const Feature = ({ title, text, icon }) => {
    return (
      <Stack>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"gray.100"}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={"gray.600"}>{text}</Text>
      </Stack>
    );
  };

  return (
    <>
      <Box marginX={36} marginY={42}>
        <Container maxW={"7xl"}>
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              >
                <Text
                  as={"span"}
                  position={"relative"}
                  _after={{
                    content: "''",
                    width: "full",
                    height: "30%",
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    bg: "purple.200",
                    zIndex: -1,
                  }}
                >
                  We are the #1
                </Text>
                <br />
                <Text as={"span"} color={"purple.500"}>
                  Finance App
                </Text>
              </Heading>
              <Text color={"gray.500"}>
                This is just an example of what we can write here. I'm gauging
                the length of how long this paragraph should be. We are Farmers
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"red"}
                  bg={"purple.500"}
                  _hover={{ bg: "purple.300" }}
                >
                  Get started
                </Button>
              </Stack>
            </Stack>

            <Flex
              flex={1}
              justify={"center"}
              align={"center"}
              position={"relative"}
              w={"full"}
            >
              <Box
                position={"space-between"}
                height={"300px"}
                rounded={"2xl"}
                boxShadow={"2xl"}
                width={"full"}
                overflow={"hidden"}
              >
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={"100%"}
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
                />
              </Box>
            </Flex>
          </Stack>
        </Container>

        <Box bg="gray.100" py={8}>
          <Container maxW="7xl">
            <Box px={8}>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
                <Feature
                  icon={<Icon as={FcAssistant} w={10} h={10} />}
                  title={"Track your Accounts"}
                  text={
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                  }
                />
                <Feature
                  icon={<Icon as={FcDonate} w={10} h={10} />}
                  title={"Set Goals"}
                  text={
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                  }
                />
                <Feature
                  icon={<Icon as={FcInTransit} w={10} h={10} />}
                  title={"Budget Subscriptions"}
                  text={
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                  }
                />
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
