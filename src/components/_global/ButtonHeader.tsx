import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

interface ButtonHeaderProps {
  title?: string;
  actionButtons?: boolean;
}

const ButtonHeader: React.FC<ButtonHeaderProps> = ({actionButtons, title}) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconButton}>
        <MaterialIcons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.headerActions}>
        {actionButtons && (
          <>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.iconButton}>
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={28}
                color={isFavorite ? '#F44336' : '#000'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="share" size={28} color="#000" />
            </TouchableOpacity>
          </>
        )}
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
    minWidth: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Accent color for the header title
    // flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default ButtonHeader;
