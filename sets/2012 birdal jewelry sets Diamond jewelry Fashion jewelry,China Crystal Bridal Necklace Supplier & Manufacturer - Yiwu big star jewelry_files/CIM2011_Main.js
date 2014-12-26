var CIMSoftVersion = '2012-07-27 06:21:22'; 

 /*
  * 判断浏览器类型
  */
var ua = navigator.userAgent.toLowerCase();
var check = function(r){
	return r.test(ua);
};

var isOpera = check(/opera/);
var isChrome = check(/\bchrome\b/);
var isWebKit = check(/webkit/);
var isSafari = !isChrome && check(/safari/);
var isIE = !isOpera && check(/msie/);
var isIE7 = isIE && check(/msie 7/);
var isIE8 = isIE && check(/msie 8/);
var isIE9 = isIE && check(/msie 9/);
var isIE6 = isIE && !isIE7 && !isIE8 && !isIE9;


var Fps = {};

/***
 * 检测运行环境
 */

Fps.Environment = {
	/***
	 * 获取浏览器版本
	 */
	getBrowser: function() {
		 var browser = {};  
		 var userAgent = navigator.userAgent.toLowerCase();  
		 var s;  
		 (s = userAgent.match(/msie ([\d.]+)/))  
		 ? browser.ie = s[1]  
		 : (s = userAgent.match(/firefox\/([\d.]+)/))  
		 ? browser.firefox = s[1]  
		 : (s = userAgent.match(/chrome\/([\d.]+)/))  
		 ? browser.chrome = s[1]  
		 : (s = userAgent.match(/opera.([\d.]+)/))  
		 ? browser.opera = s[1]  
		 : (s = userAgent  
		 .match(/version\/([\d.]+).*safari/))  
		 ? browser.safari = s[1]  
		 : 0;  
		 var version = "";  
		 if (browser.ie) {  
			 version = 'IE ' + browser.ie; 
		 } else if (browser.firefox) {  
			 version = 'FireFox ' + browser.firefox;  
		 } else if (browser.chrome) {  
			 version = 'Chrome ' + browser.chrome;  
		 } else if (browser.opera) {  
			 version = 'Opera ' + browser.opera;  
		 } else if (browser.safari) {  
			 version = 'Safari ' + browser.safari;  
		 } else {  
			 version = '未知浏览器';  
		 }  
		 
		 return version;  
	},

	/***
	 * 获取操作系统信息
	 */
	getSystem: function() {
		try {
			var osVersion;
			
			if (ua.indexOf('chrome') != -1 || (ua.indexOf('firefox') != -1 && ua.indexOf('firefox/3.0') == -1)) {
				osVersion = ua.split(" ")[3];
				var osV = osVersion.split(";")[0];
			} else {
				osVersion = ua.split(";")[2];
				var osV = osVersion.substr(osVersion.length-3, 3);
			} 
			
			switch(osV) {
				case "5.0":
					return "Win2000";
					break;
				case "5.1":
					return "WinXP";
					break;
				case "5.2":
					return "Win2003";
					break;
				case "6.0":
					return "WinVISTA";
					break;
				case "6.1":
					return "Win7";
					break;
				default: 
					return "Others";
					break;
			} 
		} catch(e) {
			return '';
		}
	},

	/***
	 * 获取操作系统语言
	 */
	getSysLang: function() {
		var osLan = ua.split(";")[3];
		return osLan;
	},

	/***
	 * 获取操作系统屏幕分辨率
	 */
	getResolution: function() {
		return screen.width + '×' + screen.height;
	},

	/***
	 * 获取网站域名
	 */
	getDomain: function() {
		return window.location.host.split(':')[0];
	}
};var debugPoint = '';
var pageImagePath;
Fps.Config = {
	version 	   : typeof Fps_Conf_version        != "undefined" ? Fps_Conf_version         : "2011V1.0_0421",
	//逻辑接口服务器 调试使用
	logicServer	   : typeof Fps_Conf_LogicServer    != "undefined" ? Fps_Conf_LogicServer     : "10.cq3w.cn",
	//逻辑接口端口 调试使用
	logicPort 	   : typeof Fps_Conf_logicPort      != "undefined" ? Fps_Conf_logicPort   	  : "8080",
	//ng服务器端口 调试使用
	ngPort 		   : typeof Fps_Conf_ngPort  		!= "undefined" ? Fps_Conf_ngPort 		  : "80",
	//通讯服务器 调试使用
	socketServer   : typeof Fps_Conf_socketServer   != "undefined" ? Fps_Conf_socketServer    : "im.1681860.net",
	//通讯服务器端口 调试使用
	socketPort 	   : typeof Fps_Conf_socketPort     != "undefined" ? Fps_Conf_socketPort 	  : "18888",
	//静态文件路径 调试使用
	staticFilePath : typeof Fps_Conf_staticFilePath != "undefined" ? Fps_Conf_staticFilePath  : "sns/",
	//用户签名 主面板中展现
	userIograph    : typeof Fps_Conf_userIograph    != "undefined" ? Fps_Conf_userIograph     :  "", 
	//企业ID 调试使用
	shopId         : typeof Fps_Conf_shopId   	    != "undefined" ? Fps_Conf_shopId	  : "0",
	iconShopId	   : typeof Fps_Conf_iconShopId    !="undefined" ?  Fps_Conf_iconShopId:"0",
	//雷达序号 调试使用
	webWadarIndex  : typeof Fps_Conf_webWadarIndex  != "undefined" ? Fps_Conf_webWadarIndex	  : "0",
	//用户状态 调试使用
	userStatus 	   : typeof Fps_Conf_userStatus 	!= "undefined" ? Fps_Conf_userStatus      : "10",
	//客户端类型 调试使用
	clientType 	   : typeof Fps_Conf_clientType     != "undefined" ? Fps_Conf_clientType	  : "",
	//加载在页面中的flash Object标签Name 调试使用
	socketFlashObj : typeof Fps_Conf_socketFlashObj != "undefined" ? Fps_Conf_socketFlashObj  : "FpsXmlSocket", 
	//立体层次基准 调试使用
	baseZIndex 	   : typeof Fps_Conf_baseZIndex     != "undefined" ? Fps_Conf_baseZIndex 	  : 10,
	//软件名称 
	softName 	   : typeof Fps_Conf_softName       != "undefined" ? Fps_Conf_softName 	      : "WEBIM",
	//关闭窗口时是否清除上次聊天记录 实施部门使用
	showLastChatLogNum : typeof Fps_Conf_showLastChatLogNum  != "undefined" ? Fps_Conf_showLastChatLogNum : 0,
	//判断是否是代理上网 实施部门使用
	connectType        : typeof Fps_Conf_connectType 	!= "undefined" ? Fps_Conf_connectType     : "socket", 
	//聊天窗口大小 默认值非常重要 不适合可能引起选项卡样式异常 实施部门使用
	chatSize 	   : typeof Fps_Conf_chatSize 		!= "undefined" ? Fps_Conf_chatSize  : {width:522, height:380},
	//聊天窗口自适应屏幕 调试使用
	chatSizeAuto : typeof Fps_Conf_chatSizeAuto  != "undefined" ? true  : false,
	//主界面大小 实施部门使用
	imSize		   : typeof Fps_Conf_imSize 		!= "undefined" ? Fps_Conf_imSize     	  : {width:150, height:300},
	//用户登录后的会话ID 调试使用
	sessionId	   : typeof Fps_Conf_sessionId 		!= "undefined" ? Fps_Conf_sessionId       : "",
	//默认发送快捷键  实施部门使用
	sendKey        : typeof Fps_Conf_sendKey        != "undefined" ? Fps_Conf_sendKey         : "enter",   
	//点击小图标触发的事件
	smalliconClickEvent : typeof Fps_Conf_smalliconClickEvent  != "undefined" ?  Fps_Conf_smalliconClickEvent  : false, //message
	//是否根据状态改变头像 实施部门使用 未实现
	isChangeStatusImg   : typeof Fps_Conf_isChangeStatusImg  != "undefined" ?  Fps_Conf_isChangeStatusImg  : true, 
	//客户端的控件信息 实施部门使用
	webImActiveX		: typeof Fps_Conf_webImActiveX  != "undefined" ?  Fps_Conf_webImActiveX : {id:"cimClient", classId:"BEDA3B3F-7292-4CFF-A9C2-84D0600796BC"}, 
	//是否web启动唤醒客户端功能 实施部门使用
	isWakeCs 			: typeof Fps_Conf_isWakeCs != "undefined" ? Fps_Conf_isWakeCs : true, 
	//桌面客户端应用名称 
	appName : typeof Fps_Conf_appName != "undefined" ? Fps_Conf_appName : 'exeName', 
	//本机没有登录客户端软件时 启动web聊天 实施部门使用
	isNotLoginStartWebIm : typeof Fps_Conf_isNotLoginStartWebIm != "undefined" ? Fps_Conf_isNotLoginStartWebIm : false,  
	//网站登录用户的登录名 无需带域名后缀  实施部门使用 直接启动桌面客户端
	wakeCsClientLoginId : typeof Fps_Conf_wakeCsClientLoginId != "undefined" ? Fps_Conf_wakeCsClientLoginId : "", 
	//是否允许离线留言   实施部门使用
	isAllowOfflineTalk : typeof Fps_Conf_isAllowOfflineTalk != "undefined" ? Fps_Conf_isAllowOfflineTalk : true, 
	//访客别名   实施部门使用
	guestName 		   : typeof Fps_Conf_guestName != "undefined" ? Fps_Conf_guestName : "", 
	//保存聊天记录的条数限制 调试使用
	saveChatLogNum 	   : typeof Fps_Conf_saveChatLogNum != "undefined" ? Fps_Conf_saveChatLogNum : 40,
	//弹出式窗口的默认大小的页面地址
	pcwWindowPath 	   : typeof Fps_Conf_pcwWindowPath != "undefined" ? Fps_Conf_pcwWindowPath : false,
	//是否显示欢迎窗口   实施部门使用 未实现
	welcomeIsShow	   : typeof Fps_Conf_welcomeIsShow != "undefined" ? Fps_Conf_welcomeIsShow : true,
	//欢迎界面的问候语 实施部门使用
	welcomeGreetings   : typeof Fps_Conf_welcomeGreetings != "undefined" ? Fps_Conf_welcomeGreetings : '',
	welcomeGreetingsEng : typeof Fps_Conf_welcomeGreetings_eng != "undefined" ? Fps_Conf_welcomeGreetings_eng : '',
    //是否发送来访提示 实施部门使用
	isSendVisitMsg     : typeof Fps_Conf_isSendVisitMsg != "undefined" ? Fps_Conf_isSendVisitMsg : true,
	//是否启用查看访客输入信息功能 是否启动消息预知功能 未实现
	isLookGuestInputMsg : typeof Fps_Conf_isLookGuestInputMsg != "undefined" ? Fps_Conf_isLookGuestInputMsg : true,
	//是否允许访客发送短信 未实现
	allowGuestSendSms : typeof Fps_Conf_allowGuestSendSms != "undefined" ? Fps_Conf_allowGuestSendSms : true,
	//聊天窗口右侧版面地址 实施部门使用
	chatRightUri : typeof Fps_Conf_chatRightUri != "undefined" ? Fps_Conf_chatRightUri : "http://i.api.tradevv.com/webFormContentInfomation.aspx?AllUser_GUID={theUserId}&lg={theLang}",
	//聊天窗口右侧版面宽度 实施部门使用
	chatRightSize  : typeof Fps_Conf_chatRightSize  != "undefined" ? Fps_Conf_chatRightSize : {width:150},
	//是否允许发送图标信息 实施部门使用
	isAllowSendImgMsg : typeof Fps_Conf_isAllowSendImgMsg != "undefined" ? Fps_Conf_isAllowSendImgMsg : true,
	//表情的个数  实施部门使用
	faceNum : typeof Fps_Conf_faceNum != "undefined" ? Fps_Conf_faceNum : 96,
	//加载完后触发 调试使用
	onReady	: typeof Fps_Conf_onReady != "undefined" ? Fps_Conf_onReady : function(){},
	//接口调用地址 调试使用
	httpUrl : typeof Fps_Conf_httpUrl != "undefined" ? Fps_Conf_httpUrl : "",
	//当网站来访客时是否自动发送来访信息 
	radar : { autoSendToFriendList : "off", autoSendToIconUsers :  typeof Fps_Conf_autoSendICON != "undefined" ? Fps_Conf_autoSendICON : "off" },
	//聊天窗口类型  内部打开 外部打开 调试使用
	chatType : typeof Fps_Conf_chatType != "undefined" ? 'out' : 'inner',
	//是否启用最近联系人功能 默认不启用  实施部门使用
	useRecentContacts : typeof Fps_Conf_useRecentContacts != "undefined" ? Fps_Conf_useRecentContacts : false,
	//采用的皮肤类型 调试使用
	styleType : typeof Fps_Conf_styleType != "undefined" ? Fps_Conf_styleType : '0-0',
	//软件颜色 调试使用
	colorType : typeof Fps_Conf_colorType != "undefined" ? Fps_Conf_colorType : '0',
	//表示是弹出式的聊天窗口文件 调试使用
	isOutChat : typeof Fps_Conf_isOutChat != "undefined" ? Fps_Conf_isOutChat : false,
	//是否启用多页面聊天  调试使用
	isMoreChat : typeof Fps_Conf_isMoreChat != "undefined" ? Fps_Conf_isMoreChat : true,
	//自定义留言板页面  实施部门使用
	customMessageAddress : typeof Fps_Conf_customMessageAddress != "undefined" ? Fps_Conf_customMessageAddress : '',
	//自定义软件标志图片 实施部门使用
	customSoftICON : typeof Fps_Conf_customSoftICON != "undefined" ? Fps_Conf_customSoftICON : '',
	//自定义客服人员头像 实施部门使用
	customServiceHeadImage: typeof Fps_Conf_customServiceHeadImage != "undefined" ? Fps_Conf_customServiceHeadImage : '',
	//自定义 托盘按钮 实施部门使用
	customTrayButton: typeof Fps_Conf_customTrayButton != "undefined" ? Fps_Conf_customTrayButton : '',
	//自定义主面板上部广告 实施部门使用
	customMainTopPanel: typeof Fps_Conf_customMainTopPanel != "undefined" ? Fps_Conf_customMainTopPanel : '',
	//自定义主面板下部广告 实施部门使用
	customMainButtomPanel: typeof Fps_Conf_customMainButtomPanel != "undefined" ? Fps_Conf_customMainButtomPanel : '',
	//自定义主面板下部工具栏广告 实施部门使用
	customMainButtomBarPanel: typeof Fps_Conf_customMainButtomBarPanel != "undefined" ? Fps_Conf_customMainButtomBarPanel : '',
	//自定义网络电话接口
	customNetPhone: typeof Fps_Conf_customNetPhone != "undefined" ? Fps_Conf_customNetPhone : '',
	//自定义客服名片
	customServiceCard: typeof Fps_Conf_customServiceCard != "undefined" ? Fps_Conf_customServiceCard : '',
	//自定义主界面显示位置
	customMainPostion: typeof Fps_Conf_customMainPostion != "undefined" ? Fps_Conf_customMainPostion : '',
	//自定义主界面显示位置
	isOldCssMode: typeof Fps_Conf_isOldCssMode != "undefined" ? Fps_Conf_isOldCssMode : false,
	//联系人数量的上限
	maxConcatNumber: typeof Fps_Conf_maxConcatNumber != "undefined" ? Fps_Conf_maxConcatNumber : 20,
	//是否隐藏 用户选项卡
	isHiddenWindHead: typeof Fps_Conf_isHiddenWindHead != "undefined" ? Fps_Conf_isHiddenWindHead : true,
	//自动问候句 开场
	autoWelcomeContent: typeof Fps_Conf_autoWelcomeContent != "undefined" ? Fps_Conf_autoWelcomeContent : '',
	//打开弹出式窗口
	isOpenNewPageChat: typeof Fps_Conf_isOpenNewPageChat != "undefined" ? Fps_Conf_isOpenNewPageChat : false,
	//窗口类型  Normal 普通  CustomOutPage 用户设置后 打开弹出式窗口的页面 SystemOutPage 系统弹出后的新聊天窗口
	windowType:  typeof Fps_Conf_windowType != "undefined" ? Fps_Conf_windowType : 'Normal',
	//自定义留言函数
	messageFunction:  typeof Fps_Conf_messageFunction != "undefined" ? Fps_Conf_messageFunction : false,
	//是否显示评分
	isShowScore: typeof Fps_Conf_isShowScore != "undefined" ? Fps_Conf_isShowScore : true,
	//是否显示企业电话
	isShowComanyPhone: typeof Fps_Conf_isShowComanyPhone != "undefined" ? Fps_Conf_isShowComanyPhone : true,
	//是否在聊天窗口中显示账号
	isShowLoginIdInChatWindow: typeof Fps_Conf_isShowLoginIdInChatWindow != "undefined" ? Fps_Conf_isShowLoginIdInChatWindow : false,
	//设置站点ID
	siteGroupId: typeof Fps_Conf_siteGroupId != "undefined" ? Fps_Conf_siteGroupId : 1,
	//设置聊天的容器div id       将窗口指定在Div中显示
	chatWindowContainerId: typeof Fps_Conf_chatWindowContainerId != "undefined" ? Fps_Conf_chatWindowContainerId : false,
	//定制对话按钮 （小图标）
	customTalkButton: typeof Fps_Conf_customTalkButton != "undefined" ? Fps_Conf_customTalkButton: false,
	//是否启用留言板功能
	messageBroadEnable: typeof Fps_Conf_messageBroadEnable != "undefined" ? Fps_Conf_messageBroadEnable: '1',
	//定制聊天窗口右下角广告
	rightBottomAdvertising: typeof Fps_Conf_RightBottomAdvertising != "undefined" ? Fps_Conf_RightBottomAdvertising: ' ',
	
	//是否启用发送短信功能
	sendSMSEnable: typeof Fps_Conf_sendSMSEnable != "undefined" ? Fps_Conf_sendSMSEnable: '1',
	//对话按钮 用户数据信息 
	chatButtonUsersData: typeof Fps_Conf_userList != "undefined" ? Fps_Conf_userList: false,
	//对用户列表客服名称进行处理 
    listServiceName: typeof Fps_Conf_listServiceName !="undefined" ? Fps_Conf_listServiceName:'',

	
	
	// 免费版新增配置 -----------------------------------------------------------------------------------------------------------------
	
	// 联系人列表的类型  list 列表 / single 单个
	contactListStyle: typeof Fps_Conf_contactListStyle != "undefined" ? Fps_Conf_contactListStyle: 'list',
	
	// 单个联系人方式的图片
	singleCantactImg: typeof Fps_Conf_singleCantactImg != "undefined" ? Fps_Conf_singleCantactImg: 'TopPanel.png',
	
	// 欢迎窗口的背景图
	welcomeWinodwBackground: typeof Fps_Conf_welcomeWinodwBackground != "undefined" ? Fps_Conf_welcomeWinodwBackground: false,
	
	// 广告 [{text:'文本', link:'连接地址'}]
	advertising: typeof Fps_Conf_advertising != 'undefined' ? Fps_Conf_advertising : false,
	
	// 企业简介
	companyInfo: typeof Fps_Conf_companyInfo != 'undefined' ? Fps_Conf_companyInfo : false,
	
	// 常见问题
	commonQuestions: typeof Fps_Conf_commonQuestions != 'undefined' ? Fps_Conf_commonQuestions : false,
	
	// 逻辑接口的版本
	logicServerVersion: typeof Fps_Conf_logicServerVersion != 'undefined' ? Fps_Conf_logicServerVersion :  false,
	
	// 是否启用访客接入机制
	isChatQueue: typeof Fps_Conf_isChatQueue != 'undefined' ? Fps_Conf_isChatQueue :  false,
	
	//获取顶部工具栏广告
	getMainButtomBarPanel: function() {
		if (this.customMainButtomBarPanel == '') {
			return {
				content: ''
			};
		} else {
			return this.customMainButtomBarPanel;
		}
	},
	
	
	//获取顶部广告
	getMainTopPanel: function() {
		if (this.contactListStyle == 'single')
		{
			return {
				content: '<img src="' + this.singleCantactImg + '" onClick="parent.Fps.cl.openWelcomeChat();">',
				height: '135px',
				width: '120px'
			};
		}
		
		if (this.customMainTopPanel == '') {
			return {
				content: '',
				height: '0px',
				width: '0px'
			};
		} else {
			this.customMainTopPanel.width = this.customMainTopPanel.width.toString();
			if (this.customMainTopPanel.width.indexOf('px') == -1)
			{
				this.customMainTopPanel.width += 'px';
			}
			
			this.customMainTopPanel.height = this.customMainTopPanel.height.toString();
			if (this.customMainTopPanel.height.indexOf('px') == -1)
			{
				this.customMainTopPanel.height += 'px';
			}
			return this.customMainTopPanel;
		}
	},
	
	//获取底部广告
	getMainButtomPanel: function() {
		if (this.customMainButtomPanel == '') {
			return {
				content: '',
				height: 0,
				width: 0
			};
		} else {
			return this.customMainButtomPanel;
		}
	},
	
	//获取客服人员头像图片
	getServiceHeadImage: function() {
		if (this.customServiceHeadImage == '') {
			//alert(Fps_Conf_tempHtmlPath);
			if(pageImagePath == null){
				pageImagePath = Fps_Conf_tempHtmlPath + '/image/outline.gif';
			}
			return pageImagePath;
		} else {
			pageImagePath=this.customServiceHeadImage;
			return this.customServiceHeadImage;
		}
	},
	
	//获取托盘按钮
	getTrayButton: function() {
		if (this.customTrayButton != '') {
			return this.customTrayButton;
		} else {
			return {
				LeftButtonImage: Fps_Conf_tempHtmlPath + '/View/UserListClose/close.gif',
				RightButtonImage: Fps_Conf_tempHtmlPath + '/View/UserListClose/close.gif',
				ButtonWidth: 40,
				ButtonHeight: 41
			};
		}
	},
	
	//获取服务器地址	
	getServer: function() {
		return "http:\/\/" + this.logicServer + ":" + this.logicPort;
	},
		
	//逻辑接口前缀
	getLogicHead: function() {
		return this.getServer() + "/cimls/service/HttpService?function=";
	},
	
	//文件处理路径前缀
	getUpLoadFileHead: function() {
		return this.getServer() + "/cimls/service/";
	},
	
	//上传文件地址
	getSendFileURL: function() {
		//return this.getUpLoadFileHead() + '/UserFileUpload';
		return this.getUpLoadFileHead() + '/WebUserFileUpload';
	},
	
	//系统图片路径
	getSystemImage: function() {
		return "http:\/\/" + this.logicServer + ":" + this.ngPort + "/cimls/images/";
	},
	
	//获取站点跟目录
	getSiteRootPath: function() {
		 
		return this.getServer() + "/cimls/";
	},
	//设置免费电话目录
	getCallSiteRootPath: function(){
		return "http://sms.4006681860.com:8080/sms/";
		
	},
		
	//获取系统默认头像
	getDefaultUserHeadImg: function() {
		return this.getSystemImage() + "userface/0-40-10.gif";
	},

	//获取嵌入页面地址 
	getCsPage: function() {
		return this.getSiteRootPath() + "CsPage/html/testflash/";
	},
	
	getWindowType: function() {
		if (this.windowType == 'CustomOutPage') {
			if (window.location.href.indexOf('OutChat') != -1) {
				this.windowType = 'SystemOutPage';
			}
		}
		
		return this.windowType;
	}
};
/**
 * 模拟的堆栈数据类型
 */
Fps.Stack = function () {
	var s = new Array();
	
	/***
	 * 表示压入栈的数据项
	 * @param value 压入的数据 
	 */
	this.push = function (value) {
		var t = new Array();
		t[0] = value;
		s = t.concat(s);
	};
	
	/***
	 * 表示压入栈的数组
	 * @param value 压入的数组 
	 */
	this.arrayPush = function (value) {
		s.push(value);
	};
	
	/***
	 * 出栈
	 */
	this.pop = function () {
		return s.shift();
	};
	
	/***
	 * 包含所有栈内数据的数组
	 */
	this.getAllElement = function () {
		return s;
	};
	
	/***
	 * 删除数据
	 * @param id 数据在栈中的key 
	 */
	this.remove = function (id) {
		var temp = [];
		
		for (var i=0;i<s.length;i++) {
			if(s[i] == id){
				continue;
			}
			
			temp.push(s[i]);
		}
		
		s = temp;
	};
	
	/***
	 * 表示栈内是否包含数据
	 */
	this.isNull = function () {
		return s.length == 0 ? true : false;
	};
	
	/***
	 * 返回栈内第一个数据项，但不删除
	 */
	this.getFrist = function () {
		return s[0];
	};
	
	/***
	 * 表示要设置的数据项
	 */
	this.setFrist = function (value) {
		for (var i=0; i<s.length; i++) {
			if (s[i] == value) {
				s.splice(i, 1); //删除数组项
			}
		}
		
		this.push(value);
	};
};


/**
 * 用户自定义方法
 */
