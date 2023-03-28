const router = require("express").Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

router.get("/goalquote", async (req, res, next) => {
  try {
    console.log("im here");
    let prompt =
      "Generate me 10 random inspiring quote about saving towards your goals, return me one of those random quote";

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 4000,
      temperature: 1,
    });
    console.log(response);
    res.status(200).send(response.data.choices[0].text.substring(2));
  } catch (e) {
    next();
  }
});

router.get("/stepstowardsgoal", async (req, res, next) => {
  try {
    let prompt = "Generate me 3 short steps to help achieve goals";

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 4000,
      temperature: 1,
    });
    res.status(200).send(response.data.choices[0].text.substring(2));
  } catch (e) {
    next();
  }
});

module.exports = router;
