var Ie=Object.defineProperty,je=Object.defineProperties;var Me=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var le=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable;var ce=(t,i,s)=>i in t?Ie(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s,f=(t,i)=>{for(var s in i||(i={}))le.call(i,s)&&ce(t,s,i[s]);if(H)for(var s of H(i))de.call(i,s)&&ce(t,s,i[s]);return t},x=(t,i)=>je(t,Me(i));var V=(t,i)=>{var s={};for(var a in t)le.call(t,a)&&i.indexOf(a)<0&&(s[a]=t[a]);if(t!=null&&H)for(var a of H(t))i.indexOf(a)<0&&de.call(t,a)&&(s[a]=t[a]);return s};import{r as p,a as G,j as e,t as L,s as r,C as w,p as Ue,b as n,A as Le,c as Qe,U as Re,W as De,i as me,d as pe,e as Q,L as Y,V as ge,f as Xe,F as he,B as He,g as q,G as Ve,h as Pe,k as Ke,l as Oe,m as $,n as _e,o as ue,S as fe,R,q as P,u as Je,T as We,v as Ze,w as Ge}from"./vendor.3f6661ed.js";const Ye=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))a(d);new MutationObserver(d=>{for(const c of d)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function s(d){const c={};return d.integrity&&(c.integrity=d.integrity),d.referrerpolicy&&(c.referrerPolicy=d.referrerpolicy),d.crossorigin==="use-credentials"?c.credentials="include":d.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(d){if(d.ep)return;d.ep=!0;const c=s(d);fetch(d.href,c)}};Ye();function N(){return p.exports.useContext(xe)}function y(t){const[i,s]=p.exports.useState(t||!1);function a(){s(!0)}function d(){s(!1)}return{setState:s,state:i,changeToTrue:a,changeToFalse:d}}function K(){return p.exports.useContext(be)}function D(t){return t.replace(/^(\w{3}).*(\w{3})$/,"$1...$2")}const l={background:{},colors:{primary_0:"#60b2ff",secondary_50:"#2697FF",tertiary_100:"#062043",quartenary_75:"#0C3A6A",gray_blue:"#51779A"},fonts:{primary:"#fff"},global:{input:"#0A3876",red_0:"#ef5858",white_0:"#fff",yellow_0:"#eed202",black_0:"#101010"},gradients:{button:"linear-gradient(180deg, #003872 0%, #1470BD 100%)"}},qe={orbitron:"Orbitron"},$e={register:t=>v.post("/players",t),getPlayer:()=>v.get("/authentication"),authenticate:{app_login:t=>v.post("/authentication",t)}};var et=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",geral:$e});const tt={getShips:()=>v.get("/ships"),addMonkeynautToShip:t=>v.post(`/ships/${t.params.ship_id}/monkeynauts`,t.body),deleteMonkeynautFromShip:t=>v.delete(`/ships/${t.params.ship_id}/monkeynauts/${t.params.monkeynaut_id}`),getUnique:t=>v.get(`/ships/${t.path.ship_id}`)};var it=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",geral:tt});const nt={getMonkeynauts:()=>v.get("/monkeynauts")};var rt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",geral:nt});const O="@monkeynauts:token@",v=G.create({baseURL:"https://api.themonkeynauts.com/api/"}),E={user:et,ships:it,monkeynauts:rt},xe=p.exports.createContext({});function at({children:t}){const[i,s]=p.exports.useState(null),[a,d]=p.exports.useState(sessionStorage.getItem(O)),c=y(!0),m=y(!0);function h(){c.changeToFalse(),m.changeToFalse(),d(null),sessionStorage.removeItem(O),v.defaults.headers.common.Authorization=""}async function o(){try{const u=await E.user.geral.getPlayer();let{user:A}=u.data;s({user:x(f({},A),{id_short:A.id.replace(/^(\w{3}).*(\w{3})$/,"$1...$2")})}),m.changeToFalse(),c.changeToTrue()}catch{return h()}}p.exports.useEffect(()=>{if(!a)return h();v.defaults.headers.common.Authorization=`Bearer ${a}`,o()},[]);async function g(u){const A=await E.user.geral.authenticate.app_login(u),{token:k}=A.data;return v.defaults.headers.common.Authorization=`Bearer ${k}`,sessionStorage.setItem(O,k),c.changeToTrue(),d(k),o(),L("Success. You have accessed your account. Welcome back!",{autoClose:5e3,pauseOnHover:!0,type:"success",style:{background:l.global.white_0,color:l.global.black_0,fontSize:14,fontFamily:"Orbitron, sans-serif"}}),A.data||void 0}async function B(u){const A=await E.user.geral.register(u),{player:k,token:C}=A.data;return sessionStorage.setItem(O,C),v.defaults.headers.common.Authorization=`Bearer ${C}`,c.changeToTrue(),d(C),s({user:x(f({},k),{id_short:D(k.id)})}),L("Success! You managed to create your account. Welcome!",{autoClose:5e3,pauseOnHover:!0,type:"success",style:{background:l.global.white_0,color:l.global.black_0,fontSize:14,fontFamily:"Orbitron, sans-serif"}}),A.data||void 0}return e(xe.Provider,{value:{signIn:g,register:B,signOut:h,token:a,tokenIsValid:c.state,loading:m.state,user:i},children:t})}const be=p.exports.createContext({});function ot({children:t}){const[i,s]=p.exports.useState({}),[a,d]=p.exports.useState({});return e(be.Provider,{value:{ship:i,setShip:s,monkeynaut:a,setMonkeynaut:d},children:t})}const st=r.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .input_text {
    margin-bottom: 1.2rem;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: 0;
    text-align: left;

    color: #60B2FF;
  }

  ${t=>t.isError&&w`
    .input_error {
      color: ${l.global.red_0};
      margin-top: 0.6rem;
      font-size: 1rem;
    }
  `};
`,lt=r.div`
  background: ${l.colors.tertiary_100};
  border: 1px solid ${l.colors.gray_blue};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.1rem;

  width: 100%;

  ${t=>t.isFocused&&w`
    border: 1px solid ${l.colors.secondary_50};
  `};

  ${t=>t.isError&&w`
    border: 1px solid ${l.global.red_0};
  `};

  input {
    background: ${l.colors.tertiary_100};
    padding: 1.4rem;
    width: 100%;
    letter-spacing: 1px;
    color: ${l.fonts.primary};
    caret-color: ${l.fonts.primary};

    &::placeholder {
      color: ${l.global.input};
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${l.colors.tertiary_100} inset;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${l.fonts.primary} !important;
    }
  }

  button.change_visible_password {
    padding: 0 1.6rem;
    display: flex;
    align-items: center;

    svg {
      width: 2.2rem;
      height: 2.2rem;
      color: #14A8FC;
    }
  }
`;function X(c){var m=c,{type:t,name:i,labelText:s,containerProps:a}=m,d=V(m,["type","name","labelText","containerProps"]);const h=p.exports.useRef(null),{fieldName:o,defaultValue:g,registerField:B,error:u,clearError:A}=Ue(i),k=y(!1),C=y(!1);function oe(){C.changeToTrue(),u&&A()}function se(T){T?k.changeToTrue():k.changeToFalse(),oe()}return p.exports.useEffect(()=>{B({name:o,ref:h,getValue:T=>T.current.value,setValue:(T,Ee)=>{T.current.value=Ee},clearValue:T=>{T.current.value=""}})},[o,B]),n(st,x(f({},a),{isError:!!u,children:[e("span",{className:"input_text",children:s}),n(lt,{isFocused:C.state,isError:!!u,onClick:()=>C.changeToTrue(),children:[e("input",f({type:t==="password"&&k.state?"text":t,name:i,ref:h,defaultValue:g,onFocus:oe,onBlur:()=>C.changeToFalse()},d)),t==="password"&&(k.state?e("button",{title:"Hide password",type:"button",onClick:()=>se(!1),className:"change_visible_password",children:e(Le,{})}):e("button",{title:"Show password",type:"button",onClick:()=>se(!0),className:"change_visible_password",children:e(Qe,{})}))]}),e("span",{className:"input_error",children:u})]}))}var dt="/assets/button_background_1.73b5aca5.svg";const ct=r.button`
  background: url(${dt}) no-repeat center;
  background-size: contain;

  padding: 1.6rem;
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  line-height: 1.5rem;
  letter-spacing: 0.035em;
  text-align: center;

  ${t=>t.isLoading&&w`
    cursor: no-drop;
    opacity: 0.6;
  `};
`;function Ae(a){var d=a,{text:t,loading:i}=d,s=V(d,["text","loading"]);return e(ct,x(f({isLoading:i==null?void 0:i.state,type:"button",disabled:i==null?void 0:i.state},s),{children:i&&i.state?e(_,{size:i.size}):t}))}const mt=r.div`
  width: ${({size:t})=>`${t||1.4}rem`};
  height: ${({size:t})=>`${t||1.4}rem`};
`,pt=Re`
  from {
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg);
  }
`,gt=r.svg`
  width: 100%;
  height: 100%;
  
	border-radius: 50%;

	border: solid 4px ${l.global.white_0};
	border-right-color: transparent;
	border-bottom-color: transparent;

  transition: all 0.5s ease-in;
  animation: ${pt} 1s linear infinite;
