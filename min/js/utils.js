class Histogram{constructor(hist){this.step=hist.step;this.values=this.createValues(hist.histogram.start,hist.histogram.stop,hist.histogram.step,hist.histogram.offset);this.counts=Array.from({length:this.values.length}).fill(0);for(let index_count of hist.histogram.index_values){this.counts[index_count[0]]=index_count[1];}}
getMinMax(){let min=null,max=null;for(let i=0;i<this.counts.length;i++){if(this.counts[i]>0){min=this.values[i-1];break;}}
for(let i=this.counts.length-1;i>=0;i--){if(this.counts[i]>0){max=this.values[i+1];break;}}
if(min===null&&max===null){min=-1.0;max=1.0;}
return[min,max];}
createValues(start,stop,step,offset){let values=[-Infinity,offset,Infinity];let value=start;while(value<=stop){values.splice(1,0,offset-value);values.splice(values.length-1,0,offset+value);value*=step;}
return values;}
getBinIndex(value){if(value==Infinity){return this.values.length-1;}else{return this.binarySearch(value,0,this.values.length-1);}}
binarySearch(value,low,high){while(true){let middle=Math.floor((high+low)/2);if(high-low<=1){return low;}else if(value<this.values[middle]){high=middle;}else{low=middle;}}}
getCounts(min_value,max_value,span_value){const results=[];let bucketPos=0;let binLeft=min_value;while(binLeft<max_value){let binRight=binLeft+span_value;let count=0.0;while(bucketPos<this.values.length-1){let bucketLeft=this.values[bucketPos];let bucketRight=Math.min(max_value,this.values[bucketPos+1]);let intersect=Math.min(bucketRight,binRight)-Math.max(bucketLeft,binLeft);if(intersect>0){if(bucketLeft==Infinity){count+=this.counts[bucketPos];}else{count+=(intersect/(bucketRight-bucketLeft))*this.counts[bucketPos];}}
if(bucketRight>binRight){break;}
bucketPos+=1;}
results.push(count);binLeft+=span_value;}
return results;}}
function makeLink(text,url){let span=document.createElement("span");span.innerHTML=text.link(url);return span;}
function copy(obj){if(!obj||true==obj)
return obj;let objType=typeof obj;if("number"==objType||"string"==objType)
return obj;let result=Array.isArray(obj)?[]:!obj.constructor?{}:new obj.constructor();if(obj instanceof Map)
for(var key of obj.keys())result.set(key,copy(obj.get(key)));for(var key in obj)
if(obj.hasOwnProperty(key))result[key]=copy(obj[key]);return result;}
function identity(v){return v;}
function compare(field,reverse=false,func=identity){return function(a,b){let nameA=func(a[field]);let nameB=func(b[field]);if(typeof a[field]==="string"&&typeof b[field]==="string"){nameA=a[field].toUpperCase();nameB=b[field].toUpperCase();}else if(typeof a[field]!==typeof b[field]){nameA=typeof a[field];nameB=typeof b[field];}
let result=0;if(nameA<nameB){result=-1;}else if(nameA>nameB){result=1;}
if(reverse)result=result*-1;return result;};}
function capitalize(text){return text.charAt(0).toUpperCase()+text.slice(1);}
function title(text){return text.replace(/(^\w{1})|(\s{1}\w{1})/g,match=>match.toUpperCase());}
function format(date,mask,utc){return dateFormat(date,mask,utc);}
var dateFormat=(function(){var token=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,pad=function(val,len){val=String(val);len=len||2;while(val.length<len)val="0"+val;return val;};return function(date,mask,utc){var dF=dateFormat;if(arguments.length==1&&Object.prototype.toString.call(date)=="[object String]"&&!/\d/.test(date)){mask=date;date=undefined;}
date=date?new Date(date):new Date();if(isNaN(date))throw SyntaxError("invalid date");mask=String(dF.masks[mask]||mask||dF.masks["default"]);if(mask.slice(0,4)=="UTC:"){mask=mask.slice(4);utc=true;}
var _=utc?"getUTC":"get",d=date[_+"Date"](),D=date[_+"Day"](),m=date[_+"Month"](),y=date[_+"FullYear"](),H=date[_+"Hours"](),M=date[_+"Minutes"](),s=date[_+"Seconds"](),L=date[_+"Milliseconds"](),o=utc?0:date.getTimezoneOffset(),flags={d:d,dd:pad(d),ddd:dF.i18n.dayNames[D],dddd:dF.i18n.dayNames[D+7],m:m+1,mm:pad(m+1),mmm:dF.i18n.monthNames[m],mmmm:dF.i18n.monthNames[m+12],yy:String(y).slice(2),yyyy:y,h:H%12||12,hh:pad(H%12||12),H:H,HH:pad(H),M:M,MM:pad(M),s:s,ss:pad(s),l:pad(L,3),L:pad(L>99?Math.round(L/10):L),t:H<12?"a":"p",tt:H<12?"am":"pm",T:H<12?"A":"P",TT:H<12?"AM":"PM",Z:utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,""),o:(o>0?"-":"+")+
pad(Math.floor(Math.abs(o)/60)*100+(Math.abs(o)%60),4),S:["th","st","nd","rd"][d%10>3?0:(((d%100)-(d%10)!=10)*d)%10]};return mask.replace(token,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length-1);});};})();dateFormat.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(mask,utc){return dateFormat(this,mask,utc);};