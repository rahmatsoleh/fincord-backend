/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notifications', (table) => {
    table.string('id').primary();
    table.string('id_ntemp').references('id').inTable('notification_temps');
    table.string('name');
    table.text('description');
    table.text('link');
    table.string('tag');
    table.boolean('is_reading');
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
