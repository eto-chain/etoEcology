(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/cu-custom/cu-custom"],{"29c0":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,e=this.bgImage,a="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(a="".concat(a,"background-image:url(").concat(e,");")),a}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){if(getCurrentPages().length<2&&"undefined"!==typeof __wxConfig){var n="/"+__wxConfig.pages[0];return t.redirectTo({url:n})}t.navigateBack({delta:1})}}};n.default=e}).call(this,e("6e42")["default"])},"2e8a":function(t,n,e){"use strict";e.r(n);var a=e("bfdd"),u=e("77bc");for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);var c,o=e("f0c5"),i=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=i.exports},"77bc":function(t,n,e){"use strict";e.r(n);var a=e("29c0"),u=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=u.a},bfdd:function(t,n,e){"use strict";var a,u=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cu-custom/cu-custom-create-component',
    {
        'components/cu-custom/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("2e8a"))
        })
    },
    [['components/cu-custom/cu-custom-create-component']]
]);
