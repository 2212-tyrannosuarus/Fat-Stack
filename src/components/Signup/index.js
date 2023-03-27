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
import { createUser } from "../../store";
import { connect } from "react-redux";

const Signup = ({ handleSubmit, name, error }) => {
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" variant="filled" type="name" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" variant="filled" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" variant="filled" type="password" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" variant="filled" type="email" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                <Input id="phone_number" variant="filled" />
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
      const name = evt.target.name.value;
      const email = evt.target.email.value;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const phone_number = evt.target.phone_number.value;
      dispatch(
        createUser({ name, username, password, email, phone_number, formName })
      );
    },
  };
};

export default connect(mapState, mapDispatch)(Signup);
