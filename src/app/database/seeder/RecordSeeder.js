const User = require('../../models/User');
const {faker} = require('@faker-js/faker');
faker.setLocale('id_ID');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('records').del();

    const incomes_category = [
        { type: 'income', name: 'Gaji' },
        { type: 'income', name: 'Bonus' },
        { type: 'income', name: 'Bisnis' },
        { type: 'income', name: 'Investasi' },
        { type: 'income', name: 'Pemberian' },
        { type: 'income', name: 'Penjualan' },
        { type: 'income', name: 'Pinjaman' },
        { type: 'income', name: 'Hadiah'}
    ];

    const expenses_category = [
        { type: 'expense', name: 'Belanja' },
        { type: 'expense', name: 'Hiburan' },
        { type: 'expense', name: 'Investasi' },
        { type: 'expense', name: 'Keluarga' },
        { type: 'expense', name: 'Kesehatan' },
        { type: 'expense', name: 'Makan dan Minum' },
        { type: 'expense', name: 'Pendidikan' },
        { type: 'expense', name: 'Cicilan' },
        { type: 'expense', name: 'Sedekah' },
        { type: 'expense', name: 'Pajak' },
        { type: 'expense', name: 'Tagihan' },
        { type: 'expense', name: 'Transportasi' },
    ];

    const users = await User.getAllUser();
    for (let i = 0; i < 100; i++) {
        // every user have 10 records
        for (let j = 0; j < 20; j++) {
            const user = users[i];
            const type = Math.random() > 0.5 ? 'income' : 'expense';
            
            // if user is income, then generate income category
            let category = '';
            if (type === 'income') {
                category = incomes_category[Math.floor(Math.random() * incomes_category.length)];
            } else if (type === 'expense') {
                category = expenses_category[Math.floor(Math.random() * expenses_category.length)];
            }

            const data = [
                {
                    user_id: user.id,
                    type: type,
                    note: faker.lorem.sentence(),
                    amount: Math.floor(Math.random() * 1000000) + 100000,
                    category: category.name,
                }
            ];
            await knex('records').insert(data);
        }
    }
};
