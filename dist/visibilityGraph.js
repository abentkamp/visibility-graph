!function(a,b){typeof exports==='object'&&typeof module!=='undefined'?module.exports=b():typeof define==='function'&&define.amd?define(b):(a=a||self, a.visibilityGraph=b())}(this,function(){'use strict';var d=function(a){i(a);var b=g(a);a.on=b.on;a.off=b.off;a.fire=b.fire;return a};function g(a){var b=Object.create(null);return{on:function(c,d,e){if(typeof d!=='function'){throw new Error('callback is expected to be a function')}var f=b[c];f||(f=b[c]=[]);f.push({callback:d,ctx:e});return a},off:function(c,d){var e=typeof c==='undefined';if(e){b=Object.create(null);return a}if(b[c]){var f=typeof d!=='function';if(f)delete b[c];else{var g=b[c];for(var h=0;h<g.length;++h)g[h].callback===d&&g.splice(h,1)}}return a},fire:function(c){var d=b[c];if(!d){return a}var e;arguments.length>1&&(e=Array.prototype.splice.call(arguments,1));for(var f=0;f<d.length;++f){var g=d[f];g.callback.apply(g.ctx,e)}return a}}}function i(a){if(!a){throw new Error('Eventify cannot use falsy object as events subject')}var b=['on','fire','off'];for(var c=0;c<b.length;++c){if(a.hasOwnProperty(b[c])){throw new Error("Subject cannot be eventified, since it already has property '"+b[c]+"'")}}}var j=k;function k(a){a=a||{};'uniqueLinkId' in a&&(console.warn("ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n",'\n',"Note: there is also change in default behavior: From now on each graph\nis considered to be not a multigraph by default (each edge is unique)."),a.multigraph=a.uniqueLinkId);a.multigraph===undefined&&(a.multigraph=!1);var b=typeof Object.create==='function'?Object.create(null):{},c=[],e={},f=0,g=0,h=P(),i=a.multigraph?D:C,j=[],k=M,n=M,p=M,q=M,r={addNode:y,addLink:B,removeLink:F,removeNode:A,getNode:z,getNodesCount:function(){return f},getLinksCount:function(){return c.length},getLinks:E,forEachNode:h,forEachLinkedNode:J,forEachLink:I,beginUpdate:p,endUpdate:q,clear:H,hasLink:G,hasNode:z,getLink:G};d(r);u();return r;function u(){var a=r.on;r.on=b;function b(){r.beginUpdate=p=N;r.endUpdate=q=O;k=w;n=x;r.on=a;return a.apply(r,arguments)}}function w(a,b){j.push({link:a,changeType:b})}function x(a,b){j.push({node:a,changeType:b})}function y(a,c){if(a===undefined){throw new Error('Invalid node identifier')}p();var d=z(a);d?(d.data=c,n(d,'update')):(d=new m(a,c),f++,n(d,'add'));b[a]=d;q();return d}function z(a){return b[a]}function A(a){var c=z(a);if(!c){return !1}p();var d=c.links;if(d){c.links=null;for(var e=0;e<d.length;++e)F(d[e])}delete b[a];f--;n(c,'remove');q();return !0}function B(a,b,d){p();var e=z(a)||y(a),f=z(b)||y(b),g=i(a,b,d);c.push(g);o(e,g);a!==b&&o(f,g);k(g,'add');q();return g}function C(a,b,c){var d=t(a,b);return new s(a,b,c,d)}function D(a,b,c){var d=t(a,b),f=e.hasOwnProperty(d);if(f||G(a,b)){f||(e[d]=0);var g='@'+ ++e[d];d=t(a+g,b+g)}return new s(a,b,c,d)}function E(a){var b=z(a);return b?b.links:null}function F(a){if(!a){return !1}var b=l(a,c);if(b<0){return !1}p();c.splice(b,1);var d=z(a.fromId),e=z(a.toId);d&&(b=l(a,d.links),b>=0&&d.links.splice(b,1));e&&(b=l(a,e.links),b>=0&&e.links.splice(b,1));k(a,'remove');q();return !0}function G(a,b){var c=z(a),d;if(!c||!c.links){return null}for(d=0;d<c.links.length;++d){var e=c.links[d];if(e.fromId===a&&e.toId===b){return e}}return null}function H(){p();h(function(a){A(a.id)});q()}function I(a){var b,d;if(typeof a==='function'){for(b=0, d=c.length;b<d;++b)a(c[b])}}function J(a,b,c){var d=z(a);if(d&&d.links&&typeof b==='function'){if(c){return L(d.links,a,b)}else{return K(d.links,a,b)}}}function K(a,c,d){var e;for(var f=0;f<a.length;++f){var g=a[f],h=g.fromId===c?g.toId:g.fromId;e=d(b[h],g);if(e){return !0}}}function L(a,c,d){var e;for(var f=0;f<a.length;++f){var g=a[f];if(g.fromId===c){e=d(b[g.toId],g);if(e){return !0}}}}function M(){}function N(){g+=1}function O(){g-=1;g===0&&j.length>0&&(r.fire('changed',j),j.length=0)}function P(){return Object.keys?Q:R}function Q(a){if(typeof a!=='function'){return}var c=Object.keys(b);for(var d=0;d<c.length;++d){if(a(b[c[d]])){return !0}}}function R(a){if(typeof a!=='function'){return}var c;for(c in b){if(a(b[c])){return !0}}}}function l(a,b){if(!b)return-1;if(b.indexOf){return b.indexOf(a)}var c=b.length,d;for(d=0;d<c;d+=1){if(b[d]===a){return d}}return-1}function m(a,b){this.id=a;this.links=null;this.data=b}function o(a,b){a.links?a.links.push(b):(a.links=[b])}function s(a,b,c,d){this.fromId=a;this.toId=b;this.data=c;this.id=d}function t(a,b){return a.toString()+'👉 '+b.toString()}class u{constructor(){this.keys=[]}findKeyPosition(a,b){let c=0,d=this.keys.length;while(c<d){let b=Math.floor((c+d)/2);a.isLessThanOtherEdgeKey(this.keys[b])?(d=b):(c=b+1)}return c}addKey(a,b){let c=this.findKeyPosition(a);this.keys.splice(c,0,a)}}let v=0;class w{constructor(a,b){this.x=a[0];this.y=a[1];this.nodeId=v;this.polygonID=b;this.edges=[];this.prevPoint=null;this.nextPoint=null;v++}isPointEqual(a){if(a===null)return !1;return this.x===a.x&&this.y===a.y}angleToPoint(a){if(this.isPointEqual(a))return 0;let b=a.x-this.x,c=a.y-this.y;if(b===0)return c<1?N:O;if(c===0)return b<0?Math.PI:0;if(b<0)return Math.PI+Math.atan(c/b);if(c<0)return 2*Math.PI+Math.atan(c/b);return Math.atan(c/b)}}let x=1.1102230246251565e-16,y=134217729,z=(3+8*x)*x;function A(a,b,c,d,e){let f,g,h,i,j=b[0],k=d[0],l=0,m=0;k>j===k>-j?(f=j,j=b[++l]):(f=k,k=d[++m]);let n=0;if(l<a&&m<c){k>j===k>-j?(g=j+f,h=f-(g-j),j=b[++l]):(g=k+f,h=f-(g-k),k=d[++m]);f=g;h!==0&&(e[n++]=h);while(l<a&&m<c)k>j===k>-j?(g=f+j,i=g-f,h=f-(g-i)+(j-i),j=b[++l]):(g=f+k,i=g-f,h=f-(g-i)+(k-i),k=d[++m]),f=g,h!==0&&(e[n++]=h)}while(l<a)g=f+j,i=g-f,h=f-(g-i)+(j-i),j=b[++l],f=g,h!==0&&(e[n++]=h);while(m<c)g=f+k,i=g-f,h=f-(g-i)+(k-i),k=d[++m],f=g,h!==0&&(e[n++]=h);(f!==0||n===0)&&(e[n++]=f);return n}function B(a,b){let c=b[0];for(let d=1;d<a;d++)c+=b[d];return c}function C(a){return new Float64Array(a)}let D=(3+16*x)*x,E=(2+12*x)*x,F=(9+64*x)*x*x,G=C(4),H=C(8),I=C(12),J=C(16),K=C(4);function L(a,b,c,d,e,f,g){let h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,C,D=a-e,L=c-e,M=b-f,N=d-f;u=D*N;m=y*D;n=m-(m-D);o=D-n;m=y*N;p=m-(m-N);q=N-p;v=o*q-(u-n*p-o*p-n*q);w=M*L;m=y*M;n=m-(m-M);o=M-n;m=y*L;p=m-(m-L);q=L-p;x=o*q-(w-n*p-o*p-n*q);r=v-x;l=v-r;G[0]=v-(r+l)+(l-x);s=u+r;l=s-u;t=u-(s-l)+(r-l);r=t-w;l=t-r;G[1]=t-(r+l)+(l-w);C=s+r;l=C-s;G[2]=s-(C-l)+(r-l);G[3]=C;let O=B(4,G),P=E*g;if(O>=P||-O>=P){return O}l=a-D;h=a-(D+l)+(l-e);l=c-L;j=c-(L+l)+(l-e);l=b-M;i=b-(M+l)+(l-f);l=d-N;k=d-(N+l)+(l-f);if(h===0&&i===0&&j===0&&k===0){return O}P=F*g+z*Math.abs(O);O+=D*k+N*h-(M*j+L*i);if(O>=P||-O>=P)return O;u=h*N;m=y*h;n=m-(m-h);o=h-n;m=y*N;p=m-(m-N);q=N-p;v=o*q-(u-n*p-o*p-n*q);w=i*L;m=y*i;n=m-(m-i);o=i-n;m=y*L;p=m-(m-L);q=L-p;x=o*q-(w-n*p-o*p-n*q);r=v-x;l=v-r;K[0]=v-(r+l)+(l-x);s=u+r;l=s-u;t=u-(s-l)+(r-l);r=t-w;l=t-r;K[1]=t-(r+l)+(l-w);C=s+r;l=C-s;K[2]=s-(C-l)+(r-l);K[3]=C;let Q=A(4,G,4,K,H);u=D*k;m=y*D;n=m-(m-D);o=D-n;m=y*k;p=m-(m-k);q=k-p;v=o*q-(u-n*p-o*p-n*q);w=M*j;m=y*M;n=m-(m-M);o=M-n;m=y*j;p=m-(m-j);q=j-p;x=o*q-(w-n*p-o*p-n*q);r=v-x;l=v-r;K[0]=v-(r+l)+(l-x);s=u+r;l=s-u;t=u-(s-l)+(r-l);r=t-w;l=t-r;K[1]=t-(r+l)+(l-w);C=s+r;l=C-s;K[2]=s-(C-l)+(r-l);K[3]=C;let R=A(Q,H,4,K,I);u=h*k;m=y*h;n=m-(m-h);o=h-n;m=y*k;p=m-(m-k);q=k-p;v=o*q-(u-n*p-o*p-n*q);w=i*j;m=y*i;n=m-(m-i);o=i-n;m=y*j;p=m-(m-j);q=j-p;x=o*q-(w-n*p-o*p-n*q);r=v-x;l=v-r;K[0]=v-(r+l)+(l-x);s=u+r;l=s-u;t=u-(s-l)+(r-l);r=t-w;l=t-r;K[1]=t-(r+l)+(l-w);C=s+r;l=C-s;K[2]=s-(C-l)+(r-l);K[3]=C;let S=A(R,I,4,K,J);return J[S-1]}function M(a,b,c,d,e,f){let g=(b-f)*(c-e),h=(a-e)*(d-f),i=g-h;if(g===0||h===0||g>0!==h>0)return i;let j=Math.abs(g+h);if(Math.abs(i)>=D*j)return i;return-L(a,b,c,d,e,f,j)}let N=Math.PI*3/2,O=Math.PI/2;function P(a,b,c){let d=c.p1,e=c.p2,f=Q(a,b,d),g=Q(a,b,e),h=Q(d,e,a),i=Q(d,e,b);if(f!==g&&h!==i)return !0;if(f===0&&R(a,d,b))return !0;if(g===0&&R(a,e,b))return !0;if(h===0&&R(d,a,e))return !0;if(i===0&&R(d,b,e))return !0;return !1}function Q(a,b,c){let d=M(c.x,c.y,b.x,b.y,a.x,a.y);if(d>0)return 1;if(d<0)return-1;return 0}function R(a,b,c){if(b.x<=Math.max(a.x,c.x)&&b.x>=Math.min(a.x,c.x)){if(b.y<=Math.max(a.y,c.y)&&b.y>=Math.min(a.y,c.y))return !0}return !1}function S(a,b,c){let d=Math.pow((c.x-b.x),2)+Math.pow((c.y-b.y),2),e=Math.pow((c.x-a.x),2)+Math.pow((c.y-a.y),2),f=Math.pow((b.x-a.x),2)+Math.pow((b.y-a.y),2);return Math.acos((d+f-e)/(2*Math.sqrt(d)*Math.sqrt(f)))}function T(a,b,c){let d=U(a,b,c);return d!==null?V(a,d):0}function U(a,b,c){if(c.containsPoint(a))return a;if(c.containsPoint(b))return b;if(c.p1.x===c.p2.x){if(a.x===b.x)return null;let d=(a.y-b.y)/(a.x-b.x),e=c.p1.x,f=d*(e-a.x)+a.y;return new w([e,f],-1)}if(a.x===b.x){let b=(c.p1.y-c.p2.y)/(c.p1.x-c.p2.x),d=a.x,e=b*(d-c.p1.x)+c.p1.y;return new w([d,e],-1)}let d=(a.y-b.y)/(a.x-b.x),e=(c.p1.y-c.p2.y)/(c.p1.x-c.p2.x);if(d===e)return null;let f=(e*c.p1.x-d*a.x+a.y-c.p1.y)/(e-d),g=e*(f-c.p1.x)+c.p1.y;return new w([f,g],-1)}function V(a,b){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))}class W{constructor(a,b,c){this.p1=a;this.p2=b;this.edge=c}isLessThanOtherEdgeKey(a){if(this.matchesOtherKey(a))return !1;if(!P(this.p1,this.p2,a.edge))return !0;let b=T(this.p1,this.p2,this.edge),c=T(this.p1,this.p2,a.edge);if(b>c)return !1;if(b<c)return !0;if(b===c){let b=null;a.edge.containsPoint(this.edge.p1)?(b=this.edge.p1):(b=this.edge.p2);let c=S(this.p1,this.p2,this.edge.getOtherPointInEdge(b)),d=S(this.p1,this.p2,a.edge.getOtherPointInEdge(b));if(c<d)return !0;return !1}}matchesOtherKey(a){return this.edge.areEdgesEqual(a.edge)}}let X=0,Y=1;function Z(a){$(a)}function _(a,b){aa(b,a._points.length,X,a)}function $(a){let b=a._points,c=b.length,d=Y;for(var e=0;e<c;e++){let f=b[e];aa(f,c,d,a)}}function aa(a,b,c,d){let e=d._clonedPoints,f=d._edges,g=d._polygons,h=d.graph,i=a.prevPoint,j=a.nextPoint;ab(a,e);let k=new u(),l=new w([Infinity,a.y],-1);for(let c=0;c<b;c++){let d=f[c];if(d.containsPoint(a))continue;if(P(a,l,d)){if(R(a,d.p1,l)||R(a,d.p2,l))continue;k.addKey(new W(a,l,d))}}let m=[],n=null,o=null;for(let d=0;d<b;d++){let f=e[d];if(f.isPointEqual(a))continue;if(c===Y&&a.angleToPoint(f)>Math.PI){break}if(k.keys.length>0){for(let b=0;b<f.edges.length;b++){let c=f.edges[b];if(Q(a,f,c.getOtherPointInEdge(f))===-1){let b=new W(a,f,c),d=k.findKeyPosition(b)-1;d!==-1&&k.keys[d].matchesOtherKey(b)&&k.keys.splice(d,1)}}}let h=!1;if(n===null||Q(a,n,f)!==0||!R(a,n,f))k.keys.length===0?(h=!0):P(a,f,k.keys[0].edge)||(h=!0);else if(!o)h=!1;else{h=!0;for(let a=0;a<k.keys.length;a++){let b=k.keys[a];if(!b.edge.containsPoint(n)&&P(n,f,b.edge)){h=!1;break}}h&&ac(n,f,g)&&(h=!1)};let l=f.isPointEqual(i)||f.isPointEqual(j);h&&!l&&(h=!ac(a,f,g));h&&m.push(f);for(let b=0;b<f.edges.length;b++){let c=f.edges[b];if(!c.containsPoint(a)&&Q(a,f,c.getOtherPointInEdge(f))===1){let b=new W(a,f,c);k.addKey(b)}}n=f;o=h}let p=a.nodeId;h.addNode(p,{x:a.x,y:a.y});for(var q=0;q<m.length;q++){let a=m[q].nodeId;h.addNode(a,{x:m[q].x,y:m[q].y});h.addLink(p,a)}}function ab(a,b){b.sort((b,c)=>{let d=a.angleToPoint(b),e=a.angleToPoint(c);if(d<e)return-1;if(d>e)return 1;let f=V(a,b),g=V(a,c);if(f<g)return-1;if(f>g)return 1;return 0})}function ac(a,b,c){if(a.polygonID!==b.polygonID)return !1;if(a.polygonID===-1||b.polygonID===-1)return !1;let d=new w([(a.x+b.x)/2,(a.y+b.y)/2],-1);return ad(d,c[a.polygonID].rings)}function ad(a,b){let c=new w([Infinity,a.y],-1),d=0;for(let e=0;e<b.length;e++){for(let f=0;f<b[e].length;f++){let g=b[e][f],h=g.p1.y==a.y&&g.p1.x>a.x,i=g.p2.y==a.y&&g.p2.x>a.x;h&&g.p2.y<a.y||i&&g.p1.y<a.y?d++:!h&&!i&&P(a,c,g)&&d++}}if(d%2===0)return !1;return !0}class ae{constructor(){this.bbox=[Infinity,Infinity,-Infinity,-Infinity];this.rings=[]}}class af{constructor(a,b){this.p1=a;this.p2=b;a.edges.push(this);b.edges.push(this)}getOtherPointInEdge(a){return this.p1.isPointEqual(a)?this.p2:this.p1}areEdgesEqual(a){if(this.p1.isPointEqual(a.p1)&&this.p2.isPointEqual(a.p2))return !0;if(this.p1.isPointEqual(a.p2)&&this.p2.isPointEqual(a.p1))return !0;return !1}containsPoint(a){return this.p1.isPointEqual(a)||this.p2.isPointEqual(a)}}function ag(a,b){let c=b.type==='Feature'?b.geometry:b,d=c.coordinates;c.type==='Polygon'&&(d=[d]);for(let b=0;b<d.length;b++){let c=new ae(),e=c.rings,f=c.bbox;a._polygons.push(c);for(let c=0;c<d[b].length;c++){let g=[];e.push(g);let h=new w(d[b][c][0],b),i=new w(d[b][c][1],b);ai(h,f);ai(i,f);h.nextPoint=i;let j=new w(d[b][c][2],b);aj(h,i,j);a._points.push(h);let k=new af(h,i);a._edges.push(k);g.push(k);let l=h;h=i;i=j;for(let e=2;e<d[b][c].length-2;e++){a._points.push(h);j=new w(d[b][c][e+1],b);ai(j,f);aj(h,i,j);let l=new af(h,i);a._edges.push(l);g.push(l);h=i;i=j;k=l}aj(h,i,l);let m=new af(k.p2,i);a._edges.push(m);g.push(m);let n=new af(i,l);aj(i,l,l.nextPoint);a._edges.push(n);g.push(n);a._points.push(h);a._points.push(j)}}a._clonedPoints=ah(a._points)}function ah(a){return a.slice(0)}function ai(a,b){b[0]=Math.min(b[0],a.x);b[1]=Math.min(b[1],a.y);b[2]=Math.max(b[2],a.x);b[3]=Math.max(b[3],a.y)}function aj(a,b,c){b.prevPoint=a;b.nextPoint=c}class ak{constructor(){this.graph=null;this._points=[];this._clonedPoints=[];this._edges=[];this._polygons=[];this._lastOrigin=null;this._lastDestination=null}createGraphFromGeoJson(a){ag(this,a);this.graph=j();Z(this,a)}getdNodeIdByLatLon(a){for(var b=0;b<this._points.length;b++){if(this._points[b].x===a[0]&&this._points[b].y===a[1])return this._points[b].nodeId}return null}loadGraphFromJson(a,b){ag(a,this);this.graph=b}saveGraphToJson(){}shortestPath(a,b){this._lastOrigin!==null&&(this.graph.removeNode(this._lastOrigin.nodeId),this.graph.removeNode(this._lastDestination.nodeId));this._lastOrigin=new w(a.geometry.coordinates,-1);this._lastDestination=new w(b.geometry.coordinates,-1);_(this,this._lastOrigin);_(this,this._lastDestination);return[this._lastOrigin,this._lastDestination]}}return ak})
