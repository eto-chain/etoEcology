(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-web"],{"12eb":function(t,e,n){"use strict";n("498a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{webviewStyles:{progress:!1},title:"",url:""}},onLoad:function(t){void 0!=t.title&&""!=t.title.trim()&&(this.title=t.title),this.url=decodeURIComponent(t.url)},methods:{handleMessage:function(t){this.toast("接收到的消息："+JSON.stringify(t.detail))}}};e.default=a},"1aed":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"cu-custom",style:[{height:t.CustomBar+"px"}]},[n("v-uni-view",{staticClass:"cu-bar fixed",class:[""!=t.bgImage?"none-bg text-white bg-img":"",t.bgColor],style:t.style},[t.isBack?n("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.BackPage.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"cuIcon-back"}),t._t("backText")],2):t._e(),n("v-uni-view",{staticClass:"content",style:[{top:t.StatusBar+"px"}]},[t._t("content")],2),t._t("right")],2)],1)],1)},u=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}))},"22bd":function(t,e,n){"use strict";n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,e=this.CustomBar,n=this.bgImage,a="height:".concat(e,"px;padding-top:").concat(t,"px;");return this.bgImage&&(a="".concat(a,"background-image:url(").concat(n,");")),a}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){if(getCurrentPages().length<2&&"undefined"!==typeof __wxConfig){var t="/"+__wxConfig.pages[0];return uni.redirectTo({url:t})}uni.navigateBack({delta:1})}}};e.default=a},"2e8a":function(t,e,n){"use strict";n.r(e);var a=n("1aed"),i=n("77bc");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);var r,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"47bfc37f",null,!1,a["a"],r);e["default"]=s.exports},"3c14":function(t,e,n){"use strict";var a={cuCustom:n("2e8a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"web"},[""!=t.title?n("cu-custom",{attrs:{bgColor:"zyl-bg-status",isBack:!0}},[n("template",{attrs:{slot:"backText"},slot:"backText"},[t._v(t._s(t.title))])],2):t._e(),n("v-uni-view",[n("v-uni-web-view",{attrs:{"webview-styles":t.webviewStyles,src:t.url},on:{message:function(e){arguments[0]=e=t.$handleEvent(e),t.handleMessage.apply(void 0,arguments)}}})],1)],1)},u=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}))},"41ce":function(t,e,n){"use strict";n.r(e);var a=n("12eb"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=i.a},"72f3":function(t,e,n){"use strict";n.r(e);var a=n("3c14"),i=n("41ce");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);var r,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports},"77bc":function(t,e,n){"use strict";n.r(e);var a=n("22bd"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=i.a}}]);