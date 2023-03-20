import React, { useEffect } from "react";
import axios from "axios";

export default function PlaidAuth({ publicToken, user }) {
  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/api/plaid/exchange_public_token", {
        public_token: publicToken,
      });

      const auth = await axios.post("/api/plaid/accountInfo", {
        access_token: accessToken.data.accessToken,
        userId: 1,
      });
      console.log("auth", auth);
    }
    fetchData();
  });

  return <span>{publicToken}</span>;
}
