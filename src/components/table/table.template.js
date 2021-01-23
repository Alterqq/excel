function createCell() {
  return `
      <div class="cell" contenteditable></div>
  `
}

function createCol(col) {
  return `
      <div class="column">${col}</div>
`
}

function createRow(content, num = '') {
  return `
      <div class="row">
        <div class="row-info">${num}</div>
        <div class="row-data">${content}</div>
      </div>
`
}

const CODES = {
  A: 65,
  Z: 90
}

const toChar = (_, idx) => {
  return String.fromCharCode(CODES.A + idx)
}

/*
<div class="row">
        <div class="row-info">1</div>
        <div class="row-data">
          <div class="cell selected" contenteditable>A1</div>
          <div class="cell" contenteditable>A2</div>
          <div class="cell" contenteditable>A3</div>
        </div>
      </div>
*/

export function createTemplate(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  rows.push(createRow(cols))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('')
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}
