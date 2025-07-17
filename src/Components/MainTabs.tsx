import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Screens/Home';
import Attendance from '../Screens/Attendance';
import Profile from '../Screens/Profile';

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;

type TabItem = {
  name: string;
  component: React.ComponentType<any>;
  iconName: string;
};

const TabsConfig: TabItem[] = [
  { name: 'Home', component: Home, iconName: 'home-outline' },
  { name: 'Attendance', component: Attendance, iconName: 'calendar-check-outline' },
  { name: 'Settings', component: Profile, iconName: 'cog-outline' }, // Renamed Profile → Settings
];

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const tabWidth = windowWidth / state.routes.length;
  const indicatorWidth = tabWidth * 0.5;

  useEffect(() => {
    Animated.timing(indicatorPosition, {
      toValue: state.index * tabWidth + tabWidth / 4,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={{ backgroundColor: '#fff', elevation: 8 }}>
      {/* Blue top indicator */}
      <View style={{ height: 4, position: 'relative' }}>
        <Animated.View
          style={[
            styles.topBarIndicator,
            {
              transform: [{ translateX: indicatorPosition }],
              width: indicatorWidth,
            },
          ]}
        />
      </View>

      {/* Tab Items */}
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tab: TabItem | undefined = options.tabData;

          if (!tab) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <Icon
                name={tab.iconName}
                size={28} // Increased icon size
                color={isFocused ? '#1271EE' : '#000'}
              />
              <Text
                style={{
                  fontSize: 13, // Increased text size
                  marginTop: 4,
                  color: isFocused ? '#1271EE' : '#000',
                  fontWeight: isFocused ? '600' : '400',
                  paddingBottom: 4,
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TabsConfig.find((t) => t.name === route.name);
        return {
          headerShown: false,
          tabData: tab,
        };
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {TabsConfig.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  topBarIndicator: {
    height: 3,
    backgroundColor: '#1271EE',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 1.5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});

export default MainTabs;
