import {defineStore} from 'pinia';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';
import {auth, db, storage} from '@/main.js';
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userId: null,
        username: null,
        age: null,
        isAdmin: false,
        profilePictureUrl: 'profile_pictures/default_avatar.png',
        errorMessage: '',
        isUserDataLoaded: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.userId = userCredential.user.uid;

                await this.fetchUserData();

                if (this.age) {
                    localStorage.setItem('userAge', this.age);
                }

                this.errorMessage = '';
                return true;
            } catch (error) {
                this.errorMessage = 'Failed to login';
                return false;
            }
        },
        async register({email, password, username, age}) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const userId = userCredential.user.uid;

                await setDoc(doc(db, 'users', userId), {
                    username,
                    email,
                    age,
                    isAdmin: false,
                    profilePicturePath: this.profilePictureUrl,
                });

                this.userId = userId;
                this.username = username;
                this.isAdmin = false;
                this.profilePictureUrl = await getDownloadURL(ref(storage, this.profilePictureUrl));

                localStorage.setItem('userAge', age);

                this.errorMessage = '';
                return true;
            } catch (error) {
                this.errorMessage = 'Failed to register';
                return false;
            }
        },
        async logout() {
            try {
                await signOut(auth);
                this.userId = null;
                this.username = null;
                this.age = null;
                this.profilePictureUrl = 'profile_pictures/default_avatar.png';
                this.isAdmin = false;

                localStorage.removeItem('userAge');
            } catch (error) {
                console.error(error);
            }
        },
        initAuth() {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.userId = user.uid;
                    await this.fetchUserData();
                } else {
                    this.userId = null;
                }
            });
        },
        async fetchUserData() {
            if (this.userId) {
                const userDocRef = doc(db, 'users', this.userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    this.username = userData.username;
                    this.age = userData.age;
                    this.isAdmin = userData.isAdmin;

                    const profilePicPath = userData.profilePicturePath || 'profile_pictures/default_avatar.png';
                    const profilePicRef = ref(storage, profilePicPath);
                    this.profilePictureUrl = await getDownloadURL(profilePicRef);
                }
            }
            this.isUserDataLoaded = true;
        },
        async updateUserInfo({username, age}) {
            if (this.userId) {
                try {
                    const userDocRef = doc(db, 'users', this.userId);
                    await updateDoc(userDocRef, {username, age});
                    this.username = username;
                    this.age = age;

                    if (age) {
                        localStorage.setItem('userAge', age);
                    }

                    this.errorMessage = '';
                } catch (error) {
                    this.errorMessage = 'Failed to update user information.';
                }
            }
        },
        async uploadProfilePicture(file) {
            if (this.userId && file) {
                try {
                    const fileRef = ref(storage, `profile_pictures/${this.userId}/${file.name}`);
                    await uploadBytes(fileRef, file);
                    const userDocRef = doc(db, 'users', this.userId);
                    await updateDoc(userDocRef, {profilePicturePath: fileRef.fullPath});

                    this.profilePictureUrl = await getDownloadURL(fileRef);
                    this.errorMessage = '';
                } catch (error) {
                    this.errorMessage = 'Failed to upload profile picture.';
                }
            }
        },
        async changePassword(currentPassword, newPassword) {
            try {
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(user.email, currentPassword);

                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);

                this.errorMessage = '';

                return true;
            } catch (error) {
                this.errorMessage = 'Failed to change password';
                return false;
            }
        },
        async getUserProfileInfo(userId) {
            const docSnapshot = await getDoc(doc(db, "users", userId));
            const userData = docSnapshot.data();
            const profilePictureRef = ref(storage, userData.profilePicturePath);
            const profilePictureUrl = await getDownloadURL(profilePictureRef);

            return {
                username: userData.username,
                profilePictureUrl
            };
        }
    },
});