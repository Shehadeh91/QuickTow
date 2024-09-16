import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, ActivityIndicator } from 'react-native';
import { Text, IconButton, RadioButton, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Service prices
  const services = [
    { name: 'Boosting', icon: 'car-battery', price: 5 },
    { name: 'Fuel Delivery', icon: 'fuel', price: 10 },
    { name: 'Flat Tire', icon: 'car-tire-alert', price: 15 },
    { name: 'Lockout', icon: 'car-key', price: 20 },
    { name: 'Towing', icon: 'tow-truck', price: 25 },
    { name: 'Winching', icon: 'car', price: 30 },
  ];

  // Get user's location and address
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      let addr = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setAddress(`${addr[0].street}, ${addr[0].city}, ${addr[0].region}, ${addr[0].postalCode}`);
    })();
  }, []);

  // Toggle service selection
  const toggleServiceSelection = (service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service.name)) {
        setTotalPrice(totalPrice - service.price);
        return prevSelectedServices.filter((selected) => selected !== service.name);
      } else {
        setTotalPrice(totalPrice + service.price);
        return [...prevSelectedServices, service.name];
      }
    });
  };

  // Confirm order with a loading state
  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Confirmed',
        `You selected ${selectedServices.join(', ')}.\nTotal: $${totalPrice}\nPayment Method: ${paymentMethod}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Status', {
              driverName: 'John Doe',
              driverPhone: '123-456-7890',
            }),
          },
        ]
      );
    }, 3000); // Simulate 3 seconds of loading
  };

  return (
    <View style={styles.container}>
      {/* Total Price */}
      <Text style={styles.totalText}>Total: ${totalPrice}</Text>

      {/* Location */}
      <Text style={styles.locationText}>
        {location ? 'Location Acquired!' : errorMsg || 'Acquiring location...'}
      </Text>

      {/* Address Input */}
      <TextInput
        style={styles.addressInput}
        value={address}
        placeholder="Enter or adjust your address"
        onChangeText={(text) => setAddress(text)}
      />

      {/* Services */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={index} style={styles.service}>
            <IconButton
              icon={service.icon}
              size={40}
              iconColor={selectedServices.includes(service.name) ? 'blue' : 'gray'}
              onPress={() => toggleServiceSelection(service)}
            />
            <Text style={styles.serviceText}>{service.name}</Text>
            <Text style={styles.priceText}>${service.price}</Text>
          </View>
        ))}
      </View>

      {/* Payment Method */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Choose Payment Method:</Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioContainer}>
            <RadioButton
              value="cash"
              status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('cash')}
              color="#1565C0"
              uncheckedColor="gray"
            />
            <Text style={styles.radioLabel}>Cash</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="card"
              status={paymentMethod === 'card' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('card')}
              color="#1565C0"
              uncheckedColor="gray"
            />
            <Text style={styles.radioLabel}>Card</Text>
          </View>
        </View>
      </View>

      {/* Loading spinner */}
      {loading && <ActivityIndicator size="large" color="#1565C0" />}

      {/* Confirm Button */}
      <Button mode="contained" onPress={handleConfirm} style={styles.confirmButton}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'space-between',
  },
  totalText: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  locationText: {
    fontSize: 18,
    color: '#0D47A1',
    marginBottom: 10,
  },
  addressInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#0D47A1',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  service: {
    alignItems: 'center',
    margin: 10,
  },
  serviceText: {
    marginTop: 8,
    fontSize: 14,
    color: '#0D47A1',
  },
  priceText: {
    fontSize: 14,
    color: '#0D47A1',
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 18,
    color: '#0D47A1',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#0D47A1',
  },
  confirmButton: {
    backgroundColor: '#1565C0',
    padding: 10,
    borderRadius: 8,
  },
});

export default Home;
