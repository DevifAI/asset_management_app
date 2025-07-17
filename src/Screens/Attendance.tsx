import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Activity = {
  id: string;
  date: string;
  hours: string;
  timeSlot: string;
};

type Asset = {
  id: string;
  location: string;
  status: 'Running' | 'Close';
};

const Attendance = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [assignedAssets, setAssignedAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Dummy API simulation
  useEffect(() => {
    setTimeout(() => {
      const dummyActivities: Activity[] = [
        {
          id: 'Mkqn200',
          date: 'Jul 07, 2025',
          hours: '8 Hours',
          timeSlot: '11:00 AM - 7:00 PM',
        },
        {
          id: 'Nkqn201',
          date: 'Jul 08, 2025',
          hours: '7 Hours',
          timeSlot: '10:00 AM - 5:00 PM',
        },
      ];

      const dummyAssets: Asset[] = [
        { id: 'KI200xmy', location: 'Location ABC', status: 'Running' },
        { id: 'KI200xmy', location: 'Location ABC', status: 'Close' },
      ];

      setActivities(dummyActivities);
      setAssignedAssets(dummyAssets);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 35 }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Attendance</Text>
        <View style={styles.notificationIcon}>
          <MaterialIcons name="notifications-none" size={26} color="#000" />
        </View>

        {/* Date Range Picker */}
        <View style={styles.dateRow}>
          <TouchableOpacity style={styles.dateBtn}>
            <Feather name="calendar" size={18} color="#007BFF" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>07 Jul, 2025</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dateBtn}>
            <Feather name="calendar" size={18} color="#007BFF" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>08 Jul, 2025</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        ) : (
          activities.map((item, i) => (
            <View key={i} style={styles.activityCard}>
              <View style={styles.timeTag}>
                <Text style={styles.timeText}>{item.timeSlot}</Text>
              </View>
              <View style={styles.activityIcon}>
                <Feather name="check-circle" size={20} color="#007bff" />
              </View>
              <View style={{ flex: 1  , gap: 4}}>
                <Text style={styles.activityText}>SL No. {item.id}</Text>
                <View style={styles.activityRow}>
                  <Feather name="calendar" size={12} color="#000" />
                  <Text style={styles.activitySubText}>{item.date}</Text>
                  <Feather name="clock" size={12} color="#000" style={{ marginLeft: 12 }} />
                  <Text style={styles.activitySubText}>{item.hours}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Asset Assigned */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Asset Assigned</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        {assignedAssets.map((asset, i) => (
          <View key={i} style={styles.card}>
            <FontAwesome name="gears" size={24} color="#000" style={styles.cardIcon} />
            <View style={{gap: 4}}>
              <Text style={styles.cardText}>ID: {asset.id}</Text>
              <View style={styles.cardSubRow}>
                <Feather name="map-pin" size={12} color="#000" />
                <Text style={styles.cardSubText}>{asset.location}</Text>
              </View>
            </View>
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
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
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
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  dateBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#007bff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    color: '#6c757d',
    fontSize: 12,
  },
  dateValue: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 24,
    marginBottom: 6,
  },
activityCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff', // Changed from #f9f9f9 to white
  borderRadius: 12,
  padding: 12,
  marginTop: 12,
  shadowColor: '#000',
  elevation: 2,
  position: 'relative',
  height: 80, // Increased height
},

  activityIcon: {
    backgroundColor: '#e5f0ff',
    padding: 10,
    borderRadius: 100,
    marginRight: 12,
  },
  activityText: {
    fontWeight: '600',
    fontSize: 15,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  activitySubText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },
  timeTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#06B000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 12,
    zIndex: 1,
  },
  timeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  sectionHeader: {
    marginTop:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAll: {
    color: '#007bff',
    fontWeight: '500',
     marginTop: 24,
     fontSize: 16,
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
    marginTop: 2,
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
