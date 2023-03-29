import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaidAuth from "./PlaidAuth";
import { Button } from "@chakra-ui/react";
import { usePlaidLink } from "react-plaid-link";
import { connect } from "react-redux";

function Plaid({ isLoggedIn, user }) {
  const [linkToken, setLinkToken] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);
  const [public_token, setPublic_token] = useState(null);
  const [bankConnected, setBankConnected] = useState(false);

  useEffect(() => {
    async function getLinkToken() {
      const response = await axios.post("/api/plaid/create_link_token");
      setLinkToken(response.data.link_token);
    }
    getLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setBankInfo(metadata);
      setPublic_token(public_token);
      setBankConnected(true);
    },
  });
  console.log("is logged in", isLoggedIn, "public token", public_token);
  return (
    <div>
      {isLoggedIn ? (
        public_token ? (
          <PlaidAuth publicToken={public_token} user={user} />
        ) : (
          <Button
            onClick={() => open()}
            rounded={"full"}
            size={"lg"}
            fontWeight="bold"
            mt={5}
            px={6}
            colorScheme={"red"}
            bg={"purple.500"}
            _hover={{ bg: "purple.300" }}
            disabled={!ready}
          >
            Connect a bank account
          </Button>
        )
      ) : null}
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.auth,
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Plaid);
