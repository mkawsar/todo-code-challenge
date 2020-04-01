<template>
    <div class="container">
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>

            </header>
            <new-todo></new-todo>
            <todo-list></todo-list>
        </section>
    </div>
</template>
<script>
    import newTodo from "../components/NewTodo.vue";
    import todoList from "../components/TodoList.vue";
    import {mapGetters} from "vuex";

    export default {
        components: {
            newTodo,
            todoList
        },
        name: "TodoApp",
        data() {
            return {};
        },
        computed: {
            ...mapGetters(["newTodo", "toRemove"])
        }
    };
</script>
<style>
</style>

