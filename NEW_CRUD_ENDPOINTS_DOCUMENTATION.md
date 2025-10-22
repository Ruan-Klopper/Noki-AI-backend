# New CRUD Endpoints Documentation

## Overview

New Create, Update, and Delete endpoints have been added for Projects, Tasks, and Todos. All endpoints use JWT Bearer token authentication, and the user ID is automatically extracted from the token - **no user_id parameter needed in the request**.

## Key Features

- ✅ **JWT-based authentication** - User ID extracted from bearer token
- ✅ **Ownership validation** - Users can only modify their own resources
- ✅ **Bulk operations** - Todos support updating/deleting multiple items
- ✅ **Complete field support** - All schema fields available in requests
- ✅ **Swagger documentation** - All endpoints fully documented

---

## Projects Endpoints

### 1. Create Project

**Endpoint:** `POST /projects/create_project`

**Authentication:** Required (JWT Bearer Token)

**Description:** Create a new project for the authenticated user.

**Request Body:**

```json
{
  "title": "My New Project",
  "description": "Project description",
  "source": "Personal",
  "external_id": null,
  "course_code": "CS101",
  "color_hex": "#1D72A6",
  "time_zone": "America/New_York",
  "start_at": "2024-01-01T00:00:00.000Z",
  "end_at": "2024-12-31T23:59:59.000Z",
  "raw_canvas_data": {
    "id": 12345,
    "name": "Canvas Course"
  }
}
```

**Note:** Only `title` is required. `user_id` is automatically injected from JWT token.

**Response:**

```json
{
  "id": "project-uuid",
  "user_id": "user-uuid-from-jwt",
  "title": "My New Project",
  "description": "Project description",
  "source": "Personal",
  "external_id": null,
  "course_code": "CS101",
  "color_hex": "#1D72A6",
  "time_zone": "America/New_York",
  "start_at": "2024-01-01T00:00:00.000Z",
  "end_at": "2024-12-31T23:59:59.000Z",
  "raw_canvas_data": { "id": 12345, "name": "Canvas Course" },
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "user": {
    "id": "...",
    "firstname": "...",
    "lastname": "...",
    "email": "..."
  },
  "tasks": [],
  "resources": []
}
```

**cURL Example:**

```bash
curl -X POST "http://localhost:3000/projects/create_project" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "description": "Project description",
    "color_hex": "#1D72A6"
  }'
```

---

### 2. Update Project

**Endpoint:** `PUT /projects/update_project/:id`

**Authentication:** Required (JWT Bearer Token)

**Description:** Update a project owned by the authenticated user.

**URL Parameters:**

- `id` - Project ID to update

**Request Body:** (all fields optional)

```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "color_hex": "#FF5733",
  "time_zone": "Europe/London",
  "start_at": "2024-02-01T00:00:00.000Z",
  "end_at": "2024-11-30T23:59:59.000Z"
}
```

**Response:** Same as create response with updated fields

**cURL Example:**

```bash
curl -X PUT "http://localhost:3000/projects/update_project/project-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "color_hex": "#FF5733"
  }'
```

**Error Responses:**

- `403 Forbidden` - If trying to update another user's project
- `404 Not Found` - If project doesn't exist

---

### 3. Delete Project

**Endpoint:** `DELETE /projects/delete_project/:id`

**Authentication:** Required (JWT Bearer Token)

**Description:** Delete a project owned by the authenticated user.

**URL Parameters:**

- `id` - Project ID to delete

**Response:**

```json
{
  "id": "project-uuid",
  "user_id": "user-uuid",
  "title": "Deleted Project"
}
```

**cURL Example:**

```bash
curl -X DELETE "http://localhost:3000/projects/delete_project/project-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Error Responses:**

- `403 Forbidden` - If trying to delete another user's project
- `404 Not Found` - If project doesn't exist

---

## Tasks Endpoints

### 1. Create Task

**Endpoint:** `POST /tasks/create_task`

**Authentication:** Required (JWT Bearer Token)

**Description:** Create a new task for the authenticated user.

**Request Body:**

```json
{
  "project_id": "project-uuid",
  "title": "Complete documentation",
  "description": "Write comprehensive documentation",
  "due_date": "2024-12-31T23:59:59.000Z",
  "is_all_day": false,
  "type": "Project",
  "priority": "High",
  "raw_canvas_data": {
    "id": 67890,
    "name": "Canvas Assignment"
  }
}
```

**Required Fields:** `title`, `type`

**Note:** `user_id` is automatically injected from JWT token.

**Response:**

```json
{
  "id": "task-uuid",
  "user_id": "user-uuid-from-jwt",
  "project_id": "project-uuid",
  "title": "Complete documentation",
  "description": "Write comprehensive documentation",
  "due_date": "2024-12-31T23:59:59.000Z",
  "is_all_day": false,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "type": "Project",
  "priority": "High",
  "raw_canvas_data": { "id": 67890, "name": "Canvas Assignment" },
  "user": { "id": "...", "firstname": "...", "lastname": "...", "email": "..." },
  "project": { ... },
  "todos": [],
  "resources": []
}
```

**cURL Example:**

```bash
curl -X POST "http://localhost:3000/tasks/create_task" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete documentation",
    "type": "Project",
    "priority": "High",
    "due_date": "2024-12-31T23:59:59.000Z"
  }'
