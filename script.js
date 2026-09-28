/* ===== EDIT ME: add your links here (leave "" to hide) ===== */
const D={
 github:"",      // e.g. "https://github.com/yourusername"
 linkedin:"",    // e.g. "https://linkedin.com/in/yourname"
 email:"soumyaghag@gmail.com",phone:"+918452010747",loc:"Mumbai, India",
 roles:["Software Engineer","Java Developer","Front-End Builder","Problem Solver"],
 about:"I'm a motivated, detail-oriented Computer Engineering undergraduate at VIT Mumbai with a clear focus on software engineering. I build web basics with HTML, CSS and Java, and I keep learning through hands-on projects.",
 skills:{Languages:["Java","C","SQL"],Web:["HTML","CSS"],"Soft skills":["Problem Solving","Critical Thinking","Teamwork","Communication","Leadership"],Spoken:["English","Marathi","Hindi"]},
 projects:[
  {n:"Food Guide",t:"HTML · CSS",d:"A responsive static food website showcasing dishes and categories with clean, structured code and attractive styling."},
  {n:"AI Tic Tac Toe",t:"C · Java",d:"A console game with an unbeatable AI opponent using the minimax algorithm, plus win/loss/draw logic. Play the web version below!"},
  {n:"Student Management System",t:"SQL",d:"A normalised database for registrations, courses, grades and personal details, with queries for insert, update, delete and retrieval."}],
 journey:[
  ["2024 – now","B.Tech, Computer Engineering","Vidyalankar Institute of Technology, Mumbai · 7.5 CGPA"],
  ["2025","Software Engineering Intern","CodeClause Pvt Ltd · 2 months of real-world software tasks and projects"],
  ["2025","The Complete Java Course","Udemy certification (May – Nov 2025)"],
  ["2025","HTML & CSS Basics","Udemy (Jan – May 2025)"],
  ["2022 – 2024","HSC","MVM Jr. College, Mulund · 75%"],
  ["2012 – 2022","SSC","DAV Public School, Airoli · 85%"]]
};
const $=s=>document.querySelector(s);
/* render sections */
$("#aboutTxt").textContent=D.about;
$("#skills").innerHTML=Object.entries(D.skills).map(([k,v])=>`<p>${k}</p><div class="chips">${v.map(s=>`<span>${s}</span>`).join("")}</div>`).join("");
$("#projGrid").innerHTML=D.projects.map(p=>`<div class="card"><h4>${p.n}</h4><p>${p.d}</p><small>${p.t}</small></div>`).join("");
$("#timeline").innerHTML=D.journey.map(j=>`<div class="ev"><small>${j[0]}</small><h4>${j[1]}</h4><p>${j[2]}</p></div>`).join("");
const links=[["✉ "+D.email,"mailto:"+D.email],["☎ "+D.phone,"tel:"+D.phone],["📄 Resume","Resume.pdf"]];
if(D.github)links.push(["GitHub",D.github]);if(D.linkedin)links.push(["LinkedIn",D.linkedin]);
$("#contactLinks").innerHTML=links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join("")+`<span>📍 ${D.loc}</span>`;
/* typing effect */
let ri=0,ci=0,del=false;
(function ty(){const w=D.roles[ri];$("#type").textContent=w.slice(0,ci);
 if(!del&&ci==w.length){del=true;return setTimeout(ty,1400)}
 if(del&&ci==0){del=false;ri=(ri+1)%D.roles.length}
 ci+=del?-1:1;setTimeout(ty,del?40:90)})();
