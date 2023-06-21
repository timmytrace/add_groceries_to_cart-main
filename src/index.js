// Importing the initializeApp function from the "firebase/app" module
import { initializeApp } from "firebase/app";

// Importing Firestore functions and objects from the "firebase/firestore" moduleimport
import {
  getFirestore, // Function to initialize Firestore
  collection, // Function to access a collection in Firestore
  onSnapshot, // Function to listen for real-time updates on a collection
  addDoc, // Function to add a new document to a collection
  doc, // Function to reference a specific document in a collection
  deleteDoc, // Function to delete a document from Firestore
} from "firebase/firestore";


// Importing Authentication functions and objects from the "firebase/auth" moduleimport
import {
  getAuth, // Function to initialize Firebase Authentication
  createUserWithEmailAndPassword, // Function to create a new user with email and password
  signOut, // Function to sign out the current user
  signInWithEmailAndPassword, // Function to sign in with email and password
} from "firebase/auth";
// Importing storage functions and objects from the "firebase/auth" moduleimport
import {
  getStorage,// Function to initialize Firebase Storage
  ref as storageReference, // Function to reference a file or folder in Storage
  uploadBytes,  // Function to upload data as bytes to Storage
} from "firebase/storage";

// Firebase configuration object containing credentials for the project
  const firebaseConfig = {
    apiKey: "AIzaSyC5r1ggBh8XVCNDHynDHpzE8uQ-qz3uaOY",
    authDomain: "fire-base--pro.firebaseapp.com",
    projectId: "fire-base--pro",
    storageBucket: "fire-base--pro.appspot.com",
    messagingSenderId: "855834741284",
    appId: "1:855834741284:web:60b59c3fc32dea768926b1"
  };
// Selecting relevant HTL elements
const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");
const signupBtn = document.querySelector(".signup");
const signInBtn = document.querySelector(".signin");
const signOutBtn = document.querySelector(".signout");
const emailEl = document.querySelector(".email");
const passwordEl = document.querySelector(".password");
const spanErrorMsgEl = document.querySelector(".error-msg");
const containerApp = document.querySelector(".container");
const loginFormContainer = document.querySelector(".login-form");
const welcomeText = document.querySelector(".welcome-text");
const fileInput = document.getElementById("fileInput");
const cartImage = document.querySelector(".image");

// Initializing services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
// obtaining instance of firestore service
const db = getFirestore();
//   retrieving reference to collection within database
const collectionRef = collection(db, "cart");


// adding documents to database
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  addDoc(collectionRef, {
    task: inputField.value,
  }).then(() => {
    inputField.value = "";
  });
});

// retrieving documents from our collection
onSnapshot(collectionRef, (snapshot) => {
  const cart = snapshot.docs.map((task) => {
    return { ...task.data(), id: task.id };
  });
  shoppingList.innerHTML = "";
  cart.forEach((item) => {
    const newElement = document.createElement("li");
    newElement.textContent = `${item.task}`;
    shoppingList.append(newElement);
    newElement.addEventListener("click", function () {
      const docRef = doc(db, "cart", item.id);
      deleteDoc(docRef);
    });
  });
  console.log(cart);
});

// Signing up users
signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const emailVal = emailEl.value;
  const passwordVal = passwordEl.value;
  
  createUserWithEmailAndPassword(auth, emailVal, passwordVal)
    .then((cred) => {
      const userEmail = cred.user.email;
      const username = userEmail.split("@")[0];
      emailEl.value = "";
    
      passwordEl.value = "";
      welcomeText.textContent = `Welcome ${username}😊`;
      containerApp.style.visibility = "visible";
      loginFormContainer.style.display = "none";

    })
    .catch((err) => {
      spanErrorMsgEl.textContent = err.msg;
    });
});

//signing Out users
signOutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      containerApp.style.visibility = "hidden";
      loginFormContainer.style.display = "flex";
      emailEl.value = "";
      passwordEl.value = "";
    })
    .catch((err) => {
      spanErrorMsgEl.textContent = err.message;
    });
});

//signing in users
signInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const emailVal = emailEl.value;
  const passwordVal = passwordEl.value;
  signInWithEmailAndPassword(auth, emailVal, passwordVal)
    .then((cred) => {
      const userEmail = cred.user.email;
      const username = userEmail.split("@")[0];
      welcomeText.textContent = `Welcome ${username}😊`;
      containerApp.style.visibility = "visible";
      loginFormContainer.style.display = "none";
    })
    .catch((err) => {
      spanErrorMsgEl.textContent = err.message;
    });
});
// Uploading file to fire storage
function uploadFile(file) {
  const storage = getStorage();
  const storageRef = storageReference(storage, "images/" + file.name);

  // Upload file
  uploadBytes(storageRef, file)
    .then((snapshot) => {
      console.log("File uploaded successfully");
    })
    .catch((error) => {
      console.error("Error uploading file", error);
      // Handle error
    });
}

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  uploadFile(file);
});


