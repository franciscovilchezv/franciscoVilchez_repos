-- CreateTable
CREATE TABLE "Organization" (
    "id_organization" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" CHAR(50) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id_organization")
);

-- CreateTable
CREATE TABLE "Tribe" (
    "id_tribe" INT8 NOT NULL DEFAULT unique_rowid(),
    "organizationId" INT8 NOT NULL,
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id_tribe")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id_repository" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" CHAR(50) NOT NULL,
    "state" CHAR(1) NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" CHAR(1) NOT NULL,
    "tribeId" INT8 NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id_repository")
);

-- CreateTable
CREATE TABLE "Metrics" (
    "repositoryId" INT8 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Metrics_repositoryId_key" ON "Metrics"("repositoryId");

-- AddForeignKey
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id_organization") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
