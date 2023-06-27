/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('saving_records', (table) => {
    table.string('id').primary();
    table.string('saving_plan_id').notNullable().references('id').inTable('saving_plans');
    table.string('user_id').nullable();
    table.longText('save').nullable();
    table.date('date').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('saving_records');
};
