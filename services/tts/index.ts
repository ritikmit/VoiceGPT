import Tts from 'react-native-tts';

// export const initializeTts = () => {
//   Tts.getInitStatus().then(
//     () => {
//       console.log('TTS Initialized');
//     },
//     err => {
//       if (err.code === 'no_engine') {
//         Tts.requestInstallEngine();
//       }

//       console.log('TTS Initialization failed : ' + err.code);
//     },
//   );
// };

export const play = (text: string = 'Hello World!') => {
  Tts.speak(text, {
    iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
    rate: 0.5,
    androidParams: {
      KEY_PARAM_PAN: -1,
      KEY_PARAM_VOLUME: 0.5,
      KEY_PARAM_STREAM: 'STREAM_SYSTEM',
    },
  });
};

export const stop = () => {
  Tts.stop();
};
