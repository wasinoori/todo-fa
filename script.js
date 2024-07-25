const { createApp, ref, computed } = Vue;

    createApp({
      setup() {
        const todos = ref([]);
        const newTodo = ref('');
        const filter = ref('all');

        const addTodo = () => {
          if (newTodo.value.trim()) {
            todos.value.push({
              id: Date.now(),
              text: newTodo.value.trim(),
              completed: false
            });
            newTodo.value = '';
          }
        };

        const removeTodo = (todo) => {
          todos.value = todos.value.filter(t => t !== todo);
        };

        const filteredTodos = computed(() => {
          if (filter.value === 'active') {
            return todos.value.filter(todo => !todo.completed);
          } else if (filter.value === 'completed') {
            return todos.value.filter(todo => todo.completed);
          }
          return todos.value;
        });

        const activeTodoCount = computed(() => {
          return todos.value.filter(todo => !todo.completed).length;
        });

        const clearCompleted = () => {
          todos.value = todos.value.filter(todo => !todo.completed);
        };

        return {
          todos,
          newTodo,
          filter,
          addTodo,
          removeTodo,
          filteredTodos,
          activeTodoCount,
          clearCompleted
        };
      }
    }).mount('#app');