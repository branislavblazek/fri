const { knex } = require('../db')

const getClassRepository = async ({ name }) => {
  const data = await knex('class').where('name', name)
  return data
}

module.exports = { getClassRepository }
