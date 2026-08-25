var KEY='bracket.v2',MK='ui.mode';
function ld(){try{return JSON.parse(localStorage.getItem(KEY))||{list:[]}}catch(e){return{list:[]}}}
var db=ld();
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('Не хватает места в браузере — уменьшите логотипы или удалите старые турниры')}}
var S={view:'home',id:null,round:0,rounds:false,z:1,tx:8,ty:8,fit:''},draft=null,PKI='';
function det(){try{var ua=navigator.userAgent||'',ph=/Android|iPhone|iPod|Windows Phone|IEMobile|Opera Mini|Mobile/i.test(ua),tc=(navigator.maxTouchPoints||0)>1,w=window.innerWidth;if(ph&&w<=1024)return'mobile';if(tc&&w<=900)return'mobile';return w<=760?'mobile':'desktop'}catch(e){return'desktop'}}
var ov=null;try{ov=localStorage.getItem(MK)}catch(e){}
if(ov!=='mobile'&&ov!=='desktop')ov=null;
var MODE=ov||det();
function am(){document.body.className=MODE==='mobile'?'m':'d'}
var rtm;
window.addEventListener('resize',function(){if(ov)return;clearTimeout(rtm);rtm=setTimeout(function(){var m=det();if(m!==MODE){MODE=m;am();S.fit='';R()}},180)});
function cur(){for(var i=0;i<db.list.length;i++)if(db.list[i].id===S.id)return db.list[i];return null}
function uid(){return Math.random().toString(36).slice(2,9)}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function isImg(i){return /^(https?:\/\/|data:image)/i.test(i||'')}
function ico(t){var i=t?String(t.icon||'').trim():'';if(isImg(i))return'<img class="ic" src="'+esc(i)+'" alt="">';if(i)return'<span class="ic">'+esc(i.slice(0,2))+'</span>';return'<span class="ic q">?</span>'}
function icoBig(t,cl){var i=t?String(t.icon||'').trim():'';cl=cl||'ib';if(isImg(i))return'<span class="'+cl+'"><img src="'+esc(i)+'" alt=""></span>';return'<span class="'+cl+'">'+(i?esc(i.slice(0,2)):'?')+'</span>'}
function pw(x){var s=2;while(s<x)s*=2;return s}
function lg(t,m){t.log=t.log||[];t.log.push({at:new Date().toLocaleString(),msg:m});if(t.log.length>200)t.log.shift()}
function rdIcon(f,cb){if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){try{var k=Math.min(1,96/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/png'))}catch(e){cb(fr.result)}};im.onerror=function(){cb(fr.result)};im.src=fr.result};fr.readAsDataURL(f)}
var PR=[
{i:'🐉',g:'Dota 2',n:'The International — Playoffs',d:'Main Event',f:'double',bo:3,s:8,t:[['Team Spirit','👻'],['PSG.LGD','🐼'],['OG','🟢'],['Tundra Esports','🦌'],['Gaimin Gladiators','🛡'],['Team Liquid','💧'],['Virtus.pro','🐻'],['Xtreme Gaming','🐯']]},
{i:'🎯',g:'CS2',n:'CS2 Major — Champions Stage',d:'Playoffs',f:'single',bo:3,s:8,t:[['Natus Vincere','⭐'],['FaZe Clan','🔥'],['Team Vitality','🐝'],['G2 Esports','⚔'],['Team Spirit','👻'],['MOUZ','🐭'],['Astralis','✳'],['Heroic','🦁']]},
{i:'⚔',g:'League of Legends',n:'Worlds — Knockout Stage',d:'October',f:'single',bo:5,s:8,t:[['T1','🔴'],['Gen.G','🟡'],['JD Gaming','🐲'],['Bilibili Gaming','🐺'],['Weibo Gaming','🕊'],['KT Rolster','🟣'],['LNG Esports','🐉'],['Fnatic','🟠']]},
{i:'🔫',g:'Valorant',n:'VCT Champions — Playoffs',d:'Grand Final week',f:'double',bo:3,s:8,t:[['Sentinels','🎯'],['EDward Gaming','🦅'],['Fnatic','🟠'],['Paper Rex','🦖'],['LOUD','💚'],['Team Heretics','⚫'],['DRX','🐊'],['G2 Esports','⚔']]},
{i:'🚀',g:'Rocket League',n:'RLCS World Championship',d:'Main Stage',f:'double',bo:5,s:8,t:[['Karmine Corp','🔵'],['Team BDS','⚡'],['G2 Esports','⚔'],['NRG','🏎'],['Team Vitality','🐝'],['FURIA','🐆'],['Moist Esports','🌊'],['Spacestation','🛸']]}];
function ord(n){var a=[0];for(var s=1;s<n;s*=2){var b=[],i;for(i=0;i<a.length;i++){b.push(a[i]);b.push(s*2-1-a[i])}a=b}return a}
function build(t){var size=t.size||4,n=Math.round(Math.log(size)/Math.LN2),W=[],L=[],all=[],i,r,k,gf=null,o=ord(size);
function mk(br,rd,ix,a,b){var m={id:br+rd+'-'+ix,bracket:br,round:rd,idx:ix,a:a,b:b};all.push(m);return m}
W[0]=[];for(i=0;i<size/2;i++)W[0].push(mk('W',0,i,{seed:o[i*2]},{seed:o[i*2+1]}));
for(r=1;r<n;r++){W[r]=[];for(i=0;i<size/Math.pow(2,r+1);i++)W[r].push(mk('W',r,i,{w:W[r-1][i*2].id},{w:W[r-1][i*2+1].id}))}
if(t.format==='double'&&size>=4){var li=0,L0=[];for(i=0;i<size/4;i++)L0.push(mk('L',li,i,{l:W[0][i*2].id},{l:W[0][i*2+1].id}));L.push(L0);li++;
for(k=1;k<n;k++){var pv=L[L.length-1];if(k>1){var mn=[];for(i=0;i<pv.length/2;i++)mn.push(mk('L',li,i,{w:pv[i*2].id},{w:pv[i*2+1].id}));L.push(mn);li++}
var sr=L[L.length-1],mj=[];for(i=0;i<W[k].length;i++)mj.push(mk('L',li,i,{w:sr[i].id},{l:W[k][i].id}));L.push(mj);li++}
gf=mk('GF',0,0,{w:W[n-1][0].id},{w:L[L.length-1][0].id})}
return{size:size,n:n,W:W,L:L,gf:gf,all:all}}
function solve(t){var B=build(t),out={},res=t.results||{},map={},i;
for(i=0;i<t.teams.length;i++)map[t.teams[i].id]=t.teams[i];
function val(s){if(!s)return null;if('seed' in s){var id=t.seeds[s.seed];return id?(map[id]||null):null}if(s.w)return out[s.w]?out[s.w].winner:null;return out[s.l]?out[s.l].loser:null}
for(i=0;i<B.all.length;i++){var m=B.all[i],a=val(m.a),b=val(m.b),r=res[m.id]||{};m.ta=a;m.tb=b;m.sa=r.sa==null?0:r.sa;m.sb=r.sb==null?0:r.sb;var w=null,l=null;
if(a&&b&&m.sa!==m.sb){if(m.sa>m.sb){w=a;l=b}else{w=b;l=a}}out[m.id]={winner:w,loser:l};m.winner=w;m.loser=l}
(B.gf||B.W[B.W.length-1][0]).isFinal=true;return B}
function stEl(){return document.getElementById('stage')}
function zmEl(){return document.getElementById('zoom')}
function az(){var z=zmEl();if(!z)return;z.style.transform='translate('+S.tx+'px,'+S.ty+'px) scale('+S.z+')';var v=document.querySelector('.zval');if(v)v.textContent=Math.round(S.z*100)+'%'}
function sz(nz,cx,cy){var s=stEl();if(!s)return;nz=Math.max(.2,Math.min(3,nz));var r=s.getBoundingClientRect(),px=(cx==null?r.width/2:cx-r.left),py=(cy==null?r.height/2:cy-r.top);S.tx=px-(px-S.tx)*(nz/S.z);S.ty=py-(py-S.ty)*(nz/S.z);S.z=nz;az()}
function fit(){var s=stEl(),z=zmEl();if(!s||!z)return;var w=z.scrollWidth||1,h=z.scrollHeight||1,k=Math.min((s.clientWidth-12)/w,(s.clientHeight-12)/h,1.2);S.z=Math.max(.2,k);S.tx=8;S.ty=8;az()}
function goTo(sel,md){var s=stEl(),z=zmEl();if(!s||!z)return;var el=z.querySelector(sel);if(!el)return;
var r=el.getBoundingClientRect(),zr=z.getBoundingClientRect(),x=(r.left-zr.left)/S.z,y=(r.top-zr.top)/S.z,w=r.width/S.z,h=r.height/S.z;
S.tx=s.clientWidth/2-(x+w/2)*S.z;
if(md==='v')S.ty=s.clientHeight/2-(y+h/2)*S.z;else if(md==='t')S.ty=28-y*S.z;
az()}
var PZ={p:{},pan:false,sx:0,sy:0,bx:0,by:0,mv:false,pd:0,bz:1,oi:false,dr:false};
function pc(){var n=0,k;for(k in PZ.p)n++;return n}
function pa(){var a=[],k;for(k in PZ.p)a.push(PZ.p[k]);return a}
document.addEventListener('pointerdown',function(e){var s=e.target.closest?e.target.closest('.stage'):null;if(!s)return;PZ.p[e.pointerId]={x:e.clientX,y:e.clientY};var n=pc();
if(n===1){PZ.pan=true;PZ.sx=e.clientX;PZ.sy=e.clientY;PZ.bx=S.tx;PZ.by=S.ty;PZ.mv=false;PZ.oi=!!(e.target.closest&&e.target.closest('input,button,.pick'))}
if(n===2){var a=pa();PZ.pd=Math.sqrt(Math.pow(a[0].x-a[1].x,2)+Math.pow(a[0].y-a[1].y,2));PZ.bz=S.z;PZ.pan=false}},true);
document.addEventListener('pointermove',function(e){if(!PZ.p[e.pointerId])return;PZ.p[e.pointerId]={x:e.clientX,y:e.clientY};var a=pa();
if(a.length>=2){var d=Math.sqrt(Math.pow(a[0].x-a[1].x,2)+Math.pow(a[0].y-a[1].y,2));if(PZ.pd>0)sz(PZ.bz*(d/PZ.pd),(a[0].x+a[1].x)/2,(a[0].y+a[1].y)/2);PZ.mv=true;if(e.cancelable)e.preventDefault();return}
if(!PZ.pan)return;var dx=e.clientX-PZ.sx,dy=e.clientY-PZ.sy;if(!PZ.mv&&Math.abs(dx)+Math.abs(dy)<8)return;
if(!PZ.mv&&PZ.oi&&document.activeElement&&document.activeElement.blur)document.activeElement.blur();
PZ.mv=true;S.tx=PZ.bx+dx;S.ty=PZ.by+dy;az();var s=stEl();if(s)s.classList.add('drag');if(e.cancelable)e.preventDefault()});
function pe(e){if(PZ.p[e.pointerId])delete PZ.p[e.pointerId];if(pc()===0){if(PZ.mv)PZ.dr=true;PZ.pan=false;PZ.mv=false;var s=stEl();if(s)s.classList.remove('drag')}}
document.addEventListener('pointerup',pe);document.addEventListener('pointercancel',pe);
document.addEventListener('wheel',function(e){var s=e.target.closest?e.target.closest('.stage'):null;if(!s)return;e.preventDefault();
if(e.ctrlKey||e.metaKey||e.shiftKey){sz(S.z*(e.deltaY>0?.9:1.1),e.clientX,e.clientY);return}S.tx-=e.deltaX;S.ty-=e.deltaY;az()},{passive:false});
document.addEventListener('keydown',function(e){if(!stEl())return;var tg=e.target;if(tg&&/INPUT|TEXTAREA/.test(tg.tagName||''))return;var k=e.key;
if(k==='ArrowLeft')S.tx+=90;else if(k==='ArrowRight')S.tx-=90;else if(k==='ArrowUp')S.ty+=90;else if(k==='ArrowDown')S.ty-=90;
else if(k==='+'||k==='='){sz(S.z*1.15);e.preventDefault();return}else if(k==='-'){sz(S.z/1.15);e.preventDefault();return}
else if(k==='0'){fit();e.preventDefault();return}else return;
az();e.preventDefault()});
