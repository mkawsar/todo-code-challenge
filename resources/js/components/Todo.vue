<template>
    <li class="todo" :class="{ completed: todo.completed }">
        <div class="view">
            <input type="checkbox" v-model="todo.completed" class="toggle" @click="completeTodo(todo)">
            <input v-if="edit" type="text" class="form-control" @keyup.enter="updateTodo(todo)" autofocus="autofocus"
                   v-model="todo.title"/>
            <label v-else @click="edit = true">{{todo.title}}</label>
            <button v-if="edit === false" @click="removeTodo(todo)" class="destroy"></button>
        </div>
    </li>

</template>
<script>
    export default {
        name: "Todo",
        props: ["todo"],
        data() {
            return {
                editTodo: null,
                edit: false,
            };
        },
        computed: {
            completed() {
                return this.todo.completed === 1;
            }
        },
        methods: {
            completeTodo(todo) {
                this.$store.dispatch("UPDATE_TODO", todo);
            },
            removeTodo(todo) {
                this.$store.commit("CACHE_REMOVED", todo);
                this.$store.dispatch("DELETE_TODO", todo);
                this.$store.dispatch("GET_TODOS");
            },
            updateTodo(todo) {
                Promise.all([
                    this.$store.dispatch("UPDATE_TODO_TITLE", todo),
                    this.$store.dispatch("GET_TODOS")
                ]).finally(() => {
                    this.edit = false;
                });
            }
        },
        watch: {
            value: function () {
                this.editTodo = this.value;
            }
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                }
            }
        }
    };
</script>
