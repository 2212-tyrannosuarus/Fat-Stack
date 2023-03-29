import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

export function PlaidAuth({ publicToken, user }) {
  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/api/plaid/exchange_public_token", {
        public_token: publicToken,
      });

      const auth = await axios.post("/api/plaid/accountInfo", {
        access_token: accessToken.data.accessToken,
        userId: user.id,
      });
      console.log("auth", auth);
    }
    fetchData();
  });

  return <span>Successfully Connected!</span>;
}

const mapState = (state) => {
  return {
    user: state.auth,
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(PlaidAuth);
