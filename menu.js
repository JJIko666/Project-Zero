/* menu.js — left drawer, command palette (Ctrl/Cmd+K or "/"), router with pages 2 */
const MENU=[
['Проект','PROJECT',[['home','Главная','Home',''],['universe','Вселенная PROJECT ZERO','PROJECT ZERO universe','lore zero core']]],
['Игровой процесс','GAMEPLAY',[['play','Геймплей','Gameplay','игровой цикл'],['rules','Правила','Rules','голосование жизни победа подозрение'],['teams','Команды','Teams','good evil independent mighty'],['tasks','Задания','Tasks','миссии mini boost'],['missions','Личные миссии','Personal missions','секретные цели'],['events','Ивенты','Events','события'],['economy','Награды и Mini Boost','Rewards & Mini Boost','экономика match tokens jinko max 3 maximum 3 max 1 activation one boost per cycle inventory activation cycle максимум 3 в запасе 1 активация за цикл'],['modes','Режимы','Modes','online offline custom mighty'],['dodge','Уклонение','Dodge','dodge perfect dodge stun ниндзя Ninja самурай Samurai два 2 уклонения active ability']]],
['База игры','GAME DATABASE',[['roles:all','Персонажи','Characters','персонаж персонажи роли'],['roles:g','GOOD','GOOD',''],['roles:e','EVIL','EVIL',''],['roles:i','INDEPENDENT','INDEPENDENT',''],['roles:m','MIGHTY','MIGHTY',''],['abil','Способности','Abilities','пассивная активная заряды перезарядка']]],
['Мир игры','GAME WORLD',[['maps','Карты','Maps','комнаты forest spacecraft bunker factory'],['concepts','Концепции и сценарии','Concepts & scenarios','сценарий концепция сюжет']]],
['Технологии','TECHNOLOGY',[['zerocore','ZERO CORE','ZERO CORE','core система'],['tech','ONLINE и OFFLINE · архитектура','ONLINE & OFFLINE · architecture','технологии roadmap judge'],['judge','Judge','Judge','судья auto human hybrid']]]];
const ITEMS=MENU.flatMap(g=>g[2]);
const SOON={achievements:['Достижения','Achievements','Категории (Combat, Intelligence, Teamwork, Survival, Mastery, Special), редкости и примеры. Не дают игровой силы и не заменяют условия победы.','Categories (Combat, Intelligence, Teamwork, Survival, Mastery, Special), rarities and examples. They give no gameplay power and do not replace victory conditions.'],
glossary:['Терминология','Glossary','Словарь из 29 терминов (ZERO CORE, Judge, Dodge, Suspicion Token, MATCH TOKENS, JINKO и др.) с поиском.','A glossary of 29 terms (ZERO CORE, Judge, Dodge, Suspicion Token, MATCH TOKENS, JINKO and more), searchable.'],
faq:['FAQ','FAQ','20 вопросов с ответами только по утверждённым правилам.','20 questions answered only from confirmed rules.'],
changelog:['Изменения документации','Changelog','История: дата (если известна), категория, статус, источник решения. Даты не выдумываются.','History: date (if known), category, status, source. Dates are never invented.'],
lore:['Мир и лор','World & lore','Подтверждённый и предполагаемый лор (CONFIRMED / PROPOSED). Открытые вопросы остаются STORY MYSTERY.','Confirmed and proposed lore. Open questions stay marked STORY MYSTERY.'],
updates:['Обновления проекта','Project updates','Новости проекта. Настоящих профилей, рейтингов и онлайн-статистики пока нет, поэтому они не показываются.','Project news. There are no real profiles, rankings or online stats yet, so none are shown.'],
credits:['О проекте','Credits','Авторы и информация о проекте.','Authors and project information.']};
P2.soon=a=>{const s=SOON[a]||SOON.credits;return `<h2>${B(s[0],s[1])}</h2>${st('wip')}<p>${B(s[2],s[3])}</p><div class="note">${B('Раздел запланирован на следующий этап. Готовые материалы по теме смотрите на других страницах меню.','This section is planned for the next step. Related material is already on other menu pages.')}</div>`};
const TITLES={glossary:['Терминология','Glossary'],faq:['FAQ','FAQ'],changelog:['Изменения документации','Documentation history'],lore:['Мир и лор','World & lore'],updates:['Обновления проекта','Project updates'],credits:['О проекте','About the project'],rewards:['Награды и достижения','Rewards & achievements']};
const titleOf=h=>{const i=ITEMS.find(x=>x[0]==h||x[0].split(':')[0]==h);return i?B(i[1],i[2]):(TITLES[h]?B(TITLES[h][0],TITLES[h][1]):(h=='role'?B('Профиль персонажа','Character profile'):h))};
const pageGroup=h=>{const group=MENU.find(g=>g[2].some(i=>i[0].split(':')[0]==h));return group?B(group[0],group[1]):B('Материалы','Materials')};
const PAGE_META={
 universe:[['Вселенная PROJECT ZERO','PROJECT ZERO universe'],['Описание мира и исходной игровой идеи.','An overview of the world and the original game concept.']],
 play:[['Игровой цикл','Game flow'],['Этапы матча и последовательность игрового цикла.','Match phases and the sequence of a game cycle.']],
 rules:[['Правила','Rules'],['Команды, победа, жизни, способности и порядок голосования.','Teams, victory, lives, abilities and voting.']],
 teams:[['Команды','Teams'],['Цели и особенности четырёх игровых команд.','Goals and characteristics of the four game teams.']],
 roles:[['Персонажи','Characters'],['Каталог ролей с фильтрами по командам и подробными профилями.','Browse roles by team and open detailed character profiles.']],
 abil:[['Способности','Abilities'],['Способности персонажей, заряды и связанные ограничения.','Character abilities, charges and related limits.']],
 tasks:[['Задания','Tasks'],['Главные миссии и мини-задания, доступные в материалах проекта.','Main missions and mini-tasks present in the project materials.']],
 missions:[['Личные миссии','Personal missions'],['Секретные цели независимых персонажей.','Secret objectives for INDEPENDENT characters.']],
 events:[['Ивенты','Events'],['События, влияющие на условия игрового цикла.','Events that affect the game cycle.']],
 modes:[['Режимы','Modes'],['Форматы игры и существующие описания режимов.','Game formats and the mode descriptions available so far.']],
 dodge:[['Уклонение','Dodge'],['Правила уклонения и отдельное ограничение для Ниндзя и Самурая.','Dodge rules and the separate limit for Ninja and Samurai.']],
 economy:[['Награды и экономика','Rewards & economy'],['MATCH TOKENS, JINKO и Mini Boost.','MATCH TOKENS, JINKO and Mini Boost.']],
 maps:[['Карты','Maps'],['Атлас карт, комнаты и интерактивные схемы.','Map atlas, rooms and interactive diagrams.']],
 concepts:[['Концепции и сценарии','Concepts & scenarios'],['Библиотека ссылок на существующие игровые концепции и сценарные материалы.','A library linking to the game concepts and scenario material already in the project.']],
 zerocore:[['ZERO CORE','ZERO CORE'],['Игровая система и её роль в материалах PROJECT ZERO.','The system and its role in the PROJECT ZERO materials.']],
 tech:[['ONLINE и OFFLINE · архитектура','ONLINE & OFFLINE · architecture'],['Представления ONLINE и OFFLINE, Judge и техническая архитектура.','ONLINE and OFFLINE formats, Judge and technical architecture.']],
 judge:[['Judge','Judge'],['Задачи судьи в ONLINE, OFFLINE и HYBRID-форматах.','The Judge’s responsibilities in ONLINE, OFFLINE and HYBRID formats.']]
};
const pageLinks=h=>{const group=MENU.find(g=>g[2].some(i=>i[0].split(':')[0]==h));if(!group)return[];if(h=='roles')return group[2].filter(i=>i[0].startsWith('roles:')).slice(1);return group[2].filter(i=>i[0].split(':')[0]!=h).slice(0,4)};
idx.push(
 ...AB.map(a=>[a.n+' '+a.o,'abil',a.x]),
 ...MS2.flatMap(m=>m[1].map((x,i)=>[`${m[0][0]} MINI ${i+1} ${x[0]} ${x[1]}`,'tasks',m[0][0]])),
 ...PMX.map(x=>[x[0]+' '+x[1],'missions','']),
 ...BS.flatMap(g=>g[1].map(b=>[b[0],'economy',g[0]+' '+b[1]])),
 ...MD2.map(m=>[m[0],'modes',m[1]+' '+m[2]])
);

