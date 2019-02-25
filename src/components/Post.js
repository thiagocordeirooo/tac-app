import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'

class Post extends Component {

    handleAddComment = comment => {
        this.props.handleAddComment(this.props.id, comment);
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.image}} style={styles.image} />
                
                
                <Author email={this.props.email} nickname={this.props.nickname} />
                
                <Comments comments={this.props.comments} />

                <AddComment handleAddComment={this.handleAddComment} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
})

export default Post