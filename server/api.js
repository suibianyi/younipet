const http = uni.$u.http;
// https://www.uviewui.com/js/http.html
// post请求，获取菜单
// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
// 登录请求
export const login = (params, config = {}) => http.post('/login', params, config)
// 更新用户信息
export const updateInfo = (params, config = {custom: {auth: true}}) => http.post('/pet/user/updateInfo', params, config)
//获取用户信息
export const getUserInfo = (data) => http.get('/pet/user/info', data)

// 获取收货地址列表
export const getAddressList = (data) => http.get('/pet/address/list', data)
// export const getAddressList = (params, config = {custom: {auth: true}}) => http.post('/pet/address/list', params, config)
// 删除收货地址
export const delAddressList = (data) => http.get('/pet/address/del', data)
// 添加收货地址
export const addAddress = (params, config = {custom: {auth: true}}) => http.post('/pet/address/add', params, config)
// 修改收货地址
export const updateAddress = (params, config = {custom: {auth: true}}) => http.post('/pet/address/update', params, config)
// 设置默认收货地址
export const setDefaultAddress = (data) => http.get('/pet/address/setDefault', data)

// 添加宠物
export const addPet = (params, config = {custom: {auth: true}}) => http.post('/pet/pet/add', params, config)
// 获取宠物
export const getPet = (params, config = {custom: {auth: true}}) => http.post('/pet/pet/list', params, config)
//宠物内容更新
export const petUpdate = (params, config = {custom: {auth: true}}) => http.post('/pet/pet/update', params, config)

// 可参加活动列表
export const actTakeList = (data) => http.get('/pet/activity/takeInList', data)
// 可参加活动列表
export const actMyList = (data) => http.get('/pet/activity/myList', data)
// 可参加活动列表
export const actPastList = (data) => http.get('/pet/activity/pastList', data)
// 参加活动
export const activityJoin = (params, config = {custom: {auth: true}}) => http.post('/pet/activity/join', params, config)
// 热门活动获取
export const activityList = (params, config = {custom: {auth: true}}) => http.post('/pet/activity/list', params, config)


// 获取开通会员价格
export const vipList = (data) => http.get('/pet/vip/list', data)
// 微信支付
export const payWx = (data) => http.get('/pet/pay/wx', data)
// 创建会员订单
export const vipCreateOrder = (params, config = {custom: {auth: true}}) => http.post('/pet/vip/createOrder', params, config)
// 获取省市区列表
export const locationList = (params, config = {custom: {auth: true}}) => http.post('/pet/system/locationList', params, config)

// 获取栏目列表
export const categoryList = (params, config = {custom: {auth: true}}) => http.post('/pet/category/list', params, config)
// 获取商品列表
export const productList = (params, config = {custom: {auth: true}}) => http.post('/pet/product/list', params, config)
// 获取服务列表
export const serviceList = (params, config = {custom: {auth: true}}) => http.post('/pet/product/serviceList', params, config)
// 获取商品、服务套餐
export const productComboProduct = (data) => http.get('/pet/product/comboProduct', data)
// 获取商品库存列表
export const productStockList = (params, config = {custom: {auth: true}}) => http.post('/pet/product/stockList', params, config)
// 获取商品详情
export const productDetail = (data) => http.get('/pet/product/detail', data)
// 获取优惠券列表
export const couponList = (params, config = {custom: {auth: true}}) => http.post('/pet/coupon/list', params, config)
// 创建订单
export const orderCreat = (params, config = {custom: {auth: true}}) => http.post('/pet/order/create', params, config)
// 获取订单接口
export const orderList = (params, config = {custom: {auth: true}}) => http.post('/pet/order/list', params, config)
// 获取订单详情
export const orderDetail = (data) => http.get('/pet/order/detail', data)

// 获取服务订单号订单详情
export const payDetail = (data) => http.get('/pet/order/pay/detail', data)

// 获取购物车列表
export const getCartList = (data) => http.get('/pet/cart/list', data)
// 加入购物车
export const cartAdd = (params, config = {custom: {auth: true}}) => http.post('/pet/cart/add', params, config)
// 删除购物车列表
export const delCartList = (data) => http.get('/pet/cart/del', data)
// 更新购物车
export const updateCartList = (params, config = {custom: {auth: true}}) => http.post('/pet/cart/update', params, config)
// 获取首页数据
export const userHomePage = (data) => http.get('/pet/user/homePage', data)
// 获取个人中心数据
export const userPersonalCenter = (data) => http.get('/pet/user/personalCenter', data)
// 提交加盟信息
export const bossAdd = (params, config = {custom: {auth: true}}) => http.post('/pet/boss/add', params, config)
// 领券中心
export const couponFetchCenter = (params, config = {custom: {auth: true}}) => http.post('/pet/coupon/fetchCenter', params, config)
// 领券
export const getCoupon = (data) => http.get('/pet/coupon/getCoupon', data)
// 获取今日预约列表
export const todayBookList = (data) => http.get('/pet/serviceBook/todayBookList', data)
// 获取历史预约列表
export const historyBookList = (data) => http.get('/pet/serviceBook/list', data)
// 获取门店列表
export const storeList = (data) => http.get('/pet/store/list', data)

// 查询物流信息
export const expressTrace = (data) => http.get('/pet/order/expressTrace', data)
// 确认收货
export const orderReceive = (data) => http.get('/pet/order/receive', data)
// 退款
export const orderRefund = (params, config = {custom: {auth: true}}) => http.post('/pet/order/refund', params, config)
// 撤销退款
export const refundCancel = (params, config = {custom: {auth: true}}) => http.post('/pet/order/refundCancel', params, config)
// 预创建订单
export const preCreate = (params, config = {custom: {auth: true}}) => http.post('/pet/order/preCreate', params, config)
