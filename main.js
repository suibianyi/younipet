import Vue from 'vue'
import App from './App'
import store from './store'
import uView from '@/uni_modules/uview-ui'
Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

Vue.use(uView)

uni.$u.color = '#FFDD22';
uni.$u.props.icon.color = '#444444';
uni.$u.props.button.shape = "circle";
uni.$u.props.tabs.activeStyle = {
	color: '#444444',
	fontSize: '28rpx',
}
uni.$u.props.tabs.inactiveStyle = {
	color: '#B9B9B9',
	fontSize: '28rpx',
}
uni.$u.props.tabs.lineColor = '#FFDD22'
uni.$u.props.tabs.itemStyle = 'height: 80rpx;'
uni.$u.props.input.placeholderClass = 'input-placeholder';
uni.$u.props.input.fontSize = '26rpx';
uni.$u.props.modal.showCancelButton = true;


const app = new Vue({
    ...App
})

require('./server/request.js')(app)
// import filter from './filter/index.js'
// Vue.use(filter, app)

// import httpInterceptor from '@/server/http.interceptor.js'
// Vue.use(httpInterceptor, app)

// import httpApi from '@/server/http.api.js'
// Vue.use(httpApi, app)
app.$mount()
