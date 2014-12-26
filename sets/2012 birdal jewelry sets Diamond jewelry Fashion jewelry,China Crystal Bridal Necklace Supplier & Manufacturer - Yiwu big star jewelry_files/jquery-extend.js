/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Version 2.1.3-pre
*/

(function ($) {
    $.fn.bgiframe = (($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) && $.browser.version === "6.0") ? function (s) {
        s = $.extend({
            top: 'auto', // auto == .currentStyle.borderTopWidth
            left: 'auto', // auto == .currentStyle.borderLeftWidth
            width: 'auto', // auto == offsetWidth
            height: 'auto', // auto == offsetHeight
            opacity: true,
            src: 'javascript:false;'
        }, s);
        var html = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + s.src + '"' +
                   ' style="display:block;position:absolute;z-index:-1;' +
                       (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') +
                       'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' +
                       'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' +
                       'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' +
                       'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' +
                '"/>';
        return this.each(function () {
            if ($(this).children('iframe.bgiframe').length === 0)
                this.insertBefore(document.createElement(html), this.firstChild);
        });
    } : function () { return this; });

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }
})(jQuery);

/*禁用选中*/
(function ($) {
    $.fn.disableSelection = function () {
        return this.each(function () {
            $(this).attr('unselectable', 'on').css({
                '-moz-user-select': 'none',
                '-webkit-user-select': 'none',
                'user-select': 'none'
            }).each(function () {
                this.onselectstart = function () { return false; };
            });
        });
    };
})(jQuery);


/*
* jQuery插件-自动隐藏层
* 描述：当鼠标点击指定容器外时，隐藏指定的容器
* 前提引入：jQuery
* 用法：
* $("#div1").autoHide(); //点击id为 div1 的容器外，隐藏div1
* $("#div2").autoHide('a','b','c'); //点击id为 div2、a 、b、c 的容器 外，隐藏div2
*/
$.fn.extend({
    autoHide: function () {
        var thisObj = this;
        var div_hide_ids = arguments;
        var callbackHide = $.noop;
        for (var i = 0; i < arguments.length; i++) {
            if ($.isFunction(arguments[i])) {
                callbackHide = arguments[i];
                break;
            }
        }
        function autoHideObj() {
            $(document).unbind("mousedown", autoEvent);
            thisObj.slideUp(200, callbackHide);
        }
        function autoEvent(e) {
            var ids = div_hide_ids;
            var ids_len = ids.length;
            var obj = thisObj;
            var objPos = 0;
            try {
                objPos = obj.offset();
            } catch (ex) { objPos = 0; }
            var objHeight = obj.height();
            var objWidth = obj.width();

            var objOther;
            var objPosOther;
            var objHeightOther;
            var objWidthOther;

            e = e || window.event;
            var x = e.pageX || (e.clientX +
			      (document.documentElement.scrollLeft
			      || document.body.scrollLeft));
            var y = e.pageY || (e.clientY +
			      (document.documentElement.scrollTop
			      || document.body.scrollTop));
            if ((x >= objPos.left && x <= objPos.left + objWidth + 10 && y >= objPos.top && y <= objPos.top + objHeight)) {
                //$(document).unbind("mousedown",autoEvent);
                return false;
            }
            for (var i = 0; i < ids_len; i++) {
                if ($.isFunction(ids[i])) {
                    continue;
                }
                objOther = $("#" + ids[i]);
                if (objOther.length) {
                    objPosOther = objOther.offset();
                    objHeightOther = objOther.height();
                    objWidthOther = objOther.width();
                    if ((x >= objPosOther.left && x <= objPosOther.left + objWidthOther && y >= objPosOther.top && y <= objPosOther.top + objHeightOther)) {
                        // $(document).unbind("mousedown",autoEvent); 
                        return false;
                    }
                }
            }
            autoHideObj();
            return true;
        }
        $(document).unbind("mousedown", autoEvent);
        $(document).bind("mousedown", autoEvent);
    }
});
/*
* jQuery插件-自动隐藏层
* 描述：当鼠标移出容器外时，隐藏指定的容器
* 前提引入：jQuery
* 用法：
* $("#div1").mouseoutHide(); //移出id为 div1 的容器外，隐藏div1
* $("#div2").mouseoutHide('a','b','c',callback); //移出id为 div2、a 、b、c 的容器 外，隐藏div2,可以添加一个隐藏回调函数
*/
$.fn.extend({
    mouseoutHide: function () {
        var thisObj = this;
        var div_hide_ids = arguments;
        var callbackHide = $.noop;
        for (var i = 0; i < arguments.length; i++) {
            if ($.isFunction(arguments[i])) {
                callbackHide = arguments[i];
                break;
            }
        }
        function autoHideObj() {
            $(document).unbind("mouseover", autoEvent);
            thisObj.hide("fast", callbackHide);
        }
        function autoEvent(e) {
            var ids = div_hide_ids;
            var ids_len = ids.length;
            var obj = thisObj;
            var objPos = 0;
            try {
                objPos = obj.offset();
            } catch (ex) { objPos = 0; }
            var objHeight = obj.height();
            var objWidth = obj.width();

            var objOther;
            var objPosOther;
            var objHeightOther;
            var objWidthOther;
            e = e || window.event;
            var x = e.pageX || (e.clientX +
			      (document.documentElement.scrollLeft
			      || document.body.scrollLeft));
            var y = e.pageY || (e.clientY +
			      (document.documentElement.scrollTop
			      || document.body.scrollTop));
            if ((x >= objPos.left && x <= objPos.left + objWidth && y >= objPos.top && y <= objPos.top + objHeight)) {
                // $(document).unbind("mouseover",autoEvent);
                return true;
            }
            for (var i = 0; i < ids_len; i++) {
                if ($.isFunction(ids[i])) {
                    continue;
                }
                objOther = $("#" + ids[i]);
                if (objOther.length) {
                    objPosOther = objOther.offset();
                    objHeightOther = objOther.height();
                    objWidthOther = objOther.width();
                    if ((x >= objPosOther.left && x <= objPosOther.left + objWidthOther && y >= objPosOther.top && y <= objPosOther.top + objHeightOther)) {
                        //$(document).unbind("mouseover",autoEvent);
                        return true;
                    }
                }
            }
            autoHideObj();
            return true;
        }
        $(document).unbind("mouseover", autoEvent);
        $(document).bind("mouseover", autoEvent);
    }
});

