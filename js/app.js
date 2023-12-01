import { ApiTask, Task } from "./tasks.js";

function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${task.taskName} - ${task.description} - Status: ${task.status}`;
    taskList.appendChild(listItem);
  });
}

const apiTask = new ApiTask();

apiTask
  .getAll()
  .then((tasks) => {
    displayTasks(
      tasks.map(
        (task) =>
          new Task(
            task.id,
            task.taskName,
            task.description,
            task.status,
            task.dateAdded,
            task.estimatedFinishDate
          )
      )
    );
  })
  .catch((error) => {
    console.error("Error fetching tasks:", error);
  });
