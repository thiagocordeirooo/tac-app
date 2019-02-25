import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';

import { fetchPosts } from '../store/reducer';

class Feed extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.fetchPosts();
      }

    handleAddCommentPost = (postId, comment) => {

        const posts = this.state.posts.map(post => {
            if (post.id === postId) {
                post.comments.push({ nickname: 'user', comment });
            }
            return post;
        });

        this.setState({ posts });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={this.props.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <Post key={item.id} {...item} handleAddComment={this.handleAddCommentPost} /> } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

const mapStateToProps = ({ posts }) => ({
    posts
});

const mapDispatchToProps = {
    fetchPosts,
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Feed);