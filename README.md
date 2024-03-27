# Todo App Documentation

This documentation provides an overview of the features implemented in the Todo App and instructions on how to set up and run the application locally.

## Features

- Users can add a new task by entering a title, description, priority and due date.
- Users can edit the title, description, priority, due date and status of an existing task.
- Users can mark a task as pending, in-progress or completed.
- Users can delete a task.
- Form validation ensures that required fields are filled out correctly.
- The application displays a list of tasks, with the ability to filter tasks based on their completion status (completed, pending, in-progress, or all) and priority (low, medium, high and all).
- Tasks are persisted locally, preventing data loss upon page refresh.

## Technologies Used

- React
- Vite
- LocalStorage for data persistence

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Chizycodes/wow-ai-test.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd wow-ai-test
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    ```

5. **Access the application:**
    Open your web browser and navigate to `http://localhost:5173`.
