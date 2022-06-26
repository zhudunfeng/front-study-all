import $ from 'jquery'
import './css/1.css'
import './css/1.less'
// import './css/1.scss'

$(function () {
  $('li:odd').css('backgroundColor', 'yellow')
  $('li:even').css('backgroundColor', 'pink')
})


class Person {
  static name = 'aaa'
}
console.log(Person.name)

// ----------------------------------------------------------------
import Vue from 'vue'
//导入单文件组件
import App from './components/App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
}) 