import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Optional: clear predictor data first
  await prisma.predictorCutoff.deleteMany();

  const colleges = await prisma.college.findMany();

  if (colleges.length === 0) {
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
  }

  const allColleges = await prisma.college.findMany();

  await prisma.predictorCutoff.createMany({
    data: [
      {
        examName: "WBJEE",
        category: "General",
        cutoffRank: 5000,
        courseName: "Computer Science",
        collegeId: allColleges[0].id
      },
      {
        examName: "WBJEE",
        category: "General",
        cutoffRank: 15000,
        courseName: "Computer Science",
        collegeId: allColleges[1].id
      },
      {
        examName: "WBJEE",
        category: "General",
        cutoffRank: 25000,
        courseName: "Computer Science",
        collegeId: allColleges[2].id
      },
      {
        examName: "WBJEE",
        category: "General",
        cutoffRank: 40000,
        courseName: "Computer Science",
        collegeId: allColleges[3].id
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