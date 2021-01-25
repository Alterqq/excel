const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_VALUE = 120

const getWidth = (state, idx) => {
  return (state[idx] || DEFAULT_VALUE) + 'px'
}

function createCell(row, state) {
  return function(_, idx) {
    return `
      <div 
        data-col="${idx}" 
        data-id="${row}:${idx}" 
        data-type="cell"
        class="cell" 
        contenteditable
        style="width: ${getWidth(state.colState, idx)}"
      ></div>
  `
  }
}

function createCol({col, idx, width}) {
  return `
      <div 
        class="column" 
        data-type="resizable" 
        data-col="${idx}" 
        style="width: ${width}">
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

const toChar = (_, idx) => {
  return String.fromCharCode(CODES.A + idx)
}

const withWidthFrom = (state) => {
  return function(col, idx) {
    return {
      col, idx, width: getWidth(state.colState, idx)
    }
  }
}

export function createTemplate(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createCol)
      .join('')
  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row, state))
        .join('')
    rows.push(createRow(cells, row + 1))
  }
  return rows.join('')
}
