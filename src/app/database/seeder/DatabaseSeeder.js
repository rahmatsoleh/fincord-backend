// call UserSeeder dan RecordSeeder to here
const UserSeeder = require('./UserSeeder');
const RecordSeeder = require('./RecordSeeder');

async function DatabaseSeeder(knex) {
    await UserSeeder.seed(knex);
    await RecordSeeder.seed(knex);
}

exports.seed = DatabaseSeeder;