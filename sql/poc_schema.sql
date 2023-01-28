CREATE TABLE "students" (
	"id" serial NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"birthday" DATE NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"enrollment" DATE NOT NULL DEFAULT CURRENT_DATE,
	"current_class_id" integer NOT NULL,
	CONSTRAINT "students_pk" PRIMARY KEY ("id")
);

CREATE TABLE "classes" (
	"id" serial NOT NULL UNIQUE,
	"name" text NOT NULL,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
);

CREATE TABLE "student_class_history" (
	"id" serial NOT NULL UNIQUE,
	"student_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"school_year" integer NOT NULL,
	CONSTRAINT "student_class_history_pk" PRIMARY KEY ("id")
);

ALTER TABLE
	"students"
ADD
	CONSTRAINT "students_fk0" FOREIGN KEY ("current_class_id") REFERENCES "classes"("id");

ALTER TABLE
	"student_class_history"
ADD
	CONSTRAINT "student_class_history_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");

ALTER TABLE
	"student_class_history"
ADD
	CONSTRAINT "student_class_history_fk1" FOREIGN KEY ("class_id") REFERENCES "classes"("id");

insert into classes (name) values ('1A'),('1B'),('2A'),('2B'),('3A'),('3B'),('4A'),('4B'),('5A'),('5B');
