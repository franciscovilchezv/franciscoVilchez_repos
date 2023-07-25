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
      id_tribe: 1,
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

  const repo3_1 = await prisma.repository.create({
    data: {
      id_repository: 3,
      name: 'Repo 3_1',
      state: 'E',
      status: 'A',
      tribeId: tribe1.id_tribe,
    },
  });

  const repo4_1 = await prisma.repository.create({
    data: {
      id_repository: 4,
      name: 'Repo 4_1',
      state: 'D',
      status: 'A',
      tribeId: tribe1.id_tribe,
    },
  });

  const repo5_1 = await prisma.repository.create({
    data: {
      id_repository: 5,
      name: 'Repo 5_1',
      state: 'E',
      status: 'A',
      tribeId: tribe1.id_tribe,
      created_date: new Date(new Date().getFullYear() - 1, 0, 1),
    },
  });

  const metrics1_1 = await prisma.metrics.create({
    data: {
      coverage: 0.76,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo1_1.id_repository,
    },
  });

  const metrics2_1 = await prisma.metrics.create({
    data: {
      coverage: 0.77,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo2_1.id_repository,
    },
  });

  const metrics3_1 = await prisma.metrics.create({
    data: {
      coverage: 0.15,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo3_1.id_repository,
    },
  });

  const metrics4_1 = await prisma.metrics.create({
    data: {
      coverage: 0.85,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo4_1.id_repository,
    },
  });

  const metrics5_1 = await prisma.metrics.create({
    data: {
      coverage: 0.85,
      bugs: 2,
      vulnerabilities: 15,
      hotspot: 1,
      code_smells: 11,
      repositoryId: repo5_1.id_repository,
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
