import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark'
    }
})

// Router
import router from "@/router/index.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBc6Va_mCG7heRWf9TBm97USZRz1vXpBO4",
    authDomain: "anime-vue-7a95b.firebaseapp.com",
    projectId: "anime-vue-7a95b",
    storageBucket: "anime-vue-7a95b.appspot.com",
    messagingSenderId: "175194022607",
    appId: "1:175194022607:web:787c4a9190713cd96d8dba"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db }

let app;

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
            .use(vuetify)
            .use(router)
            .mount('#app');
    }
});
