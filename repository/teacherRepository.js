const { knex } = require('../db')

const getTeacherRepository = async ({ name, id }) => {
  var teacher = []

  if (name)
    teacher = await knex('teacher')
      .where('search_name', 'like', `%${name.toLowerCase()}%`)
      .select()

  if (id) teacher = await knex('teacher').where('id', id).select()

  return teacher
}

const addTeacherRepository = async ({ first_name, last_name, search_name }) => {
  await knex('teacher').insert({ first_name, last_name, search_name })
}

const listTeachersRepository = async () => {
  const teachers = await knex('teacher').select()
  return teachers
}

const removeTeacherRepository = async ({ id }) => {
  await knex('teacher').where('id', id).del()
}

module.exports = {
  getTeacherRepository,
  addTeacherRepository,
  listTeachersRepository,
  removeTeacherRepository,
}
