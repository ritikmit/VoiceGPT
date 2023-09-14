import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk'
import { AudioConfig, AudioInputStream } from 'microsoft-cognitiveservices-speech-sdk'
import base64 from 'base64-js'

import * as RNFS from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import fs from 'fs'

export const testingSTT =  async (uri: string) => {
    const subscriptionKey = "<insert SUBSCRIPTION KEY AS SHARED IN THE MAIL>"
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
  
var audioConfig = sdk.AudioConfig.fromAudioInputStream(pushStream);
console.log("AudioConfigg: ",audioConfig)
var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

speechConfig.speechRecognitionLanguage = "en-US";

var recognizer: SpeechRecognizer | undefined = new sdk.SpeechRecognizer(speechConfig, audioConfig);
const result = await recognizer.recognizeOnceAsync()
console.log(result)
}