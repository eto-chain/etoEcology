(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tki-qrcode/tki-qrcode"],{"487c":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}))},"4d38d":function(t,e,n){"use strict";var i=n("5fe4"),o=n.n(i);o.a},"50db":function(t,e,n){"use strict";n.r(e);var i=n("487c"),o=n("d41d");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("4d38d");var a,r=n("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=s.exports},"5fe4":function(t,e,n){},a806:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,o=u(n("7d07"));function u(t){return t&&t.__esModule?t:{default:t}}var a={name:"tki-qrcode",props:{cid:{type:String,default:"tki-qrcode-canvas"},size:{type:Number,default:200},unit:{type:String,default:"upx"},show:{type:Boolean,default:!0},val:{type:String,default:""},background:{type:String,default:"#ffffff"},foreground:{type:String,default:"#000000"},pdground:{type:String,default:"#000000"},icon:{type:String,default:""},iconSize:{type:Number,default:40},lv:{type:Number,default:3},onval:{type:Boolean,default:!1},loadMake:{type:Boolean,default:!1},usingComponents:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},loadingText:{type:String,default:"二维码生成中"}},data:function(){return{result:""}},methods:{_makeCode:function(){var e=this;this._empty(this.val)?t.showToast({title:"二维码内容不能为空",icon:"none",duration:2e3}):i=new o.default({context:e,canvasId:e.cid,usingComponents:e.usingComponents,showLoading:e.showLoading,loadingText:e.loadingText,text:e.val,size:e.cpSize,background:e.background,foreground:e.foreground,pdground:e.pdground,correctLevel:e.lv,image:e.icon,imageSize:e.iconSize,cbResult:function(t){e._result(t)}})},_clearCode:function(){this._result(""),i.clear()},_saveCode:function(){var e=this;""!=this.result&&t.saveImageToPhotosAlbum({filePath:e.result,success:function(){t.showToast({title:"二维码保存成功",icon:"success",duration:2e3})}})},_result:function(t){this.result=t,this.$emit("result",t)},_empty:function(t){var e=typeof t,n=!1;return"number"==e&&""==String(t)?n=!0:"undefined"==e?n=!0:"object"==e?"{}"!=JSON.stringify(t)&&"[]"!=JSON.stringify(t)&&null!=t||(n=!0):"string"==e?""!=t&&"undefined"!=t&&"null"!=t&&"{}"!=t&&"[]"!=t||(n=!0):"function"==e&&(n=!1),n}},watch:{size:function(t,e){var n=this;t==e||this._empty(t)||(this.cSize=t,this._empty(this.val)||setTimeout((function(){n._makeCode()}),100))},val:function(t,e){var n=this;this.onval&&(t==e||this._empty(t)||setTimeout((function(){n._makeCode()}),0))}},computed:{cpSize:function(){return"upx"==this.unit?t.upx2px(this.size):this.size}},mounted:function(){var t=this;this.loadMake&&(this._empty(this.val)||setTimeout((function(){t._makeCode()}),0))}};e.default=a}).call(this,n("6e42")["default"])},d41d:function(t,e,n){"use strict";n.r(e);var i=n("a806"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tki-qrcode/tki-qrcode-create-component',
    {
        'components/tki-qrcode/tki-qrcode-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("50db"))
        })
    },
    [['components/tki-qrcode/tki-qrcode-create-component']]
]);