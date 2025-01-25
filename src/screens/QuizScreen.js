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
  const questions = {
    Nutrition: [
      {
        id: 1,
        question: 'Which vitamin is essential for blood clotting?',
        options: [
          'Vitamin A',
          'Vitamin K',
          'Vitamin C',
          'Vitamin E'
        ],
        correctAnswer: 1,
        explanation: 'Vitamin K is essential for blood clotting. Important facts:\n\n• Helps wounds heal properly\n• Found in green leafy vegetables\n• Important for bone health\n• Works with calcium\n• Deficiency can cause bleeding\n• Also important for heart health'
      },
      {
        id: 2,
        question: 'Which mineral is most important for bone health?',
        options: [
          'Iron',
          'Zinc',
          'Calcium',
          'Sodium'
        ],
        correctAnswer: 2,
        explanation: 'Calcium is crucial for bone health because:\n\n• Main component of bones and teeth\n• Prevents osteoporosis\n• Needed for muscle function\n• Important for nerve signaling\n• Found in dairy products\n• Requires vitamin D for absorption'
      },
      {
        id: 3,
        question: 'How many servings of fruits and vegetables should you eat daily?',
        options: [
          '1-2 servings',
          '2-3 servings',
          '5-9 servings',
          '10+ servings'
        ],
        correctAnswer: 2,
        explanation: '5-9 servings of fruits and vegetables daily is recommended because:\n\n• Provides essential vitamins\n• High in fiber\n• Contains antioxidants\n• Supports immune system\n• Helps prevent diseases\n• Maintains healthy weight'
      },
      {
        id: 4,
        question: 'Which meal is the most important of the day?',
        options: [
          'Breakfast',
          'Lunch',
          'Dinner',
          'Snacks'
        ],
        correctAnswer: 0,
        explanation: 'Breakfast is the most important meal because:\n\n• Jumpstarts metabolism\n• Provides energy for the day\n• Improves concentration\n• Prevents overeating later\n• Stabilizes blood sugar\n• Helps maintain healthy weight'
      }
    ],
    Hygiene: [
      {
        id: 1,
        question: 'How often should you brush your teeth?',
        options: [
          'Once a day',
          'Twice a day',
          'After every meal',
          'Once a week'
        ],
        correctAnswer: 1,
        explanation: 'Brushing twice a day is recommended because:\n\n• Removes plaque buildup\n• Prevents cavities\n• Maintains fresh breath\n• Prevents gum disease\n• Morning removes night bacteria\n• Evening removes day\'s food particles'
      },
      {
        id: 2,
        question: 'What is the proper way to wash your face?',
        options: [
          'Hot water only',
          'With harsh soap',
          'Gentle cleanser and lukewarm water',
          'Just wipe with tissue'
        ],
        correctAnswer: 2,
        explanation: 'Using gentle cleanser and lukewarm water is best because:\n\n• Removes dirt without damaging skin\n• Maintains skin\'s natural oils\n• Prevents irritation\n• Right temperature doesn\'t strip skin\n• Cleanses pores effectively\n• Suitable for all skin types'
      },
      {
        id: 3,
        question: 'How often should you wash your bed sheets?',
        options: [
          'Once a year',
          'Once a month',
          'Once a week',
          'Every day'
        ],
        correctAnswer: 2,
        explanation: 'Washing bed sheets once a week is important because:\n\n• Removes dead skin cells\n• Eliminates dust mites\n• Prevents allergies\n• Maintains hygiene\n• Promotes better sleep\n• Reduces acne breakouts'
      },
      {
        id: 4,
        question: 'What is the correct order of skincare routine?',
        options: [
          'Moisturizer, Cleanser, Toner',
          'Cleanser, Toner, Moisturizer',
          'Toner, Moisturizer, Cleanser',
          'Any order is fine'
        ],
        correctAnswer: 1,
        explanation: 'The correct order is Cleanser, Toner, Moisturizer because:\n\n• Cleanser removes dirt first\n• Toner balances skin pH\n• Moisturizer locks in hydration\n• Maximizes product effectiveness\n• Follows skin absorption logic\n• Prevents product interference'
      }
    ],
    'Physical Health': [
      {
        id: 1,
        question: 'What type of exercise builds muscle most effectively?',
        options: [
          'Yoga',
          'Resistance training',
          'Walking',
          'Swimming'
        ],
        correctAnswer: 1,
        explanation: 'Resistance training is most effective for muscle building because:\n\n• Creates micro-tears in muscles\n• Stimulates muscle growth\n• Increases strength\n• Boosts metabolism\n• Improves bone density\n• Enhances functional fitness'
      },
      {
        id: 2,
        question: 'What is the best way to prevent back pain?',
        options: [
          'Bed rest',
          'Good posture and core strength',
          'Avoiding all exercise',
          'Taking pain medication'
        ],
        correctAnswer: 1,
        explanation: 'Good posture and core strength prevent back pain by:\n\n• Supporting spine alignment\n• Reducing muscle strain\n• Distributing weight evenly\n• Preventing muscle imbalances\n• Improving balance\n• Reducing injury risk'
      },
      {
        id: 3,
        question: 'How often should you take breaks when sitting for long periods?',
        options: [
          'Every 30-60 minutes',
          'Once a day',
          'Every 4 hours',
          'No breaks needed'
        ],
        correctAnswer: 0,
        explanation: 'Taking breaks every 30-60 minutes is important because:\n\n• Prevents muscle stiffness\n• Improves circulation\n• Reduces eye strain\n• Maintains productivity\n• Prevents blood clots\n• Reduces back pain'
      },
      {
        id: 4,
        question: 'Which activity is best for cardiovascular health?',
        options: [
          'Weight lifting',
          'Stretching',
          'Aerobic exercise',
          'Balance training'
        ],
        correctAnswer: 2,
        explanation: 'Aerobic exercise is best for cardiovascular health because:\n\n• Strengthens heart muscle\n• Improves blood circulation\n• Lowers blood pressure\n• Increases lung capacity\n• Burns calories effectively\n• Reduces heart disease risk'
      }
    ],
    'Mental Health': [
      {
        id: 1,
        question: 'What is mindfulness?',
        options: [
          'Thinking about the future',
          'Being present in the moment',
          'Sleeping all day',
          'Avoiding problems'
        ],
        correctAnswer: 1,
        explanation: 'Mindfulness means being present in the moment because:\n\n• Reduces anxiety about future\n• Increases self-awareness\n• Improves focus\n• Reduces stress\n• Enhances emotional control\n• Promotes mental clarity'
      },
      {
        id: 2,
        question: 'Which is a healthy way to deal with negative emotions?',
        options: [
          'Bottling them up',
          'Expressing them appropriately',
          'Ignoring them',
          'Taking them out on others'
        ],
        correctAnswer: 1,
        explanation: 'Expressing emotions appropriately is healthy because:\n\n• Prevents emotional buildup\n• Maintains mental balance\n• Improves relationships\n• Reduces stress\n• Promotes self-understanding\n• Leads to better solutions'
      },
      {
        id: 3,
        question: 'What is a sign of emotional intelligence?',
        options: [
          'Never showing emotions',
          'Understanding others\' feelings',
          'Always being happy',
          'Avoiding conflict'
        ],
        correctAnswer: 1,
        explanation: 'Understanding others\' feelings shows emotional intelligence because:\n\n• Builds empathy\n• Improves relationships\n• Enables better communication\n• Shows self-awareness\n• Helps resolve conflicts\n• Strengthens social bonds'
      },
      {
        id: 4,
        question: 'How can you improve mental resilience?',
        options: [
          'Avoiding challenges',
          'Building coping strategies',
          'Ignoring problems',
          'Depending on others'
        ],
        correctAnswer: 1,
        explanation: 'Building coping strategies improves mental resilience by:\n\n• Developing problem-solving skills\n• Creating emotional strength\n• Building self-confidence\n• Learning from challenges\n• Adapting to change\n• Maintaining mental health'
      }
    ]
  };

  return questions[category.name] || [];
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
