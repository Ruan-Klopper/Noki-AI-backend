import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create a default user
  const password_hash = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@noki.ai' },
    update: {},
    create: {
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@noki.ai',
      password_hash,
    },
  });

  console.log('User created:', user);

  // Create a sample project
  const project = await prisma.project.create({
    data: {
      user_id: user.id,
      title: 'Sample Project',
      description: 'This is a sample project for testing',
    },
  });

  console.log('Project created:', project);

  // Create a sample course
  const course = await prisma.course.create({
    data: {
      user_id: user.id,
      source: 'Canvas',
      external_id: 'canvas-course-123',
      title: 'Introduction to Computer Science',
      course_code: 'CS101',
      time_zone: 'UTC',
    },
  });

  console.log('Course created:', course);

  // Create a sample task
  const task = await prisma.task.create({
    data: {
      user_id: user.id,
      project_id: project.id,
      course_id: course.id,
      title: 'Complete Assignment 1',
      description: 'Finish the first assignment for CS101',
      type: 'Canvas',
      priority: 'High',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  console.log('Task created:', task);

  // Create a sample todo
  const todo = await prisma.todo.create({
    data: {
      user_id: user.id,
      task_id: task.id,
      title: 'Read Chapter 1',
      description: 'Read the first chapter of the textbook',
      priority: 'Medium',
    },
  });

  console.log('Todo created:', todo);

  // Create a sample resource
  const resource = await prisma.resource.create({
    data: {
      user_id: user.id,
      task_id: task.id,
      title: 'Assignment Guidelines',
      description: 'PDF with assignment guidelines',
      type: 'Document',
      url: 'https://example.com/assignment-guidelines.pdf',
      metadata: {
        pages: 5,
        format: 'pdf',
        size: '2.5MB',
      },
    },
  });

  console.log('Resource created:', resource);

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
