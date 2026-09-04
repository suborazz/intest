-- CreateTable
CREATE TABLE "media_photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "media_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_videos" (
    "id" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "media_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_newspapers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publication" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "media_newspapers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_online_links" (
    "id" TEXT NOT NULL,
    "slNo" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "media_online_links_pkey" PRIMARY KEY ("id")
);
