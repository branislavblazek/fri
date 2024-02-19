var Table = require('cli-table3')
const { listTeachersRepository } = require('../../repository/teacherRepository')

const listTeachers = async () => {
  const teachers = await listTeachersRepository()

  const table = new Table({
    head: ['Id', 'First Name', 'Last Name'],
  })

  teachers.forEach((teacher) => {
    table.push([teacher.id, teacher.first_name, teacher.last_name])
  })

  console.log(table.toString())
}

module.exports = { listTeachers }
