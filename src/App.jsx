import { useState, useEffect, useRef } from "react";
import PaymentPage from "./PaymentPage";

const C = {
  teal: "#1B6E8A", tealDark: "#134E63", tealDeep: "#0C2F3D",
  green: "#00D455", greenBright: "#00E85E",
  white: "#FFFFFF", offWhite: "#F4F8F9",
  lightTeal: "rgba(27,110,138,0.06)",
  gray: "#5A6B73", grayLight: "#8A9BA3", dark: "#091E27",
};
const F = { h: "'Playfair Display',Georgia,serif", b: "'DM Sans','Helvetica Neue',sans-serif" };

const GCSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{overflow-x:hidden;font-family:${F.b};background:${C.offWhite}}
::selection{background:rgba(0,212,85,.2)}
button{font:inherit}
button:focus-visible,a:focus-visible{outline:2px solid ${C.green};outline-offset:3px}
button:not(:disabled){transition:transform .2s ease,filter .2s ease,box-shadow .2s ease}
button:not(:disabled):hover{transform:translateY(-2px);filter:brightness(1.05)}
button:not(:disabled):active{transform:translateY(0)}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.23,1,.32,1),transform .7s cubic-bezier(.23,1,.32,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}
.card-hover{box-shadow:0 8px 26px rgba(12,47,61,.045);transition:transform .3s ease,box-shadow .3s ease}
.card-hover:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(27,110,138,.1)}
.partner-track{display:flex;align-items:center;gap:0;animation:ticker 30s linear infinite;width:max-content}
.partner-track:hover{animation-play-state:paused}
.stats-grid>.stat-item{position:relative}
.stats-grid>.stat-item:not(:last-child)::after{content:'';position:absolute;top:4px;right:-12px;width:1px;height:calc(100% - 8px);background:linear-gradient(180deg,transparent,rgba(27,110,138,.16),transparent)}
.ba-slider{position:relative;overflow:hidden;border-radius:4px;cursor:ew-resize;user-select:none}
.ba-handle{position:absolute;top:0;bottom:0;width:3px;background:#00D455;cursor:ew-resize;z-index:3;transform:translateX(-50%)}
.ba-handle::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:#00D455;border:3px solid #fff;box-shadow:0 2px 12px rgba(0,0,0,.3)}
.ba-handle::after{content:'◀ ▶';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:10px;color:#091E27;font-weight:700;letter-spacing:-1px;margin-top:0px;pointer-events:none}
@media(max-width:768px){
  .hide-m{display:none!important}
  .m-stack{grid-template-columns:1fr!important}
  .m-pad{padding-left:20px!important;padding-right:20px!important}
  .m-txt h1{font-size:36px!important}
  .m-txt h2{font-size:26px!important}
  .spotlight-grid{grid-template-columns:1fr!important;gap:32px!important;padding:40px 24px!important}
  .wax-strip{grid-template-columns:1fr!important;gap:24px!important;padding:44px 24px!important;text-align:left}
  .wax-strip h2{white-space:normal!important}
  .partner-item{padding-left:34px!important;padding-right:34px!important;gap:12px!important}
  .stats-grid{gap:0!important;padding:38px 10px!important}
  .stats-grid>.stat-item{padding:0 10px}
  .stats-grid>.stat-item:not(:last-child)::after{right:0}
  .stat-value{font-size:32px!important}
  .stat-label{font-size:11px!important;line-height:1.35!important}
  .family-grid{gap:36px!important;padding-top:64px!important;padding-bottom:64px!important}
  .gallery-section,.before-after-section,.home-cta{padding-top:64px!important;padding-bottom:64px!important}
  .gallery-section>.m-pad,.before-after-section>.m-pad{padding-left:0!important;padding-right:0!important}
  .gallery-grid{grid-template-columns:1fr!important;gap:16px!important}
  .gallery-card img{height:220px!important}
  .footer-inner{flex-direction:column;align-items:flex-start!important;gap:16px!important}
}
@media(min-width:769px){.hide-d{display:none!important}}
@media(prefers-reduced-motion:reduce){
  .reveal{opacity:1;transform:none;transition:none}
  .partner-track{animation:none}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}
`;

function useReveal(){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("visible");obs.unobserve(el)}},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    obs.observe(el);return()=>obs.disconnect();
  },[]);return ref;
}
function R({children,delay=0,className=""}){
  const ref=useReveal();
  const dc=delay===1?" reveal-d1":delay===2?" reveal-d2":delay===3?" reveal-d3":"";
  return <div ref={ref} className={`reveal${dc} ${className}`}>{children}</div>;
}

function Logo({size=48,dark=false}){
  return <img src={dark?"/logo-dark.png":"/logo-t.png"} alt="QC Atlantic" style={{width:size,height:"auto",display:"block"}} />;
}

function HeroBG(){
  return(<div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
    <video autoPlay muted loop playsInline poster="/poster.png" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}><source src="/hero-video.mp4" type="video/mp4"/></video>
    <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 40%,${C.tealDark}cc,${C.tealDeep}dd 50%,${C.dark}ee 100%)`}}/>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent 5%,${C.green},transparent 95%)`}}/>
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:120,background:`linear-gradient(0deg,${C.offWhite},transparent)`}}/>
  </div>);
}

function SBG(){
  return(<div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
    <div style={{position:"absolute",inset:0,background:`linear-gradient(160deg,${C.dark} 0%,${C.tealDeep} 100%)`}}/>
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.025}} xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="hx2" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
        <path d="M28 2L54 18V50L28 66 2 50V18Z" fill="none" stroke={C.green} strokeWidth=".5"/>
      </pattern></defs><rect width="100%" height="100%" fill="url(#hx2)"/>
    </svg>
  </div>);
}

function Lbl({children}){return <div style={{fontFamily:F.b,fontSize:11.5,letterSpacing:".2em",textTransform:"uppercase",color:C.green,marginBottom:14,fontWeight:600}}>{children}</div>}

function Nav({currentPage,setPage}){
  const[scrolled,setScrolled]=useState(false);
  const[mob,setMob]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  useEffect(()=>{document.body.style.overflow=mob?"hidden":"";return()=>{document.body.style.overflow=""}},[mob]);
  const pages=["Home","Products","About","Contact","Pay"];
  const go=p=>{setPage(p);setMob(false)};
  return(<>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:scrolled?"10px 0":"16px 0",background:scrolled?"rgba(12,47,61,.97)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",transition:"all .35s",borderBottom:scrolled?`1px solid rgba(0,212,85,.1)`:"none"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button type="button" aria-label="Go to home" onClick={()=>go("Home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:"none",border:"none",padding:0}}>
          <Logo size={30} dark/><span style={{fontFamily:F.h,fontSize:19,fontWeight:700,color:C.white}}>QC Atlantic</span>
        </button>
        <div className="hide-m" style={{display:"flex",alignItems:"center",gap:28}}>
          {pages.map(p=><button key={p} onClick={()=>go(p)} style={{background:"none",border:"none",fontFamily:F.b,fontSize:12.5,fontWeight:currentPage===p?600:400,color:currentPage===p?C.green:"rgba(255,255,255,.65)",cursor:"pointer",letterSpacing:".08em",textTransform:"uppercase",padding:"4px 0",borderBottom:currentPage===p?`2px solid ${C.green}`:"2px solid transparent",transition:"all .2s"}}>{p}</button>)}
          <button onClick={()=>go("Contact")} style={{fontFamily:F.b,fontSize:12,fontWeight:600,padding:"9px 22px",background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2}}>Get Started</button>
        </div>
        <button type="button" className="hide-d" aria-label={mob?"Close menu":"Open menu"} aria-expanded={mob} onClick={()=>setMob(!mob)} style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex",flexDirection:"column",gap:5}}>
          <span style={{display:"block",width:24,height:2,background:C.white,transition:"all .3s",transform:mob?"rotate(45deg) translateY(7px)":"none"}}/>
          <span style={{display:"block",width:24,height:2,background:C.white,transition:"all .3s",opacity:mob?0:1}}/>
          <span style={{display:"block",width:24,height:2,background:C.white,transition:"all .3s",transform:mob?"rotate(-45deg) translateY(-7px)":"none"}}/>
        </button>
      </div>
    </nav>
    {mob&&<div style={{position:"fixed",inset:0,zIndex:999,background:"rgba(9,30,39,.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,animation:"fadeIn .25s ease"}}>
      {pages.map(p=><button key={p} onClick={()=>go(p)} style={{background:"none",border:"none",fontFamily:F.h,fontSize:28,fontWeight:700,color:currentPage===p?C.green:C.white,cursor:"pointer",padding:"12px 0"}}>{p}</button>)}
      <button onClick={()=>go("Contact")} style={{fontFamily:F.b,fontSize:14,fontWeight:600,padding:"14px 40px",marginTop:16,background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2}}>Get Started</button>
    </div>}
  </>);
}

function PCard({cat,alt}){
  return(<div className="card-hover" style={{background:alt?C.offWhite:C.white,border:`1px solid rgba(27,110,138,.06)`,borderRadius:4,overflow:"hidden"}}>
    <div style={{height:3,background:`linear-gradient(90deg,${C.teal},${C.green})`}}/>
    <div style={{padding:"26px 28px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <h3 style={{fontFamily:F.h,fontSize:21,fontWeight:700,color:C.tealDeep,margin:0}}>{cat.name}</h3>
        <span style={{fontFamily:F.b,fontSize:10,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",color:C.teal,background:C.lightTeal,padding:"4px 10px",borderRadius:2,whiteSpace:"nowrap"}}>{cat.tag}</span>
      </div>
      <p style={{fontFamily:F.b,fontSize:13.5,color:C.gray,lineHeight:1.7,margin:"0 0 18px"}}>{cat.desc}</p>
      <div style={{borderTop:`1px solid rgba(27,110,138,.06)`,paddingTop:14,display:"flex",flexWrap:"wrap",gap:6}}>
        {cat.products.map((p,j)=><span key={j} style={{fontFamily:F.b,fontSize:11.5,color:C.teal,background:alt?C.white:C.offWhite,padding:"4px 10px",borderRadius:2,fontWeight:500}}>{p}</span>)}
      </div>
    </div>
  </div>);
}

function LogoCard({src,alt,desc,alt2}){
  return(<div className="card-hover" style={{background:alt2?C.offWhite:C.white,border:`1px solid rgba(27,110,138,.06)`,borderRadius:4,overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px 32px",minHeight:200}}>
    <div style={{height:3,background:`linear-gradient(90deg,${C.teal},${C.green})`,position:"absolute",top:0,left:0,right:0}}/>
    <img src={src} alt={alt} style={{maxWidth:"80%",maxHeight:120,width:"auto",height:"auto",display:"block",marginBottom:desc?16:0}}/>
    {desc&&<p style={{fontFamily:F.b,fontSize:12.5,color:C.grayLight,textAlign:"center",lineHeight:1.6,margin:0}}>{desc}</p>}
  </div>);
}

function BeforeAfter(){
  const[pos,setPos]=useState(50);
  const ref=useRef(null);
  const getPos=e=>{
    const r=ref.current.getBoundingClientRect();
    const clientX=e.touches?e.touches[0].clientX:e.clientX;
    return Math.min(98,Math.max(2,((clientX-r.left)/r.width)*100));
  };
  const onPointerDown=e=>{
    e.currentTarget.setPointerCapture(e.pointerId);
    setPos(getPos(e));
  };
  const onPointerMove=e=>{
    if(e.buttons===0&&e.type!=="touchmove")return;
    setPos(getPos(e));
  };
  return(
    <div ref={ref} className="ba-slider" style={{aspectRatio:"16/9",touchAction:"none"}}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onTouchMove={e=>{e.preventDefault();setPos(getPos(e))}}>
      <img src="/photos/after.jpg" alt="After" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      <div style={{position:"absolute",inset:0,overflow:"hidden",width:`${pos}%`}}>
        <img src="/photos/before.jpg" alt="Before" style={{position:"absolute",inset:0,width:`${10000/pos}%`,maxWidth:"none",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      </div>
      <div className="ba-handle" style={{left:`${pos}%`}}/>
      <div style={{position:"absolute",top:14,left:14,background:"rgba(9,30,39,.75)",padding:"5px 12px",borderRadius:2,fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:"#fff",letterSpacing:".08em",textTransform:"uppercase",backdropFilter:"blur(4px)"}}>Before</div>
      <div style={{position:"absolute",top:14,right:14,background:"rgba(0,212,85,.85)",padding:"5px 12px",borderRadius:2,fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,color:"#091E27",letterSpacing:".08em",textTransform:"uppercase"}}>After</div>
    </div>
  );
}

function Ico({type,size=56}){
  const s={width:size,height:size,display:"block"};
  if(type==="dial")return(
    <svg viewBox="0 0 64 64" fill="none" style={s} xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" stroke={C.teal} strokeWidth="2"/>
      <circle cx="32" cy="32" r="20" stroke={C.teal} strokeWidth="1" strokeDasharray="2 3" opacity=".5"/>
      <path d="M32 14 L32 19" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 32 L45 32" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 50 L32 45" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 32 L19 32" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 32 L44 22" stroke={C.green} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="3" fill={C.green}/>
    </svg>
  );
  if(type==="drop")return(
    <svg viewBox="0 0 64 64" fill="none" style={s} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8 C32 8 16 26 16 38 C16 47 23 54 32 54 C41 54 48 47 48 38 C48 26 32 8 32 8 Z" stroke={C.teal} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M26 36 C26 32 28 28 32 26" stroke={C.green} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="38" cy="42" r="2" fill={C.green}/>
    </svg>
  );
  if(type==="shield")return(
    <svg viewBox="0 0 64 64" fill="none" style={s} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8 L52 16 L52 32 C52 44 43 53 32 56 C21 53 12 44 12 32 L12 16 Z" stroke={C.teal} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M40 22 a5 5 0 0 0 -6.5 6.5 L24 38 L26 40 L36 30 a5 5 0 0 0 6.5 -6.5 L38.5 25.5 L36 23 Z" fill="none" stroke={C.green} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
  return null;
}

function HomePage({setPage}){
  const[vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),150)},[]);
  return(<div>
    <section style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden"}}>
      <HeroBG/>
      <div className="m-pad m-txt" style={{maxWidth:860,margin:"0 auto",padding:"150px 32px 100px",textAlign:"center",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(30px)",transition:"all .9s cubic-bezier(.23,1,.32,1)"}}>
        <Lbl>Tailor Fit Car Wash Chemistry</Lbl>
        <h1 style={{fontFamily:F.h,fontSize:"clamp(40px,7vw,78px)",fontWeight:700,color:C.white,lineHeight:1.05,margin:"0 0 24px",letterSpacing:"-.03em"}}>Chemistry.<br/><span style={{color:C.green,fontStyle:"italic"}}>Not Soap.</span></h1>
        <p style={{fontFamily:F.b,fontSize:"clamp(16px,2.2vw,18px)",color:"rgba(255,255,255,.68)",maxWidth:520,margin:"0 auto 44px",lineHeight:1.7}}>Car wash chemistry tailored fit to your car wash, your water, and your market. Cleaner cars, drier cars, shinier cars, and a lower cost per car.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setPage("Contact")} style={{fontFamily:F.b,fontSize:14,fontWeight:600,padding:"15px 36px",background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2,boxShadow:`0 4px 20px ${C.green}33`}}>Schedule a Trial</button>
          <button onClick={()=>setPage("Products")} style={{fontFamily:F.b,fontSize:14,fontWeight:500,padding:"15px 36px",background:"rgba(255,255,255,.1)",color:C.white,border:"1px solid rgba(255,255,255,.28)",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2,backdropFilter:"blur(4px)"}}>See Our Chemistry</button>
        </div>
      </div>
    </section>
    <div style={{background:`linear-gradient(180deg,${C.dark} 0%,${C.tealDeep} 100%)`,padding:"28px 0",overflow:"hidden",position:"relative",borderBottom:`1px solid rgba(0,212,85,.08)`}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:80,background:`linear-gradient(90deg,${C.dark},transparent)`,zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:80,background:`linear-gradient(270deg,${C.tealDeep},transparent)`,zIndex:2,pointerEvents:"none"}}/>
      <div style={{overflow:"hidden"}}>
        <div className="partner-track">
          {[
            {src:"/blair-logo-white.png",alt:"Blair Ceramics",label:"Blair Ceramics",h:36},
            {src:"/oasis-logo.png",alt:"Oasis Car Wash Systems",label:"Oasis Car Wash Systems",h:36},
            {src:"/drb-logo.png",alt:"DRB Systems",label:"DRB Systems",h:36},
            {src:"/anova-logo-white.png",alt:"Anova",label:"Anova Tank Monitoring",h:14},
            {src:"/blair-logo-white.png",alt:"Blair Ceramics",label:"Blair Ceramics",h:36},
            {src:"/oasis-logo.png",alt:"Oasis Car Wash Systems",label:"Oasis Car Wash Systems",h:36},
            {src:"/drb-logo.png",alt:"DRB Systems",label:"DRB Systems",h:36},
            {src:"/anova-logo-white.png",alt:"Anova",label:"Anova Tank Monitoring",h:14},
            {src:"/blair-logo-white.png",alt:"Blair Ceramics",label:"Blair Ceramics",h:36},
            {src:"/oasis-logo.png",alt:"Oasis Car Wash Systems",label:"Oasis Car Wash Systems",h:36},
            {src:"/drb-logo.png",alt:"DRB Systems",label:"DRB Systems",h:36},
            {src:"/anova-logo-white.png",alt:"Anova",label:"Anova Tank Monitoring",h:14},
            {src:"/blair-logo-white.png",alt:"Blair Ceramics",label:"Blair Ceramics",h:36},
            {src:"/oasis-logo.png",alt:"Oasis Car Wash Systems",label:"Oasis Car Wash Systems",h:36},
            {src:"/drb-logo.png",alt:"DRB Systems",label:"DRB Systems",h:36},
            {src:"/anova-logo-white.png",alt:"Anova",label:"Anova Tank Monitoring",h:14},
          ].map((p,i)=>(
            <div key={i} className="partner-item" style={{display:"flex",alignItems:"center",gap:16,padding:"0 52px",flexShrink:0,borderRight:`1px solid rgba(255,255,255,.06)`}}>
              <img src={p.src} alt={p.alt} style={{height:p.h,width:"auto",opacity:.84,filter:"brightness(1.2)"}}/>
              <span style={{fontFamily:F.b,fontSize:11,fontWeight:600,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.42)",whiteSpace:"nowrap"}}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <section style={{background:C.white,borderBottom:`1px solid ${C.lightTeal}`}}>
      <div className="m-pad stats-grid" style={{maxWidth:1200,margin:"0 auto",padding:"48px 32px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,textAlign:"center"}}>
        {[{n:"10+",l:"Years of Tailored Fit Chemistry"},{n:"1",l:"Point of Contact. Always."},{n:"100%",l:"Operator-Minded"}].map((s,i)=>
          <R key={i} delay={i+1} className="stat-item"><div className="stat-value" style={{fontFamily:F.h,fontSize:"clamp(32px,5vw,42px)",fontWeight:700,color:C.teal,lineHeight:1}}>{s.n}</div><div className="stat-label" style={{fontFamily:F.b,fontSize:12.5,color:C.grayLight,marginTop:8}}>{s.l}</div></R>
        )}
      </div>
    </section>
    <section style={{position:"relative",overflow:"hidden",background:`linear-gradient(135deg,${C.dark} 0%,${C.tealDeep} 100%)`}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.green},transparent)`}}/>
      <div style={{position:"absolute",top:-100,right:-100,width:340,height:340,borderRadius:"50%",background:`radial-gradient(circle,${C.green}10,transparent 65%)`,pointerEvents:"none"}}/>
      <div className="m-pad wax-strip" style={{maxWidth:1200,margin:"0 auto",padding:"56px 32px",position:"relative",display:"grid",gridTemplateColumns:"auto 1fr auto",gap:40,alignItems:"center"}}>
        <R>
          <div>
            <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(0,212,85,.12)",border:"1px solid rgba(0,212,85,.3)",borderRadius:2,marginBottom:12}}>
              <span style={{fontFamily:F.b,fontSize:10.5,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.green}}>Wax Is Dead</span>
            </div>
            <h2 style={{fontFamily:F.h,fontSize:"clamp(26px,4vw,38px)",fontWeight:700,color:C.white,margin:0,lineHeight:1.1,letterSpacing:"-.01em",whiteSpace:"nowrap"}}>Ceramic Infused<br/><span style={{color:C.green,fontStyle:"italic"}}>Layering Technology</span></h2>
          </div>
        </R>
        <R delay={1}>
          <div style={{borderLeft:`2px solid ${C.green}`,paddingLeft:24}}>
            <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.7,margin:0,maxWidth:520}}>Blair's proprietary ceramic coatings bond molecularly to the finish in seconds. Every pass adds another layer. Graphene Oxide additives create a Nanoscratch Resistant surface that produces the shiniest, driest, most protected cars in the industry.</p>
            <div style={{display:"flex",gap:18,marginTop:18,flexWrap:"wrap"}}>
              {["Ceramic Shine","Quartz","Defender","GO"].map((t,i)=>(
                <div key={i} style={{fontFamily:F.b,fontSize:11,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.55)"}}>
                  <span style={{color:C.green,marginRight:6}}>◆</span>{t}
                </div>
              ))}
            </div>
          </div>
        </R>
        <R delay={2}>
          <button onClick={()=>setPage("Products")} style={{fontFamily:F.b,fontSize:13,fontWeight:600,padding:"14px 28px",background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2,boxShadow:`0 4px 20px ${C.green}33`,whiteSpace:"nowrap"}}>See the Line</button>
        </R>
      </div>
    </section>
    <section style={{background:C.offWhite}}>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
        <R>
          <div style={{position:"relative",borderRadius:6,overflow:"hidden",background:`linear-gradient(135deg,${C.dark} 0%,${C.tealDeep} 60%,${C.tealDark} 100%)`,border:`1px solid rgba(0,212,85,.12)`,boxShadow:"0 24px 60px rgba(9,30,39,.18)"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.green},${C.teal},${C.green})`}}/>
            <div className="m-pad m-stack" style={{position:"relative",padding:"56px 48px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
              <div style={{borderRadius:6,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,.3)"}}>
                <video autoPlay muted loop playsInline poster="/video/ceramic-reflection-poster.jpg" preload="metadata" style={{width:"100%",height:"auto",display:"block"}}><source src="/video/ceramic-reflection.mp4" type="video/mp4"/></video>
              </div>
              <div>
                <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(0,212,85,.12)",border:"1px solid rgba(0,212,85,.3)",borderRadius:2,marginBottom:18}}>
                  <span style={{fontFamily:F.b,fontSize:10.5,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.green}}>Mirror Finish</span>
                </div>
                <h3 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:C.white,margin:"0 0 6px",lineHeight:1.1}}>Nobody Else Produces<br/><span style={{color:C.green,fontStyle:"italic"}}>A Reflection This Clear</span></h3>
                <div style={{width:48,height:2,background:C.green,margin:"22px 0 22px"}}/>
                <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.75,margin:0}}>Real ceramic material plus graphene oxide. Every pass adds another layer of shine, hydrophobia, and protection from the debris that causes micro-scratches. The customer sees the difference the second they pull off the lot.</p>
              </div>
            </div>
          </div>
        </R>
      </div>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto",padding:"32px 32px 88px"}}>
        <R><div style={{textAlign:"center",marginBottom:56}}><Lbl>Why QC Atlantic</Lbl><h2 style={{fontFamily:F.h,fontSize:"clamp(26px,4vw,40px)",color:C.tealDeep,margin:0,fontWeight:700}}>Complete Control of Your Chemistry</h2></div></R>
        <div className="m-stack" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
          {[{ico:"dial",title:"Tailored Fit to Your Wash",desc:"Every car wash is different. We customize chemistry to your equipment, water quality, wash length, and dwell time. You get complete control over cleaning power, foam profile, and cost per car, all dialed independently."},{ico:"drop",title:"Cleaner. Drier. Shinier.",desc:"Every application we set up is designed with drying in mind. From dual pH presoaks that tackle both organic and inorganic soils to protectants that prep the surface for a spot-free finish, the whole system works together."},{ico:"shield",title:"Service Starts at the Sale",desc:"You deal with Winston directly. Not a call center, not a regional manager. When you have a problem at 6am on a Saturday, you get someone who has spent a decade solving those exact problems in backrooms across the country."}].map((c,i)=>
            <R key={i} delay={i+1}><div className="card-hover" style={{background:C.white,padding:"36px 32px",border:`1px solid rgba(27,110,138,.06)`,borderRadius:4,position:"relative",overflow:"hidden",height:"100%"}}><div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.teal},${C.green})`}}/><div style={{marginBottom:18}}><Ico type={c.ico}/></div><h3 style={{fontFamily:F.h,fontSize:20,fontWeight:700,color:C.tealDeep,margin:"0 0 10px"}}>{c.title}</h3><p style={{fontFamily:F.b,fontSize:14,color:C.gray,lineHeight:1.7,margin:0}}>{c.desc}</p></div></R>
          )}
        </div>
      </div>
    </section>
    <section style={{background:C.white}}>
      <div className="m-pad m-stack family-grid" style={{maxWidth:1100,margin:"0 auto",padding:"80px 32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
        <R><div>
          <Lbl>Who We Are</Lbl>
          <h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",color:C.tealDeep,margin:"0 0 20px",fontWeight:700}}>Family-Owned. Operator-Minded.</h2>
          <p style={{fontFamily:F.b,fontSize:15.5,color:C.gray,lineHeight:1.8,margin:"0 0 16px"}}>QC Atlantic was built by someone who spent a decade in car wash backrooms before ever sending an invoice. Winston started this business because operators kept getting chemistry that was close enough, not dialed in.</p>
          <p style={{fontFamily:F.b,fontSize:15.5,color:C.gray,lineHeight:1.8,margin:0}}>This is a family business in every sense. Winston built it from scratch, and the people closest to him have been part of it from day one.</p>
        </div></R>
        <R delay={1}><div style={{position:"relative"}}>
          <div style={{position:"absolute",top:-12,left:-12,right:12,bottom:12,background:C.offWhite,borderRadius:6,border:`1px solid rgba(27,110,138,.08)`,zIndex:0}}/>
          <img src="/photos/daughter.jpg" alt="Future chemist" style={{width:"100%",borderRadius:4,display:"block",position:"relative",zIndex:1,boxShadow:"0 8px 32px rgba(12,47,61,.12)"}}/>
          <div style={{position:"absolute",bottom:16,right:-8,zIndex:2,background:C.tealDeep,padding:"8px 14px",borderRadius:3,boxShadow:"0 4px 16px rgba(0,0,0,.2)"}}>
            <div style={{fontFamily:F.b,fontSize:11,fontWeight:600,color:C.green,letterSpacing:".1em",textTransform:"uppercase"}}>Blair Ceramics</div>
            <div style={{fontFamily:F.b,fontSize:10.5,color:"rgba(255,255,255,.5)"}}>SC Low pH, 5 gallons</div>
          </div>
        </div></R>
      </div>
    </section>
    <section className="gallery-section" style={{background:C.offWhite,padding:"80px 32px"}}>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto"}}>
        <R><div style={{textAlign:"center",marginBottom:44}}><Lbl>In the Field</Lbl><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",color:C.tealDeep,margin:0,fontWeight:700}}>Results You Can See</h2></div></R>
        <div className="gallery-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
          {[
            {src:"/photos/gallery-4.jpg",label:"Tesla Model Y, spot-free finish"},
            {src:"/photos/gallery-5.jpg",label:"Tundra, ceramic gloss after wash"},
            {src:"/photos/gallery-6.jpg",label:"Blair Ceramics precision dispensing system"},
            {src:"/photos/gallery-2.jpg",label:"You won't find a shinier car"},
          ].map((g,i)=>(
            <R key={i} delay={i<3?i+1:0}>
              <div className="card-hover gallery-card" style={{borderRadius:6,overflow:"hidden",position:"relative",background:C.dark}}>
                <img src={g.src} alt={g.label} style={{width:"100%",height:240,objectFit:"cover",display:"block",opacity:.92}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 16px 14px",background:"linear-gradient(0deg,rgba(9,30,39,.85),transparent)"}}>
                  <span style={{fontFamily:F.b,fontSize:12,color:"rgba(255,255,255,.8)",fontWeight:500}}>{g.label}</span>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
    <section className="before-after-section" style={{background:C.white,padding:"80px 32px"}}>
      <div className="m-pad" style={{maxWidth:900,margin:"0 auto"}}>
        <R><div style={{textAlign:"center",marginBottom:44}}><Lbl>Before & After</Lbl><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",color:C.tealDeep,margin:"0 0 10px",fontWeight:700}}>The Difference Chemistry Makes</h2><p style={{fontFamily:F.b,fontSize:14.5,color:C.gray,margin:0}}>Drag the slider to compare. Same car, same wash. Before and after a dialed-in chemistry program.</p></div></R>
        <R delay={1}><BeforeAfter/></R>
      </div>
    </section>
    <section className="home-cta" style={{position:"relative",overflow:"hidden",padding:"80px 32px",textAlign:"center"}}>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${C.tealDeep},${C.tealDark})`}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${C.green}06,transparent 70%)`,transform:"translate(-50%,-50%)"}}/>
      <R><div style={{position:"relative",zIndex:1}}>
        <h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",color:C.white,margin:"0 0 12px",fontWeight:700}}>Ready to own the car?</h2>
        <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.68)",margin:"0 0 32px"}}>Schedule a trial and we'll build a tailored fit chemistry program for your car wash. No contracts, no pressure. Just results.</p>
        <button onClick={()=>setPage("Contact")} style={{fontFamily:F.b,fontSize:14,fontWeight:600,padding:"15px 44px",background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2,boxShadow:`0 4px 20px ${C.green}33`}}>Get in Touch</button>
      </div></R>
    </section>
  </div>);
}

