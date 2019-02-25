import { firebaseDatabase } from '../utils/firebase'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        const query = firebaseDatabase.ref(nodePath).limitToLast(size);

        query.on('value', dataSnapshot => {
            const items = [];
            dataSnapshot.forEach(childSnapshot => {
                const item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });

            callback(items);
        });

        return query;
    };

     static addPost = async post => {
        try {
            const resp = await firebaseDatabase.ref('posts/').push(post);
            console.log('data ' , resp);
        } catch (error) {
            console.log('error ' , error)
        }
    }
}

