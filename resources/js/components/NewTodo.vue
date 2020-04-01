<template>
    <input type="text" v-model="newTodo.title"
           id="todo-field"
           @keyup.enter="addTodo" autofocus="autofocus"
           placeholder="What need to be done?" class="new-todo">
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        name: "NewTodo",
        data() {
            return {
                newTodo: {
                    title: ''
                }
            };
        },
        methods: {
            getTodos() {
                this.$store.dispatch("GET_TODOS");
            },
            addTodo() {
                Promise.all([
                    this.$store.dispatch("ADD_TODO", this.newTodo)
                ]).finally(() => {
                    this.getTodos();
                    this.newTodo.title = ''
                });
            },
        },
        computed: {
            ...mapGetters(["newTodo"])
        },
    };
</script>

