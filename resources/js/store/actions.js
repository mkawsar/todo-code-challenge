let actions = {
    DELETE_TODO({commit}, todo) {
        axios.delete(`/api/todos/${todo.id}`)
            .then(res => {
                if (res.data === 'deleted') {
                    commit('COMPLETED_STATUS', '');
                }
            }).catch(err => {
            console.log(err)
        })
    },
    ADD_TODO({commit}, todo) {
        axios.post('/api/todos', todo)
            .then(res => {
                if (res.data === "added")
                    console.log('ok')
            })
            .catch(err => {
                console.log(err)
            })
    },
    UPDATE_TODO({commit}, todo) {
        axios.put(`/api/todos/${todo.id}`, todo)
            .then(res => {
                if (res.data === 'updated')
                    commit('COMPLETED_STATUS', 1);
            })
            .catch(err => console.log(err))

    },
    GET_TODOS({commit}) {
        axios.get('/api/todos')
            .then(res => {
                commit('GET_TODOS', res.data);
                res.data.forEach(todo => {
                    if (todo.completed === 1) {
                        commit('COMPLETED_STATUS', 1);
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    GET_ACTIVE_TODOS({commit}) {
        axios.get('/api/active/todos')
            .then(res => {
                commit('GET_TODOS', res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },
    GET_COMPLETED_TODOS({commit}) {
        axios.get('/api/completed/todos')
            .then(res => {
                commit('GET_TODOS', res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    UPDATE_TODO_TITLE({commit}, todo) {
        axios.put(`/api/todos/title/${todo.id}`, todo)
            .then(res => {
                if (res.data === 'updated') {
                    console.log('updated')
                }
            })
            .catch(err => console.log(err))

    },
    DELETE_ALL_COMPLETED_TODO({commit}) {
        axios.delete(`api/all/completed/todo/delete`)
            .then(res => {
                if (res.data === 'deleted') {
                    commit('COMPLETED_STATUS', '');
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
};

export default actions;
