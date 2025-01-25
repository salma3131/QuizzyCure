import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#8B5CF6', '#7C3AED']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.questionMarksContainer}>
          <MaterialCommunityIcons name="help" size={40} color="#FFA07A" style={styles.questionMark} />
          <MaterialCommunityIcons name="help" size={50} color="#FFB6C1" style={[styles.questionMark, styles.mainQuestion]} />
          <MaterialCommunityIcons name="help" size={40} color="#E6E6FA" style={styles.questionMark} />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome to{'\n'}QUIZZY CURE!</Text>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Categories')}
        >
          <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMarksContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  questionMark: {
    margin: 10,
  },
  mainQuestion: {
    transform: [{scale: 1.2}],
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFA07A',
    width: 20,
  },
  startButton: {
    backgroundColor: '#FFA07A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default WelcomeScreen;
