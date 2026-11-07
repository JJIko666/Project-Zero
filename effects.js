/* PROJECT ZERO · effects.js — optional sound effects, ambient player and scroll reveal */
(()=>{
const SEL='a,button,summary,select,input,[data-rm],.tilt';
const mk=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};

/* Optional sound effects (WebAudio, no files) */
let AC,master,muted=true,armed=false;
try{const saved=localStorage.getItem('pz-mute');if(saved!==null)muted=saved=='1'}catch(e){}
const ac=()=>{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=muted?0:1;master.connect(AC.destination)}if(AC.state=='suspended')AC.resume();return AC};
const tone=(f1,f2,d,v,type)=>{if(muted||!armed)return;const c=ac(),t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';
  o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d)};
const sfxHover=()=>tone(1500,2000,.045,.02),sfxClick=()=>{tone(420,840,.1,.05,'triangle');tone(1680,1260,.08,.015)};
addEventListener('pointerdown',()=>{armed=true;ac()},{once:true});addEventListener('keydown',()=>{armed=true;ac()},{once:true});
let lastH=null;document.addEventListener('mouseover',e=>{const t=e.target.closest&&e.target.closest(SEL);if(t&&t!==lastH){lastH=t;sfxHover()}else if(!t)lastH=null});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest(SEL))sfxClick()});
const mt=mk('button','','');mt.id='mt';document.querySelector('.bar').appendChild(mt);
const mtl=()=>{mt.textContent=muted?'🔇':'🔊';mt.title=muted?'Звуковые эффекты выключены':'Звуковые эффекты включены';mt.setAttribute('aria-label',mt.title);mt.setAttribute('aria-pressed',String(!muted))};mtl();
mt.onclick=()=>{muted=!muted;try{localStorage.setItem('pz-mute',muted?'1':'0')}catch(e){}if(master)master.gain.setTargetAtTime(muted?0:1,AC.currentTime,.05);mtl()};

/* 5. Ambient player (procedural pad, sound-wave visualizer) */
const pl=mk('div','pl',`<button id="pp" aria-label="Играть ambient">▶</button><div class="ti"><b>ZERO CORE — Ambient</b><span>Procedural · WebAudio</span></div><canvas id="vz" width="64" height="28" aria-hidden="true"></canvas>`);document.body.append(pl);
const pp=pl.querySelector('#pp'),vz=pl.querySelector('#vz'),vx=vz.getContext('2d');let mus=null,an,vraf;
function viz(){const bins=an?new Uint8Array(an.frequencyBinCount):null;if(bins)an.getByteFrequencyData(bins);vx.clearRect(0,0,64,28);
  vx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--c').trim()||'#55ddf5';
  for(let i=0;i<8;i++){const v=mus&&bins?bins.slice(i*3,i*3+3).reduce((a,b)=>a+b,0)/765:0;const h=3+v*24;vx.fillRect(i*8+1,28-h,5,h)}
  if(mus)vraf=requestAnimationFrame(viz)}
function startMusic(){const c=ac(),t=c.currentTime,out=c.createGain();out.gain.setValueAtTime(0,t);out.gain.linearRampToValueAtTime(.15,t+2.5);
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
})();
