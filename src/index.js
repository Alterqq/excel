import './module'
import '@/scss/style.scss'
console.log('Hello world!')

const fn = async () => {
  return await Promise.resolve('async is working')
}
fn().then(console.log)
