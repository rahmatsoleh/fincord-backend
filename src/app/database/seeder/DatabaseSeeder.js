const UserSeeder = require('./UserSeeder');
const CategoryDefaultSeeder = require('./CategoryDefaultSeeder');
const CategorySeeder = require('./CategorySeeder');
const RecordSeeder = require('./RecordSeeder');
const SavingPlanSeeder = require('./SavingPlanSeeder');
const BillSeeder = require('./BillSeeder');
const SavingPlanRecordSeeder = require('./SavingPlanRecordSeeder');

async function DatabaseSeeder(knex) {
  await UserSeeder.seed(knex);
  await CategoryDefaultSeeder.seed(knex);
  await CategorySeeder.seed(knex);
  await RecordSeeder.seed(knex);
  await SavingPlanSeeder.seed(knex);
  await BillSeeder.seed(knex);
  await SavingPlanRecordSeeder.seed(knex);
}

exports.seed = DatabaseSeeder;
