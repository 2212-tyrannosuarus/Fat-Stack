import React from "react";
import { useNavigate } from "react-router-dom";
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
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FcDonate, FcDepartment, FcMoneyTransfer } from "react-icons/fc";

export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box marginX={36} marginY={50}>
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
                  fontWeight="bold"
                  px={6}
                  colorScheme={"red"}
                  bg={"purple.500"}
                  _hover={{ bg: "purple.300" }}
                  onClick={() => navigate("/signup")}
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
      </Box>
      <Box bg="gray.50" py={36}>
        <Container maxW="8xl">
          <Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={16}>
              <Box
                bg="white"
                rounded="lg"
                overflow="hidden"
                px={6}
                py={12}
                display="flex"
                flexDirection="column"
                boxShadow="md"
              >
                <Icon as={FcDepartment} w={10} h={10} mb={4} />
                <Box>
                  <Text fontWeight="bold" fontSize="xl" mb={2}>
                    Add Multiple Accounts
                  </Text>
                  <Text fontSize="md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam viverra justo odio, sit amet mollis massa porttitor
                    id.
                  </Text>
                </Box>
              </Box>
              <Box
                bg="white"
                rounded="lg"
                overflow="hidden"
                px={6}
                py={12}
                display="flex"
                flexDirection="column"
                boxShadow="md"
              >
                <Icon as={FcDonate} w={10} h={10} mb={4} />
                <Box>
                  <Text fontWeight="bold" fontSize="xl" mb={2}>
                    Manage Subscriptions
                  </Text>
                  <Text fontSize="md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam viverra justo odio, sit amet mollis massa porttitor
                    id.
                  </Text>
                </Box>
              </Box>
              <Box
                bg="white"
                rounded="lg"
                overflow="hidden"
                px={6}
                py={12}
                display="flex"
                flexDirection="column"
                boxShadow="md"
              >
                <Icon as={FcMoneyTransfer} w={10} h={10} mb={4} />
                <Box>
                  <Text fontWeight="bold" fontSize="xl" mb={2}>
                    Set New Goals
                  </Text>
                  <Text fontSize="md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam viverra justo odio, sit amet mollis massa porttitor
                    id.
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      <Box maxW="600px" mx="auto" textAlign="center" my={36}>
        <Heading as="h2" fontSize="3xl" mb="6">
          Contact Us
        </Heading>
        <Box as="form" mb="8">
          <Input placeholder="Your email" mb="4" />
          <Textarea placeholder="Your message" mb="4" />
          <Button
            colorScheme="blue"
            type="submit"
            bg={"purple.500"}
            _hover={{ bg: "purple.300" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
