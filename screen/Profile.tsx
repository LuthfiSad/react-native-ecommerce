import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {orders} from '../src/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useUser} from '../src/hooks/useUser';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';
import {OrderTypes} from '../src/components/profile/types/OrderTypes';

const ProfileScreen = () => {
  const {logout, isLoggedIn} = useUser();

  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logout()},
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.headerIconButton}>
            <MaterialIcons name="arrow-back" size={28} color="#4C76A3" />
          </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Profil Saya</Text>
      </View>
      <ProfileHeader />
      <View style={styles.menuContainer}>
        {isLoggedIn && (
          <>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ChangeProfile')}>
              <MaterialIcons name="edit" size={24} color="#4C76A3" />
              <Text style={styles.menuItemText}>Ubah Profil</Text>
            </TouchableOpacity>
            <View style={styles.menuItem}>
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Proses Pesanan</Text>
                </View>
                <View style={styles.menuPesanan}>
                  <MenuButton
                    icon="shopping-cart"
                    label="Kemas"
                    notificationCount={1}
                    onPress={() =>
                      navigation.navigate('Shipping', {
                        status: 'packet',
                      })
                    }
                  />
                  <MenuButton
                    icon="truck"
                    label="Kirim"
                    notificationCount={5}
                    onPress={() =>
                      navigation.navigate('Shipping', {
                        status: 'delivery',
                      })
                    }
                  />
                  {/* <MenuButton
                    icon="shopping-cart"
                    label="Kemas"
                    notificationCount={1}
                    onPress={() => navigation.navigate('Packet')}
                  />
                  <MenuButton
                    icon="truck"
                    label="Kirim"
                    notificationCount={5}
                    onPress={() => navigation.navigate('Delivery')}
                  /> */}
                  <MenuButton
                    icon="star"
                    label="Beri Penilaian"
                    notificationCount={4}
                    onPress={() => navigation.navigate('Rate')}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Address')}>
              <MaterialIcons name="location-on" size={24} color="#32CD32" />
              <Text style={styles.menuItemText}>Alamat</Text>
            </TouchableOpacity>
            <View style={styles.menuItem}>
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Riwayat Pesanan</Text>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderHistory')}>
                    <Text style={styles.viewAllButton}>Lihat Semua</Text>
                  </TouchableWithoutFeedback>
                </View>
                <ScrollView horizontal style={styles.orderList}>
                  {orders.map((order, index) => {
                    if (index < 5)
                      return <OrderCard key={index} order={order} />;
                  })}
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Voucher')}>
              <MaterialIcons name="local-offer" size={24} color="#FF6347" />
              <Text style={styles.menuItemText}>Voucher</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('HelpCenter')}>
          <MaterialIcons name="help-outline" size={24} color="#1E90FF" />
          <Text style={styles.menuItemText}>Pusat Bantuan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Information')}>
          <MaterialIcons name="info-outline" size={24} color="#FFD700" />
          <Text style={styles.menuItemText}>Informasi</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('AccountSwitch')}>
              <MaterialIcons name="swap-horiz" size={24} color="#FF4500" />
              <Text style={styles.menuItemText}>Ganti Akun</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="#FF0000" />
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  // headerIconButton: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  // },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Accent color for the header title
    // flex: 1,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionContainer: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuPesanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orderList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  viewAllButton: {
    color: '#4C76A3',
    fontSize: 16,
    // marginTop: 10,
  },
});

export default ProfileScreen;

interface OrderCardProps {
  order: OrderTypes;
}

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  const {
    imgUrl,
    quantity,
    discountPrice,
    originalPrice,
    nameOrder,
    shippingCost,
    voucherDiscount,
  } = order;
  const navigation = useNavigation<any>();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('OrderDetail', {
          order: order,
        })
      }>
      <View style={styles2.card}>
        <Image source={{uri: imgUrl}} style={styles2.image} />
        <Text style={styles2.title}>{nameOrder}</Text>
        <View style={styles2.infoContainer}>
          <Text style={styles2.quantity}>{`${quantity}x Produk`}</Text>
          <Text style={styles2.totalPrice}>
            Rp{' '}
            {(discountPrice ?? originalPrice) * quantity +
              (shippingCost ?? 0) -
              (voucherDiscount ?? 0)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles2 = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 150,
    marginRight: 10,
    // alignItems: '',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    // borderRadius: 8,
    marginBottom: 5,
  },
  title: {
    paddingHorizontal: 10,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    padding: 10,
  },
  quantity: {
    fontSize: 12,
    color: '#888',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C76A3',
    marginRight: 10,
  },
});

interface MenuButtonProps {
  icon: string;
  label: string;
  notificationCount?: number;
  onPress?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  label,
  notificationCount,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles3.menuButtonContainer} onPress={onPress}>
      <View style={styles3.iconContainer}>
        <FontAwesome name={icon} size={30} color="#4C76A3" />
        {notificationCount ? (
          <View style={styles3.badge}>
            <Text style={styles3.badgeText}>{notificationCount}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles3.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles3 = StyleSheet.create({
  menuButtonContainer: {
    alignItems: 'center',
    // marginHorizontal: 10,
    // borderColor: '#ddd',
    // borderWidth: 1,
    paddingVertical: 10,
    width: 100,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
});

const ProfileHeader = () => {
  const {name, bankBalance, favoriteCount, isLoggedIn} = useUser();

  const navigation = useNavigation<any>();

  return (
    <View style={styles4.headerProfileContainer}>
      {isLoggedIn && (
        <Image
          source={{uri: 'https://picsum.photos/200/300'}} // Replace with actual profile image
          style={styles4.profileImage}
        />
      )}
      <View style={styles4.profileInfo}>
        {isLoggedIn ? (
          <>
            <Text style={styles4.name}>{name}</Text>
            <Text
              style={
                styles4.bankBalance
              }>{`Rp${bankBalance.toLocaleString()}`}</Text>
            <Text
              style={styles4.favoriteCount}>{`Favorite ${favoriteCount}`}</Text>
          </>
        ) : (
          <View style={styles4.loginButtonContainer}>
            <Text style={styles4.loginText}>
              Silahkan Login terlebih dahulu
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles4.loginButton}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles4 = StyleSheet.create({
  headerProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#4C76A3',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
  },
  profileInfo: {
    width: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bankBalance: {
    fontSize: 16,
    color: '#ddd',
  },
  favoriteCount: {
    fontSize: 14,
    color: '#ddd',
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // backgroundColor: '#fff',
  },
  loginButton: {
    fontSize: 18,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
    // marginHorizontal: '100%',
    // marginTop: 20,
  },
});
