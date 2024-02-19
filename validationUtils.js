const { findSubjectRepository } = require('./repository/subjectRepository')
const { getClassRepository } = require('./repository/classRepository')
const { getTeacherRepository } = require('./repository/teacherRepository')

const getSubjectByName = async (subjectName) => {
  const data = await findSubjectRepository({ subject_name: subjectName })
  if (!data.length) {
    console.log('📚❌ Subject not found.')
    return null
  }
  if (data.length > 1) {
    console.log('📚❌ More than one subject found.')
    return null
  }
  return data[0]
}

const getClassByName = async (name) => {
  const data = await getClassRepository({ name })
  if (!data.length) {
    console.log('🏫❌ Class not found.')
    return null
  }
  if (data.length > 1) {
    console.log('🏫❌ More than one class found.')
    return null
  }
  return data[0]
}

const getTeacherByName = async (name) => {
  const data = await getTeacherRepository({ name })
  if (!data.length) {
    console.log('👨‍🏫❌ Teacher not found.')
    return null
  }
  if (data.length > 1) {
    console.log('👨‍🏫❌ More than one teacher found.')
    return null
  }
  return data[0]
}

const getTimetableBlockType = (type) => {
  const TYPES = ['P', 'L']
  if (!TYPES.includes(type.toUpperCase())) {
    console.log('📅❌ Type must be P or L.')
    return null
  }
  return type.toUpperCase()
}

const getDayByShortcut = (shortcut) => {
  const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri']
  if (!DAYS.includes(shortcut.toLowerCase())) {
    console.log('📅❌ Day must be mon, tue, wed, thu or fri.')
    return null
  }
  return DAYS.indexOf(shortcut.toLowerCase())
}

const getNumber = (number) => {
  const numberInt = parseInt(number)
  if (isNaN(numberInt) || numberInt < 1) {
    console.log('📅❌ Input must be a number.')
    return null
  }
  return numberInt
}

module.exports = {
  getSubjectByName,
  getClassByName,
  getTeacherByName,
  getTimetableBlockType,
  getDayByShortcut,
  getNumber,
}
