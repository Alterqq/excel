import {ExcelComponent} from '@core/ExcelComponent';
import {createTemplate} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize
} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  static className = 'excel__table'

  toHTML() {
    return createTemplate(20, this.store.getState())
  }

  prepare() {
    this.selecton = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selecton.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => this.selecton.current.focus())
  }

  selectCell($cell) {
    this.selecton.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selecton.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selecton.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
      'Tab'
    ]

    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selecton.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selecton.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}


