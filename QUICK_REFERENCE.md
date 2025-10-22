# Quick Reference Guide - CRUD Endpoints

## 🚀 Quick Start

All endpoints require JWT Bearer token in header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

User ID is **automatically extracted** from the token - no need to pass it!

---

## 📋 Endpoint Quick Reference

### Projects

| Method | Endpoint                       | Description        |
| ------ | ------------------------------ | ------------------ |
| POST   | `/projects/create_project`     | Create new project |
| PUT    | `/projects/update_project/:id` | Update project     |
| DELETE | `/projects/delete_project/:id` | Delete project     |

### Tasks

| Method | Endpoint                 | Description     |
| ------ | ------------------------ | --------------- |
| POST   | `/tasks/create_task`     | Create new task |
| PUT    | `/tasks/update_task/:id` | Update task     |
| DELETE | `/tasks/delete_task/:id` | Delete task     |

### Todos

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| POST   | `/todos/create_todo/:taskId` | Create todo for task            |
| PUT    | `/todos/update_todo`         | Update one or more todos (bulk) |
| DELETE | `/todos/delete_todo`         | Delete one or more todos (bulk) |

---

## 💡 Minimal Examples

### Create Project (Minimal)

```bash
POST /projects/create_project
{
  "title": "My Project"
}
```

### Create Project (Full)

```bash
POST /projects/create_project
{
  "title": "My Project",
  "description": "Description",
  "color_hex": "#1D72A6",
  "course_code": "CS101",
  "time_zone": "America/New_York",
  "start_at": "2024-01-01T00:00:00.000Z",
  "end_at": "2024-12-31T23:59:59.000Z"
}
```

### Update Project

```bash
PUT /projects/update_project/project-uuid
{
  "title": "Updated Title",
  "color_hex": "#FF5733"
}
```

### Delete Project

```bash
DELETE /projects/delete_project/project-uuid
```

---

### Create Task (Minimal)

```bash
POST /tasks/create_task
{
  "title": "My Task",
  "type": "Project"
}
```

### Create Task (Full)

```bash
POST /tasks/create_task
{
  "title": "My Task",
  "description": "Description",
  "type": "Project",
  "priority": "High",
  "project_id": "project-uuid",
  "due_date": "2024-12-31T23:59:59.000Z",
  "is_all_day": false
}
```

### Update Task

```bash
PUT /tasks/update_task/task-uuid
{
  "priority": "High",
  "due_date": "2024-12-31T23:59:59.000Z"
}
```

### Delete Task

```bash
DELETE /tasks/delete_task/task-uuid
```

---

### Create Todo (Minimal)

```bash
POST /todos/create_todo/task-uuid
{
  "title": "My Todo"
}
```

### Create Todo (Full)

```bash
POST /todos/create_todo/task-uuid
{
  "title": "My Todo",
  "description": "Description",
  "priority": "Medium",
  "due_date": "2024-12-31T23:59:59.000Z"
}
```

### Update Single Todo

```bash
PUT /todos/update_todo
{
  "todoIds": ["todo-uuid-1"],
  "updates": {
    "priority": "High"
  }
}
```

### Update Multiple Todos (Bulk)

```bash
PUT /todos/update_todo
{
  "todoIds": ["todo-uuid-1", "todo-uuid-2", "todo-uuid-3"],
  "updates": {
    "priority": "High",
    "due_date": "2024-12-31T23:59:59.000Z"
  }
}
```

### Delete Single Todo

```bash
DELETE /todos/delete_todo
{
  "todoIds": ["todo-uuid-1"]
}
```

### Delete Multiple Todos (Bulk)

```bash
DELETE /todos/delete_todo
{
  "todoIds": ["todo-uuid-1", "todo-uuid-2", "todo-uuid-3"]
}
```

---

## 🎨 Field Types

### Project Fields

```typescript
{
  title: string,              // Required
  description?: string,
  source?: "Personal" | "Canvas",
  external_id?: string,
  course_code?: string,
  color_hex?: string,         // e.g., "#1D72A6"
  time_zone?: string,         // e.g., "America/New_York"
  start_at?: string,          // ISO 8601
  end_at?: string,            // ISO 8601
  raw_canvas_data?: any       // JSON object
}
```

