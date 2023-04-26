CREATE TABLE IF NOT EXISTS coordinates (
  id UUID PRIMARY KEY, 
  longitude VARCHAR(15) NOT NULL,
  latitude VARCHAR(15) NOT NULL,
  discoverradius INT NOT NULL,
  lastseen BIGINT NOT NULL
);