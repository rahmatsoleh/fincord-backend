/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.dateTime('verified_at').nullable();
        table.string('token').nullable();
        table.string('profile').nullable();
        table.string('address').nullable();
        table.string('phone').nullable();
        // table.dateTime('created_at').notNullable();
        // table.dateTime('updated_at').notNullable();

        table.unique('username');
        table.unique('email');
        table.unique('phone');
        
        // default value for created_at and updated_at
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
