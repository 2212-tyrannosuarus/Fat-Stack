import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";

export function PlaidAuth({ publicToken }) {
  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/api/plaid/exchange_public_token", {
        public_token: publicToken,
      });

      const auth = await axios.post("/api/plaid/accountInfo", {
        access_token: accessToken.data.accessToken,
      });
      console.log("auth", auth);
    }
    fetchData();
  });

  return <span>{publicToken}</span>;
}

export default function Placid() {
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

  return (
    <div>
      {public_token ? (
        <PlaidAuth publicToken={public_token} />
      ) : (
        <div>
          {" "}
          <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
          </button>
        </div>
      )}
    </div>
  );
}
