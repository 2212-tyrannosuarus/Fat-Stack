const router = require("express").Router();
require("dotenv").config();
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

//Testing Routes - To be deleted
router.get("/", async (req, res, next) => {
  try {
    let string = "hi";
    res.send(string);
  } catch (err) {
    next(err);
  }
});

router.post("/create_link_token", async (req, res, next) => {
  const plaidRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user",
    },
    client_name: "Plaid Test App",
    products: ["auth", "transactions"],
    language: "en",
    country_codes: ["US"],
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    res.json(createTokenResponse.data);
  } catch (e) {
    next(e);
  }
});

router.post("/exchange_public_token", async (req, res, next) => {
  const publicToken = req.body.public_token;
  try {
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    // console.log("plaidResponse", plaidResponse);
    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = plaidResponse.data.access_token;
    const itemID = plaidResponse.data.item_id;
    res.json({ accessToken: accessToken, data: itemID });
  } catch (error) {
    // handle error
    next(error);
  }
});

router.post("/accountInfo", async function (req, res, next) {
  try {
    const access_token = req.body.access_token;
    const authReq = {
      access_token: access_token,
    };

    const transReq = {
      access_token: access_token,
      start_date: "2020-01-01",
      end_date: "2023-03-16",
    };

    const authRes = await plaidClient.authGet(authReq);
    const accountData = authRes.data.accounts;
    const numbers = authRes.data.numbers;

    const transRes = await plaidClient.transactionsGet(transReq);
    let transactions = transRes.data.transactions;
    const total_transactions = transRes.data.total_transactions;
    while (transactions.length < total_transactions) {
      const paginatedRequest = {
        access_token: access_token,
        start_date: "2020-01-01",
        end_date: "2023-03-16",
        options: {
          offset: transactions.length,
        },
      };
      const paginatedResponse = await plaidClient.transactionsGet(
        paginatedRequest
      );
      transactions = transactions.concat(paginatedResponse.data.transactions);
    }

    res.send({
      accountData: accountData,
      numbers: numbers,
      trans: transactions,
    });
  } catch (error) {
    next(error);
  }
});

// const {
//   models: {  },
// } = require("../db");
module.exports = router;
