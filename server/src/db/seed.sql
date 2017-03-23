INSERT INTO users (username, email, password)
VALUES ('Foo', 'foo@bar.com', 'tobeimplemented');
INSERT INTO users (username, email, password)
VALUES ('John', 'John@doe.com', 'tobeimplemented');

INSERT INTO events (name, description, starttime, endtime, host)
VALUES ('Party', 'Lets celebrate', '2017-05-10 18:00:00', '2017-05-10 22:00:00', 1);

INSERT INTO participants (user_id, event_id)
VALUES (1, 1);

INSERT INTO participants (user_id, event_id)
VALUES (2, 1);

INSERT INTO comments (author, event, posted, content)
VALUES (2, 1, '2017-03-10 13:37:00', 'This is going to be great!');

INSERT INTO comments (author, event, posted, content)
VALUES (1, 1, '2017-03-10 13:37:00', 'Absolutely! Welcome!');