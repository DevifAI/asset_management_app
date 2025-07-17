import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f7f9fc" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Top Header with Logo & Logout */}
        <View style={styles.header}>
          <Image
            source={require('../Assets/companyLogo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
            <MaterialIcon name="power-settings-new" size={20} color="red" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../Assets/user.png')}
            style={styles.avatar}
          />
        </View>

        {/* Profile Options */}
        <View style={styles.optionsWrapper}>
          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.iconWrapper}>
              <Icon name="user" size={18} color="#fff" />
            </View>
            <Text style={styles.optionText}>Sayan Kumar Pal</Text>
            <Icon name="chevron-right" size={18} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.iconWrapper}>
              <Icon name="lock" size={18} color="#fff" />
            </View>
            <Text style={styles.optionText}>Change Password</Text>
            <Icon name="chevron-right" size={18} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View style={styles.iconWrapper}>
              <Icon name="mail" size={18} color="#fff" />
            </View>
            <Text style={styles.optionText}>Contact Us</Text>
            <Icon name="chevron-right" size={18} color="#bbb" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop:35
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 32,
    width: 100,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  logoutText: {
    color: 'red',
    fontWeight: '600',
    marginRight: 5,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#cfd8dc',
  },
  optionsWrapper: {
    gap: 14,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6eefc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 1,
  },
  iconWrapper: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default Profile;
