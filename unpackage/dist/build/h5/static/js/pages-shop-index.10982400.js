(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-index"],{"0f79":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".bg-sy[data-v-1668c426]{width:100%;height:%?370?%;position:absolute}.wp25[data-v-1668c426]{width:25%}.block70-16[data-v-1668c426]{width:%?140?%;height:%?32?%}.h111[data-v-1668c426]{height:%?222?%;width:calc(100% - %?60?%);margin-left:%?30?%}.block5-16[data-v-1668c426]{width:%?11?%;height:%?34?%;background-color:#a8456b}.mt2[data-v-1668c426]{margin-top:%?4?%}.h40s[data-v-1668c426]{height:%?80?%}.sy-box[data-v-1668c426]{width:calc(50% - %?10?%)}.sy-pics[data-v-1668c426]{width:100%;height:%?200?%}.bg-servies[data-v-1668c426]{background-color:#1b1a4a!important}",""]),t.exports=e},"1aed":function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"cu-custom",style:[{height:t.CustomBar+"px"}]},[i("v-uni-view",{staticClass:"cu-bar fixed",class:[""!=t.bgImage?"none-bg text-white bg-img":"",t.bgColor],style:t.style},[t.isBack?i("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.BackPage.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cuIcon-back"}),t._t("backText")],2):t._e(),i("v-uni-view",{staticClass:"content",style:[{top:t.StatusBar+"px"}]},[t._t("content")],2),t._t("right")],2)],1)],1)},s=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}))},"1dd8":function(t,e,i){"use strict";var a=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var n=a(i("c964")),s=a(i("f3f3")),r=i("2f62"),o={data:function(){return{dataList:[],banner:[],goods:[]}},onShow:function(){this.getData(),this.update&&this.setUpdate(!1)},onLoad:function(){},computed:(0,s.default)({},(0,r.mapState)(["baseURL"])),methods:(0,s.default)({},(0,r.mapActions)([]),{getData:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var i,a,n,s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post("shop.index",{},{tipConfig:{storeBlock:!0}});case 2:i=e.sent,a=i.data,n=a.lunbo,s=a.goodclass,r=a.goods,t.banner=n,t.goods=r,t.dataList=s;case 10:case"end":return e.stop()}}),e)})))()},natogg:function(t){uni.navigateTo({url:"../user/article?id="+t.articleId})},pushgoods:function(t){uni.navigateTo({url:"../goods/index?id="+t.goodsId})},pushmore:function(t,e){uni.navigateTo({url:"more?id="+t.id+"&title="+t.name})},togoods:function(t,e){uni.navigateTo({url:"../goods/index?id="+t.id})},backs:function(){uni.switchTab({url:"/pages/ecology/index"})}})};e.default=o},"22bd":function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,e=this.CustomBar,i=this.bgImage,a="height:".concat(e,"px;padding-top:").concat(t,"px;");return this.bgImage&&(a="".concat(a,"background-image:url(").concat(i,");")),a}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){if(getCurrentPages().length<2&&"undefined"!==typeof __wxConfig){var t="/"+__wxConfig.pages[0];return uni.redirectTo({url:t})}uni.navigateBack({delta:1})}}};e.default=a},"2e8a":function(t,e,i){"use strict";i.r(e);var a=i("1aed"),n=i("77bc");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);var r,o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"47bfc37f",null,!1,a["a"],r);e["default"]=c.exports},3101:function(t,e,i){"use strict";i.r(e);var a=i("b905"),n=i("9ffe");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("e8e6");var r,o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"1efb6d2e",null,!1,a["a"],r);e["default"]=c.exports},"4ece":function(t,e,i){var a=i("db88");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2cad6c59",a,!0,{sourceMap:!1,shadowMode:!1})},"5a31":function(t,e,i){"use strict";i.r(e);var a=i("1dd8"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"5b7a":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{squareHeight:750}},computed:{selfHeight:function(){if(this.screen)return"100%";var t=this.square?this.squareHeight:this.height;return t+"rpx"}},props:{baseUrl:{type:String,default:""},useSlot:{type:Boolean,default:!1},text:{type:Boolean,default:!1},srcName:{type:String,default:"img"},imgStyle:{type:String,default:"img"},mode:{type:String,default:"aspectFill"},square:{type:Boolean,default:!1},screen:{type:Boolean,default:!1},height:{type:Number,default:356},slides:{type:Array,default:function(){return[]}},indicatorDots:{type:Boolean,default:!0},indicatorColor:{type:String,default:"rgba(255,225,255,0.3)"},indicatorActiveColor:{type:String,default:"#fff"},autoplay:{type:Boolean,default:!0},current:{type:Number,default:0},currentItemId:{type:String,default:""},interval:{type:Number,default:5e3},duration:{type:Number,default:500},circular:{type:Boolean,default:!0},vertical:{type:Boolean,default:!1},previousMargin:{type:String,default:""},nextMargin:{type:String,default:""},displayMultipleItems:{type:Number,default:1},skipHiddenItemLayout:{type:Boolean,default:!1}},created:function(){},methods:{_change:function(t){this.$emit("change",t)},_animationfinish:function(t){this.$emit("animationfinish",t)},_handleClick:function(t){this.$emit("click",t)}}};e.default=a},"77bc":function(t,e,i){"use strict";i.r(e);var a=i("22bd"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"9ffe":function(t,e,i){"use strict";i.r(e);var a=i("5b7a"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},b905:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-swiper",{staticClass:"slider-wrap",style:{height:t.selfHeight},attrs:{autoplay:t.autoplay,circular:t.circular,current:t.current,"current-item-id":t.currentItemId,"display-multiple-items":t.displayMultipleItems,duration:t.duration,"indicator-active-color":t.indicatorActiveColor,"indicator-color":t.indicatorColor,"indicator-dots":t.indicatorDots,interval:t.interval,"next-margin":t.nextMargin,"previous-margin":t.previousMargin,"skip-hidden-item-layout":t.skipHiddenItemLayout,vertical:t.vertical},on:{animationfinish:function(e){arguments[0]=e=t.$handleEvent(e),t._animationfinish.apply(void 0,arguments)},change:function(e){arguments[0]=e=t.$handleEvent(e),t._change.apply(void 0,arguments)}}},[t._l(t.slides,(function(e,a){return t.useSlot?t._e():i("v-uni-swiper-item",{key:a,staticClass:"slider-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t._handleClick(e)}}},[t.text?i("v-uni-view",{staticClass:"hp100 flex align-center"},[i("v-uni-text",{staticClass:"ellipsis lh1 text"},[t._v(t._s(e[t.srcName]||e))])],1):i("v-uni-image",{staticClass:"slider-img",style:t.imgStyle,attrs:{mode:t.mode,mode:"widthFix",src:t.baseUrl+(e[t.srcName]||e)}})],1)})),t._t("default")],2)},s=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}))},bcc8:function(t,e,i){"use strict";var a={cuCustom:i("2e8a").default,swipers:i("3101").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"home hv100  clearfix "},[i("cu-custom",{attrs:{bgColor:"bg-navBg"}},[i("template",{attrs:{slot:"right"},slot:"right"},[i("v-uni-view",{staticClass:"ml10",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.backs.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cuIcon-back f17"})],1)],1),i("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.i18n.title))])],2),i("v-uni-view",{staticClass:"radius-5 ovh mx15 mt10 por z-index-130"},[i("swipers",{attrs:{slides:t.banner,srcName:"classpic",height:320},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pushgoods.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"flex align-center flex-wrap mx15  bg-servies pb20 pt10 mt15 radius-5"},t._l(t.dataList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"wp25 discenter mt10 flex flex-direction align-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.pushPage("/pages/shop/shopclass?id="+e.id+"&&title="+e.name+"&&type=0")}}},[i("v-uni-image",{staticClass:"block50 round",attrs:{src:e.classpic,mode:""}}),i("v-uni-text",{staticClass:"mt3 color-white f12"},[t._v(t._s(e.name))])],1)})),1),i("v-uni-view",{staticClass:"flex align-end justify-between px15 mt10 color-black wp100",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pushPage("/pages/shop/shopclass?type=1")}}},[i("v-uni-view",{staticClass:"flex align-center"},[i("v-uni-view",{staticClass:"block5-16 mt2"}),i("v-uni-view",{staticClass:"flex align-end ml10"},[i("v-uni-view",{staticClass:"f16 color-white"},[t._v(t._s(t.i18n.list[0]))])],1)],1),i("v-uni-view",{staticClass:"flex align-center"},[i("v-uni-text",{staticClass:"mr5 f12 color-info"},[t._v(t._s(t.i18n.list[1]))]),i("v-uni-text",{staticClass:"cuIcon-right f12 color-info"})],1)],1),i("v-uni-view",{staticClass:"wp100 px15 flex align-center justify-between flex-wrap mt5 mb10"},t._l(t.goods,(function(e,a){return i("v-uni-view",{key:a,staticClass:"sy-box mt10  bg-servies box-shadow radius-5",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.pushPage("/pages/shop/goods?id="+e.id)}}},[i("v-uni-image",{staticClass:"sy-pics",attrs:{src:e.goodPic,mode:"widthFix"}}),i("v-uni-view",{staticClass:"wp100 pr10 ellipsis2 mt10 pl10 h40s"},[t._v(t._s(e.goodName)+" "+t._s(e.goodDesc))]),i("v-uni-view",{staticClass:"mt10 color-danger pl10 mb15 flex align-center"},[i("v-uni-text",[t._v("$"+t._s(e.price))])],1)],1)})),1)],1)},s=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}))},c2fe:function(t,e,i){"use strict";i.r(e);var a=i("bcc8"),n=i("5a31");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("fb22");var r,o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"1668c426",null,!1,a["a"],r);e["default"]=c.exports},db88:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".slider-wrap[data-v-1efb6d2e]{width:100%;box-sizing:border-box}.slider-wrap .slider-img[data-v-1efb6d2e]{display:block;width:100%;height:100%}.slider-wrap .text[data-v-1efb6d2e]{color:inherit}",""]),t.exports=e},e8e6:function(t,e,i){"use strict";var a=i("4ece"),n=i.n(a);n.a},f086:function(t,e,i){var a=i("0f79");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("7d8ae8fa",a,!0,{sourceMap:!1,shadowMode:!1})},fb22:function(t,e,i){"use strict";var a=i("f086"),n=i.n(a);n.a}}]);