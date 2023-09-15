import {useState} from 'react';
import {SafeAreaView, Text, TextInput, TouchableOpacity} from 'react-native';
import {getMicStyle, styles} from '../App.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CreativityPreference, LengthPreference} from './Preference.enums';
// import {Audio} from 'expo-av';
import {getGptResponse} from '../services/gpt';
import {play, stop} from '../services/tts';
import {onStartRecord, onStopRecord} from '../services/audio/audio';
import React = require('react');

interface ConversationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  creativityPreference: CreativityPreference;
  lengthPreference: LengthPreference;
}

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export default function Conversation({
  currentPage,
  onPageChange,
  creativityPreference,
  lengthPreference,
}: ConversationProps) {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  // const [voiceMessage, setVoiceMessage] = useState<Audio.Recording>();
  const [voicePath, setVocicePath] = useState('');

  const playSound = (inputText: string) => {
    play(inputText);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      let userMessage: Message = {content: message, role: 'user'};
      let newConversation: Message[] = [...conversation, userMessage];
      setConversation(newConversation);
      let gptResponse = await getGptResponse(newConversation);
      let assistantMessage: Message = {content: gptResponse, role: 'assistant'};
      newConversation = [...newConversation, assistantMessage];
      setConversation(newConversation);
      console.log(gptResponse);
      playSound(assistantMessage.content);
      setMessage('');
    }
  };

  const handleMicPress = async () => {
    // if (voiceMessage) {
    //   await stopRecording();
    // } else {
    //   await startRecording();
    // }
    if (!isRecording) {
      const res = onStartRecord();
      setIsRecording(true);
      // setVocicePath(res)
      console.log('res: ' + JSON.stringify(res));
    } else {
      onStopRecord();
      setIsRecording(false);
      console.log('Recording stopped');
    }
  };

  // async function startRecording() {
  //   try {
  //     console.log('Requesting permissions..');
  //     await Audio.requestPermissionsAsync();
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });

  //     console.log('Starting recording..');
  //     const {recording} = await Audio.Recording.createAsync(
  //       Audio.RecordingOptionsPresets.HIGH_QUALITY,
  //     );
  //     setVoiceMessage(recording);
  //     console.log(recording);
  //     console.log('Recording started');
  //   } catch (err) {
  //     console.error('Failed to start recording', err);
  //   }
  // }

  // async function stopRecording() {
  //   console.log('Stopping recording..');
  //   console.log(voiceMessage);
  //   await voiceMessage!.stopAndUnloadAsync();
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });
  //   const uri = voiceMessage!.getURI();
  //   const sound = await voiceMessage!.createNewLoadedSoundAsync();
  //   await sound.sound.playAsync();
  //   setVoiceMessage(undefined);
  //   console.log('Recording stopped and stored at', uri);
  // }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => onPageChange('Preference')}>
          <Text style={styles.buttonText}>Change Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => onPageChange('Login')}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.conversation}>
        {conversation.map((message, index) => (
          <SafeAreaView
            style={[
              styles.messageContainer,
              message.role === 'user'
                ? styles.userMessage
                : styles.assistantMessage,
            ]}>
            <Text style={styles.messageLabel}>{message.role}</Text>
            <Text style={styles.messageText}>{message.content}</Text>
          </SafeAreaView>
        ))}
      </SafeAreaView>
      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={getMicStyle(isRecording)}
          onPress={handleMicPress}>
          {/* <Icon name="microphone" size={24} color="#fff" /> */}
          <Text>Mic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => {
            setConversation([]);
          }}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => {
            stop();
          }}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}
