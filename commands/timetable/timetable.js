var Table = require('cli-table3')
const {
  getTimetableRepository,
} = require('../../repository/timetableRepository')

const timetable = async ({ id }) => {
  const timetableData = await getTimetableRepository()
  const weekData = timetableData.reduce(
    (acc, curr) => {
      acc[curr.day].push(curr)
      return acc
    },
    [[], [], [], [], []]
  )

  const formatCell = (cell) => ({
    colSpan: cell.duration,
    content: `${id ? `#${cell.id} ` : ''}${cell.subject_shortcut} ${
      cell.class
    } ${cell.type}\n${cell.teacher_last_name} ${cell.teacher_first_name}`,
  })

  const createEmptyCells = (count) =>
    [...Array(count).keys()].map((i) => ({
      content: '',
    }))

  const weekDataWithSpace = weekData.map((day) => {
    let actualTime = 7
    const dayWithSpaces = day.reduce((acc, curr) => {
      if (curr.hour === actualTime) {
        actualTime += curr.duration
        return [...acc, formatCell(curr)]
      }

      const diff = curr.hour - actualTime
      const spaces = createEmptyCells(diff)
      actualTime = curr.hour + curr.duration
      return [...acc, ...spaces, formatCell(curr)]
    }, [])

    if (actualTime < 20) {
      const diff = 20 - actualTime
      const spaces = createEmptyCells(diff)
      return [...dayWithSpaces, ...spaces]
    }

    return dayWithSpaces
  })

  let table = new Table({
    head: [
      '5ZYI21',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ],
    colWidths: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    style: {
      head: ['blue'],
      border: ['green'],
    },
  })

  table.push(
    { Mon: weekDataWithSpace[0] },
    { Tue: weekDataWithSpace[1] },
    { Wed: weekDataWithSpace[2] },
    { Thu: weekDataWithSpace[3] },
    { Fri: weekDataWithSpace[4] }
  )

  console.log(table.toString())
}

module.exports = { timetable }
