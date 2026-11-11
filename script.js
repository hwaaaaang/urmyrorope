const cute=document.getElementById('cute');
const formal=document.getElementById('formal');
const gift=document.getElementById('gift');
const transition=document.getElementById('transition');
const openButton=document.getElementById('open');
let opening=false;
function popSound(){
  try{
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtx)return;
    const ctx=new AudioCtx();
    const osc=ctx.createOscillator();const gain=ctx.createGain();
    osc.type='triangle';osc.frequency.setValueAtTime(160,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55,ctx.currentTime+.19);
    gain.gain.setValueAtTime(.18,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.22);
    osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.23);
    osc.onended=()=>ctx.close();
  }catch(e){}
}
function openGift(){
  if(opening)return;opening=true;openButton.disabled=true;
  gift.classList.add('open');
  window.setTimeout(()=>{popSound();transition.classList.add('run')},430);
  window.setTimeout(()=>{
    cute.style.display='none';formal.classList.add('active');
    document.body.style.background='#f83c61';window.scrollTo(0,0);
  },980);
  window.setTimeout(()=>transition.classList.remove('run'),2430);
}
openButton.addEventListener('click',openGift);
gift.addEventListener('click',openGift);
gift.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openGift()}});
document.getElementById('receive').addEventListener('click',()=>{
  document.getElementById('result').classList.add('show');
  document.getElementById('receive').textContent='💖 선물 받기 완료~!!! 💖';
});
document.getElementById('again').addEventListener('click',()=>{
  formal.classList.remove('active');cute.style.display='grid';document.body.style.background='#ffe4ef';
  gift.classList.remove('open');document.getElementById('result').classList.remove('show');
  document.getElementById('receive').textContent='💌 사랑의 빼빼로 받기 💌';
  opening=false;openButton.disabled=false;window.scrollTo(0,0);
});
