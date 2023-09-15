/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import type {PropsWithChildren} from 'react';
import {useState} from 'react';
import 'react-native-url-polyfill/auto';
import {styles} from './App.styles';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {play} from './services/tts';
import Conversation from './components/Conversation';
import {
  CreativityPreference,
  LengthPreference,
} from './components/Preference.enums';
import Login from './components/Login';
import Preference from './components/Preferences';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputText, setInputText] = useState('');
  const [currentPage, setCurrentPage] = useState('Login');
  const [creativityPreference, setCreativityPreference] = useState(
    CreativityPreference.BALANCE,
  );
  const [lengthPreference, setLengthPreference] = useState(
    LengthPreference.CASUAL,
  );

  const handleCreativityPreferenceChange = (
    preference: CreativityPreference,
  ) => {
    setCreativityPreference(preference);
  };

  const handleLengthPreferenceChange = (preference: LengthPreference) => {
    setLengthPreference(preference);
  };
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const playSound = () => {
    play(inputText);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <SafeAreaView>
          <Text>Chatter bot</Text>
        </SafeAreaView>
        {/* <Header /> */}
        {/* <TextInput
          placeholder="Enter text to be read here"
          onChangeText={value => {
            setInputText(value);
          }}></TextInput> */}
        {/* <Button title="Press for sound" onPress={playSound}></Button> */}
        <SafeAreaView style={styles.container}>
          {currentPage === 'Login' && (
            <Login currentPage={currentPage} onPageChange={handlePageChange} />
          )}
          {currentPage === 'Conversation' && (
            <Conversation
              currentPage={currentPage}
              onPageChange={handlePageChange}
              creativityPreference={creativityPreference}
              lengthPreference={lengthPreference}
            />
          )}
          {currentPage === 'Preference' && (
            <Preference
              currentPage={currentPage}
              onPageChange={handlePageChange}
              creativityPreference={creativityPreference}
              handleCreativityPreferenceChange={
                handleCreativityPreferenceChange
              }
              lengthPreference={lengthPreference}
              handleLengthPreferenceChange={handleLengthPreferenceChange}
            />
          )}
        </SafeAreaView>
        {/* <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
