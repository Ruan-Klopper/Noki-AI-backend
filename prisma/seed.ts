import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Add your seed data here
  console.log('Seeding database...');
  
  // Example: Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'admin@noki.ai' },
    update: {},
    create: {
      email: 'admin@noki.ai',
      name: 'Admin User',
    },
  });

  console.log('Seed data created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
