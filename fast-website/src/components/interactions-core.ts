// @ts-nocheck
// DOM glue for the custom cursor, hover bubbles, right-click menu and emoji animation.
// Plain DOM code kept untyped on purpose; the rest of the project is strict TypeScript.
export function initInteractions(gsap, { lite, tips }){
 const $=s=>document.querySelector(s),D=lite?0:1,off=[];
 const on=(t,e,f,o)=>{t.addEventListener(e,f,o);off.push(()=>t.removeEventListener(e,f,o))};
 // ---- tooltip content
 tips.rules.forEach(([s,t])=>document.querySelectorAll(s).forEach(el=>{el.dataset.tip=t}));
 document.querySelectorAll(".row").forEach(r=>{const h=r.querySelector("h3"),t=h&&tips.rows[h.textContent];if(t)r.dataset.tip=t});
 document.querySelectorAll(".hot a").forEach(a=>{a.dataset.tip=a.getAttribute("href").startsWith("tel:")?"Tap to call from your phone":"Opens WhatsApp"});
 // ---- every emoji gets its own animation
 const A={"💛":"beat","🧡":"beat","💚":"beat","🤍":"beat","💖":"beat","🫶":"beat","🤗":"hug","🫂":"hug","🙌":"wave","💪":"flex","🌱":"sway","🌿":"sway","🍀":"sway","🪴":"sway","🌷":"sway","🌸":"spin","🌻":"spin","🌼":"spin","☀":"spin","✨":"twinkle","🌟":"twinkle","💫":"twinkle","🕊":"fly","🦋":"fly","🌈":"pulse"};
 if(!lite)document.querySelectorAll(".e").forEach(e=>{
  const k=A[e.textContent.replace(/\uFE0F/g,"")]||"pulse",d=Math.random();let tw;
  if(k==="beat")tw=gsap.timeline({repeat:-1,repeatDelay:.5,delay:d}).to(e,{scale:1.38,duration:.14,ease:"power2.out"}).to(e,{scale:1,duration:.14}).to(e,{scale:1.26,duration:.14}).to(e,{scale:1,duration:.3});
  else if(k==="hug")tw=gsap.to(e,{scaleX:1.24,scaleY:.84,duration:.55,yoyo:true,repeat:-1,ease:"sine.inOut",delay:d});
  else if(k==="wave")tw=gsap.fromTo(e,{rotation:-28},{rotation:28,transformOrigin:"50% 100%",duration:.35,yoyo:true,repeat:-1,ease:"sine.inOut",delay:d});
  else if(k==="flex")tw=gsap.timeline({repeat:-1,repeatDelay:.6,delay:d}).to(e,{scale:1.4,rotation:-10,duration:.25,ease:"back.out(3)"}).to(e,{scale:1,rotation:0,duration:.35});
  else if(k==="sway")tw=gsap.fromTo(e,{rotation:-14},{rotation:14,transformOrigin:"50% 100%",duration:1.5,yoyo:true,repeat:-1,ease:"sine.inOut",delay:d});
  else if(k==="spin")tw=gsap.to(e,{rotation:360,duration:7,ease:"none",repeat:-1});
  else if(k==="twinkle")tw=gsap.to(e,{scale:1.4,rotation:25,opacity:.7,duration:.7,yoyo:true,repeat:-1,ease:"sine.inOut",delay:d});
  else if(k==="fly")tw=gsap.fromTo(e,{y:5,x:-4,rotation:-12},{y:-7,x:4,rotation:12,duration:1.1,yoyo:true,repeat:-1,ease:"sine.inOut",delay:d});
  else tw=gsap.to(e,{scale:1.28,duration:.9,yoyo:true,repeat:-1,ease:"sine.inOut",delay:d});
  const p=e.parentElement;on(p,"pointerenter",()=>gsap.to(tw,{timeScale:3.5,duration:.2}));on(p,"pointerleave",()=>gsap.to(tw,{timeScale:1,duration:.4}));
 });
 // ---- 3D cursor
 const cur=$("#cur"),c3=cur&&cur.querySelector(".c3"),root=document.documentElement;
 if(cur&&matchMedia("(pointer:fine)").matches){
  let shown=false,lx=0,ly=0,rest=0,hov=false;
  const qx=gsap.quickTo(cur,"x",{duration:D?.07:.001,ease:"power3"}),qy=gsap.quickTo(cur,"y",{duration:D?.07:.001,ease:"power3"});
  const pose=(rx,ry,rz,d)=>gsap.to(c3,{rotationX:rx,rotationY:ry,rotationZ:rz,duration:d,ease:"power3.out",overwrite:"auto"});
  gsap.set(c3,{rotationX:12,rotationY:-16,transformPerspective:520,transformOrigin:"4px 3px"});
  const REST=()=>pose(12,-16,0,.7),cl=(v,m)=>Math.max(-m,Math.min(m,v));
  on(document,"pointermove",e=>{
   if(e.pointerType!=="mouse")return;
   if(!shown){shown=true;root.classList.add("ccur");cur.style.visibility="visible";gsap.set(cur,{x:e.clientX,y:e.clientY});gsap.to(cur,{opacity:1,duration:.3})}
   qx(e.clientX);qy(e.clientY);
   if(!lite){pose(12-cl(e.clientY-ly,30)*.8,-16+cl(e.clientX-lx,30)*.9,cl(e.clientX-lx,25)*.5,.25);clearTimeout(rest);rest=setTimeout(REST,90)}
   lx=e.clientX;ly=e.clientY;
   const t=e.target;if(!t.closest)return;
   cur.style.visibility=t.closest("input[type=email],input:not([type]),textarea")?"hidden":"visible";
   const h=!!t.closest("a[href],button:not(:disabled),label,[role=menuitem],.btn:not([aria-disabled=true])");
   if(h!==hov){hov=h;cur.classList.toggle("hov",h);gsap.to(c3,{scale:h?1.2:1,duration:.25*D,ease:"back.out(2)"})}
  },{passive:true});
  on(document,"pointerdown",e=>{if(e.pointerType==="touch"){root.classList.remove("ccur");cur.style.visibility="hidden";shown=false}else gsap.to(c3,{scale:.86,duration:.1*D})});
  on(document,"pointerup",()=>gsap.to(c3,{scale:hov?1.2:1,duration:.3*D,ease:"back.out(3)"}));
  on(root,"mouseleave",()=>gsap.to(cur,{opacity:0,duration:.2}));on(root,"mouseenter",()=>{if(shown)gsap.to(cur,{opacity:1,duration:.2})});
  off.push(()=>root.classList.remove("ccur"));
 }
 // ---- hover info bubbles
 const tip=$("#tip");let tcur=null,tt=0,vis=false,lastX=0;
 const place=x=>{const w=tip.offsetWidth,left=Math.max(8,Math.min(innerWidth-w-8,x-w/2));tip.style.left=left+"px";tip.style.setProperty("--tx",(x-left)+"px")};
 const showTip=(t,x)=>{tip.textContent=t.dataset.tip;gsap.set(tip,{autoAlpha:0,scale:1,y:0});
  const h=tip.offsetHeight,r=t.getBoundingClientRect(),below=r.top<h+24;
  place(x);tip.style.top=(below?r.bottom+12:r.top-12-h)+"px";tip.dataset.pos=below?"below":"above";tip.style.transformOrigin=tip.style.getPropertyValue("--tx")+" "+(below?"0":"100%");
  gsap.fromTo(tip,{autoAlpha:0,y:below?-8:8,scale:.82},{autoAlpha:1,y:0,scale:1,duration:.38*D,ease:"back.out(2.2)",overwrite:"auto"});vis=true};
 const hideTip=()=>{clearTimeout(tt);if(!vis)return;vis=false;gsap.to(tip,{autoAlpha:0,scale:.92,duration:.16*D,overwrite:"auto"})};
 on(document,"pointermove",e=>{lastX=e.clientX;if(vis)place(e.clientX)},{passive:true});
 on(document,"pointerover",e=>{if(e.pointerType==="touch")return;const t=e.target.closest&&e.target.closest("[data-tip]");if(t===tcur)return;tcur=t;hideTip();if(t&&menu.hidden){tt=setTimeout(()=>showTip(t,lastX),D?260:0)}});
 on(document,"focusin",e=>{const t=e.target.closest&&e.target.closest("[data-tip]");if(t&&t.matches(":focus-visible")){const r=t.getBoundingClientRect();tcur=t;showTip(t,r.left+r.width/2)}});
 on(document,"focusout",hideTip);on(document,"pointerdown",hideTip);on(window,"scroll",hideTip,{passive:true});on(root,"mouseleave",hideTip);
 // ---- animated right-click menu
 const menu=$("#ctx"),mItems=[...menu.querySelectorAll("a,button")],copySel=menu.querySelector("[data-act=sel]");let sel="";
 const openMenu=(x,y)=>{hideTip();sel=String(getSelection()||"").trim();copySel.hidden=!sel;menu.hidden=false;
  const v=mItems.filter(i=>!i.hidden),w=menu.offsetWidth,h=menu.offsetHeight,fx=x+w+8>innerWidth,fy=y+h+8>innerHeight;
  gsap.set(menu,{left:fx?x-w:x,top:fy?y-h:y,transformOrigin:(fx?"right":"left")+" "+(fy?"bottom":"top")});
  gsap.fromTo(menu,{autoAlpha:0,scale:.82,y:fy?10:-10},{autoAlpha:1,scale:1,y:0,duration:.4*D,ease:"back.out(2)",overwrite:"auto"});
  gsap.fromTo(v,{autoAlpha:0,x:-16},{autoAlpha:1,x:0,stagger:.045*D,duration:.3*D,delay:.06*D,ease:"power2.out",overwrite:"auto"})};
 const closeMenu=()=>{if(menu.hidden)return;gsap.to(menu,{autoAlpha:0,scale:.9,duration:.16*D,overwrite:"auto",onComplete:()=>{menu.hidden=true}})};
 const flash=(b,label)=>{const o=b.dataset.t||b.textContent;b.dataset.t=o;b.textContent=label;setTimeout(()=>{closeMenu();setTimeout(()=>{b.textContent=o},250)},650)};
 on(document,"contextmenu",e=>{if(e.shiftKey||e.target.closest("input,textarea,[contenteditable=true]"))return;e.preventDefault();openMenu(e.clientX,e.clientY)});
 on(document,"pointerdown",e=>{if(!menu.contains(e.target))closeMenu()});
 on(document,"keydown",e=>{if(e.key==="Escape"){closeMenu();hideTip()}
  if(!menu.hidden&&(e.key==="ArrowDown"||e.key==="ArrowUp")){e.preventDefault();const v=mItems.filter(i=>!i.hidden),i=v.indexOf(document.activeElement);v[(i+(e.key==="ArrowDown"?1:-1)+v.length)%v.length].focus()}});
 on(window,"scroll",closeMenu,{passive:true});on(window,"resize",closeMenu);on(window,"blur",closeMenu);
 on(menu,"click",e=>{const b=e.target.closest("[data-act]"),a=b&&b.dataset.act;
  if(a==="link")return navigator.clipboard.writeText(location.href.split("#")[0]).then(()=>flash(b,"Link copied"),closeMenu),0;
  if(a==="sel")return navigator.clipboard.writeText(sel).then(()=>flash(b,"Copied"),closeMenu),0;
  if(a==="top"){const L=window.__lenis;L?L.scrollTo(0):scrollTo({top:0,behavior:"smooth"})}
  closeMenu()});
 return()=>off.forEach(f=>f());
}