Fps.UserFunc = {
	/**
	 * 获取当前日期
	 */
	getNow: function() {
		var t = new Date();
		var m = (t.getMonth() + 1) < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1).toString();
		var d = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
		var h = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
		var mi = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
		var s = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
		var str = '<label class="fps_hidden">' + t.getFullYear().toString() + "-" +  m + "-" +  d + '</label>&nbsp;' + h + ":" + mi + ":" + s;
		return str;
	},
	
	/**
	 * 获取一个不重复的随机序列号
	 */
	aloneId: function() {
		var t = new Date();
		var str = t.getTime();
		return str;
	},
	
	/**
	 * 给字符串中填充参数
	 * @param str 字符串
	 * @param parArr 参数数组
	 */
	getSetPar: function(str, parArr){
		var newStrArr = [];
		
		for(var i=0; i<str.length; i++){
			if(str.charAt(i) == '?'){
				newStrArr.push(parArr.shift());
			}else{
				newStrArr.push(str.charAt(i));
			}
		}
		
		return newStrArr.join('');
	},
	
	/**
	 * 过滤框架属性
	 * 过滤各种框架技术在Object对象扩展的属性，避免其影响系统本身运行
	 * @param key String 要检测的属性名称
	 */
	isFilterAtt: function(key) {
		var filter = 'prototype,extend,toJSONString';
		//有多余的属性
		if(filter.indexOf(key.toString()) != -1) {
			return true;
		}else {
			return false;
		}
	},
	
	/**
	 * 过滤html标记
	 * @param str 需要过滤的字符串
	 */
	removeHtml: function (str) {
		str = str.replace(/<\/?[^>]+>/g,''); //去除HTML tag
		str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
		str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
		return str;
	}
};/**
 * 自主研发的模拟事件
 */
 
Fps.UserEvent = {
	/**
	 * 快速加载
	 * @param fun 加载后要执行的函数
	 */
	quickLoad: function(fun) {
		if (document.body && document.body.firstChild) {
			Fps.Global.pageIsAddEle = true;
			fun();
		} else {
			setTimeout(function(){
				Fps.UserEvent.quickLoad(fun);
			}, 200);
		}
	},
	
	/**
	 * 网页加载完成后加载
	 * @param fun 加载后要执行的函数
	 */
	onReady: function(fun) {
		if(Fps.Global.pageIsReady == true){
			fun();
			return;
		}
		
		if (window.addEventListener) {
			window.addEventListener("DOMContentLoaded", fun, false );
		} else {
			try {
				document.documentElement.doScroll("left");
				fun();
			}catch (e) {
				setTimeout(function(){Fps.UserEvent.onReady(fun);}, 0);
				return;
			}
		}
	},
	
	/**
	 * 添加事件
	 * @param o 被添加事件的对象
	 * @param eveType 事件类型
	 * @param eveFun 处理该事件的委托函数
	 */

	 addEventListener: function(o, eveType, eveFun){
		if (o) {
			if (isIE) {
				if (eveType.indexOf('on') != 0) {
					o.attachEvent("on"+eveType, eveFun);
				} else {
					o.attachEvent(eveType, eveFun);
				}
			} else {
				if (eveType.indexOf('on') == 0) {
					eveType = eveType.substring(2);
				}
				o.addEventListener(eveType, eveFun, false);
			}
		}
	 },
	 
	/**
	 * 删除事件
	 * @param o 被删除事件的对象
	 * @param eveType 事件类型
	 * @param eveFun 处理该事件的委托函数
	 */
	removeEventListener: function(o,eveType,func){
		if (o) {
			
			if (isIE) {
				o.detachEvent("on"+eveType, func);
			} else {
				o.removeEventListener(eveType, func,false);
			}
		}
	}
};/**
 * 自主研发的模拟事件
 */
 
Fps.UserEvent = {
	/**
	 * 快速加载
	 * @param fun 加载后要执行的函数
	 */
	quickLoad: function(fun) {
		if (document.body && document.body.firstChild) {
			Fps.Global.pageIsAddEle = true;
			fun();
		} else {
			setTimeout(function(){
				Fps.UserEvent.quickLoad(fun);
			}, 200);
		}
	},
	
	/**
	 * 网页加载完成后加载
	 * @param fun 加载后要执行的函数
	 */
	onReady: function(fun) {
		if(Fps.Global.pageIsReady == true){
			fun();
			 ;
		}
		
		if (window.addEventListener) {
			window.addEventListener("DOMContentLoaded", fun, false );
		} else {
			try {
				document.documentElement.doScroll("left");
				fun();
			}catch (e) {
				setTimeout(function(){Fps.UserEvent.onReady(fun);}, 0);
				return;
			}
		}
	},
	
	/**
	 * 添加事件
	 * @param o 被添加事件的对象
	 * @param eveType 事件类型
	 * @param eveFun 处理该事件的委托函数
	 */

	 addEventListener: function(o, eveType, eveFun){
		if (o) {
			if (isIE) {
				if (eveType.indexOf('on') != 0) {
					o.attachEvent("on"+eveType, eveFun);
				} else {
					o.attachEvent(eveType, eveFun);
				}
			} else {
				if (eveType.indexOf('on') == 0) {
					eveType = eveType.substring(2);
				}
				o.addEventListener(eveType, eveFun, false);
			}
		}
	 },
	 
	/**
	 * 删除事件
	 * @param o 被删除事件的对象
	 * @param eveType 事件类型
	 * @param eveFun 处理该事件的委托函数
	 */
	removeEventListener: function(o,eveType,func){
		if (o) {
			
			if (isIE) {
				o.detachEvent("on"+eveType, func);
			} else {
				o.removeEventListener(eveType, func,false);
			}
		}
	}
};


/***************************************************

	类名称: Fps.drag
	类描述: 鼠标拖动UI业务逻辑类
	开发人员：尹彦明
	构造函数参数:
		@Param o : HTML DOM Element | 触发事件的元素
		@Param t : HTML DOM Element | 拖动的窗口对象
	全局方法:
		moveWin         : 移动窗口
		disSelect       : 禁止选中
		enSelect        : 恢复选择
		onDrag          : 拖动之前的执行函数，执行拖动前的初始化工作
		onDragMove      : 拖动时候执行的函数，执行坐标运算并使被拖动对象移到新坐标
		onDragUp        : 停止拖动时执行的函数，释放之前使用的一切资源。
		
	工作流程:

*****************************************************/
Fps.drag = function (o, t, startFun, endFun) {
    /****************************************************
    * @Param l : String | css left属性的值
    * @Param t : String | css top属性的值数
    * @Param w : String | css width属性的值
    * @Param h : String | css height属性的值
    * @Return  : 新的DIV DOM对象

    *****************************************************/

    function moveWin(l, t, w, h){
        var o = Fps.DOM.createDom("div");
        o.style.left = l;
        o.style.top = t;
        o.style.width = w;
        o.style.height = h;
        o.style.position = "absolute";
        o.style.zIndex = "10010";
        o.style.border = "#666 1px solid";
        o.id = "WebimRecover";
        Fps.DOM.myInsertDom(o);
        return o;
    }


    function disSelect(o) {
		return;
        for (var i=0;i<Fps.dragLayerArray.length;i++) {
            Fps.addClass(Fps.dragLayerArray[i], "disableSelect");
        }
    }

    function enSelect(o) {
		return;
        for (var i=0;i<Fps.dragLayerArray.length;i++) {
            Fps.removeClass(Fps.dragLayerArray[i], "disableSelect");
        }
    }

    //让event变成e;
    function adjustEvent(e){
        if(isIE){
            e = event;
        }

        return e;
    }

    var startX = 0, startY = 0, moveDiv = null;
    var x=0, y=0, moveX=0, moveY=0, newX=0, newY=0;

    function onDrag (e) {
        e = adjustEvent(e);
		
        (this.MouseMoveDelegate && onDragUp(e));

        if (startFun) {
            startFun();
        }

        if (!isIE) {
            disSelect();
        }

        t.style.cursor = "move";
        startX = e.clientX;
        startY = e.clientY;

        //监控鼠标拖动事件
        if (t.setCapture) {
            t.setCapture();
        } else if(window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);//
        }

        x = 0;
        y = 0;
        moveX = 0;
        moveY = 0;
        newX = 0; 
        newY = 0;

        this.MouseMoveDelegate = function(eventArg){
            eventArg = adjustEvent(eventArg);
            onDragMove(eventArg);
            if(!isIE)
            eventArg.returnValue = false;
        };

        this.MouseUpDelegate = function(eventArg){
            eventArg = adjustEvent(eventArg);
            onDragUp(eventArg);
        };

        Fps.UserEvent.addEventListener(document,"mousemove",this.MouseMoveDelegate);
        Fps.UserEvent.addEventListener(document,"mouseup",this.MouseUpDelegate);
    }

    function onDragMove (e) {
        //清除拖动选中的文字和图片等元素

        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        //修复IE鼠标右键可能导致的mouseup不释放
        if(isIE && !e.button){ onDragUp(e);}
        x = e.clientX; 
        y = e.clientY;
        moveX = x - startX;
        moveY = y - startY; //计算移动距离
        //新的坐标位置
        var h = document.body.scrollHeight;
        var ph = Fps.DOM.getBodyHeight();
        var w = Fps.DOM.getBodyWidth();
        newX = t.offsetLeft + moveX ;
        newY = t.offsetTop + moveY;

        if( newY<=0) {newY=2;  } // 试图拖出当前页的页眉以上的时候，上坐标恒=2

        //if(newY>=h-t.offsetHeight)newY= h - t.offsetHeight-2; //试图拖出页脚的时候，下坐标恒=页内容高度减去当前元素高度
        t.style.left = newX+"px";
        t.style.top = newY+"px";
        startX = x, startY = y;
    }

    function onDragUp (e) {
        t.style.cursor = "";
        var left = t.offsetLeft;

        if (left < 0) {
        	left = "0px";
        } else if (left > Fps.DOM.getBodyWidth - t.clientWidth - 2) {
            left = Fps.DOM.getBodyWidth() - t.clientWidth - 2 + "px";
        } else {
            left = left + "px";
        }

        var top = t.offsetTop;
        top = top < 0 ? "0px" : top + "px";
        //防止拖动出界
        t.style.left = left;
        t.style.top = top;  
        Fps.UserEvent.removeEventListener(document,"mousemove",this.MouseMoveDelegate);
        this.MouseMoveDelegate = null;
        Fps.UserEvent.removeEventListener(document,"mouseup",this.MouseUpDelegate);
        this.MouseUpDelegate = null;
        //取消监控

        if (t.releaseCapture) {
        	t.releaseCapture();
        } else if (window.captureEvents) {
            window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);//
        }

        //拖动之后的函数回调
        if (endFun) {
        	endFun();
       	}
        
		if (!isIE) {
        	enSelect();
        }
    }

    if(o){
		o.onmousedown = function (e){
        	onDrag(e);
        };
    } 
};/**
 * 用户全局变量
 * 系统中所有的全局变量都在这里声明
 */

Fps.Global = {
	// 存储全局对象
	globalObjects: {},
	
	// 添加全局对象
	addObject: function(key, object) {
		this.globalObjects[key] = object;
	},
	
	// 获取全局对象
	getObject: function(key) {
		return this.globalObjects[key];
	},
	
	// Dom元素基点
	baseNode: null,
	// 登录用户基本数据
	user: {},
	// 用户对象集合 包括好友、访客等
	users: {},
	// 用户对象集合 包括好友、访客 只存储ID
	usersArr: [],
	// 在线用户数据
	onlineUserArr: [],
	// 用户数据是否已经读取完成
	userDataIsLoaded: false,
	// 通讯服务器是否连接成功
	connectIsReady: false,
	// 聊天消息对象 
	chatHashTable: {},
	// 存储本次聊天的所有用户信息 包括陌生人
	tempChatUsersIndex: {},
	tempChatUsersArr: [],
	// 页面是否已经可以添加元素
	pageIsAddEle: false,
	// 页面的html的代码是否已经输出完成 
	pageIsReady: false,
	// 来访提醒消息是否已经发送
	guestMsgIsSended: false,
	// 用户状态缓存
	userStatusShared: {},
	// 陌生人数据
	strangerArray: [],
	// 本机是否安装有客户端软件
	hasCsClient: false,
	// 本机客户端软件是否登录
	clientIsLogined: false,
	// 当前发送消息的用户ID
	currentSendUser: '',
	// 好友列表的窗口对象
	userListWindow: null,
	userListClass: null,
	// 单个客服形式的联系人列表
	singleUserListClass: null,
	singleUserListWindow: null,
	
	// 聊天的窗口对象
	chatClass: null,
	// 邀请窗口
	welcomeWindow: null,
	// 邀请窗口对象
	welcomeClass: null,
	//邀请提示窗口
	visitWndow:null,
	//邀请提示对象
	visitClass:null,
	
	// 普通窗口
	windowClass: null,
	//
	windowWindow: null,
	
	userListCloseClass: null,
	// 界面模块是否已经加载
	UILoaded: false,
	// 用户列表是否已经显示过
	userListBuilded: false,
	// 聊天窗口的打开方式
	chatWindowType: 'in',
	// 用户设置外部打开聊天窗口
	openNewWinChat: false,
	// 聊天窗口代码加载完成标记
	chatJsComplete: false,
	// 客服列表代码加载完成标记
	userListJsComplete: false
};

//会话窗口
Fps.chatUserStack = new Fps.Stack();


//判断登录类型
//小图标方式
if (Fps.Config.shopId == "0") {
	Fps.Config.clientType = "guest";
	//企业客服方式
} else {
	Fps.Config.clientType = "shopguest";
}


/**
 * 子网页的回调事件函数
 */
Fps.PageCallBack = {
	/**
	 * 聊天窗口代码加载完毕后回调此函数
	 */
	onChatLoaded: function() {
		Fps.Global.chatJsComplete = true;
		Fps.Config.onReady();
	},
	
	/**
	 * 客服列表代码加载完毕后回调此函数
	 */
	onUserListLoaded: function(){
		Fps.Global.userListJsComplete = true;
	}
};/**
 * 获取DOM属性 扩展DOM方法
 */Fps.DOM = {
	/**
	 * 获取页面滚动条的高度
	 */
	getScrollTop: function() {
		 
		if(document.body.scrollTop && document.body.scrollTop > 0) {
			return document.body.scrollTop;
		}
		
		if(document.documentElement && document.documentElement.clientWidth > 0) 
		{
			return document.documentElement.scrollTop;
		}
		
		return 0;
	},
	
	/**
	 * 获取页面的宽度
	 */
	getBodyWidth: function() {
		var clientWidth = 0;

		if(window.innerWidth){
			clientWidth = window.innerWidth;
		}else if(document.documentElement && document.documentElement.clientWidth){
			clientWidth = document.documentElement.clientWidth;
		}else if(document.body.clientWidth){
			clientWidth = document.body.clientWidth;
		}
	
		return clientWidth;
	},
	
	/**
	 * 获取页面的高度
	 */
	getBodyHeight: function() {
		var clientHeight = 0;
		
		if(window.innerHeight){
			clientHeight = window.innerHeight;
		}else if(document.documentElement && document.documentElement.clientHeight){
			clientHeight = document.documentElement.clientHeight;
		}else if(document.body.clientHeight){
			clientHeight = document.body.clientHeight;
		}
	
		return clientHeight;
	},
	
	/**
	 * 删除DOM元素
	 */
	removeDom: function(o) {
		try { 
			o.parentNode.removeChild(o); 
		} catch (e) {
		}
	},
	
	/**
	 * 隐藏DOM元素
	 * @param o 表示需要隐藏的HTML DOM对象
	 */
	hiddenDom: function(o) {
		if(o) {
			o.style.display = "none";
		}
	},
	
	/**
	 * 显示DOM元素
	 * @param o 表示需要隐藏的HTML DOM对象
	 */
	showDom: function(o) {
		if(o.style.display == 'none') {
			o.style.display = "";
		}
	},
	
	/**
	 * 创建DOM元素
	 * @param domType 要创建的HTML DOM标签
	 */
	createDom: function(domType) {
		return document.createElement(domType);
	},
	
	/**
	 * 获取DOM元素
	 * @param domId 要创建的HTML DOM ID
	 */
	getDom: function(domId) {
		return document.getElementById(domId);
	},
	
	/**
	 * 自创插入方法可以在网页未加载完成前 添加DOM元素
	 * @param o 要添加DOM对象
	 */
	myInsertDom: function(o) {
		if (Fps.Global.baseNode) {
			document.body.insertBefore(o, Fps.Global.baseNode);
		} else {
			document.body.insertBefore(o, document.body.firstChild);
			Fps.Global.baseNode = o;
		}
	}};                                                                                                                                              /***
 * 操作ocx控件完成 唤醒客户端聊天窗口、从网页上直接登录客户端等操作
 */

Fps.ActiveX = {
	
	activeXObj: null, //ActiveX对象
	
	hasCsClient: false, //是否安装了客户端软件
	
	loginId: '', //当前登录用户的登录名称
	
	clientIsLogined: false, //客户端是否已经登录

	appName: 'exeName', //应用程序名称
	
	is2011: false,
	
	/***
	* 加载Active插件
	* @param id 插件编号 String
	* @param classid object编号 String
	* @param w 宽度
	* @param h 高度
	* @param parantId 容器Id
	*/

	add: function(id, classid, w, h, parantId){
		parantId = 'CIMAcitve';
		var str = '<OBJECT id="'+id+'" name="'+id+'" classid="clsid:'+classid+'" width=0 height=0 hspace=0 vspace=0></OBJECT>';
		
		//如果之前没有加载 现在开始加载
		if (!document.getElementById(parantId)) {
			var d = document.createElement("label");
			d.id = parantId;
			document.body.insertBefore(d, document.body.firstChild);
		}
		
		//此处注意 一定要先加载然后设置innerHTML 不可倒置
		document.getElementById(parantId).innerHTML = str;
		//初始化插件对象
		this.activeXObj = document.getElementById(id); 
		delete d;
	},

	/**
	 * 检测本机是否已经安装了ActiveX插件
	 */
	checkCsClient: function() {
		var isHasActiveX = false; //是否安装了插件
		
		if (!!document.all) {
			
			try { //检测是否是2011版的新Active
				this.activeXObj.GetClientInstalled(this.appName);
				this.is2011 = true;
				isHasActiveX = true;
			} catch(e) {
				try {
					this.activeXObj.IsClientInstalled();
					isHasActiveX = true;
				} catch(e) {
				}
			}
			
		} else {
			//检测是否是2011版的新Acti
			if (typeof this.activeXObj.GetClientInstalled == "function") {
				this.is2011 = true;
				isHasActiveX = true;
			}
			
			if (typeof this.activeXObj.IsClientInstalled == "function") {
				isHasActiveX = true;
			}
		}
		
		//有插件检查是否安装了客户端软件
		if (this.is2011) {

			if (isHasActiveX && this.activeXObj.GetClientInstalled(this.appName) == 1) {
				this.hasCsClient = true;
			}
			
		} else {
			
			if (isHasActiveX && this.activeXObj.IsClientInstalled() == 1) {
				this.hasCsClient = true;
			}
			
		}
		
		//已经安装了客户端软件判断是否已登录
		if (this.hasCsClient && this.activeXObj.IsClientLogged(this.loginId) == 1) {
			this.clientIsLogined = true;
		}
		
		return this.hasCsClient;
	},
	
	
	/**
	 * 打开客户端聊天窗口
	 × @param loginId 网站上的用户登录名 (不带域名后缀)
	 × @param peerId 网站上的用户登录名
	 × @param webUserId 网站用户的编号
	 */
	
	chatWithCsClient: function(loginId, peerId, webUserId, faileFun){
		//如果安装了客户端软件就启动聊天窗口
		if(this.checkCsClient()) {

			if (this.is2011) {
				this.activeXObj.ExeChatWith(this.appName, loginId, "", peerId, webUserId, "cs", location.href, document.title);
			} else {
				this.activeXObj.ChatWithSpecClient(loginId, "", peerId, webUserId, "cs", window.location.href, document.title);
			}
			
		}else {
			//如果没有安装客户端软件就进行一个函数回调
			if(faileFun){
				faileFun();
			}
		}
	},
	
	/**
	 * html标签开打客户端窗口
  	 */ 
	chatWithSimpleCilent: function (o) {
               var url = typeof o == 'object' ? o.getAttribute("toWindowClientParam") : o;
               var userId = typeof o == 'object' ? o.getAttribute("userid") : o;
               
                 if (this.checkCsClient()) {
                         this.chatWithCsClient(Fps.Config.wakeCsClientLoginId, userId, "",url);
                 }
          },

	
	/**
		自动登录客户端
		@ Param loginId 用户名称带@域名后缀
		@ Param password 加密以后的密码
		@ param errFun 如果没有安装客户端执行此回调函数
	*/
	autoLogin: function(loginId, password, errFun){
		if(this.checkCsClient()) {
			this.activeXObj.ExeChatWith(this.appName,loginId, password, '', '', "cs", '', '');
		}else {
			//如果没有安装客户端软件就进行一个函数回调
			if(errFun){
				errFun();
			}
		}
	}
};

/*
//业务逻辑
(function(){
	MyActiveX.appName = 'exegas';
	var id = 'cimClient'; //插件编号
	var classId = 'BEDA3B3F-7292-4CFF-A9C2-84D0600796BC'; //插件类编号
	MyActiveX.add(id, classId, 0, 0, 'fps_cim_activeX'); //加载插件
	//MyActiveX.autoLogin(loginId, password); //调用自动登录客户端的方法
})();
*/Fps.Flash = {
	
	/**
	 * 获取flash对象
	 * @param n 标记的name属性值
	 */
	get : function (n) {
    	if (isIE && !isIE9) {
        	return window[n];
    	} else {
        	if (document[n].length != undefined) {
				return document[n][1];
			}
	
			return document[n];		
		}
    },
	
	/**
	 * 构建Flash标记的html代码
	 * @param name 名称
	 * @param src 文件地址
	 * @param flashVars 附加参数
	 */
	create : function (name, src, flashVars) {
		//读取模板
		Fps_Conf_socketFlashTemplet = unescape(Fps_Conf_socketFlashTemplet).
		replace(/\{FlashId\}/g, name).
		replace(/\{FlashSrc\}/g, src).
		replace(/\{FlashParam\}/g, flashVars);
		return Fps_Conf_socketFlashTemplet;
	},
	
	/**
	 * 加载Flash文件
	 */
	loadIMFlash : function () {
		var flashVars, flashStr;
					
		if (Fps.Config.connectType == "socket") {
			flashVars = 'server=' + Fps.Config.socketServer + '&port=' + Fps.Config.socketPort;
		} else if (Fps.Config.connectType == "http") {
			flashVars = 'type=user&socketServer=' + Fps.Config.socketServer + '&socketPort=' + Fps.Config.socketPort + '&connectType=' + Fps.Config.connectType + 
			'&sessionId=' + Fps.Socket.getHttpLoginDate();
		}
		
		var flashSrc = Fps_Conf_basePath + 'flash/Socket.swf?'+ (new Date()).getTime();
		flashStr = this.create(Fps.Config.socketFlashObj, flashSrc, flashVars);
		
		var d = null;
		
		if (!Fps.DOM.getDom("WebTMSocketDiv")) {
			d = Fps.DOM.createDom("div");
			d.id = "WebTMSocketDiv";
			d.style.width = '1px';
			d.style.height = '1px';
			d.style.bottom = '0px'; 
			d.style.left = '0px'; 
			d.style.zIndex = '10000';
			d.style.position = 'fixed'; 
			Fps.DOM.myInsertDom(d);
		}else{
			d = Fps.DOM.getDom("WebTMSocketDiv"); 
		}
		
		d.innerHTML = flashStr;
	}
};/***
 * 操作Cookie数据
 */

Fps.Cookie = {
	/***
	 * 获取Cookie
	 * @param n cookie的名称
	 */
	 read: function(n) {
	 	//alert("获取了");
	 	var cs = document.cookie.split("; ");
		 
		for (var i=0; i<cs.length; i++) {		
			var arr = cs[i].split("="); 	
			
			if (arr[0] == n) {
				return unescape(arr[1]);
			}
		}
			
		return "";
	 },
	 
	/***
	 * 保存Cookie
	 * @param name cookie的名称
	 * @param value cookie的名称
	 * @param opt 存储时间
	 */
	save: function(name, value, opt) {
		//alert("保存了");
		var str = name + "=" + escape(value); 
		
		if (opt) {
			var cdate = new Date();
			var ms;
				
			if (opt.expireHours) {
				ms = opt.expireHours * 3600 * 1000;
				cdate.setTime(cdate.getTime() + ms);
				str += "; expires=" + cdate.toGMTString();	
			} else if (opt.expireDays) {
				ms = opt.expireDays * 24 * 3600 * 1000;
				cdate.setTime(cdate.getTime() + ms);
				str += "; expires=" + cdate.toGMTString();	
			}
				
			str += "; path=/";
				
			if (opt.domain) {
				str += "; domain" + opt.domain;
			}
				
			if (opt.secure) {
				str+="; true";
			}
		}
			 
		document.cookie = str;
		
	},
	
	/***
	 * 删除Cookie
	 * @param name cookie的名称
	 */
	remove: function(name) {
		//alert("清除了");
		this.save(name, "", {expireDays:-1});
	}
};Fps.CallBack = {
		loginResultFun : function(){},
		onDisconnectFun : function(){},
		onReConnect : function(){},
		recvMessage : function(){},
		queryStatus : function(){},
		onDisconnectFun : function(){}
	};
	
	/**
	 * 配合Socket通讯组建的辅助程序
	 */
	var TMSocket = {
		/**
		 * 加载完成
		 */
		onLoad: function(){
			Fps.Socket.getIM();
		},
		
		/**
		 * Socket通讯连接成功
		 */
		onConnectSuccess: function() {
			//alert('onConnectSuccess');
			
			var timer = null;
			//连接成功后等待 客户列表和聊天窗口js代码加载完成后开始登录			
			function checkLoad() {
				//打开新窗口聊天时 只检测聊天窗口加载完成
				if (window.location.href.indexOf('OutChat') != -1 && Fps.Global.chatJsComplete) {
					Fps.Socket.login();
					clearInterval(timer);
					return;
				}
				
				// alert(Fps.Global.chatJsComplete);
				//内部 常规模式同时检测 主窗口和聊天窗口的加载
				if (Fps.Global.chatJsComplete) {
					Fps.Socket.login();
					clearInterval(timer);
					return;
				}
				
				//内部 单纯的对话按钮形式 只检测聊天窗口的加载
				if (Fps.GetServerData.getLoginType() == "guest" && Fps.Global.chatJsComplete) {
					Fps.Socket.login();
					clearInterval(timer);
					return;
				}
				
				//内部 单纯的对话按钮形式 只检测聊天窗口的加载
				if (Fps.GetServerData.getLoginType() == "taobaouser" && Fps.Global.chatJsComplete) {
					Fps.Socket.login();
					clearInterval(timer);
					return;
				}
			};
			
			timer = setInterval(checkLoad, 300);
			Fps.Global.connectIsReady = true;
		},
		
		/**
		 * 登录成功
		 * @param code 登录标识
		 */
		onLoginSuccess: function(code){
			 
			Fps.CallBack.loginResultFun(code);
		},
		
		/**
		 * 被挤下来
		 * @param extCode 有值代表是被客户端挤下线
		 */
		onLoginCrowd: function(extCode){
		},
		
		/**
		 * 登录出错
		 * @param xml 报错的xml信息
		 */
		onLoginError: function(xml){
			Fps.removeCookie("WEBCIM_SessionId" + Fps.Config.version + Fps.Config.logicServer);
		},
		
		/**
		 * 好友状态发生变化
		 * @param userId 发生状态变化的用户ID
		 * @param userStatus 最新的状态值
		 */
		onFriendStatChange: function(userId, userStatus){
			Fps.CallBack.queryStatus(userId, userStatus);
		},
		
		/**
		 * 接收聊天消息
		 * @param Message 表示聊天信息的json字符串 
		 * example: var data = {userId:"2002", type:"22", groupId:"0", time: "20110125160316", remark:"", messageContent:"%FFp%9D%8A%FF%F6"}
		 */
		onRecChatMessage: function(Message){
			Fps.CallBack.recvMessage(Message);
		},
		
		/**
		 * 网络错误或中断
		 */
		onError: function(){
			Fps.Global.connectIsReady = false;
		}
	};/***
 * 调用Http接口
 */
