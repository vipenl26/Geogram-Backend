CREATE TABLE IF NOT EXISTS messages (
    messageid SERIAL PRIMARY KEY,
    conversationid VARCHAR(73) NOT NULL,
    messagedata TEXT NOT NULL,
    messagetimestamp TIMESTAMP NOT NULL,
    incoming BOOLEAN NOT NULL
);

CREATE INDEX IF NOT EXISTS messages_conversationid_index
ON messages(conversationid);