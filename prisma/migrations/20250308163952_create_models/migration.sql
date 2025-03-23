-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "nativeLang" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "questions" JSONB[],
    "language" TEXT NOT NULL,
    "improvementTip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageInsight" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "nativeSpeaker" INTEGER NOT NULL,
    "totalSpeaker" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "geoDist" TEXT[],
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserid_key" ON "User"("clerkUserid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Assessment_userId_idx" ON "Assessment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageInsight_language_key" ON "LanguageInsight"("language");

-- CreateIndex
CREATE INDEX "LanguageInsight_language_idx" ON "LanguageInsight"("language");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_language_fkey" FOREIGN KEY ("language") REFERENCES "LanguageInsight"("language") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
