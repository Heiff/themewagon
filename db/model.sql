CREATE DATABASE themewagon;

CREATE TABLE blog(
    id serial not null primary key,
    cotegory_id int not null,
    title text not null,
    descr text not null,
    image text not null,
    view int,
    date TIMESTAMP
);

CREATE TABLE cotegory(
    id serial not null primary key,
    name varchar(64) not null
);

CREATE TABLE comment(
    id serial not null primary key,
    name varchar(32) not null,
    created TIMESTAMP not null,
    description text not null
);

CREATE TABLE admin(
    id serial not null primary key,
    username varchar(32) not null,
    password text not null
);

CREATE TABLE message(
    id serial not null primary key,
    name varchar(32) not null,
    email text not null,
    subject text not null,
    messages text not null
);