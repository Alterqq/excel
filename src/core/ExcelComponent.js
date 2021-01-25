import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
    this.store = options.store
    this.emitter = options.emitter
    this.unsubscribers = []
    this.storeSub = null
  }

  prepare() {

  }

  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  init() {
    this.initDOMListener()
  }

  destroy() {
    this.removeDOMListener()
    this.unsubscribers.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
