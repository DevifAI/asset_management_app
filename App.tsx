
import Routes from './src/routes';
import 'react-native-reanimated';

import { Platform } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/Redux/store';
import { toastConfig } from './src/Components/toastConfig';
import Toast from 'react-native-toast-message';
import React from 'react';

export const fontFamily = 'FontBueno'; // 👈 Use your custom font name here

(Text as any).defaultProps = {
  ...(Text as any).defaultProps,
  style: [{ fontFamily }],
};

(TextInput as any).defaultProps = {
  ...(TextInput as any).defaultProps,
  style: [{ fontFamily }],
};

const App = () => {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <Routes />
    <Toast config={toastConfig} />
   </PersistGate>
  </Provider>
  );
};

export default App;