`;function _(s){var a=s,{type:t="circle"}=a,i=V(a,["type"]);const d={circle:e(gt,f({},i))};return e(mt,x(f({},i),{children:d[t]}))}var ht="data:image/png;base64,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";const ut=De`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${qe.orbitron}, sans-serif;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  :root {
    font-size: 62.5%;
  }

  input {
    border: none;
    outline: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  body, html, #root {
    min-height: 100vh;
    width: 100%;

    background: #010101;
  }

  h1, h2, h3, h4, h5, h6, a, p, span, label, button {
    color: ${l.fonts.primary};
  }

  @media(min-width: 280px) and (max-width: 1399px) {
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: bold;
    }

    p, span, a, label {
      font-size: 1.2rem;
    }
  }
  
  @media(min-width: 1400px) {
    h1 {
      font-size: 2.4rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: bold;
    }

    h3 {
      font-size: 1.4rem;
      font-weight: bold;
    }

    p, span, a, label {
      font-size: 1.4rem;
    }
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background: #555;
  }

  ::-webkit-scrollbar-thumb {
    background: #298df1;
  }
`,ft=r.div`
  height: 100%;

  ${t=>t.isLoading&&w`
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100vh;
  `};
`,J=r.h1`
  display: block;
    
  width: 100%;
  
  padding: 0.8rem;
  
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 0;

  background: url(${ht}) no-repeat center;
  background-size: contain;
`;function we(t){const i={};return t.inner.forEach(s=>{i[String(s.path)]=s.message}),i}function ee(t,i){return i[t.toLowerCase()]}function b(t){return t[0].toUpperCase()+t.substring(1).toLowerCase()}var ye="/assets/logo.2bbcb4f8.png",te="/assets/background_1.0b131352.png",ve="/assets/panel_character_attribute_1.302a8e7d.png",ke="/assets/panel_character_attribute_2.a15925e8.png",Ce="/assets/panel_character_attribute_3.01325886.png";const xt=r.div`
  background: url(${te}) no-repeat center;
  background-size: cover;
  padding: 2.4rem 0;

  height: 100vh;
`,bt=r.div`
  padding: 0 1.4rem;
  margin: 0 1.4rem;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${ve}) no-repeat center center;

  @media(min-width: 960px) {
    background: url(${ke}) no-repeat center center;
  }

  @media(min-width: 1300px) {
    background: url(${Ce}) no-repeat center center;
  }
`,At=r.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .app_logo {
    display: none;
    width: 24rem;
    margin-top: 6.4rem;
  }

  @media(min-width: 960px) {
    flex-direction: row;
    gap: 14rem;

    margin-bottom: 7.2rem;

    .app_logo {
      display: block;
      width: initial;
      margin-top: 9.2rem;
    }
  }
`,wt=r(me)`
  .page_title {
    line-height: 3rem;
    
    text-align: center;
    margin-top: 3.8rem;

    color: ${l.colors.primary_0};
    text-shadow: 0 0 1.2rem ${l.colors.primary_0};
  }

  .inputs {
    margin-top: 2.4rem;

    label:not(:first-child) {
      margin-top: 2.4rem;
    }
  }

  .button_submit {
    margin: 2.4rem 0;
  }

  footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    .to_login, a {
      font-weight: 400;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
    }

    .to_login {
      text-align: center;

      a {
        margin-left: 0.6rem;
        color: ${l.colors.primary_0};

        border-bottom: 1px solid transparent;

        &:hover {
          border-bottom: 1px solid ${l.colors.primary_0};
        }
      }
    }

    .forgot_password {
      margin-top: 1.6rem;
    }

    .app_name {
      margin: 2.8rem 0 3.8rem;

      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;

      color: ${l.colors.primary_0};

    }
  }

  @media(min-width: 960px) {
    .page_title {
      margin-bottom: 6.4rem;
    }
  }

  @media(min-width: 960px) {
    footer {
      .app_name {
        display: none;
      }
    }
  }
`,yt=pe().shape({email:Q().required("This field is required").email("Enter a valid email address"),password:Q().required("This field is required")});function Be(){const{signIn:t}=N(),i=p.exports.useRef(null),s=y(!1);async function a(d){var c,m,h;s.changeToTrue();try{(c=i.current)==null||c.setErrors({}),await yt.validate(d,{abortEarly:!1}),await t(d)}catch(o){if(s.changeToFalse(),o instanceof ge){const g=we(o);return(m=i.current)==null?void 0:m.setErrors(g)}if(G.isAxiosError(o)){const g=(h=o==null?void 0:o.response)==null?void 0:h.headers["grpc-message"];L(g,{autoClose:5e3,pauseOnHover:!0,type:"error",style:{background:l.global.white_0,color:l.global.black_0,fontSize:14,fontFamily:"Orbitron, sans-serif"}})}}}return e(xt,{children:e(bt,{children:n(At,{children:[e("img",{src:ye,alt:"App Logo",className:"app_logo"}),n(wt,{ref:i,onSubmit:a,children:[e("h1",{className:"page_title",children:"Login"}),n("div",{className:"inputs",children:[e(X,{name:"email",labelText:"E-mail",placeholder:"E-mail...",type:"text"}),e(X,{name:"password",labelText:"Password",placeholder:"Password...",type:"password"})]}),e(Ae,{className:"button_submit",type:"submit",text:"Login",loading:{state:s.state}}),n("footer",{children:[n("span",{className:"to_login",children:["Don't have an account?",e(Y,{to:"/register",children:"Sign up"})]}),e("span",{className:"forgot_password",children:e(Y,{to:"/forgot",children:"Forgot Password"})}),e("span",{className:"app_name",children:"The Monkeynauts"})]})]})]})})})}const vt=r.div`
  background: url(${te}) no-repeat center;
  background-size: cover;
  padding: 2.4rem 0;

  height: 100vh;
`,kt=r.div`
  padding: 0 1.4rem;
  margin: 0 1.4rem;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${ve}) no-repeat center center;

  @media(min-width: 960px) {
    background: url(${ke}) no-repeat center center;
  }

  @media(min-width: 1300px) {
    background: url(${Ce}) no-repeat center center;
  }
`,Ct=r.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .app_logo {
    display: none;
    width: 24rem;
    margin-top: 6.4rem;
  }

  @media(min-width: 960px) {
    flex-direction: row;
    gap: 14rem;

    margin-bottom: 7.2rem;

    .app_logo {
      display: block;
      width: initial;
      margin-top: 9.2rem;
    }
  }
`,Bt=r(me)`
  .page_title {
    line-height: 3rem;
    
    text-align: center;
    margin-top: 3.8rem;

    color: ${l.colors.primary_0};
    text-shadow: 0 0 1.2rem ${l.colors.primary_0};
  }

  .inputs {
    margin-top: 2.4rem;

    label:not(:first-child) {
      margin-top: 2.4rem;
    }
  }

  .button_submit {
    margin: 2.4rem 0;
  }

  footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    .to_login, a {
      font-weight: 400;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
    }

    .to_login {
      text-align: center;

      a {
        margin-left: 0.6rem;
        color: ${l.colors.primary_0};

        border-bottom: 1px solid transparent;

        &:hover {
          border-bottom: 1px solid ${l.colors.primary_0};
        }
      }
    }

    .app_name {
      margin: 2.8rem 0 3.8rem;

      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;

      color: ${l.colors.primary_0};

    }
  }

  @media(min-width: 960px) {
    .page_title {
      margin-bottom: 6.4rem;
    }
  }

  @media(min-width: 960px) {
    footer {
      .app_name {
        display: none;
      }
    }
  }
`;function Tt(){const{register:t}=N(),i=p.exports.useRef(null),s=y(!1);async function a(d){var c,m,h;s.changeToTrue();try{(c=i.current)==null||c.setErrors({}),await pe().shape({nickname:Q().required("This field is required"),email:Q().required("This field is required").email("Enter a valid email address"),password:Q().required("This field is required")}).validate(d,{abortEarly:!1}),await t(d)}catch(o){if(s.changeToFalse(),o instanceof ge){const g=we(o);return(m=i.current)==null?void 0:m.setErrors(g)}if(G.isAxiosError(o)){const g=(h=o==null?void 0:o.response)==null?void 0:h.headers["grpc-message"];L(g,{autoClose:5e3,pauseOnHover:!0,type:"error",style:{background:l.global.white_0,color:l.global.black_0,fontSize:14,fontFamily:"Orbitron, sans-serif"}})}}}return e(vt,{children:e(kt,{children:n(Ct,{children:[e("img",{src:ye,alt:"App Logo",className:"app_logo"}),n(Bt,{ref:i,onSubmit:a,children:[e("h1",{className:"page_title",children:"Sign up"}),n("div",{className:"inputs",children:[e(X,{name:"nickname",labelText:"Nickname",placeholder:"Nickname...",type:"text"}),e(X,{name:"email",labelText:"E-mail",placeholder:"E-mail...",type:"text"}),e(X,{name:"password",labelText:"Password",placeholder:"Password...",type:"password"})]}),e(Ae,{className:"button_submit",type:"submit",text:"Sign up",loading:{state:s.state}}),n("footer",{children:[n("span",{className:"to_login",children:["Already have an account?",e(Y,{to:"/login",children:"Login"})]}),e("span",{className:"app_name",children:"The Monkeynauts"})]})]})]})})})}const Nt=r.div`
  display: none;

  ${t=>t.isClosed&&w`
    display: block;
  `};

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  padding: 7.2rem 3.2rem 0;

  .close_menu {
    position: absolute;
    top: 4.2rem;
    right: 1.2rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;
      
      color: ${l.colors.primary_0}
    }
  }

 
  @media(min-width: 768px) {
    .close_menu {
      position: absolute;
      top: 4.2rem;
      right: 4.2rem;
    }
  }

  @media(min-width: 1400px) {
    display: inline-block;

    position: initial;

    padding: 0;
    margin-top: 3.2rem;

    .close_menu {
      display: none;
    }
  }
