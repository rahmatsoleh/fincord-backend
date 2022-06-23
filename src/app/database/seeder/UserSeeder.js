const { nanoid } = require('nanoid');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

faker.setLocale('id_ID');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  await knex('users').insert([
    {
      id: nanoid(),
      name: 'Hafidz Ubaidillah',
      username: 'uba21id',
      email: 'uba21id@gmail.com',
      password: bcrypt.hashSync('12345678', 10),
      token: jwt.sign({ id: nanoid() }, 'generated-key', { expiresIn: '7d' }),
      phone: '081234567890',
      address: 'Jl. Raya Kedungkandang No.1',
    },
  ]);
  const data = [];
  for (let i = 0; i < 100; i += 1) {
    const id = nanoid();
    data.push({
      id: nanoid(),
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('12345678', 10),
      token: jwt.sign({ id }, 'generated-key', { expiresIn: '7d' }),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
    });
  }
  await knex('users').insert(data);
};
