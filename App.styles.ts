import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    preferenceContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
      marginVertical: 8,
      width: '80%',
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 4,
      padding: 12,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    conversation: {
      flex: 1,
      minWidth: '90%',
      maxWidth: '100%',
      padding: 0,
    },
    message: {
      fontSize: 16,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: 16,
    },
    micButton: {
      backgroundColor: '#ccc',
      borderRadius: 50,
      padding: 12,
    },
    sendButton: {
      backgroundColor: '#007AFF',
      borderRadius: 4,
      padding: 12,
      alignItems: 'center',
    },
    preferenceButton: {
      backgroundColor: '#ccc',
      borderRadius: 4,
      padding: 12,
      width: '80%',
      marginVertical: 8,
      alignItems: 'center',
    },
    selectedPreferenceButton: {
      backgroundColor: '#007AFF',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 16,
    },
    saveButton: {
      backgroundColor: '#007AFF',
      borderRadius: 4,
      padding: 12,
      width: '40%',
      alignItems: 'center',
      marginRight: 8,
    },
    startButton: {
      backgroundColor: '#ccc',
      borderRadius: 4,
      padding: 12,
      width: '40%',
      alignItems: 'center',
      marginLeft: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
      padding: 16,
      paddingTop: 48,
    },
    headerButton: {
      backgroundColor: '#007AFF',
      borderRadius: 4,
      padding: 8,
      marginLeft: 8,
    },
    messageContainer: {
      borderRadius: 8,
      padding: 2,
      marginBottom: 2,
      maxWidth: '100%',
    },
    userMessage: {
      backgroundColor: '#87CEEB',
      alignSelf: 'flex-start',
    },
    assistantMessage: {
      backgroundColor: '#00C853',
      alignSelf: 'flex-end',
    },
    messageLabel: {
      paddingHorizontal: 2,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    messageText: {
      paddingHorizontal: 2,
      color: '#fff',
    }
  });