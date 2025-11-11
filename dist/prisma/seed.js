"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Seeding database...");
    const password_hash = await bcrypt.hash("password123", 10);
    const user = await prisma.user.upsert({
        where: { email: "admin@noki.ai" },
        update: {},
        create: {
            firstname: "Admin",
            lastname: "User",
            email: "admin@noki.ai",
            password_hash,
        },
    });
    console.log("User created:", user);
    const project = await prisma.project.create({
        data: {
            user_id: user.id,
            title: "Sample Project",
            description: "This is a sample project for testing",
        },
    });
    console.log("Project created:", project);
    const canvasProject = await prisma.project.create({
        data: {
            user_id: user.id,
            title: "Introduction to Computer Science",
            description: "CS101 Canvas Course",
            source: "Canvas",
            external_id: "canvas-course-123",
            course_code: "CS101",
            time_zone: "UTC",
        },
    });
    console.log("Canvas Project created:", canvasProject);
    const task = await prisma.task.create({
        data: {
            user_id: user.id,
            project_id: canvasProject.id,
            title: "Complete Assignment 1",
            description: "Finish the first assignment for CS101",
            type: "Canvas",
            priority: "High",
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    console.log("Task created:", task);
    const todo = await prisma.todo.create({
        data: {
            user_id: user.id,
            task_id: task.id,
            title: "Read Chapter 1",
            description: "Read the first chapter of the textbook",
            priority: "Medium",
        },
    });
    console.log("Todo created:", todo);
    const resource = await prisma.resource.create({
        data: {
            user_id: user.id,
            task_id: task.id,
            title: "Assignment Guidelines",
            description: "PDF with assignment guidelines",
            type: "Document",
            url: "https://example.com/assignment-guidelines.pdf",
            metadata: {
                pages: 5,
                format: "pdf",
                size: "2.5MB",
            },
        },
    });
    console.log("Resource created:", resource);
    console.log("Seed data created successfully!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map