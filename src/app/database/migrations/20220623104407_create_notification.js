/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notifications', (table) => {
    table.string('id').primary();
    // table.string('id_ntemp').references('id').inTable('notification_temps');
    table.string('user_id').notNullable();
    table.string('bill').notNullable();
    table.string('name');
    table.integer('tag');
    table.date('date');
    table.date('dateline');
    table.text('description');
    table.boolean('is_reading');
    table.timestamps();
    table.foreign('user_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
