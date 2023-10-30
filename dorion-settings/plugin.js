(()=>{var tt=Object.create;var j=Object.defineProperty,rt=Object.defineProperties,nt=Object.getOwnPropertyDescriptor,st=Object.getOwnPropertyDescriptors,ot=Object.getOwnPropertyNames,de=Object.getOwnPropertySymbols,at=Object.getPrototypeOf,ue=Object.prototype.hasOwnProperty,it=Object.prototype.propertyIsEnumerable;var _e=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,f=(e,t)=>{for(var n in t||={})ue.call(t,n)&&_e(e,n,t[n]);if(de)for(var n of de(t))it.call(t,n)&&_e(e,n,t[n]);return e},g=(e,t)=>rt(e,st(t));var lt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),ct=(e,t)=>{for(var n in t)j(e,n,{get:t[n],enumerable:!0})},me=(e,t,n,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let d of ot(t))!ue.call(e,d)&&d!==n&&j(e,d,{get:()=>t[d],enumerable:!(l=nt(t,d))||l.enumerable});return e};var o=(e,t,n)=>(n=e!=null?tt(at(e)):{},me(t||!e||!e.__esModule?j(n,"default",{value:e,enumerable:!0}):n,e)),dt=e=>me(j({},"__esModule",{value:!0}),e);var m=(e,t,n)=>new Promise((l,d)=>{var r=u=>{try{c(n.next(u))}catch(v){d(v)}},a=u=>{try{c(n.throw(u))}catch(v){d(v)}},c=u=>u.done?l(u.value):Promise.resolve(u.value).then(r,a);c((n=n.apply(e,t)).next())});var s=lt((Gt,pe)=>{pe.exports=shelter.solidWeb});var Vt={};ct(Vt,{onUnload:()=>Wt});var he=o(s(),1),ve=o(s(),1),$e=o(s(),1),L=o(s(),1),b=o(s(),1);var fe="._tophead_1u2ez_1{margin-bottom:16px}._shead_1u2ez_1{margin-top:16px;margin-bottom:8px}._pbuttons_1u2ez_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}",D={tophead:"_tophead_1u2ez_1",shead:"_shead_1u2ez_1",pbuttons:"_pbuttons_1u2ez_1"};var _t=(0,he.template)("<div></div>",2),{ui:{injectCss:ut,openConfirmationModal:mt,ModalRoot:Qt,ModalHeader:Xt,ModalBody:er,ModalFooter:tr,SwitchItem:W,Button:V,ButtonLooks:rr,Header:Y,HeaderTags:pt,showToast:ft},solid:{createSignal:gt,createEffect:ht}}=shelter,{invoke:O,process:vt}=window.__TAURI__,ge=!1;function be(){let[e,t]=gt({cache_css:!1,streamer_mode_detection:!1,rpc_server:!1});ge||(ge=!0,ut(fe)),ht(()=>m(this,null,function*(){let r=yield O("read_config_file"),a=yield O("default_config");try{t(JSON.parse(r))}catch(c){t(JSON.parse(a))}}));let n=()=>m(this,null,function*(){yield O("write_config_file",{contents:JSON.stringify(e())}),vt.relaunch()}),l=()=>m(this,null,function*(){yield O("clear_css_cache"),ft({title:"CSS Cache Cleared",duration:3e3})}),d=()=>m(this,null,function*(){mt({body:()=>`
      Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.

      Do you want to proceed?
      `,header:()=>"Are you sure?",type:"neutral",confirmText:"No thanks"}).then(()=>O("set_clear_cache"),()=>{})});return[(0,b.createComponent)(Y,{get tag(){return pt.H1},get class(){return D.tophead},children:"Dorion Performance Settings"}),(0,b.createComponent)(Y,{get class(){return D.shead},children:"Cache"}),(0,b.createComponent)(W,{get value(){return e().cache_css},onChange:r=>t(g(f({},e()),{cache_css:r})),note:"Save CSS to disk that would otherwise be loaded from the web, decreasing load times.",children:"Cache CSS"}),(0,b.createComponent)(Y,{get class(){return D.shead},children:"Optional Features"}),(0,b.createComponent)(W,{get value(){return e().streamer_mode_detection},onChange:r=>t(g(f({},e()),{streamer_mode_detection:r})),note:"Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running.",children:"Streamer Mode detection"}),(0,b.createComponent)(W,{get value(){return e().rpc_server},onChange:r=>t(g(f({},e()),{rpc_server:r})),tooltipNote:"This is a work in progress, and won't do EVERYTHING arRPC does quite yet.",note:"Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Remember to enable the arRPC plugin!",children:"Integrated rich presence server"}),(()=>{let r=_t.cloneNode(!0);return(0,L.insert)(r,(0,b.createComponent)(V,{onClick:n,style:{width:"30%",padding:"18px"},grow:!0,children:"Save and Restart"}),null),(0,L.insert)(r,(0,b.createComponent)(V,{onClick:d,style:{width:"30%",padding:"18px"},grow:!0,children:"Clear WebData Cache"}),null),(0,L.insert)(r,(0,b.createComponent)(V,{onClick:l,style:{width:"30%",padding:"18px"},s:!0,grow:!0,children:"Clear CSS Cache"}),null),(0,$e.effect)(()=>(0,ve.className)(r,D.pbuttons)),r})()]}var De=o(s(),1),Oe=o(s(),1),qe=o(s(),1),Q=o(s(),1),_r=o(s(),1),y=o(s(),1);var Z=o(s(),1),M=o(s(),1),G=o(s(),1),Ne=o(s(),1),B=o(s(),1),ke=o(s(),1),q=o(s(),1);var we="._ddown_ccz23_1{box-sizing:border-box;font-size:16px;width:100%;border-radius:3px;color:var(--text-normal);background-color:var(--input-background);border:none;transition:border-color .2s ease-in-out;padding:10px;appearance:none;cursor:pointer}._dcontainer_ccz23_1{position:relative;width:100%}._dsarrow_ccz23_1{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}._dsarrow_ccz23_1 path{fill:var(--text-secondary)}",E={ddown:"_ddown_ccz23_1",dcontainer:"_dcontainer_ccz23_1",dsarrow:"_dsarrow_ccz23_1"};var xe=o(s(),1),ye=o(s(),1),Ce=o(s(),1),$t=(0,xe.template)('<svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"></path></svg>',4),Se=e=>(()=>{let t=$t.cloneNode(!0);return(0,Ce.effect)(()=>(0,ye.setAttribute)(t,"class",e.class)),t})();var bt=(0,Z.template)("<div><select></select></div>",4),wt=(0,Z.template)("<option></option>",2),{ui:{injectCss:xt}}=shelter,Pe=!1,A=e=>(Pe||(Pe=!0,xt(we)),(()=>{let t=bt.cloneNode(!0),n=t.firstChild;return(0,ke.addEventListener)(n,"change",e.onChange),(0,B.insert)(n,()=>{var l;return(l=e.options)==null?void 0:l.map(d=>(()=>{let r=wt.cloneNode(!0);return(0,B.insert)(r,()=>d.label),(0,q.effect)(()=>r.selected=d.value===(e==null?void 0:e.selected)),(0,q.effect)(()=>r.value=d.value),r})())}),(0,B.insert)(t,(0,Ne.createComponent)(Se,{get class(){return E.dsarrow}}),null),(0,q.effect)(l=>{let d=E.dcontainer,r=E.ddown,a=e.placeholder,c=e.id,u=e["aria-label"];return d!==l._v$&&(0,G.className)(t,l._v$=d),r!==l._v$2&&(0,G.className)(n,l._v$2=r),a!==l._v$3&&(0,M.setAttribute)(n,"placeholder",l._v$3=a),c!==l._v$4&&(0,M.setAttribute)(n,"id",l._v$4=c),u!==l._v$5&&(0,M.setAttribute)(n,"aria-label",l._v$5=u),l},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),(0,q.effect)(()=>n.value=e.value),t})());var ze="._shead_xdnpt_1{margin-top:16px;margin-bottom:8px}._sbutton_xdnpt_1{margin-top:16px;padding:18px;width:100%}._splitbutton_xdnpt_1{width:45%}._pbuttons_xdnpt_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;margin-top:16px}",z={shead:"_shead_xdnpt_1",sbutton:"_sbutton_xdnpt_1",splitbutton:"_splitbutton_xdnpt_1",pbuttons:"_pbuttons_xdnpt_1"};var yt=(0,De.template)("<div></div>",2),{invoke:T,process:Ct}=window.__TAURI__,{ui:{Header:Te,Button:K,HeaderTags:St,TextBox:Pt,injectCss:Nt},solid:{createSignal:F,createEffect:kt}}=shelter,je=!1;function Ae(){let[e,t]=F([]),[n,l]=F(""),[d,r]=F(""),[a,c]=F("");je||(je=!0,Nt(ze)),kt(()=>m(this,null,function*(){let i=yield T("get_profile_list");t(i);let p=JSON.parse(yield T("read_config_file"));l(p.profile||"default"),r(p.profile||"default")}));let u=()=>m(this,null,function*(){let i=JSON.parse(yield T("read_config_file"));i.profile=n(),yield T("write_config_file",{contents:JSON.stringify(i)}),Ct.relaunch()}),v=()=>m(this,null,function*(){yield T("delete_profile",{name:n()}),t(e().filter(i=>i!==n())),l(d())}),x=()=>m(this,null,function*(){yield T("create_profile",{name:a()}),e().includes(a())||t([...e(),a()]),l(a())}),P=i=>{c(i)};return[(0,y.createComponent)(Te,{get tag(){return St.H1},children:"Profiles"}),(0,y.createComponent)(A,{get options(){return e().map(i=>({label:i,value:i}))},placeholder:"Select profile...",maxVisibleItems:5,closeOnSelect:!0,onChange:i=>l(i),get selected(){return n()}}),(0,y.createComponent)(Te,{get class(){return z.shead},children:"Create Profile"}),(0,y.createComponent)(Pt,{type:"text",get value(){return a()},onInput:P,placeholder:"Enter a name for the new profile..."}),(0,y.createComponent)(K,{onClick:x,get class(){return z.sbutton},get disabled(){return a()===""||e().includes(a())},children:"Create Profile"}),(()=>{let i=yt.cloneNode(!0);return(0,Q.insert)(i,(0,y.createComponent)(K,{onClick:u,get class(){return z.splitbutton},children:"Save and Restart"}),null),(0,Q.insert)(i,(0,y.createComponent)(K,{onClick:v,get class(){return z.splitbutton},get disabled(){return n()==="default"||d()===n},children:"Delete Selected Profile"}),null),(0,qe.effect)(()=>(0,Oe.className)(i,z.pbuttons)),i})()]}var oe=o(s(),1),ne=o(s(),1),se=o(s(),1),I=o(s(),1),Pr=o(s(),1),_=o(s(),1);var Le=o(s(),1),Ee=o(s(),1),Me=o(s(),1),Be=o(s(),1),Fe=o(s(),1);var Ie="._card_1uk2u_1{border:1px solid var(--background-tertiary);border-radius:4px}",Re={card:"_card_1uk2u_1"};var zt=(0,Le.template)("<div></div>",2),{ui:{injectCss:Tt}}=shelter,He=!1,J=e=>(He||(He=!0,Tt(Ie)),(()=>{let t=zt.cloneNode(!0);return(0,Fe.insert)(t,()=>e.children),(0,Be.effect)(n=>{let l=Re.card,d=e.style;return l!==n._v$&&(0,Me.className)(t,n._v$=l),n._v$2=(0,Ee.style)(t,d,n._v$2),n},{_v$:void 0,_v$2:void 0}),t})());var te=o(s(),1),Ve=o(s(),1),w=o(s(),1),X=o(s(),1),C=o(s(),1),S=o(s(),1);var Je="._plist_6n8qv_1{display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-size:16px}._pheader_6n8qv_1{border-bottom:1px solid var(--background-tertiary);font-weight:bold;padding-bottom:16px}._plistrow_6n8qv_1{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;padding:16px}._plistrow_6n8qv_1 ._scell_6n8qv_1{display:flex;align-items:center;justify-content:center;width:30%}._plistrow_6n8qv_1 ._mcell_6n8qv_1{display:flex;align-items:center;justify-content:flex-start;width:50%}._left16_6n8qv_1{margin-left:16px}._top16_6n8qv_1{margin-top:16px}",h={plist:"_plist_6n8qv_1",pheader:"_pheader_6n8qv_1",plistrow:"_plistrow_6n8qv_1",scell:"_scell_6n8qv_1",mcell:"_mcell_6n8qv_1",left16:"_left16_6n8qv_1",top16:"_top16_6n8qv_1"};var jt=(0,te.template)("<div><div><div></div><div></div><div></div></div></div>",10),Dt=(0,te.template)("<div><div></div><div></div><div></div></div>",8),{ui:{Switch:Ue,Text:U,injectCss:Ot},solid:{createSignal:qt}}=shelter,{invoke:ee}=window.__TAURI__,We=!1,At=()=>m(void 0,null,function*(){return yield ee("get_plugin_list")});function Ye(){We||(We=!0,Ot(Je));let[e,t]=qt([]);return m(this,null,function*(){t(yield At())}),(0,S.createComponent)(J,{style:{marginTop:"1rem"},get children(){let n=jt.cloneNode(!0),l=n.firstChild,d=l.firstChild,r=d.nextSibling,a=r.nextSibling;return(0,C.insert)(d,(0,S.createComponent)(U,{get class(){return h.left16},children:"Plugin Name"})),(0,C.insert)(r,(0,S.createComponent)(U,{get class(){return h.left16},children:"Enabled?"})),(0,C.insert)(a,(0,S.createComponent)(U,{get class(){return h.left16},children:"Preload?"})),(0,C.insert)(n,()=>e().map(c=>(()=>{let u=Dt.cloneNode(!0),v=u.firstChild,x=v.nextSibling,P=x.nextSibling;return(0,C.insert)(v,(0,S.createComponent)(U,{get class(){return h.left16},get children(){return c.name}})),(0,C.insert)(x,(0,S.createComponent)(Ue,{get value(){return!c.disabled},onChange:i=>{ee("toggle_plugin",{name:c.name}),t(e().map(p=>(p.name===c.name&&(p.disabled=!p.disabled),p)))},style:{flexDirection:"column-reverse"}})),(0,C.insert)(P,(0,S.createComponent)(Ue,{get checked(){return c.preload},onChange:i=>{ee("toggle_preload",{name:c.name}),t(e().map(p=>(p.name===c.name&&(p.preload=!p.preload),p)))}})),(0,X.effect)(i=>{let p=c.name,ae=h.plistrow,ie=h.mcell,le=h.scell,ce=h.scell;return p!==i._v$6&&(0,Ve.setAttribute)(u,"key",i._v$6=p),ae!==i._v$7&&(0,w.className)(u,i._v$7=ae),ie!==i._v$8&&(0,w.className)(v,i._v$8=ie),le!==i._v$9&&(0,w.className)(x,i._v$9=le),ce!==i._v$10&&(0,w.className)(P,i._v$10=ce),i},{_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0}),u})()),null),(0,X.effect)(c=>{let u=h.plist,v=h.pheader+" "+h.plistrow,x=h.mcell,P=h.scell,i=h.scell;return u!==c._v$&&(0,w.className)(n,c._v$=u),v!==c._v$2&&(0,w.className)(l,c._v$2=v),x!==c._v$3&&(0,w.className)(d,c._v$3=x),P!==c._v$4&&(0,w.className)(r,c._v$4=P),i!==c._v$5&&(0,w.className)(a,c._v$5=i),c},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),n}})}var Ge="._shead_1s6h6_1{margin-top:16px;margin-bottom:8px}._fcard_1s6h6_1{display:flex;flex-direction:row;justify-content:space-between;align-items:center;color:var(--text-primary);padding:8px}._pcard_1s6h6_1{display:flex}._left16_1s6h6_1{margin-left:16px}",$={shead:"_shead_1s6h6_1",fcard:"_fcard_1s6h6_1",pcard:"_pcard_1s6h6_1",left16:"_left16_1s6h6_1"};var Ze=(0,oe.template)("<div></div>",2),It=(0,oe.template)('<a href="https://github.com/SpikeHD/shelter-plugins" target="_blank">SpikeHD/shelter-plugins</a>',2),{ui:{SwitchItem:N,Button:re,Text:Ke,Header:k,HeaderTags:Rt,Slider:Ht,injectCss:Lt},solid:{createSignal:Qe,createEffect:Et}}=shelter,{invoke:R,process:Mt}=window.__TAURI__,Xe=!1,Bt=()=>m(void 0,null,function*(){return(yield R("get_theme_names")).map(t=>({label:t.replace(/"/g,"").replace(".css","").replace(".theme",""),value:t.replace(/"/g,"")}))}),Ft=()=>{R("open_plugins")},Jt=()=>{R("open_themes")};function et(){let[e,t]=Qe({zoom:"1.0",client_type:"default",sys_tray:!1,push_to_talk:!1,push_to_talk_keys:[],theme:"none",use_native_titlebar:!1,start_maximized:!1,open_on_startup:!1,startup_minimized:!1,autoupdate:!1,update_notify:!0}),[n,l]=Qe([]);Xe||(Xe=!0,Lt(Ge)),Et(()=>m(this,null,function*(){t(JSON.parse(yield R("read_config_file"))),l(yield Bt())}));let d=()=>m(this,null,function*(){yield R("write_config_file",{contents:JSON.stringify(e())}),Mt.relaunch()});return[(0,_.createComponent)(k,{get tag(){return Rt.H1},children:"Dorion Settings"}),(0,_.createComponent)(k,{get class(){return $.shead},children:"Theme"}),(0,_.createComponent)(A,{get value(){return e().theme},onChange:r=>{t(a=>g(f({},a),{theme:r.target.value}))},placeholder:"Select a theme...",get options(){return[{label:"None",value:"none"},...n()]},get selected(){return e().theme}}),(0,_.createComponent)(k,{get class(){return $.shead},children:"Client Type"}),(0,_.createComponent)(A,{options:[{label:"Default",value:"default"},{label:"Canary",value:"canary"},{label:"PTB",value:"ptb"}],placeholder:"Select a client type...",maxVisibleItems:5,closeOnSelect:!0,onChange:r=>{t(a=>g(f({},a),{client_type:r.target.value}))},get selected(){return e().client_type}}),(0,_.createComponent)(k,{get class(){return $.shead},children:"Window"}),(0,_.createComponent)(Ht,{min:50,max:125,get steps(){return Array.from(Array(16).keys()).map(r=>r*5+50+"%")},step:5,get value(){return parseFloat(e().zoom)*100},onInput:r=>{t(a=>g(f({},a),{zoom:(parseFloat(r)/100).toString()}))}}),(0,_.createComponent)(N,{get value(){return e().sys_tray},onChange:r=>{t(a=>g(f({},a),{sys_tray:r}))},note:"Instead of closing, Dorion will run in the background and will be accessible via the system tray.",children:"Minimize to System Tray"}),(0,_.createComponent)(N,{get value(){return e().start_maximized},onChange:r=>{t(a=>g(f({},a),{start_maximized:r}))},children:"Start Maximized"}),(0,_.createComponent)(k,{get class(){return $.shead},children:"Startup"}),(0,_.createComponent)(N,{get value(){return e().open_on_startup},onChange:r=>{t(a=>g(f({},a),{open_on_startup:r}))},note:"Open Dorion when your system starts.",children:"Open on Startup"}),(0,_.createComponent)(N,{get value(){return e().startup_minimized},get disabled(){return!e().open_on_startup},onChange:r=>{t(a=>g(f({},a),{startup_minimized:r}))},note:"Open in the background when your system starts.",children:"Start Minimized"}),(0,_.createComponent)(k,{get class(){return $.shead},children:"Misc."}),(0,_.createComponent)(N,{get value(){return e().use_native_titlebar},onChange:r=>{t(a=>g(f({},a),{use_native_titlebar:r}))},note:"Disable the custom titlebar and use your systems native one instead.",children:"Use Native Titlebar"}),(0,_.createComponent)(N,{get value(){return e().autoupdate},onChange:r=>{t(a=>g(f({},a),{autoupdate:r}))},get note(){return["Automatically update various Dorion components, such as"," ",It.cloneNode(!0),"."]},children:"Autoupdate"}),(0,_.createComponent)(N,{get value(){return e().update_notify===void 0||e().update_notify},onChange:r=>{t(a=>g(f({},a),{update_notify:r}))},get disabled(){return e().autoupdate},children:"Notify me of updates"}),(0,_.createComponent)(J,{style:{marginTop:"1rem"},get children(){return[(()=>{let r=Ze.cloneNode(!0);return(0,I.insert)(r,(0,_.createComponent)(Ke,{get class(){return $.left16},children:"Plugins Folder"}),null),(0,I.insert)(r,(0,_.createComponent)(re,{onClick:Ft,children:"Open"}),null),(0,se.effect)(()=>(0,ne.className)(r,$.fcard)),r})(),(()=>{let r=Ze.cloneNode(!0);return(0,I.insert)(r,(0,_.createComponent)(Ke,{get class(){return $.left16},children:"Themes Folder"}),null),(0,I.insert)(r,(0,_.createComponent)(re,{onClick:Jt,children:"Open"}),null),(0,se.effect)(()=>(0,ne.className)(r,$.fcard)),r})()]}}),(0,_.createComponent)(k,{get class(){return $.shead},children:"Plugins"}),(0,_.createComponent)(Ye,{}),(0,_.createComponent)(re,{onClick:d,style:{"margin-top":"1rem",padding:"18px"},grow:!0,children:"Save & Restart"})]}var{settings:{registerSection:H}}=shelter,Ut=[H("divider"),H("header","Dorion"),H("section","dorion-settings","Dorion Settings",et),H("section","dorion-performance","Performance & Extras",be),H("section","dorion-profiles","Profiles",Ae)],Wt=()=>{Ut.forEach(e=>e())};return dt(Vt);})();