Fps.Http = {
	/***
	 * 动态添加script标记
	 * @param src 远程脚本或JSON地址
	 * @param charset 脚本文字编码格式
	 */
	addScript : function (src, charset) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.charset = charset;
		var head = document.getElementsByTagName("head").item(0);
		head.appendChild(s);
		s.src = src;
	},

	
	/***
	 * 调用接口
	 * @param logicName 接口名称
	 * @param conf 接口参数
	 */
	get : function (logicName, conf) {
		var uri = Fps.Config.getLogicHead() + logicName;
		
		if (!conf.sessionId && Fps.Config.sessionId != "") {
			uri += "&sessionId=" + Fps.Config.sessionId;	
		}
				
		for (i in conf) {	
			//如果有多余的属性直接跳过
			if(Fps.UserFunc.isFilterAtt(i)) {
				continue;
			}
			
			uri += "&" + i + "=" + encodeURIComponent(conf[i]);
		}
		
		if(Fps.Config.httpUrl != ""){
			uri += "&httpUrl=" + Fps.Config.httpUrl;
		}
		
		this.addScript(uri, "utf-8");
	},
	
	/**
	 * 来访消息发送成功的回执函数
	 * @param o 服务器返回的json数据
	 */
	recvSendUserMessage: function(o){
		if (o.cim.result.code == "0") {
			Fps.Global.guestMsgIsSended = true;
			Fps.Cookie.save(Fps.Environment.getDomain() + 'isSendVisitMsg', '1');
		}
	},
	
	/**
	 * 发送来访消息
	 * @param users 接收来访消息的 用户ID数组
	 */
	 sendGuestMessage: function(users) {
	 	// 企业免费版不发送来访消息
	  	if (Fps.Config.logicServerVersion)
	 	{
	 		return;
	 	}
	  
		if (Fps.Config.isSendVisitMsg) {
			var isSendVisitMsg = Fps.Cookie.read(Fps.Environment.getDomain() + 'isSendVisitMsg');
			
			//每次刷新页面都来访提示消息
			if (isSendVisitMsg == '1') {
				//如果用户设置了全站提醒、那登录网站就只提醒一次
				if (Fps.Config.visitPrompt && Fps.Config.visitPrompt == '1') {
					return;
				}
			}
			
			var msg = document.title + "{}" + location.href + "{}" + Fps.Global.user.guestCode + "{}" + Fps.Global.user.area + "{}" + Fps.Global.user.nickname;
			
			Fps.Global.guestMsgIsSended = true;
			 
			Fps.Http.get("sendUserMessage", {
				userId:users.join(","), 
				messageType:"6", 
				messageText:msg, 
				json:"true", 
				callbackFunc:"Fps.Http.recvSendUserMessage"
			}); 
		}
	 }
};/**
 * 通讯组件
 * 负责消息传输 状态更新和缓存操作
 */

Fps.Socket = {
	
	IM : null, 
	
	/**
	 * 获取Socket对象
	 */
	getIM : function () {
		this.IM = Fps.Flash.get(Fps.Config.socketFlashObj);
	},
	
	/**
	 * 请求状态
	 * @param users 需要获取状态的用户数据
	 */
	queryStatus : function (users) {
		if(users.length > 1){
			users = users.join(',');
		}

		this.IM.queryStatus(users);
	},
	
	/**
	 * 设置自己的状态
	 * @param status 新的状态值
	 */		
	setStatus : function (status) {
		this.IM.setStatus(Fps.Config.sessionId, status);
	},
		
	/**
	 * 发送消息
	 * @param msgType 消息类型
	 * @param toUsers 接收者ID数组
	 * @param groupId 群编号
	 * @param userStauts 发送者状态
	 * @param message 消息内容
	 * @param remark 备注信息
	 */	
	sendMessage : function (msgType, toUsers, groupId, userStauts, message, remark) {
		if(toUsers.length > 1){
			toUsers = toUsers.join(',');
		}else{
			toUsers = toUsers[0].toString();
		}
		
		//groupId = Fps.Config.shopId;
		groupId = 0;
		var result = this.IM.sendMessage(toUsers, message, msgType, groupId, userStauts, ' ', ' ');
		
		if (msgType == '22')
		{
			//alert(result);	
		}
	},
	
	stopIMSocket : function() {
		this.IM.close();
	},
	
	/**
	 * 登录通讯服务器
	 
	 */
	login : function () {
		var loginCode = '0';
		
		//100 优先级
		if (Fps.Config.isMoreChat) {
			loginCode = '100';
		}
		
		//'12f4847c5c9Z12f76a64d1dZ7cf5'
		this.IM.login(Fps.Config.sessionId, Fps.Config.userStatus, loginCode);
	},
		
	/**
	 * 保存缓存消息
	 * @param n 缓存名称
	 * @param v 缓存值
	 */	
	saveShared : function (n, v) {
		this.IM.save(n, v)
	},
	

	/**
	 * 读取缓存消息
	 * @param n 缓存名称
	 */	
	readShared : function (n) {
		return this.IM.read(n);
	},
	
	
	/**
	 * 清除缓存消息
	 * @param n 缓存名称
	 */	
	clearShared : function (n) {
		return this.IM.clear(n);
	}
};/**
 * 解析XML的组件
 */
 
Fps.Xml = function (s) {
	var r;
		
    if (isIE) {
		r = new ActiveXObject("Microsoft.XMLDOM");
        r.loadXML(s);
    } else {
		var parser = new DOMParser();
        r = parser.parseFromString(s, "text/xml");
    }
	
	var o = {};
	
	/**
	 * 获取XML节点
	 * @param path XPath路径
	 */
	o.getNodes = function (path) {
		if (isIE == "IE") {
			return r.documentElement.selectNodes(path);
		} else {
			var t = path.split("/");
			return r.getElementsByTagName(t[t.length-1]); 		
		}
	};
		
	/**
	 * 获取XML节点
	 * @param path XPath路径
	 */
	 
	o.getNode = function (path) {
		if (isIE) {
			return r.documentElement.selectNodes(path)[0];
		} else {
			var t = path.split("/");
			return r.getElementsByTagName(t[t.length-1])[0]; 	
		}
	};
		
    return o;
};/**
 * 对话选项卡的桥接组件
 * 构建数据
 */
Fps.BridgeTab = {
	/**
	 * 添加选项卡用户
	 * @param userId 用户编号
	 */
	addUser : function (userId) {
		var tabData = {
			tId: 'tab' +  userId,
			userId: userId,
			userName:  Fps.Global.users[userId].nickname,
			userStatusText: Fps.text[33][Fps.Global.users[userId].status]
		};
		
			//调用子页面中的选项卡方法
		//Fps.Global.chatClass.getChildDoc().MyTab.addTab(tabData);
		
	}
};/**
 * 文件描述： 使用动态生成iframe的方法构成新的窗口组件
 * 开发人员：尹彦明
 * 创建时间： 2010/01/10
 * 使用动态生成iframe的方法构成新的窗口组件
 * @param {Array} cssAtt 窗口内容
 * @param {String} id 窗口id
 */
	 
Fps.WindowExt = function(cssAtt, id) {
	var mainView = null;
	var iframe = null;
	var dragView = null;
	/*
	 *	构建一个iframe放置聊天窗口
	 */
	function buildIframeView()
	{
		var tmpIframe = document.createElement('iframe');
		tmpIframe.style.border = '0px';
		tmpIframe.frameBorder = "0";
		tmpIframe.scrolling = "no";
		tmpIframe.id = id;
		tmpIframe.name = id;
		//设置iframe中的网页背景透明
		tmpIframe.setAttribute('allowtransparency', 'true');
		tmpIframe.allowTransparency = 'true';
		//加载外部的css属性
		for(var i=0; i<cssAtt.length; i++)
		{
			eval('tmpIframe.style.' + cssAtt[i][0] + '="' + cssAtt[i][1]+'";');
		}
		
		tmpIframe.style.top = '-25px';
		tmpIframe.style.position = 'relative';
		tmpIframe.style.zIndex = '1';
		
		iframe = tmpIframe;
		return tmpIframe; 
	}
	
   /*
	*	一个主Div里面嵌套iframe 漂浮一个标题栏的div做拖动用 
	*/
	function buildView()
	{
		var tmpMainView = document.createElement('div');
		tmpMainView.id = 'Main' + id;
		var tmpDragView = document.createElement('div');
		var tmpMainViewWidth = 0;
		
		//加载外部的css属性
		for(var i=0; i<cssAtt.length; i++)
		{
			eval('tmpMainView.style.' + cssAtt[i][0] + '="' + cssAtt[i][1]+'";');
		}
		
		tmpMainView.style.zIndex = '1000000';
    	tmpMainView.style.position = 'absolute';
		tmpDragView.style.height = '25px';
		//tmpDragView.style.backgroundColor = 'red';
		tmpDragView.style.position = 'relative';
		tmpDragView.style.zIndex = '2';
		tmpDragView.style.left = '0px';
		tmpDragView.style.top = '0px';
		
		if (id == 'WebUserList')
		{
			tmpDragView.style.width = '80%';
		}
		else
		{
			tmpDragView.style.width = '95%';
		}
		
		if (Fps.Config.windowType != "SystemOutPage" && id != 'WebUserListClose')
		{
			tmpMainView.appendChild(tmpDragView);
		}

		tmpMainView.appendChild(buildIframeView());
		Fps.DOM.myInsertDom(tmpMainView);
		
		
		
		if (Fps.Config.windowType != "SystemOutPage" && id != 'WebUserListClose')
		{
			Fps.drag(tmpDragView, tmpMainView, function(){}, function(){});
		}
		
		dragView = tmpDragView;
		return tmpMainView;
	}
	  
	_self = this;
	mainView = buildView();
	
	this.hidden = true;
	//是否指定了父级容器
	this.hasContainer = false;
	
	this.hPostion = 0;
	this.vPostion = 0;
	this.width = 0;
	this.height = 0;
	
	/**
	 * 重新修正大小
	 * @param  {Array} cssAtt 窗口内容
	 * @param  {String} id 窗口id
	 */
	this.resize = function(w,  h){
		iframe.style.width = w + 'px';
		iframe.style.height = h + 'px';
		mainView.style.width = w + 'px';
		mainView.style.height = h + 'px';
		dragView.style.width = (w - 25) + 'px';
		this.width = w;
		this.height = h;
		this.setPostion(this.hPostion, this.vPostion);
		
		if(this.getChildDoc().resize){
			this.getChildDoc().resize(w, h);
		}
	};
	
	
	//矫正位置
	this.resetPostion = function() {
		if (!this.hidden) {
			this.setPostion(this.hPostion, this.vPostion);
		}
	};
	
	/**
     * 将窗口固定在某方向的位置
	 * @param {String}  h 水平位置 0,1,2 左中右
	 * @param {String}  v 垂直位置 0,1,2 上中下
     */
	this.setPostion = function(h, v) {
		//指定了容器就不需要再设置位置
		if (this.hasContainer) {
			return;
		}
		
		this.hPostion = h;
		this.vPostion = v;
		var width = this.width == 0 ? mainView.offsetWidth : this.width;
		var height = this.height == 0 ? mainView.offsetHeight : this.height;
		var cLeft = Fps.DOM.getBodyWidth() - width;
		cLeft = Math.floor(cLeft / 2) + 'px';
		
		var cBottom = Fps.DOM.getBodyHeight() - height;
		cBottom = Math.floor(cBottom / 2);
		
		if (isIE) {
			if (isIE6) {
				cBottom += Fps.DOM.getScrollTop()
			} else {
				cBottom -= Fps.DOM.getScrollTop();
			}
			
			//alert(iframe.id + '  Bottom :' + cBottom + ' sroll top: ' + (0 - Fps.DOM.getScrollTop()));
		}
		
		cBottom += 'px';
		
		if (h == '0') {
			 mainView.style.right = 'auto';
			 mainView.style.left = '0px';
		} else if (h == '2') {
			 mainView.style.right = '0px';
			 mainView.style.left = 'auto';
		} else if (h == '1') {
			 mainView.style.left = cLeft;
			 mainView.style.right = 'auto';
		}
		
		if (v == '0') {
			 mainView.style.top = '0px';
			 mainView.style.bottom = 'auto';
		} else if (v == '2') {
			 mainView.style.top = 'auto';
			 mainView.style.bottom = '0px';
		} else if(v == '1') {
			 mainView.style.top = 'auto';
			 mainView.style.bottom = cBottom;
			 
			 if (isIE6) {
				mainView.style.top = cBottom;
				mainView.style.bottom = 'auto'; 
			 }
		}
		
		if (iframe.id == 'WebTMChat') {
			//alert(iframe.outerHTML);
		}
		
		if(isIE6) {
			//在坐标重新调整后清除之前的inittop属性 在跟随滚���时重新定位
			mainView.removeAttribute('inittop');
		}
		
		if(!isIE){
			mainView.setAttribute('initleft', iframe.offsetLeft);
		}
		
		var topValue = mainView.offsetTop;
		
		if (Fps.DOM.getScrollTop() > 0) {
			topValue -= Fps.DOM.getScrollTop(); 
		}
		 		
		mainView.setAttribute('inittop', topValue.toString());
	};
	
	/**
     * 为窗口设置内容
     * @param content 窗口内容
     */
    this.setContent = function(content) {
        var doc = iframe.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
    };
	
	/**
     * 让窗口跟随页面滚动
     * @param {Boolean} isScroll
     */
    this.scrollWithPage = function() {
        var temp;
		//由于fixed属性需要 添加http的头申明 引起不多兼容性问题  所以在此屏蔽了此功能
		
        //IE6下使用window scroll事件实现窗口跟随页面
        if (isIE || Fps.Config.isOldCssMode) {
			Fps.UserEvent.addEventListener(window, 'scroll',function(){				
				inittop = parseInt(mainView.getAttribute("inittop")) + Fps.DOM.getScrollTop();
			
				if (Fps.DOM.getBodyHeight() + Fps.DOM.getScrollTop() - mainView.clientHeight < inittop) {
					inittop = Fps.DOM.getBodyHeight() + Fps.DOM.getScrollTop() - mainView.clientHeight;
				}
				
				mainView.style.top = inittop + 'px';
				mainView.style.bottom = 'auto';
            });
        } else {
            mainView.style.position = 'fixed';
        }
    };
	
	/**
     * 获取子页面的window对象
     */
    this.getChildDoc = function() {
         return iframe.contentWindow.window;
    };
    
	
	 /**
     * 隐藏窗口
     */
    this.hide = function() {
		this.hidden = true;
		
		if (isIE || isChrome || this.hasContainer) {
			mainView.style.display = 'none';
			//FireFox不能设置iframe的display为none 否则下次不能再打开
		} else {				
			mainView.style.left = '-2000px';
		}	
    };

    /**
     * 显示窗口
     */
    this.show = function() {
		this.hidden = false;
		
		if (isIE || isChrome || this.hasContainer) {
			mainView.style.display = 'block';
			//FireFox不能设置iframe的display为none 否则下次不能再打开
		} 
		
		this.resetPostion();
    };

    /**
     * 获取窗口状态
     * @return {String} 窗口状态 close 关闭 open 打开
     */
    this.getStatus = function() {
        if (mainView.style && mainView.style.display && mainView.style.display == 'none'){
            return 'close';
        } else {
            return 'open';
        }
    };
	
	/**
     * 获取窗口容器
     */
	this.getWindow = function() {
		return iframe;
	};
	
	/**
     * 将窗口添加到指定的Div中
	 * 
     */
	 this.insertTo = function(divId) {
		 this.hasContainer = true;
		 mainView.style.zIndex = '0';
		 var container = document.getElementById(divId);
		 container.innerHTML = '';
		 container.appendChild(mainView);
	 }
};/***
 * IM人员列表主要窗口
 */

Fps.IMWindow = function () {
	var w = typeof DZK_MainWindowWidth != "undefined" ? DZK_MainWindowWidth : Fps.Config.imSize.width;
	var topPanel = Fps.Config.getMainTopPanel();
	var bottomPanel = Fps.Config.getMainButtomPanel();
	var webWadar = Fps.Global.user.webWadar;
	var Button = Fps.Config.getTrayButton();
	var bottomBarPanel = Fps.Config.getMainButtomBarPanel();
	
	if (webWadar) {
		//动态设置托盘图标
		if (webWadar.trayButtonImg && webWadar.trayButtonImg.indexOf('{}') != -1) {
			Button = {
				LeftButtonImage: Fps.Config.getSiteRootPath() + webWadar.trayButtonImg.split('{}')[0],
				RightButtonImage: Fps.Config.getSiteRootPath() + webWadar.trayButtonImg.split('{}')[0],
				ButtonWidth: webWadar.trayButtonImg.split('{}')[1],
				ButtonHeight: webWadar.trayButtonImg.split('{}')[2]
			};
			//设置软件标志
		} 
		
		if (webWadar.softICON && webWadar.softICON.indexOf('{}') != -1) {
			Fps.Config.customSoftICON = Fps.Config.getSiteRootPath() + webWadar.softICON.split('{}')[0];
			//设置顶部广告
		} 
		
		if (webWadar.customTopPanel && webWadar.customTopPanel.indexOf('{}') != -1) {
			var width = webWadar.customTopPanel.split('{}')[1];
			var height = webWadar.customTopPanel.split('{}')[2];
			
			topPanel = {
				content: '<img width="'+width+'" height="'+height+'" src="' + 
				Fps.Config.getSiteRootPath() + webWadar.customTopPanel.split('{}')[0]+'"/>',
				width: width,
				height: height
			};
		}
		
		if (webWadar.companyPhone) {
			var companyPhone = webWadar.companyPhone.split('{}')[0];
			
			bottomPanel = {
				content: '<span style="font-weight:bold;font-family:Georgia;color:#FF0000">' + companyPhone + '<span>',
				width: 136,
				height: 15
			};
		}
	}
	
	//alert(topPanel.height);
	var userList = new Fps.WindowExt([
		['width','150px'],
		//['height',250 + topPanel.height + bottomPanel.height + 'px'],
		['height',250 + 'px'],
		['bottom','100px'],
		['left','0px'],
		['zIndex','1000001']
	], 'WebUserList');
	
	Fps.Global.userListClass = userList;
	var hPosition = '0';
	var vPosition = '0';

	if (Fps.Global.user.webWadar) {
		if (Fps.Global.user.webWadar.hPosition == '0' && Fps.Global.user.webWadar.vPosition == '0') {
		} else {
			hPosition = Fps.Global.user.webWadar.hPosition;
			vPosition = Fps.Global.user.webWadar.vPosition;
		}
	}
	
	if (Fps.Config.customMainPostion != '') {
		hPosition = Fps.Config.customMainPostion.hPosition;
		vPosition = Fps.Config.customMainPostion.vPosition;
	} else if (Fps.GetServerData.getLoginType() == "taobaouser") {
		hPosition = '2';
		vPosition = '2';
	}
	
	userList.setPostion(hPosition, vPosition);
	var softName = Fps.Config.softName.substring(0, 14);
	var userFaceImage = Fps.Config.getServiceHeadImage();
	
	if (webWadar && webWadar.friendHeadImg && webWadar.friendHeadImg.indexOf('{}') != -1) {
		userFaceImage = Fps.Config.getSiteRootPath() + webWadar.friendHeadImg.split('{}')[0];
	}
	
	Fps_Conf_imTemplet = unescape(Fps_Conf_imTemplet);
	Fps_Conf_imTemplet = Fps_Conf_imTemplet. 
	replace(/\{base\}/g, Fps_Conf_basePath).
	replace(/\{templets\}/g, Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g, Fps_Conf_tempHtmlPath).
	replace(/\{Width\}/g, w).
	replace(/\{SoftNameText\}/g, softName).
	replace(/\{UserIograph\}/g, Fps.Config.userIograph).
	replace(/\{CloseWindowFunction\}/g, 'parent.Fps.hideUserList()').
	replace(/\{FreePhoneFunction\}/g, 'parent.Fps.Button.freePhone()').
	replace(/\{UserListPanel\}/g, unescape(Fps_Conf_UserListPanel)).
	replace(/\{CIMSoftVersion\}/g,CIMSoftVersion).
	replace(/\{FreePhone\}/g, Fps.text[0]);
	
	//替换头像
	Fps_Conf_EndNode = unescape(Fps_Conf_EndNode).replace(/\{UserFaceImage\}/g, userFaceImage);
	Fps_Conf_imTemplet = Fps_Conf_imTemplet. 
	replace(/\{TreeKindNode\}/g, Fps_Conf_KindNode).
	replace(/\{TreeEndNode\}/g, escape(Fps_Conf_EndNode));

	if (Fps.Config.customSoftICON != '') {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.replace(/\{SoftICON\}/g, Fps.Config.customSoftICON).
		replace(/\{SoftNameIndent\}/g, '32').
		replace(/\{SoftICONDisplay\}/g, 'block');
	} else {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.replace(/\{SoftICONDisplay\}/g, 'none').
		replace(/\{SoftNameIndent\}/g, '5');
	}
	
	Fps_Conf_imTemplet = Fps_Conf_imTemplet.replace(/\{ColorId\}/g, Fps.Config.colorType);	
	Fps_Conf_imTemplet = Fps_Conf_imTemplet.
		replace(/\{TopPanelContent\}/g, topPanel.content).
		replace(/\{TopPanelWidth\}/g, topPanel.width).
		replace(/\{TopPanelHeight\}/g, topPanel.height);
	
	if (topPanel.width == 0) {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.
		replace(/\{TopPanelDisplay\}/g, 'none');
	} else {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.
		replace(/\{TopPanelDisplay\}/g, 'block');
	}
	
	Fps_Conf_imTemplet = Fps_Conf_imTemplet.
		replace(/\{ButtomPanelContent\}/g, bottomPanel.content).
		replace(/\{ButtomPanelWidth\}/g, bottomPanel.width).
		replace(/\{ButtomPanelHeight\}/g, bottomPanel.height);	
	
	if (bottomPanel.width == 0) {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.
		replace(/\{ButtomPanelDisplay\}/g, 'none');
	} else {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.
		replace(/\{ButtomPanelDisplay\}/g, 'block');
	}
		
	Fps_Conf_imTemplet = Fps_Conf_imTemplet.replace(/\{ButtomBarContent\}/g, bottomBarPanel.content);
	
	if (bottomBarPanel.content == '') {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.replace(/\{MyFreePhoneDisplay\}/g, 'block');
	} else {
		Fps_Conf_imTemplet = Fps_Conf_imTemplet.replace(/\{MyFreePhoneDisplay\}/g, 'none');
	}
	
	//FreePhoneEvent
	userList.setContent(Fps_Conf_imTemplet);
	//跟随页面滚动
	userList.scrollWithPage();
	//注册到全局变量中以便在其他地方调用
	Fps.Global.userListWindow = userList.getWindow();
	
	var userListClose = new Fps.WindowExt([
		['width', Button.ButtonWidth + 'px'],
		['height', Button.ButtonHeight +'px']
	], 'WebUserListClose');
	
	Fps.Global.userListCloseClass = userListClose;
	Fps_Conf_imCloseTemplet = unescape(Fps_Conf_imCloseTemplet);
	Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.
	replace(/\{base\}/g, Fps_Conf_basePath).
	replace(/\{templets\}/g, Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g, Fps_Conf_tempHtmlPath).
	replace(/\{ButtonWidth\}/g, Button.ButtonWidth).
	replace(/\{ButtonHeight\}/g, Button.ButtonHeight);
	
	if (hPosition == '0') {
		Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.replace(/\{ButtonImage\}/g, Button.LeftButtonImage);
	} else {
		Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.replace(/\{ButtonImage\}/g, Button.RightButtonImage);
	}
	
	Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.replace(/\{ColorId\}/g, Fps.Config.colorType);
	
	userListClose.setContent(Fps_Conf_imCloseTemplet);
	//跟随页面滚动
	userListClose.scrollWithPage();
	Fps.userListCloseWindow = userListClose.getWindow();

	userListClose.setPostion(hPosition, vPosition);
	userListClose.hide();
	//userList.hide();

	//根据后台设置以不同方式展现
	if (Fps.Global.user.webWadar) {
		var displayType = Fps.Global.user.webWadar.displayType;
		//隐藏面板
		if (displayType == '1') {
			userListClose.hide();
		//显示浮动图标
		} else if (displayType == '0') {
			
		} else {
			userListClose.show();
			Fps.Global.userListWindow.style.visibility = 'hidden';
			
			setTimeout(function() {
				userList.hide();
				Fps.Global.userListWindow.style.visibility = 'visible';
				}, 1000);
			}
	}
};/***
 * IM人员列表主要窗口
 */

