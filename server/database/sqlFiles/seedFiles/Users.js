const query = `
  DROP TABLE IF EXISTS users;

  CREATE TABLE users
  (
    email varchar(100) NOT NULL,
    user_fName varchar(40) NOT NULL,
    user_lName varchar(40) NOT NULL,
    password varchar(128) NOT NULL,
    PRIMARY KEY (email)
  );
`

module.exports = query