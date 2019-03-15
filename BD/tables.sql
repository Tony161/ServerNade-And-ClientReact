CREATE DATABASE Zadanie;

CONNECT Zadanie;

CREATE TABLE People (
  id integer NOT NULL PRIMARY KEY  AUTO_INCREMENT,
  name varchar(150) NOT NULL,
  surname varchar(150) NOT NULL,
  company varchar(150) NOT NULL
);

INSERT INTO People (id, name, surname, company)
    VALUES (1, 'Rufina', 'Valieva', 'TagaZ');

INSERT INTO People (id, name, surname, company)
    VALUES (2, 'Viktor', 'Kuzmenko', 'TagAz');

INSERT INTO People (id, name, surname, company)
    VALUES (3, 'Eduard', 'Kuznetsov', 'Home');

INSERT INTO People (id, name, surname, company)
    VALUES (4, 'Viktor', 'Surnev', 'CompaN');

INSERT INTO People (id, name, surname, company)
    VALUES (5, 'Evgeny', 'Danilov', 'Ukos');

ALTER TABLE People
  ADD image varchar(150) NULL;
