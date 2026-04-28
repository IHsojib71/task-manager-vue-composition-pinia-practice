import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTaskStore = defineStore("tasks", () => {
  const tasks = reactive([
    {
      id: 1,
      name: "Website design",
      description:
        "Define the style guide, branding and create the webdesign on Figma.",
      completed: true,
    },
    {
      id: 2,
      name: "Website development",
      description: "Develop the portfolio website using Vue JS.",
      completed: false,
    },
    {
      id: 3,
      name: "Hosting and infrastructure",
      description:
        "Define hosting, domain and infrastructure for the portfolio website.",
      completed: false,
    },
    {
      id: 4,
      name: "Composition API",
      description:
        "Learn how to use the composition API and how it compares to the options API.",
      completed: true,
    },
    {
      id: 5,
      name: "Pinia",
      description: "Learn how to setup a store using Pinia.",
      completed: true,
    },
    {
      id: 6,
      name: "Groceries",
      description: "Buy rice, apples and potatos.",
      completed: false,
    },
    {
      id: 7,
      name: "Bank account",
      description: "Open a bank account for my freelance business.",
      completed: false,
    },
  ]);
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
    newTask.id = Math.max(...tasks.map(task => task.id)) + 1;
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
