(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/goods"],{"1ee6":function(e,n,t){"use strict";t.r(n);var o=t("50ea"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},3331:function(e,n,t){"use strict";var o=t("73e6"),i=t.n(o);i.a},"50ea":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t("4795")),i=t("2f62");function r(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,o,i,r,u){try{var c=e[r](u),a=c.value}catch(s){return void t(s)}c.done?n(a):Promise.resolve(a).then(o,i)}function c(e){return function(){var n=this,t=arguments;return new Promise((function(o,i){var r=e.apply(n,t);function c(e){u(r,o,i,c,a,"next",e)}function a(e){u(r,o,i,c,a,"throw",e)}c(void 0)}))}}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){d(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var f=function(){t.e("components/swipers").then(function(){return resolve(t("42ab"))}.bind(null,t)).catch(t.oe)},l=function(){Promise.all([t.e("common/vendor"),t.e("components/parse/parse")]).then(function(){return resolve(t("8324"))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/uni-number-box/uni-number-box").then(function(){return resolve(t("c1fd"))}.bind(null,t)).catch(t.oe)},h={components:{swipers:f,uParse:l,uniNumberBox:p},data:function(){var e;return e={block:!1,id:"",stock:0,goodPic:"",price:0,goodsname:"",xiangqing:"",sellnum:"",num:1,desc:"",spec:[]},d(e,"stock",""),d(e,"specActive",0),d(e,"specName",""),e},computed:s({},(0,i.mapState)(["baseURL"]),{shiMoney:function(){return(this.price*this.num).toFixed(2)}}),onLoad:function(e){this.id=e.id},onShow:function(){this.getData()},onHide:function(){this.hideModal()},onBackPress:function(){this.hideModal()},methods:s({},(0,i.mapActions)(["setStateEdit"]),{getData:function(){var e=this;return c(o.default.mark((function n(){var t,i,r,u,c,a,s,d;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.post("shop.goods",{id:e.id},{tipConfig:{storeBlock:!0}});case 2:t=n.sent,i=t.data,r=i.goodName,u=i.goodDesc,c=i.price,a=i.num,i.pic,s=i.goodPic,d=i.desc,e.goodsname=r,e.desc=u,e.price=c,e.stock=a,e.goodPic=s,e.xiangqing=d;case 17:case"end":return n.stop()}}),n)})))()},showModal:function(e){this.modalName=e},hideModal:function(e){this.modalName=null},hideSelloutModal:function(){clearTimeout(this.selloutTimes),this.hideModal(),e.navigateBack({delta:1})},movenum:function(){if(1==this.num)return!1;this.num=this.num-1},addnum:function(){if(99==this.num)return!1;this.num=this.num+1},backs:function(){e.navigateBack({delta:1})},pushHome:function(){e.navigateTo({url:"/pages/shop/index"})},buyNow:function(){this.hideModal(),e.navigateTo({url:"/pages/shop/confirm?id="+this.id+"&num="+this.num+"&price="+this.price})}})};n.default=h}).call(this,t("6e42")["default"])},"73e6":function(e,n,t){},"76ba":function(e,n,t){"use strict";t.r(n);var o=t("907c"),i=t("1ee6");for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t("3331");var u,c=t("f0c5"),a=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=a.exports},"907c":function(e,n,t){"use strict";var o,i=function(){var e=this,n=e.$createElement,t=(e._self._c,{mode:"widthFix",lazyLoad:!0,domain:e.baseURL.URL});e.$mp.data=Object.assign({},{$root:{a0:t}})},r=[];t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}))},d569:function(e,n,t){"use strict";(function(e){t("6aed"),t("921b");o(t("66fd"));var n=o(t("76ba"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])}},[["d569","common/runtime","common/vendor"]]]);