const { getGptResponse } = require("./services/gpt/index.js")


// Keepoing it here for test, will remove and use the function in the react skeleton code
getGptResponse().catch((err) => {
    console.error("Some Error Encountered", err);
  });