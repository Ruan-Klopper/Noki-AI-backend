# New Endpoint: Get All User Data

## Overview

A new endpoint has been added to fetch all projects, tasks, and todos for an authenticated user in a hierarchical structure.

## Endpoint Details

**URL:** `GET /misc/all-user-data`

**Authentication:** Required (JWT Bearer Token)

**Description:** Retrieves all projects with nested tasks and todos for the authenticated user. The user is identified automatically from the JWT access token.

## Request

### Headers

```
Authorization: Bearer <your-jwt-token>
```

### Parameters

None - The user ID is extracted from the JWT token automatically.

## Response Structure

```json
{
  "resultForUserId": "user-uuid",
  "data": {
    "projects": [
      {
        "id": "project-uuid",
        "user_id": "user-uuid",
        "title": "Project Title",
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
          "name": "Project Name",
          "additional_canvas_fields": "..."
        },
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-05T00:00:00.000Z",
        "tasks": [
          {
            "id": "task-uuid",
            "user_id": "user-uuid",
            "project_id": "project-uuid",
            "title": "Task Title",
            "description": "Task description",
            "due_date": "2024-01-15T23:59:59.000Z",
            "is_all_day": false,
            "created_at": "2024-01-01T00:00:00.000Z",
            "updated_at": "2024-01-01T00:00:00.000Z",
            "type": "Project",
            "priority": "High",
            "raw_canvas_data": {
              "id": 67890,
              "name": "Task Name",
              "additional_canvas_fields": "..."
            },
            "todos": [
              {
                "id": "todo-uuid",
                "user_id": "user-uuid",
                "task_id": "task-uuid",
                "title": "Todo Title",
                "description": "Todo description",
                "priority": "Medium",
                "due_date": "2024-01-10T00:00:00.000Z",
                "created_at": "2024-01-01T00:00:00.000Z",
                "updated_at": "2024-01-01T00:00:00.000Z"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Complete Field List

### Project Fields (All Included)

- `id` - Unique project identifier
- `user_id` - User who owns the project
- `title` - Project title
- `description` - Project description (nullable)
- `source` - Source type: "Personal" | "Canvas"
- `external_id` - External identifier for Canvas integration (nullable)
- `course_code` - Course code if from Canvas (nullable)
- `color_hex` - Color for UI display (nullable)
- `time_zone` - Project timezone (nullable)
- `start_at` - Project start date (nullable)
- `end_at` - Project end date (nullable)
- `raw_canvas_data` - Original Canvas API response (JSON, nullable)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Task Fields (All Included)

- `id` - Unique task identifier
- `user_id` - User who owns the task
- `project_id` - Parent project ID (nullable)
- `title` - Task title
- `description` - Task description (nullable)
- `due_date` - Task due date (nullable)
- `is_all_day` - Whether task is all-day event
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `type` - Task type: "Canvas" | "Project" | "Personal"
- `priority` - Priority level: "High" | "Medium" | "Low" (nullable)
- `raw_canvas_data` - Original Canvas API response (JSON, nullable)

### Todo Fields (All Included)

- `id` - Unique todo identifier
- `user_id` - User who owns the todo
- `task_id` - Parent task ID
- `title` - Todo title
- `description` - Todo description (nullable)
- `priority` - Priority level: "High" | "Medium" | "Low" (nullable)
- `due_date` - Todo due date (nullable)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Data Hierarchy

The response is structured hierarchically:

- **Projects** (top level) - All projects belonging to the user
  - **Tasks** (nested in projects) - All tasks belonging to each project
    - **Todos** (nested in tasks) - All todos belonging to each task

**Note:** ALL fields from the database schema are included in the response. The Prisma ORM automatically returns all fields when using nested `include` queries.

## Sorting

The data is returned with the following sorting:

- **Projects:** Sorted by creation date (newest first)
- **Tasks:** Sorted by due date (earliest first), then by creation date
- **Todos:** Sorted by priority (High → Medium → Low), then by due date, then by creation date

## Error Responses

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Cause:** Missing or invalid JWT token

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

**Cause:** The user ID from the JWT token doesn't exist in the database

## Usage Examples

### cURL

```bash
curl -X GET "http://localhost:3000/misc/all-user-data" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### JavaScript (Fetch API)

```javascript
fetch("http://localhost:3000/misc/all-user-data", {
  method: "GET",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Axios

```javascript
import axios from "axios";

const response = await axios.get("http://localhost:3000/misc/all-user-data", {
  headers: {
    Authorization: `Bearer ${YOUR_JWT_TOKEN}`,
  },
});

console.log(response.data);
```

## Frontend Integration

This endpoint is designed to be called when:

1. The user logs in (to fetch their complete data)
2. The dashboard page loads
3. After creating/updating projects, tasks, or todos (to refresh the data)
4. When switching between different views that need the complete data structure

## Implementation Details

- **Service:** `MiscService.getAllUserData(userId: string)`
- **Controller:** `MiscController.getAllUserData(@CurrentUser() currentUser)`
- **Location:** `/src/misc/`
- **Authentication:** Uses `JwtAuthGuard` and `@CurrentUser()` decorator

## Swagger Documentation

This endpoint is automatically documented in the Swagger UI at:

```
http://localhost:3000/api
```

Navigate to the "Misc" section to see the interactive documentation and test the endpoint.