`,zt=r.div`
  display: flex;
  flex-direction: column;

  margin-top: 6.4rem;

  .signout {
    display: flex;
    span {
      font-size: 18px;
      font-weight: 700;
      line-height: 2.3rem;
      letter-spacing: 0.035em;
      text-align: left;
      border-bottom: 2px solid transparent;
      margin: 16px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }

  @media(min-width: 1400px) {
    max-width: 85%;
    flex-direction: row;
    margin: 0 auto;

    .signout {
      display: none;
    }
  }
`,Ft=r.button`
  display: flex;

  @media(min-width: 1400px) {
    max-width: max-content;
    border: 1px solid #1F8EFF;

    background: linear-gradient(180deg, #071D46 0%, #144B97 100%);

    ${t=>t.selected&&w`
      background: linear-gradient(180deg, #0267C9 0%, #023886 100%);
    `};

      &:not(:first-child) {
        margin-left: 4px;
      }
    }
`,St=r.span`
  font-size: 18px;
  font-weight: 700;
  line-height: 2.3rem;
  letter-spacing: 0.035em;
  text-align: left;

  border-bottom: 2px solid transparent;

  margin-bottom: 16px;

  ${t=>t.selected&&w`
    border-bottom: 2px solid ${l.colors.primary_0};
  `};

  @media(min-width: 1400px) {
    display: inline-block; 

    margin-bottom: 0;

    padding: 1rem 4.8rem;

    text-transform: uppercase;
    font-size: 1.6rem;
    letter-spacing: 0;    
    white-space: nowrap;

    ${t=>t.selected&&w`
      border-bottom: none;
    `};
  }
`;function Et({menu:t,children:i,changeSelected:s,selectedTab:a}){const{signOut:d}=N();return n(Nt,{isClosed:t.state,children:[e("button",{onClick:t.changeToFalse,className:"close_menu",title:"Fechar menu",children:e(Xe,{})}),n(zt,{children:[Array.isArray(i)&&i.map((c,m)=>e(Ft,{selected:m===a,children:e(St,{onClick:()=>s(m),selected:m===a,className:"tab_title",children:c.props.title})},m)),e("button",{className:"signout",onClick:d,children:n("span",{children:[e(he,{})," Signout"]})})]})]})}const It=r.div`
  display: flex;
  justify-content: center;

  position: relative;

  width: 100%;

  padding-top: 4.2rem;

  ${t=>t.isShow&&w`
    display: none;
  `}

  @media(min-width: 1400px) {
    display: none;
  }
`,jt=r.div`
  .tab_title {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.8;
    letter-spacing: 0.035em;
    text-align: center;

    width: 100%;
  } 

  .back_page {
    position: absolute;
    top: 3rem;
    left: 0;
    padding: 1.4rem 1.4rem 0 1.4rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;

      color: ${l.colors.secondary_50};
    }
  }

  .open_menu {
    position: absolute;
    top: 4.8rem;
    right: 1rem;
  }

  @media(min-width: 1024px) {
    .tab_title {
      font-size: 1.8rem;
    }
  }
`;var Mt="/assets/menu_icon.fffb90cc.svg";function Ut({selectedTab:t,children:i,menu:s,hasButtonToBack:a}){return e(It,{isShow:s.state,className:"tab_list",children:Array.isArray(i)&&i[t]&&n(jt,{children:[a&&a.state&&e("button",{className:"back_page",onClick:a.changeToFalse,children:e(He,{})}),e("h1",{className:"tab_title",children:i[t].props.title}),e("button",{onClick:s.changeToTrue,className:"open_menu",title:"Abrir menu",children:e("img",{src:Mt,alt:"Icone de menu"})})]})})}const Lt=r.div`

`;function Qt({children:t}){const[i,s]=p.exports.useState(0),a=y(!1);function d(c){a.changeToFalse(),s(c)}return p.exports.useEffect(()=>{window.addEventListener("resize",()=>{window.innerWidth>1024&&a.state&&a.changeToFalse()})}),n(Lt,{children:[e(Ut,{menu:a,children:t,selectedTab:i,hasButtonToBack:Array.isArray(t)&&t[i].props.hasButtonToBack&&t[i].props.hasButtonToBack}),e(Et,{selectedTab:i,menu:a,children:t,changeSelected:d}),!a.state&&Array.isArray(t)&&t[i]]})}const Rt=r.div`

`;function ie(t){return e(Rt,{children:t.children})}var Dt="/assets/fighter.689bc70e.png",Xt="/assets/explorer.8b02d11c.png",Ht="/assets/miner.ba74ea3a.png";const Vt=r.div`
  padding: 1.6rem;
  max-height: 40rem;
  overflow: auto;

  @media(min-width: 1024px) {
    max-height: 100%;
  }
`,Pt=r.div`
  .back_page {
    display: none;
  }

  .ship_name {
    margin-bottom: 16px;
  }

  @media(min-width: 1024px) {
    .ship_name {
      margin: 32px 0 40px;

      font-size: 3.2rem;
      line-height: 40px;
    }

    .back_page {
      display: block;

      margin: 32px auto 0;
      padding: 8px 14px;

      background: #072347;
      border: 1px solid #2A72B3;
      color: ${l.fonts.primary};

      font-size: 1.8rem;
      font-weight: 700;
      line-height: 23px;
      text-align: center;
    }
  }
`,Kt=r.main`
  display: flex;
  flex-direction: column;

  .ship_image {
    margin: 8px 48px 0 0;
    
    max-width: 170px;
    max-height: 100px;
    width: 100%;

    object-fit: contain;
  }

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    .ship_image {
      margin-top: 64px;
    }
  }
  
  @media(min-width: 1024px) {
    .ship_image {
      max-width: 300px;
      max-height: 260px;
      margin-top: 0;
    }
  }

  @media(min-width: 1400px) {
    max-width: 85%;
    margin: 0 auto;

    .ship_image {
      max-width: 430px;
      margin: 0;
    }
  }
`,Ot=r.section`
  display: flex;
  flex-direction: column;

  @media(min-width: 768px) {
    flex-direction: row-reverse;
    gap: 24px;
  }

  @media(min-width: 1024px) {
    width: 100%;
    align-items: center;
  }
`,_t=r.aside`
  .mist_info {
    display: flex;
    justify-content: flex-start;
    gap: 1.6rem;
    
    margin-bottom: 24px;
  }

  .details_title {
    display: none;
  }

  @media(min-width: 1024px) {
    
    .details_title {
      display: block;
      margin-bottom: 50px;
    }
  }
`,I=r.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  margin-top: 16px;

  span {
    color: ${l.colors.primary_0}
  }

  strong {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4rem;
    letter-spacing: 0.035em;
    color: ${l.fonts.primary};
    margin-top: 0.4rem;

    &.ship_id {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      line-height: 18px;
    }
  }

  @media(min-width: 1024px) {
    span {
      font-size: 1.2rem;
    }

    strong {
      font-size: 1.8rem;
      margin-top: 0.8rem;
    }
  }

  @media(min-width: 1400px) {
    span {
      font-size: 1.4rem;
    }

    strong {
      font-size: 2.4rem;
    }
  }
`,Jt=r.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 16px;

  .pve_detail {
    margin: 8px 0 24px;
    text-align: center;
    color: #0BFFB3;

    font-size: 1.1rem;
    line-height: 1.6rem;
    letter-spacing: 0.035em;
  }

  @media(min-width: 1024px) {
    margin-top: 42px;

    .pve_detail {
      font-size: 1.8rem;
      line-height: 23px;
      
      margin-top: 24px;
    }
  }
`,ne=r.h1`
  font-size: 1.4rem;
  color: ${l.colors.primary_0};
  text-transform: uppercase;
  line-height: 1.8rem;
  letter-spacing: 0.035em;
  text-align: center;
  
  width: 100%;

  padding: 4px;

  background: 
  linear-gradient(90deg, 
    rgba(0, 146, 249, 0) 5.52%, 
    #041937 50.86%, 
    rgba(0, 146, 249, 0) 91.71%
  );

  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;

    width: 100%;
    height: 2px;

    background: 
    linear-gradient(90deg, 
      rgba(0, 146, 249, 0) 5.52%, 
      #0092F9 50.86%, 
      rgba(0, 146, 249, 0) 91.71%
    );
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }

  @media(min-width: 1400px) {
    font-size: 2.4rem;
    line-height: 30px;
  }
`,Wt=r.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  .crew_title {
    margin-bottom: 16px;
  }
  
  @media(min-width: 768px) {
    margin: 0 0 0 auto;
    max-width: 220px;
  }

  @media(min-width: 1400px) {
    max-width: 300px;

    .crew_title {
      margin-bottom: 50px;
    }
  }
  
  .crew_title.none_crew_list {
    margin-bottom: 0;
  }
`,Zt=r.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 16px;

  width: 100%;
