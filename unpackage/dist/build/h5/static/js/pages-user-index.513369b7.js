(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-index"],{"2f626":function(t,i,e){"use strict";var s,a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"user clearfix lh1"},[e("v-uni-view",{style:[{height:t.StatusBar+"px"}]}),e("v-uni-view",{staticClass:"mx15 mt10 radius-5 ovh relative"},[e("v-uni-image",{staticClass:"wp100 h150",attrs:{src:"/static/user/user-bg.png",mode:""}}),e("v-uni-view",{staticClass:"poa-cover flex-text flex-v"},[e("v-uni-image",{staticClass:"block70 round",attrs:{src:t.userInfo.avatar,mode:""}}),e("v-uni-view",{staticClass:"flex-text mt10"},[e("v-uni-view",{staticClass:"mr2"},[t._v(t._s(t.userInfo.name)),0==t.userInfo.activationStatus?e("v-uni-text",{staticClass:"ml5"},[t._v("("+t._s(t.i18n.noGrade)+")")]):t._e()],1),1==t.userInfo.activationStatus?e("v-uni-image",{staticClass:"block20",attrs:{src:"/static/user/vip-"+t.userInfo.grade+".png",mode:""}}):t._e()],1)],1)],1),e("v-uni-view",{staticClass:"mx15 mt15 radius-5 bg-background px15 py15"},[t._l(t.list,(function(i,s){return e("v-uni-view",{key:s,staticClass:"h55 flex align-center justify-between",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pushUrl(i,s)}}},[e("v-uni-view",{staticClass:"flex-text"},[e("v-uni-image",{staticClass:"block20 mr15",attrs:{src:i.icon,mode:""}}),t._v(t._s(i.text))],1),e("v-uni-text",{staticClass:"cuIcon-right color-white-5"})],1)})),e("v-uni-view",{staticClass:"h55 flex align-center justify-between",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.pushPage("/pages/shop/order")}}},[e("v-uni-view",{staticClass:"flex-text"},[e("v-uni-image",{staticClass:"block20 mr15",attrs:{src:"/static/user/dingdan.png",mode:""}}),t._v(t._s(t.i18n.text[7]))],1),e("v-uni-text",{staticClass:"cuIcon-right color-white-5"})],1),e("v-uni-view",{staticClass:"h55 flex align-center justify-between",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.pushPage("/pages/shop/address/index")}}},[e("v-uni-view",{staticClass:"flex-text"},[e("v-uni-image",{staticClass:"block20 mr15",attrs:{src:"/static/user/dizhi.png",mode:""}}),t._v(t._s(t.i18n.text[8]))],1),e("v-uni-text",{staticClass:"cuIcon-right color-white-5"})],1),e("v-uni-view",{staticClass:"h55 flex align-center justify-between",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ShowModal("Modal2")}}},[e("v-uni-view",{staticClass:"flex-text"},[e("v-uni-image",{staticClass:"block20 mr15",attrs:{src:"/static/user/menu-7.png",mode:""}}),t._v(t._s(t.i18n.text[6]))],1),e("v-uni-text",{staticClass:"cuIcon-right color-white-5"})],1),e("v-uni-view",{staticClass:"h55 flex align-center justify-between",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.signOut.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"flex-text"},[e("v-uni-image",{staticClass:"block20 mr15",attrs:{src:"/static/user/menu-6.png",mode:""}}),t._v(t._s(t.i18n.text[5]))],1),e("v-uni-text",{staticClass:"cuIcon-right color-white-5"})],1)],2),e("v-uni-view",{staticClass:"cu-modal",class:"Modal"==t.modalName?"show":""},[e("v-uni-view",{staticClass:"cu-dialog bg-background wp70 pb15"},[e("v-uni-view",{staticClass:"relative"},[e("v-uni-image",{staticClass:"wp100",staticStyle:{position:"absolute"},attrs:{src:"/static/user/my-service.png",mode:"widthFix"}}),e("v-uni-view",{staticClass:"cuIcon-close color-black closeBtn f18",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.HideModal.apply(void 0,arguments)}}})],1),e("v-uni-view",{staticClass:"text-center f13 mt10"},[t._v(t._s(t.i18n.modalTxt))]),e("v-uni-view",{staticClass:"text-center mt10"},[t._v(t._s(t.wechat))]),e("v-uni-view",{staticClass:"wp50 flex-text h35 bg-theme color-black radius-5 auto mt15",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.Copy.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.modalBtn))])],1)],1),e("v-uni-view",{staticClass:"cu-modal",class:"Modal2"==t.modalName?"show":""},[e("v-uni-view",{staticClass:"cu-dialog bg-background wp70 pb15"},[e("v-uni-view",{staticClass:"cu-bar justify-end"},[e("v-uni-view",{staticClass:"content"},[t._v(t._s(t.i18n.modalTitle))]),e("v-uni-view",{staticClass:"action",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.HideModal.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"cuIcon-close color-white-5 f18"})],1)],1),e("v-uni-view",{staticClass:"bg-background pb15"},[t._l(t.language,(function(i,s){return e("v-uni-view",{key:s,staticClass:"wp70 auto flex align-center justify-between h40",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.chooseL(s)}}},[e("v-uni-view",{class:s==t.active?"color-theme":""},[t._v(t._s(i.name))]),s==t.active?e("v-uni-text",{staticClass:"cuIcon-check f17 color-theme"}):t._e()],1)})),e("v-uni-view",{staticClass:"wp60 flex-text h35 f15 radius-5 bg-theme color-black mt20 auto",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.confirm.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.confirm))])],2)],1)],1),e("v-uni-view",{staticClass:"cu-modal",class:"Modal3"==t.modalName?"show":""},[e("v-uni-view",{staticClass:"cu-dialog bg-background pb15",staticStyle:{width:"256px",height:"296px"}},[e("v-uni-image",{staticClass:"wp100",staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{src:"/static/user/me_service.png",mode:"widthFix"}}),e("v-uni-view",{staticClass:"cuIcon-close color-black closeBtn f18",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.HideModal.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"text-center f15",staticStyle:{position:"absolute",bottom:"100px",left:"50%",transform:"translateX(-50%)"}},[t._v(t._s(t.i18n.modalTxt))]),e("v-uni-view",{staticClass:"text-center f20 mt10",staticStyle:{position:"absolute",bottom:"65px",left:"50%",transform:"translateX(-50%)"}},[t._v(t._s(t.wechat))]),e("v-uni-view",{staticClass:"wp50 flex-text h35 bg-theme color-black radius-5 auto mt15",staticStyle:{position:"absolute",bottom:"15px",left:"50%",transform:"translateX(-50%)"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.Copy.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.modalBtn))])],1)],1),e("v-uni-view",{staticClass:"cu-modal",class:"DialogModal"==t.modalName?"show":""},[e("v-uni-view",{staticClass:"cu-dialog bg-background wp80"},[e("v-uni-view",{},[e("v-uni-view",{staticClass:"f16 h80 flex-text"},[t._v(t._s(t.i18n.tip))]),e("v-uni-view",{staticClass:"h45 solid-top border-width-2 border-white-3 flex-text f15"},[e("v-uni-view",{staticClass:"flex-1",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.HideModal.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.cancel))]),e("v-uni-view",{staticClass:"w2 h25 bg-white-3"}),e("v-uni-view",{staticClass:"flex-1 color-theme",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.outConfirm.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.confirm))])],1)],1)],1)],1)],1)},n=[];e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return s}))},"7c45":function(t,i,e){"use strict";var s=e("ee27");e("c740"),e("4160"),e("b64b"),e("159b"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("96cf");var a=s(e("c964")),n=s(e("f3f3")),c=e("2f62"),o={data:function(){return{StatusBar:this.StatusBar,wechat:"",active:""}},computed:{list:function(){return[{text:this.i18n.text[0],icon:"/static/user/menu-1.png",url:"/pages/user/team"},{text:this.i18n.text[1],icon:"/static/user/menu-2.png",url:"/pages/user/share"},{text:this.i18n.text[2],icon:"/static/user/menu-3.png"},{text:this.i18n.text[3],icon:"/static/user/menu-4.png",url:"/pages/user/system"},{text:this.i18n.text[4],icon:"/static/user/menu-5.png",url:"/pages/user/safety"}]},language:function(){var t=[];if(this.$i18n){var i=this.$i18n.messages;Object.keys(i).forEach((function(e){t.push({name:i[e].name,locale:e})}))}return t}},onLoad:function(){},onShow:function(){var t=this,i=this.language.findIndex((function(i){return i.locale==t.$i18n.locale}));this.active=i,this.getInfo(),this.getUser()},methods:(0,n.default)({},(0,c.mapActions)(["logout"]),{pushUrl:function(t,i){if(2==i)this.ShowModal("Modal3");else if(1==i){if(0==this.userInfo.activationStatus)return void uni.showToast({title:this.i18n.tips,icon:"none"});this.pushPage(t.url)}else this.pushPage(t.url)},Copy:function(){this.copy(this.wechat),this.HideModal()},signOut:function(){this.ShowModal("DialogModal")},outConfirm:function(){this.logout(),this.$Router.replaceAll("/pages/login/index")},confirm:function(){this.$i18n.locale=this.language[this.active].locale,this.$t("tabbar").forEach((function(t,i){uni.setTabBarItem({index:i,text:t})})),this.HideModal()},chooseL:function(t){this.active=t},getInfo:function(t){var i=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.$http.post("user.service",{},{tipConfig:{isErrorDefaultTip:!1}});case 2:s=e.sent,a=s.customerService,i.wechat=a,t&&i.ShowModal("Modal");case 6:case"end":return e.stop()}}),e)})))()}})};i.default=o},"8bfe":function(t,i,e){"use strict";var s=e("aee6"),a=e.n(s);a.a},aebf:function(t,i,e){"use strict";e.r(i);var s=e("2f626"),a=e("dfe9");for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);e("8bfe");var c,o=e("f0c5"),l=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,"11248bde",null,!1,s["a"],c);i["default"]=l.exports},aee6:function(t,i,e){var s=e("be4c");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=e("4f06").default;a("d92981ee",s,!0,{sourceMap:!1,shadowMode:!1})},be4c:function(t,i,e){var s=e("24fb");i=s(!1),i.push([t.i,".closeBtn[data-v-11248bde]{position:absolute;right:%?20?%;top:%?20?%}.bg-white-3[data-v-11248bde]{background-color:hsla(0,0%,100%,.3)}",""]),t.exports=i},dfe9:function(t,i,e){"use strict";e.r(i);var s=e("7c45"),a=e.n(s);for(var n in s)"default"!==n&&function(t){e.d(i,t,(function(){return s[t]}))}(n);i["default"]=a.a}}]);