### Task Fields

```typescript
{
  title: string,              // Required
  type: "Canvas" | "Project" | "Personal",  // Required
  description?: string,
  project_id?: string,
  due_date?: string,          // ISO 8601
  is_all_day?: boolean,
  priority?: "High" | "Medium" | "Low",
  raw_canvas_data?: any       // JSON object
}
```

### Todo Fields

```typescript
{
  title: string,              // Required
  description?: string,
  priority?: "High" | "Medium" | "Low",
  due_date?: string           // ISO 8601
}
```

---

## ⚠️ Error Codes

| Code | Meaning      | Solution                    |
| ---- | ------------ | --------------------------- |
| 400  | Bad Request  | Check request body format   |
| 401  | Unauthorized | Verify JWT token is valid   |
| 403  | Forbidden    | You don't own this resource |
| 404  | Not Found    | Resource doesn't exist      |

---

## 🔧 JavaScript/TypeScript Helper Functions

```typescript
const API_BASE = "http://localhost:3000";

// Projects
export const createProject = (token: string, data: any) =>
  fetch(`${API_BASE}/projects/create_project`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateProject = (token: string, id: string, data: any) =>
  fetch(`${API_BASE}/projects/update_project/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteProject = (token: string, id: string) =>
  fetch(`${API_BASE}/projects/delete_project/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

// Tasks
export const createTask = (token: string, data: any) =>
  fetch(`${API_BASE}/tasks/create_task`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateTask = (token: string, id: string, data: any) =>
  fetch(`${API_BASE}/tasks/update_task/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteTask = (token: string, id: string) =>
  fetch(`${API_BASE}/tasks/delete_task/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

// Todos
export const createTodo = (token: string, taskId: string, data: any) =>
  fetch(`${API_BASE}/todos/create_todo/${taskId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateTodos = (token: string, todoIds: string[], updates: any) =>
  fetch(`${API_BASE}/todos/update_todo`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todoIds, updates }),
  }).then((r) => r.json());

export const deleteTodos = (token: string, todoIds: string[]) =>
  fetch(`${API_BASE}/todos/delete_todo`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todoIds }),
  }).then((r) => r.json());
```

---

## 🧪 Testing in Swagger

1. Go to `http://localhost:3000/api`
2. Click **Authorize** button
3. Enter: `Bearer YOUR_JWT_TOKEN`
4. Click **Authorize**
5. Navigate to endpoint
6. Click **Try it out**
7. Fill in the request body
8. Click **Execute**

---

## 📚 Full Documentation

For complete documentation with all details, see:

- `NEW_CRUD_ENDPOINTS_DOCUMENTATION.md` - Full API documentation
- `CRUD_IMPLEMENTATION_SUMMARY.md` - Implementation details
- Swagger UI at `/api` - Interactive testing

---

## ✅ Checklist for Frontend Integration

- [ ] Store JWT token securely
- [ ] Add token to all requests in Authorization header
- [ ] Handle 401 errors (token expired → re-authenticate)
- [ ] Handle 403 errors (permission denied → show error)
- [ ] Handle 404 errors (resource not found → refresh data)
- [ ] No need to pass user_id anywhere (it's automatic!)
- [ ] Use bulk operations for todos when updating/deleting multiple

---

## 🎯 Common Patterns

### Create Pattern

```typescript
// User clicks "Create Project" button
const newProject = await createProject(token, {
  title: formData.title,
  color_hex: formData.color,
  // ... other fields
});
// No user_id needed! ✅
```

### Update Pattern

```typescript
// User updates a project
const updated = await updateProject(token, projectId, {
  title: newTitle,
  color_hex: newColor,
});
// Only changed fields needed ✅
```

### Bulk Delete Pattern

```typescript
// User selects multiple todos and clicks delete
const result = await deleteTodos(token, selectedTodoIds);
console.log(`Deleted ${result.deleted} todos`);
// Single API call for multiple items ✅
```

---

**Remember:** All endpoints automatically use the user ID from your JWT token. You never need to pass `user_id` as a parameter! 🎉
