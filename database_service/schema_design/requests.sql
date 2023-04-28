
CREATE TABLE IF NOT EXISTS requests (
  receiverid UUID,
  senderid UUID
);


CREATE INDEX IF NOT EXISTS requests_index
ON requests(receiverid, senderid);
