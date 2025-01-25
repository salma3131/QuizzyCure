import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Sample questions - you can replace these with your actual questions
const getQuestions = (category, level) => {
  const questions = {
    Nutrition: {
      Easy: [
        {
          question: "What is a good source of vitamin C?",
          options: ["Orange", "Bread", "Butter", "Salt"],
          correct: 0
        },
        {
          question: "Which food group provides protein?",
          options: ["Fruits", "Vegetables", "Meat", "Sugar"],
          correct: 2
        },
        {
          question: "How many meals should you eat per day?",
          options: ["1", "2", "3", "4-5"],
          correct: 2
        },
        {
          question: "Which drink is most healthy?",
          options: ["Soda", "Coffee", "Water", "Energy Drink"],
          correct: 2
        }
      ],
      Medium: [
        // Add medium level questions
      ],
      Hard: [
        // Add hard level questions
      ]
    },
    // Add questions for other categories
  };

  return questions[category.name]?.[level.name] || [];
};

const QuizScreen = ({ navigation, route }) => {
  const { category, level } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions] = useState(getQuestions(category, level));

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 20);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate('Score', {
        score,
        totalQuestions: questions.length,
        category,
        level,
      });
    }
  };

  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <MaterialCommunityIcons 
              name={category.icon} 
              size={40} 
              color="#4B0082" 
              style={styles.categoryIcon} 
            />
            <Text style={styles.questionText}>
              {questions[currentQuestion]?.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {questions[currentQuestion]?.options.map((option, index) => (
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
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFA07A',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  categoryIcon: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#4B0082',
    textAlign: 'center',
  },
});

export default QuizScreen;
