-- CreateTable
CREATE TABLE "PredictorCutoff" (
    "id" SERIAL NOT NULL,
    "examName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cutoffRank" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "PredictorCutoff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PredictorCutoff" ADD CONSTRAINT "PredictorCutoff_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