Fps.SimpleUserList = function () 
{
	var w = typeof DZK_MainWindowWidth != "undefined" ? DZK_MainWindowWidth : Fps.Config.imSize.width;
	var topPanel = Fps.Config.getMainTopPanel();
	var bottomPanel = Fps.Config.getMainButtomPanel();
	var webWadar = Fps.Global.user.webWadar;
	var Button = Fps.Config.getTrayButton();
		
	if (webWadar) 
	{
		//动态设置托盘图标
		if (webWadar.trayButtonImg && webWadar.trayButtonImg.indexOf('{}') != -1) 
		{
			Button = {
				LeftButtonImage: Fps.Config.getSiteRootPath() + webWadar.trayButtonImg.split('{}')[0],
				RightButtonImage: Fps.Config.getSiteRootPath() + webWadar.trayButtonImg.split('{}')[0],
				ButtonWidth: webWadar.trayButtonImg.split('{}')[1],
				ButtonHeight: webWadar.trayButtonImg.split('{}')[2]
			};
			//设置软件标志
		} 
		
		if (webWadar.softICON && webWadar.softICON.indexOf('{}') != -1) 
		{
			Fps.Config.customSoftICON = Fps.Config.getSiteRootPath() + webWadar.softICON.split('{}')[0];
			//设置顶部广告
		} 
		
		if (webWadar.customTopPanel && webWadar.customTopPanel.indexOf('{}') != -1) 
		{
			var width = webWadar.customTopPanel.split('{}')[1];
			var height = webWadar.customTopPanel.split('{}')[2];
			
			topPanel = {
				content: '<img width="'+width+'" height="'+height+'" src="' + 
				Fps.Config.getSiteRootPath() + webWadar.customTopPanel.split('{}')[0]+'"/>',
				width: width,
				height: height
			};
		}
		
		if (webWadar.companyPhone) 
		{
			var companyPhone = webWadar.companyPhone.split('{}')[0];
			
			bottomPanel = {
				content: '<span style="font-weight:bold;font-family:Georgia;color:#FF0000">' + companyPhone + '<span>',
				width: 136,
				height: 15
			};
		}
	}
	
	var singleUserList = new Fps.WindowExt([
		['width','150px'],
		['height',250 + parseInt(topPanel.height) + parseInt(bottomPanel.height) + 'px'],
		['bottom','100px'],
		['left','1px'],
		['zIndex','1000001']
	], 'WebTMSingleUserList');
	
	Fps.Global.singleUserListClass = singleUserList;
	var hPosition = '0';
	var vPosition = '0';
	
	if (Fps.Global.user.webWadar) 
	{
		if (Fps.Global.user.webWadar.hPosition == '0' && Fps.Global.user.webWadar.vPosition == '0') {
		} 
		else 
		{
			hPosition = Fps.Global.user.webWadar.hPosition;
			vPosition = Fps.Global.user.webWadar.vPosition;
		}
	}
	
	if (Fps.Config.customMainPostion != '') 
	{
		hPosition = Fps.Config.customMainPostion.hPosition;
		vPosition = Fps.Config.customMainPostion.vPosition;
	} 
	else if (Fps.GetServerData.getLoginType() == "taobaouser") 
	{
		hPosition = '2';
		vPosition = '2';
	}
	
	singleUserList.setPostion(hPosition, vPosition);
	var softName = Fps.Config.softName.substring(0, 10);
	var userFaceImage = Fps.Config.getServiceHeadImage();
	
	if (webWadar && webWadar.friendHeadImg && webWadar.friendHeadImg.indexOf('{}') != -1) 
	{
		userFaceImage = Fps.Config.getSiteRootPath() + webWadar.friendHeadImg.split('{}')[0];
	}
	
	Fps_Conf_SimpleUserListTemplet = unescape(Fps_Conf_SimpleUserListTemplet);
	Fps_Conf_SimpleUserListTemplet = Fps_Conf_SimpleUserListTemplet. 
	replace(/\{base\}/g, Fps_Conf_basePath).
	replace(/\{templets\}/g, Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g, Fps_Conf_tempHtmlPath).
	replace(/\{Width\}/g, w).
	replace(/\{SoftNameText\}/g, softName).
	replace(/\{ChatImageButton\}/g, Fps.Config.singleCantactImg).
	replace(/\{FreePhoneFunction\}/g, 'parent.Fps.Button.freePhone()').
	replace(/\{FreePhone\}/g, Fps.text[0]);
	
	Fps_Conf_SimpleUserListTemplet = Fps_Conf_SimpleUserListTemplet.replace(/\{ColorId\}/g, Fps.Config.colorType);	
	//FreePhoneEvent
	singleUserList.setContent(Fps_Conf_SimpleUserListTemplet);
	//跟随页面滚动
	singleUserList.scrollWithPage();
	//注册到全局变量中以便在其他地方调用
	Fps.Global.singleUserListWindow = singleUserList.getWindow();
		
	var userListCose = new Fps.WindowExt([
		['width', Button.ButtonWidth + 'px'],
		['height', Button.ButtonHeight +'px']
	], 'WebUserListClose');
	
	Fps.Global.userListCloseClass = userListCose;
	Fps_Conf_imCloseTemplet = unescape(Fps_Conf_imCloseTemplet);
	Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.
	replace(/\{base\}/g, Fps_Conf_basePath).
	replace(/\{templets\}/g, Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g, Fps_Conf_tempHtmlPath).
	replace(/\{ButtonWidth\}/g, Button.ButtonWidth).
	replace(/\{ButtonHeight\}/g, Button.ButtonHeight);
	
	if (hPosition == '0') 
	{
		Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.replace(/\{ButtonImage\}/g, Button.LeftButtonImage);
	} 
	else 
	{
		Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.replace(/\{ButtonImage\}/g, Button.RightButtonImage);
	}
	
	Fps_Conf_imCloseTemplet = Fps_Conf_imCloseTemplet.replace(/\{ColorId\}/g, Fps.Config.colorType);
	userListCose.setContent(Fps_Conf_imCloseTemplet);
	//跟随页面滚动
	userListCose.scrollWithPage();
	Fps.userListCloseWindow = userListCose.getWindow();

	userListCose.setPostion(hPosition, vPosition);
	userListCose.hide();
	//userList.hide();

	//根据后台设置以不同方式展现
	if (Fps.Global.user.webWadar) 
	{
		var displayType = Fps.Global.user.webWadar.displayType;
		//隐藏面板
		if (displayType == '1') 
		{
			singleUserList.hide();
		//显示浮动图标
		} 
		else if (displayType == '0') {
			
		} 
		else 
		{
			userListCose.show();
			Fps.Global.userListWindow.style.visibility = 'hidden';
			
			setTimeout(function() 
				{
				singleUserList.hide();
				Fps.Global.userListWindow.style.visibility = 'visible';
				}, 1000);
			}
	}
};  /*
 * 构建聊天窗口
 */
 
Fps.ChatWindow = function() {
	var w, h;
	if (Fps.Config.chatSizeAuto) {
		w = Fps.DOM.getBodyWidth();
		h  = Fps.DOM.getBodyHeight();
	} else {
		w = Fps.Config.chatSize.width;
		h  = Fps.Config.chatSize.height;
	}
	
	var chat = new Fps.WindowExt([
		['width', w + 'px'],
		['height', h + 'px'],
		['zIndex','1000002']
	], 'WebTMChat');
	
	if (Fps.Config.chatWindowContainerId) {
		chat.insertTo(Fps.Config.chatWindowContainerId);
	}
	
	//固定位置
	chat.setPostion('1', '1');
	Fps.Global.chatClass = chat;
	Fps.Global.chatWindow = chat.getWindow();
	var rightStr = unescape(Fps_Conf_chatRightTemplet);

	rightStr = rightStr.replace(/\{fps_user_company\}/g,Fps.text[66]).  ///公司
		replace(/\{fps_user_name\}/g,Fps.text[67]).   ///名称
		replace(/\{fps_user_loginid\}/g,Fps.text[68]).  ///帐号
		replace(/\{fps_user_phone\}/g,Fps.text[69]).   ///电话
		replace(/\{fps_user_mobile\}/g,Fps.text[60]).  ///手机
		replace(/\{fps_user_email\}/g,Fps.text[70]).   ///QQ/msn
		replace(/\{fps_user_sex\}/g,Fps.text[62]).    ///性别
		replace(/\{fps_com_questions\}/g,Fps.text[125]);
		
	var str = '<iframe id="WebimRightIframe" name="WebimRightIframe" src="?" scrolling="no" frameborder="0"></iframe>';
if (Fps.Config.chatRightUri != "") {
var theImgId="";
		if(Fps.Config.shopId==0){
			theImgId=Fps.Config.iconShopId;
		}else{
			theImgId=Fps.Config.shopId;
		}
		if(Fps_Conf_Language=="zh-en"){
			  Fps.Config.chatRightUri=(Fps.Config.chatRightUri).replace(/\{theUserId\}/g,theImgId)
			  .replace(/\{theLang\}/g,"cn");
		}else{
			 Fps.Config.chatRightUri=(Fps.Config.chatRightUri).replace(/\{theLang\}/g,"en")
			 	.replace(/\{theUserId\}/g,theImgId);
		}

		rightStr = Fps.UserFunc.getSetPar(str, [Fps.Config.chatRightUri]);
	}
	
	var sendFileFlash = unescape(Fps_Conf_uploadFlashTemplet);
	sendFileFlash = sendFileFlash.replace(/\{Width\}/g,16).
		replace(/\{FlashId\}/g,'sendfileflash').   
		replace(/\{temphtmlpath\}/g,Fps_Conf_tempHtmlPath + 'swf/SendFile.swf').
		replace(/\{FileType\}/g,'file').
		replace(/\{HelpJs\}/g,'SendFile').
		replace(/\{ExtName\}/g,'.pdf,.doc,.txt,.rar,.zip,.ppt,.xls,.html,.xls,.htm,.js,.gif,.png,.bmp,.jpg,.ico').
		replace(/\{MaxSize\}/g,1024*1024*10).
		replace(/\{Height\}/g,16);

	var sendImageFlash = unescape(Fps_Conf_uploadFlashTemplet);
	sendImageFlash = sendImageFlash.replace(/\{Width\}/g,16).
		replace(/\{FlashId\}/g,'sendimageflash').
		replace(/\{temphtmlpath\}/g,Fps_Conf_tempHtmlPath + 'swf/SendImage.swf').
		replace(/\{FileType\}/g,'image').
		replace(/\{HelpJs\}/g,'SendImage').
		replace(/\{ExtName\}/g,'.gif,.png,.bmp,.jpg,.ico').
		replace(/\{MaxSize\}/g,1024*1024*1).
		replace(/\{Height\}/g,16);
	
	var friendFaceImage = Fps.Config.getServiceHeadImage();
	var webWadar = Fps.Global.user.webWadar;
	 
	if (webWadar && webWadar.friendHeadImg && webWadar.friendHeadImg.indexOf('{}') != -1) {
			friendFaceImage = Fps.Config.getSiteRootPath() + webWadar.friendHeadImg.split('{}')[0];
	}
	
	Fps_Conf_chatTemplet = unescape(Fps_Conf_chatTemplet);
	Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.
		replace(/\{base\}/g,Fps_Conf_basePath).
		replace(/\{templets\}/g,Fps_Conf_templets).
		replace(/\{temphtmlpath\}/g,Fps_Conf_tempHtmlPath).
		replace(/\{SendKeyHelp\}/g,Fps.text[32]). ///发送快捷键为:
		replace(/\{SendButtonText\}/g,Fps.text[21]).  ///发送
		replace(/\{FaceButtTitle\}/g,Fps.text[44]).   ///选择表情
		replace(/\{FileButtTitle\}/g,Fps.text[45]).   ///传送文件
		replace(/\{WebimChatKeyInfoText\}/g,Fps.Config.sendKey.toUpperCase()).
		replace(/\{ImageButtTitle\}/g,Fps.text[46]).   ///发送图片
		replace(/\{FontButtTitle\}/g,Fps.text[110]).   ///字体设置
		replace(/\{VideoButtTitle\}/g,Fps.text[47]).    
		replace(/\{AudioButtTitle\}/g,Fps.text[48]).    
		replace(/\{ChatLogTitle\}/g,Fps.text[16]).     
		replace(/\{ScrollUpText\}/g,Fps.text[58]).     
		replace(/\{ScrollDownText\}/g,Fps.text[59]).   
		replace(/\{SendFileFlash\}/g,sendFileFlash).   
		replace(/\{SendImageFlash\}/g,sendImageFlash).
		replace(/\{CIMSoftVersion\}/g,CIMSoftVersion).
		replace(/\{CloseButtonText\}/g,Fps.text[2])
		.replace(/\{complaintcauses\}/g,Fps.text[122])
		.replace(/\{complaintname\}/g,Fps.text[124])
		.replace(/\{complaintmobile\}/g,Fps.text[69])
		.replace(/\{complaintok\}/g,Fps.text[123]);    
	
	Fps_Conf_Rating = unescape(Fps_Conf_Rating).replace(/\{RatingTitle\}/g,Fps.text[94]).   
		replace(/\{Customtating0\}/g,Fps.text[95][0]).    
		replace(/\{Customtating1\}/g,Fps.text[95][1]).    
		replace(/\{Customtating2\}/g,Fps.text[95][2]).   
		replace(/\{Customtating3\}/g,Fps.text[95][3]).
		replace(/\{Customtating4\}/g,Fps.text[95][4]).
		replace(/\{Submit\}/g,Fps.text[93]).
		replace(/\{CloseButtonText\}/g,Fps.text[2]);
	
	Fps_Conf_MessageBoard = unescape(Fps_Conf_MessageBoard).replace(/\{MessageTitle\}/g,Fps.text[96]).
		replace(/\{MessageFormName\}/g,Fps.text[97]).
		replace(/\{MessageFormPhone\}/g,Fps.text[98]).
		replace(/\{MessageFormQQ\}/g,Fps.text[99]).
		replace(/\{MessageFormMSN\}/g,Fps.text[115]).
		replace(/\{Submit\}/g,Fps.text[93]).
		replace(/\{CloseButtonText\}/g,Fps.text[2]).
		replace(/\{MessageFormContent\}/g,Fps.text[116]);
		
	Fps_Conf_FaceToolBar = unescape(Fps_Conf_FaceToolBar).replace(/\{FaceButtTitle\}/g,Fps.text[44]).
		replace(/\{FileButtTitle\}/g,Fps.text[45]).
		replace(/\{ImageButtTitle\}/g,Fps.text[46]).
		replace(/\{FontButtTitle\}/g,Fps.text[110]).
		replace(/\{VideoButtTitle\}/g,Fps.text[47]).
		replace(/\{AudioButtTitle\}/g,Fps.text[48]).
		replace(/\{ChatLogTitle\}/g,Fps.text[16]).
		replace(/\{SendFileFlash\}/g,sendFileFlash).
		replace(/\{SendImageFlash\}/g,sendImageFlash).
		replace(/{FreeCallText}/g,Fps.text[0]).
		replace(/\{ChatLogButt\}/g,Fps.text[16]);
		
	Fps_Conf_Loading = unescape(Fps_Conf_Loading).replace(/\{LoadingText\}/g, Fps.text[119]);
	
	Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{CloseAllChatFunction\}/g,'parent.Fps.cl.closeAllChat();').
		replace(/\{ChatWindowTitleId\}/g,'ChatWindowTitle').
		replace(/\{ChatWindowUserStatusId\}/g,'ChatWindowUserStatus').
		replace(/\{CloseChatFunction\}/g,"parent.Fps.cl.closeChat(document.getElementById('ChatInput').getAttribute('userid'));").
		replace(/\{SendMessageFunction\}/g,'Chat.inputSubmit();').
		replace(/\{ShowShortKeyFunction\}/g,'Chat.showShortKey()').
		
		replace(/\{ChatMessageInput\}/g,unescape(Fps_Conf_chatMessageInput)).
		replace(/\{Rating\}/g,Fps_Conf_Rating).
		replace(/\{MessageBoard\}/g,Fps_Conf_MessageBoard).
		replace(/\{SendkeyList\}/g,unescape(Fps_Conf_SendkeyList)).
		replace(/\{FacePanel\}/g,unescape(Fps_Conf_FacePanel)).
		replace(/\{Loading\}/g,unescape(Fps_Conf_Loading)).
		replace(/\{FaceToolBar\}/g,Fps_Conf_FaceToolBar).
		replace(/\{ChatFontSetting\}/g,unescape(Fps_Conf_ChatFontSetting));
	
	Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/{FreeCallText}/g,Fps.text[0]).
		replace(/\{SoftNameText\}/g,Fps.Config.softName).
		replace(/\{ChatLogButt\}/g,Fps.text[16]).
		replace(/\{ServiceRating\}/g,Fps.text[102]).
		replace(/\{chat_complaint\}/g,Fps.text[126]).
		replace(/\{FriendHeadImage\}/g,friendFaceImage).
		replace(/\{ChatRightContent\}/g,rightStr);
		
	//隐藏用户选项卡
	if (Fps.Config.isHiddenWindHead) {
		Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{TabPanelDisplay\}/g, 'none').
		replace(/\{WindHeadDisplay\}/g, 'none');
	} else {
		Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{TabPanelDisplay\}/g, 'block').
		replace(/\{WindHeadDisplay\}/g, 'block');
	}
	
	if (Fps.Config.customSoftICON != '') {
		if (webWadar && webWadar.softICON && webWadar.softICON.indexOf('{}') != -1) {
			Fps.Config.customSoftICON = Fps.Config.getSiteRootPath() + webWadar.softICON.split('{}')[0];
		}
		
		Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{SoftICON\}/g, Fps.Config.customSoftICON).
		replace(/\{SoftNameIndent\}/g, '32').
		replace(/\{SoftICONDisplay\}/g, 'block');
	} else {
		Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{SoftICONDisplay\}/g, 'none').
		replace(/\{SoftNameIndent\}/g, '5');
	}
		
	if (Fps.Config.colorType) {
		Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{ColorId\}/g, Fps.Config.colorType);
	}
	
	//右下角广告
	if (Fps.Config.rightBottomAdvertising) {
		Fps_Conf_chatTemplet = Fps_Conf_chatTemplet.replace(/\{RightBottomAdvertising\}/g, Fps.Config.rightBottomAdvertising);
	}

	//填充内容
	chat.setContent(Fps_Conf_chatTemplet);
	//跟随页面滚动
	chat.scrollWithPage();
	
	Fps.UserEvent.addEventListener(window, 'resize', function() {
		chat.resetPostion();
		});
				
	setTimeout(function() {
			if (chat.getChildDoc().resize) {
				chat.getChildDoc().resize(w, h);	
			}
		}, 1000);
};

/*
 * 欢迎窗口
 * @param isShow 接收客服消息时 需要显示 忽略后台设置 
 * @param conetent 设置欢迎词
 */
/*
Fps.Window = function(conetent) {
	
	//如果窗口之前载入过就之间显示
	if(Fps.Global.windowClass != null){
		Fps.Global.windowClass.show();
		
		if(conetent != '')
		{
			Fps.Global.windowClass.getChildDoc().setContent(conetent);
		}
		
		return;
	}
	
	var windowClass = new Fps.WindowExt([
		['width', (Fps.DOM.getBodyWidth() - 500) + 'px'],
		['height',(Fps.DOM.getBodyHeight() - 20) + 'px'],
		['zIndex','1000002']
	],  'WebTMWindow');
	
	Fps.Global.windowClass = windowClass;
	
	Fps_Conf_WindowTemplet = unescape(Fps_Conf_WindowTemplet);
	var str = Fps_Conf_WindowTemplet.
	replace(/{SoftNameText}/g, Fps.Config.softName).
	replace(/\{base\}/g, Fps_Conf_basePath).
	replace(/\{templets\}/g, Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g, Fps_Conf_tempHtmlPath).
	replace(/\{ContentHeight\}/g, (Fps.DOM.getBodyHeight() - 120) + 'px').
	replace(/\{CloseWindow\}/g, 'parent.Fps.hideWindow()').
	replace(/\{ColorId\}/g, Fps.Config.colorType);
		
	//str = str.replace(/{CloseWelcomeFunction}/g, 'parent.Fps.hideWelcome();');
	windowClass.setContent(str);
	windowClass.scrollWithPage();
	
	//居中显示
	windowClass.setPostion('1', '1');
	Fps.Global.welcomeWindow = windowClass.getWindow();
};*/
/*
 * 欢迎窗口
 * @param isShow 接收客服消息时 需要显示 忽略后台设置 
 * @param conetent 设置欢迎词
 */

Fps.Welcome = function(isShow, conetent) {
	//已经关闭 就不再打开 直到重启浏览器为止
	var isCloseWelcome = Fps.Cookie.read(Fps.Environment.getDomain() + 'isCloseWelcome', '1');
	if (isCloseWelcome == '1' && !isShow) {
		return;
		//用户设置隐藏
	} else if (Fps.Global.user.webWadar.welWinDisType == "3" && !isShow) {
		return;
	}
	
	if (Fps.Config.welcomeIsShow == false) {
		return;
	}
	
	//如果窗口之前载入过就之间显示
	if(Fps.Global.welcomeClass != null){
		Fps.Global.welcomeClass.show();
		
		if(conetent != ''){
			Fps.Global.welcomeClass.getChildDoc().setContent(conetent);
		}
		
		return;
	}

	var tmpWidth = '390px';
	var tmpHeight = '150px';
	
	if (Fps.Config.welcomeWinodwBackground)
	{
		tmpWidth = Fps.Config.welcomeWinodwBackground.mainViewBackgroundImg.width;
		tmpHeight = Fps.Config.welcomeWinodwBackground.mainViewBackgroundImg.height;
	}
	
	var wel = new Fps.WindowExt([
		['width',tmpWidth],
		['height',tmpHeight],
		['zIndex','1000003']
	],  'WebTMWelcome');
	 
	Fps.Global.welcomeClass = wel;
	
	 
	/*var welcomeGreetings = Fps.Config.welcomeGreetings;
	if (Fps.Global.user.webWadar.welcomeGreetings != '') {
		welcomeGreetings = Fps.Global.user.webWadar.welcomeGreetings;
	}*/
	var welcomeGreetings="";
       //判断中英文
   /* if(Fps_Conf_Language=="zh-en"){
		   welcomeGreetings = Fps.Config.welcomeGreetings;
    }else{
		   welcomeGreetings = Fps.Config.welcomeGreetingsEng;
    }
    if(""==welcomeGreetings){
		   welcomeGreetings = Fps.Global.user.webWadar.welcomeGreetings;
    }*/
    if(Fps.Global.user.webWadar.welcomeGreetings!=""){
		TwelcomeGreetings = Fps.Global.user.webWadar.welcomeGreetings.split("#?#");
		if(Fps_Conf_Language=="zh-en"){
				welcomeGreetings = TwelcomeGreetings[0]!="null"?TwelcomeGreetings[0]:Fps.Config.welcomeGreetings;
			}
		else{welcomeGreetings =TwelcomeGreetings[1]!="null"?TwelcomeGreetings[1]:Fps.Config.welcomeGreetingsEng;}
	}else{
		if(Fps_Conf_Language=="zh-en"){welcomeGreetings = Fps.Config.welcomeGreetings;}
		else{welcomeGreetings = Fps.Config.welcomeGreetingsEng;}
	}
	 
	Fps_Conf_welcomeTemple = unescape(Fps_Conf_welcomeTemple);
	var str = Fps_Conf_welcomeTemple.
	replace(/{SoftNameText}/g, Fps.Config.softName).
	replace(/{FreeCallText}/g,Fps.text[0]).
	replace(/{ConsultingText}/g,Fps.text[1]).
	replace(/{CloseText}/ig,Fps.text[118]).
	replace(/{ContentText}/,welcomeGreetings).
	replace(/\{base\}/g,Fps_Conf_basePath).
	replace(/\{templets\}/g,Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g,Fps_Conf_tempHtmlPath);
	
	str = str.replace(/{CloseWelcomeFunction}/g, 'parent.Fps.hideWelcome();').
	replace(/{FreePhoneFunction}/g, 'parent.Fps.Button.freePhone();').
	replace(/{OpenChatFunction}/g, 'parent.Fps.cl.openWelcomeChat(); parent.Fps.hideWelcome();')
	
	if (Fps.Global.user.webWadar) {
		str = str.replace(/\{ColorId\}/g, Fps.Config.colorType);
	}
	
	wel.setContent(str);
	wel.scrollWithPage();
	
	var location = Fps.Global.user.webWadar.welWinLocation;
	//右下角显示
	if(location == '1'){
		wel.setPostion('2', '2');
	}else{
		//居中显示
		wel.setPostion('1', '1');
	}
	Fps.Global.welcomeWindow = wel.getWindow();
};/**
 * 聊天窗口部分的按钮组件
 */

