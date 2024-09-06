export default {
    created() {
        console.log(`${this.$options.name} component has been created.`);
    },
    unmounted() {
        console.log(`${this.$options.name} is destroyed.`);
    },
};