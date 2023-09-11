import {useState} from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../App.styles';

interface LoginProps {
    currentPage: string;
    onPageChange: (page: string) => void;
  }
  

export default function Login({ currentPage, onPageChange }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // handle login logic
        onPageChange('Preference');
      };

    return (
        <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
}