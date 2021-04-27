import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/storage';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDMx-2k2MyVr2jxlTWcYZ_CD9RAunJcriY",
    authDomain: "test-project-b2d6c.firebaseapp.com",
    projectId: "test-project-b2d6c",
    storageBucket: "test-project-b2d6c.appspot.com",
    messagingSenderId: "730896344610",
    appId: "1:730896344610:web:38940c6e2ab2e4524a8c7b"
  };


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);  
        this.firebase = app;

        this.db = app.firestore();
        this.storage = app.storage();
        this.auth = app.auth();
    }

    async signIn(){
        var provider = new this.firebase.auth.GoogleAuthProvider();

        const credential = await this.auth.signInWithRedirect(provider)

        // const cf = this.firebase.functions('newUser');
        // cf(credential)
        console.log('signed in')
    }

    async signOut(){
        await this.auth.signOut();
    }

    getFirstName(docId){
        const document = this.db.collection('users').doc(docId).get();
        console.log(document)
        return document
    }

    populateDocs(){
        const names = ["Kevin", "Evan", "Reza"]
        for (var i = 0; i < 50; i++){
            const newDoc = this.db.collection('users').doc();
            newDoc.set({'name': names[i%3], 'age': (Math.random()* 80)})
        }
    }

    async ageOver50(){
        const ageQuery = await this.db.collection('users').where('age', '>', 50).orderBy("age", "desc").limit(10).get()
        ageQuery.forEach((doc) => {
            console.log(doc.data().name)
        })
    }
}

export default Firebase;