P2.concepts=()=>`<h2>${B('Библиотека концепций','Concept library')}</h2>
<p>${B('Материалы сгруппированы по уже существующим страницам проекта. Здесь не добавлены новые сценарии или механики.','Materials are grouped by existing project pages. No new scenarios or mechanics have been added.')}</p>
<div class="grid concept-grid">
 <a class="card concept-link" href="#universe"><span class="tag">${B('МИР И ИСТОРИЯ','WORLD & STORY')}</span><h3>${B('Вселенная PROJECT ZERO','PROJECT ZERO universe')}</h3><p>${B('Исходное описание мира и игровой предпосылки.','The existing world description and game premise.')}</p><span class="concept-more">${B('Открыть вселенную →','Open universe →')}</span></a>
 <a class="card concept-link" href="#modes"><span class="tag">${B('ИГРОВЫЕ ФОРМАТЫ','GAME FORMATS')}</span><h3>${B('Режимы','Modes')}</h3><p>${B('ONLINE, OFFLINE и имеющиеся описания режимов.','ONLINE, OFFLINE and the available mode descriptions.')}</p><span class="concept-more">${B('Открыть режимы →','Open modes →')}</span></a>
 <a class="card concept-link" href="#dodge"><span class="tag">${B('ИГРОВАЯ СИТУАЦИЯ','GAME SITUATION')}</span><h3>${B('Уклонение','Dodge')}</h3><p>${B('Правила уклонения и ограничение для двух персонажей.','Dodge rules and the limit for two characters.')}</p><span class="concept-more">${B('Открыть правила уклонения →','Open Dodge rules →')}</span></a>
 <a class="card concept-link" href="#maps"><span class="tag">${B('КАРТЫ И ОКРУЖЕНИЕ','MAPS & ENVIRONMENT')}</span><h3>${B('Атлас карт','Map atlas')}</h3><p>${B('Существующие карты, комнаты и их связи.','Existing maps, rooms and their connections.')}</p><span class="concept-more">${B('Открыть карты →','Open maps →')}</span></a>
 <a class="card concept-link" href="#zerocore"><span class="tag">${B('СИСТЕМА И СЮЖЕТ','SYSTEM & STORY')}</span><h3>ZERO CORE</h3><p>${B('Концепция системы и связанная с ней информация.','The system concept and its related information.')}</p><span class="concept-more">${B('Открыть ZERO CORE →','Open ZERO CORE →')}</span></a>
</div>
<aside class="info-required" role="note"><strong>${B('НУЖНА ИНФОРМАЦИЯ ДЛЯ ЗАПОЛНЕНИЯ','INFORMATION NEEDED')}</strong><p>${B('В материалах не задан отдельный реестр игровых сценариев с названиями, условиями начала, последовательностью и условиями завершения. Чтобы оформить такие карточки, нужны существующие сценарии и их содержание.','The materials do not define a separate game-scenario register with names, starting conditions, sequence and completion conditions. The existing scenarios and their content are needed to create those entries.')}</p></aside>`;
P2.universe=()=>`<h2>${B('Вселенная PROJECT ZERO','PROJECT ZERO universe')}</h2>
<p>${B('ZERO CORE — технология для управления исследовательскими объектами, испытаниями и экспериментами. Система начинает фиксировать странные события, а игроки получают противоречивые данные.','ZERO CORE is a technology for managing research facilities, trials and experiments. The system begins recording unusual events, while players receive conflicting information.')}</p>
<div class="grid"><section class="card"><h3>${B('Исследовательские объекты','Research facilities')}</h3><p>${B('Игроки перемещаются между помещениями, выполняют задания и собирают информацию. Каждая карта представляет отдельный объект.','Players move between rooms, complete tasks and gather information. Each map represents a separate facility.')}</p><a href="#maps">${B('Карты и комнаты →','Maps and rooms →')}</a></section>
<section class="card"><h3>${B('Игровая цель','Game objective')}</h3><p>${B('Команды восстанавливают порядок, мешают планам соперников или выполняют личные цели.','Teams restore order, disrupt opponents or pursue personal objectives.')}</p><a href="#teams">${B('Команды →','Teams →')}</a></section></div>
<p class="quicklinks"><a href="#zerocore">ZERO CORE</a><a href="#concepts">${B('Концепции и сценарии','Concepts & scenarios')}</a></p>`;
P2.modes=a=>`<h2>${B('Режимы игры','Game modes')}</h2>
<p>${B('В материалах перечислены режимы и форматы игры. Их общие правила задаются страницей «Правила»; отдельные параметры режима должны быть определены явно.','The project materials list these game modes and formats. General rules are covered on the Rules page; mode-specific settings need explicit definitions.')}</p>
<div class="grid">${MD2.map(m=>`<section class="card"><h3>${m[0]}</h3><p>${B(m[1],m[2])}</p></section>`).join('')}</div>
<h3>${B('Форматы','Formats')}</h3><div class="grid">
<details class="card"${a=='online'?' open':''}><summary>ONLINE</summary><p>${B('Цифровой многопользовательский формат с картами, заданиями, событиями, способностями, голосованием и автоматизированным Judge.','A digital multiplayer format with maps, tasks, events, abilities, voting and an automated Judge.')}</p></details>
<details class="card"${a=='offline'?' open':''}><summary>OFFLINE</summary><p>${B('Игра вживую в одном месте: роли и задания выдаются участникам, Judge подтверждает выполнение, голосование проходит анонимно.','A live game in one place: players receive roles and tasks, the Judge confirms completion, and voting is anonymous.')}</p></details>
<section class="card"><h3>CUSTOM</h3><p>${B('Настройка матча может включать карту, число игроков, Judge, распределение ролей, задания, события, длительность цикла, голосование и условия победы.','Match settings may include the map, player count, Judge, role distribution, tasks, events, cycle duration, voting and victory conditions.')}</p></section>
<section class="card"><h3>MIGHTY MODE</h3><p>${B('По правилам класса: от 8 игроков, один MIGHTY за партию, 4 жизни; обычные способности не копируют MIGHTY, а один обычный слот заменяется этим классом.','Under the class rules: from 8 players, one MIGHTY per match, 4 lives; ordinary abilities cannot copy MIGHTY, and the class replaces one regular slot.')}</p><a href="#roles:m">${B('Персонажи MIGHTY →','MIGHTY characters →')}</a></section></div>
<aside class="info-required" role="note"><strong>${B('НУЖНА ИНФОРМАЦИЯ ДЛЯ ЗАПОЛНЕНИЯ','INFORMATION NEEDED')}</strong><p>${B('Не заданы отдельные длительности, баланс и условия победы для QUICK MATCH, HARDCORE, CUSTOM и CUSTOM CHAOS.','Separate durations, balance and victory conditions for QUICK MATCH, HARDCORE, CUSTOM and CUSTOM CHAOS are not defined.')}</p></aside>`;
P2.zerocore=()=>`<h2>ZERO CORE</h2>
<p>${B('Центральная игровая система, которая применяет правила матча и координирует задания, способности, события, голосование и проверку победы.','The central game system applies match rules and coordinates tasks, abilities, events, voting and victory validation.')}</p>
<h3>${B('Роль в игре','Role in the game')}</h3><div class="grid">${ZCF.map(z=>`<section class="card"><h3>${B(z[1],z[0])}</h3><p>${B(z[2],z[3])}</p></section>`).join('')}</div>
<section class="card"><h3>${B('Связь с миром игры','Connection to the game world')}</h3><p>${B('ZERO CORE управляет исследовательскими объектами, испытаниями и экспериментами. Каждая карта — отдельный объект; система начинает фиксировать странные события.','ZERO CORE manages research facilities, trials and experiments. Each map is a separate facility, and the system begins recording unusual events.')}</p><a href="#universe">${B('Вселенная PROJECT ZERO →','PROJECT ZERO universe →')}</a></section>`;
P2.tech=()=>`<h2>${B('ONLINE и OFFLINE · архитектура','ONLINE & OFFLINE · architecture')}</h2>
<div class="grid"><section class="card"><h3>ONLINE</h3><p>${B('Цифровой многопользовательский формат с лобби и автоматизированным Judge.','A digital multiplayer format with lobbies and an automated Judge.')}</p><a href="#modes:online">${B('Подробнее о форматах →','More about formats →')}</a></section>
<section class="card"><h3>OFFLINE</h3><p>${B('Формат для игры в одном месте с отдельным судьёй и анонимным голосованием.','A live format in one place with a separate Judge and anonymous voting.')}</p><a href="#modes:offline">${B('Подробнее о форматах →','More about formats →')}</a></section></div>
<h3>${B('Поток компонентов','Component flow')}</h3><div class="flow">${['PLAYER','GAME CLIENT (Godot 4 + GDScript)','NETWORK (WebSockets)','BACKEND (FastAPI)','ZERO CORE','DATABASE / MATCH STATE (PostgreSQL)'].map(x=>`<span class="tag">${x}</span>`).join('<span class="ar">→</span>')}</div>
<div class="grid"><section class="card"><h3>${B('Правила целостности матча','Match integrity')}</h3>${ul([B('Сервер — источник истины; роли хранятся приватно.','The server is the source of truth; roles are stored privately.'),B('Клиент не может сам засчитать задание.','The client cannot approve task completion.'),B('Голоса защищены, а события матча журналируются.','Votes are protected and match events are logged.')])}</section>
<section class="card"><h3>Judge</h3>${ul([B('Проверяет применение правил и способностей.','Validates rules and ability use.'),B('Не придумывает исходы и не раскрывает закрытые данные.','Does not invent outcomes or reveal restricted information.')])}<a href="#judge">${B('О Judge →','About Judge →')}</a></section></div>`;
function find(q){
 q=q.trim().toLocaleLowerCase();if(!q)return[];
 const out=[],seen=new Set(),add=r=>{const k=r.h+'|'+r.t;if(!seen.has(k)){seen.add(k);out.push(r)}};
 ITEMS.forEach(i=>{if((i[1]+' '+i[2]+' '+i[3]).toLocaleLowerCase().includes(q))add({t:B(i[1],i[2]),c:B('Раздел','Section'),h:'#'+i[0],group:B('Разделы','Sections')})});
 const roles=new Map();
 R.forEach(r=>roles.set(NRID[r.n]||r.n,r));
 if(typeof NR!='undefined')NR.forEach(r=>{const corpus=JSON.stringify(r).toLocaleLowerCase();if(corpus.includes(q)){const base=R.find(x=>x.n==r.ru);add({t:LANG=='en'?(r.en||r.ru):r.ru,c:TM[r.t]?.[0]||'CHARACTER',h:'#roles:all:f='+encodeURIComponent(r.ru),group:B('Персонажи','Characters')});roles.delete(r.id)}})
 roles.forEach(r=>{const e=EN[r.n]||'';if((r.n+' '+e+' '+r.en+' '+r.p+' '+r.a+' '+r.g).toLocaleLowerCase().includes(q))add({t:LANG=='en'?(e||r.n):r.n,c:TM[r.t]?.[0]||'CHARACTER',h:'#roles:all:f='+encodeURIComponent(r.n),group:B('Персонажи','Characters')})});
 idx.filter(i=>i[1]!='roles').forEach(i=>{if((i[0]+' '+i[2]).toLocaleLowerCase().includes(q)){const h=i[1];add({t:i[0],c:titleOf(h),h:'#'+h+':f='+encodeURIComponent(i[0]),group:titleOf(h)})}});
 return out.slice(0,40)
}
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};
/* drawer */
const bar=document.querySelector('.bar'),mbtn=el('button','','');mbtn.id='mn';mbtn.setAttribute('aria-haspopup','dialog');bar.prepend(mbtn);
const ov=el('div','ov');ov.hidden=true;const dr=el('aside','dr');dr.hidden=true;dr.setAttribute('role','dialog');dr.setAttribute('aria-modal','true');
dr.innerHTML=`<div class="drh"><b class="pur">PROJECT ZERO</b><button id="dx"></button></div><input id="mq" type="search"><div id="mr"></div><div id="mb"></div>`;document.body.append(ov,dr);
const renderResults=(root,list)=>{
 root.replaceChildren();
 if(!list.length){const empty=el('p','mut');empty.textContent=B('Ничего не найдено','Nothing found');root.append(empty);return}
 let group='';
 list.forEach(r=>{
  if(r.group!==group){group=r.group;const heading=el('h3','result-group');heading.textContent=group;root.append(heading)}
  const a=el('a','rs');a.href=r.h;const title=el('b');title.textContent=r.t;const category=el('span','mut');category.textContent=r.c;a.append(title,category);root.append(a)
 })
};
function buildChrome(){mbtn.textContent=B('☰ МЕНЮ','☰ MENU');mbtn.setAttribute('aria-label',B('Открыть меню','Open menu'));
 dr.setAttribute('aria-label',B('Меню','Menu'));document.getElementById('dx').textContent='✕';document.getElementById('dx').setAttribute('aria-label',B('Закрыть меню','Close menu'));
 document.getElementById('mq').placeholder=B('Поиск по PROJECT ZERO…','Search PROJECT ZERO…');document.getElementById('q').placeholder=B('Поиск (Ctrl+K)…','Search (Ctrl+K)…');
 const current=(location.hash||'#home').slice(1).split(':')[0];
 document.getElementById('mb').innerHTML=MENU.map(g=>`<details ${g[2].some(i=>i[0].split(':')[0]==current)?'open':''} class="mg"><summary>${B(g[0],g[1])}</summary>${g[2].map(i=>`<a href="#${i[0]}" data-h="${i[0]}">${B(i[1],i[2])}</a>`).join('')}</details>`).join('');mark()}