/*
* jQuery插件-自动隐藏层
* 描述：当鼠标移出容器外时，改变指定的容器的left值
* 前提引入：jQuery
* 用法：
* $("#div1").mouseoutTool(left,interTime); //left
*/
$.fn.extend({
    mouseoutTool: function () {
        var thisObj = this;
        var left = parseInt(arguments[0]);
        var InterTime = parseInt(arguments[1]);
        function autoToolObj() {
            $(document).unbind("mouseover", autoEvent);
            thisObj.animate({ left: left + "px" }, InterTime);
        }
        function autoEvent(e) {
            var obj = thisObj;
            var objPos = obj.offset();
            var objHeight = obj.height();
            var objWidth = obj.width();

            e = e || window.event;
            var x = e.pageX || (e.clientX +
			      (document.documentElement.scrollLeft
			      || document.body.scrollLeft));
            var y = e.pageY || (e.clientY +
			      (document.documentElement.scrollTop
			      || document.body.scrollTop));
            if ((x >= objPos.left && x <= objPos.left + objWidth && y >= objPos.top && y <= objPos.top + objHeight)) {
                return true;
            }
            autoToolObj();
            return true;
        }
        $(document).bind("mouseover", autoEvent);
    }
});
/*
*jQuery插件-点击跑马灯
*描述：当鼠标点击指定容器时，滚动内容
* 前提引入：jQuery
* 用法：
*moveWidth:运行宽度/高度
*InterTime:运行时间
*leftBtn:左边按钮/上边按钮
*rightBtn:右边按钮/下边按钮
*isLoadMove:默认是否滚动;
*callbackLeft:向左/向上滚动成功后,调用事件;没有时间会执行默认事件（能继续向左/向上滚动的样式为属性showclass的值;反之为属性hiddenclass的值）
*callbackRight:向右/向下滚动成功后,调用事件（能继续向右/向下滚动的样式为属性showclass的值;反之为属性hiddenclass的值）
*moveType:滚动类型0:代表左右方向滚动;1:代表上下方向滚动;默认左右方向滚动
*objWidth:控件宽度,根据这个宽度来判断是否需要滚动
*loadInterTime:初始化时调用的时间
* $("#div1").clickMove(moveWidth,InterTime,leftBtn,rightBtn,isLoadMove,callbackLeft,callbackRight,moveType,objWidth,loadInterTime); 
*/
$.fn.extend({
    clickMove: function () {
        var thisObj = this;
        var _moveWidth = parseFloat(arguments[0]);
        var InterTime = parseInt(arguments[1]);
        var leftBtn = $(arguments[2]).length > 0 ? $(arguments[2]) : $("#" + arguments[2]);
        var rightBtn = $(arguments[3]).length > 0 ? $(arguments[3]) : $("#" + arguments[3]);
        var isLoadMove = arguments[4];
        var callbackLeft = $.isFunction(arguments[5]) ? arguments[5] : $.noop;
        var callbackRight = $.isFunction(arguments[6]) ? arguments[6] : $.noop;
        var moveType = (!arguments[7] || arguments[7] == undefined || $.trim(arguments[7] + "") != "1") ? 0 : 1;
        var _objWidth = (arguments[8] && arguments[8] != undefined && !isNaN(arguments[8]) && parseFloat(arguments[8]) > 0) ? parseFloat(arguments[8]) : _moveWidth;
        var loadInterTime = (arguments[9] && arguments[9] != undefined && !isNaN(arguments[9]) && parseInt(arguments[9]) > 0) ? parseInt(arguments[9]) : 4000;
        var _moveState = true;
        var setLoadMove;
        function _moveLeft() {
            if (parseFloat(thisObj.css("marginLeft").replace("px", "")) < 0 && _moveState) {
                _moveState = false;
                try { window.clearInterval(setLoadMove); } catch (ex) { }
                var marginLeft = parseFloat(thisObj.css("marginLeft").replace("px", "")) + _moveWidth;
                marginLeft = (marginLeft <= 0) ? marginLeft : 0;
                thisObj.animate({ marginLeft: marginLeft + "px" }, InterTime, function () {
                    setbtn(); leftBtn.one("click", _moveLeft); callbackLeft(); if (isLoadMove) { loadMove(); } _moveState = true;
                });
            }
        }
        function _moveRight() {
            if (parseFloat(thisObj.css("width").replace("px", "")) > (-parseFloat(thisObj.css("marginLeft").replace("px", "")) + _objWidth) && _moveState) {
                _moveState = false;
                try { window.clearInterval(setLoadMove); } catch (ex) { }
                var marginLeft = parseFloat(thisObj.css("marginLeft").replace("px", "")) - _moveWidth;
                marginLeft = (Math.abs(marginLeft) <= Math.abs(parseFloat(thisObj.css("width").replace("px", "")) - _moveWidth)) ? marginLeft : ((parseFloat(thisObj.css("width").replace("px", "")) - _moveWidth) * -1);
                thisObj.animate({ marginLeft: marginLeft + "px" }, InterTime, function () {
                    setbtn(); rightBtn.one("click", _moveRight); callbackRight(); if (isLoadMove) { loadMove(); } _moveState = true;
                });
            }
        }
        function _moveTop() {
            if (parseInt(thisObj.css("marginTop").replace("px", "")) < 0 && _moveState) {
                _moveState = false;
                try { window.clearInterval(setLoadMove); } catch (ex) { }
                thisObj.animate({ marginTop: '+=' + _moveWidth }, InterTime, function () {
                    setbtn_top(); leftBtn.one("click", _moveTop); callbackLeft(); if (isLoadMove) { loadMove(); } _moveState = true;
                });
            }
        }
        function _moveBottom() {
            if (parseInt(thisObj.css("height").replace("px", "")) > (-parseInt(thisObj.css("marginTop").replace("px", "")) + _objWidth) && _moveState) {
                _moveState = false;
                try { window.clearInterval(setLoadMove); } catch (ex) { }
                thisObj.animate({ marginTop: '-=' + _moveWidth }, InterTime, function () {
                    setbtn_top(); rightBtn.one("click", _moveBottom); callbackRight(); if (isLoadMove) { loadMove(); } _moveState = true;
                });
            }
        }
        var moveDirection = "right";
        function loadMove() {
            try { window.clearInterval(setLoadMove); } catch (ex) { }
            setLoadMove = window.setInterval(
                function sysytemNext() {
                    if (moveType == 1) {
                        if (moveDirection == "right") {
                            _moveBottom();
                            if (parseInt(thisObj.css("marginTop").replace("px", "")) < 0 && _moveState) { _moveTop(); moveDirection = "left"; }
                        } else {
                            _moveTop();
                            if (parseInt(thisObj.css("height").replace("px", "")) > (-parseInt(thisObj.css("marginTop").replace("px", "")) + _objWidth) && _moveState) { _moveBottom(); moveDirection = "right"; }
                        }
                    }
                    else {
                        if (moveDirection == "right") {
                            _moveRight();
                            if (parseInt(thisObj.css("marginLeft").replace("px", "")) < 0 && _moveState) { _moveLeft(); moveDirection = "left"; }
                        } else {
                            _moveLeft();
                            if (parseInt(thisObj.css("width").replace("px", "")) > (-parseInt(thisObj.css("marginLeft").replace("px", "")) + _objWidth) && _moveState) { _moveRight(); moveDirection = "right"; }
                        }
                    }
                }
            , loadInterTime);
        }
        function setbtn() {
            leftBtn.unbind("click");
            rightBtn.unbind("click");
            if (parseInt(thisObj.css("marginLeft").replace("px", "")) < 0) {
                leftBtn.attr("class", leftBtn.attr("showclass"));
                leftBtn.one("click", _moveLeft);
            } else {
                leftBtn.attr("class", leftBtn.attr("hiddenclass"));
            }
            if (parseInt(thisObj.css("width").replace("px", "")) > (-parseInt(thisObj.css("marginLeft").replace("px", "")) + _objWidth)) {
                rightBtn.attr("class", rightBtn.attr("showclass"));
                rightBtn.one("click", _moveRight);
            } else {
                rightBtn.attr("class", rightBtn.attr("hiddenclass"));
            }
        }
        function setbtn_top() {
            leftBtn.unbind("click");
            rightBtn.unbind("click");
            if (parseInt(thisObj.css("marginTop").replace("px", "")) < 0) {
                leftBtn.attr("class", leftBtn.attr("showclass"));
                leftBtn.one("click", _moveTop);
            } else {
                leftBtn.attr("class", leftBtn.attr("hiddenclass"));
            }
            if (parseInt(thisObj.css("height").replace("px", "")) > (-parseInt(thisObj.css("marginTop").replace("px", "")) + _objWidth)) {
                rightBtn.attr("class", rightBtn.attr("showclass"));
                rightBtn.one("click", _moveBottom);
            } else {
                rightBtn.attr("class", rightBtn.attr("hiddenclass"));
            }
        }
        if (moveType == 1) {
            setbtn_top();
        } else {
            setbtn();
        }
        if (isLoadMove) { loadMove(); thisObj.bind("mouseover", function () { try { window.clearInterval(setLoadMove); } catch (ex) { } }); thisObj.bind("mouseout", loadMove); }
    }
});

