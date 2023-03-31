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
      <Box px={36} py={50} bg={"white"}>
        <Container maxW={"7xl"} bg={"white"}>
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            pt={{ base: 10 }}
            pb={{ base: 20 }}
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
                    color: "grey.600",
                  }}
                >
                  Take Control of
                </Text>
                <br />
                <Text as={"span"} color={"purple.500"}>
                  Your Finances
                </Text>
              </Heading>
              <Text color={"gray.500"}>
                Whether you are looking to save for a rainy day, pay off debt,{" "}
                <br /> or invest for the future, Fat Stack has got you covered.
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
                rounded={"2xl"}
                width={"full"}
                overflow={"hidden"}
              >
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  src={"/assets/homepage.png"}
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>
      <Box bg="gray.50" py={36} mx={10}>
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
                    We simplify your financial management by allowing you to add
                    and monitor multiple accounts in one place.
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
                    Always forgetting about those pesky subscriptions? Our app
                    will notify you when they are due.
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
                    Whether you're saving for a down payment on a home, planning
                    a dream vacation, or paying off debt, we make it simple to
                    set realistic goals and track your progress.
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      <Box mx="auto" textAlign="center" pt={24} pb={12} bg={"white"}>
        <Heading as="h2" fontSize="3xl" mb="6">
          Contact Us
        </Heading>
        <Box as="form" mb="8" maxW="600px" mx="auto">
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
