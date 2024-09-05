export default {
    data() {
        return {
            valid: false,
            usernameRules: [
                v => !!v || 'Username is required.',
                v => (v && v.length >= 6) || 'Username must be at least 6 characters long.',
            ],
            emailRules: [
                v => !!v || 'Email is required.',
                v => /.+@.+\..+/.test(v) || 'Email must be valid.',
            ],
            ageRules: [
                v => !!v || 'Age is required.',
                v => (v && v > 0 && v < 100) || 'Age must be a positive number and less than 100.'
            ],
            passwordRules: [
                v => !!v || 'Password is required.',
                v => (v && v.length >= 6) || 'Password must be at least 6 characters long.',
            ],
            passwordConfirmationRules: [
                v => !!v || 'Password confirmation is required.',
                v => v === this.formData.password || 'Passwords do not match.',
            ],
            newPasswordConfirmationRules: [
                v => !!v || 'Password confirmation is required.',
                v => v === this.formData.newPassword || 'Passwords do not match.',
            ],
        };
    },
};