`,Gt=r.div`

  background: #041937;
  border: 1px solid ${l.colors.secondary_50};
  border-radius: 10px;

  padding-right: 20px;

  &:not(:first-child) {
    margin-top: 4px;
  }

  .crew_content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    width: 100%;

    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }

    .crew_infos {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      span {
        text-align: center;
        word-break: break-word;
        padding: 2px 0;

        font-weight: bold;

        &:first-child {
          padding-top: 12px;
        }

        &:last-child {
          padding-bottom: 12px;
        }
      }
    }
  }
`;var Te="/assets/engineer.e7c55f29.png",Ne="/assets/scientist.d39bff37.png",ze="/assets/soldier.1601362b.png";function Yt({shipIsShow:t}){const{ship:i}=K(),s=p.exports.useMemo(()=>x(f({},i),{crew:x(f({},i.crew),{monkeynauts:i.crew.monkeynauts&&i.crew.monkeynauts.map(a=>x(f({},a),{class:b(a.class),rank:b(a.rank),avatar:ee(a.class,{engineer:Te,scientist:Ne,soldier:ze})}))})}),[i]);return e(Vt,{children:n(Pt,{children:[e(J,{className:"ship_name",children:i.name}),n(Kt,{children:[n(Ot,{children:[e("img",{className:"ship_image",src:i.avatar,alt:i.name}),n(_t,{children:[e(ne,{className:"details_title",children:"Details"}),n(I,{children:[e("span",{children:"Ship ID"}),e("strong",{title:i.id,className:"ship_id",children:i.id_short})]}),n(I,{children:[e("span",{children:"Owner"}),e("strong",{children:b(String(i.ownerName))})]}),n("div",{className:"mist_info",children:[n("div",{className:"info_left",children:[n(I,{children:[e("span",{children:"Role"}),e("strong",{children:b(i.class)})]}),n(I,{children:[e("span",{children:"Crew"}),n("strong",{children:[i.crew.monkeynauts.length||0,"/",i.crew.seats]})]})]}),n("div",{className:"info_right",children:[n(I,{children:[e("span",{children:"Rank"}),e("strong",{children:b(i.rank)})]}),n(I,{children:[e("span",{children:"Durability"}),n("strong",{children:[i.attributes.currentDurability,"/",i.attributes.maxDurability]})]})]})]}),n(Jt,{children:[e(ne,{children:"PVE BONUS"}),n("p",{className:"pve_detail",children:["+ ",i.bonus.value,"% ",e("br",{}),i.bonus.description]})]})]})]}),n(Wt,{children:[e(ne,{className:`crew_title ${s.crew.monkeynauts.length===0&&"none_crew_list"}`,children:"Crew"}),e(Zt,{children:s.crew.monkeynauts.length>0?s.crew.monkeynauts.map(a=>e(Gt,{children:n("div",{className:"crew_content",children:[e("img",{src:a.avatar,alt:`${a.firstName} ${a.lastName}`}),n("div",{className:"crew_infos",children:[n("span",{children:[a.firstName," ",a.lastName]}),e("span",{children:a.class}),e("span",{children:a.rank}),n("span",{children:["Energy: ",a.attributes.currentEnergy,"/",a.attributes.maxEnergy]})]})]})},a.id)):e("p",{children:"None"})})]})]}),e("button",{onClick:t.changeToFalse,className:"back_page",children:"Back"})]})})}var Fe="data:image/png;base64,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";const qt=r.div`
  margin-top: 32px;
`,$t=r.div`
  margin: 0 auto;

  ${t=>t.loadingShips&&w`
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  @media(min-width: 1400px) {
    max-width: 80%;
  }
`,ei=r.section`
  padding-bottom: 32px;

  @media(min-width: 1024px) {
    max-height: 70rem;
    padding-bottom: 0;

    overflow: auto;
    overflow-x: hidden;
  }
`,ti=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 32rem;
  width: 100%;

  margin: 1.6rem auto 0;

  @media(min-width: 768px) {
    max-width: 76.8rem;
  }

  @media(min-width: 1024px) {
    display: table;

    max-width: initial;

    margin: 0;
    padding: 0 16px 0 0;
    border-spacing: 0 1.4rem;
  }
`,ii=r.div`
  display: none;

  @media(min-width: 1024px) {
    display: table-header-group;
  }
`,ni=r.div`
  @media(min-width: 1024px) {
    display: table-row;
  }
`,j=r.div`
  @media(min-width: 1024px) {
    display: table-cell;
    text-align: center;
    padding: 16px;

    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.3rem;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #AFD7FF;
  }
`,ri=r.div`
  max-height: 42rem;
  overflow: auto;

  padding: 0 8px 16px;

  @media(min-width: 768px) {  
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
  }

  @media(min-width: 1024px) {
    display: table-row-group;
    padding: 0 0 16px;
  }
`,ai=r.div`
  cursor: pointer;
  
  display: grid;
  grid-template-areas:
    "name name"
    "id id"
    "role rank"
    "crew fuel";
  align-items: center;
  justify-content: center;

  width: 22.9rem;
  height: 184px;
  
  padding: 1.6rem;

  background: url(${Fe}) no-repeat;

  @media(min-width: 1024px) {
    display: table-row;

    height: initial;

    background: ${l.colors.tertiary_100};

    transition: all 0.2s;

    &:hover {
      background: #0A3876;
    }
  }
`,z=r.div`
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      font-size: 1.1rem;
    }

    span {
      color: ${l.colors.primary_0}
    }

    img {
      width: 76px;
      height: 46px;
      object-fit: contain;
    }

    strong {
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
      color: ${l.fonts.primary};
      margin-top: 0.4rem;
    }
  }

  &.avatar {
    display: none;
  }

  &.name {
    grid-area: name;
  }

  &.id {
    grid-area: id;
    margin: 6px 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    line-height: 18px;
  }

  &.role {
    grid-area: role;
    margin-right: 16px;
  }

  &.rank {
    grid-area: rank;
    margin-left: 16px;
  }

  &.crew {
    grid-area: crew;
    margin: 8px 16px 0 0;
  }

  &.fuel {
    grid-area: fuel;
    margin: 8px 0 0 16px;
  }

  @media(min-width: 1024px) {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    border-top: 2px solid #298df1;
    border-bottom: 2px solid #298df1;

    &:last-child {
      border-right: 4px solid #298df1;
      border-radius: 0 8px 8px 0;
    }

    &:first-child {
      border-radius: 8px 0 0 8px;
      border-left: 4px solid #298df1;
    }

    .info {
      padding: 1.6rem;

      span {
        display: none;
      }

      h1 {
        background: none;
        padding: 0;
      }

      strong {
        text-align: center;
        margin: 0;
      }

      h1, strong {
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 2.3rem;
        letter-spacing: 0;
      }
    }

    &.id {
      display: none;
    }

    &.avatar {
      display: table-cell;
      
      width: 80px;
      margin: 0 auto 0 8px;

      background: #0E112D;
    }
  }
`;function oi({shipIsShow:t}){const{user:i}=N(),s=y(!0),{setShip:a}=K(),[{ships:d},c]=p.exports.useState({});function m(o){let g=o.owner.id===(i==null?void 0:i.user.id)?"YOU":o.owner.nickname;a(x(f({},o),{id_short:D(o.id),ownerName:g})),t==null||t.changeToTrue()}p.exports.useEffect(()=>{async function o(){try{const g=await E.ships.geral.getShips();c(g.data),s.changeToFalse()}catch{s.changeToFalse()}}o()},[]);const h=p.exports.useMemo(()=>{if(d)return d.map(o=>x(f({},o),{avatar:ee(o.class,{explorer:Xt,fighter:Dt,miner:Ht})}))},[d]);return e(qt,{children:(t==null?void 0:t.state)?e(Yt,{shipIsShow:t}):e($t,{loadingShips:s.state,children:s.state?e(_,{size:6.4}):e(q,{children:e(ei,{children:n(ti,{className:"table_custom",children:[e(ii,{children:n(ni,{children:[e(j,{children:"Ship"}),e(j,{children:"Name"}),e(j,{children:"Role"}),e(j,{children:"Rank"}),e(j,{children:"Crew"}),e(j,{children:"Durability"})]})}),e(ri,{children:h&&h.map(o=>n(ai,{onClick:()=>m(o),children:[e(z,{className:"avatar",children:e("div",{className:"info",children:e("img",{src:o.avatar,alt:o.name})})}),e(z,{className:"name",children:e("div",{className:"info",children:e(J,{children:o.name})})}),e(z,{className:"id",children:n("div",{className:"info",children:[e("span",{children:"Ship id"}),e("strong",{children:D(o.id)})]})}),e(z,{className:"role",children:n("div",{className:"info",children:[e("span",{children:"Role"}),e("strong",{children:b(o.class)})]})}),e(z,{className:"rank",children:n("div",{className:"info",children:[e("span",{children:"Rank"}),e("strong",{children:b(o.rank)})]})}),e(z,{className:"crew",children:n("div",{className:"info",children:[e("span",{children:"Crew"}),n("strong",{children:[o.crew.monkeynauts.length||0,"/",o.crew.seats]})]})}),e(z,{className:"fuel",children:n("div",{className:"info",children:[e("span",{children:"Durability"}),n("strong",{children:[o.attributes.currentDurability,"/",o.attributes.maxDurability]})]})})]},o.id))})]})})})})})}const si=r.div`
  padding: 1.6rem;
  max-height: 40rem;
  overflow: auto;

  @media(min-width: 1024px) {
    max-height: 100%;
  }
