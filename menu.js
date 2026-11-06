/* menu.js — left drawer, command palette (Ctrl/Cmd+K or "/"), router with pages 2 */
const MENU=[
['Знакомство','DISCOVER',[['home','Главная','Home',''],['universe','О вселенной','About & universe','zero core лор lore'],['play','Игровой цикл','Game flow','how to play как играть'],['tech','Технологии и roadmap','Technology & roadmap','online offline']]],
['Геймплей','GAMEPLAY',[['rules','Правила, жизни, голосование, победа','Rules, lives, voting, victory','suspicion token жетон подозрения lives'],['dodge','Dodge System','Dodge System','уклонение perfect dodge stun'],['abil','Способности','Abilities','passive active charges']]],
['Команды','TEAMS',[['teams','Все команды','Teams overview','good evil independent mighty']]],
['Персонажи','CHARACTERS',[['roles:all','Все персонажи (41)','All characters (41)','database'],['roles:g','GOOD','GOOD',''],['roles:e','EVIL','EVIL',''],['roles:i','INDEPENDENT','INDEPENDENT',''],['roles:m','MIGHTY','MIGHTY','']]],
['Контент','GAME CONTENT',[['tasks','Задания и Mini Boost 2.0','Tasks & Mini Boost 2.0','main missions главные миссии'],['missions','Личные миссии','Personal missions','personal objectives секретные цели'],['events','Ивенты','Events',''],['economy','Экономика и 20 бустов','Economy & 20 boosts','jinko match tokens джинко жетоны mini boost'],['rewards','Награды и достижения','Rewards & achievements','achievements достижения match tokens награды ◈']]],
['Режимы и карты','MODES & MAPS',[['modes','Режимы','Game modes','custom online offline'],['modes:online','ONLINE','ONLINE',''],['modes:offline','OFFLINE','OFFLINE',''],['modes:custom','CUSTOM','CUSTOM Mode',''],['modes:mighty','MIGHTY MODE','MIGHTY Mode',''],['maps','Атлас карт','Map atlas','forest spacecraft bunker factory']]],
['ZERO CORE и Judge','ZERO CORE & JUDGE',[['zerocore','ZERO CORE','ZERO CORE','core система'],['judge','Judge: AUTO, HUMAN, HYBRID','Judge: AUTO, HUMAN, HYBRID','судья ai']]],
['Архив','ARCHIVE',[['glossary','Терминология','Glossary',''],['faq','FAQ','FAQ',''],['changelog','Изменения документации','Changelog',''],['lore','Мир и лор','World & lore','']]],
['Сообщество','COMMUNITY',[['updates','Обновления проекта','Project updates',''],['credits','О проекте','Credits','']]]];
const ITEMS=MENU.flatMap(g=>g[2]);
const SOON={achievements:['Достижения','Achievements','Категории (Combat, Intelligence, Teamwork, Survival, Mastery, Special), редкости и примеры. Не дают игровой силы и не заменяют условия победы.','Categories (Combat, Intelligence, Teamwork, Survival, Mastery, Special), rarities and examples. They give no gameplay power and do not replace victory conditions.'],
glossary:['Терминология','Glossary','Словарь из 29 терминов (ZERO CORE, Judge, Dodge, Suspicion Token, MATCH TOKENS, JINKO и др.) с поиском.','A glossary of 29 terms (ZERO CORE, Judge, Dodge, Suspicion Token, MATCH TOKENS, JINKO and more), searchable.'],
faq:['FAQ','FAQ','20 вопросов с ответами только по утверждённым правилам.','20 questions answered only from confirmed rules.'],
changelog:['Изменения документации','Changelog','История: дата (если известна), категория, статус, источник решения. Даты не выдумываются.','History: date (if known), category, status, source. Dates are never invented.'],
lore:['Мир и лор','World & lore','Подтверждённый и предполагаемый лор (CONFIRMED / PROPOSED). Открытые вопросы остаются STORY MYSTERY.','Confirmed and proposed lore. Open questions stay marked STORY MYSTERY.'],
updates:['Обновления проекта','Project updates','Новости проекта. Настоящих профилей, рейтингов и онлайн-статистики пока нет, поэтому они не показываются.','Project news. There are no real profiles, rankings or online stats yet, so none are shown.'],
credits:['О проекте','Credits','Авторы и информация о проекте.','Authors and project information.']};
P2.soon=a=>{const s=SOON[a]||SOON.credits;return `<h2>${B(s[0],s[1])}</h2>${st('wip')}<p>${B(s[2],s[3])}</p><div class="note">${B('Раздел запланирован на следующий этап. Готовые материалы по теме смотрите на других страницах меню.','This section is planned for the next step. Related material is already on other menu pages.')}</div>`};
const titleOf=h=>{const i=ITEMS.find(x=>x[0]==h||x[0].split(':')[0]==h);return i?B(i[1],i[2]):(h=='role'?B('Профиль персонажа','Character profile'):h)};
function find(q){q=q.trim().toLowerCase();if(!q)return[];const o=[];
 ITEMS.forEach(i=>{if((i[1]+' '+i[2]+' '+i[3]).toLowerCase().includes(q))o.push({t:B(i[1],i[2]),c:B('Раздел','Page'),h:'#'+i[0]})});
 R.forEach(r=>{const e=EN[r.n]||'';if((r.n+' '+e+' '+r.en).toLowerCase().includes(q))o.push({t:LANG=='en'?(e||r.n):r.n+(r.en?' · '+r.en:''),c:B('Персонаж · ','Character · ')+TM[r.t][0],h:NRID[r.n]?'#role:'+NRID[r.n]:'#roles:all:f='+encodeURIComponent(r.n)})});
 idx.filter(i=>i[1]!='roles').forEach(i=>{if((i[0]+' '+i[2]).toLowerCase().includes(q))o.push({t:i[0],c:titleOf(i[1]),h:'#'+i[1]})});
 return o.slice(0,40)}
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};
/* drawer */
const bar=document.querySelector('.bar'),mbtn=el('button','','');mbtn.id='mn';mbtn.setAttribute('aria-haspopup','dialog');bar.prepend(mbtn);
const ov=el('div','ov');ov.hidden=true;const dr=el('aside','dr');dr.hidden=true;dr.setAttribute('role','dialog');dr.setAttribute('aria-modal','true');
dr.innerHTML=`<div class="drh"><b class="pur">PROJECT ZERO</b><button id="dx"></button></div><input id="mq" type="search"><div id="mr"></div><div id="mb"></div>`;document.body.append(ov,dr);
const resHtml=l=>l.length?l.map(r=>`<a href="${r.h}" class="rs"><b>${r.t}</b><span class="mut">${r.c}</span></a>`).join(''):`<p class="mut">${B('Ничего не найдено','Nothing found')}</p>`;
function buildChrome(){mbtn.textContent=B('☰ МЕНЮ','☰ MENU');mbtn.setAttribute('aria-label',B('Открыть меню','Open menu'));
 dr.setAttribute('aria-label',B('Меню','Menu'));document.getElementById('dx').textContent='✕';document.getElementById('dx').setAttribute('aria-label',B('Закрыть меню','Close menu'));
 document.getElementById('mq').placeholder=B('Поиск по PROJECT ZERO…','Search PROJECT ZERO…');document.getElementById('q').placeholder=B('Поиск (Ctrl+K)…','Search (Ctrl+K)…');
 document.getElementById('mb').innerHTML=MENU.map(g=>`<details open class="mg"><summary>${g[1]} <span class="mut">· ${B(g[0],'')}</span></summary>${g[2].map(i=>`<a href="#${i[0]}" data-h="${i[0]}">${B(i[1],i[2])}</a>`).join('')}</details>`).join('');mark()}
