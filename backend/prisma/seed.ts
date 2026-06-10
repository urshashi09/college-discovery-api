import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "Jadavpur University",
        location: "Kolkata",
        fees: 12000,
        rating: 4.9
      },
      {
        name: "IEM",
        location: "Kolkata",
        fees: 120000,
        rating: 4.5
      },
      {
        name: "Heritage Institute of Technology",
        location: "Kolkata",
        fees: 150000,
        rating: 4.2
      },
      {
        name: "Techno India",
        location: "Kolkata",
        fees: 110000,
        rating: 4.0
      }
    ]
  });

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });