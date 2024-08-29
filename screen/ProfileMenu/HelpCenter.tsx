import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import ButtonHeader from '../../src/components/_global/ButtonHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Make sure you have this installed or replace it with your preferred icon library

const HelpCenterScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Recomended');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const categories = [
    'Recomended',
    'Belanja',
    'Penawaran',
    'Hadiah',
    'Pembayaran',
    'Pengiriman',
  ];

  const faqs = [
    {
      id: '1',
      question: 'Bagaimana cara belanja?',
      answer: 'Untuk belanja, Anda bisa ...',
    },
    {id: '2', question: 'Apa itu cashback?', answer: 'Cashback adalah ...'},
    // Tambahkan lebih banyak FAQ di sini
  ];

  const quickLinks = [
    {id: '1', icon: 'local-shipping', label: 'Lacak Pesanan'},
    {id: '2', icon: 'phone', label: 'Hubungi Dukungan'},
    // {id: '3', icon: 'credit-card', label: 'Pembayaran'},
    // {id: '4', icon: 'gift', label: 'Hadiah'},
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      <ButtonHeader title="Pusat Bantuan" />
      <ScrollView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onFocus={e =>
              e.target.setNativeProps({style: {borderColor: '#000'}})
            }
            onBlur={e => {
              if (!searchText) {
                e.target.setNativeProps({style: {borderColor: '#888'}});
              }
            }}
            onChangeText={setSearchText}
            value={searchText}
            placeholderTextColor={'#888'}
            placeholder="Cari bantuan..."
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => setActiveCategory(category)}>
              <Text
                style={[
                  styles.categoryButtonText,
                  activeCategory === category &&
                    styles.activeCategoryButtonText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Links */}
        <View style={styles.quickLinksContainer}>
          {quickLinks.map(link => (
            <TouchableOpacity key={link.id} style={styles.linkButton}>
              <MaterialIcons name={link.icon} size={30} color="#4C76A3" />
              <Text style={styles.linkButtonText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ */}
        <View style={styles.faqContainer}>
          {faqs.map(faq => (
            <TouchableWithoutFeedback
              key={faq.id}
              onPress={() => toggleFAQ(faq.id)}>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {expandedFAQ === faq.id && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        {/* Contact Buttons */}
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Chat Kami Sekarang</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Telpon Kami Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  searchContainer: {flexDirection: 'row', marginBottom: 16},
  searchInput: {
    flex: 1,
    borderColor: '#888',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchButton: {
    justifyContent: 'center',
    backgroundColor: '#4C76A3',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {color: '#fff', fontWeight: 'bold'},
  categoryContainer: {marginBottom: 16},
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: 8,
    borderColor: '#555',
    borderWidth: 2,
  },
  activeCategoryButton: {
    borderColor: '#4C76A3',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  categoryButtonText: {color: '#555'},
  activeCategoryButtonText: {color: '#4C76A3'},

  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // marginBottom: 16,
  },
  linkButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  linkButtonText: {
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  faqContainer: {marginBottom: 16},
  faqItem: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  faqQuestion: {fontWeight: 'bold', color: '#333'},
  faqAnswer: {marginTop: 8, color: '#555'},

  contactContainer: {marginTop: 0},
  contactButton: {
    backgroundColor: '#4C76A3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactButtonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});

export default HelpCenterScreen;
