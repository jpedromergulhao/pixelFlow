import { PixelFlowConfig } from "@jpmergulhao/pixelflow-types";

// Inicializador para Vue, Angular, Vanilla JS
export const initPixelFlow = (config: PixelFlowConfig) => {
    if (typeof window === "undefined") return; // Proteção para SSR

    if (config.metaId) {
        // 1. Cria a tag script apenas com o JavaScript puro
        const script = document.createElement("script");
        script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${config.metaId.trim()}');
      fbq('track', 'PageView');
    `;
        document.head.appendChild(script);

        // 2. A tag noscript (fallback para quem desativa JS) deve ser injetada separadamente
        const noscript = document.createElement("noscript");
        const img = document.createElement("img");
        img.height = 1;
        img.width = 1;
        img.style.display = "none";
        img.src = `https://www.facebook.com/tr?id=${config.metaId.trim()}&ev=PageView&noscript=1`;
        noscript.appendChild(img);
        document.head.appendChild(noscript);
    }

    if (config.pinterestId) {
        const script = document.createElement("script");
        script.innerHTML = `
      !function(e){if(!window.pintrk){window.pintrk = function () {
      window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
      n=window.pintrk;n.queue=[],n.version="3.0";var
      t=document.createElement("script");t.async=!0,t.src=e;var
      r=document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
      pintrk('load', '${config.pinterestId.trim()}');
      pintrk('page');
    `;
        document.head.appendChild(script);

        const noscript = document.createElement("noscript");
        const img = document.createElement("img");
        img.height = 1;
        img.width = 1;
        img.style.display = "none";
        img.src = `https://ct.pinterest.com/v3/?event=init&tid=${config.pinterestId.trim()}&noscript=1`;
        noscript.appendChild(img);
        document.head.appendChild(noscript);
    }

    if (config.tiktokId) {
        const script = document.createElement("script");
        script.innerHTML = `
      !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load('${config.tiktokId.trim()}');
      ttq.page();
      }(window, document, 'ttq');
    `;
        document.head.appendChild(script);
    }

    if (config.googleId) {
        const externalScript = document.createElement("script");
        externalScript.async = true;
        externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleId.trim()}`;
        document.head.appendChild(externalScript);

        const inlineScript = document.createElement("script");
        inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.googleId.trim()}');
    `;
        document.head.appendChild(inlineScript);
    }
};