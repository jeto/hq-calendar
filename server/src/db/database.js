import pgp from 'pg-promise';

let pg = pgp();

var conf = {
    host: 'localhost',
    port: 5432,
    database: 'calendar',
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
};

export const db = pg(conf);