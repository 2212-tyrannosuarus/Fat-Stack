import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { authenticateUser } from "../../store";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Login = ({ handleSubmit, name, error, isLoggedIn }) => {
  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return (
    <Container>
      <Box p={3} textAlign="center">
        <form onSubmit={handleSubmit} name={name}>
          <Box textAlign="center">
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
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" variant="filled" type="password" />
              </FormControl>

              <Button type="submit" colorScheme="blue" variant="solid">
                Login
              </Button>

              {error && error.response && (
                <Text color="red.500">{error.response.data}</Text>
              )}
            </Grid>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
            >
              <Text>Don't have an account? </Text>
              <Link to="/signup" color="blue.500">
                Register Here
              </Link>
            </Box>
          </Box>
        </form>
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