`,li=r.div`
  .back_page {
    display: none;
  }

  .monkeynaut_name {
    margin-bottom: 16px;
  }

  @media(min-width: 1024px) {
    .monkeynaut_name {
      margin: 32px 0 40px;

      font-size: 3.2rem;
      line-height: 40px;
    }

    .back_page {
      display: block;

      margin: 32px auto 0;
      padding: 8px 14px;

      background: #072347;
      border: 1px solid #2A72B3;
      color: ${l.fonts.primary};

      font-size: 1.8rem;
      font-weight: 700;
      line-height: 23px;
      text-align: center;
    }
  }
`,di=r.main`
  display: flex;
  flex-direction: column;

  .monkeynaut_image {
    margin: 8px auto 0;
    
    max-width: 170px;
    max-height: 100px;
    width: 100%;

    object-fit: contain;
  }

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    .monkeynaut_image {
      margin: 64px 24px 0;

      max-height: 170px;
    }
  }
   
  @media(min-width: 1024px) {
    .monkeynaut_image {
      max-width: 300px;
      max-height: 260px;
      margin: 0 126px 0 0;
    }
  }

  @media(min-width: 1400px) {
    max-width: 85%;
    margin: 0 auto;

    .monkeynaut_image {
      margin: 0 178px 0 0;
    }
  }
`,ci=r.section`
  display: flex;
  flex-direction: column;

  @media(min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 24px;

    width: 100%;
    }

  @media(min-width: 1024px) {
    width: 100%;

    align-items: center;
    justify-content: flex-end;
    gap: 0;
  }
`,mi=r.section`

`,pi=r.aside`
  .mist_info {
    display: flex;
    justify-content: flex-start;
    gap: 1.6rem;
  }

  .details_title {
    display: none;
  }

  @media(min-width: 1024px) {
    max-width: 400px;
    width: 100%;

    .details_title {
      display: block;
      margin-bottom: 50px;
    }
  }
`,F=r.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  margin-top: 16px;

  span {
    color: ${l.colors.primary_0}
  }

  strong {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4rem;
    letter-spacing: 0.035em;
    color: ${l.fonts.primary};
    margin-top: 0.4rem;

    &.monkeynaut_id {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      line-height: 18px;
    }
  }

  @media(min-width: 1024px) {
    margin-top: 24px;
    
    span {
      font-size: 1.2rem;
    }

    strong {
      font-size: 1.8rem;
      margin-top: 0.8rem;
    }
  }

  @media(min-width: 1400px) {
    span {
      font-size: 1.4rem;
    }

    strong {
      font-size: 2.4rem;
    }
  }
`,gi=r.div`

`,hi=r.div`
  display: flex;
  align-items: flex-end;

  div {
    margin-top: 4px;

    p {
      font-size: 8px;
      font-weight: 700;
      margin-top: 4px;
      line-height: 10px;
    }
  }

  @media(min-width: 1024px) {
    div {
      margin-top: 12px;

      p {
        font-size: 1.8rem;
        margin-top: 12px;
      }
    }
  }
`,ui=r.div`
  margin: 24px 0 32px;
`,fi=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  margin-top: 24px;
`,W=r.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  justify-content: center;

  gap: 16px;
  svg {
    color: #60B2FF;

    width: 24px;
    height: 24px;
  }

  strong {
    font-size: 1.8rem;
    line-height: 23px;
    color: ${l.fonts.primary};
  }
`,xi=r.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 16px;

  .pve_detail {
    margin: 8px 0 24px;
    text-align: center;
    color: #0BFFB3;

    font-size: 1.1rem;
    line-height: 1.6rem;
    letter-spacing: 0.035em;
  }

  @media(min-width: 1024px) {
    margin-top: 42px;

    .pve_detail {
      font-size: 1.8rem;
      line-height: 23px;
      
      margin-top: 24px;
    }
  }
`,Z=r.h1`
  font-size: 1.4rem;
  color: ${l.colors.primary_0};
  text-transform: uppercase;
  line-height: 1.8rem;
  letter-spacing: 0.035em;
  text-align: center;
  
  width: 100%;

  padding: 4px;

  background: 
  linear-gradient(90deg, 
    rgba(0, 146, 249, 0) 5.52%, 
    #041937 50.86%, 
    rgba(0, 146, 249, 0) 91.71%
  );

  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;

    width: 100%;
    height: 2px;

    background: 
    linear-gradient(90deg, 
      rgba(0, 146, 249, 0) 5.52%, 
      #0092F9 50.86%, 
      rgba(0, 146, 249, 0) 91.71%
    );
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }

  @media(min-width: 1400px) {
    font-size: 2.4rem;
    line-height: 30px;
  }
`,bi=r.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  .equipament_title {
    margin-bottom: 16px;
  }
  
  @media(min-width: 768px) {
    margin: 0 0 0 auto;
    max-width: 220px;
  }

  @media(min-width: 1400px) {
    max-width: 300px;
  }
`,Ai=r.div`
  display: flex;
  align-items: center;
  gap: 22px;

  margin-top: 16px;
`,re=r.div`
  width: 100%;

  background: #041937;
  border: 1px solid ${l.colors.secondary_50};

  display: flex;
  align-items: center;
  justify-content: center;
  
  transform: rotate(45deg);
  border-radius: 6px;

  .equipament_content {
    padding: 8px;
      
    transform: rotate(-45deg);

    svg {
      width: 18px;
      height: 18px;
      color: ${l.fonts.primary};
    }
  }
`;function wi({monkeynautIsShow:t}){var s,a;const{monkeynaut:i}=K();return e(si,{children:n(li,{children:[n(J,{className:"monkeynaut_name",children:[i.firstName," ",i.lastName]}),n(di,{children:[n(ci,{children:[e("img",{className:"monkeynaut_image",src:i.avatar,alt:`${i.firstName} ${i.lastName}`}),n(pi,{children:[e(Z,{className:"details_title",children:"Details"}),n(F,{children:[e("span",{children:"Monkeynaut ID"}),e("strong",{title:i.id,className:"monkeynaut_id",children:i.id_short})]}),n(F,{children:[e("span",{children:"Owner"}),e("strong",{children:b(String(i.ownerName))})]}),n("div",{className:"mist_info",children:[n("div",{className:"info_left",children:[n(F,{children:[e("span",{children:"Role"}),e("strong",{children:b(i.class)})]}),n(F,{children:[e("span",{children:"Energy"}),n("strong",{children:[i.attributes.currentEnergy,"/",i.attributes.maxEnergy]})]})]}),n("div",{className:"info_right",children:[n(F,{children:[e("span",{children:"Rank"}),e("strong",{children:b(i.rank)})]}),n(F,{children:[e("span",{children:"Breed Count"}),e("strong",{children:i.breedCount})]})]})]}),n(F,{children:[e("span",{children:"Crew in Ship"}),e(gi,{children:i.crew_in_ship?e(hi,{children:n("div",{children:[e("strong",{children:i.crew_in_ship.name}),e("p",{children:b(i.crew_in_ship.class)})]})}):e("p",{children:"None"})})]})]})]}),n(mi,{children:[n(ui,{children:[e(Z,{children:"Attributes"}),n(fi,{children:[n(W,{children:[e(Ve,{}),e("strong",{children:i.attributes.skill})]}),n(W,{children:[e(Pe,{}),e("strong",{children:i.attributes.speed})]}),n(W,{children:[e(Ke,{}),e("strong",{children:i.attributes.resistance})]}),n(W,{children:[e(Oe,{}),e("strong",{children:i.attributes.life})]})]})]}),n(xi,{children:[e(Z,{children:"PVE BONUS"}),n("p",{className:"pve_detail",children:["+ ",(s=i.bonus)==null?void 0:s.value,"% ",e("br",{}),(a=i.bonus)==null?void 0:a.description]})]}),n(bi,{children:[e(Z,{className:"equipament_title",children:"Equipments"}),n(Ai,{children:[e(re,{children:e("div",{className:"equipament_content",children:e($,{})})}),e(re,{children:e("div",{className:"equipament_content",children:e($,{})})}),e(re,{children:e("div",{className:"equipament_content",children:e($,{})})})]})]})]})]}),e("button",{onClick:t.changeToFalse,className:"back_page",children:"Back"})]})})}const yi=r.div`
  margin-top: 32px;
`,vi=r.div`
  margin: 0 auto;
  
  ${t=>t.loadingMonkeynauts&&w`
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  @media(min-width: 1400px) {
    max-width: 80%;
  }
`,ki=r.section`
  overflow: auto;
  overflow-x: hidden;
  max-height: 40rem;

  @media(min-width: 1024px) {
    max-height: 70rem;
  }
