const { addTeacherRepository } = require('../../repository/teacherRepository')

const addTeacher = async ({ first_name, last_name }) => {
  const name = `${first_name} ${last_name}`
  const nameWithoutAccent = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  addTeacherRepository({
    first_name,
    last_name,
    search_name: nameWithoutAccent,
  })
  console.log(`👨‍🏫✅ Teacher ${first_name} ${last_name} added.`)
  return
}

module.exports = { addTeacher }
