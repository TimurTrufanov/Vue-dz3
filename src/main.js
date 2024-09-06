import { createApp } from 'vue'
import { createPinia } from 'pinia'
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

const pinia = createPinia()

// Router
import router from "@/router/index.js";

import globalMixin from "@/mixins/globalMixin.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
const storage = getStorage(firebaseApp);

export { auth, db, storage };

const tooltipDirective = {
    mounted(el, binding) {
        const tooltip = document.createElement('div');

        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.display = 'none';
        tooltip.textContent = binding.value;

        document.body.appendChild(tooltip);

        el.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });

        el.addEventListener('mousemove', (event) => {
            const mouseX = event.pageX;
            const mouseY = event.pageY;

            tooltip.style.left = `${mouseX + 15}px`;
            tooltip.style.top = `${mouseY - tooltip.offsetHeight - 10}px`;
        });

        el.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        el.tooltip = tooltip;
    },
    unmounted(el) {
        if (el.tooltip) {
            document.body.removeChild(el.tooltip);
        }
    }
};

let app;

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
            .use(vuetify)
            .use(router)
            .use(pinia)
            .directive('tooltip', tooltipDirective)
            .mixin(globalMixin)
            .mount('#app');
    }
});
