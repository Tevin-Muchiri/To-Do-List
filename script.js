let add_button = document.getElementById("add");
let input = document.getElementById("task_input");
let date_input = document.getElementById("task_date");

add_button.addEventListener("click", function () {
  let today = new Date().toISOString().split("T")[0];
  if (input.value && date_input.value) {
    if (date_input.value < today) {
      alert("Enter a valid date");
      return;
    }

    let task_paragraph = document.createElement("p");
    task_paragraph.innerText = input.value;
    task_paragraph.className = "task_paragraph";

    let dateObj = new Date(date_input.value);
    let formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${dateObj.getFullYear()}`;

    let date = document.createElement("p");
    date.innerText = formattedDate;
    date.className = "task_date";

    let edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.className = "edit";

    let delete_button = document.createElement("button");
    delete_button.innerHTML = "Delete";
    delete_button.className = "delete";

    let div = document.createElement("div");
    div.className = "task_container";
    div.appendChild(task_paragraph);
    div.appendChild(date);
    div.appendChild(edit_button);
    div.appendChild(delete_button);
    document.body.appendChild(div);

    input.value = "";
    date_input.value = "";

    saveTasks();

    edit_button.addEventListener("click", function () {
      let newTask = prompt("Edit task:", task_paragraph.innerText);
      let newDate = prompt("Edit date (DD-MM-YYYY):", date.innerText);

      if (newTask !== null && newDate !== null) {
        let [day, month, year] = newDate.split("-");
        let compareDate = `${year}-${month}-${day}`;

        if (compareDate < today) {
          alert("The date cannot be in the past.");
          return;
        }

        task_paragraph.innerText = newTask;
        date.innerText = newDate;
        saveTasks();
      }
    });

    delete_button.addEventListener("click", function () {
      div.remove();
      saveTasks(); // Save tasks after deletion
    });
  } else if (input.value === "") {
    alert("Please type something");
  } else if (date_input.value === "") {
    alert("Please enter a valid date");
  }
});

// Function to save tasks to localStorage
function saveTasks() {
  let tasks = [];
  let taskContainers = document.querySelectorAll(".task_container");

  taskContainers.forEach(function (container) {
    let taskText = container.querySelector(".task_paragraph").innerText;
    let taskDate = container.querySelector(".task_date").innerText;
    tasks.push({ task: taskText, date: taskDate });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.forEach(function (task) {
      let task_paragraph = document.createElement("p");
      task_paragraph.innerText = task.task;
      task_paragraph.className = "task_paragraph";

      let date = document.createElement("p");
      date.innerText = task.date;
      date.className = "task_date";

      let edit_button = document.createElement("button");
      edit_button.innerHTML = "Edit";
      edit_button.className = "edit";

      let delete_button = document.createElement("button");
      delete_button.innerHTML = "Delete";
      delete_button.className = "delete";

      let div = document.createElement("div");
      div.className = "task_container";
      div.appendChild(task_paragraph);
      div.appendChild(date);
      div.appendChild(edit_button);
      div.appendChild(delete_button);

      document.body.appendChild(div);

      edit_button.addEventListener("click", function () {
        let newTask = prompt("Edit task:", task_paragraph.innerText);
        let newDate = prompt("Edit date (DD-MM-YYYY):", date.innerText);

        if (newTask !== null && newDate !== null) {
          // Convert DD-MM-YYYY to YYYY-MM-DD for comparison
          let [day, month, year] = newDate.split("-");
          let compareDate = `${year}-${month}-${day}`;
          let today = new Date().toISOString().split("T")[0];

          if (compareDate < today) {
            alert("Enter a valid date");
            return;
          }

          task_paragraph.innerText = newTask;
          date.innerText = newDate;
          saveTasks(); // Save tasks after editing
        }
      });

      delete_button.addEventListener("click", function () {
        div.remove();
        saveTasks();
      });
    });
  }
}

loadTasks();
s;
