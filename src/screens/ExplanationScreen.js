import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ExplanationScreen = ({ route, navigation }) => {
  const { isCorrect, explanation, nextQuestion } = route.params;

  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={[
              styles.resultContainer,
              isCorrect ? styles.correctContainer : styles.incorrectContainer
            ]}>
              <MaterialCommunityIcons
                name={isCorrect ? 'check-circle' : 'close-circle'}
                size={80}
                color={isCorrect ? '#4CAF50' : '#F44336'}
              />
              <Text style={styles.resultText}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </Text>
            </View>

            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{explanation}</Text>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={nextQuestion}
            >
              <Text style={styles.nextButtonText}>Next Question</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
  },
  correctContainer: {
    backgroundColor: '#E8F5E9',
  },
  incorrectContainer: {
    backgroundColor: '#FFEBEE',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  explanationContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default ExplanationScreen;