`,Ci=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 32rem;
  width: 100%;

  margin: 1.6rem auto 0;

  @media(min-width: 768px) {
    max-width: 76.8rem;
  }

  @media(min-width: 1024px) {
    display: table;

    max-width: initial;

    margin: 0;
    padding: 0 16px 0 0;
    border-spacing: 0 1.4rem;
  }
`,Bi=r.div`
  display: none;

  @media(min-width: 1024px) {
    display: table-header-group;
  }
`,Ti=r.div`
  @media(min-width: 1024px) {
    display: table-row;
  }
`,M=r.div`
  @media(min-width: 1024px) {
    display: table-cell;
    text-align: center;
    padding: 16px;

    white-space: nowrap;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.3rem;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #AFD7FF;
  }
`,Ni=r.div`
  max-height: 42rem;

  padding-bottom: 1.6rem;

  @media(min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
  }

  @media(min-width: 1024px) {
    display: table-row-group;
  }
`,zi=r.div`
  cursor: pointer;
  
  display: grid;
  grid-template-areas:
    "name name"
    "id id"
    "role rank"
    "energy breed";
  align-items: center;
  justify-content: center;

  width: 22.9rem;
  height: 184px;
  
  padding: 1.6rem;

  background: url(${Fe}) no-repeat;

  @media(min-width: 1024px) {
    display: table-row;

    height: initial;

    background: ${l.colors.tertiary_100};

    transition: all 0.2s;

    &:hover {
      background: #0A3876;
    }
  }
`,S=r.div`
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      font-size: 1.1rem;
    }

    span {
      color: ${l.colors.primary_0}
    }

    img {
      height: 46px;
      width: 46px;
      object-fit: contain;
    }

    strong {
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
      color: ${l.fonts.primary};
      margin-top: 0.4rem;
    }
  }

  &.avatar {
    display: none;
  }

  &.name {
    grid-area: name;
  }

  &.id {
    grid-area: id;
    margin: 6px auto;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    line-height: 18px;
  }

  &.role {
    grid-area: role;
    margin-right: 16px;
  }

  &.rank {
    grid-area: rank;
    margin-left: 16px;
  }

  &.energy {
    grid-area: energy;
    margin: 8px 16px 0 0;
  }

  &.breed {
    grid-area: breed;
    margin: 8px 0 0 16px;
  }

  @media(min-width: 1024px) {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    border-top: 2px solid #298df1;
    border-bottom: 2px solid #298df1;

    &:last-child {
      border-right: 4px solid #298df1;
      border-radius: 0 8px 8px 0;
    }

    &:first-child {
      border-radius: 8px 0 0 8px;
      border-left: 4px solid #298df1;
    }

    .info {
      padding: 1.6rem;

      span {
        display: none;
      }

      h1 {
        background: none;
        padding: 0;
      }

      strong {
        text-align: center;
        margin: 0;
      }

      h1, strong {
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 2.3rem;
        letter-spacing: 0;
      }
    }

    &.id {
      display: none;
    }

    &.avatar {
      display: table-cell;
      
      width: 80px;
      margin: 0 auto 0 8px;

      background: #0E112D;
    }
  }
`;function Fi({monkeynautIsShow:t}){const{user:i}=N(),{setMonkeynaut:s}=K(),a=y(!0),[{monkeynauts:d},c]=p.exports.useState({});async function m(o){var B;let g=o.owner.id===(i==null?void 0:i.user.id)?"YOU":o.owner.nickname;try{const u=await E.ships.geral.getUnique({path:{ship_id:o.shipId}});s(x(f({},o),{crew_in_ship:u.data.ship,id_short:D(o.id),ownerName:g}))}catch(u){const A=(B=u==null?void 0:u.response)==null?void 0:B.headers["grpc-message"];L(A,{autoClose:5e3,pauseOnHover:!0,type:"error",style:{background:l.global.white_0,color:l.global.red_0,fontSize:14,fontFamily:"Orbitron, sans-serif"}})}finally{t==null||t.changeToTrue()}}p.exports.useEffect(()=>{async function o(){try{const g=await E.monkeynauts.geral.getMonkeynauts();c(g.data),a.changeToFalse()}catch{a.changeToFalse()}}o()},[]);const h=p.exports.useMemo(()=>{if(d)return d.map(o=>x(f({},o),{avatar:ee(o.class,{engineer:Te,soldier:ze,scientist:Ne})}))},[d]);return e(yi,{children:(t==null?void 0:t.state)?e(wi,{monkeynautIsShow:t}):e(vi,{loadingMonkeynauts:a.state,children:a.state?e(_,{size:6.4}):e(q,{children:e(ki,{children:n(Ci,{className:"table_custom",children:[e(Bi,{children:n(Ti,{children:[e(M,{children:"Monkeynaut"}),e(M,{children:"Name"}),e(M,{children:"Role"}),e(M,{children:"Rank"}),e(M,{children:"Energy"}),e(M,{children:"Breed COunt"})]})}),e(Ni,{children:h&&h.map(o=>n(zi,{onClick:()=>m(o),children:[e(S,{className:"avatar",children:e("div",{className:"info",children:e("img",{src:o.avatar})})}),e(S,{className:"name",children:e("div",{className:"info",children:n(J,{children:[o.firstName," ",o.lastName]})})}),e(S,{className:"id",children:n("div",{className:"info",children:[e("span",{children:"Monkeynaut id"}),e("strong",{children:D(o.id)})]})}),e(S,{className:"role",children:n("div",{className:"info",children:[e("span",{children:"Role"}),e("strong",{children:b(o.class)})]})}),e(S,{className:"rank",children:n("div",{className:"info",children:[e("span",{children:"Rank"}),e("strong",{children:b(o.rank)})]})}),e(S,{className:"energy",children:n("div",{className:"info",children:[e("span",{children:"Energy"}),n("strong",{children:[o.attributes.currentEnergy,"/",o.attributes.maxEnergy]})]})}),e(S,{className:"breed",children:n("div",{className:"info",children:[e("span",{children:"Breed Count"}),e("strong",{children:o.breedCount})]})})]},o.id))})]})})})})})}var Si="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAWCAYAAAAxSueLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR5SURBVHgB7VVLbxxFEP66ex77iL2b2F6/Esd2HG1sbxIlNnkYhTgXBBIEIRCcOXDjBEcOueUvIARCCHENSIgLl1ggkAjBeTk2Thxn7V3bydre9+7M7EzPNLURhEjYweHEgZLmMl1dX9VXX1UD/2VbPt49tjgx+I4CuFKKPctdjmc0/czE+/Hxls+WXzly9W4q8XzzX3qyPzRF3z/d3XFmCyf3nGo5e/Yij+46x9duIUgkofg6gpmH3wvmH9XiMcd2Wz+vXbv5VXI2f/VfgU1NTmoHRyMX9P3hDxmvsuChgIi2wDhoIHigQ9tcAKsUwVwHntEL1zOhYrGZ6vXZC0OXf/t6x2BLw+3d+ksTUyKukoZfhqjZsNZD0E5EwIM6uN4JUVDgq/MAgYFaWK12QEkFHT6C/X33c9O/jh/5MVNsxtu2Z/ee69kXffvFnwytkDTD1KtSFbIkEB3thrlcQlCqI7AykDpV6IWhmhUxDpnLwZQV6NRBzZSDpi07/4y5JdjtY10ju187cd1L3xhgGxWIBocq2fBsnQ5vgtcqMMsCWs6Hl12GOzQAtyuJ+noE0bfOwxVRNKJxNIqW9Aa9laeCaSbOcke1iZZ9YA0P3koBLhKIvJqEN3wSskmdY4NbHng0Bl7Ogm1koZ8+TFSuQzs0AMMtQkD62tpf47ElmBlvP6d2h8A6fDQibZBEkTjdC29mGlphFmpkBHY9Dm/dhghHIEougv5hCp2DncnC14mF7n4owzA1B+Pbgs2e6DjTkkq+Ke5mYazUoJGGjFN98NN3IcqUZLECnrkFs13CT/SBFdbQcMLgCfJcc6DnKUhmE35pE2rzAaKnxz94zNiTQDNjiQN7jqcuaS0Gc1cVhFuF6huEPT0Lk2nwnTLRRI6MgZWIJl6Gq+8H66Uqb9+jCmskFAnNp6QqHqyGA7+SWd0SzIhFXw7H4x2YaUrZh2WRg6bAOjvgWQwBiQI2CWaXABMN+HWdgEg0myvgxRKUK8E8ykYGgOdD798H78rcp1vSeLMt/VF9PjvnFIhzpUM/dgis7EA9zMMvFsCG26G9cBRBfC/FS0C6IQjpEpU0RiQk5gWPgAJSrezpQkB3PEM+ruxvQ33v/Ni5+MiBy3LuDqTlItwTg5svQxsYgG+VIA2FQKeh3dUGPdaJoNqgTbIBlEoQFaJZCvg9CRi8gdpCdrbvykpqW4EMfTM9Zd1f/sJQEkIwqDz1prMLLJ8jgVRh5usIFQlwfgWqmIdKL8BQDZgdcWA0BS8Upu1BbKQfwHG8j5+MrWELs1YX38PuPr+ey8jY4dS7xsYGzZsFxgm8KQ4roCw1iDtL4PU6rScJpQIIEhFPjQLXbqBuB0Hg+JeejPvU3Tg31t4d7+ldY5FWMFpDj9z39oJFDLBAwZqeyxH+DzQErXRiMalqvLdt3V5au6oC/ZdDd3LpHYM1bXEy+aXJ/Dciw0MhTrL2F5dImbJSta1PNrqcixPfVQrYoe3oPfv55J7WmM1e14R+hPn+Lc81vh2eX83jf/vDfgeqIhIh8p36dAAAAABJRU5ErkJggg==",Ei="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAReSURBVHgB5VVLiBxVFD31fVXV1VWTTEDERcIYJFkIAUHDuImgiBhDyCpIgoPBCCI68RPETfyjIUQXiiD4DzgihvhZiGQhqBAEUcEwZKUgCDrjZKarun7vU55qcJhJDONnp69p6K733j33nnPuLeB/vx7av7/Xtq11qX0L/3I9e/juryFNP8uyY8O8+vSFmVM//mOA5x695zGl1A1hECSL8+ffch1nVz9Nd8g8h9QGbWt+KYr8yWdee/+lP+64fzX40w/fNeWH/pHI7WHw6xyS9WPbRBCiWMpQFEM4IgCkusx3/Vt4/O8BPHhgz8Y6Gx6JhI9GSbgMVmU5Wq0QpRG8yIPMKpR1g1rJ0yvv2msFn963c8fElVtOxklvE0gDmhZBP0TAwKC25eIiQFCpaviej7pqvlt5/5IVPH7f1P2+8PZGcW97ky/BSAmEERzbgZYamtm6lo2ykjBKd/xD6RbG2D+sWcH01O5NIhDHW222w1iwmFmYjqMaZnAD5mQbusOBqmo4oQ+3HyHsxWhImS9w78pYzgWxracOHbhjXZq+47luYvkubNdCVRaQZQXLceF6DkwtYbUYZey7DizTjiJ5FN1zvMnrtk4sffHt7JmLAJ6YnnogifsvF3nRV6qBIIAuSjSNgi0sJOMpVKkYULOCFp6IUNcV6VOkjTblU2NYncG1V2+bOPHVN+eyVRTlC4OqWBzAUgqGgsqiRkd9IDwIhw4qS7SGe9xXXeCmQn8shR2GaAjKTZ7z4Pr++ki5kxeJ3FrtBqc7XBSIehHc0ENICobz5+FTUEMH1Q1tSmr4Fw01MK2G4wkIIaAaTeCCvNjIY+eTZYBDt986sXHz5re1NpNLc/OI16+D7bTQFbOkM22KLJsaLR3UXzfGSuoRdVmRITQBkn7KmEzAbaECQeAK3m/ZFQx9bgSQpumNuqgmtdYUlTakG5qCNhwR2BLMRkVhxzakqAd0kghhIgb2PYrdYjA3B5qCDLisxEPJvohFctUywOIgPxuI3kgwzyEAgznsWk1xLfJq+PUoeLawAJEkhKRrWJrkOZtJSVJT0WU+XdY2PobD4btH3zj50TJFViBmu7FXVSUFDSCCaGRDPyYoqWBJ6JwY9OPRb8km60RwWa0iUMhzNCtqOqLzUi9Jzq5qtOdffW+BA+vLOElHDzXd0XldjbxvczoY2OS4yYeo+e16QtFRHKEUtqbaChWNIck9W5qVzn++CqBb2TCfUswgiOLuDG3K9qdVNV3T44iwKHC337EDi13QzSFWp3imJIixLSglF5aypcPHTnz82XLnrrTpI/t2bY7Hxk87rrOxiyPrmkI7sLuA/Dh0U2fN7lo38OquL3RXHelpmtlcFjcff/2Dn1aNBlywpvfu3hRF7m227WyVWg8ZeovwxM7uIF8wcDhs2K/sXNVmVX6nLOWZurUGL858+DP+ZK35Rjt48Bovzi+/SbvW9yRpPPT6e2xY19eqnjn65qlX8J9fvwNENDiu+0KbQgAAAABJRU5ErkJggg==",Ii="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAVCAYAAABYHP4bAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR8SURBVHgBzVVLbxtVFP7unRk/YjtOnTS2m9TNu22IkhalFQ8VKlaoKqJdIbGhKyQ2CCGE1NKoAQFB5fEHkFDZVV2iggQSG4SCVCAKaUigbpM0L78TO/bY4/HMvRyPI6SqaRtYII40i7nn3vOd73zf3AH+o2C73Zi6jN6m0ZO/QE9WWXvUK3X7enL2h9f6X8fWbs6rD0smJtCltkSfZs1RjXu8Z/2+hZYyONR9c7Br6svh2ull4Pp57CIeyCj35eB40/H9l5inBIkMsLYfauJ7iOHDsNktsLINln+yWJ36qSv4JjbwbxjVmfhHIheVzLdQLMDc8IDVOND5FJiuwl2aB6sCUi0ESqz1C2rrDB4RfKfFwNFTl1xbM4pC0xfLHnC7Bzi4AqVzEry0BW6FCJgOV5YQPPLMi6XJc1dWP8LIPwbimtmNdBZigV78MaiBOagFHagXb61AVJsAm3ImKbZ6A77a16+ET78wXbzaM715dfTTnWrep9HKOPrCAwfjKFXAB1sgp9ahdmQBqi330uPuBdZVYvOns1+kCLwNTt5KMbCOTmwsspfaX12+9kBG6Qn0NR8Y/k7pboJyPAcuZ8CfiMIu+BwGLE2F/yhCpC2IVTogG+ckkZWblB94DlK40BQNfZ7+LHBiR0ZyHKp+7GTcZd/sUtwEUtlOaC7YlRHw6s8Q9bX+CLhnC2IxCJZLUC4IRDvIJEWwXgO8kAMMDkN5HJZbvaLPT74bPY+lv12X7Roca5GzXcgbjfl7tvlaJhTPLVjGERrPHSjlJI2O1pUDwOEIWIFs7pqFsMJQ7mbAiKVd8sDbTYConMPoqT3AN2ccIMfOHjmmpLKwQhy1uA8a18HbKemmxyhACeUhs9TEOoOIHoUMLgFVA8x9COy2hBY0SCMfFFaGNIn64h0aE4NtJTfrGA6QO9D2gSe3xKSgWRp7wQ4ZsP0jkHNrUAJkBI026dTEBtk67AavTUNZErDrGjXFIWUUIkGN+KOwvH7SoworT4xiQ7Bz8V+B1QaQ5t/3vL12kw6oUEMZyLRAtfobZO9jADXGzCwBa1BjZbBSCoycVh+vSo3JUhEW6ahGoqQZ3UilGiR9Brbw0u0xD7OQnHEYpS+j36XpIXj3EirZyqTCojGxmvU77DYCM2LQylNgmbpmDRDHcfUJkJ1YMUdFc401ytnkQjVQQZV3IGrgRweoYiLcnDPoOtEcmzJXo0gdTC1TrT0mmDdJ7uoB31wEd297WjRAJV1FoqUHpcLCKklyWwjkpIvUMdFqb2W/8ow7O6EWLdzwlxKfNIf8bwnfEJ2yHZGxsQJE+qgTctlmnrSQZIIBupIITDUdq4vWGBBiqOQzizrHsx0XsYJ7In//d5SZwFgzx3ua0liVip/MZkDhFjQyA1cb67avHzK1DhaLQTGXYeo6ChYG2t9GHA+Je66g5Mfotm0MKRLDNIK75MIkl0gQ+DGa6AX6tPqZFiCrk9D5NGqkJ/0fxiIX8D4eEbv+w9Yj/SFOKBxnXQKD1MAwTe9a2zt4A/+n+AuDd+NFADWQtwAAAABJRU5ErkJggg==",ji="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPYSURBVHgBtZXLS1RhGMa/ccb7bVS84HgjRMQWpltBrGWrqLYRSFGbiPZFSAQti2hTBgUl/QNugmgg2ojgLozQmbzfPd7He8/vq2+YRsvy8sLHOXPOd97nfZ73eb8x5oSipqYmeNAenznmqKioaKusrLxXWFh4dnNz8/v8/Hx4aWmpo7+/P3oi4EFFdXX1jaqqqvMpKSmtOzs7xuf7mZrr+vq60fP3MzMzXT09PW/0ePvI4A0NDadra2vbFxcX2/Py8oK7u7tma2vLLCwsGP02OTk5RqwpzmRnZ5vU1FSjwqIDAwPhubm5joA5RLS2tp5TkrsCOAszkvv9fhMIBMzs7KyZmJiw4DznPaC8X11d5V3N9PQ069+Z/5L2ZigUup6RkXGKpCRMS0uzyQHmGeyRnev29rZdKysrZmxszBsdHX2hAl6J9RdyHgheVlbW1tzcfEGAVwUUBIQFoPpohoaGbBFFRUVxMBYFeJ5nhoeHbc/VjpcjIyPXEnPvkT0zMzNUXFwcVMK2kpKSy0ralp6eboFyc3Pj7ORks7y8bCKRiFFhVgHHWiyNXG77T5HKaWKx2B5iFryuru6KVH2g8agUqxSY8aFLtra2ZtlQBKC84zlRX19vCwKMYiRpXBmuymno735hwTc2Npq1qjUKNjGJcCeL37DmHucmjhDvMJjcbpnBnuWCPRSUn5+P/IXJ4D4593ZpaeljNiGfirBMs7KybC9hnwhIAIaJpqamrBruudvDNwTFkau8vNwqp+fdUuOWZj3Ce7/6kSnQiwJNp3rAGROCJLAmITJToGbUGonEzuGJwTfkcNJDiMU+qVKnLbdV8CepG/FL6qhG4J0OhAKxPQMT3MlBATALx7KQnaQokgxKcbBzc4/JyMXiHVdaom/XtL1X8977W4aWlpYFfZwHsJtfFWZbQBGJsjrDuXuKwheEG8PEQqXajJR9ppY9jkajXtxwCf3y4WYYcBoRHJHJspLY+cGZzBWBxLxj0RqBhXX/QH3+yOcm2e2J+EnFxM1DUBTA7qzG6bCkTRSL1BQilp72PZchOwcHB7+ZP8RfwQF2B4qTFUY4GLc7MHcV4Ofx8fEuzfrrycnJFXNA7DnhHKAzEEbhZAOUcJKzuNc+T0y7ddJ1yrxh8x8BeGpjY+OjWGyjXeyyGROASez6DWtnIGc87fsqWd/q9HrqMXuHiICOx5DkPKeDJkiPYQorWLu/ScdSiqyKXY8AOzQqYXPEiPe4qampUYB3CgoKruJYyDBiFKT59tTnJ5I3PibHEfv9pebqL/SSTHZfrKP6/bCvr++DSRqT44gf5eFST9TJ1qEAAAAASUVORK5CYII=",Mi="data:image/png;base64,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";const Ui=r.div`
  max-height: 42rem;
  overflow: auto;

  padding: 32px;

  @media(min-width: 768px) {
    max-height: 96rem;
  }
`,Li=r.div`

`,Se=r.h1`
  font-size: 1.4rem;
  color: ${l.colors.primary_0};
  text-transform: uppercase;
  line-height: 1.8rem;
  letter-spacing: 0.035em;
  text-align: center;
  
  width: 100%;

  padding: 4px;

  background: 
  linear-gradient(90deg, 
    rgba(0, 146, 249, 0) 5.52%, 
    #041937 50.86%, 
    rgba(0, 146, 249, 0) 91.71%
  );

  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;

    width: 100%;
    height: 2px;

    background: 
    linear-gradient(90deg, 
      rgba(0, 146, 249, 0) 5.52%, 
      #0092F9 50.86%, 
      rgba(0, 146, 249, 0) 91.71%
    );
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }

  @media(min-width: 1400px) {
    font-size: 2.4rem;
    line-height: 30px;
  }
`,Qi=r.div`
  .detail_header {
    width: 100%;
    position: relative;
    
    .signout_button {
      display: none;
    }
  }
  @media(min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .details_title {
      max-width: 300px;
      margin: 0 auto;
      margin-bottom: 16px;
    }
  }
  @media(min-width: 1400px) {
    margin-top: 80px;

    .detail_header {
      max-width: 768px;

      .signout_button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 6px;
        border: 2px solid #0092F9;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
`,Ri=r.div`
  .wallet_button {
    width: 100px;

    font-size: 1.1rem;
    line-height: 14px;
    letter-spacing: 0.035em;
    padding: 0;

    margin-top: 8px;
  }

  @media(min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    max-width: max-content;
    width: 100%;

    .info_separator {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 72px;
    }

    .wallet_button {
      width: 180px;
      padding: 16px;
      margin-top: 0;
    }
  }

  @media(min-width: 1024px) {
    .info_separator:first-child {
      gap: 114px;
    }

    .info_separator:last-child {
      gap: 72px;
    }
  }
`,ae=r.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  margin-top: 16px;

  span {
    color: ${l.colors.primary_0}
  }

  strong {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4rem;
    letter-spacing: 0.035em;
    color: ${l.fonts.primary};
    margin-top: 0.4rem;
  }

  .info_id {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    line-height: 18px;
  }

  @media(min-width: 768px) {
    .info_id {
      max-width: 200px;
    }
  }

  @media(min-width: 1024px) {
    margin-top: 24px;
    
    span {
      font-size: 1.2rem;
    }

    strong {
      font-size: 1.8rem;
      margin-top: 0.8rem;
    }
  }

  @media(min-width: 1400px) {
    span {
      font-size: 1.4rem;
    }

    strong {
      font-size: 2.4rem;
    }
  }
