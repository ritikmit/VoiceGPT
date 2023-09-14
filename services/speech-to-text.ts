import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk'
import { AudioConfig, AudioInputStream } from 'microsoft-cognitiveservices-speech-sdk'
import base64 from 'base64-js'

import * as RNFS from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import fs from 'fs'

// const convertM4AToWAV = async (m4aUri) => {
//     try {
//       // Ensure the output directory exists
//       const outputDirectory = `${RNFS.documentDirectory}wav`;
//       await RNFS.makeDirectoryAsync(outputDirectory, { intermediates: true });
  
   
  
//       // Generate a unique file name for the WAV file
//       const wavFileName = `${Date.now()}.wav`;
//       const wavUri = `${outputDirectory}/${wavFileName}`;
  
   
  
//       // Perform the conversion using Expo's file system
//       await MediaLibrary.convertAsync({ uri: m4aUri }, { outputFormat: MediaLibrary.VideoExportPreset.WAV, outputFileType: MediaLibrary.MediaType.audio });
  
//       console.log(`Conversion complete. WAV file saved at: ${wavUri}`);
  
   
  
//       // You can use 'wavUri' to access the converted WAV file
//     } catch (error) {
//       console.error('Conversion error:', error);
//     }
//   };
  
export const testingSTT =  async (uri: string = 'file:///storage/emulated/0/Test/test.wav') => {
    const subscriptionKey = '50da187e23bd4fdab58c1cb843451f24'
const serviceRegion = 'eastus'
var pushStream = sdk.AudioInputStream.createPushStream();
console.log("location: ", uri)
const fileContent = await RNFS.readAsStringAsync(uri, {
    encoding: RNFS.EncodingType.Base64
  })
  console.log("audio Content", fileContent)
  const uintarray = new Uint8Array(base64.toByteArray(fileContent)).buffer
  console.log("arrayBuffer", uintarray)
  console.log("length of uintarray:", uintarray.byteLength)
  console.log("Data type of uintarray:", uintarray.constructor.name);
  pushStream.write(uintarray)
  
var audioConfig = sdk.AudioConfig.fromMicrophoneInput("352659955097867");
console.log("AudioConfigg: ",audioConfig)
var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

speechConfig.speechRecognitionLanguage = "en-US";

var recognizer: SpeechRecognizer | undefined = new sdk.SpeechRecognizer(speechConfig, audioConfig);
const result = await recognizer.recognizeOnceAsync()
console.log(result)
}