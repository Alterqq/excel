import {TABLE_RESIZE} from '@/redux/types';

export const tableResize = (data) => {
  return {
    type: TABLE_RESIZE,
    data
  }
}
