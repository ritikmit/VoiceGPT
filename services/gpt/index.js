const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = 0;
const azureApiKey = 0;

const messages = [
  { role: "system", content: "For further converstaion, keep your responses concise and brief" },
  { role: "user", content: "When will bumrah be fit?" },
];

async function getGptResponse(conversation) {
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo-16k";
  let message = "Could not generate response. Try again!";
  const result = await client.getChatCompletions(deploymentId, conversation);

  console.log(result.choices);
  if(result.choices[0]?.message !== undefined){
    message = result.choices[0]?.message.content;
  }

  return message;
}

module.exports = {getGptResponse};