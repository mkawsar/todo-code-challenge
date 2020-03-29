<template>
    <div>
        <ul class="todo-list">
            <todo v-for="todo in todos" :todo="todo" :key="todo.id"/>
        </ul>
        <hr style="margin-bottom: 2px;">
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="javascript:void(0)">{{todos.length }} {{ 'item' | pluralize(todos)}} left</a>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-bind:class="{ 'active': active === 'all'}">
                        <a class="nav-link" href="#" @click="allTodos">All</a>
                    </li>
                    <li class="nav-item" v-bind:class="{ 'active': active === 'active'}">
                        <a class="nav-link" href="#" @click="activeTodos">Active</a>
                    </li>
                    <li class="nav-item" :v-bind:class="{ 'active': active === 'completed'}">
                        <a class="nav-link" href="#" @click="completedTodos">Completed</a>
                    </li>
                    <li class="nav-item" v-if="completedStatus === 1">
                        <a class="nav-link" href="#" @click="deleteAllCompletedTodo">Clear Completed</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import Vue from 'vue'
    import todo from "../components/Todo";
    import {mapGetters} from "vuex";

    Vue.filter('pluralize', (word, todos) => (todos.length > 1 || todos.length === 0) ? `${word}s` : word);

    export default {
        components: {
            todo
        },
        name: "TodoList",
        data() {
            return {
                active: 'all'
            };
        },
        mounted() {
            this.allTodos();
        },
        computed: {
            ...mapGetters(["todos", "remaining", "completedStatus"]),
            allDone: {
                get: function () {
                    return this.remaining.length === 0;
                },
                set: function (value) {
                    this.todos.forEach(todo => {
                        todo.completed = true;
                    });
                }
            }
        },
        methods: {
            activeTodos() {
                this.active = 'active';
                this.$store.dispatch("GET_ACTIVE_TODOS");
            },
            allTodos() {
                this.active = 'all';
                this.$store.dispatch("GET_TODOS");
            },
            completedTodos() {
                this.active = 'completed';
                this.$store.dispatch("GET_COMPLETED_TODOS");
            },
            deleteAllCompletedTodo() {
                this.$store.dispatch("DELETE_ALL_COMPLETED_TODO");
                this.allTodos();
            }
        }
    };
</script>
