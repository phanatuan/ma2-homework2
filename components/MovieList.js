import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';


// import { Container, Card, CardItem, Body } from 'native-base';


export default class MovieList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                data={this.props.movies}
                keyExtractor={(movie) => movie.id}
                onRefresh = {() => this.props.onRefresh}
                refreshing = {this.props.refreshing}
                renderItem={({ item }) => {
                    let baseURL = 'https://image.tmdb.org/t/p/w342';
                    return (
                        <View>
                            <Image style = {{ width: 300, height: 200}} 
                                    source = {{uri: baseURL + item.poster_path}}
                                    indicator={ProgressBar} 
                                    />
                            <Text>{item.title}</Text>
                            <Text>{item.overview}</Text>
                        </View>
                    );
                }}
            />
        );
    }
} 