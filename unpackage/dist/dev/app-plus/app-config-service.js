
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/feeds/feeds","pages/me/me","pages/webview/webview","subpages/feedinfo","subpages/newinfo"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"社区论坛","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","onReachBottomDistance":100},"tabBar":{"color":"#000","selectedColor":"#0050FF","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar-icons/home.png","selectedIconPath":"static/tabbar-icons/home_1.png","text":"首页"},{"pagePath":"pages/feeds/feeds","iconPath":"static/tabbar-icons/xingqiu.png","selectedIconPath":"static/tabbar-icons/xingqiu_1.png","text":"动态"},{"pagePath":"pages/me/me","iconPath":"static/tabbar-icons/mine.png","selectedIconPath":"static/tabbar-icons/mine_1.png","text":"个人中心"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"community-forum","compilerVersion":"3.6.18","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/feeds/feeds","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"动态中心","enablePullDownRefresh":false}},{"path":"/pages/me/me","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/webview/webview","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/subpages/feedinfo","meta":{},"window":{"navigationBarTitleText":"动态详情","enablePullDownRefresh":false}},{"path":"/subpages/newinfo","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});