import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';
// import data from '../fakedata.json';
import MovieList from '../components/MovieList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      movies: [],
      displayingMovies: [],
      isLoading: false,
      refreshing: false,
      searchText: ''
    }
  }

  handleInput = (text) => { 
    console.log(text);
    this.setState({ 
      searchText: text, 
      displayingMovies: this.state.movies.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase()))  
    })
  }

  onRefresh() {
    this.setState({
      refreshing: true
    }, function() {this.testRefresh()});
    // this.testRefresh();
    this.setState({
      refreshing: false
    })
  }

  sleep = (milisecond) => new Promise(resolve => setTimeout(resolve, milisecond));


  async getApiData() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
      .then(response => {
       if(response.ok) { 
         return response;
       }
       else {
         var error = new Error(`Error ${response.status} is ${response.statusText}`);
         error.response = response;
         throw error;
       }
      })
      .then(response => response.json())
      .then(this.setState({ 
        isLoading: true
      }))
      .then( await this.sleep(3000))
      .then(data => this.setState({
        movies: data.results,
        displayingMovies: data.results,
        isLoading: false,
      }))
      .catch(error => { 
        console.log(`Load Data got Error ${error.message}`);
        alert(`Data cannot load, please try again. The error is ${error.message}`);
      })

  }

  testRefresh() {
    console.log('I was fired');
    return (
      <View><Text>Phan Anh Tuan</Text></View>
    );
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })

    this.getApiData();
    // fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
    //   .then(response => response.json())
    //   .then(data => this.setState({ 
    //     movies: data.results,
    //     displayingMovies: data.results,
    //     isLoading: false,
    //   }))
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
          placeholder= "Search Movie ..."        
          onChangeText={text => this.handleInput(text)}
          value={this.state.searchText}
        />
        {this.state.isLoading ? 
        <Text>I'm Loading ... </Text> :
        <MovieList movies={this.state.displayingMovies}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing} />}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
