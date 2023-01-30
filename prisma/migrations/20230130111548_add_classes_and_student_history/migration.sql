-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "classes_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_class_history" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "school_year" INTEGER NOT NULL,

    CONSTRAINT "student_class_history_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "enrollment" DATE NOT NULL DEFAULT CURRENT_DATE,
    "current_class_id" INTEGER NOT NULL,

    CONSTRAINT "students_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_cpf_key" ON "students"("cpf");

-- AddForeignKey
ALTER TABLE "student_class_history" ADD CONSTRAINT "student_class_history_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_class_history" ADD CONSTRAINT "student_class_history_fk1" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_fk0" FOREIGN KEY ("current_class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
