/*!
 * 
 * helloThemeChild
 * 
 * @author Kye Buffery
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Kye Buffery
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackiohelloThemeChildmainJsonp=window.wpackiohelloThemeChildmainJsonp||[]).push([[0],[function(e,t,a){a(1),a(3),e.exports=a(2)},function(e,t,a){var n="helloThemeChilddist".replace(/[^a-zA-Z0-9_-]/g,"");a.p=window["__wpackIo".concat(n)]},function(e,t,a){"use strict";a.r(t)},function(e,t,a){"use strict";function n(e,t){var a=!1;return function(){a||(e.apply(this,arguments),a=!0,setTimeout((function(){a=!1}),t))}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,a){return t&&i(e.prototype,t),a&&i(e,a),e}function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t);var l=function(){function e(){o(this,e),s(this,"carousels",[]),this.carousels=document.querySelectorAll(".js-product-carousel ul.products")}return r(e,[{key:"init",value:function(){this.carousels.forEach((function(e){var t=5;e.parentNode.className.indexOf("related")>-1&&(t=Array.from(e.children).length<5?Array.from(e.children).length:5),jQuery(e).slick({dots:!1,infinite:!1,speed:300,slidesToShow:t,slidesToScroll:t,responsive:[{breakpoint:768,settings:{slidesToShow:3.25,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:2.4,slidesToScroll:1}}]})}))}}]),e}(),c=function(){function e(){o(this,e),s(this,"carousels",[]),this.carousels=document.querySelectorAll(".single-post .elementor-posts")}return r(e,[{key:"init",value:function(){this.carousels.forEach((function(e){jQuery(e).slick({dots:!1,infinite:!1,speed:300,slidesToShow:3,slidesToScroll:1,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',responsive:[{breakpoint:768,settings:{slidesToShow:2.2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1.1,slidesToScroll:1}}]})}))}}]),e}();document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".single-post__sidebar .elementor-toc__header"),t=document.querySelector(".single-post__sidebar .single-post__sidebar-author-meta"),a=document.querySelector(".single-post__sidebar .elementor-toc__toggle-button--expand"),o=document.querySelector(".single-post__sidebar .elementor-toc__toggle-button--collapse");document.querySelectorAll(".single-post__author-image, .single-post__author-name, .single-post__sidebar-author-meta"),e&&o&&a&&window.addEventListener("scroll",n((function(e){if(e.target!==document)return!1;var n=t.getBoundingClientRect();if(window.innerWidth<992)return!1;n.top+n.height-88<=0?o.click():a.click()})),200);var i=document.querySelector(".title-comments"),r=document.querySelector("#comments");if(r&&!r.querySelector(".comment-list")){var s=document.createElement("p");s.textContent="Be the first to comment!",s.className="first-to-comment",r.appendChild(s)}if(i){var d=i.textContent.split(" ")[0];i.innerHTML='<span class="title-comments__count">'.concat(d,"</span> Comments")}var u=0;document.addEventListener("focusin",(function(e){var t=e.target;t.matches(".xoo-wsc-qty")&&(u=+t.value)})),document.addEventListener("focusout",(function(e){var t=e.target;t.matches(".xoo-wsc-qty")&&(N(+t.value-u),u=0)}));var m=document.querySelector(".header-main__nav-items--shop"),h=document.querySelector(".header-main"),v=document.querySelector("#xoo-wsc-style-inline-css"),p=v.textContent;function g(){var e=0;e=innerWidth<992?h.getBoundingClientRect().height:m.getBoundingClientRect().top+m.getBoundingClientRect().height,v.textContent=p+" .xoo-wsc-container { top: "+e+"px !important; }\t.xoo-wsc-modal .xoo-wsc-opac {top: "+e+"px !important; }"}window.addEventListener("scroll",n(g,200)),setTimeout((function(){document.querySelector(".header-main__search-wrapper .dgwt-wcas-search-wrapp").style["animation-duration"]=".4s"}),500);var f=document.querySelector(".variations_form.cart");if(f){var y=f.querySelector("select#type");if(y){var _=function(e){e||(b.style.display="none");var t=document.createElement("a");t.className="elementor-button button--ebook",t.style.textTransform="uppercase",t.style.marginLeft="10px",t.textContent="Buy from Amazon",t.target="_blank",f.querySelector(".button--ebook")||"canada"===window.CUSTOMER_LOCATION&&(t.href="https://www.amazon.ca/Van-Conversion-Bible-Converting-Campervan/dp/1800493983",b.style.display="none",b.parentNode.appendChild(t))},b=f.querySelector(".single_add_to_cart_button"),C=document.createElement("a");C.href="https://play.google.com/store/books/details/The_Van_Conversion_Bible_The_Ultimate_Guide_to_Con?id=egIrEAAAQBAJ",C.className="elementor-button button--ebook",C.style.textTransform="uppercase",C.style.marginLeft="10px",C.textContent="Buy from Google Play",C.target="_blank",_(!0),y.addEventListener("change",(function(e){if("unknown"===window.CUSTOMER_LOCATION)return!1;"Ebook"===e.target.value?"europe"===window.CUSTOMER_LOCATION?(b.parentNode.appendChild(C),b.style.display="none"):(b.style.display="block",Array.from(f.querySelectorAll(".button--ebook")).forEach((function(e){return e.remove()}))):"Hardback book"===e.target.value&&(_(),"europe"===window.CUSTOMER_LOCATION&&(b.style.display="block",Array.from(f.querySelectorAll(".button--ebook")).forEach((function(e){return e.remove()}))))}))}}Array.from(document.querySelectorAll(".header-main__nav > .header-main__nav-items > .header-main__nav-item, .header-main__nav > .header-main__nav-items > .header-main__nomadic")).forEach((function(e,t){t&&(e.addEventListener("mouseenter",n((function(e){document.body.classList.add("shade"),document.querySelector("html").classList.add("shade")}),100)),e.addEventListener("mouseleave",n((function(e){if(T)return!1;document.body.classList.remove("shade"),document.querySelector("html").classList.remove("shade")}),100)))})),(new l).init(),(new c).init();var w=document.querySelector(".header-main__ecologi-image");w&&fetch("https://public.ecologi.com/users/climbingvan/impact").then((function(e){return e.json()})).then((function(e){var t=document.createElement("div");t.innerHTML='<span class="trees">'.concat(e.trees.toLocaleString(),"</span>")+" trees planted",t.className="header-main__ecologi-image__text",w.appendChild(t)}));var S=Array.from(document.querySelectorAll(".dgwt-wcas-search-input"));function k(e){e.target.value?e.target.parentNode.classList.add("has-value"):e.target.parentNode.classList.remove("has-value")}function q(){if(["AT","BE","BG","CZ","CY","DE","DK","EE","ES","FI","FR","GR","HR","HU","IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI","SK"].includes(jQuery("select[name=billing_country]").val())){var e=document.querySelector('.product-name [alt*="ebook"]');if(e){var t=e.parentNode.querySelector("#remove-link");location.href=t.href+"&remove_ebook=1"}}}jQuery((function(e){e(document.body).on("change","select[name=billing_country]",q)})),S.length&&(S.forEach((function(e){return e.addEventListener("input",k)})),S.forEach((function(e){return e.addEventListener("blur",k)})));var L=document.querySelector(".cart_item .qty");L&&L.addEventListener("blur",(function(e){innerWidth>767||e.target.parentNode.nextElementSibling.click()})),toastr&&(toastr.options.timeOut=1e4,toastr.options.extendedTimeOut=1e4);var x=document.querySelector('[value*="free_shipping"]');document.querySelector(".woocommerce-checkout")&&x&&(document.addEventListener("change",(function(e){e.target.matches('[value*="free_shipping"]')&&e.target.checked&&toastr.info(window.LOCALISED_VARS.checkoutPopup)})),(x.checked||x&&document.getElementById("shipping_method").children.length<2)&&toastr.info(window.LOCALISED_VARS.checkoutPopup));var E=!1,T=!1,A=!1;function N(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=document.querySelectorAll(".cart-count");a.forEach((function(a){var n=t?e:+a.textContent+e;a.textContent=n,n?a.classList.remove("hide"):a.classList.add("hide")}))}document.addEventListener("click",(function(e){var t=e.target;if(t.matches(".remove")&&N(-t.parentNode.previousElementSibling.querySelector(".qty").value),t.matches(".xoo-wsc-smr-del")&&N(-t.parentNode.previousElementSibling.querySelector(".xoo-wsc-qty").value),t.matches('[name="update_cart"]')&&N(Array.from(document.querySelectorAll(".product-quantity .qty")).reduce((function(e,t){return e+ +t.value}),0),!0),t.matches(".single_add_to_cart_button")&&N(+t.previousElementSibling.querySelector(".qty").value),t.matches(".xoo-wsc-opac")&&document.querySelector(".xoo-wsch-close").click(".xoo-wsc-cart-trigger"),(t.matches(".xoo-wsc-cart-trigger")||t.parentNode&&t.parentNode.matches(".xoo-wsc-cart-trigger"))&&(A&&document.querySelector(".xoo-wsch-close").click(),A=!A))return g();if(t.matches(".header-main__search")&&(document.body.classList.toggle("shade"),document.querySelector("html").classList.toggle("shade"),document.querySelector(".header-main__search-mobile-wrapper input").focus()),t.matches(".header-main__search-btn")&&(document.querySelector(".header-main__nomadic").classList.toggle("hidden"),document.body.classList.toggle("shade"),document.querySelector("html").classList.toggle("shade"),document.querySelector(".header-main__search-wrapper").classList.toggle("open"),t.previousElementSibling.className.indexOf("open")>-1?(T=!0,document.querySelector(".header-main__search-wrapper input").focus(),document.body.classList.add("search-open")):(T=!1,document.body.classList.remove("search-open"))),t.matches("#main-search")&&(document.querySelector(".header-main__search-mobile-wrapper").classList.toggle("open"),document.querySelector(".header-main__search-mobile-wrapper").className.indexOf("open")>-1?(document.body.classList.add("search-open"),T=!0):(document.querySelector(".dgwt-wcas-close").click(),document.body.classList.add("search-open"),T=!1)),t.matches(".badge__link")||t.matches('[href^="https://www.cusrev.com/reviews]'))e.preventDefault();else{if(t.matches(".widgettitle")&&(t.parentNode.classList.toggle("closed"),t.classList.toggle("closed"),t.className.indexOf("closed")>-1?t.nextElementSibling.style.display="none":t.nextElementSibling.style.display="block"),t.matches("#btn-filter")){var a=document.querySelector(".category-filters");innerWidth<992&&(a.classList.toggle("show"),a.className.indexOf("show")>-1?t.textContent="Close":t.textContent="Filter")}if(t.matches("[data-filter]")){var n=document.querySelector(".products"),o=document.querySelector(".category-filters");n.innerHTML="",innerWidth<992&&(o.classList.remove("show"),document.querySelector("#btn-filter").textContent="Filters")}if(t.matches(".fa-bars")){E=!E,jQuery(".header-main__nav").toggleClass("show"),document.body.classList.toggle("shade"),document.querySelector("html").classList.toggle("shade");var i=document.querySelector(".header-main__nav-items--shop"),r=document.querySelector(".header-main__nav-items:first-of-type");i.style.top=r.getBoundingClientRect().height+"px",i.style.transition="top 0s ease-in-out",setTimeout((function(){i.style.transition="top 0.3s ease-in-out"}),50)}var s=t.matches(".fa-chevron-down")&&t.parentNode.matches(".header-main__nav-link");if(t.matches(".header-main__nav-link")||s){if(innerWidth>=992)return;var l=s?t.parentNode:t;if(!l.nextElementSibling||l.matches(".header-main__nav-item--parent"))return;if(l.matches(".header-main__nav-link--book-large")||l.matches(".header-main__nav-link--list"))return;e.preventDefault();var c=l.nextElementSibling;c.classList.add("active");var d=document.createElement("button");d.setAttribute("data-shop-btn",l.matches(".header-main__nav-link--shop")),d.textContent="Back",d.className="header-main__back";var u=document.createElement("i");if(u.className="fas fa-chevron-down",d.prepend(u),c.append(d),!l.matches(".header-main__nav-link--book-large")){var m=c.previousElementSibling.cloneNode(!0);m.classList.add("header-main__nav-item--parent"),c.prepend(m)}if(l.matches(".header-main__nav-link--shop"))return;document.querySelector(".header-main__nav-items:first-of-type").style.height=d.getBoundingClientRect().height+d.getBoundingClientRect().top+"px",document.querySelector(".header-main__nav-items--shop").style.top="calc(".concat(d.getBoundingClientRect().height+d.getBoundingClientRect().top+"px"," - 2rem)")}if(t.matches(".header-main__back")){if(innerWidth>=992)return;e.preventDefault();var h=t.parentNode;h.classList.remove("active");var v=h.querySelector(".header-main__nav-item--parent");v&&v.remove();var p=t.parentNode.parentNode.parentNode,f=Array.from(p.children).pop();if(t.remove(),"true"===t.getAttribute("data-shop-btn"))return;document.querySelector(".header-main__nav-items:first-of-type").style.height=f.getBoundingClientRect().height+f.getBoundingClientRect().top+"px",document.querySelector(".header-main__nav-items--shop").style.top="calc(".concat(f.getBoundingClientRect().height+f.getBoundingClientRect().top+"px"," - 2rem)")}E&&t.matches("body")&&(document.body.classList.remove("shade"),document.querySelector("html").classList.remove("shade"),document.querySelector(".header-main__nav").classList.remove("show"),E=!1),T&&t.matches("body")&&(innerWidth>=992?document.querySelector(".header-main__search-btn").click():document.querySelector(".header-main__search").click(),T=!1)}}));var O=document.querySelector(".category-filters .elementor-column-wrap"),B=document.querySelector('[data-elementor-type="footer"]');if(O){var R=function(){return Array.from(document.querySelectorAll(".header-main__nav-items--shop")).reduce((function(e,t){return e+t.offsetHeight}),0)},M=function(){if(innerWidth<992)return!1;W=R();var e=O.getBoundingClientRect();if(O.style.height="calc(100vh - ".concat(W,"px)"),e.top+I.getBoundingClientRect().height<=W){if(D)return;D=!0,O.style.position="sticky",O.style.top=W+"px",O.classList.add("sticky"),I.style.display="none"}else{if(I.style.display="block",!D)return;D=!1,O.style.position="static",O.classList.remove("sticky")}},W=R(),D=!1,I=O.querySelector(".category-title");M(),window.addEventListener("scroll",n(M,50))}var j=document.querySelector(".products"),H=document.querySelector(".help-banner");if(j&&!document.querySelector(".category-description")&&innerWidth>992){var P=document.querySelector(".products-wrapper"),Q=document.querySelector(".post-type-archive-product .elementor-widget-woocommerce-products");Q&&(Q.style.marginTop="-20px"),P&&(document.querySelector(".products-wrapper").style.marginTop="0")}if(j&&H){var U=12,V=!1,z=!1;j.style["grid-row-gap"]=0,window.addEventListener("scroll",n((function(){return!z&&(U>j.children.length?(z=!0,H.style.opacity=1,!1):void(!V&&window.pageYOffset>document.documentElement.scrollHeight-window.innerHeight-B.clientHeight-300&&(V=!0,U+=12,Array.from(j.children).slice(0,U).forEach((function(e){e.classList.add("show")})),V=!1)))}),200))}}),!1),jQuery(document).ready((function(e){var t=null,a=null,n=["subnavigation-categories","subnavigation-category","header-subnavigation","header-main__nav-items","header-main__nav-item","header-main__nav-link","header-main","header-navigation","main-navigation-item"],o=!1,i=e(window).outerWidth();function r(){var a=window.location.pathname;if(("/"==a||a.indexOf("product")>-1||a.indexOf("product-category")>-1)&&i>991){var n=e(".main-navigation a.shop-menu-link");n.addClass("active"),n.parent("li").addClass("active"),e("#vanLifeMenu").addClass("hide"),e("#vanConversionMenu").addClass("hide"),e(".header-subnavigation").removeClass("hide"),e("#shopMenu").removeClass("hide"),e("[data-elementor-type='header']").addClass("menu-spacer"),t=n}}e(window).click((function(o){if(null!=t||null!=a){var i=e(o.target),r=function(t){for(var a=0;a<n.length;a++)if(e(t).hasClass(n[a]))return!1;return!0}(i);t&&i[0]!=t[0]&&a&&i[0]!=a[0]&&r&&(e(".header-subnavigation").addClass("hide"),e("[data-elementor-type='header']").removeClass("menu-spacer"),e(a).siblings("ul").hide(),e(a).siblings(".book-large").hide(),t=null,a=null,e(".main-navigation li").removeClass("active"),e(".subnavigation-categories").addClass("hide"),e(".header-main__nomadic-ad").addClass("hide"),e(".main-navigation a").removeClass("active")),null!=t&&null==a&&r&&i[0]!=t[0]&&(e(".header-subnavigation").addClass("hide"),e(".main-navigation li").removeClass("active"),e(".main-navigation a").removeClass("active"),e("[data-elementor-type='header']").removeClass("menu-spacer"),t=null),null!=a&&r&&i[0]!=a[0]&&(e(a).siblings("ul").hide(),a=null)}})),e(".main-navigation a").hover((function(a){e(".main-navigation li").removeClass("active"),e(".main-navigation a").removeClass("active"),e(".header-subnavigation").addClass("hide"),e(this).addClass("active"),e("#shopMenu").addClass("hide"),e("#vanLifeMenu").addClass("hide"),e("#vanConversionMenu").addClass("hide"),e(this).hasClass("shop-menu-link")&&(a.preventDefault(),e(this).parent("li").addClass("active"),e(".header-subnavigation").removeClass("hide"),e("#shopMenu").removeClass("hide"),e(".header-main__nomadic-ad").addClass("hide"),e("[data-elementor-type='header']").addClass("menu-spacer")),e(this).hasClass("nomadic-energy-link")&&(a.preventDefault(),e(this).parent("li").addClass("active"),e(".header-subnavigation").removeClass("hide"),e(".subnavigation-categories").addClass("hide"),e(".header-main__nomadic-ad").removeClass("hide")),e(this).hasClass("van-conversion-menu-link")&&(a.preventDefault(),e(this).parent("li").addClass("active"),e(".header-subnavigation").removeClass("hide"),e(".subnavigation-categories").addClass("hide"),e("#vanConversionMenu").removeClass("hide"),e(".header-main__nomadic-ad").addClass("hide")),e(this).hasClass("van-life-menu-link")&&(a.preventDefault(),e(this).parent("li").addClass("active"),e(".header-subnavigation").removeClass("hide"),e(".subnavigation-categories").addClass("hide"),e("#vanLifeMenu").removeClass("hide"),e(".header-main__nomadic-ad").addClass("hide")),t=e(this)})),e(".header-subnavigation .subnavigation-link").hover((function(t){t.preventDefault(),null!=a&&(e(a).siblings("ul").hide(),e(a).siblings(".book-large").hide()),e(this).hasClass("header-main__nav-link--book-large")?e(this).siblings(".book-large").css("display","block"):e(this).siblings("ul").css("display","flex"),a=e(this)})),e(".menu-switcher").click((function(t){t.preventDefault();var a=e(".header-navigation > .center-navigation > .search-bar"),n=a.hasClass("hide");e(window).outerWidth()<992?e(".main-menu > .header-main__search-mobile-wrapper").toggleClass("open"):n?(a.removeClass("hide"),e(".main-navigation").addClass("hide"),e(".main-navigation li").removeClass("active"),e(this).removeClass("menu-mode").addClass("search-mode")):(a.addClass("hide"),e(".main-navigation").removeClass("hide"),e(this).removeClass("search-mode").addClass("menu-mode"),setTimeout((function(){r()}),100))})),e(".mobile-menu-icon").click((function(){(o=!o)?(e(".mobile-navigation").addClass("show"),e(".main-menu > .header-main__search-mobile-wrapper").removeClass("open")):(e(".mobile-navigation").removeClass("show"),e(".main-menu > .header-main__search-mobile-wrapper").removeClass("open"))})),e(window).resize((function(){var n;(n=e(window).outerWidth())>991&&o&&(o=!1,e(".mobile-navigation").removeClass("show")),n<992&&t&&(e(".header-subnavigation").addClass("hide"),e(a).siblings("ul").hide(),e(a).siblings(".book-large").hide(),t=null,a=null,e(".main-navigation li").removeClass("active"),e(".subnavigation-categories").addClass("hide"),e(".header-main__nomadic-ad").addClass("hide"),e(".main-navigation a").removeClass("active")),n<992&e(".menu-switcher").hasClass("search-mode")&&(e(".header-navigation > .center-navigation > .search-bar").addClass("hide"),e(".menu-switcher").removeClass("search-mode").addClass("menu-mode"))})),r(),e("input#keywordSearch").keyup((function(){0==e(this).val().length?(e(".header-navigation .search-bar .close").hide(),e(".header-navigation .search-bar .search").replaceWith('<i class="fas fa-search search"></i>')):(e(".header-navigation .search-bar .close").show(),e(".header-navigation .search-bar .search").hasClass("fa-spin")&&e(".header-navigation .search-bar .search").replaceWith('<i class="fas fa-search search"></i>'))})),e(".header-navigation .search-bar .close").hide()}))}],[[0,1]]]);
//# sourceMappingURL=main-5a7dcfaa.js.map