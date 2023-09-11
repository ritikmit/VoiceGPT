import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './App.styles';
import Login from './components/Login';
import Conversation from './components/Conversation';
import Preference from './components/Preference';
import { CreativityPreference, LengthPreference } from './components/Preference.enums'
import { PermissionsAndroid } from 'react-native';
import { request } from 'react-native-permissions';

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

  const requestPermissions = async () => {
    console.log("requesting permissions")
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      console.log(granted)
      if (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
      } else {
        console.log('Some permissions not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

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
