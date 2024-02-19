const {
  removeTeacherRepository,
  getTeacherRepository,
} = require('../../repository/teacherRepository')

const removeTeacher = async ({ name }) => {
  const isId = name.startsWith('ID_')
  const query = isId ? { id: +name.slice(3) } : { name }

  const possibleTeachers = await getTeacherRepository(query)

  if (possibleTeachers.length === 0) {
    console.log('👨‍🏫❌ Teacher not found.')
    return
  }

  if (possibleTeachers.length > 1) {
    console.log('👨‍🏫❌ More than one teacher found.')
    return
  }

  await removeTeacherRepository({ id: possibleTeachers[0].id + '' })

  console.log('👨‍🏫❌ Teacher removed.')
  return
}

module.exports = { removeTeacher }
