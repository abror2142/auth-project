"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[436],{2436:(t,e,o)=>{o.r(e),o.d(e,{default:()=>s,generateCsrfHeaders:()=>i,generateCsrfToken:()=>a,removeCsrfToken:()=>c});o(6918),o(3792),o(2062),o(4743),o(1745),o(8309),o(6573),o(8100),o(7936),o(9432),o(6099),o(7495),o(906),o(1489),o(8140),o(1630),o(2170),o(5044),o(1920),o(1694),o(9955),o(1903),o(1134),o(3206),o(4496),o(6651),o(2887),o(9369),o(6812),o(8995),o(1575),o(6072),o(8747),o(8845),o(9423),o(7301),o(373),o(6614),o(1405),o(7467),o(4732),o(3684),o(9577),o(1454),o(2207),o(5815),o(4979),o(9739);var r=/^[-_a-zA-Z0-9]{4,22}$/,n=/^[-_\/+a-zA-Z0-9]{24,}$/;function a(t){var e=t.querySelector('input[data-controller="csrf-protection"], input[name="_csrf_token"]');if(e){var o=e.getAttribute("data-csrf-protection-cookie-value"),a=e.value;if(!o&&r.test(a)&&(e.setAttribute("data-csrf-protection-cookie-value",o=a),e.defaultValue=a=btoa(String.fromCharCode.apply(null,(window.crypto||window.msCrypto).getRandomValues(new Uint8Array(18)))),e.dispatchEvent(new Event("change",{bubbles:!0}))),o&&n.test(a)){var i=o+"_"+a+"="+o+"; path=/; samesite=strict";document.cookie="https:"===window.location.protocol?"__Host-"+i+"; secure":i}}}function i(t){var e={},o=t.querySelector('input[data-controller="csrf-protection"], input[name="_csrf_token"]');if(!o)return e;var a=o.getAttribute("data-csrf-protection-cookie-value");return n.test(o.value)&&r.test(a)&&(e[a]=o.value),e}function c(t){var e=t.querySelector('input[data-controller="csrf-protection"], input[name="_csrf_token"]');if(e){var o=e.getAttribute("data-csrf-protection-cookie-value");if(n.test(e.value)&&r.test(o)){var a=o+"_"+e.value+"=0; path=/; samesite=strict; max-age=0";document.cookie="https:"===window.location.protocol?"__Host-"+a+"; secure":a}}}document.addEventListener("submit",(function(t){a(t.target)}),!0),document.addEventListener("turbo:submit-start",(function(t){var e=i(t.detail.formSubmission.formElement);Object.keys(e).map((function(o){t.detail.formSubmission.fetchRequest.headers[o]=e[o]}))})),document.addEventListener("turbo:submit-end",(function(t){c(t.detail.formSubmission.formElement)}));const s="csrf-protection-controller"}}]);