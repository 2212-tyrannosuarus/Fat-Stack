import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Flex,
  FormLabel,
  Card,
  Grid,
  Input,
  Text,
} from "@chakra-ui/react";
import { authenticateUser } from "../../store";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";

const Login = ({ handleSubmit, name, error, isLoggedIn }) => {
  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return (
    <>
      <Flex>
        <Container maxW="md" my={20}>
          <Box textAlign="center">
            <Card
              p={6}
              boxShadow="lg"
              borderRadius="md"
              mb={125}
              style={{ margin: "auto" }}
            >
              <Box mx="auto" mb={5}>
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </Box>
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  Welcome Back!
                </Text>
              </Box>
              <form onSubmit={handleSubmit} name={name}>
                <Grid
                  templateColumns="1fr"
                  gap={3}
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                >
                  <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      id="username"
                      variant="outline"
                      bg="white"
                      borderWidth={2}
                      borderColor="gray.100"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      variant="outline"
                      bg="white"
                      borderWidth={2}
                      borderColor="gray.100"
                      type="password"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    color="white"
                    bg={"purple.500"}
                    _hover={{ bg: "purple.300" }}
                    mt={4}
                    width="100%"
                  >
                    Login
                  </Button>

                  {error && error.response && (
                    <Text color="red.500" mt={4} textAlign="center">
                      {error.response.data}
                    </Text>
                  )}
                </Grid>
                <Flex alignItems="center" justifyContent="center" mt={5}>
                  <Text mb={0} mr={2}>
                    Don't have an account?
                  </Text>
                  <Link to="/signup" style={{ color: "#0096FF" }}>
                    Register Here
                  </Link>
                </Flex>
              </form>
            </Card>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

const mapState = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = "login";
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(
        authenticateUser({
          username,
          password,
          formName,
        })
      );
    },
  };
};

export default connect(mapState, mapDispatch)(Login);