Fps.Button = {	
	/**
	 * 添加投诉信息 
	 */
	addComplaint: function(content,compName,compMobel)
	{
		if (content == '')
		{
			return;
		}
		 
		Fps.addComplaintCallBack = function(json)
		{
			if (json.cim.result.code == '0')
			{
				Fps.cl.showSystemMsg(Fps.text[121]);  //投诉提交成功
			}
		};
		
		var userId = Fps.chatUserStack.getFrist();
		Fps.Http.get("addComplaint", {
				'radarId': Fps.Global.user.webWadar.id,
				'userId': userId,
				'content': content,
				'guestName':compName,
				'guestMobile':compMobel,
				'json': "true",
				'callbackFunc': 'Fps.addComplaintCallBack'
			  }, true);	
	},
	 
	/**
	 * 获取表情的图片资源地址
	 */
	faceEve: function(index) 
	{
		return Fps_Conf_tempHtmlPath + 'View/InnerChat/face/' + index + '.gif';
	},

	/**
	 * 获取表情的图片资源地址
	 */
	getFacePath: function() 
	{
		return Fps_Conf_tempHtmlPath + 'View/InnerChat/face/';
	},
	
	/**
	 * 视频聊天
	 * @param userId 用户编号 
	 */
	videoBut : function (userId) 
	{
		var u = [userId];
		Fps.Socket.sendMessage("26", u, "0", Fps.Config.userStatus, "1");
		Fps.cl.rec(userId, Fps.text[18], Fps.UserFunc.getNow(), "", true);
	},
	
	/**
	 * 语音聊天
	 * @param userId 用户编号 
	 */
	audioBut : function (userId) 
	{
		var u = [userId];
		Fps.Socket.sendMessage("26", u, "0", Fps.Config.userStatus, "0");
		Fps.cl.rec(userId, Fps.text[20], Fps.UserFunc.getNow(), "", true);
	},
	
	/**
	 * 免费电话 
	 */
	freePhone : function(userId) 
	{
		//var href = Fps_Conf_tempHtmlPath + 'View/FreePhone/index.jsp?phoneCode='+Fps.Global.user.webWadar.freePhoneCode+
		//'&shopId='+Fps.Config.shopId;
		
		////var href = Fps.Config.getSiteRootPath() + 'ClientPage/calltel.html';
		 
		var href = Fps.Config.getCallSiteRootPath() + 'netphone/calltel.html';
		var webWadar = Fps.Global.user.webWadar;
		var loginId = 0;
		
		if (webWadar && webWadar.shopMaster) 
		{
			loginId = webWadar.shopMaster.loginId;
			userPhone = webWadar.shopMaster.userPhone;
		}
		
		if (Fps.Config.customNetPhone != '')
		{
			if (Fps.Config.customNetPhone.indexOf('?') == -1) 
			{
				href = Fps.Config.customNetPhone + '?loginid=' + loginId + '&loginId=' + loginId;
			} 
			else 
			{
				href = Fps.Config.customNetPhone;
			}
			
			href += '&';
		} 
		else 
		{
			href += '?';
		}
		
		if (!userId) 
		{
			href += 'sessionId=' + Fps.Config.sessionId + '&loginId=' + loginId + '&loginid=' + loginId + '&bindNum=' + userPhone;
		} 
		else 
		{
			loginId = Fps.Global.users[userId].loginId;
			userPhone = Fps.Global.users[userId].userPhone;		
			href += 'sessionId=' + Fps.Config.sessionId + '&loginId=' + loginId + '&loginId=' + loginId + '&bindNum=' + userPhone;
		}
			
		window.open(href, 'WebTMFreePhone', 
		'width=' + 600+ ',height=' + 320 + 'menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no,location=no,titlebar=no');
	},

	/**
	 * 提交评价信息 
	 * @param userId 用户编号
	 * @param rating 评分值
	 */
	submitRating : function(userId, rating)
	{
		Fps.submitRatingCallBack = function(json)
		{
			if (json.cim.result.code == "0") 
			{
				Fps.cl.showSystemMsg(Fps.text[101]);
				Fps.Global.users[userId].friendMsgConut = 0;
			}
		};
		
		//客服没有与您对话
		if (Fps.Global.users[userId].friendMsgConut < 1)
		{
			Fps.cl.showSystemMsg(Fps.text[108]);
			return;
		}
		
		Fps.Http.get("ccEvaluateCS", {userId:userId,rating:rating,json:"true",callbackFunc:"Fps.submitRatingCallBack"}, true);		
	},
	
	/**
	 * 提交留言信息 
	 * @param userId 用户编号
	 * @param name 留言者名称
	 * @param phone 联系电话
	 * @param qq 联系QQ
	 * @param msn MSN帐号
	 * @param content 留言内容
	 */
	submitMessage : function(userId, name, phone, qq, msn, content)
	{
		
		Fps.submitCcSetServiceMsg = function(json)
		{
			if (json.cim.result.code == "0") 
			{
				alert(Fps.text[100]);
				
				if (parent.Fps.Config.sendSMSEnable != '1') 
				{
					Fps.cl.closeChat(userId);
				}
			}
		};
		
		Fps.Http.get("ccSetServiceMsg", {	
				userId: userId,
				name: name,
				phone: phone,
				qq: qq,
				msn: msn,
				shopId:Fps.Config.shopId,
                radarId:Fps.Global.user.webWadar.id,
				other: content,
				json: "true",
				callbackFunc: "Fps.submitCcSetServiceMsg" 
			}, true);
	 	 		
		var content = '访客' + name + '在网站给您留言,电话:' + phone + ' QQ:' + qq + ' 内容:' + content;
		Fps.Socket.sendMessage("22", [userId], '0', Fps.Config.userStatus, content, "0");
		
	 	if (parent.Fps.Config.sendSMSEnable == '1') 
		{
			Fps.Http.get("sendSms", 
				{
					userId: userId,
					phone: Fps.Global.users[userId].mobile,
					content: content,
					json: "true"
				}, true);
	 	} 
	}
};/**
 * 控制窗口组件
 * 负责用户列表窗口、邀请窗口的  打开和关闭
 */

Fps.WindowEvent = function () {	
	//隐藏好友列表 --c/用户列表关闭事件
	Fps.hideUserList = function() {
		Fps.userListCloseWindow.style.top = Fps.Global.userListWindow.offsetTop + 'px';
		Fps.Global.userListClass.hide();
		Fps.Global.userListCloseClass.show();
	};
		
	//显示联系人列表--c/小图标点击后的事件
	Fps.showUserList = function() {			
		Fps.Global.userListClass.show();
		Fps.Global.userListCloseClass.hide();
	}
	
	// 隐藏单个客服形式的窗口
	Fps.hideSingleUserList = function()
	{
		Fps.Global.singleUserListClass.hide();
	} 
	
	//隐藏欢迎窗口
	Fps.hideWelcome = function() {			
		Fps.Global.welcomeClass.hide();
		Fps.Cookie.save(Fps.Environment.getDomain() + 'isCloseWelcome', '1');
	}
	//隐藏邀请提示窗口
	Fps.hideVisit=function(){
		Fps.Global.visitClass.hide();
		//Fps.Cookie.save(Fps.Environment.getDomain() + 'isCloseVisit', '1');
	}
	
	/**
		隐藏用于显示常见问题的普通窗口
		*/
	Fps.hideWindow = function()
	{
		Fps.Global.windowClass.hide();
	}
	
	/**
		显示常见问题的窗口
		*/
	Fps.showWindow = function()
	{
		if (Fps.Global.windowClass == null)
		{
			// 显示常见问题内容的窗口
			Fps.Window('');
		}
		
		Fps.Global.windowClass.show();
	}
};/**
 *邀请窗口
 * @param isShow 接收客服消息时 需要显示 忽略后台设置 
 * @param conetent 设置提示内容
 */

Fps.TheVisit = function(isShow, conetent) {
	
    var tmpWidth = '390px';
	var tmpHeight = '150px';
	var vis = new Fps.WindowExt([
		['width',tmpWidth],
		['height',tmpHeight],
		['zIndex','1000003']
	],  'Web-cgq-TheVisit');
	Fps.Global.visitClass = vis;
	var name="张三";
	var theContent = "<span>用户 <label id='visitlabel' style='cursor: pointer;'>"
		+name+"</label> 邀请和你聊天</span>";
	Fps.Config.softName="聊天邀请";
	 
	Fps_Conf_theVisit = unescape(Fps_Conf_theVisit);
	var str = Fps_Conf_theVisit.
	replace(/{SoftNameText}/g, Fps.Config.softName).
	replace(/{FreeCallText}/g,Fps.text[0]).
	replace(/{ConsultingText}/g,Fps.text[1]).
	replace(/{CloseText}/ig,Fps.text[118]).
	replace(/{visit_agree}/g,Fps.text[39]).
	replace(/{visit_darry}/g,Fps.text[40]).
	replace(/{ContentText}/,theContent).
	replace(/\{base\}/g,Fps_Conf_basePath).
	replace(/\{templets\}/g,Fps_Conf_templets).
	replace(/\{temphtmlpath\}/g,Fps_Conf_tempHtmlPath);
	 
	str = str.replace(/{CloseVisitFunction}/g, 'parent.Fps.hideVisit();parent.Fps.MessageLogic.judgeVisit(1)').
	replace(/{OpenChatFunction}/g, 'parent.Fps.MessageLogic.judgeVisit(0);parent.Fps.hideVisit() ') /** parent.Fps.cl.openWelcomeChat('+theid1+')*/
	
	/** parent.Fps.MessageLogic.openWelcomeChat();*/
	if (Fps.Global.user.webWadar) {
		str = str.replace(/\{ColorId\}/g, Fps.Config.colorType);
	}
	
	vis.setContent(str);
	vis.scrollWithPage();
	
	var location = 2;
	//右下角显示
	if(location == '1'){
		vis.setPostion('2', '2');
	}else{
		//居中显示
		vis.setPostion('1', '1');
	}
	
	Fps.Global.visitWndow = vis.getWindow();
};/**
 * 初始化系统函数
 */
 
Fps.InitParam = {
	/**
	 * 初始化
	 */
	 
	init: function() {
		//初始化语言包
		Fps.text = Fps_Language();
		 
		//初始化聊天业务对象
		Fps.cl = new Fps.ChatLogic();
		//读取上次的用户状态
		Fps.Config.userStatus = Fps.Config.userStatus == "" ? Fps.Cookie.read("WEBCIM_FriendsStatus" + Fps.Config.version) : Fps.Config.userStatus;
		Fps.Config.userStatus = Fps.Config.userStatus == "" ? "10" : Fps.Config.userStatus;
		
		if(Fps.Config.clientType == "shopguest") {
			Fps.Config.userStatus = "10";
		}
		
			//读取上次未关闭的聊天窗口
		var us = Fps.Cookie.read("WEBCIM_UserStatusData" + Fps.Config.version);
		
		if (us != "") {
			eval(unescape(us));	
		}
	
		delete us;
			
		if (Fps.Config.clientType == "taobaouser") {
			Fps.userMsgType = "1";
		} else {
			Fps.userMsgType = "22"; //会话消息类型
		}
	}
}; /**
 * 数据结构
 */

 
 Fps.DataStruct = {
	 
	 //构建用户的数据结构
	 userStruct: function(userId, userObj) {
		//过滤重复
		if (Fps.Global.users[userId]) {
			return;
		}
		
		var user = {};
		user = userObj;
		user.userId = userId;
		user.friendMsgConut = 0;
		
		user.getLoginId = function() {
			if (this.loginId.indexOf('@') != -1) {
				return this.loginId.split('@')[0];
			} 
			
			return this.loginId;
		};
		
		
		user.getServiceName = function() {
			if (this.name) {
				return this.name;
			}
			
			return this.getName();
		};
		
		
		user.getName = function() {
			return this.nickname == "" ? this.getLoginId() : this.nickname;
		};
		
		user.getFace = function() {
			var faceSrc = Fps.Config.getSystemImage() + "userface/" + this.faceIndex + "-20-10.gif";
			return '<img src="'+ faceSrc + '"/ id="' + this.userId + '_face"  class="WebimFriendOffLine" >';
		};
		
		user.getStatus = function() {
			//过滤隐身状态
			if (this.status == '40') {
				return '50';
			}
			
			return this.status;
		};
			
		Fps.Global.chatHashTable[userId] = {chatlog:"", chatInput: ''};
		Fps.Global.users[userId] = user;
	 },
	 
	 
	 //客服列表的数据结构
	 CustomerServiceListStruct: {
		 usersId: [],
		 usersKey: {},
		 
		 addUser: function(userId, userObject) {
			 this.usersKey[userId] = userId;
			 this.usersId.push(userId);
			 Fps.DataStruct.userStruct(userId, userObject);
		 },
		 
		 
		 getUsersId: function() {
			 return this.usersId;
		 },
		 
		 
		 getUsers: function() {
			 var usersArray = [];
			 
			 for (var i=0; i<this.usersId.length; i++) {
				 usersArray.push(Fps.Global.users[this.usersId[i]]);
			 }
			 
			 usersArray = usersArray.sort(function(a, b) {
				var aStatus = parseInt(a.getStatus());
				var bStatus = parseInt(b.getStatus());
				return aStatus - bStatus;
			 });
			 
			 return usersArray;
		 },
		 
		 
		 isExist: function(userId) {
			 if (this.usersKey[userId]) {
				 return true;
			 }
			 
			 return false;
		 },
		 
		 
		 getFristOnlineUser: function() {
			 var userId = '';
			 
			 for (var i=0; i<this.usersId.length; i++) {
				 userId = this.usersId[i];
				 
				 if (Fps.Global.users[this.usersId[i]].getStatus() != 50) {
					 return userId;
				 }
			 }
			 
			 return this.usersId[0];
		 },
		 
		 /**
		 	获取字符串形式的联系人列表
		 	*/
		 getUserChatString: function()
		 {
			 var tmpString = '';
			 var tmpUserId = '';
			 var jstab='<table>'+tmpString+'</table>'; 
			  
			/* for (var i=0; i<this.usersId.length; i++) {
			 	 var mark="" ,jsty;
			 	 if(i%2==1){mark="<br />";jsty="position: absolute; margin-left: 150px;"}
			 	 else{jsty="position: absolute; margin-left:0px;"}
				 tmpUserId = this.usersId[i];
				 tmpString += '<a href="javascript:void(0);" style="font-size:14px;'+jsty+'" ' + 
				 ' onClick="parent.Fps.cl.openChat(' + tmpUserId + ')">' + 
				 Fps.Global.users[tmpUserId].name + '[' + Fps.Global.users[tmpUserId].name + '] ' 
				 + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mark;
			 }*/
			 for (var i=0; i<this.usersId.length; i++) {
				 tmpUserId = this.usersId[i];
				  var name=Fps.Global.users[tmpUserId].name;
                  if(name=="" ||name=="客服"){
				     name=parent.Fps.Config.listServiceName;                        
				  }

				 tmpString += '<a href="javascript:void(0);" style="font-size:12px;" ' + 
				 ' onClick="parent.Fps.cl.openChat(' + tmpUserId + ')">' + 
				 name + '[' +Fps.text[33][Number(Fps.Global.users[tmpUserId].status)]  + '] ' 
				 + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<br />';
			 }
			 
			 return '<br>You can also contact the following Customer Service:<br>' + tmpString;
		 }
	 },
	 
	 
	 //对话按钮的用户列表数据结构
	 ChatButtonListStruct: {
		 usersId: [],
		 usersKey: {},
		 
		 addUser: function(userId, userObject) {
			 this.usersKey[userId] = userId;
			 this.usersId.push(userId);
			 Fps.DataStruct.userStruct(userId, userObject);
		 },
		 
		 
		 getUsersId: function() {
			 return this.usersId;
		 },
		 
		 isExist: function(userId) {
			 if (this.usersKey[userId]) {
				 return true;
			 }
			 
			 return false;
		 }
	 }
 };// JavaScript Document

/**
 * 初始化系统函数
 */
 
Fps.InitParam = {
	/**
	 * 初始化
	 */
	init: function() {
		//初始化语言包
		 
		Fps.text = Fps_Language();
		 
		//初始化聊天业务对象
		Fps.cl = new Fps.ChatLogic();
		//读取上次的用户状态
		Fps.Config.userStatus = Fps.Config.userStatus == "" ? Fps.Cookie.read("WEBCIM_FriendsStatus" + Fps.Config.version) : Fps.Config.userStatus;
		Fps.Config.userStatus = Fps.Config.userStatus == "" ? "10" : Fps.Config.userStatus;
		
		if(Fps.Config.clientType == "shopguest") {
			Fps.Config.userStatus = "10";
		}
		
			//读取上次未关闭的聊天窗口
		var us = Fps.Cookie.read("WEBCIM_UserStatusData" + Fps.Config.version);
		
		if (us != "") {
			eval(unescape(us));	
		}
	
		delete us;
			
		if (Fps.Config.clientType == "taobaouser") {
			Fps.userMsgType = "1";
		} else {
			Fps.userMsgType = "22"; //会话消息类型
		}
	}
}; /**
 * 聊天记录组件
 */

Fps.ChatLog = {
	
	/***
	 * 过滤聊天记录内容
	 * @param userId 用户编号
	 * @param reg 表达式
	 * @param newStr 要替换的内容
	 */
	replace : function (userId, reg, newStr) {
		var c = Fps.Socket.readShared("WEBCIM_ChatLog" + Fps.Global.user.id + "_" + userId);
		c = c.replace(reg, newStr);
		Fps.Socket.saveShared("WEBCIM_ChatLog" + Fps.Global.user.id + "_" + userId, c);
	},
	
	/***
	 * 保存聊天记录
	 * @param userId 用户编号
	 * @param chatlog 聊天内容
	 */
	save : function (userId, chatlog) {
		return;
		
		if(!Fps.Global.connectIsReady) {
			return;
		}
		
		var c = "";
		c = Fps.Socket.readShared("WEBCIM_ChatLog" + Fps.Global.user.id + "_" + userId);
		//对聊天记录的保存进行条数限制
		var templog = "";
		var _log = templog + '{|}' + chatlog;
		
		if (c == null) {
			c = "";
		}
		
		//有记录消息条数标志
		if(c.indexOf('{|}') != -1) {
			c = c.split('{|}');
				
			//聊天记录大于要显示的条数
			if(c.length >= (Fps.Config.saveChatLogNum)) {
				//获取聊天记录中最后几条
				templog = c.slice(c.length - Fps.Config.saveChatLogNum - 1, c.length);
			} else {
				templog = c;
			}
				
			templog = templog.join("{|}"); //将聊天记录的数组转换成字符串
		} else {
			templog = c;
		}
		
		if(typeof Fps_Conf_chatlogOrder != "undefined" && Fps_Conf_chatlogOrder == "up") {
			_log = chatlog + '{|}' + templog;
		}else{
			_log = templog + '{|}' + chatlog;
		}
		
		Fps.Socket.saveShared("WEBCIM_ChatLog" + Fps.Global.user.id + "_" + userId, _log);
	},
	
	/***
	 * 读取聊天记录
	 * @param userId 用户编号
	 */
	read : function (userId) {
		return;
		
		if(!Fps.Global.connectIsReady) {
			return;
		}
		
		return Fps.Socket.readShared("WEBCIM_ChatLog" + Fps.Global.user.id + "_" + userId);
	},
	
	/***
	 * 显示聊天记录
	 * @param userId 用户编号
	 */
	showChatLog : function (userId) {
		if(!Fps.Global.connectIsReady) {
			return;
		}
		
		var templog = [];
		var chatlog = Fps.ChatLog.read(userId);

		//读取聊天记录
		if (Fps.Config.showLastChatLogNum > 0 && Fps.Global.connectIsReady && !Fps.Global.chatClass.getChildDoc().Chat.hasMessage()) {
			if (chatlog == "null") {
				return;
			}
			
			//有记录消息条数标志
			if (chatlog.indexOf('{|}') != -1) {
				chatlog = chatlog.split('{|}');
				
				//聊天记录大于要显示的条数
				if (chatlog.length >= (Fps.Config.showLastChatLogNum + 1)) {
					//获取聊天记录中最后几条
					templog = chatlog.slice(chatlog.length - Fps.Config.showLastChatLogNum - 1, chatlog.length);
				} else {
					templog = chatlog;
				}
				
				templog = templog.join(""); //将聊天记录的数组转换成字符串
			}else{
				templog = chatlog;
			}
			
			//显示上次会话记录
			if (templog) {
				Fps.Global.chatClass.getChildDoc().Chat.showMessage(templog + '<div id="fps_lastchattit">' + Fps.text[63] + '<div>');
			}
		}
	}
};/**
 * 传输文件
 */
 
Fps.File = {
	/**
	 * 发送图片
	 * 将上传的图片显示在输入框中
	 * @param toUserId 接收者ID
	 * @param fileId 文件ID
	 * @param fileName 文件名称
	 * @param fileSize 文件大小
	*/
	sendImage : function (toUserId, fileId, fileName, fileSize) {
	 	 
		var src = Fps.Config.getUpLoadFileHead() + 
		'UserFileDownload?sessionId=' + Fps.Config.sessionId + '&fileId=' 
		+ fileId + '&isFromUser=true'; 
		//Fps.Global.chatClass.getChildDoc().Chat.addImg(src);
		
		var href = Fps_Conf_tempHtmlPath + 'Plugins/ViewImg.jsp?src=' + encodeURIComponent(src);
		var msg = '<p><a href="' + href + '" target="_blank"><img style="border:0px;" src="' + src + '" onload="autoScroll(document.getElementById(chatLogId))" title="' + Fps.text[92] +'" ></a></p>';
		Fps.cl.showImgMsg(msg);
		Fps.Socket.sendMessage("22", [toUserId], "0", Fps.Config.userStatus, msg);
		delete msg;
	},
	
	/**
	 * 发送文件
	 * 系统做出提示并提示对方接收文件
	 * @param toUserId 接收者ID
	 * @param fileId 文件ID
	 * @param fileName 文件名称
	 * @param fileSize 文件大小
	*/
	sendFile: function(toUserId, fileId, fileName, fileSize) {
		var msg = fileName + Fps.text[36];
		var content = fileId + "{}" + fileName + "{}" + fileSize + "{}" + Fps.UserFunc.aloneId();
		Fps.Socket.sendMessage("25", [toUserId], "0", Fps.Config.userStatus, content);
		Fps.cl.showSystemMsg(msg);
		delete msg;
		delete content;
	},
	
	/**
	 * 开始上传文件
	 * 上传提示
	 * @param size 文件大小
	 * @param name 文件名称
	 * @param uploadId 上传编号
	 */
	startUploadFile: function(size, name, uploadId) {
		var msg = Fps.text[109].replace('{FileName}', name).
		replace('{FileSize}', size).
		replace('{UploadId}', uploadId);
	    Fps.cl.showSystemMsg(msg);
	},
	startUploadImg: function(size, name, uploadId) {
		var msg = Fps.text[109].replace('{FileName}', name).
		replace('{FileSize}', size).
		replace('{UploadId}', uploadId);
	    Fps.cl.showImgMsg(msg);
	}
};/**
 * 对聊天窗口的属性对缓存处理
 */

Fps.ChatShared = {
	/**
	 * 缓存数据
	 */
	save : function () {
		//保存用户状态
		var us = Fps.Global.userStatusShared;
		var usArr = [];
		
		for (var i in us) {
			//如果有多余的属性直接跳过
			if(Fps.UserFunc.isFilterAtt(i)) {
				continue;
			}
			
			usArr.push("'" + i + "':'"+ us[i] +"'");
		}
		
		if (usArr.length != 0) {
			Fps.Cookie.save(
				"WEBCIM_UserStatusData" + Fps.Config.version + Fps.Config.clientType, 
				escape("Fps.Global.userStatusShared = {"+usArr.join(",")+"}"), 
				{expireDays:365,path:"/"}
			);
		}
		
		//记录陌生人
		if (Fps.Global.strangerArray.length != 0) {
			Fps.Cookie.save(
				"WEBCIM_StrangerData" + Fps.Config.version + Fps.Config.clientType, 
				escape("[" + Fps.Global.strangerArray.join(",") + "]"), 
				{expireDays:365,path:"/"}
			);
		}
				
		//存在未关闭的窗口
		if (!Fps.chatUserStack.isNull()) {
			Fps.Cookie.save(
				"WEBCIM_OpenedChatId" + Fps.Global.user.id + Fps.Config.version + Fps.Config.clientType, 
				escape("[" + Fps.chatUserStack.getAllElement().join(",") + "]"), 
				{expireHours:1, path:"/"}
			);
		}
	},
	
	/**
	 * 读取缓存数据
	 */
	read : function () {
		var s = unescape(Fps.Cookie.read(
			"WEBCIM_OpenedChatId" + Fps.Global.user.id + Fps.Config.version + Fps.Config.clientType
			));
		
		if (s == "") { return; }
		
		var chatusershared = eval(s);
		Fps.showSharedUser(chatusershared);
	}
};/**
 * 处理多媒体信息
 */