/* accent colours */
const cols=["#00e5c3","#7c5cff","#ff6b9d","#ffb300"];
$("#dots").innerHTML=cols.map(c=>`<i style="background:${c}" data-c="${c}"></i>`).join("");
$("#dots").onclick=e=>{if(e.target.dataset.c)document.documentElement.style.setProperty("--a",e.target.dataset.c)};
/* glow cursor + card tilt */
let mx=innerWidth/2,my=innerHeight/2;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;const g=$("#glow");g.style.left=mx+"px";g.style.top=my+"px"});
document.querySelectorAll(".card").forEach(c=>{
 c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03)`};
 c.onmouseleave=()=>c.style.transform=""});
/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("on")),{threshold:.15});
document.querySelectorAll("section,.card,.ev").forEach(el=>{el.classList.add("rv");io.observe(el)});
/* particle background that reacts to the mouse */
const cv=$("#bg"),cx=cv.getContext("2d");let P=[];
function size(){cv.width=innerWidth;cv.height=innerHeight;P=Array.from({length:Math.min(90,innerWidth/14|0)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:Math.random()-.5,vy:Math.random()-.5}))}
addEventListener("resize",size);size();
(function draw(){cx.clearRect(0,0,cv.width,cv.height);const a=getComputedStyle(document.documentElement).getPropertyValue("--a");
 P.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>cv.width)p.vx*=-1;if(p.y<0||p.y>cv.height)p.vy*=-1;
  const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<140){p.x+=dx/d*2;p.y+=dy/d*2}
  cx.fillStyle=a;cx.globalAlpha=.6;cx.fillRect(p.x,p.y,2,2);
  for(let j=i+1;j<P.length;j++){const q=P[j],e=Math.hypot(p.x-q.x,p.y-q.y);if(e<110){cx.globalAlpha=.15*(1-e/110);cx.strokeStyle=a;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}});
 requestAnimationFrame(draw)})();
/* interactive terminal */
const C={
 help:()=>"Commands: <b>about</b>, <b>skills</b>, <b>projects</b>, <b>education</b>, <b>contact</b>, <b>resume</b>, <b>play</b>, <b>theme</b>, <b>clear</b>",
 about:()=>D.about,
 skills:()=>Object.entries(D.skills).map(([k,v])=>`<b>${k}:</b> ${v.join(", ")}`).join("\n"),
 projects:()=>D.projects.map((p,i)=>`${i+1}. <b>${p.n}</b> (${p.t})`).join("\n"),
 education:()=>D.journey.map(j=>`<b>${j[0]}</b> ${j[1]} - ${j[2]}`).join("\n"),
 contact:()=>`${D.email}\n${D.phone}\n${D.loc}`,
 resume:()=>{window.open("Resume.pdf");return "Opening resume..."},
 play:()=>{location.hash="#play";return "Good luck, you'll need it :)"},
 theme:()=>{const c=cols[(cols.indexOf(getComputedStyle(document.documentElement).getPropertyValue("--a").trim())+1)%cols.length];document.documentElement.style.setProperty("--a",c);return "Accent changed to "+c},
 clear:()=>{$("#out").innerHTML="";return ""}};
$("#out").innerHTML="Welcome! Type <b>help</b> to explore my portfolio.\n";
$("#cmd").onkeydown=e=>{if(e.key!="Enter")return;const v=e.target.value.trim().toLowerCase();e.target.value="";if(!v)return;
 const r=C[v]?C[v]():`command not found: ${v}. Try <b>help</b>`;
 if(v!="clear")$("#out").innerHTML+=`<b>$</b> ${v}\n${r}\n`;$("#out").scrollTop=1e5};
/* Tic-Tac-Toe with minimax (unbeatable) */
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const win=b=>{for(const[a,c,d]of L)if(b[a]&&b[a]==b[c]&&b[a]==b[d])return[b[a],[a,c,d]];return b.includes("")?null:["T",[]]};
const mm=(b,p)=>{const w=win(b);if(w)return w[0]=="O"?1:w[0]=="X"?-1:0;let s=p=="O"?-2:2;
 b.forEach((v,i)=>{if(!v){b[i]=p;const r=mm(b,p=="O"?"X":"O");b[i]="";s=p=="O"?Math.max(s,r):Math.min(s,r)}});return s};
let B,over,sc={you:0,ai:0,draw:0};
function render(res){$("#board").innerHTML=B.map((v,i)=>`<button data-i="${i}" ${v||over?"disabled":""} class="${res&&res[1].includes(i)?"w":""}">${v}</button>`).join("");
 $("#score").textContent=`You ${sc.you} · AI ${sc.ai} · Draws ${sc.draw}`}
function start(){B=Array(9).fill("");over=false;$("#status").textContent="Your move";render()}
function end(r){over=true;const k=r[0]=="X"?"you":r[0]=="O"?"ai":"draw";sc[k]++;
 $("#status").textContent=k=="you"?"You win! (impossible...)":k=="ai"?"AI wins. Minimax never loses.":"It's a draw!";render(r)}
$("#board").onclick=e=>{const i=e.target.dataset.i;if(i==null||B[i]||over)return;B[i]="X";let r=win(B);if(r)return end(r);
 let best=-2,mv;B.forEach((v,j)=>{if(!v){B[j]="O";const s=mm(B,"X");B[j]="";if(s>best){best=s;mv=j}}});
 B[mv]="O";r=win(B);if(r)return end(r);render()};
$("#reset").onclick=start;start();
