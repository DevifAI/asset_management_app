import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './Screens/SplashScreen';
// import OnboardingScreen from './screens/OnboardingScreen';
import Login from './Screens/Login';
// import ForgotPassword from './screens/FrogetPassword';
// import OtpVerification from './screens/OtpVerfication';
// import CreateNewPassword from './screens/CreateNewPassword';
// import DoneScreen from './screens/DoneScreen';
// import Onboarding from './screens/Onboarding';
// import MainTabs from './components/MainTabs';
// import BuyNow from './screens/Buynow';
// import Payment from './screens/Payment';
// import SlotBook from './screens/SlotBook';
// import Booking from './screens/Booking';
// import PaymentSuccess from './screens/PaymentSuccess';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import MainTabs from './Components/MainTabs';
// import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();


const Routes = () => {
      const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
         {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
         <Stack.Screen name="OtpVerify" component={OtpVerification} />
         <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} /> */}

{/* <Stack.Screen name="MainTabs" component={isAuthenticated ? MainTabs : Login} /> */}
<Stack.Screen name="MainTabs" component={MainTabs} />
{/* <Stack.Screen name="Done" component={isAuthenticated ? DoneScreen : Login} />
<Stack.Screen name="Onboarding" component={isAuthenticated ? Onboarding : Login} />
<Stack.Screen name="Buynow" component={isAuthenticated ? BuyNow : Login} />
<Stack.Screen name="Payment" component={isAuthenticated ? Payment : Login} />
<Stack.Screen name="SlotBook" component={isAuthenticated ? SlotBook : Login} />
<Stack.Screen name="Booking" component={isAuthenticated ? Booking : Login} />
<Stack.Screen name="PaymentSuccess" component={isAuthenticated ? PaymentSuccess : Login} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;