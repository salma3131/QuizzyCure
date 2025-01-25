import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const getQuestions = (category, difficulty) => {
  // Sample questions - you can expand this
  return [
    {
      id: 1,
      question: 'What is the recommended daily water intake?',
      options: [
        '2-3 liters',
        '1 liter',
        '5 liters',
        '0.5 liters'
      ],
      correctAnswer: 0,
      explanation: 'The recommended daily water intake is 2-3 liters (8-10 glasses). This helps maintain proper hydration, supports bodily functions, and promotes overall health. Regular water intake throughout the day is essential for:\n\n• Regulating body temperature\n• Maintaining blood pressure\n• Supporting digestion\n• Protecting organs and tissues\n• Carrying nutrients to cells'
    },
    {
      id: 2,
      question: 'Which of these is a good source of protein?',
      options: [
        'White bread',
        'Lentils',
        'Sugar',
        'Butter'
      ],
      correctAnswer: 1,
      explanation: 'Lentils are an excellent source of plant-based protein. Here\'s why they\'re important:\n\n• Contains 18g of protein per cup\n• Rich in dietary fiber\n• High in iron and B vitamins\n• Low in fat\n• Affordable and sustainable protein source\n• Helps in muscle building and repair'
    },
    // Add more questions here
  ];
};

const QuizScreen = ({ route, navigation }) => {
  const { category, difficulty } = route.params;
  const questions = getQuestions(category, difficulty);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (currentQuestionIndex + 1) / questions.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    navigation.navigate('Explanation', {
      isCorrect,
      explanation: questions[currentQuestionIndex].explanation,
      nextQuestion: () => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          navigation.goBack();
        } else {
          navigation.navigate('Score', {
            score,
            total: questions.length,
            category: category.name,
            difficulty
          });
        }
      }
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category.name} Quiz</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              { width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })}
            ]}
          />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  questionContainer: {
    padding: 16,
  },
  questionNumber: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default QuizScreen;
