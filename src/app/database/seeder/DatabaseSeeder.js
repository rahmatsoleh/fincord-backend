const UserSeeder = require('./UserSeeder');
const CategorySeeder = require('./CategorySeeder');
const RecordSeeder = require('./RecordSeeder');
const SavingPlanSeeder = require('./SavingPlanSeeder');
const BillSeeder = require('./BillSeeder');
const BillRecordSeeder = require('./BillRecordSeeder');

async function DatabaseSeeder(knex) {
    await UserSeeder.seed(knex);
    await CategorySeeder.seed(knex);
    await RecordSeeder.seed(knex);
    await SavingPlanSeeder.seed(knex);
    await BillSeeder.seed(knex);
 
}

exports.seed = DatabaseSeeder;