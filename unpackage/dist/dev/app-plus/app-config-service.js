
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/user/user","pages/square/square","pages/user/login","pages/user/updateFace","pages/index/petInfoAll","pages/square/addFood","pages/user/foodInfo","pages/square/editFood","pages/index/foodInfoAll","pages/index/hospitalInfoAll"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#2c2c2c","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar/home-1.png","selectedIconPath":"static/tabbar/home.png","text":"主页"},{"pagePath":"pages/square/square","iconPath":"static/tabbar/msg-1.png","selectedIconPath":"static/tabbar/msg.png","text":"广场"},{"pagePath":"pages/user/user","iconPath":"static/tabbar/my-1.png","selectedIconPath":"static/tabbar/my.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"petWeb","compilerVersion":"3.6.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"主页","enablePullDownRefresh":false}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"用户信息","enablePullDownRefresh":false}},{"path":"/pages/square/square","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"广场","enablePullDownRefresh":false}},{"path":"/pages/user/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/user/updateFace","meta":{},"window":{"navigationBarTitleText":"更新头像","enablePullDownRefresh":false}},{"path":"/pages/index/petInfoAll","meta":{},"window":{"navigationBarTitleText":"宠物信息","enablePullDownRefresh":true,"onReachBottom":true}},{"path":"/pages/square/addFood","meta":{},"window":{"navigationBarTitleText":"添加商品","enablePullDownRefresh":false}},{"path":"/pages/user/foodInfo","meta":{},"window":{"navigationBarTitleText":"个人商品","enablePullDownRefresh":false}},{"path":"/pages/square/editFood","meta":{},"window":{"navigationBarTitleText":"编辑页面","enablePullDownRefresh":false}},{"path":"/pages/index/foodInfoAll","meta":{},"window":{"navigationBarTitleText":"全部食品","enablePullDownRefresh":false}},{"path":"/pages/index/hospitalInfoAll","meta":{},"window":{"navigationBarTitleText":"所有医院","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
