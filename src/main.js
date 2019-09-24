// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/js/rem'

Vue.config.productionTip = false

// 处理返回来的日期格式 
Vue.prototype.formatDate = function(secs) {
    var t = new Date(secs.replace(/-/g, '/'))
    var year = t.getFullYear()
    var month = t.getMonth() + 1
	if (month < 10) { month = '0' + month };
    var date = t.getDate()
	 if (date < 10) { date = '0' + date };
    return year + '-' + month + '-' + date;
};

Vue.prototype.format = function(secs) {
    var t = new Date(secs)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
	if (month < 10) { month = '0' + month };
    var date = t.getDate()
	 if (date < 10) { date = '0' + date };
    return year + '-' + month + '-' + date;
};

// 把封装的axios挂载到原型上
import baseJS from './api'
Vue.prototype.baseJs = baseJS

import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

import { IndexList, IndexSection } from 'mint-ui';
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
