import prisma from "../src/database/db.js";

async function main() {
	await prisma.classes.createMany({
		data: [
			{ name: "1A" },
			{ name: "1B" },
			{ name: "2A" },
			{ name: "2B" },
			{ name: "3A" },
			{ name: "3B" },
			{ name: "4A" },
			{ name: "4B" },
			{ name: "5A" },
			{ name: "5B" },
		],
	});
}

main()
	.then(() => {
		console.log("Entries successfully written");
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
