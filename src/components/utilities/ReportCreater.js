export const ReportCreater = (content) => {
  let areas = []
  let resultTable = '<table>'

  resultTable += '<tr><td>Area</td>'
  content.fields.map((e) => {
    resultTable += `<td>${Object.keys(e).join()}</td>`
  })
  resultTable += '</tr>'

  for (let area in content.listOfAreas) {
    if (content.listOfAreas[area].listOfNotes.length > 0) {
      areas.push({ [content.listOfAreas[area].name]: content.listOfAreas[area].listOfNotes })
    }
  }
  areas.forEach((el) => {
    let areaName = Object.keys(el)
    el[Object.keys(el)].forEach((el) => {
      resultTable += `<tr><td>${areaName}</td>`
      content.fields.map((e) => {
        for (let data in el[0]) {
          if (data !== 'id' && Object.keys(e).join() === data) {
            resultTable += `<td>${el[0][data].value}</td>`
          }
        }
      })
      resultTable += `</tr>`
    })
  })
  resultTable += '</table>'
  return resultTable
}