`,Di=r.div`
  margin-top: 32px;

  @media(min-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 96px;
  }

  @media(min-width: 1024px) {
    margin-top: 80px;
  }
`,Xi=r.div`
  .resources_title {
    margin-bottom: 8px;
  }
`,Hi=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`,U=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  margin-top: 16px;

  img, svg {
    width: 26px;
    height: 26px;
  }

  img {
    object-fit: contain;
  }

  svg {
    color: #0BFFB3;
  }

  strong {
    color: ${l.fonts.primary};
    font-weight: 700;
    font-size: 1.1rem;
  }

  @media(min-width: 768px) {
    margin: 16px 16px 0;

    strong {
      font-size: 2.2rem;
    }
      
    img, svg {
      width: 30px;
      height: 30px;
    } 
  }
`;r.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 146px;
  width: 100%;

  margin: 32px auto 0;

  .spc_title {
    width: min-content;
  }

  input {
    background: ${l.colors.tertiary_100};
    
    width: 100%;
    max-width: 146px;
    
    padding: 0.5rem;
    margin: 24px 0 2px;

    color: ${l.fonts.primary};
    caret-color: ${l.fonts.primary};
    border: 2px solid #2697FF;
    
    font-size: 1.1rem;
    line-height: 14px;
    letter-spacing: 0.035em;

    &::placeholder {
      color: #51779A;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${l.colors.tertiary_100} inset;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${l.fonts.primary} !important;
    }
  }

  button {
    padding: 8px 0;
  }

  @media(min-width: 768px) {
    margin: 0;
    
    max-width: 160px;

    input {
      max-width: 160px;
    }
  } 

  @media(min-width: 1024px) {
    max-width: 300px;

    input {
      max-width: 204px;
      margin-bottom: 8px;
      padding: 0.8rem;
    }

    button:last-child {
      margin-top: 8px;
    }
  } 
`;function Vi(){const{user:t,signOut:i}=N();return e(Ui,{children:n(Li,{children:[n(Qi,{children:[n("header",{className:"detail_header",children:[e(Se,{className:"details_title",children:"Details"}),n("button",{className:"signout_button",onClick:i,children:[e(he,{})," Signout"]})]}),e(Ri,{children:n("div",{className:"info_separator",children:[n(ae,{children:[e("span",{children:"Your ID"}),e("strong",{title:t==null?void 0:t.user.id,className:"info_id",children:t==null?void 0:t.user.id_short})]}),n(ae,{children:[e("span",{children:"Nickname"}),e("strong",{children:t==null?void 0:t.user.nickname})]}),n(ae,{children:[e("span",{children:"E-mail"}),e("strong",{children:t==null?void 0:t.user.email})]})]})})]}),e(Di,{children:n(Xi,{children:[e(Se,{className:"resources_title",children:"Resources"}),n(Hi,{children:[n(U,{children:[e("img",{src:Ei}),e("strong",{children:"0"})]}),n(U,{children:[e("img",{src:Ii}),e("strong",{children:"0"})]}),n(U,{children:[e("img",{src:Si}),e("strong",{children:"0"})]}),n(U,{children:[e("img",{src:ji}),e("strong",{children:"0"})]}),n(U,{children:[e(_e,{}),e("strong",{children:"0"})]}),n(U,{children:[e("img",{src:Mi}),e("strong",{children:"0"})]})]})]})})]})})}var Pi="/assets/dashboard_bg_1.063c1a53.svg",Ki="/assets/dashboard_bg_2.24bd7afa.svg",Oi="/assets/dashboard_bg_3.812b8719.svg",_i="/assets/dashboard_bg_4.a6b20277.svg";const Ji=r.div`
  height: 100vh;
  min-height: 100vh;

  overflow: auto;
  
  background: url(${te}) no-repeat center;
  background-size: cover;
  
  padding-top: 2.4rem;
`,Wi=r.div`
  max-width: 32rem;
  width: 100%;

  height: 100%;

  margin: 0 auto 24px;

  padding: 0 3.2rem 128px;

  background: url(${Pi}) no-repeat top;

  @media(min-width: 768px) {
    max-width: 76.8rem;
    background: url(${Ki}) no-repeat top;
  }

  @media(min-width: 1024px) {
    max-width: 102.4rem;
    max-height: 90rem;

    padding-top: 32px;
    
    background: url(${Oi}) no-repeat top;
  }

  @media(min-width: 1400px) {
    max-width: 140rem;
    background: url(${_i}) no-repeat top;
  }
`,Zi=r.main`
  height: 100%;
  position: relative;

  @media(min-width: 768px) {
    padding: 0 32px;
  }

  @media(min-width: 1024px) {
    max-height: 90%;
  }
`;function Gi(){const t=y(!1),i=y(!1),s=y(!1);return e(Ji,{children:e(Wi,{children:e(Zi,{children:e(ot,{children:n(Qt,{children:[e(ie,{title:"Account",hasButtonToBack:s,children:e(Vi,{})}),e(ie,{title:"Monkeynauts",hasButtonToBack:i,children:e(Fi,{monkeynautIsShow:i})}),e(ie,{title:"Ships",hasButtonToBack:t,children:e(oi,{shipIsShow:t})})]})})})})})}function Yi(){return e(ue,{children:n(fe,{children:[e(R,{component:Gi,path:"/dashboard"}),e(P,{from:"/login",to:"/dashboard"}),e(P,{exact:!0,from:"/",to:"/dashboard"}),e(P,{from:"/register",to:"/dashboard"})]})})}function qi(){return e(ue,{children:n(fe,{children:[e(R,{component:Be,exact:!0,path:"/"}),e(R,{component:Be,path:"/login"}),e(R,{component:Tt,path:"/register"}),e(R,{path:"*",component:()=>e(P,{to:"/login"})})]})})}function $i(){const{loading:t,tokenIsValid:i}=N();return e(ft,{isLoading:t,children:t?e(_,{size:7.2}):e(q,{children:i?e(Yi,{}):e(qi,{})})})}function en(){return e(at,{children:n(Je.MetaMaskProvider,{children:[e(We,{}),e($i,{}),e(ut,{})]})})}Ze.render(e(Ge.StrictMode,{children:e(en,{})}),document.getElementById("root"));
