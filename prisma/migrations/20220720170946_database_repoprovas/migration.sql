-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "termsId" INTEGER NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teachersId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "TeachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termsId_fkey" FOREIGN KEY ("termsId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachersDisciplines" ADD CONSTRAINT "TeachersDisciplines_teachersId_fkey" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachersDisciplines" ADD CONSTRAINT "TeachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
