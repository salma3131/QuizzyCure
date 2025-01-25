import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ScoreScreen = ({ navigation, route }) => {
  const { score, totalQuestions, category, level } = route.params;
  const percentage = (score / totalQuestions) * 100;

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Good Job!';
    if (percentage >= 40) return 'Nice Try!';
    return 'Keep Practicing!';
  };

  const getStars = () => {
    if (percentage >= 80) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <MaterialCommunityIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Nice Work</Text>
          
          <View style={styles.scoreCard}>
            <View style={styles.checkContainer}>
              <MaterialCommunityIcons name="check-circle" size={50} color="#4ECDC4" />
            </View>
            
            <View style={styles.starsContainer}>
              {[...Array(3)].map((_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name="star"
                  size={30}
                  color={index < getStars() ? '#FFD700' : '#D1D5DB'}
                  style={styles.star}
                />
              ))}
            </View>

            <Text style={styles.scoreText}>You Earned {score} pts</Text>
            <Text style={styles.message}>{getScoreMessage()}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={() => navigation.navigate('Categories')}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Next Stage</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={() => navigation.navigate('Quiz', { category, level })}
          >
            <Text style={[styles.buttonText, { color: '#7C3AED' }]}>Play Again</Text>
          </TouchableOpacity>
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
    padding: 16,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkContainer: {
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#FFA07A',
  },
  retryButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScoreScreen;
