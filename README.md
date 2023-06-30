# Add Groceries To Cart App


This web application allows users to sign up and sign in using Firebase Authentication. Once authenticated, users can add groceries to their cart, delete items from the cart, and even upload images of groceries to Firebase Storage.


## Features
**User Authentication**: Secure sign-up and sign-in functionality using Firebase Authentication.

**Shopping Cart**: Users can add groceries to their cart and manage the items they have selected.

**Image Upload**: Ability to upload images of groceries to Firebase Storage.

**Real-time Updates**: Any changes made to the cart or uploaded images are reflected in real-time using Firebase Firestore.

## Technologies Used
HTML5
CSS3
JavaScript
Firebase 9 (Authentication, Firestore, Storage)
Webpack

## Installation
To run this web app locally, follow these steps:

1. Clone the repository: git clone https://github.com/timmytrace/add_groceries_to_cart

2. Navigate to the project directory: cd add_groceries_to_cart

3. Install dependencies: npm install

**Configure Firebase**:
1. Create a Firebase project at https://console.firebase.google.com

2. Obtain your Firebase configuration object (apiKey, authDomain, etc.) and update it in firebaseConfig within index.js.

3. Start the development server: npm start

4. Open your web browser and visit http://localhost:3000 to access the app.

*Usage*
1. Sign up for a new account or sign in with your existing credentials.

2. Once authenticated, you can add groceries to your cart by clicking the "Add to Cart" button.

3. To delete an item from the cart, simply click on the item.

4. To upload an image of a grocery item, use the image upload feature and select the desired image file.

5. Enjoy managing your groceries and cart with this web app🚀🚀!
