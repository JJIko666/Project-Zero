/* atmosphere.js — boot sequence, signal ticker (purely decorative) */
(()=>{
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const tk=document.createElement('div');tk.className='tk';tk.setAttribute('aria-hidden','true');document.querySelector('header').appendChild(tk);
const ln=()=>['ZERO CORE: '+B('ожидание ввода','awaiting input'),B('целостность сигнала: НЕ ПОДТВЕРЖДЕНА','signal integrity: UNVERIFIED'),B('41 роль в индексе','41 roles indexed'),B('20 событий в архиве','20 events archived'),'TRUST NO SIGNAL. QUESTION EVERYTHING.'].join(' · ');
const tkb=()=>{tk.innerHTML=`<div class="tkt"><span>${ln()}</span><span>${ln()}</span></div>`};tkb();
const _o=onLang;onLang=()=>{if(_o)_o();tkb()};
let seen=false;try{seen=sessionStorage.getItem('pz-boot')}catch(e){}
if(!rm&&!seen){try{sessionStorage.setItem('pz-boot','1')}catch(e){}
 const b=document.createElement('div');b.id='boot';b.setAttribute('role','dialog');b.setAttribute('aria-label','ZERO CORE boot');
 b.innerHTML=`<pre id="bt"></pre><button id="bs">${B('Пропустить','Skip')}</button>`;document.body.append(b);
 const L=['ZERO CORE // BOOT SEQUENCE','> index.archive ............ OK','> roles[41] ................ OK','> events[20] ............... OK','> signal.integrity ......... UNVERIFIED','> TRUST NO SIGNAL. QUESTION EVERYTHING.'];
 let i=0,done=false;const bt=b.querySelector('#bt');
 const end=()=>{if(done)return;done=true;b.classList.add('out');setTimeout(()=>b.remove(),500)};
 const step=()=>{if(done)return;if(i<L.length){bt.textContent+=L[i++]+'\n';setTimeout(step,340)}else setTimeout(end,700)};
 b.onclick=end;b.querySelector('#bs').focus();addEventListener('keydown',end,{once:true});step()}
})();
