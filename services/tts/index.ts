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
  Tts.speak(text);
};

export const stop = () => {
  Tts.stop();
};