function mark(){const h=(location.hash||'#home').slice(1);dr.querySelectorAll('[data-h]').forEach(a=>{const on=a.dataset.h==h||(h=='roles'&&a.dataset.h=='roles:all');a.classList.toggle('act',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')})}
let lastF=null;const foc=e=>[...dr.querySelectorAll('a,button,input,summary')].filter(x=>x.offsetParent);
function openD(){lastF=document.activeElement;dr.hidden=ov.hidden=false;requestAnimationFrame(()=>{dr.classList.add('open');ov.classList.add('open')});document.body.style.overflow='hidden';setTimeout(()=>document.getElementById('mq').focus(),50)}
function closeD(){dr.classList.remove('open');ov.classList.remove('open');document.body.style.overflow='';setTimeout(()=>{dr.hidden=ov.hidden=true},200);if(lastF)lastF.focus()}
mbtn.onclick=openD;ov.onclick=closeD;document.getElementById('dx').onclick=closeD;
dr.addEventListener('click',e=>{if(e.target.closest('a'))closeD()});
document.getElementById('mq').oninput=e=>{const q=e.target.value,r=document.getElementById('mr');r.innerHTML=q.trim()?resHtml(find(q).slice(0,8)):'';document.getElementById('mb').hidden=!!q.trim()};
/* command palette */
const pv=el('div','ov pv');pv.hidden=true;pv.innerHTML=`<div class="pd" role="dialog" aria-modal="true"><input id="pi" type="search" autocomplete="off"><div id="pr" role="listbox"></div><p class="mut sm">↑ ↓ · Enter · Esc</p></div>`;document.body.append(pv);
const pi=pv.querySelector('#pi'),pr=pv.querySelector('#pr');let sel=0,cur=[];
function prender(){const q=pi.value;cur=q.trim()?find(q):ITEMS.slice(0,10).map(i=>({t:B(i[1],i[2]),c:B('Раздел','Page'),h:'#'+i[0]}));sel=0;
 pr.innerHTML=cur.length?cur.map((r,i)=>`<a href="${r.h}" role="option" class="rs${i?'':' sel'}"><b>${r.t}</b><span class="mut">${r.c}</span></a>`).join(''):`<p class="mut">${B('Ничего не найдено','Nothing found')}</p>`}
function openP(){pi.placeholder=B('Поиск: персонаж, правило, ивент, валюта…','Search: character, rule, event, currency…');pi.value='';pv.hidden=false;prender();pi.focus()}
const closeP=()=>{pv.hidden=true};
pi.oninput=prender;pv.onclick=e=>{if(e.target==pv||e.target.closest('a'))closeP()};
document.getElementById('q').addEventListener('focus',e=>{e.target.blur();openP()});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();openP();return}
 if(e.key=='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();openP();return}
 if(e.key=='Escape'){if(!pv.hidden)closeP();else if(!dr.hidden)closeD();return}
 if(!pv.hidden&&(e.key=='ArrowDown'||e.key=='ArrowUp')){e.preventDefault();const n=pr.querySelectorAll('a');if(!n.length)return;n[sel].classList.remove('sel');sel=(sel+(e.key=='ArrowDown'?1:n.length-1))%n.length;n[sel].classList.add('sel');n[sel].scrollIntoView({block:'nearest'})}
 if(!pv.hidden&&e.key=='Enter'&&cur[sel]){location.hash=cur[sel].h;closeP()}
 if(!dr.hidden&&e.key=='Tab'){const f=foc(),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
/* router */
const _r0=route;removeEventListener('hashchange',_r0);
route=function(){const raw=(location.hash||'#home').slice(1),ix=raw.indexOf(':'),h=ix<0?raw:raw.slice(0,ix),arg=ix<0?'':raw.slice(ix+1),ps=arg.split(':');
 if(h=='roles'&&['all','g','e','i','m'].includes(ps[0]))flt=ps[0];
 const fn=P2[h]||P[h]||P.home,f=ps.find(x=>x.startsWith('f='));
 M.innerHTML=`<div class="bc">PROJECT ZERO / ${(titleOf(h)||h).toUpperCase()} <button class="cp" data-cp>${B('🔗 ссылка','🔗 copy link')}</button></div>`+fn(arg);
 xl(M);document.getElementById('q').value='';wire();mark();M.classList.remove('wipe');void M.offsetWidth;M.classList.add('wipe');
 if(f){const k=decodeURIComponent(f.slice(2)).toLowerCase(),d=[...M.querySelectorAll('details.card')].find(x=>x.textContent.toLowerCase().includes(k));if(d){d.open=true;setTimeout(()=>d.scrollIntoView({behavior:'smooth',block:'center'}),80)}}else scrollTo(0,0)};
addEventListener('hashchange',route);
document.addEventListener('click',e=>{const c=e.target.closest('[data-cp]');if(c){const t=B('✓ скопировано','✓ copied');(navigator.clipboard?navigator.clipboard.writeText(location.href):Promise.reject()).then(()=>{c.textContent=t}).catch(()=>{c.textContent=location.href})}});
onLang=()=>{buildChrome();route()};
buildChrome();route();