Fps.Media = {
	/**
	 * 开发视频窗口
	 * @param userId 接收者ID
	 * @param type 媒体类型
	 */
	openVideo : function (userId, type) {
		Fps.chatUserStack.getFrist();
		
		var str = Fps.Config.getCsPage() + 'AVDemo.html?myId=' + Fps.Global.user.id + '&mySession=' 
		+ Fps.Config.sessionId + '&yourId=' + userId +
		'&userType='+ type +'&shopId=0&cType=bs&v=' + Fps.UserFunc.aloneId();
		var w = 252;
		var h = 405;
		
		window.open(
			str, 
			'FpsMedia', 
			'width=' + w + ',height=' + h + ',menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no,location=no,titlebar=no'
		);
		
		if (type == "send") {
			Fps.Socket.sendMessage("27", [userId], "0", Fps.Config.userStatus, "1", Fps.Global.user.nickname);
		}
	},
	
	/**
	 * 开发语音窗口
	 * @param userId 接收者ID
	 * @param type 媒体类型
	 */
	openAudio : function (userId, type) {
		var str = Fps.Config.getCsPage() + 'FlashAudioCapture.html?myId=' + 
		Fps.Global.user.id + '&mySession=' + Fps.Config.sessionId + '&yourId=' + userId +
		'&userType='+ type +'&shopId=0&cType=bs&v=' + Fps.UserFunc.aloneId;
		var w = 252;
		var h = 330;
		
		window.open(
			str, 
			'FpsMedia', 
			'width=' + w + ',height=' + h + ',menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no,location=no,titlebar=no'
		);
		
		if (type == "send") {
			Fps.Socket.sendMessage("27", [userId], "0", Fps.Config.userStatus, "0", Fps.Global.user.nickname);
		}
	},
	
	/**
	 * 决绝视频语音请求
	 * @param userId 接收者ID
	 * @param type 媒体类型
	 */
	denyRequest : function (userId, type) {
		Fps.Socket.sendMessage("28", [userId], type, Fps.Config.userStatus, "0", Fps.Global.user.nickname);
		Fps.cl.rec(userId, Fps.text[56], Fps.UserFunc.getNow(), "", true);
	}
};/**
 * 检测分析页面中的对话按钮数据
 */
 
Fps.SmallIcon = {
	//对话按钮用户
	Icons: {},
	
	/**
	 * 检测页面中的对话按钮标记并提交给服务器获取用户详细信息
	 */
	getIconUser: function(){
		//获取页面中所有的对话按钮标记
		var u = document.getElementsByName('FpsSmallIconUser');

		if (!u) { 
			return; 
		} //是否存在小图标
		
		var userIdArr = []; //id方式的小图标
		var userLoginIdArr = []; //loginId方式的小图标 y有
		var userId, loginId, iconImg, onlineImg, offlineImg, userName, panel, tipsTitle;
		var talkButtonUI, onlineCss, offlineCSS;
		var uid = null;
		
		for (var i=0; i<u.length; i++) {
			userId = u[i].getAttribute("userid");
			loginId = u[i].getAttribute("loginid");
			tipsTitle = u[i].getAttribute("title");
			
			u[i].setAttribute("onclick", '{openChat}');
			iconImg = document.createElement("img");
			iconImg.style.display = "none";
			iconImg.style.cursor = "pointer";	
					
			var iconItem = { 
				idStyle: "",
				userid: 0,
				loginid: 0, 
				radar: u[i].getAttribute("radar")
			};	

			if (userId) {
				userIdArr.push(userId);
				iconImg.setAttribute("id", "samllicon_" + userId);
				iconImg.setAttribute("name", "samllicon_" + userId);
				iconItem.userid  = userId;
				iconItem.idStyle = "userid";
				Fps.SmallIcon.Icons[userId] = iconItem;
			} else if (loginId) {
				userLoginIdArr.push(loginId);
				iconImg.setAttribute("id", "samllicon_" + loginId);
				iconImg.setAttribute("name", "samllicon_" + loginId);
				iconItem.idStyle = "loginid";
				iconItem.loginid = loginId;
				Fps.SmallIcon.Icons[loginId] = iconItem;
			}
			
			iconImg.setAttribute("title", tipsTitle);
			iconImg.setAttribute("towindowclientparam", u[i].getAttribute("towindowclientparam"));
			//发送来访消息的属性
			iconImg.setAttribute("radar", u[i].getAttribute("radar"));
			iconImg.setAttribute("autoopen", u[i].getAttribute("autoopen"));
			iconImg.setAttribute("onclick", '{openChat}');
			iconImg.setAttribute("recguest", u[i].getAttribute("recguest") || "false"); //传递参数
			iconImg.setAttribute("showtype", u[i].getAttribute("showtype") || "");
			//附加参数
			iconImg.setAttribute("custom", u[i].getAttribute("custom") || "");
			//附加在聊天框右侧的参数信息
			iconImg.setAttribute("customparam", u[i].getAttribute("customparam") || "");
			onlineImg = u[i].getAttribute("onlineImg");
			offlineImg = u[i].getAttribute("offlineImg");
			iconImg.setAttribute("onlineImg", onlineImg);
			iconImg.setAttribute("offlineImg", offlineImg);
			iconImg.setAttribute("src", offlineImg);
			
			//定制对话按钮界面
			if (Fps.Config.customTalkButton) {
				u[i].innerHTML = Fps.Config.customTalkButton.uiHTML;
				
				if (userId) {
					u[i].firstChild.setAttribute("id", "samllicon_" + userId);
					u[i].firstChild.setAttribute("name", "samllicon_" + userId);
				} else if (loginId) {
					u[i].firstChild.setAttribute("id", "samllicon_" + loginId);
					u[i].firstChild.setAttribute("name", "samllicon_" + loginId);
				}
				
				u[i].firstChild.setAttribute("onlinecss", Fps.Config.customTalkButton.onlineCss);
				u[i].firstChild.setAttribute("offlinecss", Fps.Config.customTalkButton.offlineCss);
				u[i].firstChild.setAttribute("onclick", '{openChat}');
				//标识对话按钮被定制过
				u[i].firstChild.setAttribute("iscustomui", 'true');
				u[i].firstChild.className =  Fps.Config.customTalkButton.offlineCss;
			} else {
				u[i].appendChild(iconImg);
			}
		}
		
		//请求id形式的小图标
		if (userIdArr.length > 0) {
			var par = { 
				userId : userIdArr.join(","),
				queryUserStatus:"true",
				json:"true",
				callbackFunc:"Fps.SmallIcon.hanelGetIconUsers"};
			
			//页面中已经存在对话按钮用户的数据 	
			if (Fps.Config.chatButtonUsersData) 
			{
				eval(Fps.Config.chatButtonUsersData);
				return;
			} 
			else
			{
				Fps.Http.get("getUsers", par);	
			}	
		}
				
		//请求loginId形式的小图标		
		if (userLoginIdArr.length > 0) {
			var par = { 
				loginId:userLoginIdArr.join(","),
				queryUserStatus:"true",
				json:"true",
				callbackFunc:"Fps.SmallIcon.hanelGetIconUsers"};
				
			//页面中已经存在对话按钮用户的数据 	
			if (Fps.Config.chatButtonUsersData) 
			{
				eval(Fps.Config.chatButtonUsersData);
			} 
			else
			{
				Fps.Http.get("getUsers", par);	
			}
		}
	},
	
	/**
	 * 点击对话按钮的事件函数
	 * @param o 对话按钮的DOM容器
	 */
	smallIconClickFun : function (o) {
		//检测本机是否安装了客户端软件
		if (Fps.Config.isWakeCs) {
			Fps.ActiveX.checkCsClient();
		}
		
		var userId = o.getAttribute("userid") || o.userid;
		
		//将产品信息参数发送给客户端
		if (o.getAttribute("towindowclientparam")) {
			Fps.Http.get("sendUserMessage", {
				userId: userId, 
				messageType: '49', 
				messageText: o.getAttribute("towindowclientparam"), 
				json:"true", 
				callbackFunc:"void"
			});
		}
		
		/*//没有登录本机客户端时 并且启用了此功能 就启动web聊天
		if (Fps.Config.isWakeCs && Fps.Global.clientIsLogined == false && Fps.Config.isNotLoginStartWebIm == true) {
			Fps.Config.smalliconClickEvent(o);
			//打开客户端软件窗口
		} else */
		if (o.getAttribute("towindowclientparam") && typeof(Fps_Conf_chatRightUri)=="string") {
          if(isIE){
            document.frames["WebTMChat"].document.getElementById("WebimRightIframe").src = Fps_Conf_chatRightUri + o.getAttribute("towindowclientparam");
           }else{
            document.getElementById("WebTMChat").contentDocument.getElementById("WebimRightIframe").src=Fps_Conf_chatRightUri + o.getAttribute("towindowclientparam");
          }
        }
        
        
		if (Fps.Config.isWakeCs && Fps.ActiveX.checkCsClient()) {
			Fps.ActiveX.chatWithSimpleCilent(o);
			//不检测客户端 直接打开新窗口
		} else if (Fps.Config.smalliconClickEvent) {
			Fps.Config.smalliconClickEvent(o);
			//打开内嵌式聊天窗口
		} else {
			Fps.cl.simpleOpenChat(o);
		}
	},
	
	/**
	 * 接收对话按钮的用户详细信息
	 * @param r 服务器返回的json数据
	 */
	hanelGetIconUsers : function (r) {
		if (r.cim.result.code != "0") {
			return;
		}
	
		var users = [], userArr = [], userId = '', iconUserId = '', iconUserObj, recGuestMsgUsers = [];
		//兼容 单对象和数组的数据类型
		if(r.cim.users.constructor == Array){
			users = r.cim.users;
		}else{
			users.push(r.cim.users.user);
		}
		
		
		for(var i=0;i<users.length; i++) {
			var p = users[i];
			Fps.DataStruct.ChatButtonListStruct.addUser(p.id, p);
			
			var icon = (Fps.SmallIcon.Icons[p.id] || Fps.SmallIcon.Icons[p.loginId]);
			
			if(icon) {
				p.autosend = icon.radar;
			} else {
				p.autosend = false;
			}
			
			userId = users[i].id;
			userArr.push(userId);
			
			if(p.autosend && p.autosend == 'true') {
				recGuestMsgUsers.push(userId);
			}
			
			
			if(Fps.DOM.getDom("samllicon_" + users[i].id)) {
				iconUserId = "samllicon_" + users[i].id;
				Fps.Global.users[userId].smallId = "samllicon_" + users[i].id;
			}else{
				iconUserId = "samllicon_" + users[i].loginId;
				Fps.Global.users[userId].smallId = "samllicon_" + users[i].loginId;
			}
			
			
			iconUserObj = document.getElementsByName(iconUserId);
			//根据状态更新对话按钮的图片
			for (var j=0; j<iconUserObj.length; j++) {
				var iconEle = iconUserObj[j];
				//定制界面的对话按钮
				if (Fps.Config.customTalkButton) {
					iconEle.setAttribute("onlinecss", Fps.Config.customTalkButton.onlineCss);
					iconEle.setAttribute("offlinecss", Fps.Config.customTalkButton.offlineCss);
					
					if (Fps.Global.users[userId].status == '0' || Fps.Global.users[userId].status == 0) 
					{
						Fps.Global.users[userId].status = '50';
					}
					
					if (Fps.Global.users[userId].status != "50") {
						iconEle.className = Fps.Config.customTalkButton.onlineCss;
					} else {
						iconEle.className = Fps.Config.customTalkButton.offlineCss;
					}
					
				} else {
					if (Fps.Global.users[userId].status != "50") {
						iconEle.src = iconEle.getAttribute("onlineimg");
					} else {
						iconEle.src = iconEle.getAttribute("offlineimg");
					}
				}
				
				
				var o = iconEle.parentNode;
				o.setAttribute("userid", userId);
				iconEle.setAttribute("userid", userId);
				iconEle.setAttribute("customparam", iconUserObj[j].getAttribute("customparam"));
				iconEle.setAttribute("towindowclientparam", iconUserObj[j].getAttribute("towindowclientparam"));
				iconEle.style.display = "inline";
				iconEle = iconUserObj[j];
				o.innerHTML = o.innerHTML.replace(/{openChat}/g, "Fps.SmallIcon.smallIconClickFun(this)");
				var panel = iconUserObj[j].parentNode.parentNode;
				panel.replaceChild(iconUserObj[j], iconUserObj[j].parentNode);
				//自动打开聊天窗口
				if (iconUserObj[j].getAttribute("autoopen") == 'true') {
					Fps.SmallIcon.smallIconClickFun(o);
					//iconUserObj[j].style.display = 'none';
					return;
				}
			}
		}
		
		
		//把用户名不正确的label标记也替换掉， 方便布局
		var u = document.getElementsByName('FpsSmallIconUser');
		
		for(var i=0;i<u.length;i++) {
			u[i].parentNode.replaceChild(u[i].firstChild, u[i]);
		}
		
		//发送来访消息
		if(recGuestMsgUsers.length != 0) {
			Fps.Http.sendGuestMessage(recGuestMsgUsers);
		}
		
		//请求对话按钮的用户状态
		if (!Fps.Global.connectIsReady) {
			Fps.Global.usersArr = Fps.Global.usersArr.concat(userArr);
		} else {
			Fps.Socket.queryStatus(userArr); //发送状态请求
		}
	}
};/***
 * 组件联系人数据
 */
Fps.BuildFriendData = {
	/**
	 * 遍历调整好友数据
	 * @param friendKinds 好友分组数据 
	 */
	 eachFriendData: function(friendKinds) {
		 //分析用户分组数据
		for(var i = 0; i < friendKinds.length; i++) {					
			var user = friendKinds[i].user;
			//逐个分析 单用户数据
			for (var j=0; j<user.length; j++) {
				var userId = user[j].userId && user[j].userId != "0" ? user[j].userId : user[j].id;
				Fps.DataStruct.CustomerServiceListStruct.addUser(userId, user[j]);
			}
		}

		this.afterInit();
	 },
	 
	/**
	 * 构建完数据后做些后续工作
	 */
	 afterInit: function() {
		//标识用户数据已经加载完成
		Fps.Global.userDataIsLoaded = true;
		var webWadar = Fps.Global.user.webWadar;
		
		
		if (Fps.Config.isOpenNewPageChat  || (webWadar && webWadar.showStyle == '1')) {
			//用户已经设置外部打开窗口
			Fps.Global.openNewWinChat = true;
			Fps.Config.windowType = 'CustomOutPage';
		}
		
		//更新人员列表
		if (Fps.Global.userListBuilded && Fps.userToKind.length != 0) {
			Fps.Global.userListClass.show()
	
			if (Fps.Config.contactListStyle == 'list')
			{
				Fps.Global.userListClass.getChildDoc().buildFriendList();
			}

			this.clearData();
		} else {
			//第一次构建人员列表 绘制界面
			Fps.UILogic.init();
			//分析页面中对话按钮标记
			Fps.UserEvent.onReady(Fps.SmallIcon.getIconUser);	
			//发送来访信息
			Fps.Http.sendGuestMessage(Fps.DataStruct.CustomerServiceListStruct.getUsersId());
		}
	 },
	 
	 /**
	  * 初始化
	  * @param friendKinds 好友分组数据 
	  */
	 init: function(friendKinds) {
	 	Fps.friendKindsArray = [];
		Fps.userToKind = [];
		Fps.friendKindsObj = {};
		Fps.friendUsersArray = [];
		//上线的用户ID
		Fps.Global.onlineUserArray = [];

		this.eachFriendData(friendKinds);
	 },
	 
	 /**
	  * 清空数据
	  * @param friendKinds 好友分组数据 
	  */
	 clearData: function() {
	 }
};/**
 * 保存 读取最近联系人
 */
 
Fps.RecentContacts = {
	//用户数组
	userArr : [],
	userObj : {},
	userData : [],
	
	/**
	 * 在数组中查找指定项
	 * @param data 查找的数据
	 * @return 数组下标 
	 */
	ArrIndexOf : function(data){
		for(var i=0; i<this.userArr.length; i++){
			if(this.userArr[i] == data){
				return i;
			}
		}
		
		return -1;
	},
	
	/**
	 * 保存最近联系人的信息
	 * @param userId 用户编号
	 */
	save: function(userId){
		//聊过天
		if (Fps.Global.chatHashTable[userId].chatlog != ''){
			if (this.userObj[userId]) {
				//重复的联系人 改变顺序
				var index = this.ArrIndexOf(userId);
				this.userArr.splice(index, 1);
					//this.userArr.push(userId);
				this.userArr = [userId].concat(this.userArr);
			} else {
				//倒序添加联系人
				this.userArr = [userId].concat(this.userArr);
				//this.userArr.push(userId);
				
				this.userObj[userId] = true;
				//始终保存固定项的数据 不能超过指定的数量
				if (this.userArr.length > Fps.Config.maxConcatNumber){
					var delUID = this.userArr.pop(); 
					this.userObj[delUID] = false;
				}
			}
			
			var str = this.userArr.join(',');
			
			Fps.Cookie.save("WebtmRecentContacts" + Fps.GetServerData.getLoginType(), escape(str), {expireDays:365,path:"/"});
			
			this.userData = [];
			
			for(var i=0; i<this.userArr.length; i++){
				this.userData.push(Fps.Global.users[this.userArr[i]]);
			}
			
			Fps.Global.usersArr = [];
			Fps.Global.userListBuilded = true;
			Fps.BuildFriendData.init([{"id":"-100", "name":Fps.text[53], "user":this.userData}]);
		}
	},
	
	/**
	 * 读取缓存
	 */
	read : function(){
		var s = unescape(Fps.Cookie.read("WebtmRecentContacts" + Fps.GetServerData.getLoginType()));
		return s;
	},
	
	/**
	 * 获取联系人的详细信息
	 */
	getContactsInfo: function(){
		var userId = this.read();

		if (userId != '') {
			var par = {
				userId: userId,
				queryUserStatus: "true",
				json: "true", 
				callbackFunc:"Fps.RecentContacts.hanelGetUsers"};
			Fps.Http.get("getUsers", par);
		} 
		
		Fps.UILogic.init();
		Fps.UserEvent.onReady(Fps.SmallIcon.getIconUser);
	},
	
	/**
	 * 接收最近联系人的详细信息
	 */
	hanelGetUsers: function(json){
		var result = json.cim.result;

		if(result.code == '0'){
			var users = [];
			
			if(json.cim.users.constructor == Array){
				users = json.cim.users;
			}else{
				users.push(json.cim.users.user);
			}
			
			this.userData = users;
			Fps.Global.userListBuilded = true;
			Fps.BuildFriendData.init([{"id":"-100", "name":Fps.text[53], "user":users}]);	
		}
	}
};/***
 * 获取服务器数据、系统的数据来源
 */
 
Fps.GetServerData =  {
	/***
	 * 检测登录类型
	 */
	getLoginType : function() {
		//WebtmLoginData 是服务器登录后写的Cookie数据 
		//里面记录等用户sessionId 等登录信息
		var loginData = Fps.Cookie.read("WebtmLoginData");
		//以用户身份登录 
		if (loginData != '' && Fps.Config.shopId == '0') {
			//类似淘宝旺旺的操作方式 记录最近的20个联系人
			Fps.Config.clientType = 'taobaouser';
		}
		
		return Fps.Config.clientType;
	},
	
	/***
	 * 保存用户登录的数据
	 */
	saveTaobaoData: function() {
		var loginData = Fps.Cookie.read("WebtmLoginData");
		//在url编码时空格会变为+ 所以将url编码的 + 转为 空格
		loginData = loginData.replace(/\+/gi, ' ');
		loginData = unescape(loginData);
		Fps.Config.clientType = "user";
		eval(loginData);
		var result = cimdataXML.cim.result;
		
		if(result.code == '0'){
			var user = cimdataXML.cim.user;
			Fps.Config.sessionId = result.sessionid;
			Fps.Global.user.id = user.id;
			Fps.Global.user.area = result.area;
			Fps.Global.user.nickname = user.nickname;
			Fps.Global.userDataIsLoaded = true;
			//读取最近联系人列表
			Fps.RecentContacts.getContactsInfo();
		}
	},
	
	/***
	 * 保存访客登录信息
	 * param o 服务器返回的JSON数据
	 */
	saveGuestData: function(o) {
		var r = o.cim.result;
		
		if (r.code == "0") {
			//接口容错 访客id不可用
			if(r.guestCode == "0") {
			  	Fps.removeCookie("WEBCIM_GuestId" + Fps.Config.version + Fps.Config.logicServer);
				Fps.Config.sessionId = r.sessionId;
				Fps.SmallIcon.getIconUser();
				return;
			}
			
			Fps.Config.sessionId = r.sessionid;
			Fps.Global.user.id = r.guestId;
			Fps.Global.user.area = r.area;
			Fps.Global.user.guestCode = r.guestCode;
			Fps.Global.user.nickname = Fps.Config.guestName != "" ? Fps.Config.guestName : Fps.text[22] + "_" + r.guestCode;
			 
			
			Fps.Cookie.save("WEBCIM_GuestId" + Fps.Config.version+Fps.Config.logicServer, r.guestId, {expireDays:365});
		}
		
		Fps.Global.userDataIsLoaded = true;
		Fps.UserEvent.onReady(Fps.SmallIcon.getIconUser);
		Fps.UILogic.init();
	},
	
	/***
	 * 获取访客类型的数据
	 */
	getGuestData: function() {
		//如果是外部开打的聊天窗口就不需要登录
		Fps.UILogic.init();
		
		//系统弹出的新聊天窗口 不再获取访客信息
		if (Fps.Config.getWindowType() == 'SystemOutPage') {
			return;
		}
		
		var guestId = Fps.Cookie.read("WEBCIM_GuestId" + Fps.Config.version + Fps.Config.logicServer);
		guestId = guestId == "" ? 0 : guestId;
		
		var par = {
			guestId: guestId,
			json:"true",
			siteId: Fps.Config.siteGroupId,
			callbackFunc: "Fps.GetServerData.saveGuestData"
		};
		
		par.messageType = '6';
		par.url = window.location.href;
		par.title = document.title;
		par.urlSource = document.referrer;
		par.domain = Fps.Environment.getDomain();
		par.waloBrowser = Fps.Environment.getBrowser();
		par.waloResolution = Fps.Environment.getResolution();
		par.waloSystems = Fps.Environment.getSystem();
		
		Fps.Http.get("guestLogin", par);
	},
	
	/**
	 * 保存企业版的访客登录
	 * @param json 服务器的json数据
	 */
	saveShopGuestData: function(json) {
		var result = json.cim.result;
		 
		if(result.code == '0')
		{
			Fps.Config.sessionId = result.sessionId;
			 
			Fps.Global.user.area = result.area;
			Fps.Global.user.id = result.guestId;
			Fps.Global.user.guestCode = result.guestCode;
			 
			Fps.Global.user.nickname = Fps.Config.guestName != "" ? Fps.Config.guestName : Fps.text[22] + "_" + result.guestCode;	
			Fps.Cookie.save("WEBCIM_GuestId" + Fps.Config.version + Fps.Config.logicServer, result.guestId, {expireDays:365});
			Fps.Cookie.save("WEBCIM_SessionId" + Fps.Config.version + Fps.Config.logicServer, result.sessionId);
			Fps.Global.user.webWadar = json.cim.webWadar;
			  ////alert("--"+Fps.Global.user.webWadar.lanage);
			Fps.Global.user.webWadar.shopMaster = json.cim.shopMaster;
			
			if (!json.cim.wwUsers) {
				return;
			}
			
			// Free版新增内容 -----------------------
			if (json.cim.questions) 
			{
				var questions = [];
				
				if (json.cim.questions.constructor == Array)
				{
					questions = json.cim.questions;
				}
				else
				{
					questions.push(json.cim.questions.question);
				}
				
				Fps.Config.commonQuestions = questions;
			}
			
			if (json.cim.advertises)
			{
				var advertises = [];
				
				if (json.cim.advertises.constructor == Array)
				{
					advertises = json.cim.advertises;
				}
				else
				{
					advertises.push(json.cim.advertises.advertise);	
				}
				
				Fps.Config.advertising = advertises;
			}
			
			if (json.cim.result.version)
			{
				Fps.Config.logicServerVersion = json.cim.result.version; 
			}
			
			if (json.cim.webWadar.shopNotes)
			{
				Fps.Config.companyInfo = json.cim.webWadar.shopNotes;
			}
			
			if (json.cim.webWadar.styleContent)
			{
				Fps.Config.welcomeWinodwBackground = json.cim.webWadar.styleContent;	
			}
			
			if (json.cim.webWadar.styleUrl)
			{
				Fps.Config.singleCantactImg = json.cim.webWadar.styleUrl; 	
			}
			
			var softName = Fps.Global.user.webWadar.softName;
			//软件名称
			if(softName != '' && softName != 'null'){
				Fps.Config.softName = softName;
			}
			
			//下线提示语
			if(Fps.Global.user.webWadar.defChatContent == '' || Fps.Global.user.webWadar.defChatContent == 'null'){
				Fps.Global.user.webWadar.defChatContent  = Fps.text[91];
			}
			
			//读取快捷键设置信息
			var shortkey = Fps.Cookie.read("fps_im_send_shortkey");	
				
			if(Fps.Global.user.webWadar.sendKey != '' && Fps.Global.user.webWadar.sendKey != 'null'){
				Fps.Cookie.save("fps_im_send_shortkey", Fps.Global.user.webWadar.sendKey, {expireDays:365});	
			}
			
			Fps.Global.userDataIsLoaded = true;
			var wwUsers = [];
			
			if(json.cim.wwUsers.constructor == Array){
				wwUsers = json.cim.wwUsers;
			}else{
				wwUsers.push(json.cim.wwUsers.wwUser);
			}
			
			Fps.BuildFriendData.init([{"id":"-100", "name":Fps.text[53], "user":wwUsers}]);	
		}
	},
	
	/***
	 * 获取企业访客类型的数据
	 */
	getShopGuestData: function() {
		var guestId = Fps.Cookie.read("WEBCIM_GuestId" + Fps.Config.version + Fps.Config.logicServer);
		guestId = guestId == "" ? 0 : guestId;	
		
	 	if(guestId==0){
	 		var sessionId="";
	 	}else{
	 		var sessionId = Fps.Cookie.read("WEBCIM_SessionId" + Fps.Config.version + Fps.Config.logicServer);
	 	}
		 
			
		var par = {
			guestId: guestId,
			sessionId: sessionId,
			siteId: Fps.Config.siteGroupId,
			shopId: Fps.Config.shopId,
			webWadarIndex: Fps.Config.webWadarIndex
		};
			
		if (Fps.Config.guestName.indexOf("{}") != -1) {
			par.guestName =	Fps.Config.guestName;
			Fps.Config.guestName = Fps.Config.guestName.split("{}")[0];
		} else {
			par.guestName = Fps.Config.guestName;
		}
			
		par.messageType = '6';
		par.url = window.location.href;
		par.title = document.title;
		par.urlSource = document.referrer;
		par.domain = Fps.Environment.getDomain();
		par.waloBrowser = Fps.Environment.getBrowser();
		par.waloResolution = Fps.Environment.getResolution();
		par.waloSystems = Fps.Environment.getSystem();
		par.json = 'true';
		par.callbackFunc = 'Fps.GetServerData.saveShopGuestData';
		Fps.Http.get("guestLoginMessage", par);////12.5.3屏蔽///
	},
	
	/***
	 * 初始化、根据登录类型获取数据
	 */
	init: function() {
		if (this.getLoginType() == 'taobaouser') {
			this.saveTaobaoData();
		} else if (this.getLoginType() == 'guest') {
			this.getGuestData();
		} else if (this.getLoginType() == 'shopguest') {
			this.getShopGuestData();
		}
	},
	
	/**
	 * 解析并装载用户数据
	 * @param userId 用户编号
	 * @param userObj 用户json信息
	 * @param type 用户类型
	 */
	parseUserData: function(userId, userObj, type){
		
		if (!Fps.Global.users[userId]) {
			Fps.Global.users[userId] = userObj;
			//Fps.Global.users[userId].moblie = userObj.moblie;
			Fps.Global.users[userId].name = userObj.nickname == "" ? userObj.loginId.split("@")[0] : userObj.nickname;
			Fps.Global.users[userId].nickname = Fps.Global.users[userId].name;
			Fps.Global.users[userId].showLoginId = userObj.loginId.indexOf("@") != -1 ? userObj.loginId.split("@")[0] : userObj.loginId;			Fps.Global.users[userId].userSex = userObj.sex;
			
			Fps.Global.users[userId].faceSrc = Fps.Config.getSystemImage() + "userface/" + userObj.faceIndex + "-20-10.gif";	
			Fps.Global.users[userId].className = "WebimFriendOffLine";
			Fps.Global.users[userId].getFace = function(){
				return '<img src="'+ this.faceSrc + '"/ id="' + this.id + '_face"  class="' + this.className + '" >';
			};
				
			Fps.Global.chatHashTable[userId] = {chatlog:"", chatInput: ''};
			Fps.Global.users[userId].type = type; //小图标
			Fps.Global.users[userId].kindId = [type];
		} else {
			Fps.Global.users[userId].loginId = userObj.loginId;
			Fps.Global.users[userId].type += "&" + type; //小图标
			Fps.Global.users[userId].faceIndex = userObj.faceIndex;
			Fps.Global.users[userId].kindId.push(type);
		}
		
		Fps.Global.users[userId].status = userObj.status == "40" ? "50" : userObj.status;
	}
}; /**
 * 操作消息数据流向的业务逻辑 
 */

