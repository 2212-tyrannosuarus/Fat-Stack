import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Flex,
  Input,
  Card,
  Text,
} from "@chakra-ui/react";
import { createUser } from "../../store";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";

const Signup = ({ handleSubmit, name, error, isLoggedIn }) => {
  if (isLoggedIn) return <Navigate to="/dashboard" />;
  return (
    <Container maxW="container.sm" mt={10} mb={10}>
      <Box textAlign="center">
        <Card p={6} boxShadow="lg" borderRadius="md" maxW="md" mx="auto">
          <Box mx="auto" mb={5}>
            <img src="/assets/logo.png" alt="Logo" width="100" height="100" />
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Sign Up
            </Text>
          </Box>
          <form onSubmit={handleSubmit} name={name}>
            <Grid
              templateColumns="1fr"
              gap={3}
              alignItems="center"
              justifyContent="center"
              mt={3}
            >
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" variant="filled" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" variant="filled" type="name" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" variant="filled" type="email" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" variant="filled" type="password" />
              </FormControl>

              <Button
                type="submit"
                color="white"
                bg={"purple.500"}
                _hover={{ bg: "purple.300" }}
                mt={4}
              >
                Register
              </Button>

              {error && error.response && (
                <Text color="red.500" mt={4}>
                  {error.response.data}
                </Text>
              )}
            </Grid>
            <Flex alignItems="center" justifyContent="center" mt={5}>
              <Text mb={0} mr={2}>
                Already have an account?
              </Text>
              <Link to="/login" style={{ color: "#0096FF" }}>
                Sign in here
              </Link>
            </Flex>
          </form>
        </Card>
      </Box>
    </Container>
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
      const name = evt.target.name.value;
      const email = evt.target.email.value;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(createUser({ name, username, password, email, formName }));
    },
  };
};

export default connect(mapState, mapDispatch)(Signup);
