/* PROJECT ZERO · effects.js — starfield, cursor, tilt badge, SFX, ambient player, scroll reveal */
(()=>{
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const SEL='a,button,summary,select,input,[data-rm],.tilt';
const mk=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};

/* 1. Starfield (canvas, reacts gently to the mouse) */
const cv=mk('canvas');cv.id='sf';cv.setAttribute('aria-hidden','true');document.body.prepend(cv);
const x=cv.getContext('2d');let W,H,S=[],mx=0,my=0,tx=0,ty=0,raf;
const starCol=()=>getComputedStyle(document.documentElement).getPropertyValue('--star').trim()||'#fff';
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);
  S=Array.from({length:Math.min(170,Math.round(W*H/9000))},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,t:Math.random()*6.28,c:Math.random()<.18?'#a855f7':Math.random()<.12?'#55ddf5':null}))}
function draw(t){x.clearRect(0,0,W,H);mx+=(tx-mx)*.04;my+=(ty-my)*.04;const base=starCol();
  for(const s of S){if(!rm){s.y-=s.z*.12;if(s.y<-2){s.y=H+2;s.x=Math.random()*W}}
    x.globalAlpha=(.35+.65*Math.abs(Math.sin(t/1600+s.t)))*s.z;x.fillStyle=s.c||base;x.beginPath();x.arc(s.x+mx*s.z*28,s.y+my*s.z*28,s.z*1.5,0,6.28);x.fill()}
  if(!rm&&!document.hidden)raf=requestAnimationFrame(draw)}
size();draw(0);
addEventListener('pointermove',e=>{tx=e.clientX/W-.5;ty=e.clientY/H-.5},{passive:true});
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{size();draw(0)},150)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!rm){cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)}});

/* 2. Custom cursor: glowing dot + trailing ring */
if(fine){document.documentElement.classList.add('cc');const d=mk('div','cd'),r=mk('div','cr');document.body.append(d,r);
  let px=-99,py=-99,rx=-99,ry=-99;
  addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;d.style.transform=`translate(${px}px,${py}px)`;r.classList.toggle('h',!!(e.target.closest&&e.target.closest(SEL)))},{passive:true});
  addEventListener('pointerdown',()=>r.classList.add('p'));addEventListener('pointerup',()=>r.classList.remove('p'));
  (function f(){rx+=(px-rx)*(rm?1:.18);ry+=(py-ry)*(rm?1:.18);r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(f)})()}

/* 3. Tilt ID badge with holographic shine */
document.addEventListener('pointermove',e=>{if(rm)return;const t=e.target.closest&&e.target.closest('.tilt');if(!t)return;
  const b=t.firstElementChild,r=t.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
  b.style.setProperty('--ry',(px-.5)*24+'deg');b.style.setProperty('--rx',(.5-py)*24+'deg');
  b.style.setProperty('--mx',px*100+'%');b.style.setProperty('--my',py*100+'%');b.style.setProperty('--hx',px*100+'%')});
document.addEventListener('pointerout',e=>{const t=e.target.closest&&e.target.closest('.tilt');
  if(t&&!t.contains(e.relatedTarget)){t.firstElementChild.style.setProperty('--rx','0deg');t.firstElementChild.style.setProperty('--ry','0deg')}});
const badge=`<div class="tilt" aria-label="ZERO ID"><div class="bd"><span class="mono sm">ZERO ID · PROJECT FILE</span><img class="av" src="${IMG.av}" alt=""><h3>PROJECT ZERO</h3><span class="mono sm">РОЛЕЙ 37 · КАРТ 5 · СОБЫТИЙ 20</span><span class="mono sm">TRUST NO SIGNAL</span></div></div>`;
const _h=P.home;P.home=()=>_h().replace('<section class="hero">','<section class="hero"><div class="hl">').replace('</section>','</div>'+badge+'</section>');

/* 4. Sound effects (WebAudio, no files) + global mute */
let AC,master,muted=false,armed=false;
try{muted=localStorage.getItem('pz-mute')=='1'}catch(e){}
const ac=()=>{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=muted?0:1;master.connect(AC.destination)}if(AC.state=='suspended')AC.resume();return AC};
const tone=(f1,f2,d,v,type)=>{if(muted||!armed)return;const c=ac(),t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';
  o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d)};
