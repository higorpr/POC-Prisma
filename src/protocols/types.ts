export type Student = {
	name: string;
	cpf: string;
	birthday: Date;
	current_class_id: number;
};

export type Class = {
	name: string;
};

export type StudentHistoryEntry = {
	student_id: number;
	class_id: number;
	school_year: number;
};