/*
*jQuery插件-跑马灯
*描述：指定容器定时滚动内容
* 前提引入：jQuery
* 用法：
*Direction:滚动方向 0 向上；1 向下 2 向左 3 向右
*Width:宽度
*Height:高度
*Timer:滚动一次的时间
*WaitTime:等待时间
*ScrollStep:每次滚动距离
* $("#div1").contrlMove(Direction,Width,Height,Timer,WaitTime,ScrollStep); 
*/
$.fn.extend({
    contrlMove: function () {
        var thisObj = this;
        if (thisObj[0] == undefined || thisObj.css("display") == "none") { return false; }
        var Direction = Width = Height = DelayTime = WaitTime = MouseOver = 0;
        var Step = 1; var Timer = 30;
        var EventLeft;
        var DirectionArray = { "top": 0, "bottom": 1, "left": 2, "right": 3 };
        if (typeof arguments[0] == "number") Direction = arguments[0];
        if (typeof arguments[1] == "number") Width = arguments[1];
        if (typeof arguments[2] == "number") Height = arguments[2];
        if (typeof arguments[3] == "number") Timer = arguments[3];
        if (typeof arguments[4] == "number") WaitTime = arguments[4];
        if (typeof arguments[5] == "number") ScrollStep = arguments[5];
        thisObj.css({ overflowX: "hidden", overflowY: "hidden", overflow: "hidden" });
        thisObj.attr("noWrap", true);
        var IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1);
        //        if (WaitTime < 800) WaitTime = 800;
        //        if (Timer < 200) Timer = 200;
        if (Width == 0) Width = thisObj.width();
        if (Height == 0) Height = thisObj.height();
        if (typeof Direction == "string") Direction = DirectionArray[Direction.toString().toLowerCase()];
        HalfWidth = Math.round(Width / 2);
        thisObj.width(Width);
        thisObj.height(Height);
        if (typeof ScrollStep != "number") ScrollStep = Direction > 1 ? Width : Height;
        var IsStop = false;
        function Scroll() {
            switch (Direction) {
                case 0:
                    if (thisObj.scrollTop() >= ClientScroll) { thisObj.scrollTop(0); }
                    else if (IsStop == false) {
                        IsStop = true;
                        if (Timer > 0) {
                            thisObj.animate({ scrollTop: '+=' + ScrollStep + 'px' }, Timer, function () { IsStop = false; });
                        }
                        else {
                            thisObj.scrollTop(thisObj.scrollTop() + ScrollStep);
                            IsStop = false;
                        }
                    }
                    break;
                case 1:
                    if (thisObj.scrollTop() <= 0) { thisObj.scrollTop(ClientScroll); }
                    else if (IsStop == false) {
                        IsStop = true;
                        if (Timer > 0) {
                            thisObj.animate({ scrollTop: '-=' + ScrollStep + 'px' }, Timer, function () { IsStop = false; });
                        } else {
                            thisObj.scrollTop(thisObj.scrollTop() - ScrollStep);
                            IsStop = false;
                        }
                    }
                    break;
                case 2:
                    if (thisObj.scrollLeft() >= ClientScroll) { thisObj.scrollLeft(0); }
                    else if (IsStop == false) {
                        IsStop = true;
                        if (Timer > 0) {
                            thisObj.animate({ scrollLeft: '+=' + ScrollStep + 'px' }, Timer, function () { IsStop = false; });
                        } else {
                            thisObj.scrollLeft(thisObj.scrollLeft() + ScrollStep);
                            IsStop = false;
                        }
                    }
                    break;
                case 3:
                    if (thisObj.scrollLeft() <= 0) { thisObj.scrollLeft(ClientScroll); }
                    else if (IsStop == false) {
                        IsStop = true; if (Timer > 0) {
                            thisObj.animate({ scrollLeft: '-=' + ScrollStep + 'px' }, Timer, function () { IsStop = false; });
                        } else {
                            thisObj.scrollLeft(thisObj.scrollLeft() - ScrollStep);
                            IsStop = false;
                        }
                    }
                    break;
            }
        }
        function Pause() {
            try { clearInterval(TimerID); } catch (e) { }
        }
        function Begin() {
            ClientScroll = Direction > 1 ? thisObj[0].scrollWidth : thisObj[0].scrollHeight;
            if ((Direction <= 1 && ClientScroll < Height) || (Direction > 1 && ClientScroll < Width)) return;
            thisObj.html(thisObj.html() + thisObj.html());
            if (ScrollStep < 0) return;
            TimerID = window.setInterval(Scroll, WaitTime);

            thisObj.bind("mouseover", function () {
                Pause();
            });
            thisObj.bind("mouseout", function () {
                TimerID = window.setInterval(Scroll, WaitTime);
            });
        }
        Begin();
    }
})


