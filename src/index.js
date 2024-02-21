import { initializeApp } from "firebase/app";
import { getDocs, updateDoc, collection, getFirestore, onSnapshot, query, where, addDoc, deleteDoc, doc, orderBy, serverTimestamp } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()

const colRef = collection(db, "movies")
// const qRef = query(colRef, where("category", "==", "drama"), orderBy("createdAt"))
const qRef = query(colRef, orderBy("createdAt"))
const documentReference = doc(db, "movies", "FuScGSv2uEjCoVIJrUqb")

onSnapshot(documentReference, document => {
    console.log(document.data(), document.id)
})

getDocs(colRef)
    .then(data => {
        let movies = []
        data.docs.forEach(document => {
            movies.push({ ...document.data(), id: document.id })
        })
        console.log(movies)
    })
    .catch(error => {
        console.log(error)
    })

// onSnapshot(colRef, data => {
//     let movies = []
//     data.docs.forEach(document => {
//         movies.push({...document.data(), id: document.id})
//     })
//     console.log(movies)
// })

const addForm = document.querySelector(".add")
addForm.addEventListener("submit", event => {
    event.preventDefault()
    addDoc(colRef, {
        name: addForm.name.value,
        category: addForm.category.value,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })
        .then(() => {
            addForm.reset()
        })
})

const deleteForm = document.querySelector(".delete")
deleteForm.addEventListener("submit", event => {
    event.preventDefault()

    const documentReference = doc(db, "movies", deleteForm.id.value)
    deleteDoc(documentReference).then(() => {
        deleteForm.reset()
    })
})

const updateForm = document.querySelector(".update")
updateForm.addEventListener("submit", event => {
    event.preventDefault()

    const documentReference = doc(db, "movies", updateForm.id.value)
    updateDoc(documentReference, {
        name: updateForm.name.value,
        updatedAt: serverTimestamp()
    })
        .then(() => {
            updateForm.reset()
        })
})

const registerForm = document.querySelector(".register")
registerForm.addEventListener("submit", event => {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, registerForm.email.value, registerForm.password.value)
        .then(credentials => {
            //console.log(credentials)
            registerForm.reset()
        })
        .catch(e => {
            console.log(e)
        })
})

const logoutButton = document.querySelector(".logout")
logoutButton.addEventListener("click", event => {
    signOut(auth)
        .then(() => {
            console.log("User Logged Out")
        })
        .catch(e => {
            console.log(e)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener("submit", event => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, loginForm.email.value, loginForm.password.value)
        .then(credentials => {
            console.log(credentials.user)
            loginForm.reset()
        })
        .catch(e => {
            console.log(e)
        })
})