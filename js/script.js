document.addEventListener("DOMContentLoaded", function () {
  const taskListContainer = document.getElementById("taskList");
  const addTaskForm = document.getElementById("addTaskForm");
  const editTaskForm = document.getElementById("editTaskForm");

  function fetchTasks() {
    fetch("http://localhost:8080/task")
      .then((response) => response.json())
      .then((tasks) => {
        taskListContainer.innerHTML = "";
        tasks.forEach((task) => {
          const taskItem = createTaskElement(task);
          taskListContainer.appendChild(taskItem);
        });
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }

  function createTaskElement(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
            <h3>${task.taskName}</h3>
            <p>${task.description}</p>
            <p>Status: ${task.status}</p>
            <p>Date Added: ${task.dateAdded}</p>
            <p>Estimated Finish Date: ${task.estimatedFinishDate}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id})">Edit</button>
        `;
    return taskItem;
  }

  function addTask(event) {
    console.log("Form submitted");
    event.preventDefault();
    const formData = new FormData(addTaskForm);
    const currentDate = new Date().toISOString().split("T")[0];
    const newTask = {
      taskName: formData.get("taskName"),
      description: formData.get("description"),
      status: formData.get("status"),
      dateAdded: currentDate,
      estimatedFinishDate: formData.get("estimatedFinishDate"),
    };

    fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        fetchTasks();
        console.log("Redirecting to list.html");
        window.location.href = "html/list.html";
      })
      .catch((error) => console.error("Error adding task:", error));
  }

  function editTask(event, taskId) {
    event.preventDefault();
    const formData = new FormData(editTaskForm);
    const updatedTask = {
      taskName: formData.get("editTaskName"),
      description: formData.get("editDescription"),
      status: formData.get("editStatus"),
      estimatedFinishDate: formData.get("editEstimatedFinishDate"),
    };

    fetch(`http://localhost:8080/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        fetchTasks();
        console.log("Task updated successfully");
      })
      .catch((error) => console.error("Error updating task:", error));
  }

  window.deleteTask = function (taskId) {
    fetch(`http://localhost:8080/task/${taskId}`, {
      method: "DELETE",
    })
      .then(fetchTasks)
      .catch((error) => console.error("Error deleting task:", error));
  };

  window.showUpdateForm = function (taskId) {
    const editFormContainer = document.getElementById("editFormContainer");
    const editForm = document.createElement("form");
    editForm.id = "editTaskForm";

    fetch(`http://localhost:8080/task/${taskId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((task) => {
        editForm.innerHTML = `
          <label for="editTaskName">Task Name:</label>
          <input type="text" id="editTaskName" name="editTaskName" value="${task.taskName}" required>
          <label for="editDescription">Description:</label>
          <textarea id="editDescription" name="editDescription" required>${task.description}</textarea>
          <label for="editStatus">Status:</label>
          <input type="text" id="editStatus" name="editStatus" value="${task.status}" required>
          <label for="editEstimatedFinishDate">Estimated Finish Date:</label>
          <input type="date" id="editEstimatedFinishDate" name="editEstimatedFinishDate" value="${task.estimatedFinishDate}" required>
          <button type="submit">Update Task</button>
        `;

        editFormContainer.innerHTML = "";
        editFormContainer.appendChild(editForm);

        editForm.addEventListener("submit", (event) => editTask(event, taskId));
      })
      .catch((error) => console.error("Error fetching task data:", error));
  };

  function redirectToForm() {
    window.location.href = "form.html";
  }

  window.redirectToForm = redirectToForm;

  fetchTasks();
  addTaskForm.addEventListener("submit", addTask);
  editTaskForm.addEventListener("edit", editTask);
});
