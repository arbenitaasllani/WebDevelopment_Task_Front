export class Task {
  constructor(
    id,
    taskName,
    description,
    status,
    dateAdded,
    estimatedFinishDate
  ) {
    this.id = id;
    this.taskName = taskName;
    this.description = description;
    this.status = status;
    this.dateAdded = dateAdded;
    this.estimatedFinishDate = estimatedFinishDate;
  }
}

export class ApiTask {
  url = "https://localhost:8080/task";

  async getAll() {
    const response = await fetch(this.url);
    return await response.json();
  }
}
