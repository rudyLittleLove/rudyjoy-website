(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-740f24b0"],{"0e2c":function(e,a,r){"use strict";r.r(a);var n=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{staticClass:"dishes-wrapper"},[r("h1",[e._v("土家菜馆菜单")]),r("el-form",{attrs:{model:e.formData,inline:"",size:"mini"}},[r("el-form-item",{attrs:{label:"人数"}},[r("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.formData.peopleNumber,callback:function(a){e.$set(e.formData,"peopleNumber",a)},expression:"formData.peopleNumber"}})],1),r("el-form-item",{attrs:{label:"桌数"}},[r("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.formData.tableNumber,callback:function(a){e.$set(e.formData,"tableNumber",a)},expression:"formData.tableNumber"}})],1),r("el-form-item",{attrs:{label:"单价"}},[r("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.formData.price,callback:function(a){e.$set(e.formData,"price",a)},expression:"formData.price"}})],1),r("el-form-item",{attrs:{label:"餐位费"}},[r("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.formData.peoplePrice,callback:function(a){e.$set(e.formData,"peoplePrice",a)},expression:"formData.peoplePrice"}})],1),r("span",{staticClass:"item"},[e._v("总金额 ￥"+e._s(e.count))]),r("span",{staticClass:"item"},[e._v("每桌金额 ￥"+e._s(e.total))])],1),r("el-checkbox-group",{model:{value:e.formData.checked,callback:function(a){e.$set(e.formData,"checked",a)},expression:"formData.checked"}},[r("ul",e._l(e.dishes,(function(a,n){return r("li",{key:n},[r("h2",[e._v(e._s(a.type))]),r("div",{staticClass:"list-wrap"},e._l(a.children,(function(a,i){return r("el-checkbox",{key:n+"."+i,class:{light:e.balance===+a.price},attrs:{label:a.id}},[e._v(e._s(a.name)+" "),"炒时蔬"!==a.name?r("span",{staticClass:"price"},[e._v("￥"+e._s(a.price))]):r("el-input",{attrs:{size:"mini"},model:{value:a.price,callback:function(r){e.$set(a,"price",r)},expression:"item2.price"}})],1)})),1)])})),0)]),r("div",{staticClass:"right-box"},[r("h2",[e._v("已点菜品")]),r("ul",e._l(e.formData.checked,(function(a,n){return r("li",{key:n,on:{click:function(a){return e.formData.checked.splice(n,1)}}},[e._v(e._s(e.dishesObj[a].name)),r("span",[e._v("￥"+e._s(e.dishesObj[a].price))])])})),0),r("div",{staticClass:"box"},[r("p",[e._v("桌数"),r("span",[e._v(e._s(e.formData.tableNumber)+" 桌")])]),r("p",[e._v("每桌金额"),r("span",[e._v("￥"+e._s(e.total))])]),r("p",[e._v("已点菜品金额 "),r("span",[e._v("￥"+e._s(e.totaled))])]),r("p",{class:{danger:e.total<e.totaled}},[e._v("剩余金额 "),r("span",[e._v("￥"+e._s(e.balance))])])])])],1)},i=[],t=(r("7f7f"),r("55dd"),r("844a")),c={name:"Dishes",data:function(){return{dishes:[],formData:{peopleNumber:20,tableNumber:2,price:15,peoplePrice:3,checked:[]},dishesObj:{}}},computed:{count:function(){return this.formData.peopleNumber*(this.formData.price-this.formData.peoplePrice)},total:function(){return this.count/this.formData.tableNumber},totaled:function(){var e=this,a=this.formData.checked.map((function(a){return e.dishesObj[a].price}));return a.push(0,0),a.reduce((function(e,a){return+e+ +a}))},balance:function(){return this.total-this.totaled}},watch:{formData:{handler:function(e){localStorage.setItem("dishes",JSON.stringify(e))},deep:!0}},created:function(){var e=this;this.dishes=t.map((function(a){return a.children.sort((function(e,a){return(e.price>>>0)-(a.price>>>0)})),a.children.map((function(a){return a.id=a.name+a.price,e.dishesObj[a.id]=a,a})),a}));var a=localStorage.getItem("dishes");a&&(this.formData=JSON.parse(a))},methods:{}},p=c,m=(r("f7b3"),r("dffe"),r("2877")),s=Object(m["a"])(p,n,i,!1,null,"0de98fa7",null);a["default"]=s.exports},"2f21":function(e,a,r){"use strict";var n=r("79e5");e.exports=function(e,a){return!!e&&n((function(){a?e.call(null,(function(){}),1):e.call(null)}))}},"55dd":function(e,a,r){"use strict";var n=r("5ca1"),i=r("d8e8"),t=r("4bf8"),c=r("79e5"),p=[].sort,m=[1,2,3];n(n.P+n.F*(c((function(){m.sort(void 0)}))||!c((function(){m.sort(null)}))||!r("2f21")(p)),"Array",{sort:function(e){return void 0===e?p.call(t(this)):p.call(t(this),i(e))}})},"7f7f":function(e,a,r){var n=r("86cc").f,i=Function.prototype,t=/^\s*function ([^ (]*)/,c="name";c in i||r("9e1e")&&n(i,c,{configurable:!0,get:function(){try{return(""+this).match(t)[1]}catch(e){return""}}})},"844a":function(e){e.exports=JSON.parse('[{"type":"凉菜","children":[{"name":"蒜泥白肉","price":"24"},{"name":"香油苦瓜","price":"14"},{"name":"川北凉粉","price":"12"},{"name":"青椒皮蛋","price":"14"},{"name":"蒜泥黄瓜","price":"14"},{"name":"油酥花生","price":"14"},{"name":"活灼莴笋","price":"12"}]},{"type":"热菜","children":[{"name":"土家野猪肉","price":"58"},{"name":"土家老坛牛肉","price":"45"},{"name":"土家老腊肉","price":"35"},{"name":"泡椒鳝段","price":"58"},{"name":"干豇豆烧肉","price":"28"},{"name":"土家太婆牛肉","price":"45"},{"name":"土家回锅肉","price":"26"},{"name":"尖椒猪头肉","price":"38"},{"name":"土家乱刀鸭","price":"35"},{"name":"水煮嫩牛肉","price":"45"},{"name":"尖椒鳝鱼段","price":"58"},{"name":"青菜牛肉","price":"40"},{"name":"双椒排骨","price":"45"},{"name":"泡椒牛肉丝","price":"40"},{"name":"泡椒鸡杂","price":"28"},{"name":"糖醋里脊","price":"40"},{"name":"尖椒排骨回锅肉","price":"45"},{"name":"水煮肉片","price":"28"},{"name":"火爆双脆","price":"40"},{"name":"火爆肥肠","price":"40"},{"name":"苕皮回锅肉","price":"26"},{"name":"肝腰合炒","price":"40"},{"name":"泡椒腰花","price":"40"},{"name":"渣海椒炒肉","price":"26"},{"name":"尖椒黄喉","price":"38"},{"name":"火爆肚条","price":"40"},{"name":"木耳肉片","price":"24"},{"name":"香辣兔","price":"35"},{"name":"白油肚条","price":"40"},{"name":"烧白","price":"25"},{"name":"辣子鸡","price":"35"},{"name":"尖椒兔","price":"35"},{"name":"小炒肉","price":"24"},{"name":"花菜炒腊肉","price":"35"},{"name":"尖椒鸡","price":"35"},{"name":"泡椒肉丝","price":"24"},{"name":"青椒肉丝","price":"24"},{"name":"酸菜鱼","price":"35"},{"name":"回锅肉","price":"24"},{"name":"蒜苔肉丝","price":"24"},{"name":"水煮鱼","price":"35"},{"name":"盐煎肉","price":"24"},{"name":"豆干肉丝","price":"24"},{"name":"毛血旺","price":"35"},{"name":"尖椒猪肝","price":"24"},{"name":"鱼香肉丝","price":"25"},{"name":"老盐菜炒肉","price":"26"},{"name":"泡椒猪肝","price":"24"},{"name":"苦瓜肉丝","price":"26"},{"name":"粉蒸肉","price":"25"},{"name":"宫保鸡丁","price":"25"}]},{"type":"干锅","children":[{"name":"野猪肉、牛肉、肥肠、鸡爪、中翅、翅尖、排骨    88/锅（任选两种）","price":"88"},{"name":"鸡、兔、鸡杂      78/锅（任选两种）","price":"78"}]},{"type":"素菜","children":[{"name":"素炒三样","price":"18"},{"name":"青椒炒茄片","price":"18"},{"name":"麻婆豆腐","price":"15"},{"name":"渣海椒炒土豆丝","price":"18"},{"name":"干煸四季豆","price":"18"},{"name":"菜豆花","price":"12"},{"name":"粉丝莲白","price":"18"},{"name":"干煸土豆丝","price":"18"},{"name":"油渣莲白","price":"18"},{"name":"韭菜炒蛋","price":"16"},{"name":"红烧茄子","price":"15"},{"name":"鱼香茄子","price":"15"},{"name":"韭菜炒豆干","price":"16"},{"name":"酸辣鸭血","price":"16"},{"name":"青椒土豆丝","price":"14"},{"name":"苦瓜炒蛋","price":"16"},{"name":"虎皮青椒","price":"16"},{"name":"炒莴笋","price":"14"},{"name":"炒小白菜","price":"14"},{"name":"番茄炒蛋","price":"16"},{"name":"炒时蔬","price":"时价"}]},{"type":"汤菜","children":[{"name":"酥肉菜汤","price":"25"},{"name":"番茄鸡蛋汤","price":"15"},{"name":"鸭子汤","price":"25"},{"name":"番茄排骨汤","price":"28"},{"name":"黄瓜皮蛋汤","price":"15"},{"name":"大骨萝卜汤","price":"12"},{"name":"米豆酸菜汤","price":"15"},{"name":"小菜豆腐汤","price":"14"},{"name":"酸菜粉丝汤","price":"14"}]}]')},bcd1:function(e,a,r){},dffe:function(e,a,r){"use strict";var n=r("bcd1"),i=r.n(n);i.a},e42d:function(e,a,r){},f7b3:function(e,a,r){"use strict";var n=r("e42d"),i=r.n(n);i.a}}]);
//# sourceMappingURL=chunk-740f24b0.fe6718ed.js.map