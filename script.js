// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
for(let i=0;i<70;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*2+1,
    sx: Math.random()*0.8-0.4,
    sy: Math.random()*0.8-0.4,
    color: Math.random()>0.5?"#00abf0":"#22d3ee"
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.sx; p.y+=p.sy;
    if(p.x<0||p.x>canvas.width) p.sx*=-1;
    if(p.y<0||p.y>canvas.height) p.sy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.shadowBlur=8; ctx.shadowColor=p.color;
    ctx.fill();
    ctx.shadowBlur=0;
  });
  // lines
  for(let a=0;a<particles.length;a++){
    for(let b=a+1;b<particles.length;b++){
      let dx=particles[a].x-particles[b].x;
      let dy=particles[a].y-particles[b].y;
      let d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath();
        ctx.strokeStyle=`rgba(0,171,240,${1-d/120})`;
        ctx.lineWidth=0.3;
        ctx.moveTo(particles[a].x,particles[a].y);
        ctx.lineTo(particles[b].x,particles[b].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

// TYPED ANIMATION
const typed = document.getElementById("typed-text");
const words = ["Full-Stack Developer","Web Designer","Problem Solver","C++ Programmer","Python Programmer","Tech Enthusiast"];
let wi=0, ci=0, del=false;

function type(){
  const w=words[wi];
  if(!del){
    typed.textContent=w.slice(0,ci+1); ci++;
    if(ci===w.length){ del=true; setTimeout(type,2000); return; }
  }else{
    typed.textContent=w.slice(0,ci-1); ci--;
    if(ci===0){ del=false; wi=(wi+1)%words.length; }
  }
  setTimeout(type, del?50:110);
}
setTimeout(type,800);

// ACTIVE NAV + REVEAL
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{
  let cur="";
  sections.forEach(s=>{ if(scrollY>=s.offsetTop-200) cur=s.id; });
  navLinks.forEach(a=>{ a.classList.remove("active"); if(a.getAttribute("href")==`#${cur}`) a.classList.add("active"); });
});

const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.style.opacity="1"; e.target.style.transform="translateY(0)"; } });
},{threshold:0.15});

document.querySelectorAll(".skill,.project-card").forEach(el=>{
  el.style.opacity="0"; el.style.transform="translateY(25px)"; el.style.transition="0.7s ease";
  obs.observe(el);
});