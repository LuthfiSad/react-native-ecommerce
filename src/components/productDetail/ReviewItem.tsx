import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ReviewItemProps {
  userImage: string;
  userName: string;
  description?: string;
  rating: number;
  date: string;
  isLastItem: boolean; // Tambahkan properti untuk memeriksa apakah ini item terakhir
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  userImage,
  userName,
  description,
  rating,
  date,
  isLastItem = false, // Default adalah bukan item terakhir
}) => {
  return (
    <View style={[styles.reviewItem, !isLastItem && styles.reviewItemBorder]}>
      <View style={styles.headerContainer}>
        <View style={styles.userContainer}>
          <Image source={{uri: userImage}} style={styles.userImage} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name="star"
              size={14}
              color={i < rating ? '#FFD700' : '#ccc'}
            />
          ))}
        </View>
      </View>
      {description && <Text style={styles.reviewDescription}>{description}</Text>}
      <Text style={styles.reviewDate}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'column',
    padding: 10,
    // backgroundColor: '#fff',
  },
  reviewItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewDescription: {
    color: '#555',
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  reviewDate: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default ReviewItem;