Fps.MessageLogic = {
	/**
 	 * 获取聊天记录的连接信息 
	 * @param userId 联系人ID
 	 */
	getChatLogLink: function(userId) {
		var chatlogLink = Fps_Conf_tempHtmlPath + 'Plugins/ChatLog.jsp?friendId=' + userId + 
		'&friendName=' + (Fps.Global.users[userId].nickname) +
		'&sessionId=' + Fps.Config.sessionId + 
		'&selfName=' + (Fps.text[103]) +
		'&selfId=' + Fps.Global.user.id +
		'&facePath=' + Fps.Button.getFacePath() + 
		'&logic=' + (Fps.Config.getLogicHead());
		chatlogLink = encodeURI(chatlogLink);
		return chatlogLink;
	},
	
	/**
 	 * 构建用户详细信息数据 
	 * @param userId 联系人ID
 	 */
	buildUserData: function(userId) {
		
		var userData = {
			userId: userId,
			nickname: Fps.Global.users[userId].nickname,
			name:  Fps.Global.users[userId].name,
			statustText:  Fps.text[33][Fps.Global.users[userId].status],
			showLoginId:  Fps.Global.users[userId].getLoginId(),
			mobile:  Fps.Global.users[userId].mobile,
			sex:  Fps.text[71][Fps.Global.users[userId].userSex],
			officePhone: Fps.Global.users[userId].userPhone,
			qq:Fps.Global.users[userId].userQQ
		};
		
		return userData;
	},
	
	/**
 	 * 更新聊天窗口右侧面板 
	 * @param userId 联系人ID
 	 */
	updateChatRightData: function(userId) {
		//显示聊天信息和输入信息
		Fps.Global.chatClass.getChildDoc().Chat.showMessage(Fps.Global.chatHashTable[userId].chatlog);
		Fps.Global.chatClass.getChildDoc().Chat.showInput(Fps.Global.chatHashTable[userId].chatInput, userId);
		//显示上次聊天记录
		//Fps.ChatLog.showChatLog(userId);
		
		//根据状态判断是否该显示留言面板
		if(Fps.Global.users[userId].status != '50'){
			Fps.Global.chatClass.getChildDoc().hideMessagePanel()
		}else{
			//显示留言面板
			
			Fps.Global.chatClass.getChildDoc().showMessagePanel();
		}
		//显示头像	
		//Fps.Global.chatClass.getChildDoc().showUserHeadImg(Fps.Global.users[userId].faceSrc);
		
		//禁用离线留言 提示不能发送消息
		if (!Fps.Config.isAllowOfflineTalk && Fps.Global.users[userId].status == "50") {				
			//Fps.Global.chatClass.getChildDoc().showUserIdiograph(Fps.text[64]);
			Fps.Global.chatClass.getChildDoc().showUserIdiograph(Fps.Global.users[userId].getServiceName());
			//启用提示语 显示离线提示语
		} else {
			//Fps.Global.chatClass.getChildDoc().showUserIdiograph(Fps.Global.users[userId].idiograph);
			Fps.Global.chatClass.getChildDoc().showUserIdiograph(Fps.Global.users[userId].getServiceName());
		}
		
		
		//设置聊天记录连接 
		Fps.Global.chatClass.getChildDoc().setChatLogLink(Fps.MessageLogic.getChatLogLink(userId));
					
		//自定义聊天右侧面板的 更新链接地址
		if (Fps.Config.chatRightUri != "") {
		  Fps.Global.chatClass.getChildDoc().showUserInfo(Fps.MessageLogic.buildUserData(userId));
		} else {
			//调用子页面的方法显示用户详细信息
			Fps.Global.chatClass.getChildDoc().showUserInfo(Fps.MessageLogic.buildUserData(userId));
		}
		
		var userName = Fps.Global.users[userId].getServiceName();
		
		if (Fps.Config.isShowLoginIdInChatWindow) {
			userName += '(' + Fps.Global.users[userId].getLoginId() + ')';
		}
		
		//设置聊天窗口聊天人姓名
		Fps.Global.chatClass.getChildDoc().setChatUserTitle(userName);
	},
	
	/**
 	 * 在内存在记忆用户正在输入的信息 
	 * @param userId 联系人ID
 	 */
	saveInput: function(userId) {
		if (Fps.Global.chatHashTable[userId]) {
			setTimeout(function(){
				var input = Fps.Global.chatClass.getChildDoc().Chat.getInput();
				
				//消息预知功能 
				if(Fps.Global.chatHashTable[userId].chatInput != input && input != ''){
					Fps.Socket.sendMessage('24', [userId], "0", Fps.Config.userStatus, Fps.UserFunc.removeHtml(input), Fps.Global.user.nickname);
				}
				
				Fps.Global.chatHashTable[userId].chatInput = input;
				delete input;						
			}, 10);
		}
	},
	
	
	//接收发送离线短信的结果
	callBackSendSms: function(json) {
		var userId = Fps.chatUserStack.getFrist();
		
		if (json.cim.result.code != '0') {
			return;
			this.showMessage(userId, '短信发送失败原因：' + json.cim.result.msg, Fps.UserFunc.getNow(), "系统消息", 2);			
		}
	},
	
	/**
 	 * 关闭所有的聊天窗口 
	 * @param userId 联系人ID
 	 */
	closeChat: function(userId) {	
		  
		//如果要关闭的窗口是当前窗口 就把聊天信息界面清空
		if (userId == Fps.chatUserStack.getFrist()) {
			Fps.Global.chatClass.getChildDoc().Chat.clearChatlog();
			Fps.Global.chatClass.getChildDoc().Chat.clearInput();
		}
		//从会话数组中清除该用户
		Fps.chatUserStack.remove(userId);
		//记录窗口状态
		Fps.Global.users[userId].chatStatus = "close";
		
		//如果关闭后还存在其他会话窗口 那么打开最近的
		if (!Fps.chatUserStack.isNull()) {
			
			this.openChat(Fps.chatUserStack.getFrist());
			usershared = escape("[" + Fps.chatUserStack.getAllElement().join(",") + "]");
			Fps.Cookie.save(
				"WEBCIM_OpenedChatId" + Fps.Global.user.id + Fps.Config.version + Fps.Config.clientType, 
				usershared, 
				{expireHours:1, path:"/"});
			
		} else {
			//清空记录会话用户的信息
			Fps.Cookie.save("WEBCIM_OpenedChatId" + Fps.Global.user.id + Fps.Config.version + Fps.Config.clientType, "", 
			{expireHours:1, path:"/"});
			
			Fps.Global.chatClass.hide();
		}
		
		//关闭窗口时 取消显示过欢迎文字的标志
		Fps.Global.users[userId].isShowedWelMsg = false;
		
		if(Fps.Config.useRecentContacts) {
			//保存最近联系人
			Fps.RecentContacts.save(userId);	
		}
		
		//清除内存中记录的聊天信息
		Fps.Global.chatHashTable[userId].chatlog = '';
		Fps.Global.chatHashTable[userId].chatInput = '';
		
		//如果是弹出式的聊天窗口就关闭聊天窗口
		if(Fps.Config.getWindowType() == 'SystemOutPage') {
			setTimeout(function () {
				window.open('', '_parent', '');
				window.close();
			}, 10);
		}
	},
	
	/**
 	 * 打开聊天窗口 
	 * @param userId 联系人ID
	 * @param isHidden 是否隐藏
 	 */
	openChat: function(userId, isHidden) {
		//检测到本机安装了桌面商讯软件并且开启了该功能就直接打开客户端窗口
		var browserVersion = Fps.Environment.getBrowser();
		//FireFox 4 不支持ocx插件
		if (browserVersion.indexOf('FireFox 4') != -1 || browserVersion.indexOf('FireFox 5') != -1 || browserVersion.indexOf('FireFox 6') != -1) {
			Fps.Config.isWakeCs = false;
		}
		
		if (Fps.Config.isWakeCs && Fps.ActiveX.checkCsClient()) {
			Fps.ActiveX.chatWithSimpleCilent(userId);
			return false;
			//打开桌面商讯后就不再打开网页聊天窗口
		}

		//根据状态判断是否该显示用户自定义留言窗口
		if(Fps.Global.users[userId].status == '50' && Fps.Config.customMessageAddress != '') {
			this.openCustomMessage(userId);
			return;
		}
		
		//自定义留言函数
		if(Fps.Global.users[userId].status == '50' && Fps.Config.messageFunction) {
			Fps.Config.messageFunction();
			return;
		}
		
		//当聊天窗口隐藏时 显示它
		if(isIE || isChrome){
			Fps.Global.chatClass.show();
		}else{
			 
			 
			Fps.Global.chatClass.show();
			Fps.Global.chatWindow.style.left = Fps.Global.chatWindow.getAttribute('initleft') + 'px';
		}
		
		//重置坐标 适应多页的网页
		Fps.Global.chatClass.resetPostion();
		
		//关闭邀请窗口
		if(Fps.Global.welcomeClass){
			Fps.hideWelcome()
		}
		//关闭邀请聊天提示窗口
		if(Fps.Global.visitClass){
			Fps.hideVisit();
		}
		
		//聊天对象窗口处于打开状态时 设置为当前对话窗口
		if(Fps.Global.users[userId].chatStatus == "open"){
			Fps.chatUserStack.setFrist(userId); //将userId提到会话数组的最前面
			//聊天对象窗口处于关闭状态时 添加选项卡
		}else{
			Fps.chatUserStack.push(userId);
			Fps.Global.users[userId].chatStatus = "open";
		}
		
		//添加对话选项卡
		Fps.BridgeTab.addUser(userId);
		
		//记录本次聊天的所有用户信息 包括陌生人
		if(!Fps.Global.tempChatUsersIndex[userId]){ //过滤重复
			Fps.Global.tempChatUsersArr.push(userId);
		}
				
		//显示详细信息
		Fps.MessageLogic.updateChatRightData(userId);
		
		// 发送聊天接入请求
		Fps.Socket.sendMessage('60', [userId], "0", Fps.Config.userStatus, '-', Fps.Global.user.nickname);
		
		//没有显示过欢迎文字 并且客服端没有给访客发送过消息 <br/> 显示问候语
		if (!Fps.Global.users[userId].isShowedWelMsg && Fps.Global.chatHashTable[userId].chatlog == '') {
			
			if (Fps.Global.user.webWadar) {
				
				var onlienWords = Fps.Global.user.webWadar.defChatContent;
				// 显示转接列表 2011/12/23
				onlienWords += Fps.DataStruct.CustomerServiceListStruct.getUserChatString();
				
				//显示欢迎文字
				if (Fps.Global.users[userId].status != '50' && onlienWords != '') {
					this.showMessage(userId, onlienWords, Fps.UserFunc.getNow(), Fps.Global.users[userId].nickname);
				}else{
					//离线提示语
					//this.showMessage(userId, offlineWords, Fps.getNow(), Fps.users[userId].nickname);
				}
				
				Fps.Global.users[userId].isShowedWelMsg = true;
				delete onlienWords;
				
			} else if (Fps.Config.autoWelcomeContent != '') {
				
				var onlienWords = Fps.Config.autoWelcomeContent;
				// 显示转接列表 2011/12/23
				onlienWords += Fps.DataStruct.CustomerServiceListStruct.getUserChatString();
				//显示欢迎文字
				if (Fps.Global.users[userId].status != '50') {
					this.showMessage(userId, onlienWords, Fps.UserFunc.getNow(), Fps.Global.users[userId].nickname);
				}else{
					//离线提示语
					//this.showMessage(userId, offlineWords, Fps.getNow(), Fps.users[userId].nickname);
				}
			}
		}
	},
	
	/**
	 * html标签开打会话窗口 
	 * @param o DOM对象
	 */
	simpleOpenChat: function(o) {
		var userId = o.getAttribute("userid") || o.userid;
		//附加消息
		if(Fps.Global.users[userId] && o.getAttribute("custom") && o.getAttribute("custom") != ""){
			Fps.Global.users[userId].customMsg = o.getAttribute("custom");
		}
		
		//聊天窗口右侧附加参数
		if(Fps.Global.users[userId] && o.getAttribute("customparam") && o.getAttribute("customparam") != ""){
			Fps.Global.users[userId].customParam = o.getAttribute("customparam");
		}
		
		webWadar = Fps.Global.user.webWadar;
		
		if (Fps.Config.isOpenNewPageChat || (webWadar && webWadar.showStyle == '1')) {
			Fps.Config.windowType = 'CustomOutPage';
		}
		
		if (Fps.Config.getWindowType() == 'CustomOutPage') {
			this.openOutChat(userId);
		} else {
			this.openChat(userId);
		}
		
		delete userId;
	},
	
	/**
	 * 打开邀请界面中的聊天窗口
	 * 默认显示现在的第一次客服 全部离线就显示列表的第一个
	 */
	openWelcomeChat: function(){
		//默认取上线的第一个客服 都不在线时 取列表的第一个客服
		this.openChat(Fps.DataStruct.CustomerServiceListStruct.getFristOnlineUser());
	},
	
	/**
	 * 关闭所有的对话窗口
	 * @param userId 用户编号
	 * 每隔20毫秒关闭一个窗口直到所有窗口都关闭完
	 */
	closeAllChat: function()
	{
		var closeTimer = null;
		var closeFunction = function()
		{
			if(!Fps.chatUserStack.isNull())
			{
				Fps.MessageLogic.closeChat(Fps.chatUserStack.pop());
			}
			else
			{
				clearInterval(closeTimer);
			}
		};
		
		closeTimer = setInterval(closeFunction, 20);
	},
	
	/**
     * 接收消息
	 * @param userId 消息来源用户ID
	 * @param msg 消息内容
	 * @param time 消息发送时间
	 * @param userName 发送者名称
	 * @param isSelf 是否是发给自己的消息
	 */
	showMessage: function(userId, msg, time, userName, isSelf) {
		//记忆当前聊天用户
		Fps.Global.currentSendUser = userId;
		var m;
		//好友消息
		if (!isSelf) {
			var n = Fps.Global.users[userId].getServiceName();
			//过滤js脚本 <div\/?[^>]+> <\/?div>
			msg = msg.replace(/<script\/?[^>]+>/g, "").replace(/<\/?script>/g, "");
			m = unescape(Fps_Conf_friendMessage).replace("{Name}", n).replace("{SendTime}",time).replace("{Message}",  msg);
			delete n;
			//自己发给自己的消息
		} else if (isSelf == 1) {
			m = unescape(Fps_Conf_myMessage).replace("{Name}", n).replace("{SendTime}",time).replace("{Message}",  msg);
			//系统消息
		} else if(isSelf==3){ //弹出空白框
			m = unescape(Fps_Conf_systemMessage).replace("{Name}", '').
			replace("{SendTime}", time).replace("{Message}",'');
			
		} else if(isSelf==4){ //弹出图片
			m = unescape(Fps_Conf_myMessage).replace("{Name}","自己").replace("{SendTime}", time).replace("{Message}",msg);
			
		}else{
			m = unescape(Fps_Conf_systemMessage).replace("{Name}", Fps.text[54]).
			replace("{SendTime}", time).replace("{Message}",  msg);
		}
		

		//消息来自当前会话窗口
		if (userId == Fps.chatUserStack.getFrist()) {
			//alert("xiaosss");
			Fps.Global.chatHashTable[userId].chatlog = Fps.Global.chatHashTable[userId].chatlog.concat(m);
			Fps.ChatLog.save(userId, m + '{|}');//保存记录
			//显示聊天记录			
		    Fps.Global.chatClass.getChildDoc().Chat.showMessage(Fps.Global.chatHashTable[userId].chatlog);
		} else if (Fps.Global.users[userId]) { //消息来自好友列表 非当前窗口
			//alert("dddd");
			Fps.Global.chatHashTable[userId].chatlog = Fps.Global.chatHashTable[userId].chatlog.concat(m);
			Fps.ChatLog.save(userId, m + '{|}');//保存记录
			
			if (Fps.Global.users[userId].chatStatus != "open") {
				//聊天窗口已关闭
				this.openChat(userId);
			}
			
			Fps.chatHashTable[userId].isHaveMsg = true;
		} else {
			
			 //消息来自陌生人
		}
	},
	
	/**
     * 组织打开弹出式聊天窗口的网址
	 * @param userId 联系人IDs
	 */
	buildHref: function(userId) {
		var str = 'var data = {};';
		var att = Fps.Global.users[userId];
		/*			
		for (i in att) {	
			//如果有多余的属性直接跳过
			if(Fps.UserFunc.isFilterAtt(i) || i == 'notes' || i == 'getFace' || i == 'attArray') {
				continue;
			}
						
			str +=  'data.' + i +  '= "'+att[i]+'";';
		}*/
		str +=  'data.chatWitherId="' + userId + '";';
		str +=  'data.selfName="' + Fps.Global.user.nickname + '";';
		str +=  'data.serviceOfflineWords="'+ Fps.Global.user.webWadar.defChatContent +'";' ;
		str +=  'data.sessionId="' + Fps.Config.sessionId + '";';
		str +=  'data.selfId="' + Fps.Global.user.id + '";';
		
		//str +=  'softName="' + Fps.Config.softName + '";';
		var href = Fps_Conf_tempHtmlPath + 'View/OutChat/index.jsp?server=' +
		Fps.Config.logicServer + 
		'&tomcatPort=' + Fps.Config.logicPort + 
		'&ngPort=' + Fps.Config.ngPort + 
		'&skinId=' + Fps.Config.styleType + 
		'&colorType=' + Fps.Config.colorType + 
		'&language=' + Fps_Conf_Language +
		'&messageBroadEnable=' + Fps.Config.messageBroadEnable +
		'&rightPage=' + encodeURIComponent(Fps.Config.chatRightUri) + '&softName=' + 
		encodeURIComponent(Fps.Config.softName) + 
		'&par=' + encodeURIComponent(escape(str));
		delete str;
		return href;
	},
	
	/**
	 * 打开用户自定义的留言板页面 
	 * @param userId 用户编号
	 */
	openCustomMessage: function(userId) {
		var url = Fps.Config.customMessageAddress;
		
		if (url.indexOf('?') != -1) {
			url += '&userId=' + userId;
		} else {
			url += '?userId=' + userId;
		}
		
		window.open(url, 'WebTMCustomMessage' + userId);
	},
	
	/**
	 * 打开外部聊天窗口 
	 * @param userId 用户编号
	 */
	openOutChat: function(userId) {
		//检测本机是否安装了客户端软件
			
			//检测到本机安装了桌面商讯软件并且开启了该功能就直接打开客户端窗口
			if (Fps.Config.isWakeCs && Fps.ActiveX.checkCsClient()) {
				Fps.ActiveX.chatWithSimpleCilent(userId);
				return false;
				//打开桌面商讯后就不再打开网页聊天窗口
			}
			
			//根据状态判断是否该显示用户自定义留言窗口
			if(Fps.Global.users[userId].status == '50' && Fps.Config.customMessageAddress != '') {
				this.openCustomMessage(userId);
				return;
			}
			
			if(Fps.Global.users[userId].chatStatus != "open"){
				if (isIE || isChrome) {
					try {
						window.open(
							this.buildHref(userId) + '&time=' + (new Date()).getTime(), 
							'WebTMOutChat' + userId, 
							'width=' + 620 + ',height=' + 500 + 'toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1'
						);	
					} catch (e) {
					}
					
				} else {
					setTimeout(function(){
						window.open(
							Fps.MessageLogic.buildHref(userId), 
							'WebTMOutChat'+userId, 
							'width=' + 620+',height=' + 500+'toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1'
						);
					}, 500);	
				}
					
				
				//打开聊天窗口后就关闭邀请窗口
				if(Fps.Global.welcomeClass){
					Fps.hideWelcome()
				}
			}
	},
	judgeVisit:function(mark){
		//处理邀请提示 点击按钮后事件
		var id=Fps.Global.getObject("v-u");
		 
		var u = [];
		u.push(id);
		if(mark==0){ 
			//alert("this is id="+id);
			Fps.Socket.sendMessage(61, u, "0",10, "同意", Fps.Global.user.nickname);
			////Fps.cl.openWelcomeChat('100010001');
			Fps.cl.rec(id, "已经建立好连接", '','',3);
		}
		if(mark==1){
			Fps.Socket.sendMessage(62, u, "0",10, "拒绝", Fps.Global.user.nickname);
		}
	},
	/**
	 * 发送消息
	 */
	send: function() {
		 
		//登录用户类型
		var clientType = Fps.Config.clientType;
		var id = Fps.chatUserStack.getFrist();
		var senderName = Fps.Global.user.nickname;
		 
		//alert("发送消息"+Fps.chatUserStack.getFrist());
		if (Fps.Global.users[id].status == '50') {
			senderName += '[短信发送]';
		}
		
		var msgContent;
		var toCsMsg;
		//获取输入信息
		var msg = Fps.Global.chatClass.getChildDoc().Chat.getInput();
		//msg = msg.replace(/http:\/\/?[a-zA-Z0-9-]+(\.[a-zA-z0-9-\/]+)+/i, )
		
	 
		//系统禁用离线聊天功能
		if (!Fps.Config.isAllowOfflineTalk && Fps.Global.users[id].status == "50") {
			this.showMessage(id, Fps.text[64], Fps.UserFunc.getNow(), "", true);
			return;
		}
		
		//屏蔽无效字符
		if(msg.length > 1200){
			alert(Fps.text[86]);
			setTimeout(function(){
				Fps.Global.chatClass.getChildDoc().Chat.showInput(msg, id);
			}, 100);
			
			return;
		}
		
		Fps.Global.chatHashTable[id].chatInput = "";	
	
		//网络中断提示
		if (!Fps.Global.connectIsReady) {
			msg += '<p>' + Fps.text[77] + '</p>';
		}
		
		//过滤图片信息
		if(Fps.Config.isAllowSendImgMsg == false) {
			msg = msg.replace(/<img\/?[^>]+>/gi, "").replace(/<\/>/g, "");
		}
		
		//离线发送短信
		if (Fps.Global.users[id].status == '50') {
			//msg=;			
			Fps.Http.get("sendSms", {
				userId:id,
				phone:Fps.Global.users[id].mobile, 
				content:'访客'+ Fps.Global.user.guestCode +' '+ Fps.UserFunc.removeHtml(msg.replace(/&nbsp;/gi," ")),
				callbackFunc:'Fps.MessageLogic.callBackSendSms',
				json:"true"
			}, true);
		}
		
		//设置超链接为外部打开
		msg = msg.replace(/<a/gi, "<a target=_blank ");
		csMessage = '<div style="' + Fps.Global.chatClass.getChildDoc().Chat.getStyle() + ';margin-left:13px;width:auto;height:auto;">' + msg + '</div>';
		msg = unescape(Fps_Conf_myMessage).replace("{Name}", senderName).
		replace("{SendTime}",Fps.UserFunc.getNow()).
		replace("{Message}",  csMessage);
		
		 //聊天保存记录
		Fps.ChatLog.save(id, msg + '{|}');
		Fps.Global.chatHashTable[id].chatlog = Fps.Global.chatHashTable[id].chatlog.concat(msg);
		//显示自己的聊天信息	
		Fps.Global.chatClass.getChildDoc().Chat.showMessage(Fps.Global.chatHashTable[id].chatlog);
		
		//将表情弟子替换成特殊符号
		var faceRegExp = new RegExp(Fps_Conf_tempHtmlPath + 'View/InnerChat/face/', 'gi');
		toCsMsg = csMessage.replace(faceRegExp, '{$SYS_IMAGE_PATH$}');			
		
		var u = [];
		u.push(id);
	
		if(Fps.Global.connectIsReady) {
			//过滤图片信息
			if(Fps.Config.isAllowSendImgMsg == false) {
				toCsMsg = csMessage.replace(/<img\/?[^>]+>/gi, "").replace(/<\/>/g, "");
			}
			
			if(Fps.Global.user.loginId){
				loginId = Fps.Global.user.loginId.indexOf("@") != -1 ?  Fps.Global.user.loginId.split("@")[0] : Fps.user.loginId;
			}else{
				loginId = " ";
			}
			//Fps.Socket.sendMessage(22, k, "0",10, "asdfadfa", Fps.Global.user.nickname || loginId);
			// alert(u+"  -"+ Fps.Global.user.nickname +"  -"+loginId +" -"+Fps.Config.userStatus);
			Fps.Socket.sendMessage(Fps.userMsgType, u, "0", Fps.Config.userStatus, toCsMsg, Fps.Global.user.nickname || loginId);
		}
		return true;
	}
};



