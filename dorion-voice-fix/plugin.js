(()=>{var s=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var d=(e,t)=>{for(var o in t)s(e,o,{get:t[o],enumerable:!0})},i=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of c(t))!p.call(e,n)&&n!==o&&s(e,n,{get:()=>t[n],enumerable:!(r=a(t,n))||r.enumerable});return e};var u=e=>i(s({},"__esModule",{value:!0}),e);var f={};d(f,{onUnload:()=>S});var{flux:{stores:{MediaEngineStore:h}},patcher:l}=shelter,x=l.instead("isSupported",h,()=>!0),S=()=>x();return u(f);})();
