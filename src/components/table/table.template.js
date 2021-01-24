function createCell(row) {
  return function(_, idx) {
    return `
      <div 
        data-col="${idx}" 
        data-id="${row}:${idx}" 
        data-type="cell"
        class="cell" 
        contenteditable
      ></div>
  `
  }
}

function createCol(col, idx) {
  return `
      <div class="column" data-type="resizable" data-col="${idx}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
      </div>
`
}

function createRow(content, idx) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
      <div class="row" data-type="resizable">
        <div class="row-info">
          ${idx ? idx : ''}
          ${resize}
        </div>
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

export function createTemplate(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')
    rows.push(createRow(cells, row + 1))
  }
  return rows.join('')
}
