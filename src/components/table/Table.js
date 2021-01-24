import {ExcelComponent} from '@core/ExcelComponent';
import {createTemplate} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  static className = 'excel__table'

  toHTML() {
    return createTemplate()
  }

  onMousedown(event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    document.onmousemove = e => {
      if (event.target.dataset.resize === 'col') {
        const delta = e.pageX - coords.right
        $parent.$el.style.width = (delta + coords.width) + 'px'
      } else if (event.target.dataset.resize === 'row') {
        const delta = e.pageY - coords.bottom
        $parent.$el.style.height = (delta + coords.height) + 'px'
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
    }
  }
}
