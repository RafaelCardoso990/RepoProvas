/*
  Warnings:

  - You are about to drop the `TeachersDisciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeachersDisciplines" DROP CONSTRAINT "TeachersDisciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "TeachersDisciplines" DROP CONSTRAINT "TeachersDisciplines_teachersId_fkey";

-- DropTable
DROP TABLE "TeachersDisciplines";

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teachersId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teachersId_fkey" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
