const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
const NotificationTemp = require('../../models/NotificationTemp');
const { all } = require('../../models/User');
const User = require('../../models/User');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notifications').del();

  const notification_temps = await NotificationTemp.all();

  const data = [];

  notification_temps.forEach((notification_temp) => {
    data.push({
      id: nanoid(),
      id_ntemp: notification_temp.id,
      name: faker.word.verb(),
      description: faker.lorem.sentence(),
      link: faker.lorem.slug(),
      is_reading: faker.datatype.boolean(),
    });
  });

  await knex('notifications').insert(data);
};
