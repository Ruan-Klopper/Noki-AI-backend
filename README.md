# Noki AI Backend

Educational AI Platform Backend built with NestJS, Prisma, and PostgreSQL.

## Project Structure

```
noki-ai-backend/
├── prisma/                      # Prisma schema & migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── app.module.ts            # Root app module
│   ├── main.ts                  # Entry point
│
│   ├── common/                  # Shared utilities
│   │   ├── decorators/          # e.g., @CurrentUser()
│   │   ├── filters/             # Exception filters
│   │   ├── guards/              # Auth guards (JWT, Google OAuth)
│   │   ├── interceptors/
│   │   ├── middleware/
│   │   └── utils/
│
│   ├── config/                  # App-wide config (env, constants)
│   │   ├── prisma.config.ts
│   │   ├── auth.config.ts
│   │   └── ai.config.ts
│
│   ├── database/
│   │   ├── prisma.service.ts    # Prisma integration
│   │   └── seed/                # Seeding scripts
│
│   ├── auth/                    # Authentication & accounts
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/          # JWT, Google OAuth, etc.
│   │   └── dtos/
│
│   ├── users/                   # Users core
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dtos/
│
│   ├── canvas/                  # Canvas API integration
│   │   ├── canvas.module.ts
│   │   ├── canvas.controller.ts
│   │   ├── canvas.service.ts
│   │   └── dtos/
│
│   ├── ai/                      # AI service (LangChain / OpenAI integration)
│   │   ├── ai.module.ts
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   └── prompts/             # Prebuilt AI prompts/templates
│
│   ├── projects/                # Projects module
│   │   ├── projects.module.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── dtos/
│
│   ├── courses/                 # Courses module
│   │   ├── courses.module.ts
│   │   ├── courses.controller.ts
│   │   ├── courses.service.ts
│   │   └── dtos/
│
│   ├── tasks/                   # Tasks module
│   │   ├── tasks.module.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── dtos/
│
│   ├── todos/                   # Todos module
│   │   ├── todos.module.ts
│   │   ├── todos.controller.ts
│   │   ├── todos.service.ts
│   │   └── dtos/
│
│   ├── resources/               # Resources module
│   │   ├── resources.module.ts
│   │   ├── resources.controller.ts
│   │   ├── resources.service.ts
│   │   └── dtos/
│
│   ├── integrations/            # Future-proof (Google Classroom, MS Teams, etc.)
│   │   ├── google/
│   │   │   ├── google.module.ts
│   │   │   ├── google.service.ts
│   │   │   └── dtos/
│   │   └── microsoft/
│
│   └── notifications/           # Optional: email/push/WebSocket
│       ├── notifications.module.ts
│       ├── notifications.service.ts
│       └── dtos/
│
├── test/                        # Unit & e2e tests
│   ├── auth/
│   ├── users/
│   └── ...
│
├── .env                         # Local env vars
├── .env.example                 # Example env
├── docker-compose.yml           # DB & service containers
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

### Using Docker

```bash
docker-compose up -d
```

## API Endpoints

- `GET /` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `GET /users` - Get all users
- `POST /tasks` - Create task
- `GET /tasks` - Get all tasks
- `POST /ai/generate` - Generate AI content
- `GET /canvas/courses` - Get Canvas courses

## Technologies Used

- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Passport** - Authentication strategies
- **OpenAI** - AI integration
- **LangChain** - AI framework
- **Docker** - Containerization

## Contributing

1. Follow SOLID principles
2. Write tests for new features
3. Use TypeScript strictly
4. Follow the established project structure

## License

Private - Noki AI Team