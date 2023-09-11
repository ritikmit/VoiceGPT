import {useEffect, useState} from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../App.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreativityPreference, LengthPreference } from './Preference.enums';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';


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
    const [voiceMessage, setVoiceMessage] = useState('');
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState<AudioRecorderPlayer | null>(null);

     const handleSendMessage = () => {
        if (message.trim() !== '') {
          setConversation([...conversation, { text: message, sender: 'user' },{ text: 'I am not integrated with open AI yet', sender: 'assistant' }]);
          setMessage('');
        }
      };

      const handleMicPress = async () => {
        if (audioRecorderPlayer !== null) {
            console.log(audioRecorderPlayer)
        const result = await audioRecorderPlayer!.startRecorder();
        console.log(result);
    
        setTimeout(async () => {
          const filePath = await audioRecorderPlayer!.stopRecorder();
          console.log(filePath);
          setVoiceMessage(filePath);
        }, 5000);
        } else {
            console.log("audioRecorderPlayer null")
        }
      };

      useEffect(() => {
        const recorderPlayer = new AudioRecorderPlayer();
        setAudioRecorderPlayer(recorderPlayer);
        console.log("audio recored player set")
      }, []);
    

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