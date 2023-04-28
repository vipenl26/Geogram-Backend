CREATE TABLE IF NOT EXISTS friends (
  xid UUID,
  yid UUID
);

CREATE INDEX IF NOT EXISTS friends_index
ON friends(xid, yid);