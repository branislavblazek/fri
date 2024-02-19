const {
  getTimetableBlockRepository,
  removeTimetableBlockRepository,
} = require('../../repository/timetableRepository')

const removeTimetableBlock = async ({ id }) => {
  const exists = await getTimetableBlockRepository({ id })

  if (exists.length === 0) {
    console.log('📅❌ Timetable block not found.')
    return
  }

  await removeTimetableBlockRepository({ id })

  console.log('📅✅ Timetable block removed.')
}

module.exports = { removeTimetableBlock }