```

---

### 2. Update Task

**Endpoint:** `PUT /tasks/update_task/:id`

**Authentication:** Required (JWT Bearer Token)

**Description:** Update a task owned by the authenticated user.

**URL Parameters:**

- `id` - Task ID to update

**Request Body:** (all fields optional)

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "due_date": "2024-12-31T23:59:59.000Z",
  "priority": "Medium"
}
```

**Response:** Same as create response with updated fields

**cURL Example:**

```bash
curl -X PUT "http://localhost:3000/tasks/update_task/task-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "Medium",
    "due_date": "2024-12-31T23:59:59.000Z"
  }'
```

**Error Responses:**

- `403 Forbidden` - If trying to update another user's task
- `404 Not Found` - If task doesn't exist

---

### 3. Delete Task

**Endpoint:** `DELETE /tasks/delete_task/:id`

**Authentication:** Required (JWT Bearer Token)

**Description:** Delete a task owned by the authenticated user.

**URL Parameters:**

- `id` - Task ID to delete

**Response:**

```json
{
  "id": "task-uuid",
  "user_id": "user-uuid",
  "title": "Deleted Task"
}
```

**cURL Example:**

```bash
curl -X DELETE "http://localhost:3000/tasks/delete_task/task-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Error Responses:**

- `403 Forbidden` - If trying to delete another user's task
- `404 Not Found` - If task doesn't exist

---

## Todos Endpoints

### 1. Create Todo

**Endpoint:** `POST /todos/create_todo/:taskId`

**Authentication:** Required (JWT Bearer Token)

**Description:** Create a new todo for a specific task.

**URL Parameters:**

- `taskId` - Task ID the todo belongs to

**Request Body:**

```json
{
  "title": "Review code changes",
  "description": "Review the latest pull request",
  "priority": "High",
  "due_date": "2024-12-31T23:59:59.000Z"
}
```

**Required Fields:** `title`

**Note:** `user_id` and `task_id` are automatically injected.

**Response:**

```json
{
  "id": "todo-uuid",
  "user_id": "user-uuid-from-jwt",
  "task_id": "task-uuid-from-url",
  "title": "Review code changes",
  "description": "Review the latest pull request",
  "priority": "High",
  "due_date": "2024-12-31T23:59:59.000Z",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "user": { "id": "...", "firstname": "...", "lastname": "...", "email": "..." },
  "task": {
    "id": "...",
    "title": "...",
    "project": { ... }
  }
}
```

**cURL Example:**

```bash
curl -X POST "http://localhost:3000/todos/create_todo/task-uuid" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review code changes",
    "priority": "High"
  }'
```

**Error Responses:**

- `403 Forbidden` - If trying to create todo for another user's task
- `404 Not Found` - If task doesn't exist

---

### 2. Update Todo(s)

**Endpoint:** `PUT /todos/update_todo`

**Authentication:** Required (JWT Bearer Token)

**Description:** Update one or more todos owned by the authenticated user. **Supports bulk updates!**

**Request Body:**

```json
{
  "todoIds": ["todo-uuid-1", "todo-uuid-2"],
  "updates": {
    "priority": "High",
    "due_date": "2024-12-31T23:59:59.000Z",
    "description": "Updated description for all todos"
  }
}
```

**Required Fields:** `todoIds` (array), `updates` (object)

**Response:**

```json
{
  "updated": 2,
  "todos": [
    {
      "id": "todo-uuid-1",
      "title": "Todo 1",
      "priority": "High",
      "due_date": "2024-12-31T23:59:59.000Z",
      "description": "Updated description for all todos",
      ...
    },
    {
      "id": "todo-uuid-2",
      "title": "Todo 2",
      "priority": "High",
      "due_date": "2024-12-31T23:59:59.000Z",
      "description": "Updated description for all todos",
      ...
    }
  ]
}
```

**cURL Example (Single):**

```bash
curl -X PUT "http://localhost:3000/todos/update_todo" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "todoIds": ["todo-uuid-1"],
    "updates": {
      "priority": "High"
    }
  }'
```

**cURL Example (Bulk):**

```bash
curl -X PUT "http://localhost:3000/todos/update_todo" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "todoIds": ["todo-uuid-1", "todo-uuid-2", "todo-uuid-3"],
    "updates": {
      "priority": "Medium",
      "due_date": "2024-12-31T23:59:59.000Z"
    }
  }'
