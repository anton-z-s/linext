(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5451:function(e,t,i){e.exports=i(5633)},5633:function(e,t,i){"use strict";i.r(t);var a=i(1),n=i.n(a),r=i(23),o=i.n(r),s=(i(5456),i(70)),c=i(25),l=i(34),d=i(24),u=i(11),m=i(42),h=i(107),f=i(159),p=i(160),W=i(167),I=i(161),b=i(168),g=i(56),v=i(104),w=i(106),y=i(162);function S(){var e=Object(y.a)(['\n  {\n    repository(owner: "LineageOS", name: "lineage_wiki") {\n      object(expression: "master:_data/devices") {\n        ... on Tree {\n          entries {\n            name\n            object {\n              ... on Blob {\n                text\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']);return S=function(){return e},e}var J=Object(s.b)(S()),O=(i(5491),function(e,t){var i=e[t[0]],a=t.slice(1);return Array.isArray(i)?0===a.length?i.map(function(e){return"".concat(Object.keys(e)[0],": ").concat(Object.values(e)[0])}).join("\n"):i.map(function(e){return a.reduce(function(e,t){return void 0!==e[t]?e[t]:"".concat(Object.keys(e)[0],": ").concat(Object.values(e)[0][t])},e)}).join("\n"):"object"===typeof i?i?a.reduce(function(e,t){return e[t]},i):"":i}),H=function(e,t){var i=e[t[0]];return Array.isArray(i)?i.map(function(e){return Object.values(e)[0]}).reduce(function(e,t){return e>t?e:t}):i},L=function(e,t){return Array.isArray(e[t])?e[t].join(", "):""},C=function(e,t,i,a){if(null!=e){var n=e[t];return null!=n?n.map(function(e){return"".concat(e[i],": ").concat(e[a])}).join("\n"):""}return""},Z=function(e,t){var i={},a=new URLSearchParams(t);if(a.get("columns")){var n=a.get("columns").split("|");i.columns=e.map(function(e){return Object(g.a)({},e,{show:n.includes(e.id)})})}return a.get("sorted")&&(i.sorted=a.get("sorted").split("|").map(function(e){return{id:e.endsWith("_desc")?e.slice(0,-5):e,desc:e.endsWith("_desc")}})),a.get("filtered")&&(i.filtered=JSON.parse(decodeURIComponent(escape(atob(a.get("filtered")))))),i},x=function(e){function t(){var e,i;Object(f.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(i=Object(W.a)(this,(e=Object(I.a)(t)).call.apply(e,[this].concat(r)))).state={data:[],anchorCol:null,loading:!0,sorted:[{id:"release",desc:!0}],filtered:[{id:"maintained",value:["Yes"]},{id:"vendor",value:[]},{id:"cpu",value:[]},{id:"soc",value:[]},{id:"cpu_cores",value:[]},{id:"gpu",value:[]},{id:"current_branch",value:[]},{id:"type",value:[]},{id:"release",value:[]},{id:"battery_tech",value:[]},{id:"architecture",value:[]}],columns:[{id:"codename",Header:"Codename",accessor:"codename",show:!1},{id:"vendor",Header:"Vendor",accessor:"vendor",Filter:i.getFilterSelector("vendor"),show:!0},{id:"name",Header:"Name",accessor:"name",show:!0},{id:"models",Header:"Models",accessor:function(e){return L(e,["models"])},show:!1},{id:"cameras",Header:"\u0421ameras",accessor:function(e){return O(e,["cameras","info"])},show:!0},{id:"screen",Header:"Screen size",accessor:"screen",show:!0},{id:"screen_res",Header:"Screen resolution",accessor:"screen_res",show:!0},{id:"screen_ppi",Header:"Screen ppi",accessor:"screen_ppi",show:!1},{id:"screen_tech",Header:"Screen technology",accessor:"screen_tech",show:!1},{id:"storage",Header:"Storage",accessor:"storage",show:!1},{id:"sdcard",Header:"SD Card",accessor:"sdcard",show:!1},{id:"battery_capacity",Header:"Battery capacity",accessor:function(e){return O(e,["battery","capacity"])},style:{whiteSpace:"pre-wrap"},show:!1},{id:"battery_removable",Header:"Battery removable",accessor:function(e){return O(e,["battery","removable"])},style:{whiteSpace:"pre-wrap"},show:!1},{id:"battery_tech",Header:"Battery tech",accessor:function(e){return O(e,["battery","tech"])},Filter:i.getFilterSelector("battery_tech",null,["None","Li-Po","Li-Ion"]),style:{whiteSpace:"pre-wrap"},show:!1},{id:"architecture",Header:"Architecture",accessor:function(e){return O(e,["architecture","cpu"])},Filter:i.getFilterSelector("architecture",function(e){return O(e,["architecture","cpu"])}),filterMethod:function(e,t){var i=e.pivotId||e.id;return 0===e.value.length||(Array.isArray(e.value)?null!=t[i]&&e.value.some(function(e){return t[i]===e}):null!=t[i]&&t[i]===e.value)},show:!1},{id:"soc",Header:"System on a chip",accessor:"soc",Filter:i.getFilterSelector("soc"),show:!1},{id:"cpu",Header:"CPU",accessor:"cpu",Filter:i.getFilterSelector("cpu"),show:!1},{id:"cpu_cores",Header:"CPU cores",accessor:"cpu_cores",Filter:i.getFilterSelector("cpu_cores"),show:!1},{id:"cpu_freq",Header:"CPU frequency",accessor:"cpu_freq",show:!1},{id:"gpu",Header:"GPU",accessor:"gpu",Filter:i.getFilterSelector("gpu"),show:!1},{id:"bluetooth_spec",Header:"Bluetooth",accessor:"bluetooth.spec",show:!1},{id:"ram",Header:"RAM",accessor:"ram",show:!0},{id:"wifi",Header:"Wi-Fi",accessor:"wifi",show:!1},{id:"network",Header:"Network tech",accessor:function(e){return O(e,["network","tech"])},show:!1},{id:"network_bands",Header:"Network bands",accessor:function(e){return C(e,"network","tech","bands")},style:{whiteSpace:"pre-wrap"},show:!1},{id:"width",Header:"Width",accessor:"width",show:!1},{id:"height",Header:"Height",accessor:"height",show:!1},{id:"depth",Header:"Depth",accessor:"depth",show:!1},{id:"maintained",Header:"Maintained",accessor:function(e){return e.maintainers.length?"Yes":"No"},Filter:i.getFilterSelector("maintained",null,["Yes","No"]),show:!1},{id:"maintainers",Header:"Maintainers",accessor:function(e){return L(e,["maintainers"])},show:!1},{id:"current_branch",Header:"Current version",accessor:"current_branch",Filter:i.getFilterSelector("current_branch"),show:!1},{id:"versions",Header:"Available versions",accessor:function(e){return L(e,["versions"])},show:!1},{id:"release",Header:"Release date",accessor:function(e){return H(e,["release"])},Filter:i.getFilterSelector("release",function(e){return H(e,["release"]).split("-")[0]}),show:!0},{id:"peripherals",Header:"Peripherals",accessor:function(e){return L(e,["peripherals"])},show:!1},{id:"type",Header:"Device type",accessor:"type",Filter:i.getFilterSelector("type"),show:!1},{id:"wiki",Header:"Wiki",filterable:!1,accessor:function(e){return n.a.createElement(u.n,{href:"https://wiki.lineageos.org/devices/".concat(e.codename),target:"_blank",rel:"noopener"},"Open wiki")},show:!1}]},i.uniqueValues=[],i.uniqueValuesDisabled=[],i.handleColumnToggleClick=function(e){i.setState({anchorCol:e.currentTarget})},i.handleColumnToggleClose=function(){i.setState({anchorCol:null})},i.handleCToggle=function(e){var t=i.state,a=t.columns,n=t.filtered;a[a.findIndex(function(t){return t.id===e.target.value})].show=e.target.checked,i.setState({columns:a.slice()},function(){i.grayoutSelectableFilterOptions(n,a),i.forceUpdate()})},i.grayoutSelectableFilterOptions=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.state.columns;t.filter(function(e){return!0===e.show&&e.Filter}).forEach(function(a){var n=e.find(function(e){return e.id===a.id}),r=e.filter(function(e){return 0!==e.value.length&&e.id!==a.id}),o=n.value.slice();n.value=[];var s=i.reactTable.getResolvedState().resolvedData.filter(function(e){return r.map(function(a){var n=t.find(function(e){return e.id===a.id});return(n.filterMethod?n.filterMethod:i.reactTable.props.defaultFilterMethod)(a,e)}).every(Boolean)});i.uniqueValues[a.id].forEach(function(e,t){n.value=e;var r=s.filter(function(e){return(a.filterMethod?a.filterMethod:i.reactTable.props.defaultFilterMethod)(n,e)}).length;i.uniqueValuesDisabled[a.id][t]=0===r}),n.value=o})},i.customFilter=function(e){var t=e.filter,a=e.onChange,r=e.column,o=i.props.classes;return n.a.createElement(u.u,{key:r.Header,className:o.customFilter,onChange:function(e){var t=e.target.selectionStart,i=e.target;window.requestAnimationFrame(function(){i.selectionStart=t,i.selectionEnd=t}),a(e.target.value)},value:t?t.value:""})},i}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state,i=t.columns,a=t.filtered,n=this.props,r=n.apolloClient,o=n.location,s=n.history,c=Z(i,o.search);r.query({query:J}).then(function(t){return e.setState(Object(g.a)({data:t.data.repository.object.entries.map(function(e){return Object(v.safeLoad)(e.object.text,{schema:v.FAILSAFE_SCHEMA})}),loading:!1},c),function(){e.grayoutSelectableFilterOptions(a,i),e.forceUpdate()})}),s.listen(function(t){e.setState(Object(g.a)({},Z(i,t.search)),function(){e.grayoutSelectableFilterOptions(e.state.filtered,e.state.columns),e.forceUpdate()})})}},{key:"componentDidUpdate",value:function(e,t){var i=this.state,a=i.columns,n=i.sorted,r=i.filtered,o=i.loading,s=this.props,c=s.location,l=s.history;if(!o&&(a!==t.columns||n!==t.sorted||r!==t.filtered)){var d=a.filter(function(e){return e.show}).map(function(e){return e.id}).join("|"),u=n.map(function(e){return e.desc?"".concat(e.id,"_desc"):e.id}).join("|"),m=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),h="?columns=".concat(d,"&sorted=").concat(u,"&filtered=").concat(m);h!==c.search&&l.push({pathname:"/",search:h,state:{fired_by_table:!0}})}}},{key:"getFilterOptions",value:function(e,t){var i=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t){return t[e]},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Object(h.a)(new Set(this.state.data.map(a))).sort(),o=this.props.classes;return this.uniqueValues[e]&&0!==this.uniqueValues[e].length||(this.uniqueValues[e]=r,this.uniqueValuesDisabled[e]=Array(r.length).fill(!1)),r.map(function(a,r){return n.a.createElement(u.p,{disabled:i.uniqueValuesDisabled[e][r],className:o.filterSelectItem,key:a,value:a},n.a.createElement(u.c,{checked:t.includes(a)}),n.a.createElement(u.o,{className:o.filterSelectItemText,primary:a}))})}},{key:"getFilterSelector",value:function(e,t,i){var a=this;return function(r){var o=r.onChange,s=a.state.filtered.find(function(t){return t.id===e}).value,c=a.props.classes;return n.a.createElement(u.s,{className:c.filterSelect,multiple:!0,value:s,onChange:function(e){return s.length=0,e.target.value.includes("Reset")||s.push.apply(s,Object(h.a)(e.target.value)),o(s)},input:n.a.createElement(u.m,{id:"select-multiple-checkbox"}),renderValue:function(e){return e.join(", ")}}," ",n.a.createElement(u.p,{className:c.filterSelectItem,key:"Reset",value:"Reset"},n.a.createElement(u.o,{className:c.filterSelectItemReset,primary:"Reset"})),a.getFilterOptions(e,s,t,i))}}},{key:"render",value:function(){var e=this,t=this.props.classes,i=this.state,a=i.data,r=i.anchorCol,o=i.columns,s=i.loading,l=i.sorted,d=i.filtered,h=Boolean(r);return n.a.createElement(u.q,{className:t.root},n.a.createElement(u.w,{title:"Toggle columns"},n.a.createElement(u.l,{onClick:this.handleColumnToggleClick},n.a.createElement(m.c,null))),n.a.createElement(u.r,{id:"simple-popper",open:h,anchorEl:r,onClose:this.handleColumnToggleClose,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(u.h,{className:t.formControl},n.a.createElement(u.k,null,"Select visible columns"),n.a.createElement(u.j,null,o.map(function(i){return n.a.createElement(u.i,{classes:{label:t.formControlLabel},control:n.a.createElement(u.c,{onChange:e.handleCToggle}),checked:i.show,label:i.Header,value:i.id})})))),n.a.createElement(u.b,{component:c.b,to:"/".concat("?columns=vendor|name|cameras|screen|screen_res|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfV0=")},"Reset"),n.a.createElement(w.b,{ref:function(t){e.reactTable=t},data:a,columns:o,className:t.table,column:Object(g.a)({},w.a.column,{style:{whiteSpace:"normal"},Filter:this.customFilter}),noDataText:s?"":"No devices found...",loading:s,showPagination:!1,pageSize:a.length,minRows:5,sorted:l,filterable:!0,filtered:d,defaultFilterMethod:function(e,t){var i=e.pivotId||e.id;if(0===e.value.length)return!0;if(Array.isArray(e.value))return null!=t[i]&&e.value.some(function(e){return String(t[i]).toLowerCase().includes(e.toLowerCase())});var a=e.value.split(",");return null!=t[i]&&a.some(function(e){return""!==e.trim()&&String(t[i]).toLowerCase().includes(e.trim().toLowerCase())})},onSortedChange:function(t){e.setState({sorted:t})},onFilteredChange:function(t){e.grayoutSelectableFilterOptions(t),e.setState({filtered:t})}}))}}]),t}(a.Component),j=Object(d.withStyles)(function(e){return{root:{width:"100%",marginTop:3*e.spacing.unit,overflowX:"auto"},table:{minWidth:700,fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif"},formControl:{margin:3*e.spacing.unit},formControlLabel:{fontSize:"1rem"},filterSelect:{width:"100%"},filterSelectItemText:{padding:0},filterSelectItem:{paddingLeft:"12px"},filterSelectItemReset:{paddingLeft:"48px !important"},customFilter:{width:"100%"}}})(x),F=Object(d.createMuiTheme)({palette:{primary:{main:"#167c80"},secondary:{main:"#008e9e"}},transitions:{create:function(){return"none"}}});var Y=Object(d.withStyles)(function(e){return{appBar:{position:"relative",marginBottom:3*e.spacing.unit},icon:{marginRight:2*e.spacing.unit},container:{width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit,marginBottom:3*e.spacing.unit},appName:{flexGrow:1},columnIconInText:{verticalAlign:"middle"},expansionPanelDetails:{flexDirection:"column"},expansionPanelExpanded:{margin:0}}})(function(e){var t=e.classes,i=e.apolloClient;return n.a.createElement(c.a,{basename:"/"},n.a.createElement(u.d,null),n.a.createElement(l.a,{path:"/",render:function(e){var a=e.location,r=e.history;return n.a.createElement(d.MuiThemeProvider,{theme:F},n.a.createElement(u.a,{position:"static",className:t.appBar},n.a.createElement(u.v,null,n.a.createElement(m.b,{className:t.icon}),n.a.createElement(u.x,{className:t.appName,variant:"h6",color:"inherit",noWrap:!0},"Linext"),n.a.createElement(u.l,{href:"https://github.com/anton-z-s/linext/",target:"_blank",rel:"noopener",color:"inherit"},n.a.createElement(u.t,null,n.a.createElement("path",{d:"M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"}))))),n.a.createElement("main",{className:t.container},n.a.createElement(u.x,{variant:"h6",gutterBottom:!0},"This is a list of"," ",n.a.createElement(u.n,{href:"https://www.lineageos.org/",target:"_blank",rel:"noopener"}," ","LineageOS")," ","devices, presented in a convenient way."),n.a.createElement(u.e,{classes:{expanded:t.expansionPanelExpanded}},n.a.createElement(u.g,{expandIcon:n.a.createElement(m.a,null)},n.a.createElement(u.x,{variant:"subtitle1"},"How-to use & examples")),n.a.createElement(u.f,{className:t.expansionPanelDetails},n.a.createElement(u.x,{variant:"subtitle1",paragraph:!0,gutterBottom:!0},"You can sort (hold Shift to multi-sort), filter devices (use comma for multiple values), show/hide columns (",n.a.createElement(m.c,{className:t.columnIconInText}),"). All the info is straight out of the official wiki, always up-to-date."),n.a.createElement(u.x,{variant:"subtitle2",gutterBottom:!0},"Here are some examples of what you can get:"),n.a.createElement(u.x,{variant:"subtitle1",gutterBottom:!0},n.a.createElement(c.b,{to:"/?columns=vendor|name|cameras|screen|screen_res|battery_capacity|ram|current_branch|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJ0eXBlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoidmVuZG9yIiwidmFsdWUiOltdfSx7ImlkIjoicmVsZWFzZSIsInZhbHVlIjpbIjIwMTgiXX0seyJpZCI6ImN1cnJlbnRfYnJhbmNoIiwidmFsdWUiOlsiMTYuMCJdfV0="},"LineageOS devices released in 2018, updated to v16."),n.a.createElement("br",null),n.a.createElement(c.b,{to:"/?columns=vendor|name|cameras|screen|screen_res|battery_capacity|ram|current_branch|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJ0eXBlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoiY3VycmVudF9icmFuY2giLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoidmVuZG9yIiwidmFsdWUiOlsiR29vZ2xlIl19XQ=="},"LineageOS devices released by Google."),n.a.createElement("br",null),n.a.createElement(c.b,{to:"/?columns=vendor|name|cameras|screen|screen_res|screen_tech|battery_capacity|ram|release|type&sorted=release_desc&filtered=W3siaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6ImJhdHRlcnlfdGVjaCIsInZhbHVlIjpbXX0seyJpZCI6ImFyY2hpdGVjdHVyZSIsInZhbHVlIjpbXX0seyJpZCI6Im1haW50YWluZWQiLCJ2YWx1ZSI6WyJZZXMiXX0seyJpZCI6InJlbGVhc2UiLCJ2YWx1ZSI6W119LHsiaWQiOiJ0eXBlIiwidmFsdWUiOlsidGFibGV0Il19XQ=="},"Tablets with LineageOS support."),n.a.createElement("br",null),n.a.createElement(c.b,{to:"/?columns=vendor|name|cameras|screen|screen_res|screen_tech|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoic2NyZWVuX3RlY2giLCJ2YWx1ZSI6ImFtb2xlZCJ9LHsiaWQiOiJyYW0iLCJ2YWx1ZSI6IjYsOCJ9XQ=="},"LineageOS devices with 6 or 8 GB of RAM and AMOLED screen."),n.a.createElement("br",null),n.a.createElement(c.b,{to:"/?columns=vendor|name|cameras|screen|screen_res|soc|cpu|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoic29jIiwidmFsdWUiOlsiUXVhbGNvbW0gU0RNODQ1IFNuYXBkcmFnb24gODQ1IiwiUXVhbGNvbW0gTVNNODk5OCBTbmFwZHJhZ29uIDgzNSJdfV0="},"LineageOS devices with Snapdragon 845 and 835."),n.a.createElement("br",null),n.a.createElement(c.b,{to:"/?columns=vendor|name|cameras|screen|screen_res|ram|maintained|release&sorted=release_desc&filtered=W3siaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoibWFpbnRhaW5lZCIsInZhbHVlIjpbIk5vIl19XQ=="},"LineageOS devices that are no longer maintained.")))),n.a.createElement(j,{apolloClient:i,location:a,history:r})))}}))}),k=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function E(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var i=e.installing;null!=i&&(i.onstatechange=function(){"installed"===i.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var V=new s.a({uri:"https://api.github.com/graphql",headers:{authorization:"Bearer d7f5d16a3e126aecfb40f83b0826ae2ef74bd21a"}});o.a.render(n.a.createElement(Y,{apolloClient:V}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/linext",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/linext","/service-worker.js");k?(function(e,t){fetch(e).then(function(i){var a=i.headers.get("content-type");404===i.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):E(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):E(t,e)})}}()}},[[5451,1,2]]]);
//# sourceMappingURL=main.7fa58bc0.chunk.js.map