const sfxHover=()=>tone(1500,2000,.045,.02),sfxClick=()=>{tone(420,840,.1,.05,'triangle');tone(1680,1260,.08,.015)};
addEventListener('pointerdown',()=>{armed=true;ac()},{once:true});addEventListener('keydown',()=>{armed=true;ac()},{once:true});
let lastH=null;document.addEventListener('mouseover',e=>{const t=e.target.closest&&e.target.closest(SEL);if(t&&t!==lastH){lastH=t;sfxHover()}else if(!t)lastH=null});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest(SEL))sfxClick()});
const mt=mk('button','','');mt.id='mt';document.querySelector('.bar').appendChild(mt);
const mtl=()=>{mt.textContent=muted?'🔇 Звук: выкл':'🔊 Звук: вкл';mt.setAttribute('aria-pressed',String(!muted))};mtl();
mt.onclick=()=>{muted=!muted;try{localStorage.setItem('pz-mute',muted?'1':'0')}catch(e){}if(master)master.gain.setTargetAtTime(muted?0:1,AC.currentTime,.05);mtl()};

/* 5. Ambient player (procedural pad, sound-wave visualizer) */
const pl=mk('div','pl',`<button id="pp" aria-label="Играть ambient">▶</button><div class="ti"><b>ZERO CORE — Ambient</b><span>Procedural · WebAudio</span></div><canvas id="vz" width="64" height="28" aria-hidden="true"></canvas>`);document.body.append(pl);
const pp=pl.querySelector('#pp'),vz=pl.querySelector('#vz'),vx=vz.getContext('2d');let mus=null,an,vraf;
function viz(){const bins=an?new Uint8Array(an.frequencyBinCount):null;if(bins)an.getByteFrequencyData(bins);vx.clearRect(0,0,64,28);
  vx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--c').trim()||'#55ddf5';
  for(let i=0;i<8;i++){const v=mus&&bins?bins.slice(i*3,i*3+3).reduce((a,b)=>a+b,0)/765:0;const h=3+v*24;vx.fillRect(i*8+1,28-h,5,h)}
  if(mus)vraf=requestAnimationFrame(viz)}
function startMusic(){const c=ac(),t=c.currentTime,out=c.createGain();out.gain.setValueAtTime(0,t);out.gain.linearRampToValueAtTime(.3,t+2.5);
  const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=650;lp.Q.value=.7;an=an||c.createAnalyser();an.fftSize=64;an.smoothingTimeConstant=.8;
  out.connect(lp);lp.connect(an);an.connect(master);const nodes=[];
  [55,82.41,110,130.81,164.81].forEach((f,i)=>[-6,6].forEach(dt=>{const o=c.createOscillator(),g=c.createGain();o.type=i<2?'sawtooth':'triangle';o.frequency.value=f;o.detune.value=dt;g.gain.value=i<2?.09:.06;o.connect(g);g.connect(out);o.start();nodes.push(o)}));
  const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.06;lg.gain.value=280;lfo.connect(lg);lg.connect(lp.frequency);lfo.start();nodes.push(lfo);
  const dl=c.createDelay(2),fb=c.createGain();dl.delayTime.value=.55;fb.gain.value=.45;dl.connect(fb);fb.connect(dl);dl.connect(out);
  const nt=[220,261.63,329.63,392,440,523.25];
  const timer=setInterval(()=>{const t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.frequency.value=nt[Math.floor(Math.random()*nt.length)];
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+2.2);o.connect(g);g.connect(dl);g.connect(out);o.start(t);o.stop(t+2.3)},3200);
  mus={out,nodes,timer}}
function stopMusic(){const m=mus,c=AC;mus=null;m.out.gain.cancelScheduledValues(c.currentTime);m.out.gain.setTargetAtTime(0,c.currentTime,.3);clearInterval(m.timer);setTimeout(()=>m.nodes.forEach(o=>{try{o.stop()}catch(e){}}),1500)}
pp.onclick=()=>{armed=true;if(mus){stopMusic();pp.textContent='▶';pp.setAttribute('aria-label','Играть ambient')}else{startMusic();pp.textContent='❚❚';pp.setAttribute('aria-label','Пауза');viz()}};
viz();

/* 6. Scroll reveal (IntersectionObserver, re-armed after every page change) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>{t.style.transitionDelay=''},900)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
const rv=()=>M.querySelectorAll('.card,h2,h3,.hero,table,figure,.note,svg.mp,.row').forEach((el,i)=>{if(el.dataset.rv)return;el.dataset.rv=1;el.classList.add('rv');el.style.transitionDelay=Math.min(i%8,7)*50+'ms';io.observe(el)});
new MutationObserver(rv).observe(M,{childList:true});
route();
})();
