var TABS=[['overview','Overview'],['participants','Teams'],['bracket','Final Stage'],['matches','Matches'],['standings','Standings'],['log','Log']];
var IC={home:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9.5h18M9 9.5V20"/>','new':'<path d="M12 5v14M5 12h14"/>',participants:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.2 2.8-5.2 6-5.2s6 2 6 5.2"/><path d="M16.5 5.6a3.2 3.2 0 010 5.6M18 14.6c2 .7 3.4 2.4 3.4 4.6"/>',bracket:'<path d="M3 6h5v5H3zM3 13h5v5H3zM16 9h5v6h-5z"/><path d="M8 8.5h3v8h3M11 8.5v8"/>',standings:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 10h18M9 10v10"/>',log:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.3l3.3 2"/>','export':'<path d="M4 9h13M13.5 5.5 17 9l-3.5 3.5M20 15H7M10.5 11.5 7 15l3.5 3.5"/>'};
var RAIL=[['home','Турниры'],['new','Создать'],['participants','Команды'],['bracket','Сетка'],['standings','Таблица'],['log','Лог'],['export','Экспорт']];
var BAR=[['home','Турниры'],['new','Создать'],['bracket','Сетка'],['participants','Команды'],['export','Экспорт']];
function nav(){var i,h='';
for(i=0;i<RAIL.length;i++)h+='<button data-nav="'+RAIL[i][0]+'" title="'+RAIL[i][1]+'" class="'+(S.view===RAIL[i][0]?'on':'')+'"><svg viewBox="0 0 24 24">'+IC[RAIL[i][0]]+'</svg></button>';
document.getElementById('rail').innerHTML=h;h='';
for(i=0;i<BAR.length;i++)h+='<button data-nav="'+BAR[i][0]+'" class="'+(S.view===BAR[i][0]?'on':'')+'"><svg viewBox="0 0 24 24">'+IC[BAR[i][0]]+'</svg><span>'+BAR[i][1]+'</span></button>';
document.getElementById('bottom').innerHTML=h}
function seg(k,vs,c){var h='<div class="mini" data-seg="'+k+'">',i;
for(i=0;i<vs.length;i++){var v=vs[i],val=(v instanceof Array)?v[0]:v,lb=(v instanceof Array)?v[1]:v,sb=(v instanceof Array)?(v[2]||''):'';
h+='<button class="mc'+(String(val)===String(c)?' on':'')+'" data-v="'+esc(val)+'"><b>'+esc(lb)+'</b>'+(sb?'<span>'+esc(sb)+'</span>':'')+'</button>'}
return h+'</div>'}
var SVG1='<svg viewBox="0 0 120 54"><path d="M6 10h20M6 44h20M26 10v10h10M26 44V34h10M36 20v14M36 27h18"/><rect x="54" y="21" width="24" height="12" rx="2"/></svg>';
var SVG2='<svg viewBox="0 0 120 54"><path d="M6 8h18M6 20h18M24 8v6h9M24 20v-6M33 14h15"/><path d="M6 36h18M6 48h18M24 36v6h9M24 48v-6M33 42h15"/><path d="M48 14v28h10"/><rect x="58" y="22" width="24" height="12" rx="2"/></svg>';
function tcard(t,i,sd){return'<div class="tc">'+(sd!=null?'<span class="sd">#'+(sd+1)+'</span>':'')+'<button class="tx" data-act="delTeam" data-i="'+i+'">✕</button><label class="tci" title="Загрузить логотип">'+icoBig(t)+'<input type="file" accept="image/*" data-up="'+i+'" hidden></label><input class="tcn" data-f="name" data-i="'+i+'" value="'+esc(t.name||'')+'" placeholder="Команда '+(i+1)+'"><input class="tce" data-f="icon" data-i="'+i+'" value="'+esc(isImg(t.icon)?'':(t.icon||''))+'" placeholder="эмодзи / URL"></div>'}
function tgrid(ts){var h='<div class="tgrid">',i;
for(i=0;i<ts.length;i++)h+=tcard(ts[i],i,i);
return h+'<button class="tc add" data-act="addTeam"><i>+</i><span>Добавить команду</span></button></div>'}
function home(){var h='<div class="row" style="margin-bottom:18px"><button class="btn" data-act="new">Создать турнир</button></div>',i;
if(!db.list.length)return h+'<div class="empty">Турниров пока нет. Нажмите «Создать турнир» — там есть готовые примеры.</div>';
h+='<div class="grid">';
for(i=0;i<db.list.length;i++){var t=db.list[i];
h+='<div class="tcard" data-open="'+t.id+'"><h3>'+esc(t.name)+'</h3><div class="sub">'+esc(t.date||'')+(t.date?' · ':'')+'<span class="c-sky">'+(t.format==='double'?'Double':'Single')+'</span> · Bo'+t.bo+' · <span class="c-gold">'+t.teams.length+'</span>/'+t.size+'</div></div>'}
return h+'</div>'}
function stepsBar(){var st=[[1,'Основа'],[2,'Формат'],[3,'Команды'],[4,'Проверка']],h='<div class="steps">',i;
for(i=0;i<st.length;i++)h+='<button class="stp'+(draft.step===st[i][0]?' on':'')+(draft.step>st[i][0]?' dn':'')+'" data-step="'+st[i][0]+'"><b>'+(draft.step>st[i][0]?'✓':st[i][0])+'</b><span>'+st[i][1]+'</span></button>';
return h+'</div>'}
function navBtns(){var h='<div class="row" style="margin-top:26px">';
if(draft.step>1)h+='<button class="btn ghost" data-act="back">← Назад</button>';
h+=draft.step<4?'<button class="btn" data-act="nextStep">Дальше →</button>':'<button class="btn" data-act="create">Создать турнир</button>';
return h+'<button class="btn ghost" data-act="home">Отмена</button></div>'}
function step1(){var h='<div class="sec">Готовые турниры — клик заполняет всё сразу</div><div class="cards">',i;
for(i=0;i<PR.length;i++){var p=PR[i];
h+='<button class="cd'+(draft.pre===i?' on':'')+'" data-preset="'+i+'"><span class="em">'+p.i+'</span><b>'+esc(p.n)+'</b><span>'+esc(p.g)+' · '+(p.f==='double'?'Double':'Single')+' · Bo'+p.bo+' · '+p.t.length+' команд</span></button>'}
h+='<button class="cd'+(draft.pre==null?' on':'')+'" data-preset="-1"><span class="em">➕</span><b>Пустой турнир</b><span>заполню всё сам</span></button></div>';
h+='<div class="fgrid" style="margin-top:26px"><div><label style="margin-top:0">Название</label><input id="f-name" value="'+esc(draft.name)+'" placeholder="Spring Championship"></div><div><label style="margin-top:0">Дата / стадия</label><input id="f-date" value="'+esc(draft.date)+'" placeholder="Август 2026"></div></div>';
return h}
function step2(){var h='<div class="sec">Схема турнира</div><div class="cards">';
h+='<button class="cd'+(draft.format==='single'?' on':'')+'" data-seg2="format" data-v="single">'+SVG1+'<b>Single Elimination</b><span>одно поражение — вылет</span></button>';
h+='<button class="cd'+(draft.format==='double'?' on':'')+'" data-seg2="format" data-v="double">'+SVG2+'<b>Double Elimination</b><span>верхняя + нижняя сетка</span></button></div>';
h+='<label>Формат матчей</label>'+seg('bo',[[1,'Bo1','до 1 победы'],[3,'Bo3','до 2 побед'],[5,'Bo5','до 3 побед']],draft.bo);
h+='<label>Размер сетки</label>'+seg('size',[[4,'4','2 раунда'],[8,'8','3 раунда'],[16,'16','4 раунда'],[32,'32','5 раундов']],draft.size);
return h+'<div class="hint">Мест может быть больше, чем команд — свободные слоты останутся открытыми и заполняются кликом прямо в сетке.</div>'}
function step3(){var n=0,i;
for(i=0;i<draft.teams.length;i++)if((draft.teams[i].name||'').trim())n++;
return'<div class="sec">Команды — '+n+' из '+draft.size+' мест</div><div class="row" style="margin-bottom:14px"><button class="btn ghost" data-act="bulk">Вставить списком</button><button class="btn ghost" data-act="padTeams">Добавить до '+draft.size+'</button><button class="btn ghost" data-act="clearTeams">Очистить</button></div>'+tgrid(draft.teams)+'<div class="hint">Логотип: клик по квадрату — загрузка PNG / JPG / SVG с устройства. Нижнее поле принимает эмодзи или ссылку. Без логотипа команда получает «?».</div>'}
function step4(){var ts=[],i;
for(i=0;i<draft.teams.length;i++)if((draft.teams[i].name||'').trim())ts.push({id:'p'+i,name:draft.teams[i].name.trim(),icon:draft.teams[i].icon||''});
var tmp={size:draft.size,format:draft.format,bo:draft.bo,teams:ts,seeds:[],results:{}};
for(i=0;i<tmp.size;i++)tmp.seeds.push(ts[i]?ts[i].id:null);
var B=solve(tmp),wr=B.W.slice(),wl=wLab(tmp,B);
if(B.gf){wr.push([B.gf]);wl.push('Grand Final')}
var inner='<div class="sec">Upper Bracket</div>'+gridHTML(wr,wl,wr.length-1,'P')+(B.L.length?'<div class="sec">Lower Bracket</div>'+gridHTML(B.L,lLab(B),-1,'Q'):'');
var h='<div class="sum"><div class="su"><span>Название</span><b>'+esc(draft.name||'Без названия')+'</b></div><div class="su"><span>Схема</span><b>'+(draft.format==='double'?'Double Elim':'Single Elim')+'</b></div><div class="su"><span>Матчи</span><b>Bo'+draft.bo+'</b></div><div class="su"><span>Команды</span><b>'+ts.length+' / '+draft.size+'</b></div><div class="su"><span>Всего матчей</span><b>'+B.all.length+'</b></div></div>';
return h+'<div class="pvw"><div class="pv">'+inner+'</div></div>'}
function form(){var h='<div class="form">'+stepsBar();
h+=draft.step===1?step1():draft.step===2?step2():draft.step===3?step3():step4();
return h+navBtns()+'</div>'}
function io(){return'<div class="form"><label style="margin-top:0">JSON всех турниров — бэкап или перенос на другое устройство</label><textarea id="io" rows="10">'+esc(JSON.stringify(db))+'</textarea><div class="row" style="margin-top:14px"><button class="btn" data-act="import">Импортировать</button><button class="btn ghost" data-act="home">Назад</button></div><label>Версия интерфейса</label>'+seg('mode',[['auto','Авто'],['mobile','Телефон'],['desktop','ПК']],ov||'auto')+'<div class="hint">Сейчас активна <b class="c-sky">'+(MODE==='mobile'?'мобильная':'десктопная')+'</b> версия.</div></div>'}
function parts(t){return'<div class="form"><div class="row" style="margin-bottom:14px"><button class="btn ghost" data-act="bulk">Вставить списком</button><button class="btn ghost" data-act="fill">Заполнить свободные места</button><button class="btn ghost" data-act="shuffle">Перемешать посев</button></div>'+tgrid(t.teams)+'<label>Размер сетки</label>'+seg('size',[[4,'4'],[8,'8'],[16,'16'],[32,'32']],t.size)+'<label>Схема</label>'+seg('format',[['single','Single'],['double','Double']],t.format)+'<label>Формат матчей</label>'+seg('bo',[[1,'Bo1'],[3,'Bo3'],[5,'Bo5']],t.bo)+'<div class="row" style="margin-top:24px"><button class="btn ghost" data-act="reset">Сбросить результаты</button><button class="btn ghost danger" data-act="del">Удалить турнир</button></div></div>'}
function over(t,B){var p=0,fr=0,st={},i,k;
for(i=0;i<B.all.length;i++)if(B.all[i].winner)p++;
for(i=0;i<t.seeds.length;i++)if(!t.seeds[i])fr++;
for(i=0;i<t.teams.length;i++)st[t.teams[i].id]={w:0,l:0};
for(i=0;i<B.all.length;i++){var m=B.all[i];if(m.winner&&m.loser){if(st[m.winner.id])st[m.winner.id].w++;if(st[m.loser.id])st[m.loser.id].l++}}
var ch=B.gf?B.gf.winner:B.W[B.W.length-1][0].winner;
var h='<div class="grid"><div class="tcard"><h3>Чемпион</h3><div class="big c-gold">'+(ch?esc(ch.name):'—')+'</div></div><div class="tcard"><h3>Матчи</h3><div class="big c-sky">'+p+'<span class="sub"> / '+B.all.length+'</span></div></div><div class="tcard"><h3>Свободных мест</h3><div class="big c-or">'+fr+'<span class="sub"> / '+t.size+'</span></div></div><div class="tcard"><h3>Команд</h3><div class="big c-ok">'+t.teams.length+'</div></div></div>';
var map={};for(i=0;i<t.teams.length;i++)map[t.teams[i].id]=t.teams[i];
h+='<div class="sec">Участники турнира</div><div class="rgrid">';
for(i=0;i<t.seeds.length;i++){var id=t.seeds[i],tm=id?map[id]:null;
if(!tm){h+='<div class="rc emp"><span class="sd">#'+(i+1)+'</span>'+icoBig(null,'rib')+'<div class="rnm" style="color:var(--mute)">Свободно</div><div class="rwl">место открыто</div></div>';continue}
var s2=st[id]||{w:0,l:0},cr=(ch&&ch.id===id)?' 🏆':'';
h+='<div class="rc"><span class="sd">#'+(i+1)+'</span>'+icoBig(tm,'rib')+'<div class="rnm">'+esc(tm.name)+cr+'</div><div class="rwl"><span class="c-ok">'+s2.w+'П</span> · <span class="c-bad">'+s2.l+'П</span></div></div>'}
h+='</div>';
var ex=[];
for(i=0;i<t.teams.length;i++){var tid=t.teams[i].id,us=false;for(k=0;k<t.seeds.length;k++)if(t.seeds[k]===tid)us=true;if(!us)ex.push(t.teams[i])}
if(ex.length){h+='<div class="sec">Вне сетки</div><div class="rgrid">';
for(i=0;i<ex.length;i++)h+='<div class="rc emp">'+icoBig(ex[i],'rib')+'<div class="rnm">'+esc(ex[i].name)+'</div><div class="rwl">нет места в сетке</div></div>';
h+='</div>'}
return h}
function matches(t,B){var h='<div class="scroll"><table><tr><th>#</th><th>Стадия</th><th>Матч</th><th>Счёт</th></tr>',i;
for(i=0;i<B.all.length;i++){var m=B.all[i];
h+='<tr><td>'+(i+1)+'</td><td>'+(m.bracket==='GF'?'<b class="c-gold">GF</b>':m.bracket+(m.round+1))+'</td><td>'+esc(m.ta?m.ta.name:'—')+' — '+esc(m.tb?m.tb.name:'—')+'</td><td>'+m.sa+':'+m.sb+'</td></tr>'}
return h+'</table></div>'}
function stand(t,B){var st={},i,k;
for(i=0;i<t.teams.length;i++)st[t.teams[i].id]={t:t.teams[i],w:0,l:0};
for(i=0;i<B.all.length;i++){var m=B.all[i];if(m.winner&&m.loser){if(st[m.winner.id])st[m.winner.id].w++;if(st[m.loser.id])st[m.loser.id].l++}}
var r=[];for(k in st)r.push(st[k]);
r.sort(function(a,b){return b.w-a.w||a.l-b.l});
var h='<table><tr><th>#</th><th>Команда</th><th>W</th><th>L</th></tr>';
for(i=0;i<r.length;i++)h+='<tr><td>'+(i+1)+'</td><td><span class="nmw">'+ico(r[i].t)+'<span class="nm">'+esc(r[i].t.name)+'</span></span></td><td class="c-ok">'+r[i].w+'</td><td class="c-bad">'+r[i].l+'</td></tr>';
return h+'</table>'}
function logHTML(t){var l=(t.log||[]).slice().reverse(),i;
if(!l.length)return'<div class="empty">Пока пусто.</div>';
var h='<table><tr><th>Время</th><th>Событие</th></tr>';
for(i=0;i<l.length;i++)h+='<tr><td>'+esc(l[i].at)+'</td><td>'+esc(l[i].msg)+'</td></tr>';
return h+'</table>'}
function nd(){return{step:1,pre:null,name:'',date:'',format:'double',bo:3,size:8,teams:[{name:'',icon:''},{name:'',icon:''},{name:'',icon:''},{name:'',icon:''}]}}
function om(h){document.getElementById('mbox').innerHTML=h;document.getElementById('modal').hidden=false}
function cm(){document.getElementById('modal').hidden=true}
function tt(){return S.view==='new'?(draft?draft.teams:null):(cur()?cur().teams:null)}
function picker(sd){var t=cur();if(!t)return;PKI='';var used={},i;
for(i=0;i<t.seeds.length;i++)if(t.seeds[i])used[t.seeds[i]]=i;
var h='<h3>Команда на место #'+(sd+1)+'</h3><div class="plist">';
for(i=0;i<t.teams.length;i++){var tm=t.teams[i],u=(used[tm.id]!=null&&used[tm.id]!==sd);
h+='<button class="pitem" data-act="pick" data-team="'+tm.id+'" data-slot="'+sd+'">'+ico(tm)+'<span>'+esc(tm.name)+'</span>'+(u?'<em>сейчас на #'+(used[tm.id]+1)+'</em>':'')+'</button>'}
if(!t.teams.length)h+='<div class="empty">Сначала добавьте команды.</div>';
h+='</div><label style="margin-top:0">Новая команда</label><div class="row"><label class="tci" style="width:54px;height:54px;margin:0" id="pk-prev">'+icoBig(null)+'<input type="file" accept="image/*" id="pk-file" hidden></label><input id="pk-icon" placeholder="эмодзи" style="flex:0 0 84px"><input id="pk-name" placeholder="Название" style="flex:1"><button class="btn" data-act="pkAdd" data-slot="'+sd+'">Добавить</button></div><div class="row" style="margin-top:14px"><button class="btn ghost" data-act="clearSlot" data-slot="'+sd+'">Освободить место</button><button class="btn ghost" data-act="closeModal">Закрыть</button></div>';
om(h)}
function bulk(){om('<h3>Список команд</h3><div class="sub">По одной в строке. Эмодзи-логотип через «|»: Team Liquid | 💧</div><textarea id="bk" rows="9" style="margin-top:10px"></textarea><div class="row" style="margin-top:14px"><button class="btn" data-act="bulkAdd">Добавить</button><button class="btn ghost" data-act="closeModal">Отмена</button></div>')}
function R(){var t=cur(),i;nav();
var top=document.getElementById('top'),tb=document.getElementById('tabs'),v=document.getElementById('view');
var sw='<button class="modesw" data-act="mode">'+(MODE==='mobile'?'ПК-версия':'Моб. версия')+'</button>';
if(!t||S.view==='home'||S.view==='new'||S.view==='export'){
if(S.view==='new'&&!draft)draft=nd();
var ttl=S.view==='new'?'Новый турнир':S.view==='export'?'Экспорт / импорт':'Мои турниры';
var sb=S.view==='new'?('Шаг '+draft.step+' из 4'):((MODE==='mobile'?'Мобильная версия':'Версия для ПК')+' · всё хранится в браузере');
top.innerHTML='<div><h1>'+ttl+'</h1><div class="sub">'+sb+'</div></div>'+sw;
tb.innerHTML='';
v.innerHTML=S.view==='new'?form():S.view==='export'?io():home();
return}
top.innerHTML='<div><h1>'+esc(t.name)+'</h1><div class="sub">'+esc(t.date||'')+(t.date?' · ':'')+(t.format==='double'?'Double':'Single')+' · Bo'+t.bo+' · '+t.teams.length+'/'+t.size+'</div></div>'+sw;
var h='';
for(i=0;i<TABS.length;i++)h+='<a data-tab="'+TABS[i][0]+'" class="'+(S.view===TABS[i][0]?'on':'')+'">'+TABS[i][1]+'</a>';
tb.innerHTML=h;
var B=solve(t);
if(S.view==='bracket'){var ur=(MODE==='mobile'&&S.rounds);
v.innerHTML=ur?roundsHTML(t,B):stageHTML(t,B);
if(!ur){var key=S.id+'|'+MODE+'|'+t.size+'|'+t.format;if(S.fit!==key){S.fit=key;fit()}else az()}
return}
v.innerHTML=S.view==='overview'?over(t,B):S.view==='participants'?parts(t):S.view==='matches'?matches(t,B):S.view==='standings'?stand(t,B):logHTML(t)}
