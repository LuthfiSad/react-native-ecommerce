import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';

const AccountSwitchScreen = () => {
  const [activeAccount, setActiveAccount] = useState('1');
  const accounts = [
    {
      id: '1',
      name: 'Akun Utama',
      image: 'https://dummyimage.com/50x50/4C76A3/fff.png&text=A1',
    },
    {
      id: '2',
      name: 'Akun Kedua',
      image: 'https://dummyimage.com/50x50/4C76A3/fff.png&text=A2',
    },
    // Tambahkan lebih banyak akun di sini
  ];

  const confirmSwitchAccount = (id: string) => {
    if (id === activeAccount) {
      return; // Jika akun yang dipilih adalah akun yang aktif, keluar dari fungsi
    }

    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin mengganti akun?', [
      {text: 'Batal', style: 'cancel'},
      {text: 'Ganti', onPress: () => setActiveAccount(id)},
    ]);
  };

  const confirmDeleteAccount = (id: string) => {
    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin menghapus akun ini?', [
      {text: 'Batal', style: 'cancel'},
      {text: 'Hapus', onPress: () => console.log(`Akun ${id} dihapus`)},
    ]);
  };

  return (
    <>
      <ButtonHeader title="Pilih Akun" />
      <View style={styles.container}>
        {accounts.map(account => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.accountItem,
              activeAccount === account.id && styles.activeAccountItem,
            ]}
            onPress={() => confirmSwitchAccount(account.id)}>
            <Image source={{uri: account.image}} style={styles.accountImage} />
            <Text style={styles.accountName}>{account.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDeleteAccount(account.id)}>
              <Text style={styles.deleteButtonText}>Hapus</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Tambah Akun</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  activeAccountItem: {borderColor: '#4C76A3', borderWidth: 2},
  accountImage: {width: 50, height: 50, borderRadius: 8, marginRight: 16},
  accountName: {flex: 1, fontSize: 16, fontWeight: 'bold'},
  deleteButton: {backgroundColor: '#ff4c4c', padding: 8, borderRadius: 8},
  deleteButtonText: {color: '#fff', fontWeight: 'bold'},
  addButton: {
    backgroundColor: '#4C76A3',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});

export default AccountSwitchScreen;
