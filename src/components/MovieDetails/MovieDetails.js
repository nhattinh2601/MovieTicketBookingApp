import {View, Text} from 'react-native';

const MovieDetails = ({route, navigation}) => {
  const {movieId} = route.params;
  return (
    <View>
      <Text>MoviesDetails {movieId}</Text>
    </View>
  );
};      

export default MovieDetails;
                                                                                           