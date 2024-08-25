import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchHeaderProps {
  onSearch: (text: string) => void;
  onNotificationPress: () => void;
  notificationCount?: number;
}

const FilterHeader: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [notificationCount, setNotificationCount] = useState(10);

  const handleNotificationPress = () => {
    console.log('Ikon notifikasi ditekan');
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    console.log('Mencari:', text);
  };

  return (
    <View style={styles.container}>
      {/* Bar Pencarian */}
      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Cari..."
          placeholderTextColor={'#000'}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Ikon Notifikasi */}
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={handleNotificationPress}>
        <Ionicons name="notifications-outline" size={24} color="#000" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Menyusun elemen secara horizontal
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // Sesuaikan warna latar belakang sesuai kebutuhan
  },
  searchContainer: {
    flex: 1, // Mengambil ruang yang tersedia
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Warna latar belakang bar pencarian
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 5, // Memberi jarak antara ikon dan input
  },
  input: {
    flex: 1, // Mengambil ruang yang tersedia dalam bar pencarian
    height: 40,
  },
  notificationContainer: {
    marginLeft: 15, // Memberi jarak antara bar pencarian dan ikon notifikasi
    position: 'relative', // Untuk penempatan badge secara absolut
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#4C76A3',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default FilterHeader;
