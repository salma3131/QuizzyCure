import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const difficultyLevels = [
  {
    id: 1,
    name: 'Easy',
    icon: 'star-outline',
    color: '#4ECDC4',
  },
  {
    id: 2,
    name: 'Medium',
    icon: 'star-half',
    color: '#FFD93D',
  },
  {
    id: 3,
    name: 'Hard',
    icon: 'star',
    color: '#FF6B6B',
  },
];

const DifficultyLevelScreen = ({ navigation, route }) => {
  const { category } = route.params;

  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Difficulty</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          
          {difficultyLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={styles.levelCard}
              onPress={() => navigation.navigate('Quiz', { category, level })}
            >
              <View style={[styles.iconContainer, { backgroundColor: level.color }]}>
                <MaterialCommunityIcons name={level.icon} size={32} color="#fff" />
              </View>
              <Text style={styles.levelName}>{level.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#4B0082" />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  levelCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  levelName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
  },
});

export default DifficultyLevelScreen;
