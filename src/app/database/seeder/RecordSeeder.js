const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');
const Category = require('../../models/Category');
const User = require('../../models/User');

faker.setLocale('id_ID');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('records').del();

  // const categories_income = [
  //   { type: 'income', name: 'Gaji' },
  //   { type: 'income', name: 'Bonus' },
  //   { type: 'income', name: 'Bisnis' },
  //   { type: 'income', name: 'Investasi' },
  //   { type: 'income', name: 'Pemberian' },
  //   { type: 'income', name: 'Penjualan' },
  //   { type: 'income', name: 'Pinjaman' },
  //   { type: 'income', name: 'Hadiah' },
  // ];

  // const categories_expense = [
  //   { type: 'expense', name: 'Belanja' },
  //   { type: 'expense', name: 'Hiburan' },
  //   { type: 'expense', name: 'Investasi' },
  //   { type: 'expense', name: 'Keluarga' },
  //   { type: 'expense', name: 'Kesehatan' },
  //   { type: 'expense', name: 'Makan dan Minum' },
  //   { type: 'expense', name: 'Pendidikan' },
  //   { type: 'expense', name: 'Cicilan' },
  //   { type: 'expense', name: 'Sedekah' },
  //   { type: 'expense', name: 'Pajak' },
  //   { type: 'expense', name: 'Tagihan' },
  //   { type: 'expense', name: 'Transportasi' },
  // ];

  const users = await User.all();
  const data = [];
  for (let i = 0; i < 100; i++) {
    // every user have 10 records
    for (let j = 0; j < 20; j++) {
      const user = users[i];
      const type = Math.random() > 0.5 ? 'income' : 'expense';

      const categories = await Category.getAllByUserId(user.id);
      const categories_expense = categories.filter((c) => c.type === 'expense');
      const categories_income = categories.filter((c) => c.type === 'income');
      // if user is income, then generate income category
      let category = '';
      if (type === 'income') {
        category = categories_income[Math.floor(Math.random() * categories_income.length)];
      } else if (type === 'expense') {
        category = categories_expense[Math.floor(Math.random() * categories_expense.length)];
      }

      setTimeout(() => {
        data.push(
          {
            id: nanoid(),
            user_id: user.id,
            type,
            note: faker.lorem.sentence(),
            amount: Math.floor(Math.random() * 1000000) + 100000,
            category_id: category.id,
          },
        );
      }, 100);
    }
  }
  await knex('records').insert(data);
};
