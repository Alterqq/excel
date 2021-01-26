import {clone} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
  openDate: new Date().toJSON()
}

const normalize = state => {
  return {...state, currentText: '', currentStyles: defaultStyles}
}

export const normalizeInitialState = state => {
  return state ? normalize(state) : clone(defaultState)
}
