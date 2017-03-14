import pgp from 'pg-promise';

let pg = pgp();

var conf = {
    host: 'localhost',
    port: 5432,
    database: 'calendar'
    // user: 'user-name',
    // password: 'user-password'
};

export const db = pg(conf);