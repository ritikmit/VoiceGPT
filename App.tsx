import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './App.styles';
import Login from './components/Login';
import Conversation from './components/Conversation';
import Preference from './components/Preference';
import { CreativityPreference, LengthPreference } from './components/Preference.enums'

export default function App() {
  const [currentPage, setCurrentPage] = useState('Login');
  const [creativityPreference, setCreativityPreference] = useState(CreativityPreference.BALANCE);
  const [lengthPreference, setLengthPreference] = useState(LengthPreference.CASUAL);

  const handleCreativityPreferenceChange = (preference: CreativityPreference) => {
    setCreativityPreference(preference);
  };

  const handleLengthPreferenceChange = (preference: LengthPreference) => {
    setLengthPreference(preference);
  };
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentPage === 'Login' && <Login currentPage={currentPage} onPageChange={handlePageChange} />}
      {currentPage === 'Conversation' && (
        <Conversation currentPage={currentPage} onPageChange={handlePageChange} creativityPreference={creativityPreference} 
         lengthPreference={lengthPreference} />
      )}
      {currentPage === 'Preference' && (
        <Preference currentPage={currentPage} onPageChange={handlePageChange} creativityPreference={creativityPreference} 
        handleCreativityPreferenceChange={handleCreativityPreferenceChange} lengthPreference={lengthPreference} handleLengthPreferenceChange={handleLengthPreferenceChange}/>
      )}
    </SafeAreaView>
  );
}
