import Tts from 'react-native-tts';

export const TTSService = () => {
  const speak = async (text: string = 'Sending to GPT!') => {
    Tts.speak(text, {
      iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
      rate: 0.5,
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  return {
    speak,
  };
};

// async function getGptResponse(conversation) {
//   const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
//   const deploymentId = "gpt-35-turbo-16k";
//   let message = "Could not generate response. Try again!";
//   const result = await client.getChatCompletions(deploymentId, conversation);

//   console.log(result.choices);
//   if(result.choices[0]?.message !== undefined){
//     message = result.choices[0]?.message.content;
//   }

//   return message;
// }

// module.exports = {getGptResponse};