jQuery.extend({
    createUploadIframe: function (id, uri) {
        //create frame   
        var frameId = 'jUploadFrame' + id;
        var frameHtml = "<iframe id=\"" + frameId + "\" name=\"" + frameId + "\" ";
        if (typeof uri == 'boolean') {
            frameHtml += " src=\"javascript:false\"";
        }
        else if (typeof uri == 'string') {
            frameHtml += " src=\"" + uri + "\"";
        }
        frameHtml += " style=\"position:absolute;top:-1000px;left:-1000px\"";
        frameHtml += "/>";
        var io = $(frameHtml)[0];
        document.body.appendChild(io);
        return io
    },
    createUploadForm: function (id, fileElementId, data) {
        //create form      
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        var oldElement = $('#' + fileElementId);
        var newElement = $(oldElement).clone();
        $(oldElement).attr('id', fileId);
        $(oldElement).before(newElement);
        $(oldElement).appendTo(form);
        //增加文本参数的支持   
        if (data) {
            for (var i in data) {
                $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }

        //set attributes   
        $(form).css('position', 'absolute');
        $(form).css('top', '-1200px');
        $(form).css('left', '-1200px');
        $(form).appendTo('body');
        return form;
    },

    ajaxFileUpload: function (s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout           
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()
        var form = jQuery.createUploadForm(id, s.fileElementId, s.data);
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        // Watch for a new set of requests   
        if (s.global && !jQuery.active++) {
            jQuery.event.trigger("ajaxStart");
        }
        var requestDone = false;
        // Create the request object   
        var xml = {}
        if (s.global)
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back   
        var uploadCallback = function (isTimeout) {
            var io = document.getElementById(frameId);
            try {
                if (io.contentWindow) {
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                } else if (io.contentDocument) {
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {
                jQuery.handleError(s, xml, null, e);
            }
            if (xml || isTimeout == "timeout") {
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified   
                    if (status != "error") {
                        // process the data (runs the xml through httpData regardless of callback)   
                        var data = jQuery.uploadHttpData(xml, s.dataType);
                        // If a local callback was specified, fire it and pass it the data   
                        if (s.success)
                            s.success(data, status);

                        // Fire the global callback   
                        if (s.global)
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                    } else
                        jQuery.handleError(s, xml, status);
                } catch (e) {
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed   
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]);

                // Handle the global AJAX counter   
                if (s.global && ! --jQuery.active)
                    jQuery.event.trigger("ajaxStop");

                // Process result   
                if (s.complete)
                    s.complete(xml, status);
                jQuery(io).unbind();
                setTimeout(function () {
                    try {
                        $(io).remove();
                        $(form).remove();

                    } catch (e) {
                        jQuery.handleError(s, xml, null, e);
                    }

                }, 100)

                xml = null

            }
        }
        // Timeout checker   
        if (s.timeout > 0) {
            setTimeout(function () {
                // Check to see if the request is still happening   
                if (!requestDone) uploadCallback("timeout");
            }, s.timeout);
        }
        try {
            // var io = $('#' + frameId);   
            var form = $('#' + formId);
            $(form).attr('action', s.url);
            $(form).attr('method', 'POST');
            $(form).attr('target', frameId);
            if (form.encoding) {
                form.encoding = 'multipart/form-data';
            }
            else {
                form.enctype = 'multipart/form-data';
            }
            $(form).submit();

        } catch (e) {
            jQuery.handleError(s, xml, null, e);
        }
        if (window.attachEvent) {
            document.getElementById(frameId).attachEvent('onload', uploadCallback);
        }
        else {
            document.getElementById(frameId).addEventListener('load', uploadCallback, false);
        }
        return { abort: function () { } };

    },

    uploadHttpData: function (r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context   
        if (type == "script")
            jQuery.globalEval(data);
        // Get the JavaScript object, if JSON is used.   
        if (type == "json")
            eval("data = " + data);
        // evaluate scripts within html   
        if (type == "html")
            jQuery("<div>").html(data).evalScripts();
        //alert($('param', data).each(function(){alert($(this).attr('value'));}));   
        return data;
    }
});



//jquiry Cookies操作方法
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
jQuery.SelectOperate = function (name, checked) {
    if (checked) { $("input[name='" + name + "']").attr("checked", true); }
    else { $("input[name='" + name + "']").attr("checked", false); }
};

var setSrc = function () {
    $("img[data-src]").each(function () {
        var h = $(document).scrollTop() + $(window).height() + 100;
        if ($(this).offset().top <= h) {
            $(this).attr("src", $(this).attr("data-src"));
            $(this).removeAttr("data-src");
        }
    })
}
$(function () {
    $("img[data-src]").css("display", "block");
    setTimeout(function () { setSrc(); }, 0);
    $(window).resize(function () { setSrc(); }).scroll(function () { setSrc(); });
})