import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AssetBreakdownModal from '../Modal/AssetBreakdownModal';
import ReportBreakdownModal from '../Modal/ReportBreakdownModal';

type Asset = {
  id: string;
  location: string;
  status?: 'Running' | 'Close';
};

const Home = () => {
  const [assignedAssets, setAssignedAssets] = useState<Asset[]>([]);
  const [nextAssignment, setNextAssignment] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const dummyAssigned: Asset[] = [
        { id: 'KI200xmy', location: 'Location ABC', status: 'Running' },
        { id: 'XY12345', location: 'Location DEF', status: 'Close' },
      ];

      const dummyNext: Asset = { id: 'JM999CDE', location: 'Location GHI' };

      setAssignedAssets(dummyAssigned);
      setNextAssignment(dummyNext);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 35 }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Asset Tracker</Text>

        <View style={styles.notificationIcon}>
          <Icon name="notifications-none" size={26} color="#000" />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>Log In</Text>
            <View style={styles.loginIconWrapper}>
              <FeatherIcon name="user-check" size={18} color="#007BFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} disabled>
            <Text style={styles.logoutText}>Log Out</Text>
            <View style={styles.logoutIconWrapper}>
              <Icon name="logout" size={18} color="#007BFF" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.lastLogin}>Last: 10:00 AM, Wed 6 Jul. 25</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Asset Assigned</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        ) : (
          assignedAssets.map((asset, index) => (
            <View key={index} style={styles.card}>
              {asset.status && (
                <View
                  style={[
                    styles.statusTag,
                    {
                      backgroundColor:
                        asset.status === 'Running' ? '#06B000' : '#007bff',
                    },
                  ]}
                >
                  <Text style={styles.statusText}>{asset.status}</Text>
                </View>
              )}
              <FontAwesome name="gears" size={24} color="#000" style={styles.cardIcon} />
              <View style={{ gap: 4 }}>
                <Text style={styles.cardText}>ID: {asset.id}</Text>
                <View style={styles.cardSubRow}>
                  <FeatherIcon name="map-pin" size={12} color="#000" />
                  <Text style={styles.cardSubText}>{asset.location}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next Assignment</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        {!loading && nextAssignment && (
          <TouchableOpacity  style={styles.card}  onPress={() => setModalVisible(true)}>
            <FontAwesome name="gears" size={24} color="#000" style={styles.cardIcon} />
            <View style={{ gap: 4 }}>
              <Text style={styles.cardText}>ID: {nextAssignment.id}</Text>
              <View style={styles.cardSubRow}>
                <FeatherIcon name="map-pin" size={12} color="#000" />
                <Text style={styles.cardSubText}>{nextAssignment.location}</Text>
              </View>
            </View>
          </TouchableOpacity >
        )}

<ReportBreakdownModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onConfirm={() => {
    // handle breakdown report logic here
    setModalVisible(false);
  }}
  assetCode="MA001"
/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
 title: {
  fontSize: 26,
  fontWeight: '600',
  letterSpacing: 0.5, // Adjust this value as needed
},

  notificationIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  loginBtn: {
    flexDirection: 'row',
    backgroundColor: '#1271EE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    flex: 1,
    fontSize: 16,
  },
  loginIconWrapper: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 4,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#b6d1f5ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    flex: 1,
    fontSize: 16,
  },
  logoutIconWrapper: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 4,
  },
  lastLogin: {
    color: 'red',
    marginTop: 8,
    fontStyle: 'italic',
  },
  sectionHeader: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewAll: {
    color: '#007bff',
    fontWeight: '500',
  },
   card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 88,
    marginTop: 12,
    shadowColor: '#000',
    elevation: 2,
    gap:4
  },
  cardIcon: {
    marginRight: 12,
  },
  cardText: {
    fontWeight: '600',
    fontSize: 15,
  },
  cardSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSubText: {
    color: '#6c757d',
    fontSize: 13,
    marginLeft: 6,
  },
  statusTag: {
     position: 'absolute',
    top: 0,
    right: 0,
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 14,
      borderTopRightRadius: 12,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
  },
});
