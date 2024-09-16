import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const Status = ({ route }) => {
  const { driverName, driverPhone } = route.params;

  return (
    <View style={styles.container}>
      {/* Order Status */}
      <Text style={styles.statusText}>Status: Coming to You</Text>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,  // Sample coordinates, replace with your actual location data
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      {/* Driver Info */}
      <View style={styles.driverInfo}>
        <Text style={styles.driverText}>Driver: {driverName}</Text>
        <Text style={styles.driverText}>Phone: {driverPhone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'flex-end',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '70%',
  },
  driverInfo: {
    padding: 20,
    backgroundColor: '#fff',
  },
  driverText: {
    fontSize: 16,
    color: '#0D47A1',
  },
});

export default Status;
