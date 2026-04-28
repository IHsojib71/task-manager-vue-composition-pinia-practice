import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTaskStore = defineStore("tasks", () => {
  const tasks = reactive(JSON.parse(localStorage.getItem('tasks')) || []);
let modalIsActive = ref(false);
  let filterBy = ref("");
  function setFilter(val) {
    filterBy.value = val;
  }
  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case "todo":
        return tasks.filter((task) => !task.completed);
      case "done":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });
function addTask(newTask)
{
  if (newTask.name && newTask.description) {
    newTask.id = tasks.length ?  Math.max(...tasks.map(task => task.id)) + 1 : 1;
      tasks.push(newTask);
      closeModal();

    newTask = {
      name: '',
      description:'',
      completed: false
    }
  }
  else {
      alert('Please enter the title and description for the task.');
  }
}

 function toggleCompleted(id)
  {
     tasks.forEach((task) => {
     if (id === task.id) {
       task.completed = !task.completed;
      }
    })
    }
    
    function openModal() {
        modalIsActive.value = true;
    }
    function closeModal() {
        modalIsActive.value = false;
    }

  return { tasks, filterBy, setFilter, filteredTasks,addTask,toggleCompleted,modalIsActive, openModal, closeModal };
});
