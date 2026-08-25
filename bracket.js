function slot(m,sd){var tm=sd==='a'?m.ta:m.tb,sc=sd==='a'?m.sa:m.sb,src=sd==='a'?m.a:m.b;
var se=(src&&'seed' in src&&src.seed!=null)?src.seed:null,st='';
if(m.winner)st=(tm&&tm===m.winner)?'win':(tm?'lose':'');
var mk='';
if(st==='win')mk=m.isFinal?'<span class="mark">🏆</span>':'<span class="mark w">→</span>';
if(st==='lose')mk=(m.bracket==='W')?'<span class="mark d">↓</span>':'<span class="mark o">✕</span>';
var lb=tm?esc(tm.name):(se!=null?'Свободно':'TBD');
return'<div class="slot '+st+(tm?'':' free')+'"><span class="nmw'+(se!=null?' pick" data-seed="'+se+'"':'"')+'>'+ico(tm)+'<span class="nm">'+lb+'</span></span>'+mk+'<input class="sc" data-m="'+m.id+'" data-s="'+sd+'" value="'+sc+'" inputmode="numeric"></div>'}
function mHTML(m){return'<div class="match">'+slot(m,'a')+slot(m,'b')+'</div>'}
function gridHTML(rs,lb,hl,pf){var tot=rs[0].length*2,h='<div class="grid-br" style="--cols:'+rs.length+'">',r,i;pf=pf||'x';
for(r=0;r<rs.length;r++){var cnt=rs[r].length,sp=tot/cnt,nx=rs[r+1];
h+='<div class="rhead'+(r===hl?' hl':'')+'" id="c-'+pf+'-'+r+'" style="grid-column:'+(r+1)+'">'+esc(lb[r])+'</div>';
for(i=0;i<cnt;i++){var m=rs[r][i],pr=!!nx&&nx.length!==cnt,cl='cell';if(nx)cl+=' out-r';if(r>0)cl+=' in-l';
if(m.ta&&m.tb&&!m.winner)cl+=' pend';
h+='<div class="'+cl+'" style="grid-column:'+(r+1)+';grid-row:'+(2+i*sp)+' / span '+sp+'">'+mHTML(m)+(pr&&i%2===0?'<i class="v"></i>':'')+'</div>'}}
return h+'</div>'}
function wLab(t,B){var o=[],n=B.W.length,r;
for(r=0;r<n;r++){var c=B.W[r].length;
if(t.format==='double')o.push(r===n-1?'Upper Final':'Upper Bracket R'+(r+1));
else o.push(c===1?'Final':c===2?'Semi-finals':c===4?'Quarter-finals':'Round '+(r+1))}
return o}
function lLab(B){var o=[],r;for(r=0;r<B.L.length;r++)o.push(r===B.L.length-1?'Lower Final':'Lower Bracket R'+(r+1));return o}
function shortW(t,B,r){if(t.format==='double')return r===B.W.length-1?'UB финал':'UB R'+(r+1);var c=B.W[r].length;return c===1?'Финал':c===2?'1/2':c===4?'1/4':'R'+(r+1)}
function bnav(t,B){var wr=B.W.length,i,pl=0,h='<div class="bnav"><div class="brow">';
for(i=0;i<B.all.length;i++)if(B.all[i].winner)pl++;
h+='<button class="nb" data-go="#c-W-0">Upper</button>';
if(B.L.length)h+='<button class="nb" data-go="#c-L-0">Lower</button>';
if(B.gf)h+='<button class="nb gold" data-go="#c-W-'+wr+'">Grand Final</button>';
h+='<button class="nb" data-act="next">▶ Следующий матч</button>';
if(MODE==='mobile')h+='<button class="nb" data-act="rounds">Список</button>';
h+='<span class="prg">'+pl+' / '+B.all.length+' матчей</span></div><div class="brow">';
h+='<button class="zbtn" data-act="zOut">−</button><span class="zval">100%</span><button class="zbtn" data-act="zIn">+</button>';
h+='<button class="chip" data-act="zFit">Вписать</button><button class="chip" data-act="zReset">1:1</button>';
for(i=0;i<wr;i++)h+='<button class="chip" data-go="#c-W-'+i+'">'+shortW(t,B,i)+'</button>';
if(B.gf)h+='<button class="chip" data-go="#c-W-'+wr+'">🏆 GF</button>';
for(i=0;i<B.L.length;i++)h+='<button class="chip" data-go="#c-L-'+i+'">'+(i===B.L.length-1?'LB финал':'LB R'+(i+1))+'</button>';
return h+'</div></div>'}
function stageHTML(t,B){var wr=B.W.slice(),wl=wLab(t,B);if(B.gf){wr.push([B.gf]);wl.push('Grand Final')}
var inner='<div class="sec">Upper Bracket · Bo'+t.bo+'</div>'+gridHTML(wr,wl,wr.length-1,'W');
if(B.L.length)inner+='<div class="sec">Lower Bracket</div>'+gridHTML(B.L,lLab(B),-1,'L');
return bnav(t,B)+'<div class="stage" id="stage"><div class="zoom" id="zoom">'+inner+'</div></div>'}
function rList(t,B){var o=[],r,wl=wLab(t,B),ll=lLab(B);
for(r=0;r<B.W.length;r++)o.push({l:wl[r],s:shortW(t,B,r),m:B.W[r]});
for(r=0;r<B.L.length;r++)o.push({l:ll[r],s:r===B.L.length-1?'LB финал':'LB R'+(r+1),m:B.L[r]});
if(B.gf)o.push({l:'Grand Final',s:'🏆 GF',m:[B.gf]});
return o}
function roundsHTML(t,B){var rs=rList(t,B),i;if(S.round>=rs.length)S.round=rs.length-1;if(S.round<0)S.round=0;
var h='<div class="bnav"><div class="brow"><button class="nb" data-act="rounds">Сетка</button><button class="nb" data-act="prevR">←</button><button class="nb" data-act="nextR">→</button><span class="prg">'+esc(rs[S.round].l)+'</span></div><div class="brow">';
for(i=0;i<rs.length;i++)h+='<button class="chip'+(i===S.round?' on':'')+'" data-round="'+i+'">'+esc(rs[i].s)+'</button>';
h+='</div></div><div class="mlist">';
var ms=rs[S.round].m;
for(i=0;i<ms.length;i++)h+='<div class="mmatch"><div class="mhead"><span>Матч '+(i+1)+' · Bo'+t.bo+'</span><span>'+(ms[i].winner?'<b>завершён</b>':'ожидание')+'</span></div>'+slot(ms[i],'a')+slot(ms[i],'b')+'</div>';
return h+'</div>'}
