const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
require('dotenv').config();
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ;
const azureApiKey = process.env["AZURE_OPENAI_KEY"] ;

const messages = [
  { role: "system", content: "For further converstaion, keep your responses concise and brief" },
  { role: "user", content: "When will bumrah be fit?" },
];

async function getGptResponse() {
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo-16k";
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}


// Keepoing it here for test, will remove and use the function in the react skeleton code
getGptResponse().catch((err) => {
  console.error("Some Error Encountered", err);
});

module.exports = { getGptResponse };