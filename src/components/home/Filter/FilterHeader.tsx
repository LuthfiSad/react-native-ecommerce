import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation for navigation

const FilterHeader: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [notificationCount, setNotificationCount] = useState(10);
  const navigation = useNavigation<any>(); // Initialize navigation
  const [searchIsFocused, setSearchIsFocused] = useState(false);

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
      <View
        style={[
          styles.searchContainer,
          (searchIsFocused || !!searchText) && {
            borderColor: '#000',
            borderWidth: 1,
          },
        ]}>
        <FontAwesome
          name="search"
          size={20}
          color={searchIsFocused || searchText ? '#000' : '#999'}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          onFocus={() => setSearchIsFocused(true)}
          onBlur={() => setSearchIsFocused(false)}
          placeholder="Cari..."
          placeholderTextColor={'#999'}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Ikon Pusat Bantuan */}
      <TouchableOpacity
        style={styles.helpCenterContainer}
        onPress={() => navigation.navigate('HelpCenter')}>
        <MaterialIcons name="help-outline" size={24} color="#000" />
      </TouchableOpacity>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000', // Text color for the search input
  },
  helpCenterContainer: {
    marginLeft: 15,
    marginRight: 15, // Added margin for spacing
  },
  notificationContainer: {
    position: 'relative',
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
