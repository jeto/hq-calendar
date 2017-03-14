CREATE TABLE users(
  ID SERIAL PRIMARY KEY,
  NAME VARCHAR(30) NOT NULL,
  EMAIL VARCHAR(50) UNIQUE NOT NULL,
  PASSWORDHASH TEXT NOT NULL
);

CREATE TABLE events(
  ID SERIAL PRIMARY KEY,
  NAME VARCHAR(50) NOT NULL,
  DESCRIPTION TEXT,
  STARTTIME TIMESTAMP NOT NULL,
  ENDTIME TIMESTAMP,
  HOST INTEGER REFERENCES users (ID),
  CHECK (STARTTIME < ENDTIME)
);

CREATE TABLE participants(
  USER_ID INTEGER REFERENCES users (ID),
  EVENT_ID INTEGER REFERENCES events (ID),
  CONSTRAINT PARTICIPANTS_PKEY PRIMARY KEY (USER_ID, EVENT_ID)
);

CREATE TABLE comments(
  ID SERIAL PRIMARY KEY,
  AUTHOR INTEGER REFERENCES users (ID),
  EVENT INTEGER REFERENCES events (ID),
  POSTED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONTENT TEXT NOT NULL
);