function BlairSpotlight(){
  const pillars=[
    {tag:"Ceramic Shine",sub:"Complete Body Shine & Protectant"},
    {tag:"Quartz",sub:"Complete Vehicle Protectant"},
    {tag:"Defender",sub:"Clear Coat Protectant"},
    {tag:"GO",sub:"Graphene Oxide Technology"},
  ];
  return(
    <R>
      <div style={{position:"relative",margin:"0 0 28px",borderRadius:6,overflow:"hidden",background:`linear-gradient(135deg,${C.dark} 0%,${C.tealDeep} 60%,${C.tealDark} 100%)`,border:`1px solid rgba(0,212,85,.12)`,boxShadow:"0 24px 60px rgba(9,30,39,.18)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.green},${C.teal},${C.green})`}}/>
        <div style={{position:"absolute",top:-120,right:-120,width:380,height:380,borderRadius:"50%",background:`radial-gradient(circle,${C.green}10,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-100,left:-100,width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${C.teal}22,transparent 70%)`,pointerEvents:"none"}}/>
        <div className="m-pad spotlight-grid" style={{position:"relative",padding:"56px 48px",display:"grid",gridTemplateColumns:"1.05fr .95fr",gap:48,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(0,212,85,.12)",border:"1px solid rgba(0,212,85,.3)",borderRadius:2,marginBottom:18}}>
              <span style={{fontFamily:F.b,fontSize:10.5,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.green}}>Wax Is Dead</span>
            </div>
            <h3 style={{fontFamily:F.h,fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:C.white,margin:"0 0 6px",lineHeight:1.1,letterSpacing:"-.01em"}}>Ceramic Infused<br/><span style={{color:C.green,fontStyle:"italic"}}>Layering Technology</span></h3>
            <div style={{width:48,height:2,background:C.green,margin:"22px 0 22px"}}/>
            <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.75,margin:"0 0 16px"}}>Traditional waxes are lackluster compared to Blair's ceramic coatings. The proprietary formulation creates a molecular bond to the finish within seconds of application, and every pass adds another layer.</p>
            <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.75,margin:"0 0 24px"}}>The newest formulations include a custom Graphene Oxide additive that contributes to a stronger, more flexible coating. The result is a Nanoscratch Resistant surface that produces the shiniest, driest, and most protected cars in the industry.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:8}}>
              {[
                {n:"Deeper",l:"glossier finish, layer over layer"},
                {n:"Drier",l:"hydrophobic in any weather"},
                {n:"Tougher",l:"UV and environmental defense"},
                {n:"Resistant",l:"nanoscratch surface protection"},
              ].map((b,i)=>(
                <div key={i} style={{borderLeft:`2px solid ${C.green}`,padding:"4px 0 4px 14px"}}>
                  <div style={{fontFamily:F.h,fontSize:18,fontWeight:700,color:C.white,lineHeight:1}}>{b.n}</div>
                  <div style={{fontFamily:F.b,fontSize:11.5,color:"rgba(255,255,255,.5)",marginTop:4,lineHeight:1.4}}>{b.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"relative"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {pillars.map((p,i)=>(
                <div key={i} style={{position:"relative",padding:"24px 18px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,212,85,.18)",borderRadius:4,backdropFilter:"blur(6px)",textAlign:"center",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.green},transparent)`}}/>
                  <div style={{fontFamily:F.h,fontSize:20,fontWeight:700,color:C.white,letterSpacing:".02em",lineHeight:1.1,marginBottom:8}}>{p.tag}</div>
                  <div style={{fontFamily:F.b,fontSize:10.5,color:"rgba(255,255,255,.55)",lineHeight:1.4,letterSpacing:".04em",textTransform:"uppercase",fontWeight:500}}>{p.sub}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:18,padding:"14px 18px",background:"rgba(0,212,85,.06)",border:"1px solid rgba(0,212,85,.2)",borderRadius:3,textAlign:"center"}}>
              <div style={{fontFamily:F.b,fontSize:11,fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:C.green}}>Superior Shine <span style={{color:"rgba(255,255,255,.3)",margin:"0 8px"}}>•</span> Superior Protection</div>
            </div>
          </div>
        </div>
      </div>
    </R>
  );
}

function ProductsPage({setPage}){
  const[vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),100)},[]);
  const blair=[
    {name:"Presoaks",tag:"Cleaning",desc:"Hi and Lo pH formulations that pull road film, grease, bugs, and mineral deposits off the surface. Touchless, friction, or self-serve, dialed to your water.",products:["Hi-pH Presoak","Lo-pH Presoak","Impact Detergent"]},
    {name:"Ceramic Protectants",tag:"Premium",desc:"The full Ceramic Infused Layering line. Quartz, Defender, Ceramic Shine, and the GO graphene oxide additive. Every pass adds another layer.",products:["Quartz Full Body Protectant","Defender Clear Coat","Ceramic Shine","Ceramic Gloss"]},
    {name:"Foam & Conditioning",tag:"The Big Show",desc:"High-foaming shampoos and tri-color conditioners that hit the visual the customer pays to see. Ceramic-infused options across the line.",products:["Ceramic Foaming Shampoo","Conditioning Shampoo"]},
    {name:"Drying & Finish",tag:"The Finish",desc:"Ram Dry pulls water off without streaking. Non-MSO. Every Blair application is built with the dry in mind from the start.",products:["Ram Dry Drying Agent","Slick X"]},
    {name:"Wheel, Tire & Specialty",tag:"Specialty",desc:"Nano-fortified tire dressing, Lo-pH wheel cleaners, underbody rust inhibitor, bug remover, and 8+ injection fragrances.",products:["Tire Dressing","Wheel Brightener","Underbody Rust Inhibitor","Don't Bug Me Remover","Injection Fragrances"]},
  ];
  const oasis=[
    {name:"Typhoon",tag:"High Volume",desc:"The fastest touchless automatic on the market. Up to 40 cars per hour with dual-bridge high-pressure turbo nozzles, intelligent vehicle scanning, and hydraulic gear drive.",products:["Dual-Step Presoak","Turbo Nozzles","XPert Monitoring","Buy-Up Technology"]},
    {name:"Eclipse",tag:"Unattended",desc:"Touchless automatic designed for 24/7 unattended operation. Wall-mounted frame and elevated carriage protect from strike damage. Open bay design. Eco-Wash package standard.",products:["Wall-Mounted Frame","Smart Dryer Integration","Eco-Wash Package","Remote Diagnostics"]},
    {name:"XP",tag:"Touchless",desc:"Single-bridge, two-arm touchless automatic. Reliable cleaning at a lower price point than the Typhoon. Same Oasis build quality and warranty.",products:["Single Bridge Design","Two-Arm System","Vehicle Scanning","XPert Monitoring"]},
    {name:"BayWash i5",tag:"Soft-Touch",desc:"Oasis took the Sonny's i5 platform and loaded it with upgrades. Top washes around 4:20 with ceramic. Multiple processes per pass. Best friction machine for in-bay automatic operators.",products:["Friction Wash System","Multi-Process Passes","Ceramic Compatible","Wheel Blasters"]},
    {name:"Self-Service & Drying",tag:"Support",desc:"JetStream self-service equipment. Adapt and GaleForce high-velocity drying systems that integrate with any Oasis automatic.",products:["JetStream Self-Service","Adapt Drying System","GaleForce Dryers"]},
  ];
  return(<div>
    <section style={{position:"relative",padding:"160px 32px 80px",textAlign:"center"}}><SBG/>
      <div className="m-pad m-txt" style={{maxWidth:700,margin:"0 auto",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all .6s"}}>
        <Lbl>Product Lines</Lbl>
        <h1 style={{fontFamily:F.h,fontSize:"clamp(30px,5vw,50px)",color:C.white,margin:"0 0 14px",fontWeight:700}}>Chemistry + Equipment</h1>
        <p style={{fontFamily:F.b,fontSize:16,color:"rgba(255,255,255,.68)",margin:0,lineHeight:1.6}}>Chemistry by Blair Ceramics. Equipment by Oasis Car Wash Systems. POS by DRB. Tank monitoring by Anova. Tailored fit programs built around your car wash by QC Atlantic.</p>
      </div>
    </section>
    <section style={{background:C.offWhite}}>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
        <R><div style={{marginBottom:44}}><Lbl>Chemistry</Lbl><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,34px)",color:C.tealDeep,margin:"0 0 10px",fontWeight:700}}>Blair Ceramics</h2><p style={{fontFamily:F.b,fontSize:14.5,color:C.gray,lineHeight:1.7,maxWidth:680,margin:0}}>Formulated by full-time staff chemists. Blair's exclusive Ceramic Infused Layering Technology bonds to the finish in seconds, building shine and protection with every pass through the tunnel.</p></div></R>
        <BlairSpotlight/>
        <R>
          <div style={{position:"relative",margin:"0 0 28px",borderRadius:6,overflow:"hidden",background:`linear-gradient(135deg,${C.dark} 0%,${C.tealDeep} 60%,${C.tealDark} 100%)`,border:`1px solid rgba(0,212,85,.12)`,boxShadow:"0 24px 60px rgba(9,30,39,.18)"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.green},${C.teal},${C.green})`}}/>
            <div className="m-pad m-stack" style={{position:"relative",padding:"56px 48px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
              <div style={{borderRadius:6,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,.3)"}}>
                <video autoPlay muted loop playsInline poster="/video/wax-is-dead-poster.jpg" preload="metadata" style={{width:"100%",height:"auto",display:"block"}}><source src="/video/wax-is-dead.mp4" type="video/mp4"/></video>
              </div>
              <div>
                <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(0,212,85,.12)",border:"1px solid rgba(0,212,85,.3)",borderRadius:2,marginBottom:18}}>
                  <span style={{fontFamily:F.b,fontSize:10.5,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.green}}>The Difference</span>
                </div>
                <h3 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:C.white,margin:"0 0 6px",lineHeight:1.1}}>Real Ceramic Material <span style={{color:C.green}}>+</span><br/><span style={{color:C.green,fontStyle:"italic"}}>Graphene Oxide</span></h3>
                <div style={{width:48,height:2,background:C.green,margin:"22px 0 22px"}}/>
                <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.75,margin:"0 0 24px"}}>Creates an extreme level of hydrophobia and shields paint from rocks, dust, and the debris that cause micro-scratches.</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {["Extreme Hydrophobia","Nanoscratch Resistant","Graphene Oxide"].map((t,i)=>(
                    <span key={i} style={{fontFamily:F.b,fontSize:11,fontWeight:600,padding:"8px 16px",background:"rgba(27,110,138,.2)",border:`1px solid ${C.teal}`,borderRadius:20,color:"rgba(255,255,255,.75)",letterSpacing:".04em"}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </R>
        <div className="m-stack" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:22}}>
          <R delay={1}><div style={{position:"relative"}}><LogoCard src="/blair-logo.png" alt="Blair Ceramics" desc="Superior Shine. Superior Protection." alt2={false}/></div></R>
          {blair.map((c,i)=><R key={i} delay={i<2?i+2:0}><PCard cat={c} alt={false}/></R>)}
        </div>
      </div>
    </section>
    <section style={{background:C.white}}>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
        <R><div style={{marginBottom:44}}><div style={{fontFamily:F.b,fontSize:11.5,letterSpacing:".2em",textTransform:"uppercase",color:C.teal,marginBottom:14,fontWeight:600}}>Equipment</div><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,34px)",color:C.tealDeep,margin:"0 0 10px",fontWeight:700}}>Oasis Car Wash Systems</h2><p style={{fontFamily:F.b,fontSize:14.5,color:C.gray,lineHeight:1.7,maxWidth:680,margin:0}}>Family-owned since 1964. From the Typhoon (fastest touchless on the market) to the BayWash i5, every unit comes with a 5-year warranty and XPert remote monitoring.</p></div></R>
        <div className="m-stack" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:22}}>
          <R delay={1}><div style={{position:"relative"}}><LogoCard src="/oasis-logo.png" alt="Oasis Car Wash Systems" desc="Family-owned since 1964." alt2={true}/></div></R>
          {oasis.map((c,i)=><R key={i} delay={i<2?i+2:0}><PCard cat={c} alt={true}/></R>)}
        </div>
      </div>
    </section>
    <section style={{background:C.offWhite}}>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
        <R><div style={{marginBottom:44}}><div style={{fontFamily:F.b,fontSize:11.5,letterSpacing:".2em",textTransform:"uppercase",color:C.teal,marginBottom:14,fontWeight:600}}>POS & Site Management</div><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,34px)",color:C.tealDeep,margin:"0 0 10px",fontWeight:700}}>DRB Systems</h2><p style={{fontFamily:F.b,fontSize:14.5,color:C.gray,lineHeight:1.7,maxWidth:680,margin:0}}>The leading car wash technology company. DRB powers point-of-sale, site management, loyalty, and fleet solutions across tunnel and in-bay operations of every size.</p></div></R>
        <div className="m-stack" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:22}}>
          <R delay={1}><div style={{position:"relative"}}><LogoCard src="/drb-logo.png" alt="DRB Systems" desc="Powering the car wash industry." alt2={false}/></div></R>
          {[
            {name:"Patheon",tag:"POS & Management",desc:"DRB's flagship cloud-based point-of-sale and site management platform. Real-time dashboards, multi-location control, and deep reporting built for operators running 1 site or 100.",products:["Cloud POS","Multi-Site Dashboard","Real-Time Reporting","Employee Management","Inventory Tracking"]},
            {name:"FastPass",tag:"Unlimited Wash",desc:"DRB's unlimited wash plan platform. Manages memberships, billing, and RFID or license plate recognition for frictionless entry. The industry standard for recurring revenue programs.",products:["Membership Billing","RFID & LPR Entry","Plan Management","Churn Reporting","Mobile App Ready"]},
            {name:"Suds",tag:"Fleet",desc:"Fleet account management built into the DRB ecosystem. Commercial fleet operators get a dedicated portal, volume pricing, and consolidated billing. No staff involvement required.",products:["Fleet Portal","Volume Pricing","Consolidated Billing","Vehicle Tracking","Self-Service Sign-Up"]},
            {name:"TunnelWatch",tag:"Tunnel Control",desc:"Real-time tunnel monitoring and control software. Tracks every vehicle through the tunnel, flags exceptions, and gives managers full visibility into throughput and uptime.",products:["Vehicle Tracking","Exception Alerts","Throughput Metrics","Camera Integration","Remote Access"]},
            {name:"Beacon",tag:"Marketing",desc:"DRB's customer engagement and marketing platform. Automated campaigns, win-back flows, and loyalty tools that keep members active and attract new customers.",products:["Automated Campaigns","Win-Back Flows","Loyalty Programs","Email & SMS","Performance Analytics"]},
          ].map((c,i)=><R key={i} delay={i<2?i+2:0}><PCard cat={c} alt={false}/></R>)}
        </div>
      </div>
    </section>
    <section style={{background:C.white}}>
      <div className="m-pad" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
        <R><div style={{marginBottom:44}}><div style={{fontFamily:F.b,fontSize:11.5,letterSpacing:".2em",textTransform:"uppercase",color:C.teal,marginBottom:14,fontWeight:600}}>Tank Monitoring</div><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,34px)",color:C.tealDeep,margin:"0 0 10px",fontWeight:700}}>Anova</h2><p style={{fontFamily:F.b,fontSize:14.5,color:C.gray,lineHeight:1.7,maxWidth:680,margin:0}}>Non-contact, time-of-flight radar level sensors paired with Anova's Universal Tank Monitor and the Anova Go Unify cloud platform. Tank percentage full from every site, on web and mobile.</p></div></R>
        <R>
          <div style={{position:"relative",margin:"0 0 28px",borderRadius:6,overflow:"hidden",background:`linear-gradient(135deg,${C.dark} 0%,${C.tealDeep} 60%,${C.tealDark} 100%)`,border:`1px solid rgba(0,212,85,.12)`,boxShadow:"0 24px 60px rgba(9,30,39,.18)"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.green},${C.teal},${C.green})`}}/>
            <div className="m-pad m-stack" style={{position:"relative",padding:"56px 48px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
              <div style={{display:"grid",gap:8,gridTemplateColumns:"1fr 1fr"}}>
                <div style={{gridColumn:"span 2",borderRadius:6,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,.3)"}}>
                  <img src="/photos/anova-tanks-top.jpg" alt="Anova radar level sensors mounted on Blair Ceramics dispensing tanks" style={{width:"100%",height:"auto",display:"block"}}/>
                </div>
                <div style={{borderRadius:6,overflow:"hidden",boxShadow:"0 12px 32px rgba(0,0,0,.25)",aspectRatio:"1/1"}}>
                  <img src="/photos/anova-tanks.jpg" alt="Front view of Blair Ceramics dispensing tanks with Anova sensors" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                </div>
                <div style={{borderRadius:6,overflow:"hidden",boxShadow:"0 12px 32px rgba(0,0,0,.25)",aspectRatio:"1/1"}}>
                  <img src="/photos/anova-sensor.jpg" alt="Close-up of an Anova radar level sensor" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                </div>
              </div>
              <div>
                <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(0,212,85,.12)",border:"1px solid rgba(0,212,85,.3)",borderRadius:2,marginBottom:18}}>
                  <span style={{fontFamily:F.b,fontSize:10.5,fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:C.green}}>Know Your Levels</span>
                </div>
                <h3 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:C.white,margin:"0 0 6px",lineHeight:1.1}}>Radar Sensors <span style={{color:C.green}}>+</span><br/><span style={{color:C.green,fontStyle:"italic"}}>Cloud Dashboard</span></h3>
                <div style={{width:48,height:2,background:C.green,margin:"22px 0 22px"}}/>
                <p style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.75,margin:"0 0 24px"}}>Time-of-flight radar reads the liquid surface from above and converts distance to tank percentage full at ±0.2-inch accuracy. The sensor wires to an Anova Universal Tank Monitor that supplies power and ships every reading to the cloud. We see what you see — so the next drop is scheduled before you run dry.</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {["Time-of-Flight Radar","±0.2\" Accuracy","Shared Visibility"].map((t,i)=>(
                    <span key={i} style={{fontFamily:F.b,fontSize:11,fontWeight:600,padding:"8px 16px",background:"rgba(27,110,138,.2)",border:`1px solid ${C.teal}`,borderRadius:20,color:"rgba(255,255,255,.75)",letterSpacing:".04em"}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </R>
        <div className="m-stack" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:22}}>
          <R delay={1}><div style={{position:"relative"}}><LogoCard src="/anova-logo.png" alt="Anova" desc="See every tank. From anywhere." alt2={true}/></div></R>
          {[
            {name:"Radar Level Sensor",tag:"Hardware",desc:"Non-contact, time-of-flight radar mounted on top of the tank. The SENS-4015 reads liquid level at ±0.2-inch accuracy from 4 inches to 10 feet, operates from -40°F to 140°F, and contains no batteries or moving parts to fail.",products:["Time-of-Flight Radar","±0.2\" Accuracy","4\" to 10' Range","-40°F to 140°F","Unpressurized Tanks"]},
            {name:"Universal Tank Monitor",tag:"Connectivity",desc:"The UTM powers the radar sensor and pushes every reading to the Anova cloud. Calibrated once at install to your tank's 0% and 100% points so the dashboard reads in percentage full, not raw distance.",products:["Powers the Sensor","Cloud Connected","Tank-Calibrated","30-Min Readings"]},
            {name:"Anova Go Unify",tag:"Software",desc:"Anova's web and mobile platform. Tank levels, usage trends, and days-of-supply forecasts for every tank at every site. Set custom low-level thresholds and route alerts to the right person before a pump runs dry.",products:["Real-Time Dashboard","Usage Trends","Custom Alerts","Multi-Site View","Mobile App"]},
            {name:"Proactive Service",tag:"QCA Workflow",desc:"Anova gives us the same visibility you have. When a tank trends toward empty, the next drop is scheduled before you ask. You stop tracking inventory by eyeball — we keep the chemistry flowing.",products:["Shared Visibility","Proactive Drops","No Stockouts","Predictable Cost"]},
          ].map((c,i)=><R key={i} delay={i<2?i+2:0}><PCard cat={c} alt={true}/></R>)}
        </div>
      </div>
    </section>
    <section style={{position:"relative",padding:"72px 32px",textAlign:"center",overflow:"hidden"}}><div style={{position:"absolute",inset:0,background:C.tealDeep}}/><R><div style={{position:"relative",zIndex:1}}><h2 style={{fontFamily:F.h,fontSize:"clamp(22px,3.5vw,32px)",color:C.white,margin:"0 0 10px",fontWeight:700}}>Need chemistry, equipment, or both?</h2><p style={{fontFamily:F.b,fontSize:14.5,color:"rgba(255,255,255,.68)",margin:"0 0 28px"}}>We'll visit your site, evaluate your setup, and build a program that covers everything from presoak to drying system.</p><button onClick={()=>setPage("Contact")} style={{fontFamily:F.b,fontSize:13,fontWeight:600,padding:"13px 36px",background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2}}>Request a Consultation</button></div></R></section>
  </div>);
}

function AboutPage({setPage}){
  const[vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),100)},[]);
  const tl=[
    {y:"2016",r:"Territory Manager",c:"Carolina Pride Carwash Systems",n:"Top Sales Rep and Top Growth Rep. Managed customer acquisition, deliveries, and chemical programs across the Charlotte territory."},
    {y:"2019",r:"Senior Account Manager",c:"Qual Chem LLC",n:"Built the Colorado territory from zero. Grew it 30%+ year over year working with top-tier operators."},
    {y:"2023",r:"Chemical Sales Manager",c:"AUTEC Car Wash Systems",n:"Managed chemical sales nationally for 2.5 years across car wash and in-bay configurations."},
    {y:"2026",r:"Founder & President",c:"QC Atlantic",n:"Chemistry. Not Soap. Serving operators across the Atlantic region from Clemmons, NC.",hl:true},
  ];
  return(<div>
    <section style={{position:"relative",padding:"160px 32px 80px",textAlign:"center"}}><SBG/>
      <div className="m-pad m-txt" style={{maxWidth:700,margin:"0 auto",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all .6s"}}>
        <Lbl>About QC Atlantic</Lbl>
        <h1 style={{fontFamily:F.h,fontSize:"clamp(30px,5vw,50px)",color:C.white,margin:"0 0 14px",fontWeight:700}}>Operator-Minded from Day One</h1>
        <p style={{fontFamily:F.b,fontSize:16,color:"rgba(255,255,255,.68)",margin:0,lineHeight:1.6}}>Winston Matney has spent his career inside car wash backrooms, diagnosing chemistry problems and helping operators produce the cleanest, driest, shiniest cars in their markets.</p>
      </div>
    </section>
    <section style={{background:C.white}}>
      <div className="m-pad" style={{maxWidth:780,margin:"0 auto",padding:"72px 32px"}}>
        <R><div style={{fontFamily:F.b,fontSize:16.5,color:C.gray,lineHeight:1.85}}>
          <p style={{margin:"0 0 22px"}}>QC Atlantic was founded in Clemmons, North Carolina by a car wash chemical veteran who kept running into the same problem: operators were getting chemistry that was close enough, but never truly dialed in.</p>
          <p style={{margin:"0 0 22px"}}>Winston spent a decade at Qual Chem, Carolina Pride, and AUTEC. He built territories from scratch, grew established markets 30%+ year over year, and earned Top Sales Rep and Top Growth Rep honors along the way. More importantly, he learned how different chemistry platforms perform across different equipment, water qualities, climates, and car wash configurations.</p>
          <p style={{margin:"0 0 22px"}}>That experience is what QC Atlantic runs on. When we build a chemistry program for your car wash, we're drawing on thousands of hours in car washes across the Southeast, the West, and Florida. We know what works in hard water and soft water, in 120-foot car washes and 60-foot express locations, during peak bug season and mild winters.</p>
          <p style={{margin:"0 0 22px"}}>You won't get handed off to a territory rep. Winston is your point of contact from trial through ongoing service. When a problem comes up, you talk to the person who can fix it.</p>
          <p style={{margin:0,fontFamily:F.h,fontSize:21,fontWeight:700,color:C.tealDeep,fontStyle:"italic"}}>Car wash chemistry backed by someone who has been in your backroom.</p>
        </div></R>
      </div>
    </section>
    <section style={{background:C.offWhite}}>
      <div className="m-pad" style={{maxWidth:780,margin:"0 auto",padding:"72px 32px"}}>
        <R><div style={{textAlign:"center",marginBottom:48}}><Lbl>Experience</Lbl><h2 style={{fontFamily:F.h,fontSize:"clamp(24px,3.5vw,32px)",fontWeight:700,color:C.tealDeep,margin:0}}>10 Years Across the Industry</h2></div></R>
        <div style={{position:"relative"}}>
          <div className="hide-m" style={{position:"absolute",left:59,top:0,bottom:0,width:2,background:`linear-gradient(180deg,${C.teal}33,${C.green}66,${C.green})`}}/>
          {tl.map((t,i)=><R key={i}><div style={{display:"flex",gap:"clamp(12px,3vw,28px)",marginBottom:i<tl.length-1?28:0,alignItems:"flex-start"}}>
            <div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:t.hl?C.green:C.grayLight,minWidth:44,textAlign:"right",paddingTop:14}}>{t.y}</div>
            <div className="hide-m" style={{width:14,height:14,borderRadius:"50%",background:t.hl?C.green:C.teal,border:`3px solid ${C.offWhite}`,marginTop:16,flexShrink:0,position:"relative",zIndex:1,boxShadow:t.hl?`0 0 0 4px ${C.green}33`:"none"}}/>
            <div style={{background:C.white,padding:"14px 20px",border:t.hl?`2px solid ${C.green}44`:`1px solid rgba(27,110,138,.06)`,borderRadius:4,flex:1}}>
              <div style={{fontFamily:F.h,fontSize:16,fontWeight:700,color:C.tealDeep,marginBottom:2}}>{t.r}</div>
              <div style={{fontFamily:F.b,fontSize:13.5,fontWeight:600,color:C.teal,marginBottom:5}}>{t.c}</div>
              <div style={{fontFamily:F.b,fontSize:12.5,color:C.grayLight,lineHeight:1.5}}>{t.n}</div>
            </div>
          </div></R>)}
        </div>
      </div>
    </section>
    <section style={{position:"relative",padding:"64px 32px",textAlign:"center",overflow:"hidden"}}><div style={{position:"absolute",inset:0,background:C.tealDeep}}/><R><div style={{position:"relative",zIndex:1}}><h2 style={{fontFamily:F.h,fontSize:30,color:C.white,margin:"0 0 28px",fontWeight:700}}>Let's talk about your wash.</h2><button onClick={()=>setPage("Contact")} style={{fontFamily:F.b,fontSize:13,fontWeight:600,padding:"13px 36px",background:C.green,color:C.dark,border:"none",cursor:"pointer",letterSpacing:".04em",textTransform:"uppercase",borderRadius:2}}>Get in Touch</button></div></R></section>
  </div>);
}

function ContactPage(){
  const[vis,setVis]=useState(false);
  const[form,setForm]=useState({name:"",email:"",phone:"",type:"",washes:"",message:""});
  const[submitted,setSubmitted]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),100)},[]);
  const go=()=>{if(form.name&&form.email)setSubmitted(true)};
  const inp={fontFamily:F.b,fontSize:15,padding:"13px 15px",border:`1px solid rgba(27,110,138,.12)`,borderRadius:3,background:C.white,color:C.tealDeep,width:"100%",boxSizing:"border-box",outline:"none",transition:"border-color .2s"};
  const lbl={fontFamily:F.b,fontSize:11.5,fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",color:C.teal,marginBottom:6,display:"block"};
  return(<div>
    <section style={{position:"relative",padding:"160px 32px 80px",textAlign:"center"}}><SBG/>
      <div className="m-pad m-txt" style={{maxWidth:700,margin:"0 auto",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all .6s"}}>
        <Lbl>Get Started</Lbl>
        <h1 style={{fontFamily:F.h,fontSize:"clamp(30px,5vw,50px)",color:C.white,margin:"0 0 14px",fontWeight:700}}>Let's Talk Chemistry</h1>
        <p style={{fontFamily:F.b,fontSize:16,color:"rgba(255,255,255,.68)",margin:0,lineHeight:1.6}}>Whether you run 1 car wash or 20 locations, we'll build a chemical program around your operation.</p>
      </div>
    </section>
    <section style={{background:C.offWhite}}>
      <div className="m-pad m-stack" style={{maxWidth:900,margin:"0 auto",padding:"72px 32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
        <R><div>{submitted?
          <div style={{padding:44,background:C.white,border:`2px solid ${C.green}44`,borderRadius:4,textAlign:"center"}}><div style={{fontSize:44,marginBottom:14,color:C.green}}>✓</div><h3 style={{fontFamily:F.h,fontSize:23,color:C.tealDeep,margin:"0 0 8px"}}>Message Received</h3><p style={{fontFamily:F.b,fontSize:14.5,color:C.gray,margin:0}}>Winston will be in touch within 24 hours.</p></div>
          :<div style={{display:"flex",flexDirection:"column",gap:18}}>
            <div><label style={lbl}>Name *</label><input style={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(27,110,138,.12)"}/></div>
            <div><label style={lbl}>Email *</label><input style={inp} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@company.com" onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(27,110,138,.12)"}/></div>
            <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(000) 000-0000" onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(27,110,138,.12)"}/></div>
            <div><label style={lbl}>I am a...</label><select style={{...inp,cursor:"pointer"}} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="">Select one</option><option value="operator">Car Wash Operator</option><option value="distributor">Distributor</option><option value="investor">Investor / Multi-Site Owner</option><option value="other">Other</option></select></div>
            <div><label style={lbl}>Wash Locations</label><input style={inp} value={form.washes} onChange={e=>setForm({...form,washes:e.target.value})} placeholder="e.g. 3" onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(27,110,138,.12)"}/></div>
            <div><label style={lbl}>Message</label><textarea style={{...inp,minHeight:90,resize:"vertical"}} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your wash." onFocus={e=>e.target.style.borderColor=C.teal} onBlur={e=>e.target.style.borderColor="rgba(27,110,138,.12)"}/></div>
            <button type="button" disabled={!form.name||!form.email} onClick={go} style={{fontFamily:F.b,fontSize:14.5,fontWeight:600,padding:"15px 0",background:form.name&&form.email?C.green:C.grayLight,color:C.dark,border:"none",borderRadius:2,cursor:form.name&&form.email?"pointer":"not-allowed",letterSpacing:".04em",textTransform:"uppercase",width:"100%",transition:"all .2s"}}>Send Message</button>
          </div>
        }</div></R>
        <R delay={1}><div>
          <div style={{background:C.white,padding:32,border:`1px solid rgba(27,110,138,.06)`,borderRadius:4,marginBottom:20}}>
            <h3 style={{fontFamily:F.h,fontSize:21,fontWeight:700,color:C.tealDeep,margin:"0 0 22px"}}>Direct Contact</h3>
            {[{l:"Winston Matney",v:"President, Owner"},{l:"Phone",v:"(336) 909-8321"},{l:"Email",v:"wmatney@qcatlantic.com"},{l:"Location",v:"Clemmons, North Carolina"}].map((x,i)=>
              <div key={i} style={{marginBottom:i<3?16:0}}><div style={{fontFamily:F.b,fontSize:10.5,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:C.grayLight,marginBottom:2}}>{x.l}</div><div style={{fontFamily:F.b,fontSize:15.5,color:C.tealDeep,fontWeight:500}}>{x.v}</div></div>
            )}
          </div>
          <div style={{background:`linear-gradient(135deg,${C.tealDeep},${C.tealDark})`,padding:28,borderRadius:4}}>
            <h4 style={{fontFamily:F.h,fontSize:17,fontWeight:700,color:C.white,margin:"0 0 12px"}}>Follow QC Atlantic</h4>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <a href="https://www.linkedin.com/company/quality-car-atlantic/about/" target="_blank" rel="noopener" style={{fontFamily:F.b,fontSize:13.5,color:C.green,textDecoration:"none"}}>LinkedIn →</a>
              <a href="https://www.facebook.com/profile.php?id=61575448862175" target="_blank" rel="noopener" style={{fontFamily:F.b,fontSize:13.5,color:C.green,textDecoration:"none"}}>Facebook →</a>
            </div>
          </div>
        </div></R>
      </div>
    </section>
  </div>);
}

function Footer(){
  return(<footer style={{background:C.dark,padding:"44px 24px 28px",borderTop:`1px solid rgba(0,212,85,.06)`}}>
    <div className="m-pad footer-inner" style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Logo size={26} dark/><span style={{fontFamily:F.h,fontSize:15,fontWeight:700,color:C.white}}>QC Atlantic</span></div>
      <div style={{fontFamily:F.b,fontSize:12.5,color:"rgba(255,255,255,.5)"}}>© 2026 Quality Car Atlantic. Clemmons, NC. · <a href="/privacy/" style={{color:"rgba(255,255,255,.65)",textDecoration:"none"}}>Privacy Policy</a> · <a href="https://tmncreative.com" target="_blank" rel="noopener" style={{color:"rgba(255,255,255,.42)",textDecoration:"none",fontSize:11}}>Site by TMN Creative</a></div>
      <div style={{fontFamily:F.h,fontSize:14,fontWeight:700,color:C.green,fontStyle:"italic"}}>Chemistry. Not Soap.</div>
    </div>
  </footer>);
}

export default function App(){
  const[currentPage,setCurrentPage]=useState("Home");
  const setPage=p=>{document.documentElement.scrollTop=0;document.body.scrollTop=0;setCurrentPage(p)};
  const pg=()=>{switch(currentPage){
    case"Home":return<HomePage setPage={setPage}/>;
    case"Products":return<ProductsPage setPage={setPage}/>;
    case"About":return<AboutPage setPage={setPage}/>;
    case"Contact":return<ContactPage/>;
    case"Pay":return<PaymentPage/>;
    default:return<HomePage setPage={setPage}/>;
  }};
  return(<div style={{minHeight:"100vh",background:C.offWhite}}>
    <style>{GCSS}</style>
    <Nav currentPage={currentPage} setPage={setPage}/>
    {pg()}
    <Footer/>
  </div>);
}
