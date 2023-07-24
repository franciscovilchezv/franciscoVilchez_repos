import { PrismaClient } from '@prisma/client';

console.log(`Seeding database ${process.env.DATABASE_URL}`);
const prisma = new PrismaClient();

async function main() {
  const org1 = await prisma.organization.create({
    data: {
      name: 'Organization 1',
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      name: 'Organization 2',
    },
  });

  const tribe1 = await prisma.tribe.create({
    data: {
      name: 'Tribe 1',
      status: 1,
      organizationId: org1.id_organization,
    },
  });

  const tribe2 = await prisma.tribe.create({
    data: {
      name: 'Tribe 2',
      status: 2,
      organizationId: org2.id_organization,
    },
  });

  const repo1_1 = await prisma.repository.create({
    data: {
      id_repository: 1,
      name: 'Repo 1_1',
      state: 'E',
      status: 'A',
      tribeId: tribe1.id_tribe,
    },
  });

  const repo2_1 = await prisma.repository.create({
    data: {
      id_repository: 2,
      name: 'Repo 2_1',
      state: 'E',
      status: 'A',
      tribeId: tribe1.id_tribe,
    },
  });

  const repo2 = await prisma.repository.create({
    data: {
      id_repository: 3,
      name: 'Repo 2',
      state: 'D',
      status: 'I',
      tribeId: tribe2.id_tribe,
    },
  });

  const metrics1_1 = await prisma.metrics.create({
    data: {
      coverage: 10,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo1_1.id_repository,
    },
  });

  const metrics2_1 = await prisma.metrics.create({
    data: {
      coverage: 10,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo2_1.id_repository,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
