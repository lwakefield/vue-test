webpackJsonp([2,0],{0:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var n=a(81),r=i(n),o=a(77),s=i(o);new r.default({el:"#app",render:function(t){return t(s.default)}})},35:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function n(t){for(var e in c){var a=c[e];if(a.test(t))return e}return null}function r(t){var e=n(t),a=c[e],i=t.match(a);return i?"collection"===e?"https://api.tictail.com/v1.12/collections/"+i[1]:"product"===e?"https://api.tictail.com/v1.12/stores/"+("d_"+i[1]+".tictail.com/products?slug="+i[2]):"brand"===e?"https://api.tictail.com/v1.12/stores/"+("d_"+i[1]+".tictail.com"):"category"===e?"https://api.tictail.com/v1.12/categories/s_"+i[1]:null:null}function o(t){var e=r(t),a=n(t);return e?fetch(e).then(function(t){return t.json()}).then(function(e){var i=e.id,n={id:i,type:a,url:t};return"collection"===a?(0,l.default)(n,{slug:e.slug,title:e.name}):"product"===a?(0,l.default)(n,{store_id:e.store_id,title:e.store_name+" - "+e.title}):"brand"===a?(0,l.default)(n,{title:e.name}):"category"===a&&(0,l.default)(n,{slug:e.slug,title:e.name}),n}):u.default.reject("unable to resolve url: "+t)}Object.defineProperty(e,"__esModule",{value:!0});var s=a(38),l=i(s),d=a(39),u=i(d);e.getType=n,e.getEndpoint=r,e.resolve=o;var c={collection:RegExp("https://tictail.com/collections/([^/?]+)(\\?.*)?"),category:RegExp("https://tictail.com/categories/([^/?]+)(\\?.*)?"),brand:RegExp("https://tictail.com/s/([^/?]+)(\\?.*)?"),product:RegExp("https://tictail.com/s/([^/]+)/([^/?]+)(\\?.*)?")}},36:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(35),r=a(78),o=i(r);e.default={name:"app",components:{JsonEditor:o.default},data:function(){return{url:"",data:{},api:null}},mounted:function(){var t=this,e=window.contentfulExtension||window.contentfulWidget;e.init(function(e){t.api=e,e.window.startAutoResizer(),t.data=e.field.getValue(),t.data&&t.data.url&&(t.url=t.data.url)})},methods:{fetch:function(){var t=this;(0,n.resolve)(this.url).then(function(e){t.data=e,t.update(t.data)})},update:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data;this.data=t,this.api&&(this.api.field.setValue(this.data),this.api.entry.fields.title&&this.api.entry.fields.title.setValue(this.data.title))}}}},37:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"json-editor",props:["initialData","disabled"],data:function(){return{data:this.intialData}},watch:{initialData:function(t,e){t!==e&&(this.data=t)}},methods:{updateKey:function(t,e){var a=e.target.value,i={};for(var n in this.data)i[n===t?a:n]=this.data[n];this.data=i,this.$emit("change",this.data)},deleteKey:function(t){this.$delete(this.data,t)},addField:function(){this.$set(this.data,"new-field","")},isDisabled:function(t){return this.disabled.split(",").indexOf(t)!==-1}}}},75:function(t,e){},76:function(t,e){},77:function(t,e,a){var i,n;a(76),i=a(36);var r=a(80);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=r.render,n.staticRenderFns=r.staticRenderFns,t.exports=i},78:function(t,e,a){var i,n;a(75),i=a(37);var r=a(79);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=r.render,n.staticRenderFns=r.staticRenderFns,t.exports=i},79:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._l(t.data,function(e,i){return a("div",{staticClass:"row row--nowrap row--vcenter"},[a("input",{staticClass:"field-key cf-form-input",attrs:{type:"text",placeholder:"Field Key",disabled:t.isDisabled(i)},domProps:{value:i},on:{input:function(e){t.updateKey(i,e)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.data[i],expression:"data[key]"}],staticClass:"field-val cf-form-input",attrs:{type:"text",placeholder:"Field Value",disabled:t.isDisabled(i)},domProps:{value:t._s(t.data[i])},on:{input:function(e){if(!e.target.composing){var a=t.data,n=i;Array.isArray(a)?a.splice(n,1,e.target.value):t.data[i]=e.target.value}}}}),t._v(" "),a("button",{staticClass:"cf-btn-secondary delete-btn",attrs:{disabled:t.isDisabled(i)},on:{click:function(e){t.deleteKey(i)}}},[a("span",[t._v("×")])])])}),t._v(" "),a("button",{staticClass:"cf-btn-primary cf-block",on:{click:t.addField}},[t._v("\n    + Add Field\n  ")])],2)},staticRenderFns:[]}},80:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"row row--nowrap"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],staticClass:"cf-form-input flex--grow",attrs:{type:"text"},domProps:{value:t._s(t.url)},on:{keyup:function(e){t._k(e.keyCode,"enter",13)||t.fetch(e)},input:function(e){e.target.composing||(t.url=e.target.value)}}}),t._v(" "),a("button",{staticClass:"cf-btn-primary",on:{click:t.fetch}},[t._v("\n      Fetch\n    ")])]),t._v(" "),a("json-editor",{attrs:{"initial-data":t.data,disabled:"id,slug,url,type"},on:{change:t.update}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=app.78b3f1b148b597547d3a.js.map