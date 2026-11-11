// Independent controls for each problem / explanation image group.
let imageViewPreference={mode:'width',zoom:100};
try{const stored=JSON.parse(localStorage.getItem('sqld-image-view'));if(stored&&['width','fit','zoom'].includes(stored.mode)&&Number.isFinite(stored.zoom))imageViewPreference={mode:stored.mode,zoom:Math.max(20,Math.min(200,stored.zoom))}}catch{}
const imageViewerCleanups=new Map();
function setupImageViewers(){
 imageViewerCleanups.forEach((cleanup,element)=>{if(!element.isConnected){cleanup();imageViewerCleanups.delete(element)}});
 document.querySelectorAll('article .question-img').forEach(first=>{
  if(first.closest('.image-viewer'))return;
  const images=[first];let next=first.nextElementSibling;
  while(next?.matches('.question-img')){images.push(next);next=next.nextElementSibling}
  const viewer=document.createElement('section');viewer.className='image-viewer';
  viewer.innerHTML=`<div class="image-tools" role="group" aria-label="이미지 크기 조절"><button type="button" data-size="down" aria-label="이미지 축소">−</button><input type="range" min="20" max="200" step="5" value="100" aria-label="이미지 확대 비율"><output>100%</output><button type="button" data-size="up" aria-label="이미지 확대">＋</button><button type="button" data-size="width">가로 맞춤</button><button type="button" data-size="fit">한눈에 보기</button><button type="button" data-size="full">전체화면</button></div><div class="image-stage" tabindex="0" aria-label="문제 이미지, 확대 시 스크롤 가능"><div class="image-canvas"></div></div>`;
  first.before(viewer);const canvas=viewer.querySelector('.image-canvas'),stage=viewer.querySelector('.image-stage'),slider=viewer.querySelector('input'),output=viewer.querySelector('output');
  images.forEach(im=>canvas.append(im));let {mode,zoom}=imageViewPreference;
  function remember(){imageViewPreference={mode,zoom};try{localStorage.setItem('sqld-image-view',JSON.stringify(imageViewPreference))}catch{}}
  function update(){
   const available=Math.max(1,stage.clientWidth-16);
   const ratio=images.reduce((sum,im)=>sum+(im.naturalWidth?im.naturalHeight/im.naturalWidth:0),0);
   const height=document.fullscreenElement===viewer?Math.max(150,viewer.clientHeight-viewer.querySelector('.image-tools').offsetHeight-24):Math.max(180,window.innerHeight*.64);
   const width=mode==='fit'&&ratio?Math.min(available,(height-16)/ratio):available*zoom/100;
   canvas.style.width=width+'px';output.value=Math.round(width/available*100)+'%';
   slider.value=String(Math.max(20,Math.min(200,width/available*100)));
   viewer.querySelector('[data-size="fit"]').setAttribute('aria-pressed',String(mode==='fit'));
   viewer.querySelector('[data-size="width"]').setAttribute('aria-pressed',String(mode==='width'));
  }
  function change(value){mode='zoom';zoom=Math.max(20,Math.min(200,value));remember();update()}
  slider.oninput=()=>change(Number(slider.value));
  viewer.querySelectorAll('[data-size]').forEach(button=>button.onclick=async()=>{
   const action=button.dataset.size;
   if(action==='full'){
    try{if(document.fullscreenElement===viewer)await document.exitFullscreen();else await viewer.requestFullscreen()}catch{viewer.classList.toggle('expanded-view');button.textContent=viewer.classList.contains('expanded-view')?'크게 보기 닫기':'전체화면';update()}
    return;
   }
   if(action==='up'||action==='down')change(Number(output.value.replace('%',''))+(action==='up'?10:-10));
   else{mode=action;zoom=100;remember();stage.scrollTo(0,0);update()}
  });
  images.forEach(im=>im.addEventListener('load',update));
  const observer=new ResizeObserver(update);observer.observe(stage);
  const fullChange=()=>{viewer.querySelector('[data-size="full"]').textContent=document.fullscreenElement===viewer?'전체화면 닫기':'전체화면';update()};
  document.addEventListener('fullscreenchange',fullChange);
  imageViewerCleanups.set(viewer,()=>{observer.disconnect();document.removeEventListener('fullscreenchange',fullChange)});
  update();
 });
}
new MutationObserver(()=>setupImageViewers()).observe(document.querySelector('#app'),{childList:true});
setupImageViewers();
