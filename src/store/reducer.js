import { postsRef } from '../utils/firebase';

export const ADD_POST = 'ADD_POST';
export const FETCH_POST = 'FETCH_POST';

const initialState = { posts: [] };

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { posts: action.payload };
    default:
      return state;
  }
}

export const addPost = post => dispatch => {
    const newMsgRef = postsRef.push();

    post.id = newMsgRef.key;
    newMsgRef.set(post);

    dispatch(createAction(ADD_POST));
};

export const fetchPosts = () => async dispatch => {
    postsRef.on("value", snapshot => {

        let items = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item['key'] = childSnapshot.key;
            items.push(item);
        });

        dispatch(createAction(FETCH_POST, items));
    });
};

////
const createAction = (type, payload) => ({ type, payload });