```

**Error Responses:**

- `403 Forbidden` - If trying to update another user's todos
- `404 Not Found` - If one or more todos don't exist

---

### 3. Delete Todo(s)

**Endpoint:** `DELETE /todos/delete_todo`

**Authentication:** Required (JWT Bearer Token)

**Description:** Delete one or more todos owned by the authenticated user. **Supports bulk deletion!**

**Request Body:**

```json
{
  "todoIds": ["todo-uuid-1", "todo-uuid-2"]
}
```

**Required Fields:** `todoIds` (array)

**Response:**

```json
{
  "deleted": 2,
  "todoIds": ["todo-uuid-1", "todo-uuid-2"]
}
```

**cURL Example (Single):**

```bash
curl -X DELETE "http://localhost:3000/todos/delete_todo" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "todoIds": ["todo-uuid-1"]
  }'
```

**cURL Example (Bulk):**

```bash
curl -X DELETE "http://localhost:3000/todos/delete_todo" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "todoIds": ["todo-uuid-1", "todo-uuid-2", "todo-uuid-3"]
  }'
```

**Error Responses:**

- `403 Forbidden` - If trying to delete another user's todos
- `404 Not Found` - If one or more todos don't exist

---

## Authentication

All endpoints require JWT Bearer authentication. The token should be passed in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

The user ID is automatically extracted from the JWT token payload (`currentUser.userId`), so you never need to pass `user_id` as a parameter or in the request body.

---

## Security Features

### Ownership Validation

All endpoints verify that the authenticated user owns the resource before allowing operations:

- **Projects**: User can only create/update/delete their own projects
- **Tasks**: User can only create/update/delete their own tasks
- **Todos**: User can only create/update/delete todos for their own tasks

### Error Responses

- `401 Unauthorized` - Invalid or missing JWT token
- `403 Forbidden` - Attempting to modify another user's resources
- `404 Not Found` - Resource doesn't exist

---

## Complete Field Lists

### Project Fields

All fields from the schema are supported:

- `title` (required) - Project title
- `description` - Project description
- `source` - "Personal" | "Canvas"
- `external_id` - External system ID
- `course_code` - Course code
- `color_hex` - Hex color code (e.g., "#1D72A6")
- `time_zone` - Timezone (e.g., "America/New_York")
- `start_at` - Start date (ISO 8601)
- `end_at` - End date (ISO 8601)
- `raw_canvas_data` - JSON object with Canvas data

### Task Fields

All fields from the schema are supported:

- `title` (required) - Task title
- `project_id` - Parent project ID
- `description` - Task description
- `due_date` - Due date (ISO 8601)
- `is_all_day` - Boolean flag
- `type` (required) - "Canvas" | "Project" | "Personal"
- `priority` - "High" | "Medium" | "Low"
- `raw_canvas_data` - JSON object with Canvas data

### Todo Fields

All fields from the schema are supported:

- `title` (required) - Todo title
- `description` - Todo description
- `priority` - "High" | "Medium" | "Low"
- `due_date` - Due date (ISO 8601)

---

## Swagger Documentation

All endpoints are fully documented in Swagger UI at:

```
http://localhost:3000/api
```

You can test all endpoints directly from the Swagger interface:

1. Navigate to the appropriate section (Projects, Tasks, or Todos)
2. Click "Try it out"
3. Add your JWT token using the "Authorize" button
4. Fill in the request body
5. Execute

---

## Frontend Integration Examples

### React/TypeScript Example

```typescript
// Create a project
const createProject = async (token: string, projectData: any) => {
  const response = await fetch(
    "http://localhost:3000/projects/create_project",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    }
  );
  return response.json();
};

// Update a task
const updateTask = async (token: string, taskId: string, updates: any) => {
  const response = await fetch(
    `http://localhost:3000/tasks/update_task/${taskId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );
  return response.json();
};

// Bulk delete todos
const deleteTodos = async (token: string, todoIds: string[]) => {
  const response = await fetch("http://localhost:3000/todos/delete_todo", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todoIds }),
  });
  return response.json();
};
```

---

## Summary

**Endpoints Created:**

### Projects (3 endpoints)

- `POST /projects/create_project`
- `PUT /projects/update_project/:id`
- `DELETE /projects/delete_project/:id`

### Tasks (3 endpoints)

- `POST /tasks/create_task`
- `PUT /tasks/update_task/:id`
- `DELETE /tasks/delete_task/:id`

### Todos (3 endpoints)

- `POST /todos/create_todo/:taskId`
- `PUT /todos/update_todo` (supports bulk)
- `DELETE /todos/delete_todo` (supports bulk)

**Total: 9 new endpoints**

All endpoints:

- ✅ Use JWT Bearer authentication
- ✅ Extract user ID from token automatically
- ✅ Validate resource ownership
- ✅ Support all schema fields
- ✅ Include comprehensive Swagger documentation
- ✅ Return detailed responses with relations
- ✅ Provide proper error handling

**Build Status:** ✅ Successfully compiled with no errors
