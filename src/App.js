import React, { useEffect } from "react";
import Routes from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";
import "./scss/styles.scss";
import { connect } from "react-redux";
import { me } from "./store";

const App = (props) => {
  const { loadInitialData, isLoading } = props;

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    !isLoading && (
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    )
  );
};

const mapState = (state) => {
  return {
    isLoading: state.auth.isLoading,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
