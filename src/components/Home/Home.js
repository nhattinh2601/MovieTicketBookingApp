import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {APP_BASE_URL, APP_API_KEY, APP_POSTER_URL} from '@env';

const data = [
  {
    id: '1',
    name: 'Thập diện mai phục',
    images: 'https://i.imgur.com/n99keF9.jpg',
    year: '2004',
  },
  {
    id: '2',
    name: 'Avatar 2',
    images:
      'https://upload.wikimedia.org/wikipedia/vi/e/e0/Avatar_D%C3%B2ng_ch%E1%BA%A3y_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_-_Poster_ch%C3%ADnh_th%E1%BB%A9c.jpg',
    year: '2022',
  },
  {
    id: '3',
    name: 'Cuộc đời của Pi',
    images:
      'https://m.media-amazon.com/images/M/MV5BNTg2OTY2ODg5OF5BMl5BanBnXkFtZTcwODM5MTYxOA@@._V1_.jpg',
    year: '2012',
  },
  {
    id: '4',
    name: 'Indiana Jones và chiếc rương thánh tích',
    images:
      'https://toplist.vn/images/800px/indiana-jones-va-chiec-ruong-thanh-tich-1031552.jpg',
    year: '1981',
  },
];

const Home = ({navigation}) => {
  const WIDTH = Dimensions.get('screen').width;
  const ITEM_WIDTH = WIDTH * 0.72;
  const MOVIE_SPACER_WIDTH = (WIDTH - ITEM_WIDTH) / 2;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [moviesData, setMoviesData] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  /*
  useEffect(() => {
    getMoviesDataFromDB(page);
  }, [page]);
  */
  useEffect(() => {
    setMoviesData(data);
  });
  const getMoviesDataFromDB = async page => {
    setIsLoading(true);
    await axios
      .get(`${APP_BASE_URL}/movie/popular?api_key=${APP_API_KEY}&page=${page}`)
      .then(res => setMoviesData([...moviesData, ...res.data.results]))
      .catch(err => console.log(err));
    setIsLoading(false);
  };

  const handelOnEnd = () => {
    setIsLoading(true);
    setPage(page + 1);
  };

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1A1A23',
        padding: 0,
        position: 'relative',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A23" />
      <View
        style={{
          width: '100%',
          padding: 20,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 30,
                fontWeight: 'bold',
                marginRight: 10,
              }}>
              Hello
            </Text>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: '300'}}>
              Nhat Tinh
            </Text>
          </View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 16,
              fontWeight: '300',
              opacity: 0.4,
            }}>
            Watch your favorite movies
          </Text>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: '#ffffff30',
          }}>
          <Image
            source={require('../../images/Profile.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 100}}
          />
        </View>
      </View>

      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: '90%',
            paddingHorizontal: 20,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#262532',
            borderRadius: 10,
          }}>
          <TextInput placeholder="Search" placeholderTextColor="#70717A" />
          <Ionic
            name="mic-outline"
            style={{fontSize: 18, color: '#ffffff', opacity: 0.4}}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          marginBottom: 20,
          marginTop: 10,
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            marginRight: 8,
            fontWeight: 'bold',
          }}>
          Latest
        </Text>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '300',
          }}>
          Movies
        </Text>
      </View>

      {isLoading && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: '60%',
            height: 20,
            zIndex: 1,
          }}>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      )}

      <FlatList
        data={moviesData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{
          justifyContent: 'center',
          position: 'relative',
          paddingBottom: 70,
          zIndex: 1,
        }}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        decelerationRate={0.6}
        scrollEventThrottle={64}
        onEndReached={handelOnEnd}
        ListHeaderComponent={() => {
          return <View style={{width: MOVIE_SPACER_WIDTH, height: 300}}></View>;
        }}
        ListFooterComponent={() => {
          return <View style={{width: MOVIE_SPACER_WIDTH, height: 300}}></View>;
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [50, 0, 50],
          });

          const rotateY = scrollX.interpolate({
            inputRange,
            outputRange: ['4deg', '0deg', '-4deg'],
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const elevationX = scrollX.interpolate({
            inputRange,
            outputRange: [0, 8, 0],
          });

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                position: 'relative',
                paddingHorizontal: 24,
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('MovieDetails', {movieId: item.id})
                }
                style={{
                  backgroundColor: 'transparent',
                }}>
                <Animated.View
                  style={{
                    marginHorizontal: 0,
                    height: 300,
                    elevation: elevationX,
                    borderRadius: 34,
                    shadowColor: '#ffffff80',
                    backgroundColor: 'transparent',
                  }}>
                  <Image
                    source={{uri: item.images}}
                    style={{width: '100%', height: '100%', borderRadius: 34}}
                  />
                </Animated.View>
                <Animated.Text
                  style={{
                    color: '#ffffff',
                    marginTop: 20,
                    fontSize: 20,
                    letterSpacing: 2,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    opacity: opacity,
                  }}>
                  {item.name}
                </Animated.Text>
                <Animated.Text
                  style={{
                    color: '#ffffff',
                    marginTop: 10,
                    fontSize: 14,
                    letterSpacing: 2,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    opacity: 0.2,
                  }}>
                  {item.year}
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
