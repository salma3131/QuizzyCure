import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Animated,
  Platform,
  StatusBar 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  {
    id: 1,
    name: 'Nutrition',
    icon: 'fruit-cherries',
    color: '#FF6B6B',
    gradientColors: ['#FF6B6B', '#FF8E8E'],
    description: 'Learn about healthy eating habits'
  },
  {
    id: 2,
    name: 'Hygiene',
    icon: 'hand-heart',
    color: '#4ECDC4',
    gradientColors: ['#4ECDC4', '#6EE7E0'],
    description: 'Discover personal care tips'
  },
  {
    id: 3,
    name: 'Physical Health',
    icon: 'heart-pulse',
    color: '#45B7D1',
    gradientColors: ['#45B7D1', '#68D5EF'],
    description: 'Stay fit and active'
  },
  {
    id: 4,
    name: 'Mental Health',
    icon: 'meditation',
    color: '#96CEB4',
    gradientColors: ['#96CEB4', '#B4E0D0'],
    description: 'Boost your mental wellness'
  },
];

const CategoryCard = ({ category, onPress, index }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.categoryCardContainer, animatedStyle]}>
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={category.gradientColors}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name={category.icon} size={32} color="#fff" />
        </LinearGradient>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        <View style={styles.startButton}>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CategoriesScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Categories</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onPress={() => navigation.navigate('DifficultyLevel', { category })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCardContainer: {
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  startButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#7C3AED',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