function mark(){const h=(location.hash||'#home').slice(1),page=h.split(':')[0];dr.querySelectorAll('[data-h]').forEach(a=>{const on=a.dataset.h==h||(page=='roles'&&a.dataset.h=='roles:all');a.classList.toggle('act',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});dr.querySelectorAll('.mg').forEach(d=>{d.open=!!d.querySelector(`[data-h^="${page}"]`)})}
let lastF=null;const foc=e=>[...dr.querySelectorAll('a,button,input,summary')].filter(x=>x.offsetParent);
function openD(){lastF=document.activeElement;dr.hidden=ov.hidden=false;requestAnimationFrame(()=>{dr.classList.add('open');ov.classList.add('open')});document.body.style.overflow='hidden';setTimeout(()=>document.getElementById('mq').focus(),50)}
function closeD(){dr.classList.remove('open');ov.classList.remove('open');document.body.style.overflow='';setTimeout(()=>{dr.hidden=ov.hidden=true},200);if(lastF)lastF.focus()}
mbtn.onclick=openD;ov.onclick=closeD;document.getElementById('dx').onclick=closeD;
dr.addEventListener('click',e=>{if(e.target.closest('a'))closeD()});
document.getElementById('mq').oninput=e=>{const q=e.target.value,r=document.getElementById('mr');if(q.trim())renderResults(r,find(q).slice(0,8));else r.replaceChildren();document.getElementById('mb').hidden=!!q.trim()};
/* command palette */
const pv=el('div','ov pv');pv.hidden=true;pv.innerHTML=`<div class="pd" role="dialog" aria-modal="true"><input id="pi" type="search" autocomplete="off"><div id="pr" role="listbox"></div><p class="mut sm">↑ ↓ · Enter · Esc</p></div>`;document.body.append(pv);
const pi=pv.querySelector('#pi'),pr=pv.querySelector('#pr');let sel=0,cur=[];
function prender(){const q=pi.value;cur=q.trim()?find(q):ITEMS.slice(0,10).map(i=>({t:B(i[1],i[2]),c:B('Раздел','Section'),h:'#'+i[0],group:B('Разделы','Sections')}));sel=0;
 renderResults(pr,cur);const first=pr.querySelector('a');if(first)first.classList.add('sel')}
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
 const meta=PAGE_META[h],related=pageLinks(h),heading=meta?`<section class="pagehead"><p class="eyebrow">${pageGroup(h)}</p><p class="page-intro">${B(meta[1][0],meta[1][1])}</p>${related.length?`<nav class="quicklinks" aria-label="${B('Быстрые ссылки','Quick links')}">${related.map(i=>`<a href="#${i[0]}">${B(i[1],i[2])}</a>`).join('')}</nav>`:''}</section>`:'';
 M.innerHTML=`<div class="bc"><a href="#home">PROJECT ZERO</a><span aria-hidden="true"> / </span>${(titleOf(h)||h).toUpperCase()} <button class="cp" data-cp aria-label="${B('Скопировать ссылку на эту страницу','Copy a link to this page')}">${B('Ссылка','Copy link')}</button></div>`+heading+fn(arg);
 xl(M);document.getElementById('q').value='';wire();mark();M.classList.remove('wipe');void M.offsetWidth;M.classList.add('wipe');
 if(f){let k=f.slice(2);try{k=decodeURIComponent(k)}catch(e){}const target=[...M.querySelectorAll('.card, tr')].find(x=>x.textContent.toLocaleLowerCase().includes(k.toLocaleLowerCase()));if(target){if(target.matches('details'))target.open=true;setTimeout(()=>target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'}),80)}}else scrollTo(0,0)};
addEventListener('hashchange',route);
document.addEventListener('click',e=>{const c=e.target.closest('[data-cp]');if(c){const t=B('✓ скопировано','✓ copied');(navigator.clipboard?navigator.clipboard.writeText(location.href):Promise.reject()).then(()=>{c.textContent=t}).catch(()=>{c.textContent=location.href})}});
onLang=()=>{buildChrome();route()};
buildChrome();route();
