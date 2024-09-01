import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

interface Status {
  date: string;
  description: string;
}

interface DeliveryStatusProps {
  status: Status[];
  estimateDate: string;
  delivered: boolean;
}

const DeliveryStatusScreen: React.FC = () => {
  const route = useRoute<RouteProp<{params: DeliveryStatusProps}>>();
  const {status, estimateDate, delivered} = route.params;

  return (
    <>
      <ButtonHeader title="Status Pengiriman" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Placeholder for Map View */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Map Placeholder</Text>
        </View>

        {/* Status List */}
        <View style={styles.statusContainer}>
          <View style={styles.deliveredContainer}>
            {delivered ? (
              <>
                <Text style={styles.deliveredText}>
                  Pesanan telah diterima pada {status[status.length - 1]?.date}
                </Text>
                <Text style={styles.courierText}>
                  Dikirim oleh kurir Imam Sajidi
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.estimateText}>
                  Estimasi tanggal diterima: {estimateDate}
                </Text>
                <Text style={styles.courierText}>
                  Dikirim oleh kurir Imam Sajidi
                </Text>
              </>
            )}
          </View>

          {status.map((s, index) => (
            <View key={index} style={styles.statusItem}>
              <View style={styles.dotContainer}>
                <View
                  style={[
                    styles.dot,
                    index === status.length - 1 && delivered ? styles.deliveredDot : styles.activeDot,
                  ]}
                />
                {index !== status.length - 1 && (
                  <View style={styles.dottedLine} />
                )}
              </View>
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusDate}>{s.date}</Text>
                <Text style={styles.statusDescription}>{s.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Confirm Delivery Button */}
        {!delivered && (
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Konfirmasi Penerimaan</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapPlaceholderText: {
    color: '#888',
    fontSize: 16,
  },
  statusContainer: {
    marginBottom: 20,
  },
  deliveredContainer: {
    marginBottom: 20,
  },
  deliveredText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  estimateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
  },
  courierText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    // marginBottom: 10,
  },
  dotContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginVertical: 5,
  },
  deliveredDot: {
    backgroundColor: '#2ecc71',
  },
  activeDot: {
    backgroundColor: '#4C76A3',
  },
  dottedLine: {
    width: 2,
    height: 40,
    borderLeftWidth: 2,
    borderLeftColor: '#888',
    borderStyle: 'dotted',
    marginBottom: 5,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4C76A3',
  },
  statusDescription: {
    fontSize: 14,
    color: '#555',
  },
  confirmButton: {
    backgroundColor: '#4C76A3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeliveryStatusScreen;
