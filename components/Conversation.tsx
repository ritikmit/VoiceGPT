import {useEffect, useState} from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../App.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreativityPreference, LengthPreference } from './Preference.enums';
import { Audio } from 'expo-av';

interface ConversationProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    creativityPreference: CreativityPreference;
    lengthPreference: LengthPreference;
}

interface Message {
    text: string;
    sender: 'user' | 'assistant';
}

export default function Conversation({ currentPage, onPageChange, creativityPreference, lengthPreference }: ConversationProps) {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const [voiceMessage, setVoiceMessage] = useState<Audio.Recording>();

     const handleSendMessage = () => {
        if (message.trim() !== '') {
          setConversation([...conversation, { text: message, sender: 'user' },{ text: 'I am not integrated with open AI yet', sender: 'assistant' }]);
          setMessage('');
        }
      };

      const handleMicPress = async () => {
        if (voiceMessage) {
            await stopRecording();
        } else {
            await startRecording();
        }
      };

      async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
    
          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setVoiceMessage(recording);
          console.log(recording)
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }

      async function stopRecording() {
        console.log('Stopping recording..');
        console.log(voiceMessage)
        await voiceMessage!.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
          {
            allowsRecordingIOS: false,
          }
        );
        const uri = voiceMessage!.getURI();
        const sound = await voiceMessage!.createNewLoadedSoundAsync();
        await sound.sound.playAsync();
        setVoiceMessage(undefined);
        console.log('Recording stopped and stored at', uri);
      }

    

    return (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={() => onPageChange('Preference')}>
              <Text style={styles.buttonText}>Change Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => onPageChange('Login')}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <SafeAreaView style={styles.conversation}>
          {conversation.map((message, index) => (
          <SafeAreaView key={index} style={[styles.messageContainer, message.sender === 'user' ? styles.userMessage : styles.assistantMessage]}>
            <Text style={styles.messageLabel}>{message.sender}</Text>
            <Text style={styles.messageText}>{message.text}</Text>
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
            <TouchableOpacity style={styles.micButton} onPress={handleMicPress}>
                <Icon name="microphone" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      );
}