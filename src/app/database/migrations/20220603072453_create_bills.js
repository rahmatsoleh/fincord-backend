/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('bills', (table) => {
    table.string('id').primary();
    table.string('user_id').notNullable();
    table.string('name').notNullable();
    // table.text('description').nullable();
    // table.bigInteger('goal_amount').notNullable();
    // table.boolean('reminder').nullable();
    // table.integer('reminder_before').nullable();
    // table.datetime('reminder_time').nullable();
    // table.date('due_date').notNullable();
    // table.enum('type', ['yearly', 'monthly', 'weekly', 'daily']).nullable();
    // table.enum('status', ['active', 'inactive']).notNullable();
    table.bigInteger('payment').notNullable();
    table.date('date').notNullable();
    table.boolean('reminder');
    table.boolean('status_paid').notNullable();

    table.foreign('user_id').references('id').inTable('users');

    table.dateTime('deleted_at').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('bills');
};