// 窗口切换逻辑部分
Fps.ChatLogic = function() {
	var r = {};
	/**
	 * 打开外部聊天窗口 
	 * @param userId 用户编号
	 */
	r.openOutChat = function(userId) {
		Fps.MessageLogic.openOutChat(userId);
	};
	
	/**
	 * 打开聊天窗口 
	 * @param userId 用户编号
	 * @param isHidden 是否隐藏
	 */
	r.openChat = function(userId, isHidden) {
		Fps.MessageLogic.openChat(userId, isHidden);
	};
	
	/**
	 * html标签开打会话窗口 
	 * @param o DOM对象
	 */
	r.simpleOpenChat = function(o) {
		Fps.MessageLogic.simpleOpenChat(o);
	};
	
	/**
	 * 打开邀请界面中的聊天窗口
	 * 默认显示现在的第一次客服 全部离线就显示列表的第一个
	 */
	r.openWelcomeChat = function() {
		Fps.MessageLogic.openWelcomeChat();
	};
	
	/**
	 * 关闭聊天窗口
	 * @param userId 用户编号
	 */
	r.closeChat = function (userId) {
		Fps.MessageLogic.closeChat(userId);
	};
	
	/**
	 * 关闭所有的对话窗口
	 * @param userId 用户编号
	 * 每隔20毫秒关闭一个窗口直到所有窗口都关闭完
	 */
	r.closeAllChat = function() {
		Fps.MessageLogic.closeAllChat();
	};
	
	/**
	 * 保存输入信息
	 * @param userId 用户编号
	 */
	r.saveChatInput = function(userId) {
		Fps.MessageLogic.saveInput(userId);
	};
	
	/**
	 * 发送消息
	 */
	r.send = function(){
		Fps.MessageLogic.send();
	};
		
   /**
    * 接收消息
	* @userId 消息来源用户ID
	* @msg 消息内容
	* @time 消息发送时间
	* @userName 发送者名称
	* @isSelf 是否是发给自己的消息
	*/
	r.rec = function(userId, msg, time, userName, isSelf) {
		//alert("接收消息!"+$("#visitlabel").html());
		
		Fps.MessageLogic.showMessage(userId, msg, time, userName, isSelf);
	};
	//接收邀请的信息
	r.vit=function(userId,msg,time,username){
		//alert("这是接收消息的步伐");
		Fps.Global.addObject("v-u",userId);
		
		//alert("这是接收消息的步伐"+$("#visitlabel").html());
		//Fps.MessageLogic.saveVisit(userId,msg,time,username);
	};
	/**
     * 接收消息
	 * @param content 消息内容
	 */
	r.showSystemMsg = function(content) {		
		if (Fps.chatUserStack.isNull()) {
			return;
		}
		Fps.MessageLogic.showMessage(Fps.chatUserStack.getFrist(), content, Fps.UserFunc.getNow(), "", 2);
	};
	r.showImgMsg = function(content) {		
		if (Fps.chatUserStack.isNull()) {
			return;
		}
		Fps.MessageLogic.showMessage(Fps.chatUserStack.getFrist(), content, Fps.UserFunc.getNow(), "", 4);
	};
	
	return r;
};/**
	 * 前端UI展现接收消息的方法	
	
  */	

	Fps.Message = {
		/**
		 * 接收媒体请求
		 * @param userId 接收者ID
		 * @param type 媒体类型
		 * @param time 发送时间
		 * @param remark 备注 
		 */
		recMedia: function(userId, type, time, remark){
			var msg = "";
				
			if (type == "1") {
				msg = Fps.text[37] +
				'<label style="color:blue;text-decoration:underline;" onclick="Fps.Media.openVideo(\'' + userId + '\', \'send\');" >'
				+ Fps.text[39] + '</label>';
				msg += '&nbsp;<label style="color:blue;text-decoration:underline;" onclick="Fps.Media.denyRequest(\'' + userId + '\', \'1\')">' + 
				Fps.text[40] + '</label>'; 
			} else {
				msg = Fps.text[38] +
				'<label style="color:blue;text-decoration:underline;" onclick="Fps.Media.openAudio(\'' + userId + '\', \'send\');" >'
				+ Fps.text[39] + '</label>';
				msg += '&nbsp;<label style="color:blue;text-decoration:underline;" onclick="Fps.Media.denyRequest(\'' + userId + '\', \'0\');">' 
				+ Fps.text[40] + '</label>'; 
			}
				
			Fps.cl.rec(userId, msg, time, remark);
		},
		
		/**
		 * 确认媒体请求
		 * 别人给自己发的视频/语音请求
		 * @param userId 接收者ID
		 * @param type 媒体类型
		 * @param time 发送时间
		 * @param remark 备注 
		 */
		confMedia: function(userId, type, time, remark){
			var msg = "";
				
			if (type == "1") {
				msg = '<label style="color:blue;text-decoration:underline;" onclick="parent.Fps.Media.openVideo(\'' + userId + '\', \'rec\')">' +
				Fps.text[49] + '</label>';
			}else{
				msg = '<label style="color:blue;text-decoration:underline;" onclick="parent.Fps.Media.openAudio(\'' + userId + '\', \'rec\')">' +
				Fps.text[49]+'</label>';
			}
				
			Fps.cl.rec(userId, msg, time, remark);
			delete msg;
		},
		
		/**
		 * 接收文件
		 * @param userId 接收者ID
		 * @param msgText 消息内容
		 * @param time 发送时间
		 * @param remark 备注 
		 */
		recFile: function(userId, msgText, time, remark){
			var uploadFile = msgText.split("{}");
			var fileName = uploadFile[1];
			var filePath = Fps.Config.getUpLoadFileHead() + 
			'UserFileDownload?sessionId=' + Fps.Config.sessionId + '&fileId=' + uploadFile[0] + '&isFromUser=true&fromUserId=' 
			+ userId + '&userFileName=' + encodeURIComponent(fileName); 
			var msg = Fps.text[34] + '[' + fileName + '] <a href="' + filePath + '">' + Fps.text[35] + '</a>';
			Fps.cl.rec(userId, msg, time, remark);
		},
		
		/**
		 * 接收图片
		 * @param userId 接收者ID
		 * @param msgText 消息内容
		 * @param time 发送时间
		 * @param remark 备注 
		 */
		recImage: function(userId, msgText, time, remark){
			msgText = msgText.split(",");
			var fileId = msgText[0];
			var imgName = msgText[2];
			var imgUrl = Fps.Config.getUpLoadFileHead() 
			+ "UserFileDownload?sessionId=" + Fps.Config.sessionId + "&fileId="+fileId;
			var reg = new RegExp('<img\/?[^>]+' + imgName +'[^>]+>', "g");
			var href = Fps_Conf_tempHtmlPath + 'Plugins/ViewImg.jsp?src=' + encodeURIComponent(imgUrl);
			var imgStr = '<a href="'+href+'" target="_blank"><img src="'+imgUrl+'" onload="autoScroll(document.getElementById(chatLogId))" title="' + Fps.text[92] + '" ></a>';
			var imgLog = '<img src="'+imgUrl+'">';
			Fps.Global.chatHashTable[userId].chatlog = Fps.Global.chatHashTable[userId].chatlog.replace(reg, imgStr);
			Fps.ChatLog.replace(userId, reg, imgLog);
			Fps.Global.chatClass.getChildDoc().Chat.showMessage(Fps.Global.chatHashTable[userId].chatlog);
			 
		},
		
		/**
		 * 格式化时间
		 * @param time 时间
		 */
		formatTime: function(time){
			var date = time.substring(0, 4) + "-" + time.substring(4, 6) + "-" +time.substring(6, 8);
			time = time.substring(8, 16);
			time = date + "&nbsp;" + time.substring(0, 2) + ":" + time.substring(2,4) + ":" + time.substring(4,6);
			return time;
		},
		
		/**
		 * 转换消息
		 * 对特殊字符进行替换
		 * @param msg 原始消息内容
		 */
		convMessage: function(msg){
			return msg;
		},
		
		/**
		 * 接收访客消息
		 * @param userId 接收者ID
		 * @param msgText 消息内容
		 * @param time 发送时间
		 * @param remark 备注
		 */
		recGuestMessage: function(userId, msgText, time, remark){
			//弹出式的聊天窗口已经关闭 就在内页接收消息
			
			if (this.outChatIsClose()) {
				//打开内页聊天
				Fps.Global.user.webWadar.showStyle = '0';
				Fps.cl.rec(userId, msgText, time, remark);
				Fps.Global.users[userId].friendMsgConut++;
				//显示消息后还原成弹出窗口聊天
				Fps.Global.user.webWadar.showStyle = '1';
				return;
			}
			Fps.cl.rec(userId, msgText, time, remark);
			 
			Fps.Global.users[userId].friendMsgConut++;
		},
		stopTalk:function(userId, msgText, time, remark){/////与游客断开连接信息并且重新给游客分配客服
			if (Fps.Global.users[userId].chatStatus != "open") {
				return;
			}
			 
			///  /Fps.cl.rec(userId, msgText, time, remark);
			Fps.cl.closeChat(userId);	
		},
		///转接
		changeUser:function(userId, msgText, time, remark){
			////alert("转接----"+msgText +" -"+userId+ " -"+remark);
			Fps.cl.openChat(msgText);
			Fps.chatUserStack.setFrist(msgText);
			
		},
		
		//邀请时候判断
		recVisitMark:function( userId, msgText, time, remark){   
			//alert("邀请时候判断+"+userId);
			var k=[];
			k.push(userId);
			Fps.Global.visitClass.getChildDoc().judgeVisit1(userId);
			Fps.cl.vit(userId, msgText, time, remark);
			//$("#visitlabel").html("李氏");
			//document.getElementById("visitlabel").html("张三");
			
			//alert(Fps.Global.getObject("v-u"));
			Fps.Global.visitClass.show();
			
			/*window.setTimeout(function(){  //按时关闭
				if(!Fps.Global.visitClass.hidden){
					Fps.Socket.sendMessage(62, k, "0",10, "对方没点击", Fps.Global.user.nickname);
				}
				Fps.Global.visitClass.hide();
				},5000);*/
				
			
			/*if( confirm('是否同意和 '+userId+' 聊天!') ) { 
				 Fps.Socket.sendMessage(22, k, "0",10, " 用户"+userId+"同意和你聊天", Fps.Global.user.nickname || loginId);
				 Fps.Message.recGuestMessage(userId, msgText, time, remark);
			} 
			else { 
				  Fps.Socket.sendMessage(22, k, "0",10, "用户"+userId+"拒绝你的要求", Fps.Global.user.nickname || loginId);
			} */	
		},
		
		/**
		 * 接收对方拒绝接受文件的消息
		 * @param userId 接收者ID
		 * @param msgText 消息内容
		 * @param time 发送时间
		 * @param remark 备注
		 */
		recRefusedFile: function(userId, msgText, time, remark){
			if (msgText.indexOf("{}") != -1) {
				Fps.cl.rec(userId, Fps.text[82] + msgText.split("{}")[1], time, remark, 2);
			}
		},
		
		/**
		 * 对方已经接收到了文件
		 * @param userId 接收者ID
		 * @param msgText 消息内容
		 * @param time 发送时间
		 * @param remark 备注
		 */
		receivedFile: function(userId, msgText, time, remark){
			if (msgText.indexOf("{}") != -1) {
				Fps.cl.rec(userId, Fps.text[81] + msgText.split("{}")[1], time, remark, 2);
			}
		},
		
		/**
		 * 弹出的外部窗口是否已经关闭
		 */
		outChatIsClose: function(){
			if(Fps.Config.getWindowType() == 'CustomOutPage') {
				var shardTime = Fps.Socket.readShared('OutChatTime');
				
				if(shardTime != '' && shardTime != 'null'){
					shardTime = parseInt(shardTime);
					var curTime = (new Date()).getTime();
					//状态标识已过期 表明外部聊天窗口已经全部关闭
					if(curTime - shardTime > 1000){
						//打开内页聊天
						return true;
					}
					
					delete curTime;
				}
				
				delete shardTime;
				return false;
			}
		},
		
		/**
		* 客服同意对话接入
		*/
		agreeWithChat: function()
		{
			Fps.Global.chatClass.getChildDoc().stopWaitingForAnswer();
		},
		
		/**
		* 客服拒绝对话接入
		*/
		refuseWithChat: function()
		{
			Fps.Global.chatClass.getChildDoc().setWaitingContent('对方拒绝了您的请求');		
		},
		
		/**
		 * 接收消息
		 * @param msgJson 消息数据 json形式
		 */
		recMessage: function(msgJson){
			eval(msgJson);
			var userId = data.userId; //发送者编号
			var messageType = data.type; //消息类型
			var groupId = data.groupId; //群ID
			var remark = data.remark; //备注信息
			var time = this.formatTime(data.time); //时间
			var msgText = this.convMessage(unescape(data.messageContent)); //消息内容
			
			//document.title = msgText + '  ' + document.location.href;
			//如果弹出式窗口存在 主Socket忽略所有消息
			if (this.outChatIsClose() == false) {
				return;
			}
			
			switch (messageType) {
				case "22": //访客		
					Fps.Message.recGuestMessage(userId, msgText, time, remark);
					break;
				case "1": //注册用户
					Fps.cl.rec(userId, msgText, time, remark);
					break;
				case "9": //对方已经收到了文件
					Fps.Message.receivedFile(userId, msgText, time, remark);
					break;
				case "10": //对方拒绝接收文件							
					Fps.Message.recRefusedFile(userId, msgText, time, remark);
					break;
				case "26": //视频 语音请求消息
					Fps.Message.recMedia(userId, msgText, time, remark);
					break;
				case "27": //视频 语音确认消息
					Fps.Message.confMedia(userId, msgText, time, remark);
					break;
				case '28': //视频/语音拒绝信息
					//Fps.cl.rec(userId, Fps.text[55], time, remark);
					break;
				case "25": //接收文件
				    Fps.Message.recFile(userId, msgText, time, remark);
					break;
				case "30": //接收图片
					Fps.Message.recImage(userId, msgText, time, remark);
					break;
				case "60": //发出邀请标志
					Fps.Message.recVisitMark(userId, msgText, time, remark);
				    break;	
				case "61": //客服同意了对话接入
					break;
				case "62": //客服拒绝了对话接入
					break;
				case "65"://与游客断开连接信息并且重新给游客分配客服
					Fps.Message.stopTalk(userId, msgText, time, remark);
					break;
				case "66"://转接到令��个地方
					Fps.Message.changeUser(userId, msgText, time, remark);
					break;
				
				}
				
		}
	};
	
	//路径转向
	Fps.CallBack.recvMessage = function (msgJson) {
		Fps.Message.recMessage(msgJson);
	};/***
 * 通讯的逻辑业务、保存登录数据 发送状态请求、更新好友状态 
 */
 
Fps.SocketLogic = {
	
	/**
	 * 断线重连 通讯的flash组件中做重连操作
	 */
	onDisConntect: function() {
		// 系统将自动发现Fps.connectIsReady状态的变化，并重新建立连接
		Fps.Global.connectIsReady = false;
	},
	
	/**
	 * 接收登录信息 启动通讯模块
	 * @param  result = 0 表示正常,extCode = 1表示客户端上线，WEB端被挤下线 
	 */ 
	 onLogin: function(result) {
		 if (result == "0") {
			Fps.Global.connectIsReady = true; //通讯连接成功
			//停止加载提示
			if (Fps.Global.chatClass) {
				Fps.Global.chatClass.getChildDoc().stopLoading()
			}
			
			Fps.Socket.setStatus(Fps.Config.userStatus);
			Fps.cl.showSystemMsg(Fps.text[120]);
			
			var usersId = Fps.DataStruct.CustomerServiceListStruct.getUsersId();
			usersId = usersId.concat(Fps.DataStruct.ChatButtonListStruct.getUsersId());
			Fps.Socket.queryStatus(usersId); //发送状态请求
			
			if(Fps.Config.getWindowType() == 'SystemOutPage'){	
				//更新时间实时报告外部的聊天窗口状态			
				var timer = setInterval(function() {
					var time = (new Date()).getTime().toString();
					Fps.Socket.saveShared('OutChatTime', time);
					delete time;
				}, 500);
			}
			
			var WebimNotClosePage = false;
			
			//防止点击链接 误以为关闭网页
			if(isIE) {
				var links = document.getElementsByTagName("a");
			
				for(var i=0; i<links.length; i++){
					if(links[i].href && (links[i].href.indexOf("javascript") != -1 || links[i].href == "#")) {
						links[i].attachEvent("onmousedown", function(){
							WebimNotClosePage = true;
						});
					}
				}
			}
			
			window.onbeforeunload = function() {
				if(isIE && WebimNotClosePage == true) {
					WebimNotClosePage = false;
					return;
				}
				
				var userId = Fps.chatUserStack.getFrist();
				
				//与客服人员发生过会话
				if(!!Fps.Global.users[userId] && Fps.Global.users[userId].friendMsgConut >=1 && Fps.Global.chatWindowType == 'out'){
					Fps.Global.chatClass.getChildDoc().showRating();
					return Fps.text[111];
				}
				
				//Fps.ChatShared.save();
				Fps.Socket.stopIMSocket();
			};
			
		} else if (result.indexOf("9") != -1 && Fps.Global.connectIsReady) {
			//被桌面客户端挤下线
			if (Fps.Config.clientType == "user" && extCode == "1") {
				
			}
		} else {
			document.title = 'Socket Error!';
		}
	 },
	 
	 /**
	 * 更新对话按钮的状态
	 * @param userId 用户编号
	 * @param status 用户状态
	 */
	 updateChatButStatus: function(userId, status) {
		var o = document.getElementsByName(Fps.Global.users[userId].smallId);
				
		for (var i=0; i<o.length; i++) {
			//定制过的对话按钮
			if (o[i].getAttribute('iscustomui') == 'true') {
				o[i].className = status == "50" ? o[i].getAttribute("offlinecss") : o[i].getAttribute("onlinecss");
			} else {
				o[i].src = status == "50" ? o[i].getAttribute("offlineimg") : o[i].getAttribute("onlineimg");
			}
		}
			
		delete o;
	 },
	 
	 /**
	  * 接收状态信息 更新用户头像
	  * @param userId 用户编号
	  * @param status 用户状态
	  */
	 onStatusChanage: function(userId, status) {
	 	if (!Fps.Global.users[userId]) {
			return;
		}
			
		Fps.Global.users[userId].status = status;
		
		//更新对话按钮
		if (Fps.DataStruct.ChatButtonListStruct.isExist(userId)) {
			Fps.SocketLogic.updateChatButStatus(userId, status);
		}
		
		//更新客服列表状态
		if(Fps.DataStruct.CustomerServiceListStruct.isExist(userId)){
			Fps.Global.userListClass.getChildDoc().updateUserStatus(0, userId, status, Fps.text[33][status]);
		}
		
		//更新聊天窗口中的状态
		Fps.Global.chatClass.getChildDoc().updateUserStatus(userId, status, Fps.text[33][status]);	
	 }
};

/**
 * 界面部分的业务逻辑
 */
Fps.UILogic = {
	
	/**
 	 * 初始化界面
 	 */
	init: function() 
	{		
		if (Fps.Global.UILoaded) 
		{
			return;
		}
		 
		if (Fps.Global.user.webWadar && Fps.Config.styleType == '0-0') 
		{	
			if (Fps.Config.styleType != '0-0') {
				Fps.Config.styleType = Fps.Global.user.webWadar.skinId;
			}
			
			if (Fps.Config.styleType == '') {
				Fps.Config.styleType = '0-0';
			}
		}
		
		if (Fps.Global.user.webWadar) {
			//动态设置聊天窗口右侧网页
			if (Fps.Global.user.webWadar.builtUrl && Fps.Global.user.webWadar.builtUrl != '') {
				Fps.Config.chatRightUri = Fps.Global.user.webWadar.builtUrl;
				 
			}
			
			//动态设置软件颜色
			if (Fps.Global.user.webWadar.colorType) {
				Fps.Config.colorType = Fps.Global.user.webWadar.colorType;
				///Fps.Config.colorType = '1';
			}
			if (Fps.Global.user.webWadar.lanage) {
				
				/////Fps_Conf_Language = Fps.Global.user.webWadar.lanage=="0"? "zh-en":"english";
				 
			}
			

			
			if (Fps.Global.user.webWadar.visitPrompt) {
				Fps.Config.visitPrompt = Fps.Global.user.webWadar.visitPrompt;
			}
		}
		
		
		Fps.ChatWindow();
		Fps.Global.chatClass.hide();
			//登录用户
		if (Fps.GetServerData.getLoginType() == "taobaouser") {
			Fps.IMWindow();
			Fps.Global.userListClass.hide();
			//企业客服
		} else if (Fps.GetServerData.getLoginType() == "shopguest") {
			
			if (Fps.Config.contactListStyle == 'list')
			{
				Fps.IMWindow();
			}
			else if (Fps.Config.contactListStyle == 'single')
			{
				Fps.SimpleUserList();
			}
			
			//Fps.Welcome();
			Fps.Welcome();
			//Fps.TheVisit();
			
			 
			//Fps.Global.visitClass.hide();
			//window.setTimeout(function(){Fps.Global.visitClass.hide();},1000);
		 	
			//小图标访客
		} else if (Fps.GetServerData.getLoginType() == "guest") {
			//Fps.DOM.hiddenDom(Fps.Global.chatWindow);
		}
		
		//绑定窗口事件
		Fps.WindowEvent();
		Fps.Global.UILoaded = true;
	 
		//Fps.Socket.sendMessage('60', [userId], "0", Fps.Config.userStatus, '-', Fps.Global.user.nickname);
		
	}
};

/**
 * 启动系统
 */

(function () {
	/**
	 * 断线重连 通讯的flash组件中做重连操作
	 */
	Fps.CallBack.onDisconnectFun = function(){
		Fps.SocketLogic.onDisConntect();
	}; 
	
	/**
	 * 接收登录信息 启动通讯模块
	 * @param  result = 0 表示正常,extCode = 1表示客户端上线，WEB端被挤下线 
	 */ 
	Fps.CallBack.loginResultFun = function(result) {		
		Fps.SocketLogic.onLogin(result);
	};
	
	/**
	 * 更新对话按钮的状态
	 * @param userId 用户编号
	 * @param status 用户状态
	 */
	Fps.CallBack.updateChatButStatus = function(userId, status){
		Fps.SocketLogic.updateChatButStatus(userId, status);
	};
	
	/**
	 * 接收状态信息 更新用户头像
	 * @param userId 用户编号
	 * @param status 用户状态
	 */
	Fps.CallBack.queryStatus = function(userId, status) {
		Fps.SocketLogic.onStatusChanage(userId, status);
	};
		
	//主程序启动
	Fps.UserEvent.quickLoad(function(){
		//初始化业务逻辑
		Fps.InitParam.init();
		
		if (Fps.Config.isWakeCs) {
			Fps.ActiveX.appName = Fps.Config.appName;
			//加载ActiveX控件
			Fps.ActiveX.add(Fps.Config.webImActiveX.id, Fps.Config.webImActiveX.classId);		
		}
		//Fps.ActiveX.autoLogin(loginId, password); //调用自动登录客户端的方法
		
		//加载通讯flash
		Fps.Flash.loadIMFlash();
		//获取服务器端数据
		Fps.GetServerData.init();
	});
	
	//页面加载完成后执行
	Fps.UserEvent.onReady(function(){
		Fps.Global.pageIsReady = true;
	});
})();
