import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }
  static className = 'excel__header'
  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `    
     <input type="text" class="input" value="${title}"/>
      <div>
        <div class="button"><span class="material-icons">close</span></div>
        <div class="button"><span class="material-icons">delete</span></div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }
}
