(()=>{var Gc="170";var qu=0,Ol=1,Yu=2;var cu=1,Wc=2,Hn=3,Pn=0,tn=1,Dt=2,ai=0,os=1,Fl=2,Bl=3,zl=4,Zu=5,Ci=100,$u=101,Ku=102,Ju=103,ju=104,Qu=200,ed=201,td=202,nd=203,Ma=204,ba=205,id=206,sd=207,rd=208,od=209,ad=210,cd=211,ld=212,hd=213,ud=214,Sa=0,wa=1,Aa=2,hs=3,Ta=4,Ea=5,Ra=6,Ca=7,lu=0,dd=1,fd=2,wn=0,pd=1,md=2,gd=3,Po=4,_d=5,xd=6,yd=7,kl="attached",vd="detached",hu=300,us=301,ds=302,Ia=303,Pa=304,Lo=306,Li=1e3,Gn=1001,Gs=1002,$t=1003,Xc=1004;var is=1005;var en=1006,Os=1007;var In=1008;var qn=1009,uu=1010,du=1011,Ws=1012,qc=1013,Di=1014,Sn=1015,or=1016,Yc=1017,Zc=1018,fs=1020,fu=35902,pu=1021,mu=1022,ln=1023,gu=1024,_u=1025,as=1026,ps=1027,$c=1028,Kc=1029,xu=1030,Jc=1031;var jc=1033,qr=33776,Yr=33777,Zr=33778,$r=33779,La=35840,Da=35841,Na=35842,Ua=35843,Oa=36196,Fa=37492,Ba=37496,za=37808,ka=37809,Ha=37810,Va=37811,Ga=37812,Wa=37813,Xa=37814,qa=37815,Ya=37816,Za=37817,$a=37818,Ka=37819,Ja=37820,ja=37821,Kr=36492,Qa=36494,ec=36495,yu=36283,tc=36284,nc=36285,ic=36286;var ms=2300,gs=2301,ko=2302,Hl=2400,Vl=2401,Gl=2402,Md=2500;var vu=0,Do=1,ar=2,bd=3200,Sd=3201;var Mu=0,wd=1,ri="",Et="srgb",Kt="srgb-linear",No="linear",wt="srgb";var Vi=7680;var Wl=519,Ad=512,Td=513,Ed=514,bu=515,Rd=516,Cd=517,Id=518,Pd=519,sc=35044;var Xl="300 es",Wn=2e3,Jr=2001,ci=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ql=1234567,Fs=Math.PI/180,_s=180/Math.PI;function hn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]).toLowerCase()}function Ht(i,e,t){return Math.max(e,Math.min(t,i))}function Qc(i,e){return(i%e+e)%e}function Ld(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Dd(i,e,t){return i!==e?(t-i)/(e-i):0}function Bs(i,e,t){return(1-t)*i+t*e}function Nd(i,e,t,n){return Bs(i,e,1-Math.exp(-t*n))}function Ud(i,e=1){return e-Math.abs(Qc(i,e*2)-e)}function Od(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Bd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function zd(i,e){return i+Math.random()*(e-i)}function kd(i){return i*(.5-Math.random())}function Hd(i){i!==void 0&&(ql=i);let e=ql+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vd(i){return i*Fs}function Gd(i){return i*_s}function Wd(i){return(i&i-1)===0&&i!==0}function Xd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yd(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var cr={DEG2RAD:Fs,RAD2DEG:_s,generateUUID:hn,clamp:Ht,euclideanModulo:Qc,mapLinear:Ld,inverseLerp:Dd,lerp:Bs,damp:Nd,pingpong:Ud,smoothstep:Od,smootherstep:Fd,randInt:Bd,randFloat:zd,randFloatSpread:kd,seededRandom:Hd,degToRad:Vd,radToDeg:Gd,isPowerOfTwo:Wd,ceilPowerOfTwo:Xd,floorPowerOfTwo:qd,setQuaternionFromProperEuler:Yd,normalize:bt,denormalize:bn},we=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Je=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],y=s[0],m=s[3],p=s[6],M=s[1],b=s[4],_=s[7],N=s[2],T=s[5],E=s[8];return r[0]=o*y+a*M+c*N,r[3]=o*m+a*b+c*T,r[6]=o*p+a*_+c*E,r[1]=l*y+h*M+u*N,r[4]=l*m+h*b+u*T,r[7]=l*p+h*_+u*E,r[2]=d*y+f*M+g*N,r[5]=d*m+f*b+g*T,r[8]=d*p+f*_+g*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=u*y,e[1]=(s*l-h*n)*y,e[2]=(a*n-s*o)*y,e[3]=d*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=f*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ho.makeScale(e,t)),this}rotate(e){return this.premultiply(Ho.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ho.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ho=new Je;function Su(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zd(){let i=Xs("canvas");return i.style.display="block",i}var Yl={};function Ns(i){i in Yl||(Yl[i]=!0,console.warn(i))}function $d(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Kd(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Jd(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var ot={enabled:!0,workingColorSpace:Kt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===wt&&(i.r=Xn(i.r),i.g=Xn(i.g),i.b=Xn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===wt&&(i.r=cs(i.r),i.g=cs(i.g),i.b=cs(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ri?No:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Xn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function cs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Zl=[.64,.33,.3,.6,.15,.06],$l=[.2126,.7152,.0722],Kl=[.3127,.329],Jl=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ot.define({[Kt]:{primaries:Zl,whitePoint:Kl,transfer:No,toXYZ:Jl,fromXYZ:jl,luminanceCoefficients:$l,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:Zl,whitePoint:Kl,transfer:wt,toXYZ:Jl,fromXYZ:jl,luminanceCoefficients:$l,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}});var Gi,rc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gi===void 0&&(Gi=Xs("canvas")),Gi.width=e.width,Gi.height=e.height;let n=Gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Xs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Xn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xn(t[n]/255)*255):t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},jd=0,jr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=hn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Vo(s[o].image)):r.push(Vo(s[o]))}else r=Vo(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Vo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Qd=0,Xt=class i extends ci{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Gn,s=Gn,r=en,o=In,a=ln,c=qn,l=i.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=hn(),this.name="",this.source=new jr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Li:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case Gs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Li:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case Gs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=hu;Xt.DEFAULT_ANISOTROPY=1;var dt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,_=(f+1)/2,N=(p+1)/2,T=(h+d)/4,E=(u+y)/4,C=(g+m)/4;return b>_&&b>N?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=E/n):_>N?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=C/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=E/r,s=C/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-y)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},oc=class extends ci{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Xt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new jr(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends oc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Qr=class extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ac=class extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=y;return}if(u!==y||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*y,M=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){let N=Math.sqrt(b),T=Math.atan2(N,p*M);m=Math.sin(m*T)/N,a=Math.sin(a*T)/N}let _=a*M;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+y*_,m===1-a){let N=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=N,l*=N,h*=N,u*=N}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Go.copy(this).projectOnVector(e),this.sub(Go)}reflect(e){return this.sub(Go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Go=new I,Ql=new Qt,un=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(r,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(e.matrixWorld),this.union(gr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),_r.subVectors(this.max,Ts),Wi.subVectors(e.a,Ts),Xi.subVectors(e.b,Ts),qi.subVectors(e.c,Ts),Qn.subVectors(Xi,Wi),ei.subVectors(qi,Xi),bi.subVectors(Wi,qi);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-bi.z,bi.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,bi.z,0,-bi.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-bi.y,bi.x,0];return!Wo(t,Wi,Xi,qi,_r)||(t=[1,0,0,0,1,0,0,0,1],!Wo(t,Wi,Xi,qi,_r))?!1:(xr.crossVectors(Qn,ei),t=[xr.x,xr.y,xr.z],Wo(t,Wi,Xi,qi,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Un=[new I,new I,new I,new I,new I,new I,new I,new I],yn=new I,gr=new un,Wi=new I,Xi=new I,qi=new I,Qn=new I,ei=new I,bi=new I,Ts=new I,_r=new I,xr=new I,Si=new I;function Wo(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Si.fromArray(i,r);let a=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),c=e.dot(Si),l=t.dot(Si),h=n.dot(Si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var ef=new un,Es=new I,Xo=new I,rn=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ef.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Es.subVectors(e,this.center);let t=Es.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Es.copy(e.center).add(Xo)),this.expandByPoint(Es.copy(e.center).sub(Xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},On=new I,qo=new I,yr=new I,ti=new I,Yo=new I,vr=new I,Zo=new I,Ni=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){qo.copy(e).add(t).multiplyScalar(.5),yr.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(qo);let r=e.distanceTo(t)*.5,o=-this.direction.dot(yr),a=ti.dot(this.direction),c=-ti.dot(yr),l=ti.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(qo).addScaledVector(yr,d),f}intersectSphere(e,t){On.subVectors(e.center,this.origin);let n=On.dot(this.direction),s=On.dot(On)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,s,r){Yo.subVectors(t,e),vr.subVectors(n,e),Zo.crossVectors(Yo,vr);let o=this.direction.dot(Zo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,e);let c=a*this.direction.dot(vr.crossVectors(ti,vr));if(c<0)return null;let l=a*this.direction.dot(Yo.cross(ti));if(l<0||c+l>o)return null;let h=-a*ti.dot(Zo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xe=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,g,y,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,y,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Yi.setFromMatrixColumn(e,0).length(),r=1/Yi.setFromMatrixColumn(e,1).length(),o=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,y=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-y*l,t[9]=-a*c,t[2]=y-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,y=l*u;t[0]=d+y*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=y+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,y=l*u;t[0]=d-y*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=y-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,y=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+y,t[1]=c*u,t[5]=y*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,y=a*l;t[0]=c*h,t[4]=y-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-y*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,y=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+y,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tf,e,nf)}lookAt(e,t,n){let s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ni.crossVectors(n,nn),ni.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ni.crossVectors(n,nn)),ni.normalize(),Mr.crossVectors(nn,ni),s[0]=ni.x,s[4]=Mr.x,s[8]=nn.x,s[1]=ni.y,s[5]=Mr.y,s[9]=nn.y,s[2]=ni.z,s[6]=Mr.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],M=n[3],b=n[7],_=n[11],N=n[15],T=s[0],E=s[4],C=s[8],S=s[12],v=s[1],P=s[5],X=s[9],B=s[13],Z=s[2],ae=s[6],j=s[10],ce=s[14],L=s[3],ee=s[7],se=s[11],le=s[15];return r[0]=o*T+a*v+c*Z+l*L,r[4]=o*E+a*P+c*ae+l*ee,r[8]=o*C+a*X+c*j+l*se,r[12]=o*S+a*B+c*ce+l*le,r[1]=h*T+u*v+d*Z+f*L,r[5]=h*E+u*P+d*ae+f*ee,r[9]=h*C+u*X+d*j+f*se,r[13]=h*S+u*B+d*ce+f*le,r[2]=g*T+y*v+m*Z+p*L,r[6]=g*E+y*P+m*ae+p*ee,r[10]=g*C+y*X+m*j+p*se,r[14]=g*S+y*B+m*ce+p*le,r[3]=M*T+b*v+_*Z+N*L,r[7]=M*E+b*P+_*ae+N*ee,r[11]=M*C+b*X+_*j+N*se,r[15]=M*S+b*B+_*ce+N*le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+y*(+t*c*f-t*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],y=e[13],m=e[14],p=e[15],M=u*m*l-y*d*l+y*c*f-a*m*f-u*c*p+a*d*p,b=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*y*l-g*u*l+g*a*f-o*y*f-h*a*p+o*u*p,N=g*u*c-h*y*c-g*a*d+o*y*d+h*a*m-o*u*m,T=t*M+n*b+s*_+r*N;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/T;return e[0]=M*E,e[1]=(y*d*r-u*m*r-y*s*f+n*m*f+u*s*p-n*d*p)*E,e[2]=(a*m*r-y*c*r+y*s*l-n*m*l-a*s*p+n*c*p)*E,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*E,e[4]=b*E,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*E,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*E,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*f+t*c*f)*E,e[8]=_*E,e[9]=(g*u*r-h*y*r-g*n*f+t*y*f+h*n*p-t*u*p)*E,e[10]=(o*y*r-g*a*r+g*n*l-t*y*l-o*n*p+t*a*p)*E,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*E,e[12]=N*E,e[13]=(h*y*s-g*u*s+g*n*d-t*y*d-h*n*m+t*u*m)*E,e[14]=(g*a*s-o*y*s-g*n*c+t*y*c+o*n*m-t*a*m)*E,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*E,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,y=o*h,m=o*u,p=a*u,M=c*l,b=c*h,_=c*u,N=n.x,T=n.y,E=n.z;return s[0]=(1-(y+p))*N,s[1]=(f+_)*N,s[2]=(g-b)*N,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(d+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+b)*E,s[9]=(m-M)*E,s[10]=(1-(d+y))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Yi.set(s[0],s[1],s[2]).length(),o=Yi.set(s[4],s[5],s[6]).length(),a=Yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],vn.copy(this);let l=1/r,h=1/o,u=1/a;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,t.setFromRotationMatrix(vn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Wn){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),f,g;if(a===Wn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Jr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Wn){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*l,f=(n+s)*h,g,y;if(a===Wn)g=(o+r)*u,y=-2*u;else if(a===Jr)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yi=new I,vn=new Xe,tf=new I(0,0,0),nf=new I(1,1,1),ni=new I,Mr=new I,nn=new I,eh=new Xe,th=new Qt,Ln=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(eh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return th.setFromEuler(this),this.setFromQuaternion(th,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ln.DEFAULT_ORDER="XYZ";var qs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},sf=0,nh=new I,Zi=new Qt,Fn=new Xe,br=new I,Rs=new I,rf=new I,of=new Qt,ih=new I(1,0,0),sh=new I(0,1,0),rh=new I(0,0,1),oh={type:"added"},af={type:"removed"},$i={type:"childadded",child:null},$o={type:"childremoved",child:null},Pt=class i extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new Ln,n=new Qt,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new Je}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(ih,e)}rotateY(e){return this.rotateOnAxis(sh,e)}rotateZ(e){return this.rotateOnAxis(rh,e)}translateOnAxis(e,t){return nh.copy(e).applyQuaternion(this.quaternion),this.position.add(nh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ih,e)}translateY(e){return this.translateOnAxis(sh,e)}translateZ(e){return this.translateOnAxis(rh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?br.copy(e):br.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Rs,br,this.up):Fn.lookAt(br,Rs,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(oh),$i.child=e,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(af),$o.child=e,this.dispatchEvent($o),$o.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(oh),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,e,rf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Pt.DEFAULT_UP=new I(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Mn=new I,Bn=new I,Ko=new I,zn=new I,Ki=new I,Ji=new I,ah=new I,Jo=new I,jo=new I,Qo=new I,ea=new dt,ta=new dt,na=new dt,Ii=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Mn.subVectors(e,t),s.cross(Mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Mn.subVectors(s,t),Bn.subVectors(n,t),Ko.subVectors(e,t);let o=Mn.dot(Mn),a=Mn.dot(Bn),c=Mn.dot(Ko),l=Bn.dot(Bn),h=Bn.dot(Ko),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zn.x),c.addScaledVector(o,zn.y),c.addScaledVector(a,zn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return ea.setScalar(0),ta.setScalar(0),na.setScalar(0),ea.fromBufferAttribute(e,t),ta.fromBufferAttribute(e,n),na.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ea,r.x),o.addScaledVector(ta,r.y),o.addScaledVector(na,r.z),o}static isFrontFacing(e,t,n,s){return Mn.subVectors(n,t),Bn.subVectors(e,t),Mn.cross(Bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),Mn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Ki.subVectors(s,n),Ji.subVectors(r,n),Jo.subVectors(e,n);let c=Ki.dot(Jo),l=Ji.dot(Jo);if(c<=0&&l<=0)return t.copy(n);jo.subVectors(e,s);let h=Ki.dot(jo),u=Ji.dot(jo);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ki,o);Qo.subVectors(e,r);let f=Ki.dot(Qo),g=Ji.dot(Qo);if(g>=0&&f<=g)return t.copy(r);let y=f*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ji,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ah.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(ah,a);let p=1/(m+y+d);return o=y*p,a=d*p,t.copy(n).addScaledVector(Ki,o).addScaledVector(Ji,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function ia(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var We=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=Qc(e,1),t=Ht(t,0,1),n=Ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ia(o,r,e+1/3),this.g=ia(o,r,e),this.b=ia(o,r,e-1/3)}return ot.toWorkingColorSpace(this,s),this}setStyle(e,t=Et){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let n=wu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return ot.fromWorkingColorSpace(Zt.copy(this),e),Math.round(Ht(Zt.r*255,0,255))*65536+Math.round(Ht(Zt.g*255,0,255))*256+Math.round(Ht(Zt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.fromWorkingColorSpace(Zt.copy(this),t);let n=Zt.r,s=Zt.g,r=Zt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.fromWorkingColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Et){ot.fromWorkingColorSpace(Zt.copy(this),e);let t=Zt.r,n=Zt.g,s=Zt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(Sr);let n=Bs(ii.h,Sr.h,t),s=Bs(ii.s,Sr.s,t),r=Bs(ii.l,Sr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Zt=new We;We.NAMES=wu;var cf=0,on=class extends ci{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=hn(),this.name="",this.blending=os,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ma,this.blendDst=ba,this.blendEquation=Ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==os&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ba&&(n.blendDst=this.blendDst),this.blendEquation!==Ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ut=class extends on{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Nt=new I,wr=new we,Ft=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sc,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyMatrix3(e),this.setXY(t,wr.x,wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sc&&(e.usage=this.usage),e}};var eo=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var to=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var at=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}},lf=0,cn=new Xe,sa=new Pt,ji=new I,sn=new un,Cs=new un,kt=new I,_t=class i extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Su(e)?to:eo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,n){return cn.makeTranslation(e,t,n),this.applyMatrix4(cn),this}scale(e,t,n){return cn.makeScale(e,t,n),this.applyMatrix4(cn),this}lookAt(e){return sa.lookAt(e),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new at(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(sn.min,Cs.min),sn.expandByPoint(kt),kt.addVectors(sn.max,Cs.max),sn.expandByPoint(kt)):(sn.expandByPoint(Cs.min),sn.expandByPoint(Cs.max))}sn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(kt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)kt.fromBufferAttribute(a,l),c&&(ji.fromBufferAttribute(e,l),kt.add(ji)),s=Math.max(s,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new I,c[C]=new I;let l=new I,h=new I,u=new I,d=new we,f=new we,g=new we,y=new I,m=new I;function p(C,S,v){l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,v),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[C].add(y),a[S].add(y),a[v].add(y),c[C].add(m),c[S].add(m),c[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let C=0,S=M.length;C<S;++C){let v=M[C],P=v.start,X=v.count;for(let B=P,Z=P+X;B<Z;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let b=new I,_=new I,N=new I,T=new I;function E(C){N.fromBufferAttribute(s,C),T.copy(N);let S=a[C];b.copy(S),b.sub(N.multiplyScalar(N.dot(S))).normalize(),_.crossVectors(T,S);let P=_.dot(c[C])<0?-1:1;o.setXYZW(C,b.x,b.y,b.z,P)}for(let C=0,S=M.length;C<S;++C){let v=M[C],P=v.start,X=v.count;for(let B=P,Z=P+X;B<Z;B+=3)E(e.getX(B+0)),E(e.getX(B+1)),E(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ft(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ch=new Xe,wi=new Ni,Ar=new rn,lh=new I,Tr=new I,Er=new I,Rr=new I,ra=new I,Cr=new I,hh=new I,Ir=new I,gt=class extends Pt{constructor(e=new _t,t=new Ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Cr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(ra.fromBufferAttribute(u,e),o?Cr.addScaledVector(ra,h):Cr.addScaledVector(ra.sub(t),h))}t.add(Cr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),wi.copy(e.ray).recast(e.near),!(Ar.containsPoint(wi.origin)===!1&&(wi.intersectSphere(Ar,lh)===null||wi.origin.distanceToSquared(lh)>(e.far-e.near)**2))&&(ch.copy(r).invert(),wi.copy(e.ray).applyMatrix4(ch),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),b=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,N=b;_<N;_+=3){let T=a.getX(_),E=a.getX(_+1),C=a.getX(_+2);s=Pr(this,p,e,n,l,h,u,T,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let M=a.getX(m),b=a.getX(m+1),_=a.getX(m+2);s=Pr(this,o,e,n,l,h,u,M,b,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),b=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,N=b;_<N;_+=3){let T=_,E=_+1,C=_+2;s=Pr(this,p,e,n,l,h,u,T,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let M=m,b=m+1,_=m+2;s=Pr(this,o,e,n,l,h,u,M,b,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function hf(i,e,t,n,s,r,o,a){let c;if(e.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Pn,a),c===null)return null;Ir.copy(a),Ir.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ir);return l<t.near||l>t.far?null:{distance:l,point:Ir.clone(),object:i}}function Pr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Tr),i.getVertexPosition(c,Er),i.getVertexPosition(l,Rr);let h=hf(i,e,t,n,Tr,Er,Rr,hh);if(h){let u=new I;Ii.getBarycoord(hh,Tr,Er,Rr,u),s&&(h.uv=Ii.getInterpolatedAttribute(s,a,c,l,u,new we)),r&&(h.uv1=Ii.getInterpolatedAttribute(r,a,c,l,u,new we)),o&&(h.normal=Ii.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new I,materialIndex:0};Ii.getNormal(Tr,Er,Rr,d.normal),h.face=d,h.barycoord=u}return h}var An=class i extends _t{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(u,2));function g(y,m,p,M,b,_,N,T,E,C,S){let v=_/E,P=N/C,X=_/2,B=N/2,Z=T/2,ae=E+1,j=C+1,ce=0,L=0,ee=new I;for(let se=0;se<j;se++){let le=se*P-B;for(let Ze=0;Ze<ae;Ze++){let qe=Ze*v-X;ee[y]=qe*M,ee[m]=le*b,ee[p]=Z,l.push(ee.x,ee.y,ee.z),ee[y]=0,ee[m]=0,ee[p]=T>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Ze/E),u.push(1-se/C),ce+=1}}for(let se=0;se<C;se++)for(let le=0;le<E;le++){let Ze=d+le+ae*se,qe=d+le+ae*(se+1),ie=d+(le+1)+ae*(se+1),de=d+(le+1)+ae*se;c.push(Ze,qe,de),c.push(qe,ie,de),L+=6}a.addGroup(f,L,S),f+=L,d+=ce}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function xs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function jt(i){let e={};for(let t=0;t<i.length;t++){let n=xs(i[t]);for(let s in n)e[s]=n[s]}return e}function uf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Au(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var df={clone:xs,merge:jt},ff=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Dn=class extends on{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ff,this.fragmentShader=pf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xs(e.uniforms),this.uniformsGroups=uf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},no=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=Wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},si=new I,uh=new we,dh=new we,Wt=class extends no{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=_s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Fs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(Fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,uh,dh),t.subVectors(dh,uh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Fs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Qi=-90,es=1,cc=class extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Wt(Qi,es,e,t);s.layers=this.layers,this.add(s);let r=new Wt(Qi,es,e,t);r.layers=this.layers,this.add(r);let o=new Wt(Qi,es,e,t);o.layers=this.layers,this.add(o);let a=new Wt(Qi,es,e,t);a.layers=this.layers,this.add(a);let c=new Wt(Qi,es,e,t);c.layers=this.layers,this.add(c);let l=new Wt(Qi,es,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},io=class extends Xt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:us,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},lc=class extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new io(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new An(5,5,5),r=new Dn({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:ai});r.uniforms.tEquirect.value=t;let o=new gt(s,r),a=t.minFilter;return t.minFilter===In&&(t.minFilter=en),new cc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},oa=new I,mf=new I,gf=new Je,Vn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=oa.subVectors(n,t).cross(mf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(oa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||gf.getNormalMatrix(e),s=this.coplanarPoint(oa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ai=new rn,Lr=new I,Ys=class{constructor(e=new Vn,t=new Vn,n=new Vn,s=new Vn,r=new Vn,o=new Vn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Wn){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],y=s[10],m=s[11],p=s[12],M=s[13],b=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+o,d+h,m+g,_+M).normalize(),n[3].setComponents(c-o,d-h,m-g,_-M).normalize(),n[4].setComponents(c-a,d-u,m-y,_-b).normalize(),t===Wn)n[5].setComponents(c+a,d+u,m+y,_+b).normalize();else if(t===Jr)n[5].setComponents(a,u,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Lr.x=s.normal.x>0?e.max.x:e.min.x,Lr.y=s.normal.y>0?e.max.y:e.min.y,Lr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Tu(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function _f(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],y=u[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let y=u[f];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Tn=class i extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){let M=p*d-o;for(let b=0;b<l;b++){let _=b*u-r;g.push(_,-M,0),y.push(0,0,1),m.push(b/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let b=M+l*p,_=M+l*(p+1),N=M+1+l*(p+1),T=M+1+l*p;f.push(b,_,T),f.push(_,N,T)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},xf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Af=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,If=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Pf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Lf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,np=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ip=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ap=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,up=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_p=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ep=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Op=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,em=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,nm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,im=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,om=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,am=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,um=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Am=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Tm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Im=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Om=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,km=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ym=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$m=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:xf,alphahash_pars_fragment:yf,alphamap_fragment:vf,alphamap_pars_fragment:Mf,alphatest_fragment:bf,alphatest_pars_fragment:Sf,aomap_fragment:wf,aomap_pars_fragment:Af,batching_pars_vertex:Tf,batching_vertex:Ef,begin_vertex:Rf,beginnormal_vertex:Cf,bsdfs:If,iridescence_fragment:Pf,bumpmap_pars_fragment:Lf,clipping_planes_fragment:Df,clipping_planes_pars_fragment:Nf,clipping_planes_pars_vertex:Uf,clipping_planes_vertex:Of,color_fragment:Ff,color_pars_fragment:Bf,color_pars_vertex:zf,color_vertex:kf,common:Hf,cube_uv_reflection_fragment:Vf,defaultnormal_vertex:Gf,displacementmap_pars_vertex:Wf,displacementmap_vertex:Xf,emissivemap_fragment:qf,emissivemap_pars_fragment:Yf,colorspace_fragment:Zf,colorspace_pars_fragment:$f,envmap_fragment:Kf,envmap_common_pars_fragment:Jf,envmap_pars_fragment:jf,envmap_pars_vertex:Qf,envmap_physical_pars_fragment:hp,envmap_vertex:ep,fog_vertex:tp,fog_pars_vertex:np,fog_fragment:ip,fog_pars_fragment:sp,gradientmap_pars_fragment:rp,lightmap_pars_fragment:op,lights_lambert_fragment:ap,lights_lambert_pars_fragment:cp,lights_pars_begin:lp,lights_toon_fragment:up,lights_toon_pars_fragment:dp,lights_phong_fragment:fp,lights_phong_pars_fragment:pp,lights_physical_fragment:mp,lights_physical_pars_fragment:gp,lights_fragment_begin:_p,lights_fragment_maps:xp,lights_fragment_end:yp,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:Mp,logdepthbuf_pars_vertex:bp,logdepthbuf_vertex:Sp,map_fragment:wp,map_pars_fragment:Ap,map_particle_fragment:Tp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Rp,metalnessmap_pars_fragment:Cp,morphinstance_vertex:Ip,morphcolor_vertex:Pp,morphnormal_vertex:Lp,morphtarget_pars_vertex:Dp,morphtarget_vertex:Np,normal_fragment_begin:Up,normal_fragment_maps:Op,normal_pars_fragment:Fp,normal_pars_vertex:Bp,normal_vertex:zp,normalmap_pars_fragment:kp,clearcoat_normal_fragment_begin:Hp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:Gp,iridescence_pars_fragment:Wp,opaque_fragment:Xp,packing:qp,premultiplied_alpha_fragment:Yp,project_vertex:Zp,dithering_fragment:$p,dithering_pars_fragment:Kp,roughnessmap_fragment:Jp,roughnessmap_pars_fragment:jp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:em,shadowmap_vertex:tm,shadowmask_pars_fragment:nm,skinbase_vertex:im,skinning_pars_vertex:sm,skinning_vertex:rm,skinnormal_vertex:om,specularmap_fragment:am,specularmap_pars_fragment:cm,tonemapping_fragment:lm,tonemapping_pars_fragment:hm,transmission_fragment:um,transmission_pars_fragment:dm,uv_pars_fragment:fm,uv_pars_vertex:pm,uv_vertex:mm,worldpos_vertex:gm,background_vert:_m,background_frag:xm,backgroundCube_vert:ym,backgroundCube_frag:vm,cube_vert:Mm,cube_frag:bm,depth_vert:Sm,depth_frag:wm,distanceRGBA_vert:Am,distanceRGBA_frag:Tm,equirect_vert:Em,equirect_frag:Rm,linedashed_vert:Cm,linedashed_frag:Im,meshbasic_vert:Pm,meshbasic_frag:Lm,meshlambert_vert:Dm,meshlambert_frag:Nm,meshmatcap_vert:Um,meshmatcap_frag:Om,meshnormal_vert:Fm,meshnormal_frag:Bm,meshphong_vert:zm,meshphong_frag:km,meshphysical_vert:Hm,meshphysical_frag:Vm,meshtoon_vert:Gm,meshtoon_frag:Wm,points_vert:Xm,points_frag:qm,shadow_vert:Ym,shadow_frag:Zm,sprite_vert:$m,sprite_frag:Km},ye={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},Cn={basic:{uniforms:jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new We(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:jt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:jt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new We(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:jt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:jt([ye.points,ye.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:jt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:jt([ye.common,ye.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:jt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:jt([ye.sprite,ye.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:jt([ye.common,ye.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:jt([ye.lights,ye.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Cn.physical={uniforms:jt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var Dr={r:0,b:0,g:0},Ti=new Ln,Jm=new Xe;function jm(i,e,t,n,s,r,o){let a=new We(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(M){let b=M.isScene===!0?M.background:null;return b&&b.isTexture&&(b=(M.backgroundBlurriness>0?t:e).get(b)),b}function y(M){let b=!1,_=g(M);_===null?p(a,c):_&&_.isColor&&(p(_,1),b=!0);let N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,b){let _=g(b);_&&(_.isCubeTexture||_.mapping===Lo)?(h===void 0&&(h=new gt(new An(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:xs(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ti.copy(b.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jm.makeRotationFromEuler(Ti)),h.material.toneMapped=ot.getTransfer(_.colorSpace)!==wt,(u!==_||d!==_.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new gt(new Tn(2,2),new Dn({name:"BackgroundMaterial",uniforms:xs(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=ot.getTransfer(_.colorSpace)!==wt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,b){M.getRGB(Dr,Au(i)),n.buffers.color.setClear(Dr.r,Dr.g,Dr.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),c=b,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:y,addToRenderList:m}}function Qm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(v,P,X,B,Z){let ae=!1,j=u(B,X,P);r!==j&&(r=j,l(r.object)),ae=f(v,B,X,Z),ae&&g(v,B,X,Z),Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(ae||o)&&(o=!1,_(v,P,X,B),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,P,X){let B=X.wireframe===!0,Z=n[v.id];Z===void 0&&(Z={},n[v.id]=Z);let ae=Z[P.id];ae===void 0&&(ae={},Z[P.id]=ae);let j=ae[B];return j===void 0&&(j=d(c()),ae[B]=j),j}function d(v){let P=[],X=[],B=[];for(let Z=0;Z<t;Z++)P[Z]=0,X[Z]=0,B[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:X,attributeDivisors:B,object:v,attributes:{},index:null}}function f(v,P,X,B){let Z=r.attributes,ae=P.attributes,j=0,ce=X.getAttributes();for(let L in ce)if(ce[L].location>=0){let se=Z[L],le=ae[L];if(le===void 0&&(L==="instanceMatrix"&&v.instanceMatrix&&(le=v.instanceMatrix),L==="instanceColor"&&v.instanceColor&&(le=v.instanceColor)),se===void 0||se.attribute!==le||le&&se.data!==le.data)return!0;j++}return r.attributesNum!==j||r.index!==B}function g(v,P,X,B){let Z={},ae=P.attributes,j=0,ce=X.getAttributes();for(let L in ce)if(ce[L].location>=0){let se=ae[L];se===void 0&&(L==="instanceMatrix"&&v.instanceMatrix&&(se=v.instanceMatrix),L==="instanceColor"&&v.instanceColor&&(se=v.instanceColor));let le={};le.attribute=se,se&&se.data&&(le.data=se.data),Z[L]=le,j++}r.attributes=Z,r.attributesNum=j,r.index=B}function y(){let v=r.newAttributes;for(let P=0,X=v.length;P<X;P++)v[P]=0}function m(v){p(v,0)}function p(v,P){let X=r.newAttributes,B=r.enabledAttributes,Z=r.attributeDivisors;X[v]=1,B[v]===0&&(i.enableVertexAttribArray(v),B[v]=1),Z[v]!==P&&(i.vertexAttribDivisor(v,P),Z[v]=P)}function M(){let v=r.newAttributes,P=r.enabledAttributes;for(let X=0,B=P.length;X<B;X++)P[X]!==v[X]&&(i.disableVertexAttribArray(X),P[X]=0)}function b(v,P,X,B,Z,ae,j){j===!0?i.vertexAttribIPointer(v,P,X,Z,ae):i.vertexAttribPointer(v,P,X,B,Z,ae)}function _(v,P,X,B){y();let Z=B.attributes,ae=X.getAttributes(),j=P.defaultAttributeValues;for(let ce in ae){let L=ae[ce];if(L.location>=0){let ee=Z[ce];if(ee===void 0&&(ce==="instanceMatrix"&&v.instanceMatrix&&(ee=v.instanceMatrix),ce==="instanceColor"&&v.instanceColor&&(ee=v.instanceColor)),ee!==void 0){let se=ee.normalized,le=ee.itemSize,Ze=e.get(ee);if(Ze===void 0)continue;let qe=Ze.buffer,ie=Ze.type,de=Ze.bytesPerElement,Ie=ie===i.INT||ie===i.UNSIGNED_INT||ee.gpuType===qc;if(ee.isInterleavedBufferAttribute){let _e=ee.data,Oe=_e.stride,Ae=ee.offset;if(_e.isInstancedInterleavedBuffer){for(let Re=0;Re<L.locationSize;Re++)p(L.location+Re,_e.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Re=0;Re<L.locationSize;Re++)m(L.location+Re);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let Re=0;Re<L.locationSize;Re++)b(L.location+Re,le/L.locationSize,ie,se,Oe*de,(Ae+le/L.locationSize*Re)*de,Ie)}else{if(ee.isInstancedBufferAttribute){for(let _e=0;_e<L.locationSize;_e++)p(L.location+_e,ee.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let _e=0;_e<L.locationSize;_e++)m(L.location+_e);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let _e=0;_e<L.locationSize;_e++)b(L.location+_e,le/L.locationSize,ie,se,le*de,le/L.locationSize*_e*de,Ie)}}else if(j!==void 0){let se=j[ce];if(se!==void 0)switch(se.length){case 2:i.vertexAttrib2fv(L.location,se);break;case 3:i.vertexAttrib3fv(L.location,se);break;case 4:i.vertexAttrib4fv(L.location,se);break;default:i.vertexAttrib1fv(L.location,se)}}}}M()}function N(){C();for(let v in n){let P=n[v];for(let X in P){let B=P[X];for(let Z in B)h(B[Z].object),delete B[Z];delete P[X]}delete n[v]}}function T(v){if(n[v.id]===void 0)return;let P=n[v.id];for(let X in P){let B=P[X];for(let Z in B)h(B[Z].object),delete B[Z];delete P[X]}delete n[v.id]}function E(v){for(let P in n){let X=n[P];if(X[v.id]===void 0)continue;let B=X[v.id];for(let Z in B)h(B[Z].object),delete B[Z];delete X[v.id]}}function C(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:N,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:y,enableAttribute:m,disableUnusedAttributes:M}}function eg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*d[y];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function tg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==ln&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let C=E===or&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==qn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Sn&&!C)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:N,maxSamples:T}}function ng(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Vn,a=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let M=r?0:n,b=M*4,_=p.clippingState||null;c.value=_,_=h(g,d,b,f);for(let N=0;N!==b;++N)_[N]=t[N];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=f+y*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,_=f;b!==y;++b,_+=4)o.copy(u[b]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function ig(i){let e=new WeakMap;function t(o,a){return a===Ia?o.mapping=us:a===Pa&&(o.mapping=ds),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ia||a===Pa)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new lc(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var li=class extends no{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ss=4,fh=[.125,.215,.35,.446,.526,.582],Pi=20,aa=new li,ph=new We,ca=null,la=0,ha=0,ua=!1,Ri=(1+Math.sqrt(5))/2,ts=1/Ri,mh=[new I(-Ri,ts,0),new I(Ri,ts,0),new I(-ts,0,Ri),new I(ts,0,Ri),new I(0,Ri,-ts),new I(0,Ri,ts),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],so=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ca,la,ha),this._renderer.xr.enabled=ua,e.scissorTest=!1,Nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:or,format:ln,colorSpace:Kt,depthBuffer:!1},s=gh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gh(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sg(r)),this._blurMaterial=rg(r,e,t)}return s}_compileMaterial(e){let t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,aa)}_sceneToCubeUV(e,t,n,s){let a=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ph),h.toneMapping=wn,h.autoClear=!1;let f=new Ut({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new gt(new An,f),y=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,y=!0):(f.color.copy(ph),y=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let b=this._cubeSize;Nr(s,M*b,p>2?b:0,b,b),h.setRenderTarget(s),y&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===us||e.mapping===ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_h());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new gt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Nr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,aa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=mh[(s-r-1)%mh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new gt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Pi-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):Pi;m>Pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pi}`);let p=[],M=0;for(let E=0;E<Pi;++E){let C=E/y,S=Math.exp(-C*C/2);p.push(S),E===0?M+=S:E<m&&(M+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;let _=this._sizeLods[s],N=3*_*(s>b-ss?s-b+ss:0),T=4*(this._cubeSize-_);Nr(t,N,T,3*_,2*_),c.setRenderTarget(t),c.render(u,aa)}};function sg(i){let e=[],t=[],n=[],s=i,r=i-ss+1+fh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-ss?c=fh[o-i+ss-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,y=3,m=2,p=1,M=new Float32Array(y*g*f),b=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){let E=T%3*2/3-1,C=T>2?0:-1,S=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];M.set(S,y*g*T),b.set(d,m*g*T);let v=[T,T,T,T,T,T];_.set(v,p*g*T)}let N=new _t;N.setAttribute("position",new Ft(M,y)),N.setAttribute("uv",new Ft(b,m)),N.setAttribute("faceIndex",new Ft(_,p)),e.push(N),s>ss&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function gh(i,e,t){let n=new Yn(i,e,t);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Nr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function rg(i,e,t){let n=new Float32Array(Pi),s=new I(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function _h(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function xh(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function el(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function og(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Ia||c===Pa,h=c===us||c===ds;if(l||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new so(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new so(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function ag(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function cg(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let y=d.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let y=f[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],i.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,y=0;if(f!==null){let M=f.array;y=f.version;for(let b=0,_=M.length;b<_;b+=3){let N=M[b+0],T=M[b+1],E=M[b+2];d.push(N,T,T,E,E,N)}}else if(g!==void 0){let M=g.array;y=g.version;for(let b=0,_=M.length/3-1;b<_;b+=3){let N=b+0,T=b+1,E=b+2;d.push(N,T,T,E,E,N)}}else return;let m=new(Su(d)?to:eo)(d,1);m.version=y;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function lg(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,y){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,y,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*y[M];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ug(i,e,t){let n=new WeakMap,s=new dt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],b=0;f===!0&&(b=1),g===!0&&(b=2),y===!0&&(b=3);let _=a.attributes.position.count*b,N=1;_>e.maxTextureSize&&(N=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*N*4*u),E=new Qr(T,_,N,u);E.type=Sn,E.needsUpdate=!0;let C=b*4;for(let v=0;v<u;v++){let P=m[v],X=p[v],B=M[v],Z=_*N*4*v;for(let ae=0;ae<P.count;ae++){let j=ae*C;f===!0&&(s.fromBufferAttribute(P,ae),T[Z+j+0]=s.x,T[Z+j+1]=s.y,T[Z+j+2]=s.z,T[Z+j+3]=0),g===!0&&(s.fromBufferAttribute(X,ae),T[Z+j+4]=s.x,T[Z+j+5]=s.y,T[Z+j+6]=s.z,T[Z+j+7]=0),y===!0&&(s.fromBufferAttribute(B,ae),T[Z+j+8]=s.x,T[Z+j+9]=s.y,T[Z+j+10]=s.z,T[Z+j+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:E,size:new we(_,N)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function dg(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var ro=class extends Xt{constructor(e,t,n,s,r,o,a,c,l,h=as){if(h!==as&&h!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===as&&(n=Di),n===void 0&&h===ps&&(n=fs),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:$t,this.minFilter=c!==void 0?c:$t,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Eu=new Xt,yh=new ro(1,1),Ru=new Qr,Cu=new ac,Iu=new io,vh=[],Mh=[],bh=new Float32Array(16),Sh=new Float32Array(9),wh=new Float32Array(4);function Ms(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=vh[s];if(r===void 0&&(r=new Float32Array(s),vh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Uo(i,e){let t=Mh[e];t===void 0&&(t=new Int32Array(e),Mh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function fg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function pg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),zt(t,e)}}function mg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),zt(t,e)}}function gg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),zt(t,e)}}function _g(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;wh.set(n),i.uniformMatrix2fv(this.addr,!1,wh),zt(t,n)}}function xg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;Sh.set(n),i.uniformMatrix3fv(this.addr,!1,Sh),zt(t,n)}}function yg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;bh.set(n),i.uniformMatrix4fv(this.addr,!1,bh),zt(t,n)}}function vg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Mg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),zt(t,e)}}function bg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),zt(t,e)}}function Sg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),zt(t,e)}}function wg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ag(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),zt(t,e)}}function Tg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),zt(t,e)}}function Eg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),zt(t,e)}}function Rg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(yh.compareFunction=bu,r=yh):r=Eu,t.setTexture2D(e||r,s)}function Cg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Cu,s)}function Ig(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Iu,s)}function Pg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ru,s)}function Lg(i){switch(i){case 5126:return fg;case 35664:return pg;case 35665:return mg;case 35666:return gg;case 35674:return _g;case 35675:return xg;case 35676:return yg;case 5124:case 35670:return vg;case 35667:case 35671:return Mg;case 35668:case 35672:return bg;case 35669:case 35673:return Sg;case 5125:return wg;case 36294:return Ag;case 36295:return Tg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return Rg;case 35679:case 36299:case 36307:return Cg;case 35680:case 36300:case 36308:case 36293:return Ig;case 36289:case 36303:case 36311:case 36292:return Pg}}function Dg(i,e){i.uniform1fv(this.addr,e)}function Ng(i,e){let t=Ms(e,this.size,2);i.uniform2fv(this.addr,t)}function Ug(i,e){let t=Ms(e,this.size,3);i.uniform3fv(this.addr,t)}function Og(i,e){let t=Ms(e,this.size,4);i.uniform4fv(this.addr,t)}function Fg(i,e){let t=Ms(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Bg(i,e){let t=Ms(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zg(i,e){let t=Ms(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function kg(i,e){i.uniform1iv(this.addr,e)}function Hg(i,e){i.uniform2iv(this.addr,e)}function Vg(i,e){i.uniform3iv(this.addr,e)}function Gg(i,e){i.uniform4iv(this.addr,e)}function Wg(i,e){i.uniform1uiv(this.addr,e)}function Xg(i,e){i.uniform2uiv(this.addr,e)}function qg(i,e){i.uniform3uiv(this.addr,e)}function Yg(i,e){i.uniform4uiv(this.addr,e)}function Zg(i,e,t){let n=this.cache,s=e.length,r=Uo(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Eu,r[o])}function $g(i,e,t){let n=this.cache,s=e.length,r=Uo(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Cu,r[o])}function Kg(i,e,t){let n=this.cache,s=e.length,r=Uo(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Iu,r[o])}function Jg(i,e,t){let n=this.cache,s=e.length,r=Uo(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ru,r[o])}function jg(i){switch(i){case 5126:return Dg;case 35664:return Ng;case 35665:return Ug;case 35666:return Og;case 35674:return Fg;case 35675:return Bg;case 35676:return zg;case 5124:case 35670:return kg;case 35667:case 35671:return Hg;case 35668:case 35672:return Vg;case 35669:case 35673:return Gg;case 5125:return Wg;case 36294:return Xg;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return Zg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return Jg}}var hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lg(t.type)}},uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jg(t.type)}},dc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},da=/(\w+)(\])?(\[|\.)?/g;function Ah(i,e){i.seq.push(e),i.map[e.id]=e}function Qg(i,e,t){let n=i.name,s=n.length;for(da.lastIndex=0;;){let r=da.exec(n),o=da.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ah(t,l===void 0?new hc(a,i,e):new uc(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new dc(a),Ah(t,u)),t=u}}}var ls=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Qg(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Th(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var e0=37297,t0=0;function n0(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Eh=new Je;function i0(i){ot._getMatrix(Eh,ot.workingColorSpace,i);let e=`mat3( ${Eh.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case No:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Rh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+n0(i.getShaderSource(e),o)}else return s}function s0(i,e){let t=i0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function r0(i,e){let t;switch(e){case pd:t="Linear";break;case md:t="Reinhard";break;case gd:t="Cineon";break;case Po:t="ACESFilmic";break;case xd:t="AgX";break;case yd:t="Neutral";break;case _d:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ur=new I;function o0(){ot.getLuminanceCoefficients(Ur);let i=Ur.x.toFixed(4),e=Ur.y.toFixed(4),t=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Us).join(`
`)}function c0(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function l0(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Us(i){return i!==""}function Ch(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ih(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var h0=/^[ \t]*#include +<([\w\d./]+)>/gm;function fc(i){return i.replace(h0,d0)}var u0=new Map;function d0(i,e){let t=Qe[e];if(t===void 0){let n=u0.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return fc(t)}var f0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(i){return i.replace(f0,p0)}function p0(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function m0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===cu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Wc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function g0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case us:case ds:e="ENVMAP_TYPE_CUBE";break;case Lo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ds:e="ENVMAP_MODE_REFRACTION";break}return e}function x0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case lu:e="ENVMAP_BLENDING_MULTIPLY";break;case dd:e="ENVMAP_BLENDING_MIX";break;case fd:e="ENVMAP_BLENDING_ADD";break}return e}function y0(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function v0(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=m0(t),l=g0(t),h=_0(t),u=x0(t),d=y0(t),f=a0(t),g=c0(r),y=s.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Us).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Us).join(`
`),p.length>0&&(p+=`
`)):(m=[Lh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Us).join(`
`),p=[Lh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==wn?r0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,s0("linearToOutputTexel",t.outputColorSpace),o0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Us).join(`
`)),o=fc(o),o=Ch(o,t),o=Ih(o,t),a=fc(a),a=Ch(a,t),a=Ih(a,t),o=Ph(o),a=Ph(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=M+m+o,_=M+p+a,N=Th(s,s.VERTEX_SHADER,b),T=Th(s,s.FRAGMENT_SHADER,_);s.attachShader(y,N),s.attachShader(y,T),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function E(P){if(i.debug.checkShaderErrors){let X=s.getProgramInfoLog(y).trim(),B=s.getShaderInfoLog(N).trim(),Z=s.getShaderInfoLog(T).trim(),ae=!0,j=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(ae=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,N,T);else{let ce=Rh(s,N,"vertex"),L=Rh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+X+`
`+ce+`
`+L)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(B===""||Z==="")&&(j=!1);j&&(P.diagnostics={runnable:ae,programLog:X,vertexShader:{log:B,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(N),s.deleteShader(T),C=new ls(s,y),S=l0(s,y)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(y,e0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=t0++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=T,this}var M0=0,pc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new mc(e),t.set(e,n)),n}},mc=class{constructor(e){this.id=M0++,this.code=e,this.usedTimes=0}};function b0(i,e,t,n,s,r,o){let a=new qs,c=new pc,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,v,P,X,B){let Z=X.fog,ae=B.geometry,j=S.isMeshStandardMaterial?X.environment:null,ce=(S.isMeshStandardMaterial?t:e).get(S.envMap||j),L=ce&&ce.mapping===Lo?ce.image.height:null,ee=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let se=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,le=se!==void 0?se.length:0,Ze=0;ae.morphAttributes.position!==void 0&&(Ze=1),ae.morphAttributes.normal!==void 0&&(Ze=2),ae.morphAttributes.color!==void 0&&(Ze=3);let qe,ie,de,Ie;if(ee){let lt=Cn[ee];qe=lt.vertexShader,ie=lt.fragmentShader}else qe=S.vertexShader,ie=S.fragmentShader,c.update(S),de=c.getVertexShaderID(S),Ie=c.getFragmentShaderID(S);let _e=i.getRenderTarget(),Oe=i.state.buffers.depth.getReversed(),Ae=B.isInstancedMesh===!0,Re=B.isBatchedMesh===!0,st=!!S.map,et=!!S.matcap,Rt=!!ce,V=!!S.aoMap,Lt=!!S.lightMap,tt=!!S.bumpMap,nt=!!S.normalMap,Fe=!!S.displacementMap,xt=!!S.emissiveMap,He=!!S.metalnessMap,R=!!S.roughnessMap,x=S.anisotropy>0,F=S.clearcoat>0,oe=S.dispersion>0,te=S.iridescence>0,ne=S.sheen>0,Se=S.transmission>0,ve=x&&!!S.anisotropyMap,ge=F&&!!S.clearcoatMap,ct=F&&!!S.clearcoatNormalMap,ue=F&&!!S.clearcoatRoughnessMap,Te=te&&!!S.iridescenceMap,Ge=te&&!!S.iridescenceThicknessMap,Ve=ne&&!!S.sheenColorMap,Ee=ne&&!!S.sheenRoughnessMap,Ke=!!S.specularMap,Ne=!!S.specularColorMap,yt=!!S.specularIntensityMap,U=Se&&!!S.transmissionMap,xe=Se&&!!S.thicknessMap,K=!!S.gradientMap,Q=!!S.alphaMap,Me=S.alphaTest>0,be=!!S.alphaHash,Be=!!S.extensions,St=wn;S.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(St=i.toneMapping);let vt={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:qe,fragmentShader:ie,defines:S.defines,customVertexShaderID:de,customFragmentShaderID:Ie,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Re,batchingColor:Re&&B._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&B.instanceColor!==null,instancingMorph:Ae&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:_e===null?i.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Kt,alphaToCoverage:!!S.alphaToCoverage,map:st,matcap:et,envMap:Rt,envMapMode:Rt&&ce.mapping,envMapCubeUVHeight:L,aoMap:V,lightMap:Lt,bumpMap:tt,normalMap:nt,displacementMap:d&&Fe,emissiveMap:xt,normalMapObjectSpace:nt&&S.normalMapType===wd,normalMapTangentSpace:nt&&S.normalMapType===Mu,metalnessMap:He,roughnessMap:R,anisotropy:x,anisotropyMap:ve,clearcoat:F,clearcoatMap:ge,clearcoatNormalMap:ct,clearcoatRoughnessMap:ue,dispersion:oe,iridescence:te,iridescenceMap:Te,iridescenceThicknessMap:Ge,sheen:ne,sheenColorMap:Ve,sheenRoughnessMap:Ee,specularMap:Ke,specularColorMap:Ne,specularIntensityMap:yt,transmission:Se,transmissionMap:U,thicknessMap:xe,gradientMap:K,opaque:S.transparent===!1&&S.blending===os&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:Me,alphaHash:be,combine:S.combine,mapUv:st&&y(S.map.channel),aoMapUv:V&&y(S.aoMap.channel),lightMapUv:Lt&&y(S.lightMap.channel),bumpMapUv:tt&&y(S.bumpMap.channel),normalMapUv:nt&&y(S.normalMap.channel),displacementMapUv:Fe&&y(S.displacementMap.channel),emissiveMapUv:xt&&y(S.emissiveMap.channel),metalnessMapUv:He&&y(S.metalnessMap.channel),roughnessMapUv:R&&y(S.roughnessMap.channel),anisotropyMapUv:ve&&y(S.anisotropyMap.channel),clearcoatMapUv:ge&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:ct&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&y(S.sheenRoughnessMap.channel),specularMapUv:Ke&&y(S.specularMap.channel),specularColorMapUv:Ne&&y(S.specularColorMap.channel),specularIntensityMapUv:yt&&y(S.specularIntensityMap.channel),transmissionMapUv:U&&y(S.transmissionMap.channel),thicknessMapUv:xe&&y(S.thicknessMap.channel),alphaMapUv:Q&&y(S.alphaMap.channel),vertexTangents:!!ae.attributes.tangent&&(nt||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!ae.attributes.uv&&(st||Q),fog:!!Z,useFog:S.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Oe,skinning:B.isSkinnedMesh===!0,morphTargets:ae.morphAttributes.position!==void 0,morphNormals:ae.morphAttributes.normal!==void 0,morphColors:ae.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ze,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:St,decodeVideoTexture:st&&S.map.isVideoTexture===!0&&ot.getTransfer(S.map.colorSpace)===wt,decodeVideoTextureEmissive:xt&&S.emissiveMap.isVideoTexture===!0&&ot.getTransfer(S.emissiveMap.colorSpace)===wt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Dt,flipSided:S.side===tn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Be&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&S.extensions.multiDraw===!0||Re)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return vt.vertexUv1s=l.has(1),vt.vertexUv2s=l.has(2),vt.vertexUv3s=l.has(3),l.clear(),vt}function p(S){let v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)v.push(P),v.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(M(v,S),b(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function M(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function b(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){let v=g[S.type],P;if(v){let X=Cn[v];P=df.clone(X.uniforms)}else P=S.uniforms;return P}function N(S,v){let P;for(let X=0,B=h.length;X<B;X++){let Z=h[X];if(Z.cacheKey===v){P=Z,++P.usedTimes;break}}return P===void 0&&(P=new v0(i,v,S,r),h.push(P)),P}function T(S){if(--S.usedTimes===0){let v=h.indexOf(S);h[v]=h[h.length-1],h.pop(),S.destroy()}}function E(S){c.remove(S)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:N,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:C}}function S0(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function w0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Dh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Nh(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,y,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=y,p.group=m),e++,p}function a(u,d,f,g,y,m){let p=o(u,d,f,g,y,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,g,y,m){let p=o(u,d,f,g,y,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||w0),n.length>1&&n.sort(d||Dh),s.length>1&&s.sort(d||Dh)}function h(){for(let u=e,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function A0(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Nh,i.set(n,[o])):s>=r.length?(o=new Nh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function T0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new We};break;case"SpotLight":t={position:new I,direction:new I,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function E0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var R0=0;function C0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function I0(i){let e=new T0,t=E0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);let s=new I,r=new Xe,o=new Xe;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,M=0,b=0,_=0,N=0,T=0,E=0;l.sort(C0);for(let S=0,v=l.length;S<v;S++){let P=l[S],X=P.color,B=P.intensity,Z=P.distance,ae=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=X.r*B,u+=X.g*B,d+=X.b*B;else if(P.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(P.sh.coefficients[j],B);E++}else if(P.isDirectionalLight){let j=e.get(P);if(j.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let ce=P.shadow,L=t.get(P);L.shadowIntensity=ce.intensity,L.shadowBias=ce.bias,L.shadowNormalBias=ce.normalBias,L.shadowRadius=ce.radius,L.shadowMapSize=ce.mapSize,n.directionalShadow[f]=L,n.directionalShadowMap[f]=ae,n.directionalShadowMatrix[f]=P.shadow.matrix,M++}n.directional[f]=j,f++}else if(P.isSpotLight){let j=e.get(P);j.position.setFromMatrixPosition(P.matrixWorld),j.color.copy(X).multiplyScalar(B),j.distance=Z,j.coneCos=Math.cos(P.angle),j.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),j.decay=P.decay,n.spot[y]=j;let ce=P.shadow;if(P.map&&(n.spotLightMap[N]=P.map,N++,ce.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[y]=ce.matrix,P.castShadow){let L=t.get(P);L.shadowIntensity=ce.intensity,L.shadowBias=ce.bias,L.shadowNormalBias=ce.normalBias,L.shadowRadius=ce.radius,L.shadowMapSize=ce.mapSize,n.spotShadow[y]=L,n.spotShadowMap[y]=ae,_++}y++}else if(P.isRectAreaLight){let j=e.get(P);j.color.copy(X).multiplyScalar(B),j.halfWidth.set(P.width*.5,0,0),j.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=j,m++}else if(P.isPointLight){let j=e.get(P);if(j.color.copy(P.color).multiplyScalar(P.intensity),j.distance=P.distance,j.decay=P.decay,P.castShadow){let ce=P.shadow,L=t.get(P);L.shadowIntensity=ce.intensity,L.shadowBias=ce.bias,L.shadowNormalBias=ce.normalBias,L.shadowRadius=ce.radius,L.shadowMapSize=ce.mapSize,L.shadowCameraNear=ce.camera.near,L.shadowCameraFar=ce.camera.far,n.pointShadow[g]=L,n.pointShadowMap[g]=ae,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=j,g++}else if(P.isHemisphereLight){let j=e.get(P);j.skyColor.copy(P.color).multiplyScalar(B),j.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=j,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==y||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==M||C.numPointShadows!==b||C.numSpotShadows!==_||C.numSpotMaps!==N||C.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=_+N-T,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,C.directionalLength=f,C.pointLength=g,C.spotLength=y,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=M,C.numPointShadows=b,C.numSpotShadows=_,C.numSpotMaps=N,C.numLightProbes=E,n.version=R0++)}function c(l,h){let u=0,d=0,f=0,g=0,y=0,m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let b=l[p];if(b.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(b.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(b.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(m),y++}}}return{setup:a,setupView:c,state:n}}function Uh(i){let e=new I0(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function P0(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Uh(i),e.set(s,[a])):r>=o.length?(a=new Uh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var gc=class extends on{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_c=class extends on{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},L0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function N0(i,e,t){let n=new Ys,s=new we,r=new we,o=new dt,a=new gc({depthPacking:Sd}),c=new _c,l={},h=t.maxTextureSize,u={[Pn]:tn,[tn]:Pn,[Dt]:Dt},d=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:L0,fragmentShader:D0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new _t;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new gt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cu;let p=this.type;this.render=function(T,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let S=i.getRenderTarget(),v=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),X=i.state;X.setBlending(ai),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let B=p!==Hn&&this.type===Hn,Z=p===Hn&&this.type!==Hn;for(let ae=0,j=T.length;ae<j;ae++){let ce=T[ae],L=ce.shadow;if(L===void 0){console.warn("THREE.WebGLShadowMap:",ce,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;s.copy(L.mapSize);let ee=L.getFrameExtents();if(s.multiply(ee),r.copy(L.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ee.x),s.x=r.x*ee.x,L.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ee.y),s.y=r.y*ee.y,L.mapSize.y=r.y)),L.map===null||B===!0||Z===!0){let le=this.type!==Hn?{minFilter:$t,magFilter:$t}:{};L.map!==null&&L.map.dispose(),L.map=new Yn(s.x,s.y,le),L.map.texture.name=ce.name+".shadowMap",L.camera.updateProjectionMatrix()}i.setRenderTarget(L.map),i.clear();let se=L.getViewportCount();for(let le=0;le<se;le++){let Ze=L.getViewport(le);o.set(r.x*Ze.x,r.y*Ze.y,r.x*Ze.z,r.y*Ze.w),X.viewport(o),L.updateMatrices(ce,le),n=L.getFrustum(),_(E,C,L.camera,ce,this.type)}L.isPointLightShadow!==!0&&this.type===Hn&&M(L,C),L.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,v,P)};function M(T,E){let C=e.update(y);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Yn(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(E,null,C,d,y,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(E,null,C,f,y,null)}function b(T,E,C,S){let v=null,P=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)v=P;else if(v=C.isPointLight===!0?c:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let X=v.uuid,B=E.uuid,Z=l[X];Z===void 0&&(Z={},l[X]=Z);let ae=Z[B];ae===void 0&&(ae=v.clone(),Z[B]=ae,E.addEventListener("dispose",N)),v=ae}if(v.visible=E.visible,v.wireframe=E.wireframe,S===Hn?v.side=E.shadowSide!==null?E.shadowSide:E.side:v.side=E.shadowSide!==null?E.shadowSide:u[E.side],v.alphaMap=E.alphaMap,v.alphaTest=E.alphaTest,v.map=E.map,v.clipShadows=E.clipShadows,v.clippingPlanes=E.clippingPlanes,v.clipIntersection=E.clipIntersection,v.displacementMap=E.displacementMap,v.displacementScale=E.displacementScale,v.displacementBias=E.displacementBias,v.wireframeLinewidth=E.wireframeLinewidth,v.linewidth=E.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let X=i.properties.get(v);X.light=C}return v}function _(T,E,C,S,v){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===Hn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);let B=e.update(T),Z=T.material;if(Array.isArray(Z)){let ae=B.groups;for(let j=0,ce=ae.length;j<ce;j++){let L=ae[j],ee=Z[L.materialIndex];if(ee&&ee.visible){let se=b(T,ee,S,v);T.onBeforeShadow(i,T,E,C,B,se,L),i.renderBufferDirect(C,null,B,se,T,L),T.onAfterShadow(i,T,E,C,B,se,L)}}}else if(Z.visible){let ae=b(T,Z,S,v);T.onBeforeShadow(i,T,E,C,B,ae,null),i.renderBufferDirect(C,null,B,ae,T,null),T.onAfterShadow(i,T,E,C,B,ae,null)}}let X=T.children;for(let B=0,Z=X.length;B<Z;B++)_(X[B],E,C,S,v)}function N(T){T.target.removeEventListener("dispose",N);for(let C in l){let S=l[C],v=T.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}var U0={[Sa]:wa,[Aa]:Ra,[Ta]:Ca,[hs]:Ea,[wa]:Sa,[Ra]:Aa,[Ca]:Ta,[Ea]:hs};function O0(i,e){function t(){let U=!1,xe=new dt,K=null,Q=new dt(0,0,0,0);return{setMask:function(Me){K!==Me&&!U&&(i.colorMask(Me,Me,Me,Me),K=Me)},setLocked:function(Me){U=Me},setClear:function(Me,be,Be,St,vt){vt===!0&&(Me*=St,be*=St,Be*=St),xe.set(Me,be,Be,St),Q.equals(xe)===!1&&(i.clearColor(Me,be,Be,St),Q.copy(xe))},reset:function(){U=!1,K=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,xe=!1,K=null,Q=null,Me=null;return{setReversed:function(be){if(xe!==be){let Be=e.get("EXT_clip_control");xe?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT);let St=Me;Me=null,this.setClear(St)}xe=be},getReversed:function(){return xe},setTest:function(be){be?_e(i.DEPTH_TEST):Oe(i.DEPTH_TEST)},setMask:function(be){K!==be&&!U&&(i.depthMask(be),K=be)},setFunc:function(be){if(xe&&(be=U0[be]),Q!==be){switch(be){case Sa:i.depthFunc(i.NEVER);break;case wa:i.depthFunc(i.ALWAYS);break;case Aa:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case Ta:i.depthFunc(i.EQUAL);break;case Ea:i.depthFunc(i.GEQUAL);break;case Ra:i.depthFunc(i.GREATER);break;case Ca:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=be}},setLocked:function(be){U=be},setClear:function(be){Me!==be&&(xe&&(be=1-be),i.clearDepth(be),Me=be)},reset:function(){U=!1,K=null,Q=null,Me=null,xe=!1}}}function s(){let U=!1,xe=null,K=null,Q=null,Me=null,be=null,Be=null,St=null,vt=null;return{setTest:function(lt){U||(lt?_e(i.STENCIL_TEST):Oe(i.STENCIL_TEST))},setMask:function(lt){xe!==lt&&!U&&(i.stencilMask(lt),xe=lt)},setFunc:function(lt,Vt,gn){(K!==lt||Q!==Vt||Me!==gn)&&(i.stencilFunc(lt,Vt,gn),K=lt,Q=Vt,Me=gn)},setOp:function(lt,Vt,gn){(be!==lt||Be!==Vt||St!==gn)&&(i.stencilOp(lt,Vt,gn),be=lt,Be=Vt,St=gn)},setLocked:function(lt){U=lt},setClear:function(lt){vt!==lt&&(i.clearStencil(lt),vt=lt)},reset:function(){U=!1,xe=null,K=null,Q=null,Me=null,be=null,Be=null,St=null,vt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,y=!1,m=null,p=null,M=null,b=null,_=null,N=null,T=null,E=new We(0,0,0),C=0,S=!1,v=null,P=null,X=null,B=null,Z=null,ae=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ce=0,L=i.getParameter(i.VERSION);L.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(L)[1]),j=ce>=1):L.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),j=ce>=2);let ee=null,se={},le=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),qe=new dt().fromArray(le),ie=new dt().fromArray(Ze);function de(U,xe,K,Q){let Me=new Uint8Array(4),be=i.createTexture();i.bindTexture(U,be),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<K;Be++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(xe+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return be}let Ie={};Ie[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),Ie[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ie[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ie[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),_e(i.DEPTH_TEST),o.setFunc(hs),tt(!1),nt(Ol),_e(i.CULL_FACE),V(ai);function _e(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Oe(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ae(U,xe){return u[U]!==xe?(i.bindFramebuffer(U,xe),u[U]=xe,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xe),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function Re(U,xe){let K=f,Q=!1;if(U){K=d.get(xe),K===void 0&&(K=[],d.set(xe,K));let Me=U.textures;if(K.length!==Me.length||K[0]!==i.COLOR_ATTACHMENT0){for(let be=0,Be=Me.length;be<Be;be++)K[be]=i.COLOR_ATTACHMENT0+be;K.length=Me.length,Q=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,Q=!0);Q&&i.drawBuffers(K)}function st(U){return g!==U?(i.useProgram(U),g=U,!0):!1}let et={[Ci]:i.FUNC_ADD,[$u]:i.FUNC_SUBTRACT,[Ku]:i.FUNC_REVERSE_SUBTRACT};et[Ju]=i.MIN,et[ju]=i.MAX;let Rt={[Qu]:i.ZERO,[ed]:i.ONE,[td]:i.SRC_COLOR,[Ma]:i.SRC_ALPHA,[ad]:i.SRC_ALPHA_SATURATE,[rd]:i.DST_COLOR,[id]:i.DST_ALPHA,[nd]:i.ONE_MINUS_SRC_COLOR,[ba]:i.ONE_MINUS_SRC_ALPHA,[od]:i.ONE_MINUS_DST_COLOR,[sd]:i.ONE_MINUS_DST_ALPHA,[cd]:i.CONSTANT_COLOR,[ld]:i.ONE_MINUS_CONSTANT_COLOR,[hd]:i.CONSTANT_ALPHA,[ud]:i.ONE_MINUS_CONSTANT_ALPHA};function V(U,xe,K,Q,Me,be,Be,St,vt,lt){if(U===ai){y===!0&&(Oe(i.BLEND),y=!1);return}if(y===!1&&(_e(i.BLEND),y=!0),U!==Zu){if(U!==m||lt!==S){if((p!==Ci||_!==Ci)&&(i.blendEquation(i.FUNC_ADD),p=Ci,_=Ci),lt)switch(U){case os:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fl:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case os:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,b=null,N=null,T=null,E.set(0,0,0),C=0,m=U,S=lt}return}Me=Me||xe,be=be||K,Be=Be||Q,(xe!==p||Me!==_)&&(i.blendEquationSeparate(et[xe],et[Me]),p=xe,_=Me),(K!==M||Q!==b||be!==N||Be!==T)&&(i.blendFuncSeparate(Rt[K],Rt[Q],Rt[be],Rt[Be]),M=K,b=Q,N=be,T=Be),(St.equals(E)===!1||vt!==C)&&(i.blendColor(St.r,St.g,St.b,vt),E.copy(St),C=vt),m=U,S=!1}function Lt(U,xe){U.side===Dt?Oe(i.CULL_FACE):_e(i.CULL_FACE);let K=U.side===tn;xe&&(K=!K),tt(K),U.blending===os&&U.transparent===!1?V(ai):V(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let Q=U.stencilWrite;a.setTest(Q),Q&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),xt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?_e(i.SAMPLE_ALPHA_TO_COVERAGE):Oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(U){v!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),v=U)}function nt(U){U!==qu?(_e(i.CULL_FACE),U!==P&&(U===Ol?i.cullFace(i.BACK):U===Yu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Oe(i.CULL_FACE),P=U}function Fe(U){U!==X&&(j&&i.lineWidth(U),X=U)}function xt(U,xe,K){U?(_e(i.POLYGON_OFFSET_FILL),(B!==xe||Z!==K)&&(i.polygonOffset(xe,K),B=xe,Z=K)):Oe(i.POLYGON_OFFSET_FILL)}function He(U){U?_e(i.SCISSOR_TEST):Oe(i.SCISSOR_TEST)}function R(U){U===void 0&&(U=i.TEXTURE0+ae-1),ee!==U&&(i.activeTexture(U),ee=U)}function x(U,xe,K){K===void 0&&(ee===null?K=i.TEXTURE0+ae-1:K=ee);let Q=se[K];Q===void 0&&(Q={type:void 0,texture:void 0},se[K]=Q),(Q.type!==U||Q.texture!==xe)&&(ee!==K&&(i.activeTexture(K),ee=K),i.bindTexture(U,xe||Ie[U]),Q.type=U,Q.texture=xe)}function F(){let U=se[ee];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ue(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ge(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ve(U){qe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),qe.copy(U))}function Ee(U){ie.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),ie.copy(U))}function Ke(U,xe){let K=l.get(xe);K===void 0&&(K=new WeakMap,l.set(xe,K));let Q=K.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(xe,U.name),K.set(U,Q))}function Ne(U,xe){let Q=l.get(xe).get(U);c.get(xe)!==Q&&(i.uniformBlockBinding(xe,Q,U.__bindingPointIndex),c.set(xe,Q))}function yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ee=null,se={},u={},d=new WeakMap,f=[],g=null,y=!1,m=null,p=null,M=null,b=null,_=null,N=null,T=null,E=new We(0,0,0),C=0,S=!1,v=null,P=null,X=null,B=null,Z=null,qe.set(0,0,i.canvas.width,i.canvas.height),ie.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:_e,disable:Oe,bindFramebuffer:Ae,drawBuffers:Re,useProgram:st,setBlending:V,setMaterial:Lt,setFlipSided:tt,setCullFace:nt,setLineWidth:Fe,setPolygonOffset:xt,setScissorTest:He,activeTexture:R,bindTexture:x,unbindTexture:F,compressedTexImage2D:oe,compressedTexImage3D:te,texImage2D:Te,texImage3D:Ge,updateUBOMapping:Ke,uniformBlockBinding:Ne,texStorage2D:ct,texStorage3D:ue,texSubImage2D:ne,texSubImage3D:Se,compressedTexSubImage2D:ve,compressedTexSubImage3D:ge,scissor:Ve,viewport:Ee,reset:yt}}function Oh(i,e,t,n){let s=F0(n);switch(t){case pu:return i*e;case gu:return i*e;case _u:return i*e*2;case $c:return i*e/s.components*s.byteLength;case Kc:return i*e/s.components*s.byteLength;case xu:return i*e*2/s.components*s.byteLength;case Jc:return i*e*2/s.components*s.byteLength;case mu:return i*e*3/s.components*s.byteLength;case ln:return i*e*4/s.components*s.byteLength;case jc:return i*e*4/s.components*s.byteLength;case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zr:case $r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:case Ua:return Math.max(i,16)*Math.max(e,8)/4;case La:case Na:return Math.max(i,8)*Math.max(e,8)/2;case Oa:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ja:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Kr:case Qa:case ec:return Math.ceil(i/4)*Math.ceil(e/4)*16;case yu:case tc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case nc:case ic:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function F0(i){switch(i){case qn:case uu:return{byteLength:1,components:1};case Ws:case du:case or:return{byteLength:2,components:1};case Yc:case Zc:return{byteLength:2,components:4};case Di:case qc:case Sn:return{byteLength:4,components:1};case fu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function B0(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,x){return f?new OffscreenCanvas(R,x):Xs("canvas")}function y(R,x,F){let oe=1,te=He(R);if((te.width>F||te.height>F)&&(oe=F/Math.max(te.width,te.height)),oe<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ne=Math.floor(oe*te.width),Se=Math.floor(oe*te.height);u===void 0&&(u=g(ne,Se));let ve=x?g(ne,Se):u;return ve.width=ne,ve.height=Se,ve.getContext("2d").drawImage(R,0,0,ne,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ne+"x"+Se+")."),ve}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(R,x,F,oe,te=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ne=x;if(x===i.RED&&(F===i.FLOAT&&(ne=i.R32F),F===i.HALF_FLOAT&&(ne=i.R16F),F===i.UNSIGNED_BYTE&&(ne=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.R8UI),F===i.UNSIGNED_SHORT&&(ne=i.R16UI),F===i.UNSIGNED_INT&&(ne=i.R32UI),F===i.BYTE&&(ne=i.R8I),F===i.SHORT&&(ne=i.R16I),F===i.INT&&(ne=i.R32I)),x===i.RG&&(F===i.FLOAT&&(ne=i.RG32F),F===i.HALF_FLOAT&&(ne=i.RG16F),F===i.UNSIGNED_BYTE&&(ne=i.RG8)),x===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.RG8UI),F===i.UNSIGNED_SHORT&&(ne=i.RG16UI),F===i.UNSIGNED_INT&&(ne=i.RG32UI),F===i.BYTE&&(ne=i.RG8I),F===i.SHORT&&(ne=i.RG16I),F===i.INT&&(ne=i.RG32I)),x===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),F===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),F===i.UNSIGNED_INT&&(ne=i.RGB32UI),F===i.BYTE&&(ne=i.RGB8I),F===i.SHORT&&(ne=i.RGB16I),F===i.INT&&(ne=i.RGB32I)),x===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),F===i.UNSIGNED_INT&&(ne=i.RGBA32UI),F===i.BYTE&&(ne=i.RGBA8I),F===i.SHORT&&(ne=i.RGBA16I),F===i.INT&&(ne=i.RGBA32I)),x===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),x===i.RGBA){let Se=te?No:ot.getTransfer(oe);F===i.FLOAT&&(ne=i.RGBA32F),F===i.HALF_FLOAT&&(ne=i.RGBA16F),F===i.UNSIGNED_BYTE&&(ne=Se===wt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function _(R,x){let F;return R?x===null||x===Di||x===fs?F=i.DEPTH24_STENCIL8:x===Sn?F=i.DEPTH32F_STENCIL8:x===Ws&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Di||x===fs?F=i.DEPTH_COMPONENT24:x===Sn?F=i.DEPTH_COMPONENT32F:x===Ws&&(F=i.DEPTH_COMPONENT16),F}function N(R,x){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==$t&&R.minFilter!==en?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function T(R){let x=R.target;x.removeEventListener("dispose",T),C(x),x.isVideoTexture&&h.delete(x)}function E(R){let x=R.target;x.removeEventListener("dispose",E),v(x)}function C(R){let x=n.get(R);if(x.__webglInit===void 0)return;let F=R.source,oe=d.get(F);if(oe){let te=oe[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(R),Object.keys(oe).length===0&&d.delete(F)}n.remove(R)}function S(R){let x=n.get(R);i.deleteTexture(x.__webglTexture);let F=R.source,oe=d.get(F);delete oe[x.__cacheKey],o.memory.textures--}function v(R){let x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(x.__webglFramebuffer[oe]))for(let te=0;te<x.__webglFramebuffer[oe].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[oe][te]);else i.deleteFramebuffer(x.__webglFramebuffer[oe]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[oe])}else{if(Array.isArray(x.__webglFramebuffer))for(let oe=0;oe<x.__webglFramebuffer.length;oe++)i.deleteFramebuffer(x.__webglFramebuffer[oe]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let oe=0;oe<x.__webglColorRenderbuffer.length;oe++)x.__webglColorRenderbuffer[oe]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[oe]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let F=R.textures;for(let oe=0,te=F.length;oe<te;oe++){let ne=n.get(F[oe]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),o.memory.textures--),n.remove(F[oe])}n.remove(R)}let P=0;function X(){P=0}function B(){let R=P;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function Z(R){let x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function ae(R,x){let F=n.get(R);if(R.isVideoTexture&&Fe(R),R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){let oe=R.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ie(F,R,x);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function j(R,x){let F=n.get(R);if(R.version>0&&F.__version!==R.version){ie(F,R,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function ce(R,x){let F=n.get(R);if(R.version>0&&F.__version!==R.version){ie(F,R,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function L(R,x){let F=n.get(R);if(R.version>0&&F.__version!==R.version){de(F,R,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}let ee={[Li]:i.REPEAT,[Gn]:i.CLAMP_TO_EDGE,[Gs]:i.MIRRORED_REPEAT},se={[$t]:i.NEAREST,[Xc]:i.NEAREST_MIPMAP_NEAREST,[is]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Os]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},le={[Ad]:i.NEVER,[Pd]:i.ALWAYS,[Td]:i.LESS,[bu]:i.LEQUAL,[Ed]:i.EQUAL,[Id]:i.GEQUAL,[Rd]:i.GREATER,[Cd]:i.NOTEQUAL};function Ze(R,x){if(x.type===Sn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===en||x.magFilter===Os||x.magFilter===is||x.magFilter===In||x.minFilter===en||x.minFilter===Os||x.minFilter===is||x.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ee[x.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ee[x.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ee[x.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,se[x.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,se[x.minFilter]),x.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,le[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===$t||x.minFilter!==is&&x.minFilter!==In||x.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function qe(R,x){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",T));let oe=x.source,te=d.get(oe);te===void 0&&(te={},d.set(oe,te));let ne=Z(x);if(ne!==R.__cacheKey){te[ne]===void 0&&(te[ne]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),te[ne].usedTimes++;let Se=te[R.__cacheKey];Se!==void 0&&(te[R.__cacheKey].usedTimes--,Se.usedTimes===0&&S(x)),R.__cacheKey=ne,R.__webglTexture=te[ne].texture}return F}function ie(R,x,F){let oe=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(oe=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(oe=i.TEXTURE_3D);let te=qe(R,x),ne=x.source;t.bindTexture(oe,R.__webglTexture,i.TEXTURE0+F);let Se=n.get(ne);if(ne.version!==Se.__version||te===!0){t.activeTexture(i.TEXTURE0+F);let ve=ot.getPrimaries(ot.workingColorSpace),ge=x.colorSpace===ri?null:ot.getPrimaries(x.colorSpace),ct=x.colorSpace===ri||ve===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let ue=y(x.image,!1,s.maxTextureSize);ue=xt(x,ue);let Te=r.convert(x.format,x.colorSpace),Ge=r.convert(x.type),Ve=b(x.internalFormat,Te,Ge,x.colorSpace,x.isVideoTexture);Ze(oe,x);let Ee,Ke=x.mipmaps,Ne=x.isVideoTexture!==!0,yt=Se.__version===void 0||te===!0,U=ne.dataReady,xe=N(x,ue);if(x.isDepthTexture)Ve=_(x.format===ps,x.type),yt&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,Ve,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,Ve,ue.width,ue.height,0,Te,Ge,null));else if(x.isDataTexture)if(Ke.length>0){Ne&&yt&&t.texStorage2D(i.TEXTURE_2D,xe,Ve,Ke[0].width,Ke[0].height);for(let K=0,Q=Ke.length;K<Q;K++)Ee=Ke[K],Ne?U&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Ee.width,Ee.height,Te,Ge,Ee.data):t.texImage2D(i.TEXTURE_2D,K,Ve,Ee.width,Ee.height,0,Te,Ge,Ee.data);x.generateMipmaps=!1}else Ne?(yt&&t.texStorage2D(i.TEXTURE_2D,xe,Ve,ue.width,ue.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue.width,ue.height,Te,Ge,ue.data)):t.texImage2D(i.TEXTURE_2D,0,Ve,ue.width,ue.height,0,Te,Ge,ue.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ne&&yt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Ve,Ke[0].width,Ke[0].height,ue.depth);for(let K=0,Q=Ke.length;K<Q;K++)if(Ee=Ke[K],x.format!==ln)if(Te!==null)if(Ne){if(U)if(x.layerUpdates.size>0){let Me=Oh(Ee.width,Ee.height,x.format,x.type);for(let be of x.layerUpdates){let Be=Ee.data.subarray(be*Me/Ee.data.BYTES_PER_ELEMENT,(be+1)*Me/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,be,Ee.width,Ee.height,1,Te,Be)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Ee.width,Ee.height,ue.depth,Te,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Ve,Ee.width,Ee.height,ue.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Ee.width,Ee.height,ue.depth,Te,Ge,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Ve,Ee.width,Ee.height,ue.depth,0,Te,Ge,Ee.data)}else{Ne&&yt&&t.texStorage2D(i.TEXTURE_2D,xe,Ve,Ke[0].width,Ke[0].height);for(let K=0,Q=Ke.length;K<Q;K++)Ee=Ke[K],x.format!==ln?Te!==null?Ne?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Ee.width,Ee.height,Te,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Ve,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?U&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Ee.width,Ee.height,Te,Ge,Ee.data):t.texImage2D(i.TEXTURE_2D,K,Ve,Ee.width,Ee.height,0,Te,Ge,Ee.data)}else if(x.isDataArrayTexture)if(Ne){if(yt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Ve,ue.width,ue.height,ue.depth),U)if(x.layerUpdates.size>0){let K=Oh(ue.width,ue.height,x.format,x.type);for(let Q of x.layerUpdates){let Me=ue.data.subarray(Q*K/ue.data.BYTES_PER_ELEMENT,(Q+1)*K/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ue.width,ue.height,1,Te,Ge,Me)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Te,Ge,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ve,ue.width,ue.height,ue.depth,0,Te,Ge,ue.data);else if(x.isData3DTexture)Ne?(yt&&t.texStorage3D(i.TEXTURE_3D,xe,Ve,ue.width,ue.height,ue.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Te,Ge,ue.data)):t.texImage3D(i.TEXTURE_3D,0,Ve,ue.width,ue.height,ue.depth,0,Te,Ge,ue.data);else if(x.isFramebufferTexture){if(yt)if(Ne)t.texStorage2D(i.TEXTURE_2D,xe,Ve,ue.width,ue.height);else{let K=ue.width,Q=ue.height;for(let Me=0;Me<xe;Me++)t.texImage2D(i.TEXTURE_2D,Me,Ve,K,Q,0,Te,Ge,null),K>>=1,Q>>=1}}else if(Ke.length>0){if(Ne&&yt){let K=He(Ke[0]);t.texStorage2D(i.TEXTURE_2D,xe,Ve,K.width,K.height)}for(let K=0,Q=Ke.length;K<Q;K++)Ee=Ke[K],Ne?U&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Te,Ge,Ee):t.texImage2D(i.TEXTURE_2D,K,Ve,Te,Ge,Ee);x.generateMipmaps=!1}else if(Ne){if(yt){let K=He(ue);t.texStorage2D(i.TEXTURE_2D,xe,Ve,K.width,K.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,Ge,ue)}else t.texImage2D(i.TEXTURE_2D,0,Ve,Te,Ge,ue);m(x)&&p(oe),Se.__version=ne.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function de(R,x,F){if(x.image.length!==6)return;let oe=qe(R,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+F);let ne=n.get(te);if(te.version!==ne.__version||oe===!0){t.activeTexture(i.TEXTURE0+F);let Se=ot.getPrimaries(ot.workingColorSpace),ve=x.colorSpace===ri?null:ot.getPrimaries(x.colorSpace),ge=x.colorSpace===ri||Se===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let ct=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,Te=[];for(let Q=0;Q<6;Q++)!ct&&!ue?Te[Q]=y(x.image[Q],!0,s.maxCubemapSize):Te[Q]=ue?x.image[Q].image:x.image[Q],Te[Q]=xt(x,Te[Q]);let Ge=Te[0],Ve=r.convert(x.format,x.colorSpace),Ee=r.convert(x.type),Ke=b(x.internalFormat,Ve,Ee,x.colorSpace),Ne=x.isVideoTexture!==!0,yt=ne.__version===void 0||oe===!0,U=te.dataReady,xe=N(x,Ge);Ze(i.TEXTURE_CUBE_MAP,x);let K;if(ct){Ne&&yt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ke,Ge.width,Ge.height);for(let Q=0;Q<6;Q++){K=Te[Q].mipmaps;for(let Me=0;Me<K.length;Me++){let be=K[Me];x.format!==ln?Ve!==null?Ne?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,be.width,be.height,Ve,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,Ke,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,be.width,be.height,Ve,Ee,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,Ke,be.width,be.height,0,Ve,Ee,be.data)}}}else{if(K=x.mipmaps,Ne&&yt){K.length>0&&xe++;let Q=He(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ke,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ue){Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Te[Q].width,Te[Q].height,Ve,Ee,Te[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ke,Te[Q].width,Te[Q].height,0,Ve,Ee,Te[Q].data);for(let Me=0;Me<K.length;Me++){let Be=K[Me].image[Q].image;Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,Be.width,Be.height,Ve,Ee,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,Ke,Be.width,Be.height,0,Ve,Ee,Be.data)}}else{Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ve,Ee,Te[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ke,Ve,Ee,Te[Q]);for(let Me=0;Me<K.length;Me++){let be=K[Me];Ne?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,Ve,Ee,be.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,Ke,Ve,Ee,be.image[Q])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),ne.__version=te.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Ie(R,x,F,oe,te,ne){let Se=r.convert(F.format,F.colorSpace),ve=r.convert(F.type),ge=b(F.internalFormat,Se,ve,F.colorSpace),ct=n.get(x),ue=n.get(F);if(ue.__renderTarget=x,!ct.__hasExternalTextures){let Te=Math.max(1,x.width>>ne),Ge=Math.max(1,x.height>>ne);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,ne,ge,Te,Ge,x.depth,0,Se,ve,null):t.texImage2D(te,ne,ge,Te,Ge,0,Se,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),nt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,te,ue.__webglTexture,0,tt(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,oe,te,ue.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(R,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,R),x.depthBuffer){let oe=x.depthTexture,te=oe&&oe.isDepthTexture?oe.type:null,ne=_(x.stencilBuffer,te),Se=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=tt(x);nt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,ne,x.width,x.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ne,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,R)}else{let oe=x.textures;for(let te=0;te<oe.length;te++){let ne=oe[te],Se=r.convert(ne.format,ne.colorSpace),ve=r.convert(ne.type),ge=b(ne.internalFormat,Se,ve,ne.colorSpace),ct=tt(x);F&&nt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ge,x.width,x.height):nt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,ge,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ge,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(R,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let oe=n.get(x.depthTexture);oe.__renderTarget=x,(!oe.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),ae(x.depthTexture,0);let te=oe.__webglTexture,ne=tt(x);if(x.depthTexture.format===as)nt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===ps)nt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ae(R){let x=n.get(R),F=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){let oe=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),oe){let te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,oe.removeEventListener("dispose",te)};oe.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=oe}if(R.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Oe(x.__webglFramebuffer,R)}else if(F){x.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[oe]),x.__webglDepthbuffer[oe]===void 0)x.__webglDepthbuffer[oe]=i.createRenderbuffer(),_e(x.__webglDepthbuffer[oe],R,!1);else{let te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer[oe];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ne)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),_e(x.__webglDepthbuffer,R,!1);else{let oe=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,te)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Re(R,x,F){let oe=n.get(R);x!==void 0&&Ie(oe.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ae(R)}function st(R){let x=R.texture,F=n.get(R),oe=n.get(x);R.addEventListener("dispose",E);let te=R.textures,ne=R.isWebGLCubeRenderTarget===!0,Se=te.length>1;if(Se||(oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture()),oe.__version=x.version,o.memory.textures++),ne){F.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[ve]=[];for(let ge=0;ge<x.mipmaps.length;ge++)F.__webglFramebuffer[ve][ge]=i.createFramebuffer()}else F.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let ve=0;ve<x.mipmaps.length;ve++)F.__webglFramebuffer[ve]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Se)for(let ve=0,ge=te.length;ve<ge;ve++){let ct=n.get(te[ve]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&nt(R)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ve=0;ve<te.length;ve++){let ge=te[ve];F.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ve]);let ct=r.convert(ge.format,ge.colorSpace),ue=r.convert(ge.type),Te=b(ge.internalFormat,ct,ue,ge.colorSpace,R.isXRRenderTarget===!0),Ge=tt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,Te,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,F.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),_e(F.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,oe.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,x);for(let ve=0;ve<6;ve++)if(x.mipmaps&&x.mipmaps.length>0)for(let ge=0;ge<x.mipmaps.length;ge++)Ie(F.__webglFramebuffer[ve][ge],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ge);else Ie(F.__webglFramebuffer[ve],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(x)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ve=0,ge=te.length;ve<ge;ve++){let ct=te[ve],ue=n.get(ct);t.bindTexture(i.TEXTURE_2D,ue.__webglTexture),Ze(i.TEXTURE_2D,ct),Ie(F.__webglFramebuffer,R,ct,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),m(ct)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ve=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,oe.__webglTexture),Ze(ve,x),x.mipmaps&&x.mipmaps.length>0)for(let ge=0;ge<x.mipmaps.length;ge++)Ie(F.__webglFramebuffer[ge],R,x,i.COLOR_ATTACHMENT0,ve,ge);else Ie(F.__webglFramebuffer,R,x,i.COLOR_ATTACHMENT0,ve,0);m(x)&&p(ve),t.unbindTexture()}R.depthBuffer&&Ae(R)}function et(R){let x=R.textures;for(let F=0,oe=x.length;F<oe;F++){let te=x[F];if(m(te)){let ne=M(R),Se=n.get(te).__webglTexture;t.bindTexture(ne,Se),p(ne),t.unbindTexture()}}}let Rt=[],V=[];function Lt(R){if(R.samples>0){if(nt(R)===!1){let x=R.textures,F=R.width,oe=R.height,te=i.COLOR_BUFFER_BIT,ne=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(R),ve=x.length>1;if(ve)for(let ge=0;ge<x.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ge=0;ge<x.length;ge++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[ge]);let ct=n.get(x[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,F,oe,0,0,F,oe,te,i.NEAREST),c===!0&&(Rt.length=0,V.length=0,Rt.push(i.COLOR_ATTACHMENT0+ge),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Rt.push(ne),V.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,V)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Rt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let ge=0;ge<x.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,Se.__webglColorRenderbuffer[ge]);let ct=n.get(x[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,ct,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let x=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function tt(R){return Math.min(s.maxSamples,R.samples)}function nt(R){let x=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Fe(R){let x=o.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function xt(R,x){let F=R.colorSpace,oe=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==Kt&&F!==ri&&(ot.getTransfer(F)===wt?(oe!==ln||te!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}function He(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=X,this.setTexture2D=ae,this.setTexture2DArray=j,this.setTexture3D=ce,this.setTextureCube=L,this.rebindTextures=Re,this.setupRenderTarget=st,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=nt}function z0(i,e){function t(n,s=ri){let r,o=ot.getTransfer(s);if(n===qn)return i.UNSIGNED_BYTE;if(n===Yc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Zc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uu)return i.BYTE;if(n===du)return i.SHORT;if(n===Ws)return i.UNSIGNED_SHORT;if(n===qc)return i.INT;if(n===Di)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===or)return i.HALF_FLOAT;if(n===pu)return i.ALPHA;if(n===mu)return i.RGB;if(n===ln)return i.RGBA;if(n===gu)return i.LUMINANCE;if(n===_u)return i.LUMINANCE_ALPHA;if(n===as)return i.DEPTH_COMPONENT;if(n===ps)return i.DEPTH_STENCIL;if(n===$c)return i.RED;if(n===Kc)return i.RED_INTEGER;if(n===xu)return i.RG;if(n===Jc)return i.RG_INTEGER;if(n===jc)return i.RGBA_INTEGER;if(n===qr||n===Yr||n===Zr||n===$r)if(o===wt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===La||n===Da||n===Na||n===Ua)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===La)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oa||n===Fa||n===Ba)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oa||n===Fa)return o===wt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ba)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===za||n===ka||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===$a||n===Ka||n===Ja||n===ja)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===za)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ha)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Va)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ga)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wa)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xa)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qa)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ya)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Za)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$a)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ka)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ja)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Kr||n===Qa||n===ec)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Kr)return o===wt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yu||n===tc||n===nc||n===ic)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Kr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===tc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===nc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ic)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var xc=class extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},At=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},k0={type:"move"},zs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(k0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,yc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new Xt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Dn({vertexShader:H0,fragmentShader:V0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new Tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vc=class extends ci{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,y=new yc,m=t.getContextAttributes(),p=null,M=null,b=[],_=[],N=new we,T=null,E=new Wt;E.viewport=new dt;let C=new Wt;C.viewport=new dt;let S=[E,C],v=new xc,P=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let de=b[ie];return de===void 0&&(de=new zs,b[ie]=de),de.getTargetRaySpace()},this.getControllerGrip=function(ie){let de=b[ie];return de===void 0&&(de=new zs,b[ie]=de),de.getGripSpace()},this.getHand=function(ie){let de=b[ie];return de===void 0&&(de=new zs,b[ie]=de),de.getHandSpace()};function B(ie){let de=_.indexOf(ie.inputSource);if(de===-1)return;let Ie=b[de];Ie!==void 0&&(Ie.update(ie.inputSource,ie.frame,l||o),Ie.dispatchEvent({type:ie.type,data:ie.inputSource}))}function Z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",ae);for(let ie=0;ie<b.length;ie++){let de=_[ie];de!==null&&(_[ie]=null,b[ie].disconnect(de))}P=null,X=null,y.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,M=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){a=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ie){l=ie},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",ae),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0){let de={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Yn(f.framebufferWidth,f.framebufferHeight,{format:ln,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let de=null,Ie=null,_e=null;m.depth&&(_e=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=m.stencil?ps:as,Ie=m.stencil?fs:Di);let Oe={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Oe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Yn(d.textureWidth,d.textureHeight,{format:ln,type:qn,depthTexture:new ro(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function ae(ie){for(let de=0;de<ie.removed.length;de++){let Ie=ie.removed[de],_e=_.indexOf(Ie);_e>=0&&(_[_e]=null,b[_e].disconnect(Ie))}for(let de=0;de<ie.added.length;de++){let Ie=ie.added[de],_e=_.indexOf(Ie);if(_e===-1){for(let Ae=0;Ae<b.length;Ae++)if(Ae>=_.length){_.push(Ie),_e=Ae;break}else if(_[Ae]===null){_[Ae]=Ie,_e=Ae;break}if(_e===-1)break}let Oe=b[_e];Oe&&Oe.connect(Ie)}}let j=new I,ce=new I;function L(ie,de,Ie){j.setFromMatrixPosition(de.matrixWorld),ce.setFromMatrixPosition(Ie.matrixWorld);let _e=j.distanceTo(ce),Oe=de.projectionMatrix.elements,Ae=Ie.projectionMatrix.elements,Re=Oe[14]/(Oe[10]-1),st=Oe[14]/(Oe[10]+1),et=(Oe[9]+1)/Oe[5],Rt=(Oe[9]-1)/Oe[5],V=(Oe[8]-1)/Oe[0],Lt=(Ae[8]+1)/Ae[0],tt=Re*V,nt=Re*Lt,Fe=_e/(-V+Lt),xt=Fe*-V;if(de.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(xt),ie.translateZ(Fe),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Oe[10]===-1)ie.projectionMatrix.copy(de.projectionMatrix),ie.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{let He=Re+Fe,R=st+Fe,x=tt-xt,F=nt+(_e-xt),oe=et*st/R*He,te=Rt*st/R*He;ie.projectionMatrix.makePerspective(x,F,oe,te,He,R),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function ee(ie,de){de===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(de.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let de=ie.near,Ie=ie.far;y.texture!==null&&(y.depthNear>0&&(de=y.depthNear),y.depthFar>0&&(Ie=y.depthFar)),v.near=C.near=E.near=de,v.far=C.far=E.far=Ie,(P!==v.near||X!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),P=v.near,X=v.far),E.layers.mask=ie.layers.mask|2,C.layers.mask=ie.layers.mask|4,v.layers.mask=E.layers.mask|C.layers.mask;let _e=ie.parent,Oe=v.cameras;ee(v,_e);for(let Ae=0;Ae<Oe.length;Ae++)ee(Oe[Ae],_e);Oe.length===2?L(v,E,C):v.projectionMatrix.copy(E.projectionMatrix),se(ie,v,_e)};function se(ie,de,Ie){Ie===null?ie.matrix.copy(de.matrixWorld):(ie.matrix.copy(Ie.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(de.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(de.projectionMatrix),ie.projectionMatrixInverse.copy(de.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=_s*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ie){c=ie,d!==null&&(d.fixedFoveation=ie),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ie)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(v)};let le=null;function Ze(ie,de){if(h=de.getViewerPose(l||o),g=de,h!==null){let Ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let _e=!1;Ie.length!==v.cameras.length&&(v.cameras.length=0,_e=!0);for(let Ae=0;Ae<Ie.length;Ae++){let Re=Ie[Ae],st=null;if(f!==null)st=f.getViewport(Re);else{let Rt=u.getViewSubImage(d,Re);st=Rt.viewport,Ae===0&&(e.setRenderTargetTextures(M,Rt.colorTexture,d.ignoreDepthValues?void 0:Rt.depthStencilTexture),e.setRenderTarget(M))}let et=S[Ae];et===void 0&&(et=new Wt,et.layers.enable(Ae),et.viewport=new dt,S[Ae]=et),et.matrix.fromArray(Re.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(Re.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(st.x,st.y,st.width,st.height),Ae===0&&(v.matrix.copy(et.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),_e===!0&&v.cameras.push(et)}let Oe=s.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){let Ae=u.getDepthInformation(Ie[0]);Ae&&Ae.isValid&&Ae.texture&&y.init(e,Ae,s.renderState)}}for(let Ie=0;Ie<b.length;Ie++){let _e=_[Ie],Oe=b[Ie];_e!==null&&Oe!==void 0&&Oe.update(_e,de,l||o)}le&&le(ie,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),g=null}let qe=new Tu;qe.setAnimationLoop(Ze),this.setAnimationLoop=function(ie){le=ie},this.dispose=function(){}}},Ei=new Ln,G0=new Xe;function W0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Au(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,b,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),b=M.envMap,_=M.envMapRotation;b&&(m.envMap.value=b,Ei.copy(_),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),m.envMapRotation.value.setFromMatrix4(G0.makeRotationFromEuler(Ei)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function X0(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){let _=b.program;n.uniformBlockBinding(M,_)}function l(M,b){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));let N=b.program;n.updateUBOMapping(M,N);let T=e.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function h(M){let b=u();M.__bindingPointIndex=b;let _=i.createBuffer(),N=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,N,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let b=s[M.id],_=M.uniforms,N=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,E=_.length;T<E;T++){let C=Array.isArray(_[T])?_[T]:[_[T]];for(let S=0,v=C.length;S<v;S++){let P=C[S];if(f(P,T,S,N)===!0){let X=P.__offset,B=Array.isArray(P.value)?P.value:[P.value],Z=0;for(let ae=0;ae<B.length;ae++){let j=B[ae],ce=y(j);typeof j=="number"||typeof j=="boolean"?(P.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,X+Z,P.__data)):j.isMatrix3?(P.__data[0]=j.elements[0],P.__data[1]=j.elements[1],P.__data[2]=j.elements[2],P.__data[3]=0,P.__data[4]=j.elements[3],P.__data[5]=j.elements[4],P.__data[6]=j.elements[5],P.__data[7]=0,P.__data[8]=j.elements[6],P.__data[9]=j.elements[7],P.__data[10]=j.elements[8],P.__data[11]=0):(j.toArray(P.__data,Z),Z+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,X,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,b,_,N){let T=M.value,E=b+"_"+_;if(N[E]===void 0)return typeof T=="number"||typeof T=="boolean"?N[E]=T:N[E]=T.clone(),!0;{let C=N[E];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return N[E]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function g(M){let b=M.uniforms,_=0,N=16;for(let E=0,C=b.length;E<C;E++){let S=Array.isArray(b[E])?b[E]:[b[E]];for(let v=0,P=S.length;v<P;v++){let X=S[v],B=Array.isArray(X.value)?X.value:[X.value];for(let Z=0,ae=B.length;Z<ae;Z++){let j=B[Z],ce=y(j),L=_%N,ee=L%ce.boundary,se=L+ee;_+=ee,se!==0&&N-se<ce.storage&&(_+=N-se),X.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=_,_+=ce.storage}}}let T=_%N;return T>0&&(_+=N-T),M.__size=_,M.__cache={},this}function y(M){let b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){let b=M.target;b.removeEventListener("dispose",m);let _=o.indexOf(b.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var oo=class{constructor(e={}){let{canvas:t=Zd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,p=null,M=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Et,this.toneMapping=wn,this.toneMappingExposure=1;let _=this,N=!1,T=0,E=0,C=null,S=-1,v=null,P=new dt,X=new dt,B=null,Z=new We(0),ae=0,j=t.width,ce=t.height,L=1,ee=null,se=null,le=new dt(0,0,j,ce),Ze=new dt(0,0,j,ce),qe=!1,ie=new Ys,de=!1,Ie=!1,_e=new Xe,Oe=new Xe,Ae=new I,Re=new dt,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function Rt(){return C===null?L:1}let V=n;function Lt(w,G){return t.getContext(w,G)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gc}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",be,!1),V===null){let G="webgl2";if(V=Lt(G,w),V===null)throw Lt(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let tt,nt,Fe,xt,He,R,x,F,oe,te,ne,Se,ve,ge,ct,ue,Te,Ge,Ve,Ee,Ke,Ne,yt,U;function xe(){tt=new ag(V),tt.init(),Ne=new z0(V,tt),nt=new tg(V,tt,e,Ne),Fe=new O0(V,tt),nt.reverseDepthBuffer&&d&&Fe.buffers.depth.setReversed(!0),xt=new hg(V),He=new S0,R=new B0(V,tt,Fe,He,nt,Ne,xt),x=new ig(_),F=new og(_),oe=new _f(V),yt=new Qm(V,oe),te=new cg(V,oe,xt,yt),ne=new dg(V,te,oe,xt),Ve=new ug(V,nt,R),ue=new ng(He),Se=new b0(_,x,F,tt,nt,yt,ue),ve=new W0(_,He),ge=new A0,ct=new P0(tt),Ge=new jm(_,x,F,Fe,ne,f,c),Te=new N0(_,ne,nt),U=new X0(V,xt,nt,Fe),Ee=new eg(V,tt,xt),Ke=new lg(V,tt,xt),xt.programs=Se.programs,_.capabilities=nt,_.extensions=tt,_.properties=He,_.renderLists=ge,_.shadowMap=Te,_.state=Fe,_.info=xt}xe();let K=new vc(_,V);this.xr=K,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){let w=tt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=tt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return L},this.setPixelRatio=function(w){w!==void 0&&(L=w,this.setSize(j,ce,!1))},this.getSize=function(w){return w.set(j,ce)},this.setSize=function(w,G,Y=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=w,ce=G,t.width=Math.floor(w*L),t.height=Math.floor(G*L),Y===!0&&(t.style.width=w+"px",t.style.height=G+"px"),this.setViewport(0,0,w,G)},this.getDrawingBufferSize=function(w){return w.set(j*L,ce*L).floor()},this.setDrawingBufferSize=function(w,G,Y){j=w,ce=G,L=Y,t.width=Math.floor(w*Y),t.height=Math.floor(G*Y),this.setViewport(0,0,w,G)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(le)},this.setViewport=function(w,G,Y,J){w.isVector4?le.set(w.x,w.y,w.z,w.w):le.set(w,G,Y,J),Fe.viewport(P.copy(le).multiplyScalar(L).round())},this.getScissor=function(w){return w.copy(Ze)},this.setScissor=function(w,G,Y,J){w.isVector4?Ze.set(w.x,w.y,w.z,w.w):Ze.set(w,G,Y,J),Fe.scissor(X.copy(Ze).multiplyScalar(L).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(w){Fe.setScissorTest(qe=w)},this.setOpaqueSort=function(w){ee=w},this.setTransparentSort=function(w){se=w},this.getClearColor=function(w){return w.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(w=!0,G=!0,Y=!0){let J=0;if(w){let H=!1;if(C!==null){let fe=C.texture.format;H=fe===jc||fe===Jc||fe===Kc}if(H){let fe=C.texture.type,me=fe===qn||fe===Di||fe===Ws||fe===fs||fe===Yc||fe===Zc,Le=Ge.getClearColor(),Ce=Ge.getClearAlpha(),Ye=Le.r,$e=Le.g,De=Le.b;me?(g[0]=Ye,g[1]=$e,g[2]=De,g[3]=Ce,V.clearBufferuiv(V.COLOR,0,g)):(y[0]=Ye,y[1]=$e,y[2]=De,y[3]=Ce,V.clearBufferiv(V.COLOR,0,y))}else J|=V.COLOR_BUFFER_BIT}G&&(J|=V.DEPTH_BUFFER_BIT),Y&&(J|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",be,!1),ge.dispose(),ct.dispose(),He.dispose(),x.dispose(),F.dispose(),ne.dispose(),yt.dispose(),U.dispose(),Se.dispose(),K.dispose(),K.removeEventListener("sessionstart",hr),K.removeEventListener("sessionend",xi),_n.stop()};function Q(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;let w=xt.autoReset,G=Te.enabled,Y=Te.autoUpdate,J=Te.needsUpdate,H=Te.type;xe(),xt.autoReset=w,Te.enabled=G,Te.autoUpdate=Y,Te.needsUpdate=J,Te.type=H}function be(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Be(w){let G=w.target;G.removeEventListener("dispose",Be),St(G)}function St(w){vt(w),He.remove(w)}function vt(w){let G=He.get(w).programs;G!==void 0&&(G.forEach(function(Y){Se.releaseProgram(Y)}),w.isShaderMaterial&&Se.releaseShaderCache(w))}this.renderBufferDirect=function(w,G,Y,J,H,fe){G===null&&(G=st);let me=H.isMesh&&H.matrixWorld.determinant()<0,Le=Ss(w,G,Y,J,H);Fe.setMaterial(J,me);let Ce=Y.index,Ye=1;if(J.wireframe===!0){if(Ce=te.getWireframeAttribute(Y),Ce===void 0)return;Ye=2}let $e=Y.drawRange,De=Y.attributes.position,rt=$e.start*Ye,ht=($e.start+$e.count)*Ye;fe!==null&&(rt=Math.max(rt,fe.start*Ye),ht=Math.min(ht,(fe.start+fe.count)*Ye)),Ce!==null?(rt=Math.max(rt,0),ht=Math.min(ht,Ce.count)):De!=null&&(rt=Math.max(rt,0),ht=Math.min(ht,De.count));let Mt=ht-rt;if(Mt<0||Mt===1/0)return;yt.setup(H,J,Le,Y,Ce);let Gt,ut=Ee;if(Ce!==null&&(Gt=oe.get(Ce),ut=Ke,ut.setIndex(Gt)),H.isMesh)J.wireframe===!0?(Fe.setLineWidth(J.wireframeLinewidth*Rt()),ut.setMode(V.LINES)):ut.setMode(V.TRIANGLES);else if(H.isLine){let A=J.linewidth;A===void 0&&(A=1),Fe.setLineWidth(A*Rt()),H.isLineSegments?ut.setMode(V.LINES):H.isLineLoop?ut.setMode(V.LINE_LOOP):ut.setMode(V.LINE_STRIP)}else H.isPoints?ut.setMode(V.POINTS):H.isSprite&&ut.setMode(V.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ut.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))ut.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let A=H._multiDrawStarts,k=H._multiDrawCounts,$=H._multiDrawCount,z=Ce?oe.get(Ce).bytesPerElement:1,D=He.get(J).currentProgram.getUniforms();for(let W=0;W<$;W++)D.setValue(V,"_gl_DrawID",W),ut.render(A[W]/z,k[W])}else if(H.isInstancedMesh)ut.renderInstances(rt,Mt,H.count);else if(Y.isInstancedBufferGeometry){let A=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,k=Math.min(Y.instanceCount,A);ut.renderInstances(rt,Mt,k)}else ut.render(rt,Mt)};function lt(w,G,Y){w.transparent===!0&&w.side===Dt&&w.forceSinglePass===!1?(w.side=tn,w.needsUpdate=!0,Hi(w,G,Y),w.side=Pn,w.needsUpdate=!0,Hi(w,G,Y),w.side=Dt):Hi(w,G,Y)}this.compile=function(w,G,Y=null){Y===null&&(Y=w),p=ct.get(Y),p.init(G),b.push(p),Y.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),w!==Y&&w.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();let J=new Set;return w.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let fe=H.material;if(fe)if(Array.isArray(fe))for(let me=0;me<fe.length;me++){let Le=fe[me];lt(Le,Y,H),J.add(Le)}else lt(fe,Y,H),J.add(fe)}),b.pop(),p=null,J},this.compileAsync=function(w,G,Y=null){let J=this.compile(w,G,Y);return new Promise(H=>{function fe(){if(J.forEach(function(me){He.get(me).currentProgram.isReady()&&J.delete(me)}),J.size===0){H(w);return}setTimeout(fe,10)}tt.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Vt=null;function gn(w){Vt&&Vt(w)}function hr(){_n.stop()}function xi(){_n.start()}let _n=new Tu;_n.setAnimationLoop(gn),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(w){Vt=w,K.setAnimationLoop(w),w===null?_n.stop():_n.start()},K.addEventListener("sessionstart",hr),K.addEventListener("sessionend",xi),this.render=function(w,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(G),G=K.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,G,C),p=ct.get(w,b.length),p.init(G),b.push(p),Oe.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ie.setFromProjectionMatrix(Oe),Ie=this.localClippingEnabled,de=ue.init(this.clippingPlanes,Ie),m=ge.get(w,M.length),m.init(),M.push(m),K.enabled===!0&&K.isPresenting===!0){let fe=_.xr.getDepthSensingMesh();fe!==null&&zi(fe,G,-1/0,_.sortObjects)}zi(w,G,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ee,se),et=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,et&&Ge.addToRenderList(m,w),this.info.render.frame++,de===!0&&ue.beginShadows();let Y=p.state.shadowsArray;Te.render(Y,w,G),de===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();let J=m.opaque,H=m.transmissive;if(p.setupLights(),G.isArrayCamera){let fe=G.cameras;if(H.length>0)for(let me=0,Le=fe.length;me<Le;me++){let Ce=fe[me];ur(J,H,w,Ce)}et&&Ge.render(w);for(let me=0,Le=fe.length;me<Le;me++){let Ce=fe[me];yi(m,w,Ce,Ce.viewport)}}else H.length>0&&ur(J,H,w,G),et&&Ge.render(w),yi(m,w,G);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(_,w,G),yt.resetDefaultState(),S=-1,v=null,b.pop(),b.length>0?(p=b[b.length-1],de===!0&&ue.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function zi(w,G,Y,J){if(w.visible===!1)return;if(w.layers.test(G.layers)){if(w.isGroup)Y=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(G);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ie.intersectsSprite(w)){J&&Re.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Oe);let me=ne.update(w),Le=w.material;Le.visible&&m.push(w,me,Le,Y,Re.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ie.intersectsObject(w))){let me=ne.update(w),Le=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Re.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Re.copy(me.boundingSphere.center)),Re.applyMatrix4(w.matrixWorld).applyMatrix4(Oe)),Array.isArray(Le)){let Ce=me.groups;for(let Ye=0,$e=Ce.length;Ye<$e;Ye++){let De=Ce[Ye],rt=Le[De.materialIndex];rt&&rt.visible&&m.push(w,me,rt,Y,Re.z,De)}}else Le.visible&&m.push(w,me,Le,Y,Re.z,null)}}let fe=w.children;for(let me=0,Le=fe.length;me<Le;me++)zi(fe[me],G,Y,J)}function yi(w,G,Y,J){let H=w.opaque,fe=w.transmissive,me=w.transparent;p.setupLightsView(Y),de===!0&&ue.setGlobalState(_.clippingPlanes,Y),J&&Fe.viewport(P.copy(J)),H.length>0&&vi(H,G,Y),fe.length>0&&vi(fe,G,Y),me.length>0&&vi(me,G,Y),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function ur(w,G,Y,J){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Yn(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?or:qn,minFilter:In,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));let fe=p.state.transmissionRenderTarget[J.id],me=J.viewport||P;fe.setSize(me.z,me.w);let Le=_.getRenderTarget();_.setRenderTarget(fe),_.getClearColor(Z),ae=_.getClearAlpha(),ae<1&&_.setClearColor(16777215,.5),_.clear(),et&&Ge.render(Y);let Ce=_.toneMapping;_.toneMapping=wn;let Ye=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),de===!0&&ue.setGlobalState(_.clippingPlanes,J),vi(w,Y,J),R.updateMultisampleRenderTarget(fe),R.updateRenderTargetMipmap(fe),tt.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let De=0,rt=G.length;De<rt;De++){let ht=G[De],Mt=ht.object,Gt=ht.geometry,ut=ht.material,A=ht.group;if(ut.side===Dt&&Mt.layers.test(J.layers)){let k=ut.side;ut.side=tn,ut.needsUpdate=!0,ki(Mt,Y,J,Gt,ut,A),ut.side=k,ut.needsUpdate=!0,$e=!0}}$e===!0&&(R.updateMultisampleRenderTarget(fe),R.updateRenderTargetMipmap(fe))}_.setRenderTarget(Le),_.setClearColor(Z,ae),Ye!==void 0&&(J.viewport=Ye),_.toneMapping=Ce}function vi(w,G,Y){let J=G.isScene===!0?G.overrideMaterial:null;for(let H=0,fe=w.length;H<fe;H++){let me=w[H],Le=me.object,Ce=me.geometry,Ye=J===null?me.material:J,$e=me.group;Le.layers.test(Y.layers)&&ki(Le,G,Y,Ce,Ye,$e)}}function ki(w,G,Y,J,H,fe){w.onBeforeRender(_,G,Y,J,H,fe),w.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(_,G,Y,J,w,fe),H.transparent===!0&&H.side===Dt&&H.forceSinglePass===!1?(H.side=tn,H.needsUpdate=!0,_.renderBufferDirect(Y,G,J,H,w,fe),H.side=Pn,H.needsUpdate=!0,_.renderBufferDirect(Y,G,J,H,w,fe),H.side=Dt):_.renderBufferDirect(Y,G,J,H,w,fe),w.onAfterRender(_,G,Y,J,H,fe)}function Hi(w,G,Y){G.isScene!==!0&&(G=st);let J=He.get(w),H=p.state.lights,fe=p.state.shadowsArray,me=H.state.version,Le=Se.getParameters(w,H.state,fe,G,Y),Ce=Se.getProgramCacheKey(Le),Ye=J.programs;J.environment=w.isMeshStandardMaterial?G.environment:null,J.fog=G.fog,J.envMap=(w.isMeshStandardMaterial?F:x).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?G.environmentRotation:w.envMapRotation,Ye===void 0&&(w.addEventListener("dispose",Be),Ye=new Map,J.programs=Ye);let $e=Ye.get(Ce);if($e!==void 0){if(J.currentProgram===$e&&J.lightsStateVersion===me)return dr(w,Le),$e}else Le.uniforms=Se.getUniforms(w),w.onBeforeCompile(Le,_),$e=Se.acquireProgram(Le,Ce),Ye.set(Ce,$e),J.uniforms=Le.uniforms;let De=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(De.clippingPlanes=ue.uniform),dr(w,Le),J.needsLights=ws(w),J.lightsStateVersion=me,J.needsLights&&(De.ambientLightColor.value=H.state.ambient,De.lightProbe.value=H.state.probe,De.directionalLights.value=H.state.directional,De.directionalLightShadows.value=H.state.directionalShadow,De.spotLights.value=H.state.spot,De.spotLightShadows.value=H.state.spotShadow,De.rectAreaLights.value=H.state.rectArea,De.ltc_1.value=H.state.rectAreaLTC1,De.ltc_2.value=H.state.rectAreaLTC2,De.pointLights.value=H.state.point,De.pointLightShadows.value=H.state.pointShadow,De.hemisphereLights.value=H.state.hemi,De.directionalShadowMap.value=H.state.directionalShadowMap,De.directionalShadowMatrix.value=H.state.directionalShadowMatrix,De.spotShadowMap.value=H.state.spotShadowMap,De.spotLightMatrix.value=H.state.spotLightMatrix,De.spotLightMap.value=H.state.spotLightMap,De.pointShadowMap.value=H.state.pointShadowMap,De.pointShadowMatrix.value=H.state.pointShadowMatrix),J.currentProgram=$e,J.uniformsList=null,$e}function Mi(w){if(w.uniformsList===null){let G=w.currentProgram.getUniforms();w.uniformsList=ls.seqWithValue(G.seq,w.uniforms)}return w.uniformsList}function dr(w,G){let Y=He.get(w);Y.outputColorSpace=G.outputColorSpace,Y.batching=G.batching,Y.batchingColor=G.batchingColor,Y.instancing=G.instancing,Y.instancingColor=G.instancingColor,Y.instancingMorph=G.instancingMorph,Y.skinning=G.skinning,Y.morphTargets=G.morphTargets,Y.morphNormals=G.morphNormals,Y.morphColors=G.morphColors,Y.morphTargetsCount=G.morphTargetsCount,Y.numClippingPlanes=G.numClippingPlanes,Y.numIntersection=G.numClipIntersection,Y.vertexAlphas=G.vertexAlphas,Y.vertexTangents=G.vertexTangents,Y.toneMapping=G.toneMapping}function Ss(w,G,Y,J,H){G.isScene!==!0&&(G=st),R.resetTextureUnits();let fe=G.fog,me=J.isMeshStandardMaterial?G.environment:null,Le=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Kt,Ce=(J.isMeshStandardMaterial?F:x).get(J.envMap||me),Ye=J.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,$e=!!Y.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),De=!!Y.morphAttributes.position,rt=!!Y.morphAttributes.normal,ht=!!Y.morphAttributes.color,Mt=wn;J.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Mt=_.toneMapping);let Gt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ut=Gt!==void 0?Gt.length:0,A=He.get(J),k=p.state.lights;if(de===!0&&(Ie===!0||w!==v)){let he=w===v&&J.id===S;ue.setState(J,w,he)}let $=!1;J.version===A.__version?(A.needsLights&&A.lightsStateVersion!==k.state.version||A.outputColorSpace!==Le||H.isBatchedMesh&&A.batching===!1||!H.isBatchedMesh&&A.batching===!0||H.isBatchedMesh&&A.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&A.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&A.instancing===!1||!H.isInstancedMesh&&A.instancing===!0||H.isSkinnedMesh&&A.skinning===!1||!H.isSkinnedMesh&&A.skinning===!0||H.isInstancedMesh&&A.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&A.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&A.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&A.instancingMorph===!1&&H.morphTexture!==null||A.envMap!==Ce||J.fog===!0&&A.fog!==fe||A.numClippingPlanes!==void 0&&(A.numClippingPlanes!==ue.numPlanes||A.numIntersection!==ue.numIntersection)||A.vertexAlphas!==Ye||A.vertexTangents!==$e||A.morphTargets!==De||A.morphNormals!==rt||A.morphColors!==ht||A.toneMapping!==Mt||A.morphTargetsCount!==ut)&&($=!0):($=!0,A.__version=J.version);let z=A.currentProgram;$===!0&&(z=Hi(J,G,H));let D=!1,W=!1,O=!1,q=z.getUniforms(),re=A.uniforms;if(Fe.useProgram(z.program)&&(D=!0,W=!0,O=!0),J.id!==S&&(S=J.id,W=!0),D||v!==w){Fe.buffers.depth.getReversed()?(_e.copy(w.projectionMatrix),Kd(_e),Jd(_e),q.setValue(V,"projectionMatrix",_e)):q.setValue(V,"projectionMatrix",w.projectionMatrix),q.setValue(V,"viewMatrix",w.matrixWorldInverse);let Pe=q.map.cameraPosition;Pe!==void 0&&Pe.setValue(V,Ae.setFromMatrixPosition(w.matrixWorld)),nt.logarithmicDepthBuffer&&q.setValue(V,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&q.setValue(V,"isOrthographic",w.isOrthographicCamera===!0),v!==w&&(v=w,W=!0,O=!0)}if(H.isSkinnedMesh){q.setOptional(V,H,"bindMatrix"),q.setOptional(V,H,"bindMatrixInverse");let he=H.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),q.setValue(V,"boneTexture",he.boneTexture,R))}H.isBatchedMesh&&(q.setOptional(V,H,"batchingTexture"),q.setValue(V,"batchingTexture",H._matricesTexture,R),q.setOptional(V,H,"batchingIdTexture"),q.setValue(V,"batchingIdTexture",H._indirectTexture,R),q.setOptional(V,H,"batchingColorTexture"),H._colorsTexture!==null&&q.setValue(V,"batchingColorTexture",H._colorsTexture,R));let pe=Y.morphAttributes;if((pe.position!==void 0||pe.normal!==void 0||pe.color!==void 0)&&Ve.update(H,Y,z),(W||A.receiveShadow!==H.receiveShadow)&&(A.receiveShadow=H.receiveShadow,q.setValue(V,"receiveShadow",H.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(re.envMap.value=Ce,re.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&G.environment!==null&&(re.envMapIntensity.value=G.environmentIntensity),W&&(q.setValue(V,"toneMappingExposure",_.toneMappingExposure),A.needsLights&&Rn(re,O),fe&&J.fog===!0&&ve.refreshFogUniforms(re,fe),ve.refreshMaterialUniforms(re,J,L,ce,p.state.transmissionRenderTarget[w.id]),ls.upload(V,Mi(A),re,R)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ls.upload(V,Mi(A),re,R),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&q.setValue(V,"center",H.center),q.setValue(V,"modelViewMatrix",H.modelViewMatrix),q.setValue(V,"normalMatrix",H.normalMatrix),q.setValue(V,"modelMatrix",H.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){let he=J.uniformsGroups;for(let Pe=0,Ue=he.length;Pe<Ue;Pe++){let ze=he[Pe];U.update(ze,z),U.bind(ze,z)}}return z}function Rn(w,G){w.ambientLightColor.needsUpdate=G,w.lightProbe.needsUpdate=G,w.directionalLights.needsUpdate=G,w.directionalLightShadows.needsUpdate=G,w.pointLights.needsUpdate=G,w.pointLightShadows.needsUpdate=G,w.spotLights.needsUpdate=G,w.spotLightShadows.needsUpdate=G,w.rectAreaLights.needsUpdate=G,w.hemisphereLights.needsUpdate=G}function ws(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,G,Y){He.get(w.texture).__webglTexture=G,He.get(w.depthTexture).__webglTexture=Y;let J=He.get(w);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Y===void 0,J.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,G){let Y=He.get(w);Y.__webglFramebuffer=G,Y.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(w,G=0,Y=0){C=w,T=G,E=Y;let J=!0,H=null,fe=!1,me=!1;if(w){let Ce=He.get(w);if(Ce.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(V.FRAMEBUFFER,null),J=!1;else if(Ce.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(Ce.__hasExternalTextures)R.rebindTextures(w,He.get(w.texture).__webglTexture,He.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let De=w.depthTexture;if(Ce.__boundDepthTexture!==De){if(De!==null&&He.has(De)&&(w.width!==De.image.width||w.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}let Ye=w.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(me=!0);let $e=He.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($e[G])?H=$e[G][Y]:H=$e[G],fe=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?H=He.get(w).__webglMultisampledFramebuffer:Array.isArray($e)?H=$e[Y]:H=$e,P.copy(w.viewport),X.copy(w.scissor),B=w.scissorTest}else P.copy(le).multiplyScalar(L).floor(),X.copy(Ze).multiplyScalar(L).floor(),B=qe;if(Fe.bindFramebuffer(V.FRAMEBUFFER,H)&&J&&Fe.drawBuffers(w,H),Fe.viewport(P),Fe.scissor(X),Fe.setScissorTest(B),fe){let Ce=He.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ce.__webglTexture,Y)}else if(me){let Ce=He.get(w.texture),Ye=G||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ce.__webglTexture,Y||0,Ye)}S=-1},this.readRenderTargetPixels=function(w,G,Y,J,H,fe,me){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=He.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Le=Le[me]),Le){Fe.bindFramebuffer(V.FRAMEBUFFER,Le);try{let Ce=w.texture,Ye=Ce.format,$e=Ce.type;if(!nt.textureFormatReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=w.width-J&&Y>=0&&Y<=w.height-H&&V.readPixels(G,Y,J,H,Ne.convert(Ye),Ne.convert($e),fe)}finally{let Ce=C!==null?He.get(C).__webglFramebuffer:null;Fe.bindFramebuffer(V.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(w,G,Y,J,H,fe,me){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=He.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Le=Le[me]),Le){let Ce=w.texture,Ye=Ce.format,$e=Ce.type;if(!nt.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=w.width-J&&Y>=0&&Y<=w.height-H){Fe.bindFramebuffer(V.FRAMEBUFFER,Le);let De=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,De),V.bufferData(V.PIXEL_PACK_BUFFER,fe.byteLength,V.STREAM_READ),V.readPixels(G,Y,J,H,Ne.convert(Ye),Ne.convert($e),0);let rt=C!==null?He.get(C).__webglFramebuffer:null;Fe.bindFramebuffer(V.FRAMEBUFFER,rt);let ht=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await $d(V,ht,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,De),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,fe),V.deleteBuffer(De),V.deleteSync(ht),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,G=null,Y=0){w.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1]);let J=Math.pow(2,-Y),H=Math.floor(w.image.width*J),fe=Math.floor(w.image.height*J),me=G!==null?G.x:0,Le=G!==null?G.y:0;R.setTexture2D(w,0),V.copyTexSubImage2D(V.TEXTURE_2D,Y,0,0,me,Le,H,fe),Fe.unbindTexture()},this.copyTextureToTexture=function(w,G,Y=null,J=null,H=0){w.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,w=arguments[1],G=arguments[2],H=arguments[3]||0,Y=null);let fe,me,Le,Ce,Ye,$e,De,rt,ht,Mt=w.isCompressedTexture?w.mipmaps[H]:w.image;Y!==null?(fe=Y.max.x-Y.min.x,me=Y.max.y-Y.min.y,Le=Y.isBox3?Y.max.z-Y.min.z:1,Ce=Y.min.x,Ye=Y.min.y,$e=Y.isBox3?Y.min.z:0):(fe=Mt.width,me=Mt.height,Le=Mt.depth||1,Ce=0,Ye=0,$e=0),J!==null?(De=J.x,rt=J.y,ht=J.z):(De=0,rt=0,ht=0);let Gt=Ne.convert(G.format),ut=Ne.convert(G.type),A;G.isData3DTexture?(R.setTexture3D(G,0),A=V.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(R.setTexture2DArray(G,0),A=V.TEXTURE_2D_ARRAY):(R.setTexture2D(G,0),A=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,G.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,G.unpackAlignment);let k=V.getParameter(V.UNPACK_ROW_LENGTH),$=V.getParameter(V.UNPACK_IMAGE_HEIGHT),z=V.getParameter(V.UNPACK_SKIP_PIXELS),D=V.getParameter(V.UNPACK_SKIP_ROWS),W=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,Mt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Mt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Ce),V.pixelStorei(V.UNPACK_SKIP_ROWS,Ye),V.pixelStorei(V.UNPACK_SKIP_IMAGES,$e);let O=w.isDataArrayTexture||w.isData3DTexture,q=G.isDataArrayTexture||G.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let re=He.get(w),pe=He.get(G),he=He.get(re.__renderTarget),Pe=He.get(pe.__renderTarget);Fe.bindFramebuffer(V.READ_FRAMEBUFFER,he.__webglFramebuffer),Fe.bindFramebuffer(V.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Ue=0;Ue<Le;Ue++)O&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,He.get(w).__webglTexture,H,$e+Ue),w.isDepthTexture?(q&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,He.get(G).__webglTexture,H,ht+Ue),V.blitFramebuffer(Ce,Ye,fe,me,De,rt,fe,me,V.DEPTH_BUFFER_BIT,V.NEAREST)):q?V.copyTexSubImage3D(A,H,De,rt,ht+Ue,Ce,Ye,fe,me):V.copyTexSubImage2D(A,H,De,rt,ht+Ue,Ce,Ye,fe,me);Fe.bindFramebuffer(V.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else q?w.isDataTexture||w.isData3DTexture?V.texSubImage3D(A,H,De,rt,ht,fe,me,Le,Gt,ut,Mt.data):G.isCompressedArrayTexture?V.compressedTexSubImage3D(A,H,De,rt,ht,fe,me,Le,Gt,Mt.data):V.texSubImage3D(A,H,De,rt,ht,fe,me,Le,Gt,ut,Mt):w.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,H,De,rt,fe,me,Gt,ut,Mt.data):w.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,H,De,rt,Mt.width,Mt.height,Gt,Mt.data):V.texSubImage2D(V.TEXTURE_2D,H,De,rt,fe,me,Gt,ut,Mt);V.pixelStorei(V.UNPACK_ROW_LENGTH,k),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,$),V.pixelStorei(V.UNPACK_SKIP_PIXELS,z),V.pixelStorei(V.UNPACK_SKIP_ROWS,D),V.pixelStorei(V.UNPACK_SKIP_IMAGES,W),H===0&&G.generateMipmaps&&V.generateMipmap(A),Fe.unbindTexture()},this.copyTextureToTexture3D=function(w,G,Y=null,J=null,H=0){return w.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,J=arguments[1]||null,w=arguments[2],G=arguments[3],H=arguments[4]||0),Ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,G,Y,J,H)},this.initRenderTarget=function(w){He.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Fe.unbindTexture()},this.resetState=function(){T=0,E=0,C=null,Fe.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var ao=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Zs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=sc,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Jt=new I,$s=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Fh=new I,Bh=new dt,zh=new dt,q0=new I,kh=new Xe,Or=new I,fa=new rn,Hh=new Xe,pa=new Ni,co=class extends gt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kl,this.bindMatrix=new Xe,this.bindMatrixInverse=new Xe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new un),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Or),this.boundingBox.expandByPoint(Or)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new rn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Or),this.boundingSphere.expandByPoint(Or)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fa.copy(this.boundingSphere),fa.applyMatrix4(s),e.ray.intersectsSphere(fa)!==!1&&(Hh.copy(s).invert(),pa.copy(e.ray).applyMatrix4(Hh),!(this.boundingBox!==null&&pa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,pa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===kl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Bh.fromBufferAttribute(s.attributes.skinIndex,e),zh.fromBufferAttribute(s.attributes.skinWeight,e),Fh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=zh.getComponent(r);if(o!==0){let a=Bh.getComponent(r);kh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(q0.copy(Fh).applyMatrix4(kh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ks=class extends Pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},lo=class extends Xt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=$t,h=$t,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vh=new Xe,Y0=new Xe,ho=class i{constructor(e=[],t=[]){this.uuid=hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Xe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Xe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Y0;Vh.multiplyMatrices(a,t[r]),Vh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new lo(t,e,e,ln,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ks),this.bones.push(o),this.boneInverses.push(new Xe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Ui=class extends Ft{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ns=new Xe,Gh=new Xe,Fr=[],Wh=new un,Z0=new Xe,Is=new gt,Ps=new rn,En=class extends gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Z0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new un),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Wh.copy(e.boundingBox).applyMatrix4(ns),this.boundingBox.union(Wh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new rn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Ps.copy(e.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Ps)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Is.geometry=this.geometry,Is.material=this.material,Is.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ps.copy(this.boundingSphere),Ps.applyMatrix4(n),e.ray.intersectsSphere(Ps)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ns),Gh.multiplyMatrices(n,ns),Is.matrixWorld=Gh,Is.raycast(e,Fr);for(let o=0,a=Fr.length;o<a;o++){let c=Fr[o];c.instanceId=r,c.object=this,t.push(c)}Fr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lo(new Float32Array(s*this.count),s,this.count,$c,Sn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Nn=class extends on{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},uo=new I,fo=new I,Xh=new Xe,Ls=new Ni,Br=new rn,ma=new I,qh=new I,hi=class extends Pt{constructor(e=new _t,t=new Nn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)uo.fromBufferAttribute(t,s-1),fo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=uo.distanceTo(fo);e.setAttribute("lineDistance",new at(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,e.ray.intersectsSphere(Br)===!1)return;Xh.copy(s).invert(),Ls.copy(e.ray).applyMatrix4(Xh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=l){let p=h.getX(y),M=h.getX(y+1),b=zr(this,e,Ls,c,p,M);b&&t.push(b)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(f),p=zr(this,e,Ls,c,y,m);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=l){let p=zr(this,e,Ls,c,y,y+1);p&&t.push(p)}if(this.isLineLoop){let y=zr(this,e,Ls,c,g-1,f);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zr(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(uo.fromBufferAttribute(o,s),fo.fromBufferAttribute(o,r),t.distanceSqToSegment(uo,fo,ma,qh)>n)return;ma.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ma);if(!(c<e.near||c>e.far))return{distance:c,point:qh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Yh=new I,Zh=new I,Oi=class extends hi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Yh.fromBufferAttribute(t,s),Zh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yh.distanceTo(Zh);e.setAttribute("lineDistance",new at(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},po=class extends hi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Js=class extends on{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$h=new Xe,Mc=new Ni,kr=new rn,Hr=new I,mo=class extends Pt{constructor(e=new _t,t=new Js){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,e.ray.intersectsSphere(kr)===!1)return;$h.copy(s).invert(),Mc.copy(e.ray).applyMatrix4($h);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,y=f;g<y;g++){let m=l.getX(g);Hr.fromBufferAttribute(u,m),Kh(Hr,m,c,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,y=f;g<y;g++)Hr.fromBufferAttribute(u,g),Kh(Hr,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Kh(i,e,t,n,s,r,o){let a=Mc.distanceSqToPoint(i);if(a<t){let c=new I;Mc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new we:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new I,s=[],r=[],o=[],a=new I,c=new Xe;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ht(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ht(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},js=class extends dn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new we){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},bc=class extends js{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function tl(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Vr=new I,ga=new tl,_a=new tl,xa=new tl,Sc=class extends dn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Vr.subVectors(s[0],s[1]).add(s[0]),l=Vr);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Vr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),ga.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,y,m),_a.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,y,m),xa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(ga.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),_a.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),xa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(ga.calc(c),_a.calc(c),xa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Jh(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function $0(i,e){let t=1-i;return t*t*e}function K0(i,e){return 2*(1-i)*i*e}function J0(i,e){return i*i*e}function ks(i,e,t,n){return $0(i,e)+K0(i,t)+J0(i,n)}function j0(i,e){let t=1-i;return t*t*t*e}function Q0(i,e){let t=1-i;return 3*t*t*i*e}function e_(i,e){return 3*(1-i)*i*i*e}function t_(i,e){return i*i*i*e}function Hs(i,e,t,n,s){return j0(i,e)+Q0(i,t)+e_(i,n)+t_(i,s)}var go=class extends dn{constructor(e=new we,t=new we,n=new we,s=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new we){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(e,s.x,r.x,o.x,a.x),Hs(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wc=class extends dn{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(e,s.x,r.x,o.x,a.x),Hs(e,s.y,r.y,o.y,a.y),Hs(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},_o=class extends dn{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ac=class extends dn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xo=class extends dn{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(e,s.x,r.x,o.x),ks(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tc=class extends dn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(e,s.x,r.x,o.x),ks(e,s.y,r.y,o.y),ks(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Jh(a,c.x,l.x,h.x,u.x),Jh(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new we().fromArray(s))}return this}},jh=Object.freeze({__proto__:null,ArcCurve:bc,CatmullRomCurve3:Sc,CubicBezierCurve:go,CubicBezierCurve3:wc,EllipseCurve:js,LineCurve:_o,LineCurve3:Ac,QuadraticBezierCurve:xo,QuadraticBezierCurve3:Tc,SplineCurve:yo}),Ec=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new jh[s.type]().fromJSON(s))}return this}},vo=class extends Ec{constructor(e){super(),this.type="Path",this.currentPoint=new we,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new _o(this.currentPoint.clone(),new we(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new xo(this.currentPoint.clone(),new we(e,t),new we(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new go(this.currentPoint.clone(),new we(e,t),new we(n,s),new we(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new yo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new js(e,t,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var ui=class i extends _t{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,y=[],m=n/2,p=0;M(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new at(u,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(f,2));function M(){let _=new I,N=new I,T=0,E=(t-e)/n;for(let C=0;C<=r;C++){let S=[],v=C/r,P=v*(t-e)+e;for(let X=0;X<=s;X++){let B=X/s,Z=B*c+a,ae=Math.sin(Z),j=Math.cos(Z);N.x=P*ae,N.y=-v*n+m,N.z=P*j,u.push(N.x,N.y,N.z),_.set(ae,E,j).normalize(),d.push(_.x,_.y,_.z),f.push(B,1-v),S.push(g++)}y.push(S)}for(let C=0;C<s;C++)for(let S=0;S<r;S++){let v=y[S][C],P=y[S+1][C],X=y[S+1][C+1],B=y[S][C+1];(e>0||S!==0)&&(h.push(v,P,B),T+=3),(t>0||S!==r-1)&&(h.push(P,X,B),T+=3)}l.addGroup(p,T,0),p+=T}function b(_){let N=g,T=new we,E=new I,C=0,S=_===!0?e:t,v=_===!0?1:-1;for(let X=1;X<=s;X++)u.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;let P=g;for(let X=0;X<=s;X++){let Z=X/s*c+a,ae=Math.cos(Z),j=Math.sin(Z);E.x=S*j,E.y=m*v,E.z=S*ae,u.push(E.x,E.y,E.z),d.push(0,v,0),T.x=ae*.5+.5,T.y=j*.5*v+.5,f.push(T.x,T.y),g++}for(let X=0;X<s;X++){let B=N+X,Z=P+X;_===!0?h.push(Z,Z+1,B):h.push(Z+1,Z,B),C+=3}l.addGroup(p,C,_===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Rc=class i extends _t{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new at(r,3)),this.setAttribute("normal",new at(r.slice(),3)),this.setAttribute("uv",new at(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let b=new I,_=new I,N=new I;for(let T=0;T<t.length;T+=3)f(t[T+0],b),f(t[T+1],_),f(t[T+2],N),c(b,_,N,M)}function c(M,b,_,N){let T=N+1,E=[];for(let C=0;C<=T;C++){E[C]=[];let S=M.clone().lerp(_,C/T),v=b.clone().lerp(_,C/T),P=T-C;for(let X=0;X<=P;X++)X===0&&C===T?E[C][X]=S:E[C][X]=S.clone().lerp(v,X/P)}for(let C=0;C<T;C++)for(let S=0;S<2*(T-C)-1;S++){let v=Math.floor(S/2);S%2===0?(d(E[C][v+1]),d(E[C+1][v]),d(E[C][v])):(d(E[C][v+1]),d(E[C+1][v+1]),d(E[C+1][v]))}}function l(M){let b=new I;for(let _=0;_<r.length;_+=3)b.x=r[_+0],b.y=r[_+1],b.z=r[_+2],b.normalize().multiplyScalar(M),r[_+0]=b.x,r[_+1]=b.y,r[_+2]=b.z}function h(){let M=new I;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];let _=m(M)/2/Math.PI+.5,N=p(M)/Math.PI+.5;o.push(_,1-N)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){let b=o[M+0],_=o[M+2],N=o[M+4],T=Math.max(b,_,N),E=Math.min(b,_,N);T>.9&&E<.1&&(b<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),N<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,b){let _=M*3;b.x=e[_+0],b.y=e[_+1],b.z=e[_+2]}function g(){let M=new I,b=new I,_=new I,N=new I,T=new we,E=new we,C=new we;for(let S=0,v=0;S<r.length;S+=9,v+=6){M.set(r[S+0],r[S+1],r[S+2]),b.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),T.set(o[v+0],o[v+1]),E.set(o[v+2],o[v+3]),C.set(o[v+4],o[v+5]),N.copy(M).add(b).add(_).divideScalar(3);let P=m(N);y(T,v+0,M,P),y(E,v+2,b,P),y(C,v+4,_,P)}}function y(M,b,_,N){N<0&&M.x===1&&(o[b]=M.x-1),_.x===0&&_.z===0&&(o[b]=N/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Qs=class extends vo{constructor(e){super(e),this.uuid=hn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new vo().fromJSON(s))}return this}},n_={triangulate:function(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Pu(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=a_(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let g=t;g<s;g+=t)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return er(r,o,t,a,c,f,0),o}};function Pu(i,e,t,n,s){let r,o;if(s===x_(i,e,t,n)>0)for(r=e;r<t;r+=n)o=Qh(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=Qh(r,i[r],i[r+1],o);return o&&Oo(o,o.next)&&(nr(o),o=o.next),o}function Fi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Oo(t,t.next)||It(t.prev,t,t.next)===0)){if(nr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function er(i,e,t,n,s,r,o){if(!i)return;!o&&r&&d_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?s_(i,n,s,r):i_(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),nr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=r_(Fi(i),e,t),er(i,e,t,n,s,r,2)):o===2&&o_(i,e,t,n,s,r):er(Fi(i),e,t,n,s,r,1);break}}}function i_(i){let e=i.prev,t=i,n=i.next;if(It(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&rs(s,a,r,c,o,l,g.x,g.y)&&It(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function s_(i,e,t,n){let s=i.prev,r=i,o=i.next;if(It(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,y=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=Cc(f,g,e,t,n),M=Cc(y,m,e,t,n),b=i.prevZ,_=i.nextZ;for(;b&&b.z>=p&&_&&_.z<=M;){if(b.x>=f&&b.x<=y&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&rs(a,h,c,u,l,d,b.x,b.y)&&It(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=f&&_.x<=y&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&rs(a,h,c,u,l,d,_.x,_.y)&&It(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=y&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&rs(a,h,c,u,l,d,b.x,b.y)&&It(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=M;){if(_.x>=f&&_.x<=y&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&rs(a,h,c,u,l,d,_.x,_.y)&&It(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function r_(i,e,t){let n=i;do{let s=n.prev,r=n.next.next;!Oo(s,r)&&Lu(s,n,n.next,r)&&tr(s,r)&&tr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),nr(n),nr(n.next),n=i=r),n=n.next}while(n!==i);return Fi(n)}function o_(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&m_(o,a)){let c=Du(o,a);o=Fi(o,o.next),c=Fi(c,c.next),er(o,e,t,n,s,r,0),er(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function a_(i,e,t,n){let s=[],r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Pu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(p_(l));for(s.sort(c_),r=0;r<s.length;r++)t=l_(s[r],t);return t}function c_(i,e){return i.x-e.x}function l_(i,e){let t=h_(i,e);if(!t)return e;let n=Du(t,i);return Fi(n,n.next),Fi(t,t.next)}function h_(i,e){let t=e,n=-1/0,s,r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){let d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&rs(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),tr(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&u_(s,t)))&&(s=t,h=u)),t=t.next;while(t!==a);return s}function u_(i,e){return It(i.prev,i,e.prev)<0&&It(e.next,i,i.next)<0}function d_(i,e,t,n){let s=i;do s.z===0&&(s.z=Cc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,f_(s)}function f_(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Cc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function p_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function rs(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function m_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!g_(i,e)&&(tr(i,e)&&tr(e,i)&&__(i,e)&&(It(i.prev,i,e.prev)||It(i,e.prev,e))||Oo(i,e)&&It(i.prev,i,i.next)>0&&It(e.prev,e,e.next)>0)}function It(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Oo(i,e){return i.x===e.x&&i.y===e.y}function Lu(i,e,t,n){let s=Wr(It(i,e,t)),r=Wr(It(i,e,n)),o=Wr(It(t,n,i)),a=Wr(It(t,n,e));return!!(s!==r&&o!==a||s===0&&Gr(i,t,e)||r===0&&Gr(i,n,e)||o===0&&Gr(t,i,n)||a===0&&Gr(t,e,n))}function Gr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Wr(i){return i>0?1:i<0?-1:0}function g_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Lu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function tr(i,e){return It(i.prev,i,i.next)<0?It(i,e,i.next)>=0&&It(i,i.prev,e)>=0:It(i,e,i.prev)<0||It(i,i.next,e)<0}function __(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Du(i,e){let t=new Ic(i.i,i.x,i.y),n=new Ic(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Qh(i,e,t,n){let s=new Ic(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function nr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ic(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function x_(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Vs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];eu(e),tu(n,e);let o=e.length;t.forEach(eu);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,tu(n,t[c]);let a=n_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function eu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function tu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ir=class i extends Rc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Mo=class i extends _t{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=e,d=(t-e)/s,f=new I,g=new we;for(let y=0;y<=s;y++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let y=0;y<s;y++){let m=y*(n+1);for(let p=0;p<n;p++){let M=p+m,b=M,_=M+n+1,N=M+n+2,T=M+1;a.push(b,_,T),a.push(_,N,T)}}this.setIndex(a),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},bo=class i extends _t{constructor(e=new Qs([new we(0,.5),new we(-.5,-.5),new we(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new at(s,3)),this.setAttribute("normal",new at(r,3)),this.setAttribute("uv",new at(o,2));function l(h){let u=s.length/3,d=h.extractPoints(t),f=d.shape,g=d.holes;Vs.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){let M=g[m];Vs.isClockWise(M)===!0&&(g[m]=M.reverse())}let y=Vs.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){let M=g[m];f=f.concat(M)}for(let m=0,p=f.length;m<p;m++){let M=f[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=y.length;m<p;m++){let M=y[m],b=M[0]+u,_=M[1]+u,N=M[2]+u;n.push(b,_,N),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return y_(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function y_(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var qt=class extends on{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mu,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},an=class extends qt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var So=class extends Nn{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Xr(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function v_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function M_(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function nu(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Nu(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var di=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Pc=class extends di{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hl,endingEnd:Hl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Vl:r=e,a=2*t-n;break;case Gl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Vl:o=e,c=2*n-t;break;case Gl:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),y=g*g,m=y*g,p=-d*m+2*d*y-d*g,M=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*g+1,b=(-1-f)*m+(1.5+f)*y+.5*g,_=f*m-f*y;for(let N=0;N!==a;++N)r[N]=p*o[h+N]+M*o[l+N]+b*o[c+N]+_*o[u+N];return r}},Lc=class extends di{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Dc=class extends di{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},fn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xr(t,this.TimeBufferType),this.values=Xr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xr(e.times,Array),values:Xr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Dc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Lc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ms:t=this.InterpolantFactoryMethodDiscrete;break;case gs:t=this.InterpolantFactoryMethodLinear;break;case ko:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return gs;case this.InterpolantFactoryMethodSmooth:return ko}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&v_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ko,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let y=t[u+g];if(y!==t[d+g]||y!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=gs;var fi=class extends fn{constructor(e,t,n){super(e,t,n)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=ms;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var wo=class extends fn{};wo.prototype.ValueTypeName="color";var Zn=class extends fn{};Zn.prototype.ValueTypeName="number";var Nc=class extends di{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Qt.slerpFlat(r,0,o,l-a,o,l,c);return r}},$n=class extends fn{InterpolantFactoryMethodLinear(e){return new Nc(this.times,this.values,this.getValueSize(),e)}};$n.prototype.ValueTypeName="quaternion";$n.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends fn{constructor(e,t,n){super(e,t,n)}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=ms;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends fn{};Kn.prototype.ValueTypeName="vector";var Ao=class{constructor(e="",t=-1,n=[],s=Md){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=hn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(S_(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=M_(c);c=nu(c,1,h),l=nu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Zn(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,y){if(f.length!==0){let m=[],p=[];Nu(f,m,p,g),m.length!==0&&y.push(new u(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let y=0;y<d[g].morphTargets.length;y++)f[d[g].morphTargets[y]]=-1;for(let y in f){let m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){let b=d[g];m.push(b.time),p.push(b.morphTarget===y?1:0)}s.push(new Zn(".morphTargetInfluence["+y+"]",m,p))}c=f.length*o}else{let f=".bones["+t[u].name+"]";n(Kn,f+".position",d,"pos",s),n($n,f+".quaternion",d,"rot",s),n(Kn,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function b_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Zn;case"vector":case"vector2":case"vector3":case"vector4":return Kn;case"color":return wo;case"quaternion":return $n;case"bool":case"boolean":return fi;case"string":return pi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function S_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=b_(i.type);if(i.times===void 0){let t=[],n=[];Nu(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var oi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Uc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},w_=new Uc,Jn=class{constructor(e){this.manager=e!==void 0?e:w_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Jn.DEFAULT_MATERIAL_NAME="__DEFAULT";var kn={},Oc=class extends Error{constructor(e,t){super(e),this.response=t}},sr=class extends Jn{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=oi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:n,onError:s});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=kn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,y=0,m=new ReadableStream({start(p){M();function M(){u.read().then(({done:b,value:_})=>{if(b)p.close();else{y+=_.byteLength;let N=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:f});for(let T=0,E=h.length;T<E;T++){let C=h[T];C.onProgress&&C.onProgress(N)}p.enqueue(_),M()}},b=>{p.error(b)})}}});return new Response(m)}else throw new Oc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{oi.add(e,l);let h=kn[e];delete kn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=kn[e];if(h===void 0)throw this.manager.itemError(e),l;delete kn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Fc=class extends Jn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=oi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Xs("img");function c(){h(),oi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var pn=class extends Jn{constructor(e){super(e)}load(e,t,n,s){let r=new Xt,o=new Fc(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ys=class extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},To=class extends ys{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ya=new Xe,iu=new I,su=new I,rr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;iu.setFromMatrixPosition(e.matrixWorld),t.position.copy(iu),su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(su),t.updateMatrixWorld(),ya.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ya),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Bc=class extends rr{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=_s*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Eo=class extends ys{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Bc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ru=new Xe,Ds=new I,va=new I,zc=class extends rr{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ds.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ds),va.copy(n.position),va.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(va),n.updateMatrixWorld(),s.makeTranslation(-Ds.x,-Ds.y,-Ds.z),ru.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ru)}},Ro=class extends ys{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new zc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},kc=class extends rr{constructor(){super(new li(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vs=class extends ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new kc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var mi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Co=class extends Jn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=oi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return oi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),oi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});oi.add(e,c),r.manager.itemStart(e)}};var nl="\\[\\]\\.:\\/",A_=new RegExp("["+nl+"]","g"),il="[^"+nl+"]",T_="[^"+nl.replace("\\.","")+"]",E_=/((?:WC+[\/:])*)/.source.replace("WC",il),R_=/(WCOD+)?/.source.replace("WCOD",T_),C_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",il),I_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",il),P_=new RegExp("^"+E_+R_+C_+I_+"$"),L_=["material","materials","bones","map"],Hc=class{constructor(e,t,n){let s=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Tt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(A_,"")}static parseTrackName(e){let t=P_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);L_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=Hc;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var q_=new Float32Array(1);var ou=new Xe,Io=class{constructor(e,t,n=0,s=1/0){this.ray=new Ni(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new qs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ou.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ou),this}intersectObject(e,t=!0,n=[]){return Vc(e,this,n,t),n.sort(au),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Vc(e[s],this,n,t);return n.sort(au),n}};function au(i,e){return i.distance-e.distance}function Vc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Vc(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gc);function sl(i,e){if(e===vu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===ar||e===Do){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===ar)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var _i=class extends Jn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ul(t)}),this.register(function(t){return new dl(t)}),this.register(function(t){return new Ml(t)}),this.register(function(t){return new bl(t)}),this.register(function(t){return new Sl(t)}),this.register(function(t){return new pl(t)}),this.register(function(t){return new ml(t)}),this.register(function(t){return new gl(t)}),this.register(function(t){return new _l(t)}),this.register(function(t){return new hl(t)}),this.register(function(t){return new xl(t)}),this.register(function(t){return new fl(t)}),this.register(function(t){return new vl(t)}),this.register(function(t){return new yl(t)}),this.register(function(t){return new cl(t)}),this.register(function(t){return new wl(t)}),this.register(function(t){return new Al(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=mi.extractUrlBase(e);o=mi.resolveURL(l,this.path)}else o=mi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new sr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===zu){try{o[it.KHR_BINARY_GLTF]=new Tl(e)}catch(u){s&&s(u);return}r=JSON.parse(o[it.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Dl(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case it.KHR_MATERIALS_UNLIT:o[u]=new ll;break;case it.KHR_DRACO_MESH_COMPRESSION:o[u]=new El(r,this.dracoLoader);break;case it.KHR_TEXTURE_TRANSFORM:o[u]=new Rl;break;case it.KHR_MESH_QUANTIZATION:o[u]=new Cl;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function D_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var it={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},cl=class{constructor(e){this.parser=e,this.name=it.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new We(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Kt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new vs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ro(h),l.distance=u;break;case"spot":l=new Eo(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,jn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},ll=class{constructor(){this.name=it.KHR_MATERIALS_UNLIT}getMaterialType(){return Ut}extendParams(e,t,n){let s=[];e.color=new We(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Et))}return Promise.all(s)}},hl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},ul=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(a,a)}return Promise.all(r)}},dl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},fl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},pl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new We(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Kt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Et)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},ml=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},gl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new We().setRGB(a[0],a[1],a[2],Kt),Promise.all(r)}},_l=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},xl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new We().setRGB(a[0],a[1],a[2],Kt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Et)),Promise.all(r)}},yl=class{constructor(e){this.parser=e,this.name=it.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},vl=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:an}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Ml=class{constructor(e){this.parser=e,this.name=it.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},bl=class{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Sl=class{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},wl=class{constructor(e){this.name=it.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}},Al=class{constructor(e){this.name=it.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==mn.TRIANGLES&&l.mode!==mn.TRIANGLE_STRIP&&l.mode!==mn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let y=new Xe,m=new I,p=new Qt,M=new I(1,1,1),b=new En(g.geometry,g.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&M.fromBufferAttribute(c.SCALE,_),b.setMatrixAt(_,y.compose(m,p,M));for(let _ in c)if(_==="_COLOR_0"){let N=c[_];b.instanceColor=new Ui(N.array,N.itemSize,N.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);Pt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},zu="glTF",lr=12,Uu={JSON:1313821514,BIN:5130562},Tl=class{constructor(e){this.name=it.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,lr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==zu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-lr,r=new DataView(e,lr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Uu.JSON){let l=new Uint8Array(e,lr+o,a);this.content=n.decode(l)}else if(c===Uu.BIN){let l=lr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},El=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=it.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Pl[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Pl[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=bs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(let g in f.attributes){let y=f.attributes[g],m=c[g];m!==void 0&&(y.normalized=m)}u(f)},a,l,Kt,d)})})}},Rl=class{constructor(){this.name=it.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Cl=class{constructor(){this.name=it.KHR_MESH_QUANTIZATION}},Bo=class extends di{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,y=g-l,m=-2*f+3*d,p=f-d,M=1-m,b=p-d+u;for(let _=0;_!==a;_++){let N=o[y+_+a],T=o[y+_+c]*h,E=o[g+_+a],C=o[g+_]*h;r[_]=M*N+b*T+m*E+p*C}return r}},N_=new Qt,Il=class extends Bo{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return N_.fromArray(r).normalize().toArray(r),r}},mn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},bs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ou={9728:$t,9729:en,9984:Xc,9985:Os,9986:is,9987:In},Fu={33071:Gn,33648:Gs,10497:Li},rl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},gi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},U_={CUBICSPLINE:void 0,LINEAR:gs,STEP:ms},ol={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function O_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new qt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pn})),i.DefaultMaterial}function Bi(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function jn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function F_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function B_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function z_(i){let e,t=i.extensions&&i.extensions[it.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+al(t.attributes):e=i.indices+":"+al(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+al(i.targets[n]);return e}function al(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Ll(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function k_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var H_=new Xe,Dl=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new D_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new pn(this.options.manager):this.textureLoader=new Co(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Bi(r,a,s),jn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[it.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(mi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=rl[s.type],a=bs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Ft(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=rl[s.type],l=bs[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,y,m;if(f&&f!==u){let p=Math.floor(d/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,b=t.cache.get(M);b||(y=new l(a,p*f,s.count*f/h),b=new Zs(y,f/h),t.cache.add(M,b)),m=new $s(b,c,d%f/h,g)}else a===null?y=new l(s.count*c):y=new l(a,d,s.count*c),m=new Ft(y,c,g);if(s.sparse!==void 0){let p=rl.SCALAR,M=bs[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,N=new M(o[1],b,s.sparse.count*p),T=new l(o[2],_,s.sparse.count*c);a!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,C=N.length;E<C;E++){let S=N[E];if(m.setX(S,T[E*c]),c>=2&&m.setY(S,T[E*c+1]),c>=3&&m.setZ(S,T[E*c+2]),c>=4&&m.setW(S,T[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Ou[d.magFilter]||en,h.minFilter=Ou[d.minFilter]||In,h.wrapS=Fu[d.wrapS]||Li,h.wrapT=Fu[d.wrapT]||Li,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==$t&&h.minFilter!==en,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(y){let m=new Xt(y);m.needsUpdate=!0,d(m)}),t.load(mi.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),jn(u,o),u.userData.mimeType=o.mimeType||k_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[it.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[it.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[it.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Js,on.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Nn,on.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return qt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[it.KHR_MATERIALS_UNLIT]){let u=s[it.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new We(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Kt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Et)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Dt);let h=r.alphaMode||ol.OPAQUE;if(h===ol.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ol.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Ut&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Ut&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Ut){let u=r.emissiveFactor;a.emissive=new We().setRGB(u[0],u[1],u[2],Kt)}return r.emissiveTexture!==void 0&&o!==Ut&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Et)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),jn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Bi(s,u,r),u})}createUniqueName(e){let t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[it.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Bu(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=z_(l),u=s[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[it.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Bu(new _t,l,t),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?O_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let y=h[f],m=o[f],p,M=l[f];if(m.mode===mn.TRIANGLES||m.mode===mn.TRIANGLE_STRIP||m.mode===mn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new co(y,M):new gt(y,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===mn.TRIANGLE_STRIP?p.geometry=sl(p.geometry,Do):m.mode===mn.TRIANGLE_FAN&&(p.geometry=sl(p.geometry,ar));else if(m.mode===mn.LINES)p=new Oi(y,M);else if(m.mode===mn.LINE_STRIP)p=new hi(y,M);else if(m.mode===mn.LINE_LOOP)p=new po(y,M);else if(m.mode===mn.POINTS)p=new mo(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&B_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),jn(p,r),m.extensions&&Bi(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Bi(s,u[0],r),u[0];let d=new At;r.extensions&&Bi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wt(cr.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new li(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),jn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new Xe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ho(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let f=s.channels[u],g=s.samplers[f.sampler],y=f.target,m=y.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(g),h.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],y=u[3],m=u[4],p=[];for(let M=0,b=d.length;M<b;M++){let _=d[M],N=f[M],T=g[M],E=y[M],C=m[M];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let S=n._createAnimationTracks(_,N,T,E,C);if(S)for(let v=0;v<S.length;v++)p.push(S[v])}return new Ao(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,H_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Ks:l.length>1?h=new At:l.length===1?h=l[0]:h=new Pt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),jn(h,r),r.extensions&&Bi(n,h,r),r.matrix!==void 0){let u=new Xe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new At;n.name&&(r.name=s.createUniqueName(n.name)),jn(r,n),n.extensions&&Bi(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[d,f]of s.associations)(d instanceof on||d instanceof Xt)&&u.set(d,f);return h.traverse(d=>{let f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];gi[r.path]===gi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(gi[r.path]){case gi.weights:l=Zn;break;case gi.rotation:l=$n;break;case gi.position:case gi.scale:l=Kn;break;default:switch(n.itemSize){case 1:l=Zn;break;case 2:case 3:default:l=Kn;break}break}let h=s.interpolation!==void 0?U_[s.interpolation]:gs,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){let g=new l(c[d]+"."+gi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ll(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof $n?Il:Bo;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function V_(i,e,t){let n=e.attributes,s=new un;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),a.normalized){let h=Ll(bs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new I,c=new I;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let y=Ll(bs[d.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new rn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Bu(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Pl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return ot.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ot.workingColorSpace}" not supported.`),jn(i,e),V_(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?F_(i,e.targets,t):i})}var ku=(i,e)=>i[0]<e[2]&&i[2]>e[0]&&i[1]<e[3]&&i[3]>e[1],G_=(i,e)=>i[0]>=e[0]&&i[2]<=e[2]&&i[1]>=e[1]&&i[3]<=e[3];function Hu(i,e){i.castShadow=!1;for(let t of Array.isArray(i.material)?i.material:[i.material]){let n=t.userData.overviewClip;n||(n={overviewRects:{value:Array.from({length:9},()=>new dt)},overviewCount:{value:0}},t.userData.overviewClip=n,t.onBeforeCompile=s=>{Object.assign(s.uniforms,n),s.vertexShader=`varying vec2 overviewXY;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 overviewXY=vec2(position.x,-position.z);`),s.fragmentShader=`varying vec2 overviewXY;uniform vec4 overviewRects[9];uniform int overviewCount;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 for(int i=0;i<9;i++){if(i<overviewCount){vec4 r=overviewRects[i];if(overviewXY.x>=r.x&&overviewXY.x<=r.z&&overviewXY.y>=r.y&&overviewXY.y<=r.w)discard;}}`)},t.customProgramCacheKey=()=>"atlas-context-clip",t.needsUpdate=!0),n.overviewCount.value=e.length,e.forEach((s,r)=>n.overviewRects.value[r].set(...s))}}function zo(i){i.traverse(e=>{let t=!1;for(let n=e;n;n=n.parent)n.userData.sharedTownSource&&(t=!0);if(!t&&e.isMesh){e.geometry.dispose();for(let n of Array.isArray(e.material)?e.material:[e.material])n.map?.dispose(),n.dispose()}})}async function Vu(i,e=[]){async function t(_){let N=await fetch(_+"manifest.json",{cache:"no-cache"});if(!N.ok)throw Error("Regional overview unavailable");return{url:_,meta:await N.json()}}let n=await t(i),s=n.meta,r=await Promise.all(e.map(t)),o=new At,a=new At,c=new At,l=new Map,h=new Map;o.add(a,c),o.visible=!1;let u=0,d=!1,f=(_,N)=>_.url+N+"?v="+(_.meta.revision||_.meta.initial_bytes);async function g(_,N){let T=f(_,N);return l.has(T)||l.set(T,(async()=>{let E=await fetch(T);if(!E.ok)throw Error("Missing overview "+N);let C=await new Response(E.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();return new Promise((S,v)=>new _i().parse(C,"",P=>{P.scene.traverse(X=>{X.isMesh&&(X.geometry.computeVertexNormals(),X.geometry.computeBoundingBox(),X.material.flatShading=!0,X.castShadow=N!==_.meta.base&&X.geometry.boundingBox.max.y>.05,X.receiveShadow=!0)}),d&&zo(P.scene),S(P.scene)},v))})()),l.get(T)}async function y(_,N,T){let E=await new pn().loadAsync(f(_,N));E.colorSpace=Et;let[C,S,v,P]=_.meta.bounds,X=new gt(new Tn(v-C,P-S),new Ut({map:E,transparent:!0,depthWrite:!1,toneMapped:!1}));X.rotation.x=-Math.PI/2,X.position.set((C+v)/2,T,-(S+P)/2);let B=X.geometry.getAttribute("position");for(let Z=0;Z<B.count;Z++)B.setXYZ(Z,B.getX(Z)+(C+v)/2,T,-(B.getY(Z)+(S+P)/2));return B.needsUpdate=!0,X.rotation.set(0,0,0),X.position.set(0,0,0),X}let[m,p,M]=await Promise.all([g(n,s.base),y(n,s.canopy,.0024),y(n,s.water,1e-4)]);if(o.add(m,M),s.surroundingContext){let _=s.surroundingContext;o.add(await y({url:n.url,meta:{...s,bounds:_.bounds}},_.file,.00215))}o.add(p);async function b(_,N,T=()=>{}){let E=++u;if(o.visible=!0,a.clear(),c.clear(),document.body.dataset.regionChunks="0",document.body.dataset.regionBuildings="0",document.body.dataset.regionNeighbors="",document.body.dataset.regionContext=s.surroundingContext?"osm-surroundings":"none",N)return;let C=[],S=[],v=!1;function P(){v||(v=!0,requestAnimationFrame(()=>{v=!1,E===u&&T()}))}let X=[n,...s.continuousCoverage||s.contextOverviews?.length?r.filter(B=>(s.contextOverviews?s.contextOverviews.includes(B.meta.id):B.meta.continuousCoverage)&&ku(B.meta.bounds,_)).sort((B,Z)=>B.meta.id.localeCompare(Z.meta.id)):[]];for(let B of X){let Z=C.map(j=>j.slice()),ae=B.meta.buildings.filter(j=>ku(j.bounds,_)&&!Z.some(ce=>G_(j.bounds,ce)));for(let j of ae)S.push((async()=>{let ce=await g(B,j.file);E===u&&(Z.length&&ce.traverse(L=>{L.isMesh&&Hu(L,Z)}),a.add(ce),P())})());B!==n&&ae.length&&(h.has(B.url)||h.set(B.url,(async()=>{let j=new At;if(j.add(await y(B,B.meta.canopy,.0025),await y(B,B.meta.water,15e-5)),B.meta.surroundingContext){let ce=B.meta.surroundingContext;j.add(await y({url:B.url,meta:{...B.meta,bounds:ce.bounds}},ce.file,.00215))}return j})()),S.push((async()=>{let j=await h.get(B.url);E===u&&(j.traverse(ce=>{ce.isMesh&&Hu(ce,Z)}),c.add(j),P())})())),C.push(B.meta.coverageBounds||B.meta.bounds)}await Promise.all(S),E===u&&(document.body.dataset.regionChunks=a.children.length,document.body.dataset.regionBuildings=s.native_buildings+Object.values(s.coverage_buildings).reduce((B,Z)=>B+Z,0),document.body.dataset.regionNeighbors=X.slice(1).map(B=>B.meta.id).join(","))}return{root:o,meta:s,show:b,hide(){u++,o.visible=!1},dispose(){u++,d=!0,zo(o);for(let _ of l.values())_.then(zo,()=>{});for(let _ of h.values())_.then(zo,()=>{});o.removeFromParent(),l.clear(),h.clear()}}}async function Gu(i){let e=await fetch(i).then(m=>{if(!m.ok)throw Error("Missing marina boat data");return i.endsWith(".gz")?new Response(m.body.pipeThrough(new DecompressionStream("gzip"))).json():m.json()}),t=new At;t.name="Illustrated moored boats";let n=[[0,.5],[.4,.24],[.5,-.32],[.33,-.5],[-.33,-.5],[-.5,-.32],[-.4,.24]],s=[];for(let m=0;m<n.length;m++){let p=n[m],M=n[(m+1)%n.length];s.push(0,.12,0,p[0],.12,p[1],M[0],.12,M[1],p[0],.12,p[1],p[0]*.65,0,p[1]*.9,M[0],.12,M[1],M[0],.12,M[1],p[0]*.65,0,p[1]*.9,M[0]*.65,0,M[1]*.9)}let r=new _t;r.setAttribute("position",new at(s,3)),r.computeVertexNormals();let o=new An(.58,.1,.31);o.translate(0,.18,-.02);let a=new An(.64,.025,.35);a.translate(0,.245,-.02);let c=new An(.59,.04,.22);c.translate(0,.2,.05);let l=new ui(.009,.009,.72,4);l.translate(0,.48,0);let h=new Xe,u=new Qt,d=new I,f=new I;for(let[m,p,M]of[[r,"#fff8e7",()=>!0],[o,"#e3dfcd",()=>!0],[a,"#fdfbed",()=>!0],[c,"#709c9c",()=>!0],[l,"#ded6c3",b=>b[5]===0]]){let b=e.boats.filter(M),_=new En(m,new qt({color:p,roughness:.8,side:Dt}),b.length);b.forEach((N,T)=>{d.set(N[0],4e-4,-N[1]),u.setFromAxisAngle(new I(0,1,0),N[2]),f.set(N[4],N[3],N[3]),h.compose(d,u,f),_.setMatrixAt(T,h)}),_.castShadow=!0,_.receiveShadow=!0,t.add(_)}let g=[];for(let m of e.docks||[])if(m.closed){let p=new Qs;m.points.forEach((_,N)=>N?p.lineTo(_[0],_[1]):p.moveTo(_[0],_[1]));let M=new bo(p).toNonIndexed(),b=M.getAttribute("position");for(let _=0;_<b.count;_++)g.push(b.getX(_),3e-4,-b.getY(_));M.dispose()}else for(let p=1;p<m.points.length;p++){let M=m.points[p-1],b=m.points[p],_=b[0]-M[0],N=b[1]-M[1],T=Math.hypot(_,N);if(!T)continue;let E=-N/T*.0012,C=_/T*.0012;for(let S of[[M[0]+E,M[1]+C],[M[0]-E,M[1]-C],[b[0]+E,b[1]+C],[b[0]+E,b[1]+C],[M[0]-E,M[1]-C],[b[0]-E,b[1]-C]])g.push(S[0],3e-4,-S[1])}let y=new _t;return y.setAttribute("position",new at(g,3)),y.computeVertexNormals(),t.add(new gt(y,new qt({color:"#bba789",roughness:1,side:Dt}))),t.userData.boatCount=e.boats.length,t}var W_=.8;async function Wu(i){let e=await fetch(i+"scene.json",{cache:"no-cache"}).then(T=>T.json()),t=new At,n=new At,s=new At,r=new Map;t.add(n,s);let o=0,a=JSON.stringify([e.scale,e.tiles,e.crownProfiles]).split("").reduce((T,E)=>Math.imul(T,31)+E.charCodeAt(0)|0,0).toString(36),c=T=>i+T+"?v="+a;async function l(T){return r.has(T)||r.set(T,(async()=>{let E=await fetch(c(T+".glb.gz"));if(!E.ok)throw Error("Missing regional tile "+T);let C=await new Response(E.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();return new Promise((S,v)=>new _i().parse(C,"",P=>{P.scene.traverse(X=>{X.isMesh&&(X.geometry.computeVertexNormals(),X.material.flatShading=!0,X.castShadow=T!=="base",X.receiveShadow=!0)}),S(P.scene)},v))})()),r.get(T)}let[h,u,d,f]=await Promise.all([l("base"),l("region"),fetch(i+"shore-wash.json").then(T=>T.json()),new pn().loadAsync(i+"shore-wash.png")]);t.add(h,u),f.colorSpace=Et;let[g,y,m,p]=d.bounds,M=new gt(new Tn(m-g,p-y),new Ut({map:f,transparent:!0,depthWrite:!1,toneMapped:!1}));M.rotation.x=-Math.PI/2,M.position.set((g+m)/2,1e-4,-(y+p)/2),M.renderOrder=-1,t.add(M);let b=e.boats?await Gu(i+e.boats):null;b&&t.add(b);function _(T,E,C){s.clear();let S=C.filter(ce=>{if(Math.abs(ce[0]-T.x)>=E||Math.abs(ce[1]-T.y)>=E)return!1;if(ce[2]!==2||!e.crownProfiles?.[T.id])return!0;let L=(Math.imul(Math.round(ce[0]*1e5),73856093)^Math.imul(Math.round(ce[1]*1e5),19349663))>>>0;return L=Math.imul(L^L>>>16,2246822507)>>>0,L/4294967296<W_}),v=new Xe,P=new ui(35e-5,6e-4,.019,5);P.translate(0,.0095,0);let X=[];for(let ce=0;ce<9;ce++){let L=ce*Math.PI*2/9;for(let ee=0;ee<5;ee++){let se=(qe,ie)=>{let de=.004*qe,Ie=7e-4*Math.sin(Math.PI*qe)*ie;return[Math.cos(L)*de-Math.sin(L)*Ie,.019+.003*Math.sin(Math.PI*qe)-.002*qe,Math.sin(L)*de+Math.cos(L)*Ie]},le=ee/5,Ze=(ee+1)/5;X.push(...se(le,-1),...se(le,1),...se(Ze,-1),...se(le,1),...se(Ze,1),...se(Ze,-1))}}let B=new _t;B.setAttribute("position",new at(X,3)),B.computeVertexNormals();let Z=(e.crownProfiles?.[T.id]?.radiusMeters||6)/1e3,ae=new ir(Z,2);ae.scale(1,.55,1),ae.translate(0,.024,0);let j=new ir(.004,1);j.scale(1,.8,1),j.translate(0,.02,0);for(let[ce,L,ee]of[[P,"#b9a27c",()=>!0],[B,"#a4be82",se=>se[2]===1],[j,"#b3c896",se=>!se[2]],[ae,"#a4bb87",se=>se[2]===2&&Math.round(se[0]*1e4)%2===0],[ae,"#bdcba5",se=>se[2]===2&&Math.round(se[0]*1e4)%2!==0]]){let se=S.filter(ee),le=new En(ce,new qt({color:L,roughness:1,side:Dt}),se.length);se.forEach((Ze,qe)=>{v.makeTranslation(Ze[0],.004,-Ze[1]),le.setMatrixAt(qe,v)}),le.castShadow=!0,s.add(le)}}async function N(T,E=1.65){let C=++o;if(t.visible=!0,n.clear(),s.clear(),u.visible=!T,!T)return;let S=Object.keys(e.tiles).filter(B=>{let[,Z,ae]=B.match(/^tile-(-?\d+)-(-?\d+)$/);return Math.abs(+Z+.5-T.x)<E&&Math.abs(+ae+.5-T.y)<E}),v=Object.keys(e.treeTiles||{}).filter(B=>{let[,Z,ae]=B.match(/^tile-(-?\d+)-(-?\d+)$/);return Math.abs(+Z+.5-T.x)<E+.5&&Math.abs(+ae+.5-T.y)<E+.5}),[P,X]=await Promise.all([Promise.all(S.map(l)),Promise.all(v.map(async B=>{let Z=await fetch(c(B+".trees.json.gz"));if(!Z.ok)throw Error("Missing tree tile "+B);return new Response(Z.body.pipeThrough(new DecompressionStream("gzip"))).json()}))]);C===o&&(P.forEach(B=>n.add(B)),_(T,E,e.treeTiles?X.flat():e.trees))}return{root:t,meta:e,show:N,hide(){o++,t.visible=!1}}}function Xu(i,e){let t=e[i.style],n=["glass-bands","balconies"].includes(t.detail),s=t.walls,r='<svg viewBox="0 0 120 85" aria-hidden="true">',o=n?[[22,46,14,28],[43,39,14,36],[65,46,13,32],[84,53,12,23],[48,65,15,20]]:[[18,43,21,15],[46,37,20,18],[76,42,20,17],[29,65,23,16],[65,65,23,20]];for(let a=0;a<o.length;a++){let[c,l,h,u]=o[a],d=s[a%s.length];r+=`<path d="M${c} ${l-u}l${h} -5 7 5v${u}l-${h} 5 -7 -5z" fill="${d}"/><path d="M${c} ${l-u}l${h} -5 7 5 -${h} 5z" fill="${t.roofs[0]}"/><path d="M${c+h} ${l-u-5}l7 5v${u}l-7 3z" fill="#5993a4" opacity=".25"/>`;for(let f=5;f<u;f+=5)r+=`<path d="M${c+1} ${l-f}l${h-1} -4" stroke="${n?"#f3f8ef":t.trim?.[a%t.trim.length]||"#9bbbae"}" stroke-width="1.5"/>`}return r+"</svg>"}async function X_(){let i=new URL(".",document.currentScript.src).href;new URLSearchParams(location.search).get("proof")==="unlabeled"&&document.documentElement.classList.add("unlabeled");let e=performance.now(),t=A=>document.querySelector(A),n=matchMedia("(max-width:699px)").matches,[s,r,o,a,c]=await Promise.all(["catalog.json","districts.json","features.json","routes.json","roads.json"].map(A=>fetch(i+A).then(k=>k.json()))),l=await fetch(i+"package-registry.json").then(A=>A.json()),h=await fetch(i+"accurate-overviews.json").then(A=>A.json()),u=await fetch(i+"region-images.json").then(A=>A.json()),d=await fetch(i+"regional-style.json").then(A=>A.json()),f=await fetch(i+"region-backdrop.json").then(A=>A.json()),g=new Map,y=await fetch(i+"town-views.json").then(A=>A.json()),m=s.towns,p=s.regions,M=Object.fromEntries(m.map(A=>[A.id,A])),b=A=>A.regionalTowns||A.towns,_=new URLSearchParams(location.search),N=_.get("landing")==="1";N&&document.documentElement.classList.add("landing-export");let T=null,E=null,C=null,S=null,v=null,P=[],X=null,B=null,Z=null;async function ae(){let A=["emerald-coast","forgotten-coast"].includes(se.id)&&L!=="state";et.material.color.set(A?"#17658f":"#3593ae"),Ae.background.set(A?"#17658f":"#3593ae");let k=!K()&&!(L==="region"&&h[se.id])&&(L==="state"||["emerald-coast","forgotten-coast"].includes(se.id));if(k&&!X){let $=await fetch(i+"emerald-water/shore-wash.json").then(re=>re.json()),z=await new pn().loadAsync(i+"emerald-water/shore-wash.png");z.colorSpace=Et;let[D,W,O,q]=$.bounds;X=new gt(new Tn(O-D,q-W),new Ut({map:z,transparent:!0,depthWrite:!1,toneMapped:!1})),X.rotation.x=-Math.PI/2,X.position.set((D+O)/2,-.001,-(W+q)/2),X.renderOrder=-1,Ae.add(X)}X&&(X.visible=k),Ne&&Ne.traverse($=>{/Depth[_ ]band/.test($.name)&&($.visible=!(k&&L!=="state"))})}async function j(){if(!E){E=await fetch(i+"30a.json").then(z=>z.json());let A=await fetch(i+"sand.json").then(z=>z.json()),k=new _t;k.setAttribute("position",new at(A,3)),S=new gt(k,new Ut({color:"#fffdf1",side:Dt,toneMapped:!1})),Ae.add(S);let $=await fetch(i+"alys-geometry.json.gz").then(async z=>new Response(z.body.pipeThrough(new DecompressionStream("gzip"))).json());P=$.occupied,v=new At;for(let[z,D]of Object.entries($)){if(z==="occupied")continue;let W=new _t;W.setAttribute("position",new at(D,3)),W.computeVertexNormals();let O=new qt({color:z==="walls"?"#fff9e9":z==="roofs"?"#fffdf6":"#ded1b4",side:Dt,roughness:.92,flatShading:!0}),q=new gt(W,O);q.castShadow=z!=="lanes",q.receiveShadow=!0,v.add(q)}Ae.add(v)}return E}let ce=_.get("view")||"30a";M[ce]||(ce="30a");let L=_.get("level")||"region",ee=M[ce],se=Oe(ce),le=null,Ze=null,qe={},ie=[],de=!1,Ie=a;function _e(A){return(s.sourceRegions||p).find(k=>k.towns.includes(A))||Oe(A)}function Oe(A){return p.find(k=>k.towns.includes(A))||p[0]}let Ae=new ao;Ae.background=new We("#3593ae");let Re=new oo({antialias:!0,powerPreference:"low-power"});Re.setPixelRatio(Math.min(devicePixelRatio,n?1.5:2)),Re.setSize(innerWidth,innerHeight),Re.outputColorSpace=Et,Re.toneMapping=Po,Re.toneMappingExposure=1.05,Re.shadowMap.enabled=!n,Re.shadowMap.type=Wc,t("#map").append(Re.domElement),Ae.add(new To(16777215,7965559,1.5));let st=new vs(16774623,1.7);st.castShadow=!n,st.shadow.mapSize.set(n?1024:2048,n?1024:2048),st.shadow.bias=-3e-4,Ae.add(st,st.target);let et=new gt(new Tn(3500,3500),new Ut({color:"#3593ae",toneMapped:!1}));et.rotation.x=-Math.PI/2,et.position.set(0,-.4,-400),Ae.add(et);let Rt=new _t;Rt.setAttribute("position",new at(c,3));let V=new Oi(Rt,new Nn({color:"#958a6e",transparent:!0,opacity:.3}));Ae.add(V);let Lt=document.createElement("canvas");Lt.setAttribute("aria-label","Illustrated regional map"),Object.assign(Lt.style,{position:"absolute",inset:"0",width:"100%",height:"100%",pointerEvents:"none"}),Lt.hidden=!0,t("#map").append(Lt);let tt=new Map,nt=null,Fe=null,xt=null,He=[],R=document.createElement("style");R.textContent=`.map-label.neighbor-label{font-size:${d.labels.neighborFontPx}px!important;opacity:${d.labels.neighborOpacity};padding:2px 5px;min-height:18px;box-shadow:none;background:#fff9}.region-town-dot.neighbor-dot{width:5px;height:5px;min-width:5px;min-height:5px;border-width:1px;opacity:${d.labels.neighborOpacity}}.map-label.town-label:not(.neighbor-label){font-size:${d.labels.ownFontPx}px}@media(max-width:699px){.map-label.town-label:not(.neighbor-label){font-size:11px}}`,document.head.append(R);let x=new li(-50,50,50,-50,1e-4,3500),F=new I,oe=new At;Ae.add(oe);let te=48,ne=null,Se=null,ve="",ge=0,ct=new _i,ue=new Map,Te=new Io;Re.domElement.addEventListener("click",A=>{if(!Q()||!Ne)return;Te.setFromCamera(new we(A.clientX/innerWidth*2-1,-(A.clientY-Re.domElement.getBoundingClientRect().top)/Re.domElement.getBoundingClientRect().height*2+1),x);let k=Te.intersectObject(Ne,!0).find(z=>z.object.name.startsWith("Lake_")||z.object.name.startsWith("Lake /"));if(!k)return;let $=E.lakes.find(z=>k.object.name.includes(z.name.replaceAll(" ","_"))||k.object.name.includes(z.name));$&&Ge($)});function Ge(A){T=A,le=null,xi={target:F.clone(),span:te,position:x.position.clone(),left:x.left,right:x.right,top:x.top,bottom:x.bottom},Be(),t("#card-title").textContent=A.name,t("#card-copy").textContent="A coastal dune lake. Its mapped outline follows OpenStreetMap; seasonal water levels and outfalls change.",t("#card-price").textContent="Mapped water is not a statement of public access. Check the county access guide before visiting.",t("#card-source").href=A.source,t("#card-source").textContent="View mapped shoreline",t("#card-place")?.remove(),t("#card").hidden=!1,document.body.classList.add("card-open")}async function Ve(A){if(ue.has(A))return ue.get(A);let k=(async()=>{let $=await fetch(i+"assets/"+A+".glb.gz");if(!$.ok)throw Error("Map package unavailable");let z=await $.arrayBuffer(),D=await new Response(new Blob([z]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();return new Promise((W,O)=>ct.parse(D,"",q=>{q.scene.traverse(re=>{if(!re.isMesh)return;let pe=re.name+" "+re.parent?.name;if(/Geography.*miami.lanes/i.test(pe)&&(re.visible=!1),re.castShadow=!pe.includes("Geography"),re.receiveShadow=!0,/Continuous.forest.canopy/.test(pe)&&E){re.material=re.material.clone(),re.material.transparent=!0,re.material.depthWrite=!1;let he=new pn().load(i+"canopy-mask.png",Ue=>{let ze=document.createElement("canvas");ze.width=Ue.image.width,ze.height=Ue.image.height;let mt=ze.getContext("2d");mt.drawImage(Ue.image,0,0),Ss=mt.getImageData(0,0,ze.width,ze.height),me()});he.flipY=!0;let Pe=E.canopyBounds;re.material.onBeforeCompile=Ue=>{Ue.uniforms.canopyMask={value:he},Ue.uniforms.canopyBounds={value:new dt(...Pe)},Ue.vertexShader=`varying vec3 canopyP;
`+Ue.vertexShader,Ue.vertexShader=Ue.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 canopyP=position;`),Ue.fragmentShader=`varying vec3 canopyP; uniform sampler2D canopyMask; uniform vec4 canopyBounds;
`+Ue.fragmentShader,Ue.fragmentShader=Ue.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 vec2 canopyUV=(vec2(canopyP.x,-canopyP.z)-canopyBounds.xy)/(canopyBounds.zw-canopyBounds.xy); float density=texture2D(canopyMask,canopyUV).r; if(density<0.02)discard; diffuseColor.a*=density; float canopy=sin(canopyP.x*720.0)*sin(canopyP.z*650.0);diffuseColor.rgb*=0.97+0.06*canopy;`)}}if(/Depth.band/.test(pe)){let he=Array.isArray(re.material)?re.material[0]:re.material;re.material=new Ut({name:he.name,color:he.color,side:Dt,toneMapped:!1})}}),W(q.scene)},O))})();return ue.set(A,k),k}function Ee(A){A.traverse(k=>{if(!k.isMesh||k.userData.thirtyMasked)return;k.userData.thirtyMasked=!0;let z=(Array.isArray(k.material)?k.material:[k.material]).map(D=>{let W=D.clone();return W.onBeforeCompile=O=>{O.vertexShader=`varying vec3 patchWorld;
`+O.vertexShader,O.vertexShader=O.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
 patchWorld=(modelMatrix*vec4(transformed,1.0)).xyz;`),O.fragmentShader=`varying vec3 patchWorld;
`+O.fragmentShader,O.fragmentShader=O.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
 vec2 p=vec2(patchWorld.x,-patchWorld.z);if(((46.155393352)*(p.y-(690.327265323))-(-0.808549590)*(p.x-(-230.797948991)))>=0.0&&((0.673879006)*(p.y-(689.518715732))-(43.277241149)*(p.x-(-184.642555639)))>=0.0&&((-45.986942745)*(p.y-(732.795956881))-(0.805598675)*(p.x-(-183.968676633)))>=0.0&&((-0.842329613)*(p.y-(733.601555556))-(-43.274290233)*(p.x-(-229.955619377)))>=0.0)discard;`)},W});k.material=Array.isArray(k.material)?z:z[0]})}function Ke(A){t("#status").textContent=A,t("#status").hidden=!A}let Ne=null,yt="",U=null,xe=new Map,K=()=>!!l[ee.id]&&L==="town",Q=()=>ee.id==="30a"&&L==="town";function Me(){if(L==="state"?(F.set(30,0,-440),te=830):(F.set(ee.x,0,-ee.y),te=L==="region"?48:22,L==="town"&&le&&(F.set(le.x,0,-le.y),te=17)),Q())if(L==="region"){if(F.set(innerWidth<700?-204:-199,0,innerWidth<700?-705:-708),te=innerWidth<700?32:48,qe.airport){let D=a.find(W=>W.town==="30a"&&(le?W.district===le.id:!W.district));if(D){let W=D.points.map(q=>q[0]),O=D.points.map(q=>q[1]);te=Math.max(48,(Math.max(...W)-Math.min(...W))*1.55),F.set((Math.min(...W)+Math.max(...W))/2+(n?0:te*.09),0,-(Math.min(...O)+Math.max(...O))/2)}}}else{let D=le||r.find(W=>W.id==="seaside"&&W.town==="30a");F.set(D.x,0,-D.y),te=.85}if(K()&&U)if(L==="region"){let D=U.meta.camera||{center:[U.meta.center[0]+1,U.meta.center[1]],phoneOffsetY:4,phoneSpan:20,desktopSpan:32};F.set(D.center[0]+(innerWidth<700?0:D.desktopOffsetX||0),0,-D.center[1]+(innerWidth<700?D.phoneOffsetY:0)),te=innerWidth<700?D.phoneSpan:D.desktopSpan}else{let D=le||U.meta.districts[0];F.set(D.x,0,-D.y),te=innerWidth<700?1.05:1.9}if(L==="region"){let D=b(se).map(ze=>M[ze]).filter(Boolean),W=D.map(ze=>ze.x),O=D.map(ze=>ze.y/Math.SQRT2),q=innerWidth<700?24:48,re=innerWidth<700?innerWidth-24:innerWidth-330,pe=innerWidth<700?125:145,he=innerWidth<700?innerHeight-Math.min(innerHeight*.34,300)-40:innerHeight-65,Pe=Math.max((Math.max(...W)-Math.min(...W)+6)/Math.max(100,re-q),(Math.max(...O)-Math.min(...O)+6)/Math.max(120,he-pe)),Ue=(pe+he)/2;(Math.max(...O)-Math.min(...O))/(Math.max(...W)-Math.min(...W)+.001)<.35&&innerWidth>=700&&(Ue=innerHeight*d.framing.horizontalCoastAnchor),te=Pe*innerWidth,F.set((Math.min(...W)+Math.max(...W))/2+(innerWidth/2-(q+re)/2)*Pe,0,-((Math.min(...O)+Math.max(...O))/2+(Ue-innerHeight/2)*Pe)*Math.SQRT2)}let A=y[ee.id];if(L==="town"&&A&&(!le||le.id===A.district)&&(F.set(A.x,0,-A.y),te=innerWidth<700?A.phoneSpan:A.desktopSpan),N&&L==="town"&&(_.has("cx")&&F.set(Number(_.get("cx")),0,-Number(_.get("cy"))),te=Number(_.get("span")||te)),Q()&&T){let D=T.shape.coordinates.flat(T.shape.type==="MultiPolygon"?2:1),W=D.map(pe=>pe[0]),O=D.map(pe=>pe[1]),q=Math.max(...W)-Math.min(...W),re=(Math.max(...O)-Math.min(...O))/Math.SQRT2;te=Math.max(.85,q*1.65,re*(innerWidth/innerHeight)*2.8),F.set((Math.min(...W)+Math.max(...W))/2,0,-(Math.min(...O)+Math.max(...O))/2),t("#title").textContent=T.name}L==="region"&&_.get("regionalExport")==="1"&&(te*=Number(_.get("exportPadding")||se.regionalExport?.padding||1.6));let k=innerHeight;Re.setSize(innerWidth,k);let $=innerWidth/k,z=L==="state"?Math.max(te,te/($*.9)):te/$;x.left=-z*$/2,x.right=z*$/2,x.top=z/2,x.bottom=-z/2,x.position.copy(F).add(new I(0,z*1.25,z*1.25)),x.lookAt(F),x.near=L==="region"&&h[se.id]?z*.05:1e-4,x.far=L==="region"&&h[se.id]?z*5:3500,x.updateProjectionMatrix(),st.position.copy(F).add(new I(-z,z*1.5,z*.6)),st.target.position.copy(F),Object.assign(st.shadow.camera,{left:-z,right:z,top:z,bottom:-z,near:.001,far:z*5}),st.shadow.camera.updateProjectionMatrix(),st.shadow.normalBias=Q()||K()?1e-4:.06,st.shadow.bias=L==="region"&&h[se.id]?-1e-4/(z*5):-3e-4,t("#scale").textContent=L==="state"?"Florida \xB7 regional overview":L==="region"?se.map+" \xB7 all "+b(se).length+" towns":Q()?T?T.name+" \xB7 mapped dune lake":"Neighborhood view \xB7 850 m across \xB7 3\xD7 height, capped at 3\xD7 footprint":"Neighborhood view \xB7 illustrated building scale"}function be(){x.updateMatrixWorld(!0);let A=Math.min(devicePixelRatio,2);Lt.width=Math.round(innerWidth*A),Lt.height=Math.round(innerHeight*A);let k=Lt.getContext("2d");k.scale(A,A),k.fillStyle=Fe.waterColor||d.water.deep,k.fillRect(0,0,innerWidth,innerHeight);let $=(D,W)=>{let O=W.camera,q=new I(...O.target).project(x),re=innerWidth/(x.right-x.left),pe=(O.right-O.left)*re,he=(O.top-O.bottom)*re;k.imageSmoothingEnabled=!0,k.imageSmoothingQuality="high",k.drawImage(D,(q.x*.5+.5)*innerWidth-pe/2,(-q.y*.5+.5)*innerHeight-he/2,pe,he)};xt&&$(xt,f),$(nt,Fe);for(let D of He)$(D.image,D.meta);let z=(D,W)=>{let O=D.geometry.attributes.position,q=new I(O.getX(W),O.getY(W),O.getZ(W)).applyMatrix4(D.matrixWorld).project(x);return[(q.x*.5+.5)*innerWidth,(-q.y*.5+.5)*innerHeight]};oe.updateMatrixWorld(!0);for(let D of oe.children)if(!(!D.geometry||!D.material))if(k.globalAlpha=D.material.opacity,k.fillStyle=k.strokeStyle=D.material.color.getStyle(Et),k.lineWidth=2,D.isMesh){let W=D.geometry.index;for(let O=0;O<(W?W.count:D.geometry.attributes.position.count);O+=3){k.beginPath();for(let q=0;q<3;q++){let re=z(D,W?W.getX(O+q):O+q);q?k.lineTo(...re):k.moveTo(...re)}k.closePath(),k.fill()}}else{k.setLineDash(D.material.isLineDashedMaterial?[6,4]:[]),k.beginPath();for(let W=0;W<D.geometry.attributes.position.count;W++){let O=z(D,W);W?k.lineTo(...O):k.moveTo(...O)}k.stroke(),k.setLineDash([])}k.globalAlpha=1,vi(),document.body.dataset.regionViewport=JSON.stringify([F.x+x.left,-F.z/Math.SQRT2+x.bottom,F.x+x.right,-F.z/Math.SQRT2+x.top]),document.body.dataset.drawCalls="0",document.body.dataset.triangles="0",document.body.dataset.viewport=innerWidth+"\xD7"+innerHeight}async function Be(){document.body.dataset.ready="false",document.documentElement.classList.toggle("miami-region",K()&&L==="region");let A=++ge,k=xi;xi=null,document.documentElement.classList.toggle("thirty-region",(Q()||K())&&L==="region"),Me(),Ke("Loading this part of the coast\u2026");try{for(let D of g.values())D.hide();if(Lt.hidden=!0,Re.domElement.style.visibility="visible",L==="region"&&_.get("regionalExport")!=="1"){let D=u[se.id];if(!D)throw Error("Regional image unavailable");U&&U.hide(),B&&(B.visible=!1);let W=he=>(tt.has(he.file)||tt.set(he.file,new Promise((Pe,Ue)=>{let ze=new Image;ze.onload=()=>Pe(ze),ze.onerror=()=>Ue(Error("Regional image unavailable")),ze.src=i+he.file+"?v="+he.revision})),tt.get(he.file)),[O,q,re]=await Promise.all([W(D),W(f),Promise.all((D.layers||[]).map(async he=>({meta:he,image:await W(he)})))]);if(A!==ge)return;xt=q,He=re,nt=O,Fe=D,Lt.hidden=!1,Re.domElement.style.visibility="hidden",St(),Vt(),ht(),be(),Ke("");let pe=document.getElementById("canopy-credit");pe&&(pe.textContent=D.attribution),document.body.dataset.ready="true",document.body.dataset.pipeline="flat-region-image",document.body.dataset.regionChunks="0",document.body.dataset.regionImage=D.file;return}if(B||(B=new At,B.name="OSM bridges and causeways",Ae.add(B)),B.visible=L==="town"||L==="region"&&innerWidth>=700&&!!h[se.id],L==="town"||L==="region"&&innerWidth>=700&&h[se.id]){Z||(Z=await fetch(i+"bridge-index.json").then(q=>q.json()));let D=Math.max(2.5,te*.8,(x.top-x.bottom)*Math.SQRT2*.65),W=Z.tiles.filter(q=>q.bounds[0]<=F.x+D&&q.bounds[2]>=F.x-D&&q.bounds[1]<=-F.z+D&&q.bounds[3]>=-F.z-D),O=await Promise.all(W.map(q=>Ve(q.name)));if(A!==ge)return;B.clear(),O.forEach(q=>B.add(q)),document.body.dataset.bridgeTiles=W.length}if(await ae(),document.body.dataset.ready="false",Re.toneMapping=K()?wn:Po,L==="region"&&h[se.id]){U&&U.hide();for(let pe of[Ne,ne,Se,C,S,v,X])pe&&(pe.visible=!1);V.visible=!1,Re.toneMapping=wn,st.shadow.normalBias=1e-4;let D=h[se.id];if(!g.has(D)){let pe=await Vu(i+D,[...new Set(Object.values(h))].filter(he=>he!==D).map(he=>i+he));g.set(D,pe),Ae.add(pe.root)}let W=g.get(D);for(g.delete(D),g.set(D,W);g.size>2;){let pe=g.keys().next().value;g.get(pe).dispose(),g.delete(pe)}if(A!==ge)return;if(se.id==="emerald-coast"&&innerWidth>=700&&!W.thirty){await j();let pe=await Ve("30a-finished");yi(pe);let he=pe.clone(!0);he.userData.sharedTownSource=!0,he.traverse(Pe=>{if(!Pe.isMesh)return;let Ue=Pe.name+" "+Pe.parent?.name;if((/Depth|Lake|Homes.*alys/.test(Ue)||/Geography/.test(Ue)&&!/street|Timpoochee/.test(Ue))&&(Pe.visible=!1),Pe.isInstancedMesh){let ze=pe.getObjectByName(Pe.name),mt=ze.userData.allMatrices||ze.instanceMatrix.array;Pe.instanceMatrix.array.set(mt),Pe.count=mt.length/16,ze.userData.allColors&&Pe.instanceColor&&Pe.instanceColor.array.set(ze.userData.allColors),Pe.instanceMatrix.needsUpdate=!0,Pe.computeBoundingSphere()}}),he.add(S.clone(),v.clone(!0)),W.root.add(he),W.thirty=he}if(W.thirty&&(W.thirty.visible=innerWidth>=700),A!==ge){W.hide();return}W.root.visible=!0;let O=te/2,q=(x.top-x.bottom)*Math.SQRT2/2;if(St(),Vt(),ht(),me(),Ke(innerWidth<700?"":"Loading mapped neighborhoods\u2026"),await W.show([F.x-O,-F.z-q,F.x+O,-F.z+q],innerWidth<700,me),A!==ge)return;let re=document.getElementById("canopy-credit");re&&(re.textContent=W.meta.attribution),Ke(""),St(),Vt(),ht(),me(),document.body.dataset.ready="true",document.body.dataset.pipeline="accurate-region",document.body.dataset.readyMs=Math.round(performance.now()-e),document.body.dataset.drawCalls=Re.info.render.calls,document.body.dataset.triangles=Re.info.render.triangles,document.body.dataset.regionSources=W.meta.sourcePackages.join(",");return}if(K()){let D=l[ee.id];if(U&&U.hide(),!xe.has(D)){let O=await Wu(i+D);xe.set(D,O),Ae.add(O.root)}U=xe.get(D);let W=document.getElementById("canopy-credit");if(W&&(W.textContent=U.meta.canopyAttribution||"OSM-based geography \xB7 original illustrated canopy"),A!==ge)return;for(let O of[Ne,ne,Se,C,S,v])O&&(O.visible=!1);if(V.visible=!1,Me(),await U.show(L==="town"?{...le||U.meta.districts[0],x:F.x,y:-F.z}:null,N?Math.max(2.1,te*.6,(x.top-x.bottom)*Math.SQRT2*.6):innerWidth<700?2.5:2.1),A!==ge)return;Ke(""),St(),Vt(),ht(),k?zi(k,A):me(),document.body.dataset.ready="true",document.body.dataset.pipeline="shared-atlas";return}U&&U.hide();let $=document.getElementById("canopy-credit");$&&($.textContent="OSM-based geography \xB7 original illustrated canopy"),Ne&&(Ne.visible=!0),Q()&&(await j(),await Hi());let z=Q()?"30a-finished":L==="town"?"terrain-"+_e(ee.id).id:"terrain-state";if(z!==yt){let D=await Ve(z);if(A!==ge)return;Ne&&Ae.remove(Ne),Ne=D,yt=z,(z==="30a-finished"||z==="terrain-state")&&yi(Ne),Ae.add(Ne),document.body.dataset.terrainMs=Math.round(performance.now()-e)}if(L==="state"){if(Ee(Ne),await j(),C=await Ve("30a-finished"),A!==ge)return;yi(C),Ae.add(C),C.visible=!0,V.visible=!0,ne&&(ne.visible=!1),Se||(Se=await Ve("state"),Se.traverse(D=>{if(D.isInstancedMesh){for(let W=0;W<D.instanceMatrix.array.length;W+=16)for(let O=0;O<12;O++)D.instanceMatrix.array[W+O]*=3;D.instanceMatrix.needsUpdate=!0,D.computeBoundingSphere()}}),Ae.add(Se)),Se.visible=!0,Se.traverse(D=>{if(!D.isInstancedMesh)return;let W=D.instanceMatrix.array;for(let O=0;O<W.length;O+=16)if(W[O+12]>-226&&W[O+12]<-186&&-W[O+14]>695&&-W[O+14]<733)for(let q=0;q<12;q++)W[O+q]=0;D.instanceMatrix.needsUpdate=!0})}else if(Q())Se&&(Se.visible=!1),ne&&(ne.visible=!1),V.visible=!1;else{if(se.id==="emerald-coast"){if(await j(),C=await Ve("30a-finished"),A!==ge)return;yi(C),Ae.add(C),C.visible=!0}else C&&Ae.remove(C);if(V.visible=!0,Se&&(Se.visible=!1),ve!==_e(ee.id).id){let D=await Ve((n?"mobile-":"")+_e(ee.id).id);if(A!==ge)return;ne&&Ae.remove(ne),ne=D,Ae.add(ne),ve=_e(ee.id).id}ne.visible=!0}if(A!==ge)return;await ae(),Q()&&(Ne.visible=!0),Ke(""),St(),Vt(),ht(),k?zi(k,A):me(),document.body.dataset.ready="true",document.body.dataset.readyMs=Math.round(performance.now()-e),document.body.dataset.drawCalls=Re.info.render.calls,document.body.dataset.triangles=Re.info.render.triangles}catch($){Ke("This map section could not load. Try another region."),console.error($)}}function St(){document.querySelectorAll("[data-level]").forEach(z=>{z.classList.toggle("active",z.dataset.level===L),z.setAttribute("aria-pressed",z.dataset.level===L)}),t("#region-select").value=se.id,t("#town-title").textContent="Towns in "+se.map,t("#town-list").replaceChildren();for(let z of b(se)){let D=M[z];if(!D)continue;let W=document.createElement("button");W.textContent=D.name,W.dataset.town=z,W.classList.toggle("active",z===ee.id),W.setAttribute("aria-pressed",z===ee.id),W.onclick=()=>Gt(z),t("#town-list").append(W)}t("#title").textContent=L==="state"?"Find your stretch of coast":L==="region"?se.map:(Q()&&T?T.name:le?.name)||ee.name,t("#subtitle").textContent=L==="state"?"Choose a region to compare places.":L==="region"?"Compare towns, then explore their neighborhoods.":"Tap a district for its character and housing context.",t("#district-list").replaceChildren();let k=(K()?U.meta.districts:r).filter(z=>z.town===ee.id||ee.id==="southbeach"&&z.town==="miami"),$=k.length>1||k.length===1&&k[0].name!==ee.name;t("#town-about").hidden=L!=="town"||$,t("#town-about").textContent="About "+ee.name,t("#town-about").onclick=()=>k.length===1?Ce(k[0]):Le(ee),t("#district-wrap").hidden=L!=="town"||!$,t("#district-title").textContent="Districts in "+ee.name;for(let z of k){let D=document.createElement("button");D.textContent=z.name===ee.name?"Town center":z.name,D.classList.toggle("active",le?.id===z.id),D.setAttribute("aria-pressed",le?.id===z.id),D.onclick=()=>Ce(z),t("#district-list").append(D)}if(Q()&&E){let z=document.querySelector("#lake-select");z||(z=document.createElement("select"),z.id="lake-select",z.setAttribute("aria-label","Explore a dune lake"),t("#district-wrap").append(z)),z.hidden=!1,z.replaceChildren();let D=document.createElement("option");D.textContent="Explore a dune lake",D.value="",z.append(D);for(let W of E.lakes){let O=document.createElement("option");O.value=W.id,O.textContent=W.name,z.append(O)}z.value=T?.id||"",z.onchange=()=>{let W=E.lakes.find(O=>String(O.id)===z.value);W&&Ge(W)}}else t("#lake-select")&&(t("#lake-select").hidden=!0);if(!k.length){let z=document.createElement("button");z.textContent=ee.name+" guide",z.onclick=()=>Le(ee),t("#district-list").append(z)}}let vt=[];function lt(A,k,$,z,D,W=1){let O=document.createElement("button");O.className="map-label "+z,O.textContent=A,O.onclick=D,t("#labels").append(O);let q=document.createElementNS("http://www.w3.org/2000/svg","line");q.setAttribute("stroke","#8a927a"),q.setAttribute("stroke-width","1"),t("#leaders").append(q);let re=null,pe=null;if((Q()||K())&&L==="region"&&z==="district-label"&&(pe=K()?U.meta.districts.find(he=>he.name===A):r.find(he=>he.name===A&&he.town===ee.id),pe&&(re=document.createElement("button"),re.className="district-anchor",re.setAttribute("aria-label","Explore "+A),re.dataset.district=pe.id,re.innerHTML=K()?Xu(pe,U.meta.recipes):gn(pe).split("<span>")[0],re.onclick=he=>{if(innerWidth<700&&he.detail){let Pe=vt.filter(Ue=>Ue.anchor&&Number.isFinite(Ue.ax)).sort((Ue,ze)=>Math.hypot(he.clientX-Ue.ax,he.clientY-Ue.ay)-Math.hypot(he.clientX-ze.ax,he.clientY-ze.ay))[0];_n(Pe?.d||pe)}else _n(pe)},t("#labels").append(re),O.onclick=()=>_n(pe))),L==="region"&&z==="town-label"){let he=document.createElement("button");he.className="region-town-dot",he.setAttribute("aria-label","Explore "+A),he.onclick=D,t("#labels").append(he),re=he}vt.push({b:O,x:k,y:$,priority:W,leader:q,anchor:re,d:pe})}function Vt(){if(t("#labels").replaceChildren(),t("#leaders").replaceChildren(),vt.length=0,L==="state")for(let A of p)lt(A.map,A.center[0],A.center[1],"region-label",()=>{se=A,ee=M[A.towns[0]],L="region",le=null,Be()},3);else if(L==="region"){let A=b(se).map($=>M[$]).filter(Boolean),k=m.filter($=>!se.towns.includes($.id)&&!(se.regionalDeferredTowns||[]).includes($.id)&&A.some(z=>Math.hypot(z.x-$.x,z.y-$.y)<d.framing.neighborRadiusKm));for(let $ of[...A,...k]){let z=se.towns.includes($.id),D=z?d.labels.priorityTowns.includes($.id)?200:100:10;lt($.name,$.x,$.y,"town-label",()=>Gt($.id),D);let W=vt.at(-1);W.b.classList.toggle("neighbor-label",!z),W.b.dataset.labelGroup=z?"own":"neighbor",W.anchor&&W.anchor.classList.toggle("neighbor-dot",!z)}}else{for(let A of m)K()||Q()&&A.id==="30a"||Math.hypot(A.x-ee.x,A.y-ee.y)>42||lt(A.name,A.x,A.y,"town-label",()=>{ee=A,se=Oe(A.id),le=null,L="town",Le(A),Be()},A.id===ee.id?5:2);for(let A of r.filter(k=>(!K()||U.meta.districts.some($=>$.id===k.id))&&(K()||Math.hypot(k.x-ee.x,k.y-ee.y)<24&&(L==="town"||k.town===ee.id||ee.id==="southbeach"&&k.town==="miami"))))lt(A.name,A.x,A.y,"district-label",()=>Ce(A),4)}}function gn(A){let k=A.style||"cottage",$=k==="alys",z=k==="rosemary",D=$?["#fffdf4","#f5f1e5","#fffaf0"]:z?["#d8b997","#e3c8aa","#d2b8a0"]:k==="seaside"?["#eabdb2","#b7d3d2","#e8d398"]:k==="watercolor"?["#b9c9a6","#e8d7b7","#bdd4cf"]:["#e4d0aa","#c8d4b4","#d5bfa6"],W='<svg viewBox="0 0 120 85" aria-hidden="true"><ellipse cx="60" cy="69" rx="50" ry="9" fill="#95876b" opacity=".13"/>',O=z?[[34,37,17,25],[54,31,17,28],[74,36,17,28],[29,57,17,25],[50,56,17,29],[72,58,17,25]]:[[26,38,16,16],[48,30,18,18],[73,36,18,17],[21,57,18,17],[47,58,20,20],[75,58,18,18],[94,49,13,15]];for(let q=0;q<O.length;q++){let[re,pe,he,Pe]=O[q],Ue=D[q%3],ze=$?"#fffdf7":z?"#9a9988":"#aebfba";W+=`<path d="M${re} ${pe}l${he} -6 8 6v${Pe}l-${he} 6 -8 -6z" fill="${Ue}"/><path d="M${re+he} ${pe-6}l8 6v${Pe}l-8 3z" fill="#bba98d" opacity=".35"/><path d="M${re-1} ${pe}l${he/2} -12 ${he/2+9} 6 -8 6z" fill="${ze}"/>`,$?W+=`<path d="M${re+4} ${pe+6}l7 -2 5 3v8l-7 3 -5 -3z" fill="#bac6ab"/>`:W+=`<path d="M${re+3} ${pe+6}v4m5 -5v4m5 -5v4" stroke="#789995" stroke-width="2"/><path d="M${re} ${pe+Pe-2}l${he} -5" stroke="#fff6dc" stroke-width="2"/>`,(k==="seaside"||k==="watercolor")&&(W+=`<path d="M${re-2} ${pe+Pe-4}l${he+3} -5 4 3 -${he+3} 5z" fill="#f8efd9"/><path d="M${re} ${pe+Pe-2}v5m${he-3} -9v5" stroke="#fdf9e9" stroke-width="1.4"/>`)}k==="seaside"&&(W+='<ellipse cx="62" cy="65" rx="12" ry="6" fill="#a7bf87"/><path d="M53 57l6 -27 4 -1 8 27z" fill="#fffbee" stroke="#b6b6a0" stroke-width=".6"/><path d="M58 57v-6q4 -7 8 0v6" fill="#9bb4aa"/>');for(let[q,re]of[[12,53],[92,68],[98,34]])W+=`<path d="M${q} ${re}v-8" stroke="#b0a17c"/><ellipse cx="${q}" cy="${re-10}" rx="5" ry="6" fill="#b2c18e"/><ellipse cx="${q-2}" cy="${re-12}" rx="3" ry="4" fill="#c5d2a6"/>`;return W+"</svg><span>"+A.name+"</span>"}function hr(){if(!Q()&&!K()||L!=="region")return;let A=Re.domElement.getBoundingClientRect(),k=t("header").getBoundingClientRect(),$=t("#controls").getBoundingClientRect(),z=vt.filter(O=>O.anchor).sort((O,q)=>O.x-q.x),D=[],W={seaside:100,alys:95,rosemary:90,grayton:85,"dune-allen":80,"inlet-beach":75,watercolor:70,"blue-mountain-beach":65,watersound:60,seagrove:55,seacrest:50,"santa-rosa-beach":45};z.forEach((O,q)=>{let re=new I(O.x,.004,-O.y).project(x);O.ax=A.left+(re.x*.5+.5)*A.width,O.ay=A.top+(-re.y*.5+.5)*A.height,O.side=q%2?-1:1,O.anchor.classList.toggle("coast-dot",innerWidth<700),O.anchor.style.left=O.ax+"px",O.anchor.style.top=O.ay+"px",O.anchor.dataset.screenX=O.ax,O.anchor.dataset.screenY=O.ay,O.anchor.dataset.worldX=O.x,O.anchor.dataset.worldY=O.y,O.anchor.style.visibility=re.z<=1&&O.ax>=0&&O.ax<=innerWidth&&O.ay>=0&&O.ay<=innerHeight?"visible":"hidden",O.b.style.visibility="hidden",O.leader.style.display="none"});for(let O of[...z].sort((q,re)=>(W[re.d.id]||re.d.labelPriority||0)-(W[q.d.id]||q.d.labelPriority||0))){if(O.anchor.style.visibility==="hidden")continue;let q=O.b.offsetWidth,re=O.b.offsetHeight,pe=O.ax,he=O.ay+O.side*(innerWidth<700?28:K()&&O.side<0?52:34),Pe={left:pe-q/2,right:pe+q/2,top:he-re/2,bottom:he+re/2},Ue=mt=>!(Pe.right+5<mt.left||Pe.left-5>mt.right||Pe.bottom+4<mt.top||Pe.top-4>mt.bottom);if(Pe.left<5||Pe.right>innerWidth-5||Pe.top<5||Pe.bottom>innerHeight-26||Ue(k)||Ue($)||D.some(Ue))continue;O.b.style.left=pe+"px",O.b.style.top=he+"px",O.b.style.visibility="visible",D.push(Pe);let ze=he-O.side*re/2;O.leader.setAttribute("x1",O.ax),O.leader.setAttribute("y1",O.ay),O.leader.setAttribute("x2",pe),O.leader.setAttribute("y2",ze),O.leader.dataset.length=Math.abs(ze-O.ay),O.leader.style.display="block"}}let xi=null;function _n(A){xi={target:F.clone(),span:te,position:x.position.clone(),left:x.left,right:x.right,top:x.top,bottom:x.bottom},qe.airport=0;let k=t('[data-priority="airport"]');k.classList.remove("active"),k.setAttribute("aria-pressed","false"),Ce(A)}function zi(A,k){let $={target:F.clone(),span:te,position:x.position.clone(),left:x.left,right:x.right,top:x.top,bottom:x.bottom},z=performance.now();document.body.dataset.flying="true";function D(W){if(k!==ge){document.body.dataset.flying="false";return}let O=Math.min(1,(W-z)/650),q=O*O*(3-2*O);F.lerpVectors(A.target,$.target,q),te=cr.lerp(A.span,$.span,q),x.position.lerpVectors(A.position,$.position,q);for(let re of["left","right","top","bottom"])x[re]=cr.lerp(A[re],$[re],q);x.lookAt(F),x.updateProjectionMatrix(),me(),O<1?requestAnimationFrame(D):(document.body.dataset.flying="false",Me(),me())}requestAnimationFrame(D)}function yi(A){if(A.userData.illustrated)return;A.userData.illustrated=!0;let k={"Atlas cream":"#f1e3c8","Atlas woodland":"#bdcba5","Atlas marsh":"#b4ccb0","Atlas fields":"#e5d9b7","Atlas golf":"#c4d29e","Atlas beach":"#fffdf1","Warm coastal ground":"#f1e3c8","Sugar sand":"#fffef4","Bay water":"#68bcb3","Dune lake water":"#8abbb0","Continuous forest canopy":"#bdcba5","Neighborhood streets":"#b6aa8e","Timpoochee pale trail":"#fff5df","Standing seam zinc":"#bfd0cb","Rosemary dark roof":"#9ca48e","Porch and trim":"#fff8e6","Shaded windows":"#81aaa6","Tree trunk":"#b6a581","Tree canopy":"#b3c896","Neighborhood greens":"#b5ca92",cream:"#f1dbb4",pink:"#e7b7ac",blue:"#a7cfce",sage:"#c7d5ad",white:"#fffdf6",taupe:"#dfc4a2",shingle:"#c3c6af"};A.traverse($=>{if(!$.isMesh)return;let z=Array.isArray($.material)?$.material:[$.material];for(let D of z){if(k[D.name]&&D.color.set(k[D.name]),/Homes/.test($.name+" "+$.parent?.name)&&(D.flatShading=!0,D.roughness=.92),D.name.startsWith("Shallows ")){let W=Number(D.name.split(" ").pop());D.color.set(W>1?"#44aebc":W>.3?"#64cfc9":"#91e1d0")}D.needsUpdate=!0}if($.isInstancedMesh&&/Homes.*rosemary/.test($.name+" "+$.parent?.name)){$.material=$.material.clone();let D=$.material,W=D.name==="taupe"?["#ddc7a3","#f2e8d2","#babcb6","#c4a05d","#ded1b6","#9b8270"]:D.name==="Rosemary dark roof"?["#50595b","#50595b","#50595b","#899493","#899493","#8e6d59","#8e6d59","#486357"]:D.name==="Shaded windows"?["#355b48"]:D.name==="Porch and trim"?["#f4ebd6","#655546","#edf0da"]:null;if(W){D.color.set("#ffffff");for(let O=0;O<$.count;O++){let q=$.instanceMatrix.array,re=O*16,pe=Math.abs(Math.round(q[re+12]*98765+q[re+14]*34567));$.setColorAt(O,new We(W[pe%W.length]))}$.userData.allColors=$.instanceColor.array.slice()}}})}function ur(){let A=[],k=t("header").getBoundingClientRect(),$=t("#controls").getBoundingClientRect(),z=d.labels.maxLeaderPx;for(let D of[...vt].sort((W,O)=>O.priority-W.priority)){D.leader.style.display="none",D.b.style.visibility="hidden",D.b.style.left="0px",D.b.style.top="0px";let W=new I(D.x,.004,-D.y).project(x),O=(W.x*.5+.5)*innerWidth,q=(-W.y*.5+.5)*innerHeight,re=W.z<=1&&O>=6&&O<=innerWidth-6&&q>=6&&q<=innerHeight-6;if(D.anchor&&(D.anchor.style.left=(re?O:0)+"px",D.anchor.style.top=(re?q:0)+"px",D.anchor.dataset.screenX=O,D.anchor.dataset.screenY=q,D.anchor.style.visibility=re?"visible":"hidden"),!re)continue;let pe=D.b.offsetWidth||100,he=D.b.offsetHeight||24;for(let[Pe,Ue]of[[0,-18],[0,18],[0,-34],[0,34],[0,-48],[0,48],[-24,-30],[24,30]]){let ze=Math.min(innerWidth-pe/2-8,Math.max(pe/2+8,O+Pe)),mt=q+Ue,ke={left:ze-pe/2,right:ze+pe/2,top:mt-he/2,bottom:mt+he/2},je=Ot=>!(ke.right+5<Ot.left||ke.left-5>Ot.right||ke.bottom+4<Ot.top||ke.top-4>Ot.bottom),ft=Math.max(ke.left,Math.min(ke.right,O)),pt=Math.max(ke.top,Math.min(ke.bottom,q)),Ct=Math.hypot(ft-O,pt-q);if(!(ke.top<10||ke.bottom>innerHeight-35||je(k)||je($)||A.some(je)||Ct>z)){if(D.b.style.left=ze+"px",D.b.style.top=mt+"px",D.b.style.visibility="visible",A.push(ke),D.b.dataset.anchorX=O,D.b.dataset.anchorY=q,Ct>2){for(let[Ot,xn]of Object.entries({x1:O,y1:q,x2:ft,y2:pt}))D.leader.setAttribute(Ot,xn);D.leader.dataset.length=Ct,D.leader.style.opacity=D.priority<50?d.labels.neighborOpacity:".8",D.leader.style.display="block"}break}}}}function vi(){if(L==="region"){ur();return}let A=[],k=t("header").getBoundingClientRect(),$=t("#controls").getBoundingClientRect();for(let z of[...vt].sort((D,W)=>W.priority-D.priority)){z.leader.style.display="none";let D=Re.domElement.getBoundingClientRect(),W=new I(z.x,Q()||K()||L==="region"?.004:.8,-z.y).project(x),O=z.b.offsetWidth||100,q=z.b.offsetHeight||28,re=(W.x*.5+.5)*innerWidth,pe=D.top+(-W.y*.5+.5)*D.height;if(L==="region"&&z.anchor&&(z.anchor.style.left=re+"px",z.anchor.style.top=pe+"px",z.anchor.dataset.screenX=re,z.anchor.dataset.screenY=pe),W.z>1||re<-O||re>innerWidth+O||pe<0||pe>innerHeight){z.b.style.visibility="hidden";continue}if((Q()||K())&&L==="region"&&z.b.classList.contains("district-label"))continue;if(L!=="region"&&(re<O/2+10||re>innerWidth-O/2-10)){z.b.style.visibility="hidden";continue}let he=!1,Pe=re;for(let[Ue,ze]of L==="state"?[[0,0],[-150,0],[150,0],[-260,0],[260,0]]:L==="region"?[[0,0],[0,-30],[0,30],[0,-60],[0,60]]:[[0,0]]){re=Math.min(innerWidth-O/2-10,Math.max(O/2+10,Pe+Ue));let mt={left:re-O/2,right:re+O/2,top:pe+ze-q/2,bottom:pe+ze+q/2},ke=je=>!(mt.right+5<je.left||mt.left-5>je.right||mt.bottom+4<je.top||mt.top-4>je.bottom);if(!(mt.top<12||mt.bottom>innerHeight-45||ke(k)||ke($)||A.some(ke))){z.b.style.left=re+"px",z.b.style.top=pe+ze+"px",z.b.style.visibility="visible",(Math.abs(ze)>3||L==="state")&&(z.leader.setAttribute("x1",(W.x*.5+.5)*innerWidth),z.leader.setAttribute("y1",(-W.y*.5+.5)*innerHeight),z.leader.setAttribute("x2",re),z.leader.setAttribute("y2",pe+ze),z.leader.style.display="block"),A.push(mt),he=!0;break}}he||(z.b.style.visibility="hidden")}}let ki=new Map;async function Hi(){if(!Q()||L!=="town")return;let A=le?.id||"seaside";if(ki.has(A)||!E.neighborhoodCanopies?.[A])return;let k=await new pn().loadAsync(i+E.neighborhoodCanopies[A].file),$=document.createElement("canvas");$.width=k.image.width,$.height=k.image.height;let z=$.getContext("2d");z.drawImage(k.image,0,0),ki.set(A,z.getImageData(0,0,$.width,$.height)),k.dispose(),ws=""}let Mi=null;function dr(){if(Mi)return Mi;let A=new ui(23e-5,48e-5,.019,5);A.translate(0,.0095,0);let k=[];for(let z=0;z<9;z++){let D=z*Math.PI*2/9,W=Math.cos(D),O=Math.sin(D);for(let q=0;q<5;q++){let re=q/5,pe=(q+1)/5,he=(ke,je)=>{let ft=.0045*ke,pt=72e-5*Math.sin(Math.PI*ke)*je;return[W*ft-O*pt,.019+.0035*Math.sin(Math.PI*ke)-.0018*ke,O*ft+W*pt]},Pe=he(re,-1),Ue=he(re,1),ze=he(pe,-1),mt=he(pe,1);k.push(...Pe,...Ue,...ze,...Ue,...mt,...ze)}}let $=new _t;return $.setAttribute("position",new at(k,3)),$.computeVertexNormals(),Mi=[{geometry:A,material:new qt({color:"#b9a27c",roughness:1})},{geometry:$,material:new qt({color:"#91ad72",side:Dt,roughness:1,flatShading:!0})}],Mi}let Ss=null,Rn=new At,ws="";Ae.add(Rn);function w(){if(document.body.dataset.flying==="true"){Rn.visible=!1;return}if(Rn.visible=Q()&&L==="town",!Rn.visible||!Ss||!Ne||!E)return;let A=F.x.toFixed(4)+","+F.z.toFixed(4);if(A===ws)return;for(ws=A;Rn.children.length;)Rn.children.pop().dispose?.();let k=[],$=new Set(P),z=.004;Ne.traverse(ke=>{if(!ke.isInstancedMesh)return;let je=ke.name+" "+ke.parent?.name;if(/Trees/.test(je)){k.push(ke);return}let ft=ke.userData.allMatrices||ke.instanceMatrix.array;for(let pt=0;pt<ft.length;pt+=16){let Ct=ft[pt+12],Ot=ft[pt+14];if(Math.abs(Ct-F.x)>1||Math.abs(Ot-F.z)>1)continue;let xn=Math.hypot(ft[pt],ft[pt+2]),As=Math.hypot(ft[pt+8],ft[pt+10]),fr=Math.max(xn,As)*.75+.003;for(let pr=Math.floor((Ct-fr)/z);pr<=Math.ceil((Ct+fr)/z);pr++)for(let mr=Math.floor((Ot-fr)/z);mr<=Math.ceil((Ot+fr)/z);mr++){let Nl=(pr+.5)*z-Ct,Ul=(mr+.5)*z-Ot;Math.abs((Nl*ft[pt]+Ul*ft[pt+2])/xn)<xn*.5+.001&&Math.abs((Nl*ft[pt+8]+Ul*ft[pt+10])/As)<As*.5+.001&&$.add(pr+","+mr)}}});let D=le?.id||"seaside",W=ki.get(D),O=W?E.neighborhoodCanopies[D].bounds:E.canopyBounds,q=W||Ss,re=[],pe=te*.55,he=(x.top-x.bottom)*.78,Pe=(E.scaleRule.treeSpacingMeters||8)/1e3;for(let ke=Math.floor((F.x-pe)/Pe)*Pe;ke<F.x+pe;ke+=Pe)for(let je=Math.floor((F.z-he)/Pe)*Pe;je<F.z+he;je+=Pe){if($.has(Math.floor(ke/z)+","+Math.floor(je/z)))continue;let ft=(ke-O[0])/(O[2]-O[0]),pt=(O[3]+je)/(O[3]-O[1]);if(ft<0||ft>=1||pt<0||pt>=1)continue;let Ct=q.data[(Math.floor(pt*q.height)*q.width+Math.floor(ft*q.width))*4],Ot=Math.sin(ke*72+Math.sin(je*39)*2)+Math.cos(je*63+Math.sin(ke*27)*2);if(Ct<110||Ot<-.2||Math.sin(ke*1937+je*1271)<-.05)continue;let xn=Math.sin(ke*1813+je*912)*.0035,As=Math.sin(ke*931-je*1717)*.0035;if(re.push([ke+xn,.003,je+As]),re.length>=18e3)break}let Ue=E.districts.find(ke=>ke.id===D),ze=[],mt=[];for(let ke of re){let je=Ue&&ke[2]>-Ue.y-.18;(Math.abs(Math.sin(ke[0]*4171+ke[2]*7583))<(je?.72:.16)?ze:mt).push(ke)}for(let ke of k){let je=new En(ke.geometry,ke.material,mt.length);je.castShadow=!n,je.receiveShadow=!0;let ft=new Xe;mt.forEach((pt,Ct)=>{let Ot=.55+.22*Math.abs(Math.sin(pt[0]*1173+pt[2]*837));ft.makeScale(Ot,Ot,Ot),ft.setPosition(...pt),je.setMatrixAt(Ct,ft),je.setColorAt(Ct,new We(["#edf0cf","#d1dfb6","#b9ce9d","#dce6be"][Ct%4]))}),je.computeBoundingSphere(),Rn.add(je)}for(let ke of dr()){let je=new En(ke.geometry,ke.material,ze.length),ft=new Xe,pt=new Qt;ze.forEach((Ct,Ot)=>{let xn=.72+.25*Math.abs(Math.sin(Ct[0]*831+Ct[2]*413));pt.setFromAxisAngle(new I(0,1,0),Ct[0]*877),ft.compose(new I(...Ct),pt,new I(xn,xn,xn)),je.setMatrixAt(Ot,ft)}),je.castShadow=!n,je.receiveShadow=!0,je.computeBoundingSphere(),Rn.add(je)}document.body.dataset.palmTrees=ze.length,document.body.dataset.forestTrees=re.length}function G(){let A=L==="state"?C:Q()?Ne:ne;if(!A)return;let k=Q()?.1:4,$=te*.5+k,z=(x.top-x.bottom)*.72+k;A.traverse(D=>{if(!D.isInstancedMesh)return;Q()&&/Trees/.test(D.name+" "+D.parent?.name)?D.visible=L!=="town":D.visible=!0;let W=D.userData.allMatrices||(D.userData.allMatrices=D.instanceMatrix.array.slice()),O=0;for(let q=0;q<W.length;q+=16)L!=="state"&&(Math.abs(W[q+12]-F.x)>$||Math.abs(W[q+14]-F.z)>z)||(D.userData.allColors&&D.instanceColor.array.set(D.userData.allColors.subarray(q/16*3,q/16*3+3),O*3),D.instanceMatrix.array.set(W.subarray(q,q+16),O++*16));D.count=Q()&&L==="region"&&innerWidth<700?0:O,Q()&&L==="town"&&/Homes.*alys/.test(D.name+" "+D.parent?.name)&&(D.count=0),D.instanceColor&&(D.instanceColor.needsUpdate=!0),D.instanceMatrix.needsUpdate=!0,D.computeBoundingSphere()})}let Y=null,J="",H=null;function fe(){if(!H){H=new At,Ae.add(H);let z=new qt({color:"#fff9eb",roughness:.9,flatShading:!0}),D=new qt({color:"#b0c5c0",roughness:.9,flatShading:!0}),W=[{name:"Natchez",x:-205.7424992632622,y:703.2363057903973,lon:-86.1418426,lat:30.320445,source:"https://www.openstreetmap.org/way/103387124",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."},{name:"Odessa",x:-205.67593401064562,y:703.2109954286946,lon:-86.1411452,lat:30.3202274,source:"https://www.openstreetmap.org/way/103387122",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."},{name:"Pensacola",x:-205.60728643773982,y:703.1871811372487,lon:-86.1404264,lat:30.3200236,source:"https://www.openstreetmap.org/way/103387107",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."},{name:"West Ruskin",x:-205.5397196668342,y:703.1603112161185,lon:-86.1397183,lat:30.3197921,source:"https://www.openstreetmap.org/way/103387092",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."},{name:"East Ruskin",x:-205.22279844768693,y:703.0381293671229,lon:-86.1363977,lat:30.3187409,source:"https://www.openstreetmap.org/way/103386960",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."},{name:"Savannah",x:-205.15518558183663,y:703.0138250207976,lon:-86.1356896,lat:30.3185325,source:"https://www.openstreetmap.org/way/103386996",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."},{name:"Tupelo",x:-205.08809111901192,y:702.9895300382666,lon:-86.1349869,lat:30.3183241,source:"https://www.openstreetmap.org/way/103386912",positionMethod:"OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}];for(let O of W){let q=new At;q.position.set(O.x,.003,-O.y),q.rotation.y=.36,q.name=O.name+" street-end pavilion (OSM access placement)";let re=(Ue,ze,mt,ke,je,ft,pt)=>{let Ct=new gt(new An(ke,je,ft),pt);Ct.position.set(Ue,ze,mt),Ct.castShadow=!0,q.add(Ct)};re(0,4e-4,0,.006,8e-4,.008,z);for(let Ue of[-.0023,.0023])for(let ze of[-.0032,.0032])re(Ue,.0032,ze,5e-4,.006,5e-4,z);let pe=[-.003,.006,-.004,.003,.006,-.004,0,.009,-.004,-.003,.006,.004,.003,.006,.004,0,.009,.004],he=new _t;he.setAttribute("position",new at(pe,3)),he.setIndex([0,2,5,0,5,3,1,4,5,1,5,2,0,1,2,3,5,4]),he.computeVertexNormals();let Pe=new gt(he,D);Pe.castShadow=!0,q.add(Pe),H.add(q)}}if(H.visible=Q()&&L==="town",Y||(Y=new Oi(new _t,new Nn({color:"#718f89",transparent:!0,opacity:.65})),Ae.add(Y)),Y.visible=Q()&&L==="town",!Y.visible||document.body.dataset.flying==="true")return;let A=F.x+","+F.z+","+innerWidth;if(A===J)return;J=A;let k=[],$=new Xe;Ne.updateMatrixWorld(!0),Ne.traverse(z=>{if(!z.isInstancedMesh||!/Homes/.test(z.name+" "+z.parent?.name)||!["Standing seam zinc","Rosemary dark roof"].includes(z.material.name))return;let D=(W,O)=>{for(let q of[W,O]){let re=new I(...q).applyMatrix4($).applyMatrix4(z.matrixWorld);k.push(re.x,re.y,re.z)}};for(let W=0;W<z.count;W++)if(z.getMatrixAt(W,$),D([0,1,.395],[0,1,-.515]),D([-.47,.77,.395],[0,1,.395]),D([0,1,.395],[.47,.77,.395]),z.material.name==="Standing seam zinc")for(let O of[-.32,-.16,.16,.32]){let q=1-Math.abs(O)/.47*.23;D([O,q,.395],[O,q,-.515])}}),Y.geometry.dispose(),Y.geometry=new _t,Y.geometry.setAttribute("position",new at(k,3))}function me(){if(L==="region"&&_.get("regionalExport")!=="1"){nt&&Fe===u[se.id]&&be();return}oe.visible=!N,v&&(v.visible=Q()&&L==="town"),S&&(S.visible=ee.id==="30a"||L==="state"),G(),w(),fe(),Re.render(Ae,x),vi(),hr(),document.body.dataset.drawCalls=Re.info.render.calls,document.body.dataset.triangles=Re.info.render.triangles,document.body.dataset.viewport=innerWidth+"\xD7"+innerHeight,N&&(document.body.dataset.camera=JSON.stringify({position:x.position.toArray(),target:F.toArray(),left:x.left,right:x.right,top:x.top,bottom:x.bottom,near:x.near,far:x.far,projection:"orthographic",mapUnits:"kilometers",tiltDegrees:45}))}function Le(A){T=null,le=null,t("#card-title").textContent=A.name,t("#card-copy").textContent=A.blurb||"Explore the surrounding coastal neighborhoods.",t("#card-price").textContent=A.price?"Town-level housing context: "+A.price:"Current neighborhood price ranges are not yet verified.",t("#card-source").href="https://www.floridacoastal.co/towns/"+(A.id==="miami"?"southbeach":A.id)+".html",t("#card-source").textContent="Read the Florida Coastal guide",t("#card").hidden=!1,document.body.classList.add("card-open")}function Ce(A){T=null,le=A,(A.town==="30a"||K())&&(L=qe.airport?"region":"town",Be()),t("#card-title").textContent=A.name,t("#card-copy").textContent=A.description,t("#card-price").textContent=A.priceRange||A.priceBenchmark||A.priceStatus,t("#card-source").href=A.priceSource||A.source,t("#card-source").textContent=A.priceSource?"View market-price source":"Place guide";let k=document.querySelector("#card-place");k||(k=document.createElement("a"),k.id="card-place",k.target="_blank",k.rel="noopener",t("#card-source").after(k)),k.href=A.source,k.textContent=" \xB7 Place guide",t("#card").hidden=!1,document.body.classList.add("card-open"),ht(),me()}let Ye=document.createElement("button");Ye.id="controls-slim",Ye.textContent="Towns & districts \xB7 open navigation",Ye.onclick=()=>t("#card-close").click(),t("#controls").prepend(Ye),t("#card-close").onclick=()=>{t("#card").hidden=!0,document.body.classList.remove("card-open"),le=null,ht(),me()};function $e(){for(;oe.children.length;){let A=oe.children[0];oe.remove(A),A.geometry?.dispose(),A.material?.dispose()}}function De(A,k,$,z=.55){let D=new gt(new Mo(z*.65,z,48),new Ut({color:$,transparent:!0,opacity:.8,side:Dt,depthTest:!1}));D.rotation.x=-Math.PI/2,D.position.set(A,Q()?.004:.6,-k),D.renderOrder=10,oe.add(D)}function rt(A,k,$=!1){let z=new _t().setFromPoints(A.map(O=>new I(O[0],Q()?.004:.7,-O[1]))),D=$?new So({color:k,dashSize:.5,gapSize:.3,depthTest:!1}):new Nn({color:k,depthTest:!1}),W=new hi(z,D);$&&W.computeLineDistances(),W.renderOrder=11,oe.add(W)}function ht(){$e();for(let A=vt.length-1;A>=0;A--)vt[A].b.classList.contains("feature-label")&&(vt[A].b.remove(),vt[A].leader.remove(),vt.splice(A,1));t("#match-note").textContent=de?"Your quiz priorities, mapped to places.":"Preview a priority, or bring your top five from the quiz.";for(let A of o){if(!qe[A.kind]||Math.hypot(A.x-ee.x,A.y-ee.y)>50||ie.length&&!ie.includes(A.town)&&!(A.town==="miami"&&ie.includes("southbeach")))continue;let k={beach:"#d18a34",water:"#1a777f",walk:"#b3542b",airport:"#695a92"}[A.kind];if(De(A.x,A.y,k,Q()?.025:A.kind==="walk"?.9:.55),lt(A.name,A.x,A.y,"feature-label",()=>{t("#card-title").textContent=A.name,t("#card-copy").textContent="Highlighted for your "+{water:"boating",walk:"walkability",beach:"beach",airport:"airport access"}[A.kind]+" priority.",t("#card-price").textContent=A.boundaryNote||"Access rules and hours should be checked locally.",t("#card-source").href=A.source||"https://www.floridacoastal.co/towns/"+(A.town==="miami"?"southbeach":A.town)+".html",t("#card-source").textContent="Read the town guide",t("#card").hidden=!1,document.body.classList.add("card-open")},6),A.path&&rt(A.path,k),A.paths)for(let $ of A.paths)rt($,k)}if(Object.values(qe).some(Boolean)&&!o.some(A=>qe[A.kind]&&Math.hypot(A.x-ee.x,A.y-ee.y)<50)&&(t("#match-note").textContent="Verified amenity overlays are not available for this town yet."),qe.airport){let A=o.find(k=>k.kind==="airport"&&(k.town===ee.id||ee.id==="southbeach"&&k.town==="miami"));if(A){let k=le||ee,$=Ie.find(z=>(z.town===ee.id||ee.id==="southbeach"&&z.town==="miami")&&(le?z.district===le.id:!z.district)&&Array.isArray(z.points)&&z.points.length>1&&z.points.every(D=>Array.isArray(D)&&D.length===2&&D.every(Number.isFinite)));rt($?$.points:[[k.x,k.y],[A.x,A.y]],"#695a92",!$),t("#match-note").textContent=$?.minutes?String($.minutes)+" min \xB7 "+($.asOf||"provided route estimate"):le?.airportMinutes?le.airportMinutes+" \xB7 guide estimate, traffic varies.":"Dashed line shows the airport connection, not a road route. Drive time needs verified routing data."}}le&&De(le.x,le.y,"#aa512a",Q()||K()?.015:.85);for(let A of ie){let k=M[A];k&&De(k.x,k.y,"#b75225",L==="state"?8:1.3)}}for(let A of p){let k=document.createElement("option");k.value=A.id,k.textContent=A.map,t("#region-select").append(k)}function Mt(){T=null,le=null,t("#card").hidden=!0,document.body.classList.remove("card-open")}function Gt(A){ee=M[A],se=Oe(A),L="town",Mt(),Be()}t("#region-select").onchange=A=>{se=p.find(k=>k.id===A.target.value),ee=M[b(se)[0]],L="region",Mt(),Be()};for(let A of document.querySelectorAll("[data-level]"))A.onclick=()=>{L=A.dataset.level,Mt(),Be()};for(let A of document.querySelectorAll("[data-priority]"))A.onclick=()=>{let k=A.dataset.priority;qe[k]=qe[k]?0:3,A.classList.toggle("active",!!qe[k]),A.setAttribute("aria-pressed",!!qe[k]),k==="airport"&&ee.id==="30a"?(L="region",Be()):(ht(),me())};function ut(A){if(!A||!Array.isArray(A.top5))return!1;ie=A.top5.map(k=>typeof k=="string"?k:k.id).filter(k=>M[k]).slice(0,5),Ie=Array.isArray(A.airportRoutes)?[...A.airportRoutes,...a]:a,qe={};for(let k of["beach","water","walk","airport"])qe[k]=Number(A.weights?.[k])>0?3:0;de=ie.length>0,t("#top-five").replaceChildren();for(let[k,$]of ie.entries()){let z=document.createElement("button");z.textContent=k+1+". "+M[$].name,z.onclick=()=>{ee=M[$],se=Oe($),L="region",le=null,Be()},t("#top-five").append(z)}for(let k of document.querySelectorAll("[data-priority]"))k.classList.toggle("active",!!qe[k.dataset.priority]),k.setAttribute("aria-pressed",!!qe[k.dataset.priority]);return ie.length&&(ee=M[ie[0]],se=Oe(ee.id)),Be(),!0}window.setFloridaCoastalResults=ut,window.addEventListener("floridacoastal:results",A=>ut(A.detail)),window.addEventListener("message",A=>{A.origin!==location.origin&&A.origin!=="https://www.floridacoastal.co"&&A.origin!=="https://floridacoastal.co"||A.data?.type==="floridacoastal:results"&&ut(A.data.payload)}),t("#import-results").onchange=async A=>{try{let k=JSON.parse(await A.target.files[0].text());if(!ut(k))throw Error();t("#import-note").textContent="Quiz matches loaded."}catch{t("#import-note").textContent="Use an exported top-five result file."}},window.addEventListener("resize",()=>{Re.setSize(innerWidth,innerHeight),L==="region"?Be():(Me(),me())}),_.get("district")&&(le=r.find(A=>A.id===_.get("district")),le&&(L="town")),await Be(),le&&K()&&Ce(le)}X_().catch(i=>{document.querySelector("#status").textContent="The map could not load. Please refresh.",console.error(i)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
