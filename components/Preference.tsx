import {useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { styles } from '../App.styles';
import { CreativityPreference, LengthPreference } from './Preference.enums';

interface PreferenceProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    creativityPreference: CreativityPreference;
    lengthPreference: LengthPreference;
    handleCreativityPreferenceChange: (preference: CreativityPreference) => void;
    handleLengthPreferenceChange: (preference: LengthPreference) => void;
  }

export default function Preference({currentPage,
    onPageChange,
    creativityPreference,
    lengthPreference,
    handleCreativityPreferenceChange,
    handleLengthPreferenceChange,
  }: PreferenceProps) {

    const [tempCreativityPreference, setTempCreativityPreference] = useState(creativityPreference);
    const [tempLengthPreference, setTempLengthPreference] = useState(lengthPreference);
    
    const handleTempCreativityPreferenceChange = (preference: CreativityPreference) => {
        setTempCreativityPreference(preference);
      };

    const handleTempLengthPreferenceChange = (preference: LengthPreference) => {
        setTempLengthPreference(preference);
      };
    
    const handleSavePreference = () => {
        // Save preferences here
        handleCreativityPreferenceChange(tempCreativityPreference)
        handleLengthPreferenceChange(tempLengthPreference)
      };

      const handleStartConversation = () => {
        onPageChange('Conversation');
      };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.preferenceContainer}>
        <Text style={styles.title}>Level of Creativity</Text>
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            tempCreativityPreference === CreativityPreference.PRESERVED && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleTempCreativityPreferenceChange(CreativityPreference.PRESERVED)}
        >
          <Text style={styles.buttonText}>Preserved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            tempCreativityPreference === CreativityPreference.BALANCE && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleTempCreativityPreferenceChange(CreativityPreference.BALANCE)}
        >
          <Text style={styles.buttonText}>Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            tempCreativityPreference === CreativityPreference.CREATIVE && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleTempCreativityPreferenceChange(CreativityPreference.CREATIVE)}
        >
          <Text style={styles.buttonText}>Creative</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.preferenceContainer}>
        <Text style={styles.title}>Conversation Type</Text>
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            tempLengthPreference === LengthPreference.DETAILED && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleTempLengthPreferenceChange(LengthPreference.DETAILED)}
        >
          <Text style={styles.buttonText}>Detailed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            tempLengthPreference === LengthPreference.CASUAL && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleTempLengthPreferenceChange(LengthPreference.CASUAL)}
        >
          <Text style={styles.buttonText}>Casual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.preferenceButton,
            tempLengthPreference === LengthPreference.CRISP && styles.selectedPreferenceButton,
          ]}
          onPress={() => handleTempLengthPreferenceChange(LengthPreference.CRISP)}
        >
          <Text style={styles.buttonText}>Crisp</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePreference}>
          <Text style={styles.buttonText}>Save Preference</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton} onPress={handleStartConversation}>
          <Text style={styles.buttonText}>Start Conversation</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}