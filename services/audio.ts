import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

let audioRecorderPlayer: AudioRecorderPlayer;

export const onStartRecord = async () => {
  audioRecorderPlayer = new AudioRecorderPlayer();
  const path = 'hello.m4a';
  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };
  console.log('audioSet', audioSet);
  try {
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    console.log(`uri: ${uri}`);

    return uri;
  } catch (error) {
    console.log('error' + error);

    return error;
  }
};

export const onStopRecord = async () => {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  //   setState({
  //     recordSecs: 0,
  //   });
  console.log(result);
};

// const onStartPlay = async () => {
//   console.log('onStartPlay');
//   const msg = await audioRecorderPlayer.startPlayer();
//   console.log(msg);
//   audioRecorderPlayer.addPlayBackListener(e => {
//     setState({
//       currentPositionSec: e.currentPosition,
//       currentDurationSec: e.duration,
//       playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
//       duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//     });
//     return;
//   });
// };

// const onPausePlay = async () => {
//   await audioRecorderPlayer.pausePlayer();
// };

// const onStopPlay = async () => {
//   console.log('onStopPlay');
//   audioRecorderPlayer.stopPlayer();
//   audioRecorderPlayer.removePlayBackListener();
// };
