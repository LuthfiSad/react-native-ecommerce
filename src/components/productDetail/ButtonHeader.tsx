import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ButtonHeader: React.FC = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
        <MaterialIcons name="arrow-back" size={28} color="#4C76A3" />
      </TouchableOpacity>
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.iconButton}>
          <MaterialIcons 
            name={isFavorite ? "favorite" : "favorite-border"} 
            size={28} 
            color={isFavorite ? "#F44336" : "#4C76A3"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="share" size={28} color="#4C76A3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default ButtonHeader;
