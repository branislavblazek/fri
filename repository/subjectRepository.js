const { knex } = require('../db')

const findSubjectRepository = async ({ subject_name }) => {
  const data = await knex('subject').where(
    'search_name',
    'like',
    `%${subject_name.toLowerCase()}%`
  )
  return data
}

module.exports = { findSubjectRepository }
