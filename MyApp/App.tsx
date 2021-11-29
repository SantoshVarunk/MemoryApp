/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  AppState,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const appState = useRef(AppState.currentState);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState([
    {key: 'A', isHidden: true, isMatched: false},
    {key: 'B', isHidden: true, isMatched: false},
    {key: 'C', isHidden: true, isMatched: false},
    {key: 'D', isHidden: true, isMatched: false},
    {key: 'E', isHidden: true, isMatched: false},
    {key: 'F', isHidden: true, isMatched: false},
    {key: 'G', isHidden: true, isMatched: false},
    {key: 'H', isHidden: true, isMatched: false},
    {key: 'A', isHidden: true, isMatched: false},
    {key: 'B', isHidden: true, isMatched: false},
    {key: 'C', isHidden: true, isMatched: false},
    {key: 'D', isHidden: true, isMatched: false},
    {key: 'E', isHidden: true, isMatched: false},
    {key: 'F', isHidden: true, isMatched: false},
    {key: 'G', isHidden: true, isMatched: false},
    {key: 'H', isHidden: true, isMatched: false},
  ]);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [disableSelection, setDisableSelection] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match('active')) {
        refreshCards();
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    shuffleArray(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshCards() {
    const refreshData = data.map(card => {
      card.isHidden = true;
      card.isMatched = false;
      return card;
    });
    setData(refreshData);
    setCount(0);
    setScore(0);
    shuffleArray(data);
  }

  function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setData(array);
  }

  useEffect(() => {
    if (count === 2) {
      setDisableSelection(true);
      let selectedCards = data.map((card, index) => {
        if (card.isHidden === false) {
          return index;
        }
      });
      let filterselectedCards = selectedCards.filter(
        card => card !== undefined,
      );
      setTimeout(() => {
        if (filterselectedCards.length === 2) {
          if (
            data[filterselectedCards[0] as number].key ===
            data[filterselectedCards[1] as number].key
          ) {
            data[filterselectedCards[0] as number] = {
              key: data[filterselectedCards[0] as number].key,
              isHidden: true,
              isMatched: true,
            };
            data[filterselectedCards[1] as number] = {
              key: data[filterselectedCards[1] as number].key,
              isHidden: true,
              isMatched: true,
            };
            setData(data);
          } else {
            data[filterselectedCards[0] as number] = {
              key: data[filterselectedCards[0] as number].key,
              isHidden: true,
              isMatched: false,
            };
            data[filterselectedCards[1] as number] = {
              key: data[filterselectedCards[1] as number].key,
              isHidden: true,
              isMatched: false,
            };
          }
        }
        setDisableSelection(false);
        setScore(score + 1);
        setCount(0);
        checkGameStatus();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const checkGameStatus = () => {
    const getNotMatchedCards = data.filter(item => item.isMatched === false);
    if (getNotMatchedCards.length === 0) {
      refreshCards();
    }
  };

  const CardView = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={disableSelection}
        style={!item.isMatched ? styles.card : styles.hiddenCard}
        onPress={() => {
          data[index] = {
            key: item.key,
            isHidden: !item.isHidden,
            isMatched: item.isMatched,
          };
          setData(data);
          setCount(count + 1);
        }}>
        <View>
          {!item.isHidden && <Text style={styles.cardData}>{item.key}</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          margin: 10,
        }}>
        <Text style={styles.cardData}>Score:</Text>
      </View>
      <View style={styles.scoreCard}>
        <Text style={styles.cardData}>{score}</Text>
      </View>
      {data && (
        <FlatList
          data={data}
          extraData={data}
          numColumns={4}
          renderItem={CardView}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    backgroundColor: 'green',
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  scoreCard: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'green',
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  cardData: {
    textAlign: 'center',
    color: 'red',
    fontSize: 50,
  },
  hiddenCard: {
    margin: 10,
    width: 75,
    height: 75,
  },
});

export default App;
