# Noki AI Backend

Educational AI Platform Backend built with NestJS, Prisma, and PostgreSQL. This backend provides a comprehensive API for managing educational projects, tasks, AI-powered conversations, and integrations with Canvas LMS and Google OAuth.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Canvas Integration](#canvas-integration)
- [API Endpoints](#api-endpoints)
- [JWT Authentication](#jwt-authentication)
- [Google OAuth](#google-oauth)
- [Usage](#usage)
- [Contributing](#contributing)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: latest LTS version)
- **PostgreSQL** 15+ (or use Docker)
- **npm** or **yarn** package manager
- **Docker** (optional, for containerized setup)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Noki-AI-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration (see Environment Variables section)
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate

   # Seed the database (optional)
   npm run prisma:seed
   ```

5. **Start the development server**

   ```bash
   npm run start:dev
   ```

6. **Access the API**
   - API: `http://localhost:3000`
   - Swagger UI: `http://localhost:3000/api`

## ✨ Features

### Authentication & Authorization

- **JWT Authentication**: Secure token-based authentication with configurable expiration
- **Google OAuth**: Support for Google Sign-In via ID token exchange and OAuth redirect flow
- **Password Hashing**: Secure password storage using bcryptjs

### Canvas LMS Integration

- **Canvas Setup**: Link Canvas institutional accounts with bearer token authentication
- **Data Synchronization**: Automatically sync Canvas courses as Projects and assignments as Tasks
- **Smart Mapping**: Automatic color assignment for projects and priority calculation for tasks
- **Data Management**: Full CRUD operations for Canvas-linked data

### AI-Powered Features

- **Conversational AI**: Chat interface with context-aware responses
- **Conversation Management**: Create, rename, and manage multiple conversations
- **Context Enrichment**: Automatic fetching of project, task, and todo details for AI context

### Project Management

- **Projects**: Organize work into projects (Personal or Canvas-sourced)
- **Tasks**: Create and manage tasks with priorities, due dates, and types
- **Todos**: Break down tasks into actionable todos
- **Resources**: Attach documents, links, notes, and media to projects and tasks

### Additional Features

- **Email Notifications**: Welcome emails and notification system
- **Swagger Documentation**: Interactive API documentation
- **Multi-provider Authentication**: Support for multiple auth providers (Canvas, Google, Microsoft)

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation ORM
- **Authentication**:
  - [JWT](https://jwt.io/) - JSON Web Tokens
  - [Passport](http://www.passportjs.org/) - Authentication middleware
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing
- **AI Integration**:
  - [OpenAI](https://openai.com/) - GPT models for AI features
  - [LangChain](https://www.langchain.com/) - AI framework
- **API Documentation**: [Swagger/OpenAPI](https://swagger.io/) - Interactive API docs
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise-based HTTP client
- **Email**: [Nodemailer](https://nodemailer.com/) - Email sending
- **Containerization**: [Docker](https://www.docker.com/) - Container platform

## 📦 Installation

### Using npm

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run start:dev
```

### Using Docker

```bash
# Start all services (PostgreSQL, Redis, App)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debug mode
- `npm run start:prod` - Start production server from dist
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database
- `npm run prisma:studio` - Open Prisma Studio

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/noki_ai_db"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"  # Token expiration time (e.g., "7d", "24h", "1h")

# Google OAuth (for Google Sign-In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Frontend URL (for OAuth redirects)
FRONTEND_URL="http://localhost:3000"

# Server Configuration
PORT=3000
NODE_ENV="development"  # or "production"
```

### AI Service Configuration

```env
# AI Server
AI_SERVER_URL="https://your-ai-server-url.com"
AI_SERVER_TOKEN="your-ai-server-bearer-token"

# OpenAI (if using OpenAI directly)
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="gpt-4"  # Default: "gpt-4"
OPENAI_MAX_TOKENS="2000"  # Default: 2000

# LangChain Configuration
LANGCHAIN_TEMPERATURE="0.7"  # Default: 0.7
LANGCHAIN_MAX_RETRIES="3"  # Default: 3

# AI Development URLs (optional)
AI_DEV_URL="http://localhost:8000/"
AI_LIVE_URL="https://your-production-ai-url.com/"
AI_BEARER_TOKEN="your-ai-bearer-token"
```

### Email Configuration (Optional)

```env
# Email Service (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-email-password"
EMAIL_FROM="noreply@noki.ai"
```

### Session Configuration (Optional)

```env
SESSION_SECRET="your-session-secret-key"
SESSION_MAX_AGE="86400000"  # 24 hours in milliseconds
```

### Prisma Configuration (Optional)

```env
PRISMA_LOG_LEVEL="info"  # Options: info, query, warn, error
```

**⚠️ Security Note**: Never commit your `.env` file to version control. Always use strong, unique secrets in production.

## 🎨 Canvas Integration

### Overview

The Canvas integration allows users to connect their Canvas LMS accounts and automatically sync courses and assignments into Noki AI.

### How It Works

1. **Setup Canvas Connection**
   - User provides their Canvas institutional URL (e.g., `https://your-school.instructure.com`)
   - User provides their Canvas API token (bearer token)
   - System validates the connection by calling Canvas API
   - Canvas auth provider is created/updated in the database

2. **Linking Canvas Data**
   - System fetches all active Canvas courses
   - Each course is created as a Project in Noki AI
   - System automatically assigns random colors to projects
   - Existing projects are updated (colors are preserved)
   - Assignments from each course are fetched and created as Tasks
   - Task priorities are automatically calculated based on:
     - Points possible (higher points = higher priority)
     - Due date proximity (nearer due dates = higher priority)

3. **Data Structure**
   - **Canvas Course → Noki Project**
     - Course name → Project title
     - Course description → Project description
     - Course code → Project course_code
     - Course dates → Project start_at/end_at
     - Raw Canvas data stored in `raw_canvas_data` JSON field
   - **Canvas Assignment → Noki Task**
     - Assignment name → Task title
     - Assignment description → Task description
     - Due date → Task due_date
     - Submission status → Task is_submitted
     - Type automatically set to `Canvas`
     - Priority calculated based on points and due date

4. **Features**
   - Automatic color assignment for projects
   - Priority calculation for tasks
   - Preservation of existing project colors on re-sync
   - Transactional data deletion for complete cleanup
   - Error handling for individual course failures

### Canvas Endpoints

- `POST /canvas/setup` - Setup Canvas integration (requires JWT)
- `POST /canvas/link-data` - Sync Canvas courses and assignments (requires JWT)
- `DELETE /canvas/delete-all` - Delete all Canvas-linked data (requires JWT)

### Canvas Token

To get your Canvas API token:

1. Log into Canvas
2. Go to Account → Settings
3. Scroll to "Approved Integrations"
4. Click "+ New Access Token"
5. Copy the generated token

**Note**: Canvas tokens are stored securely but are not hashed (they're bearer tokens, not passwords).

## 📡 API Endpoints

### Public Endpoints (No Authentication Required)

#### Authentication

- `POST /auth/register` - Register a new user
  - Body: `{ firstname, lastname, email, password }`
  - Returns: `{ access_token, user }`

- `POST /auth/login` - Login with email and password
  - Body: `{ email, password }`
  - Returns: `{ access_token, user }`

- `GET /auth/google` - Initiate Google OAuth flow (redirects to Google)
- `GET /auth/google/callback` - Google OAuth callback handler
- `POST /auth/google/token` - Exchange Google ID token for JWT
  - Body: `{ idToken: "google-id-token" }`
  - Returns: `{ access_token, user, isNewUser, message }`

#### Health Check

- `GET /ai/health` - Check AI server health status

### Protected Endpoints (JWT Token Required)

All endpoints below require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### User Profile

- `GET /auth/profile` - Get authenticated user's profile

#### Projects

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create project (legacy, requires user_id in body)
- `POST /projects/create_project` - Create project (user from JWT token)
- `PUT /projects/:id` - Update project (legacy)
- `PUT /projects/update_project/:id` - Update project (user from JWT token)
- `DELETE /projects/:id` - Delete project (legacy)
- `DELETE /projects/delete_project/:id` - Delete project (user from JWT token)
- `GET /projects/user/:userId` - Get projects by user ID

#### Tasks

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create task (legacy, requires user_id in body)
- `POST /tasks/create_task` - Create task (user from JWT token)
- `PUT /tasks/:id` - Update task (legacy)
- `PUT /tasks/update_task/:id` - Update task (user from JWT token)
- `DELETE /tasks/:id` - Delete task (legacy)
- `DELETE /tasks/delete_task/:id` - Delete task (user from JWT token)
- `GET /tasks/project/:projectId` - Get tasks by project ID

#### Todos

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get todo by ID
- `POST /todos` - Create todo (legacy, requires user_id in body)
- `POST /todos/create_todo` - Create todo (user from JWT token)
- `PUT /todos/:id` - Update todo (legacy)
- `PUT /todos/update_todo/:id` - Update todo (user from JWT token)
- `DELETE /todos/:id` - Delete todo (legacy)
- `DELETE /todos/delete_todo/:id` - Delete todo (user from JWT token)
- `GET /todos/task/:taskId` - Get todos by task ID

#### Resources

- `GET /resources` - Get all resources
- `GET /resources/:id` - Get resource by ID
- `POST /resources` - Create resource
- `PUT /resources/:id` - Update resource
- `DELETE /resources/:id` - Delete resource
- `GET /resources/project/:projectId` - Get resources by project ID
- `GET /resources/task/:taskId` - Get resources by task ID

#### Canvas Integration

- `POST /canvas/setup` - Setup Canvas integration
  - Body: `{ canvas_institutional_url, canvas_token }`
- `POST /canvas/link-data` - Sync Canvas courses and assignments
- `DELETE /canvas/delete-all` - Delete all Canvas-linked data

#### AI & Chat

- `POST /ai/chat` - Send chat message to AI
  - Body: `{ conversation_id, prompt, projects[], tasks[], todos[] }`
- `POST /ai/new_conversation` - Create a new conversation
- `GET /ai/get_conversation_history/:conversation_id` - Get conversation history
- `GET /ai/get_all_conversations` - Get all user conversations
- `PATCH /ai/rename_conversation/:conversation_id` - Rename conversation
  - Body: `{ title: "new title" }`
- `DELETE /ai/delete_conversation/:conversation_id` - Delete conversation

#### Conversations

- `GET /conversations` - Get all conversations
- `GET /conversations/:id` - Get conversation by ID
- `POST /conversations` - Create conversation
- `PUT /conversations/:id` - Update conversation
- `DELETE /conversations/:id` - Delete conversation

#### Chat Messages

- `GET /chat-messages` - Get all chat messages
- `GET /chat-messages/:id` - Get chat message by ID
- `POST /chat-messages` - Create chat message
- `PUT /chat-messages/:id` - Update chat message
- `DELETE /chat-messages/:id` - Delete chat message
- `GET /chat-messages/conversation/:conversationId` - Get messages by conversation

#### Chat

- `POST /chat/send` - Send a chat message

#### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user (admin)
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Auth Providers

- `GET /auth-providers` - Get all auth providers
- `GET /auth-providers/:id` - Get auth provider by ID
- `POST /auth-providers` - Create auth provider
- `PUT /auth-providers/:id` - Update auth provider
- `DELETE /auth-providers/:id` - Delete auth provider
- `GET /auth-providers/user/:userId` - Get auth providers by user ID

#### Notifications

- `GET /notifications` - Get all notifications
- `GET /notifications/:id` - Get notification by ID
- `POST /notifications` - Create notification
- `PUT /notifications/:id` - Update notification
- `DELETE /notifications/:id` - Delete notification

### API Documentation

Interactive API documentation is available at:

- **Swagger UI**: `http://localhost:3000/api`
- All endpoints are documented with request/response schemas
- You can test endpoints directly from Swagger UI
- Authentication is supported via "Authorize" button

## 🔒 JWT Authentication

### Why JWT?

JWT (JSON Web Tokens) is used for authentication because:

1. **Stateless**: No server-side session storage required
2. **Scalable**: Works seamlessly across multiple servers
3. **Secure**: Tokens are signed and can be verified without database lookups
4. **Flexible**: Can contain user information and custom claims
5. **Standard**: Industry-standard authentication method

### How It Works

1. **Token Generation**
   - On successful login/registration, server generates a JWT token
   - Token contains user ID (`sub`), email, and optional flags (`isGoogleUser`, `isNewUser`)
   - Token is signed with `JWT_SECRET` and expires after configured time (default: 24 hours)

2. **Token Usage**
   - Client stores the token (typically in localStorage or httpOnly cookie)
   - Client includes token in Authorization header: `Authorization: Bearer <token>`
   - Server validates token on each protected request
   - Server extracts user information from token payload

3. **Security Features**
   - Tokens are signed with a secret key (never expose `JWT_SECRET`)
   - Tokens have expiration times to limit validity
   - Invalid or expired tokens are rejected immediately
   - User ID is extracted from token, preventing token tampering

### JWT Payload Structure

```typescript
{
  sub: "user-id-uuid",           // User ID (subject)
  email: "user@example.com",     // User email
  isGoogleUser: true,            // Optional: true if authenticated via Google
  isNewUser: false,              // Optional: true if user just registered
  iat: 1234567890,               // Issued at timestamp
  exp: 1234654290                 // Expiration timestamp
}
```

### Security Best Practices

1. **Use HTTPS**: Always use HTTPS in production to prevent token interception
2. **Strong Secret**: Use a strong, random `JWT_SECRET` (minimum 32 characters)
3. **Token Expiration**: Set appropriate expiration times (e.g., 24h for web, 7d for mobile)
4. **Token Storage**: Store tokens securely (httpOnly cookies preferred over localStorage)
5. **Refresh Tokens**: Consider implementing refresh tokens for better security (future enhancement)

## 🔐 Google OAuth

### Overview

The backend supports Google OAuth authentication through two methods:

1. **OAuth Redirect Flow** (Traditional OAuth)
2. **ID Token Exchange** (Modern, recommended for SPAs and mobile apps)

### OAuth Redirect Flow

**Flow:**

1. User clicks "Sign in with Google" on frontend
2. Frontend redirects to `GET /auth/google`
3. Backend redirects to Google OAuth consent screen
4. User authorizes the application
5. Google redirects to `GET /auth/google/callback` with authorization code
6. Backend exchanges code for user info and creates/updates user
7. Backend generates JWT token and redirects to frontend with token

**Setup:**

1. Create OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com/)
2. Set authorized redirect URI: `http://localhost:3000/auth/google/callback`
3. Add credentials to `.env`:
   ```env
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
   FRONTEND_URL="http://localhost:3000"
   ```

### ID Token Exchange (Recommended)

**Flow:**

1. Frontend uses Google Sign-In library (e.g., Google Identity Services)
2. User signs in with Google, frontend receives ID token
3. Frontend sends ID token to `POST /auth/google/token`
4. Backend verifies ID token with Google's tokeninfo endpoint
5. Backend creates/updates user and returns JWT token

**Endpoint:**

```
POST /auth/google/token
Content-Type: application/json

{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyNzQ4..."
}
```

**Response:**

```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": "user-uuid",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@gmail.com",
    "profile_picture": "https://lh3.googleusercontent.com/...",
    "email_verified": true
  },
  "isNewUser": false,
  "message": "Login successful"
}
```

### Features

- **Automatic Account Creation**: New users are automatically created on first Google sign-in
- **Account Linking**: Existing users can link their Google account
- **Email Verification**: Google-authenticated users are considered email-verified
- **Profile Picture**: Automatically syncs Google profile picture
- **Onboarding**: New Google users get default project and task on registration

### Security

- ID tokens are verified with Google's tokeninfo endpoint
- Invalid or expired tokens are rejected
- Tokens are validated server-side before user creation/login
- Google user IDs are stored securely in the database

## 💻 Usage

### Example: Register and Login

```bash
# Register a new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'

# Response:
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": { "id": "...", "firstname": "John", ... }
# }

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Example: Create Project (with JWT)

```bash
# Create a project
curl -X POST http://localhost:3000/projects/create_project \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "source": "Personal",
    "color_hex": "#1d72a6"
  }'
```

### Example: Setup Canvas Integration

```bash
# Setup Canvas
curl -X POST http://localhost:3000/canvas/setup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "canvas_institutional_url": "https://your-school.instructure.com",
    "canvas_token": "your-canvas-api-token"
  }'

# Link Canvas data
curl -X POST http://localhost:3000/canvas/link-data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Example: AI Chat

```bash
# Send a chat message
curl -X POST http://localhost:3000/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "conversation_id": "conv-uuid",
    "prompt": "What tasks do I have due this week?",
    "projects": [{"project_id": "proj-uuid"}],
    "tasks": [{"task_id": "task-uuid"}]
  }'
```

### Using Swagger UI

1. Start the server: `npm run start:dev`
2. Open `http://localhost:3000/api` in your browser
3. Click "Authorize" button and enter your JWT token
4. Test endpoints directly from the Swagger interface

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Guidelines

1. **Follow SOLID Principles**: Write clean, maintainable code
2. **TypeScript Strict Mode**: Use TypeScript strictly, avoid `any` types
3. **Project Structure**: Follow the established module structure
4. **Code Style**: Use ESLint and Prettier configurations
5. **Testing**: Write tests for new features and bug fixes

### Code Style

- Use TypeScript interfaces for type definitions
- Use DTOs (Data Transfer Objects) for API request/response validation
- Follow NestJS conventions and best practices
- Use async/await for asynchronous operations
- Handle errors appropriately with proper HTTP status codes

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**: Follow coding standards and add tests
4. **Commit your changes**: Use descriptive commit messages
5. **Push to your branch**: `git push origin feature/your-feature-name`
6. **Create a Pull Request**: Provide a clear description of your changes

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

### Database Migrations

When making schema changes:

1. **Update Prisma Schema**: Edit `prisma/schema.prisma`
2. **Create Migration**: `npm run prisma:migrate`
3. **Generate Client**: `npm run prisma:generate`
4. **Test Migration**: Verify migration works on development database

### Reporting Issues

- Use GitHub Issues to report bugs or request features
- Provide clear descriptions and steps to reproduce
- Include relevant logs and error messages
- Specify environment details (OS, Node version, etc.)

## 📄 License

Private - Ruan Klopper
This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database powered by [Prisma](https://www.prisma.io/)
- AI features powered by [OpenAI](https://openai.com/) and [LangChain](https://www.langchain.com/)

---

For more information, visit the [Swagger API Documentation](http://localhost:3000/api) when the server is running.
