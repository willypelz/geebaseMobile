import firebase from 'firebase';
import uuid from 'uuid';
//
// const config = {
//     apiKey: "AIzaSyBnhXmusIz41bPeZJZKdWob1Lt5djjFnlU",
//     authDomain: "geebase-android-db.firebaseapp.com",
//     databaseURL: "https://geebase-android-db.firebaseio.com",
//     projectId: "geebase-android-db",
//     storageBucket: "geebase-android-db.appspot.com",
//     messagingSenderId: "428788245439"
// }

class FirebaseSvc {



    uploadImage = async uri => {
        console.log('got image to upload. uri:' + uri);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const ref = firebase
                .storage()
                .ref('avatar')
                .child(uuid.v4());
            const task = ref.put(blob);

            return new Promise((resolve, reject) => {
                task.on(
                    'state_changed',
                    () => {
                        /* noop but you can track the progress here */
                    },
                    reject /* this is where you would put an error callback! */,
                    () => resolve(task.snapshot.downloadURL)
                );
            });
        } catch (err) {
            console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
        }
    }

    updateAvatar = (url) => {
        //await this.setState({ avatar: url });
        var userf = firebase.auth().currentUser;
        if (userf != null) {
            userf.updateProfile({ avatar: url})
                .then(function() {
                    console.log("Updated avatar successfully. url:" + url);
                    alert("Avatar image is saved successfully.");
                }, function(error) {
                    console.warn("Error update avatar.");
                    alert("Error update avatar. Error:" + error.message);
                });
        } else {
            console.log("can't update avatar, user is not login.");
            alert("Unable to update avatar. You must login first.");
        }
    }

    onLogout = user => {
        firebase.auth().signOut().then(function() {
            console.log("Sign-out successful.");
        }).catch(function(error) {
            console.log("An error happened when signing out");
        });
    }
    getUserDetails() {

        AsyncStorage.getItem('dispayName').then((displayName) => {
            return  displayName;
        });

        // const currentUser = firebase.auth();
        //   firebase.database().ref(`/users/${currentUser.uid}/userDetails`);
        //
    }

    getUid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('Messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);

        const message = {
            id,
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    refOn = callback => {
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                // createdAt: this.timestamp,
                createdAt: new Date(),
                user
            };
            this.ref.push(message);
        }
    };

    refOff() {
        this.ref.off();
    }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;