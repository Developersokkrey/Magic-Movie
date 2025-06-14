CREATE TABLE "Model" (
  "RecID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Name" VARCHAR NOT NULL,
  "ActorsProfile" VARCHAR,
  "Description" VARCHAR,
  "Role" VARCHAR NOT NULL CHECK ("Role" IN ('Actor', 'Actress')),
  "BirthYear" INT NOT NULL,
  "Nationality" VARCHAR,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO "Model" ("Name", "ActorsProfile", "Description", "Role", "BirthYear", "Nationality")
VALUES('John Carter','https://example.com/profiles/john.jpg','Known for action movies.','Actor',1985,'USA'),
      ('Emma Stone','https://example.com/profiles/emma.jpg','Award-winning actress.','Actress',1988,'UK'),
      ('Kenji Tanaka',NULL,NULL,'Actor',1990,'Japan');

CREATE TABLE "Studio" (
  "RecID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Name" VARCHAR NOT NULL,
  "StudioProfile" VARCHAR,
  "Description" VARCHAR
  );

CREATE TABLE "SocialMedia" (
  "RecID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Platform" VARCHAR NULL,
  "URL" VARCHAR NOT NULL,
  "ModelRecID" UUID REFERENCES "Model"("RecID") ON DELETE CASCADE
  );

  CREATE TABLE "Image" (
  "RecID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Description" VARCHAR,
  "ImageURL" VARCHAR NOT NULL,
  "ActorsRecID" UUID NOT NULL,
  "MovieRecID" UUID NOT NULL,
  "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE "Movie" (
  "RecID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "Code" VARCHAR NOT NULL UNIQUE,
  "Title" VARCHAR NOT NULL,
  "Description" VARCHAR,
  "MovieProfile" VARCHAR,
  "Years" INT NOT NULL,
  "Duration" INT NOT NULL,
  "ActorsRecID" UUID,
  "StudioRecID" UUID,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO "Movie" ("Code", "Title", "Description", "MovieProfile", "Years", "Duration", "ActorsRecID", "StudioRecID") 
VALUES 
('MV001', 'Edge of Tomorrow', 'A soldier caught in a time loop fights aliens repeatedly.', 'https://example.com/posters/edge-of-tomorrow.jpg', 2014, 113, gen_random_uuid(), gen_random_uuid()), 
('MV002', 'Inception', 'A skilled thief is given a chance at redemption if he can successfully perform inception.', 'https://example.com/posters/inception.jpg', 2010, 148, gen_random_uuid(), gen_random_uuid()), 
('MV003', 'Interstellar', NULL, NULL, 2014, 169, NULL, NULL);
