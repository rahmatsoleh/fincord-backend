const UserSeeder = require('./UserSeeder');
const CategoryDefaultSeeder = require('./CategoryDefaultSeeder');
const CategorySeeder = require('./CategorySeeder');
const RecordSeeder = require('./RecordSeeder');
const SavingPlanSeeder = require('./SavingPlanSeeder');
const BillSeeder = require('./BillSeeder');
const SavingPlanRecordSeeder = require('./SavingPlanRecordSeeder');
const NotificationTempSeeder = require('./NotificationTempSeeder');
const NotificationSeeder = require('./NotificationSeeder');

async function DatabaseSeeder(knex) {
  await CategoryDefaultSeeder.seed(knex);
  await UserSeeder.seed(knex);
  await CategorySeeder.seed(knex);
  await RecordSeeder.seed(knex);
  await SavingPlanSeeder.seed(knex);
  await BillSeeder.seed(knex);
  await SavingPlanRecordSeeder.seed(knex);
  await NotificationTempSeeder.seed(knex);
  await NotificationSeeder.seed(knex);
}

exports.seed = DatabaseSeeder;
