class ApiTask {
  url = "https://localhost:8080/task";

  async getAll() {
    const response = await fetch(this.url);
    return await response.json();
  }
}
