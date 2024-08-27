import {createWebHistory, createRouter} from 'vue-router'
import { auth, db } from "@/main.js";
import { doc, getDoc } from "firebase/firestore";

import AnimeCards from "@/components/anime/AnimeCards.vue";
import MangaCards from "@/components/manga/MangaCards.vue";
import MainPage from "@/components/MainPage.vue";
import UserRegistration from "@/components/user/UserRegistration.vue";
import UserLogin from "@/components/user/UserLogin.vue";
import UserCabinet from "@/components/user/UserCabinet.vue";
import AdminPage from "@/components/AdminPage.vue";
import AbstractExamples from "@/components/AbstractExamples.vue";

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/anime',
        name: 'anime',
        component: AnimeCards,
    },
    {
        path: '/manga',
        name: 'manga',
        component: MangaCards,
    },
    {
        path: '/anime/:id',
        name: 'anime-details',
        component: () => import("@/components/anime/AnimeDetails.vue"),
        children: [
            {
                path: 'characters',
                name: 'anime-characters',
                component: () => import("@/components/anime/AnimeCharacters.vue"),
            },
        ],
    },
    {
        path: '/manga/:id',
        name: 'manga-details',
        component: () => import("@/components/manga/MangaDetails.vue"),
        children: [
            {
                path: 'characters',
                name: 'manga-characters',
                component: () => import("@/components/manga/MangaCharacters.vue"),
            },
        ],
    },
    {
        path: '/registration',
        name: 'registration',
        component: UserRegistration,
    },
    {
        path: '/login',
        name: 'login',
        component: UserLogin,
    },
    {
        path: '/user/:id',
        name: 'user-cabinet',
        component: UserCabinet,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminPage,
        meta: { requiresAdmin: true },
    },
    {
        path: '/abstract',
        name: 'abstract',
        component: AbstractExamples,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import("@/components/NotFound.vue"),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    const currentUser = auth.currentUser;

    if (requiresAuth && !currentUser) {
        return next({ name: 'not-found' });
    }

    if (currentUser && requiresAdmin) {
        try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (!userDoc.exists() || !userDoc.data().isAdmin) {
                return next({ name: 'not-found' });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return next({ name: 'not-found' });
        }
    }

    if ((to.name === 'login' || to.name === 'registration') && currentUser) {
        return next({ name: 'not-found' });
    }

    next();
});

export default router