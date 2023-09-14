import {OpenAIClient, AzureKeyCredential} from '@azure/openai';
const endpoint = 'https://ausopenai.azure-api.net';
const azureApiKey = '';

export interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const messages = [
  {
    role: 'system',
    content: 'For further converstaion, keep your responses concise and brief',
  },
  {role: 'user', content: 'When will bumrah be fit?'},
];

export const getGptResponse = async (conversation: Message[]) => {
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey),
  );
  const deploymentId = 'gpt-35-turbo-16k';
  let message = 'Could not generate response. Try again!';
  const conv = [{role: 'user', content: 'keep it short'}, ...conversation];
  console.log('conversation: ' + JSON.stringify(conv));
  const result = await client.getChatCompletions(deploymentId, conv);

  console.log(result.choices);
  if (result.choices[0]?.message !== undefined) {
    message = result.choices[0]?.message.content!;
  }

  return message;
};
