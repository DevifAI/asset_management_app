import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ userId?: string; password?: string }>({});

  const navigation = useNavigation<any>();

  const validate = () => {
    const newErrors: { userId?: string; password?: string } = {};
    if (!userId.trim()) newErrors.userId = 'User ID is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    // if (validate()) {
    //   console.log('Logging in with:', userId, password);
    // }
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <Text style={styles.title}>Asset Tracker</Text>

            <Image
              source={require('../Assets/companyLogo2.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.loginLabel}>Login</Text>

            <TextInput
              placeholder="Enter User Id"
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              placeholderTextColor="#999"
            />
            {errors.userId && <Text style={styles.errorText}>{errors.userId}</Text>}

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter Password"
                style={styles.passwordInput}
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 35,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop:30
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 30,
  },
  loginLabel: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 52,
    fontSize: 16,
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#000',
  },
  passwordContainer: {
    width: '100%',
    height: 52,
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  eyeButton: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  forgotPassword: {
    color: '#007AFF',
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 12,
  },
});

export default LoginScreen;
