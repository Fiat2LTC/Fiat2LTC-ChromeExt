// content.js
var theCurrency = 'USD';
var litesOnly = false;
// Saves options to chrome.storage
    '{border: 1px solid #027ce894; display: inline-block; padding: 0px 4px; margin: 2px 2px 0px; text-decoration: none; cursor: pointer; transition: all .2s ease-in-out; border-radius: 2px; box-shadow: 0 0px 4px 0 rgba(0,0,0,0.1), 0 0px 4px 0 #027ce830; background-color: #0000; color: #027ce8 !important;}'
var metaTag = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; font-src \'self\' data: fonts.googleapis.com;"';
var style = $('<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"><style id="f2lcss">#ltcMenu {font-family: "Raleway", "Open Sans", Helvetica, Arial, sans-serif; border:none;padding:0px;height: 50px;position: fixed;z-index: 99999;left:0px;top:0px} a.optC, a.optX, a.optLites, a.optLTC { letter-spacing: normal; line-height: 16px; font-weight: 500; font-size: 14px; border: 1px solid #027ce894; display: inline-block; padding: 0px 1px; margin: 0px 1px 2px 2px; text-decoration: none; cursor: pointer; transition: all .2s ease-in-out; border-radius: 2px; box-shadow: 0 0px 4px 0 rgba(0,0,0,0.1), 0 0px 4px 0 #027ce830; background-color: #0000; color: #027ce8 !important; -webkit-font-smoothing: auto; } a.optX, a.optLites, a.optLTC { padding: 5px 10px; margin: 9px 15px 0px 10px; } a.optC:hover, a.optX:hover, a.optLites:hover, a.optLTC:hover { cursor: pointer; box-shadow: 0 0px 6px 0 rgba(0,0,0,0.15) inset, 0 0px 6px 0 #027ce880 inset; color: #fff !important; opacity: 0.9; background-color: #027ce8; } a.optC:active, a.optX:active, a.optLites:active, a.optLTC:active { opacity: 0.5; } #optCCont { display: inline-block; vertical-align: top; padding-top: 6px; letter-spacing: normal; line-height: 16px; }</style>');

function loadintodom() {
  $( document ).ready(function() {
    //restore_options();
    $('html > head').append(style);
    
    var elements = $('body *').filter(function () { 
        return $(this).css('position') == 'fixed';
    });
    //var rEl = "";
    $(elements).each(function() {
      $(this).css({top: (parseFloat($(this).css('top'))+50)});
      //( rEl != "" ) ? rEl = rEl + ', ' + $(this) : rEl = $(this);
    })
    //$("body").wrapInner('<div style="position: fixed;left: 0px;right: 0px;bottom: 0px;top: 50px;overflow: auto;"></div>');
    $("body").wrapInner('<div style="position: absolute; top: 50px; bottom: 4px; left: 0; right: 0;"></div>');
    $("body").prepend('<div style="height: 50px;position: relative;">&nbsp;</div>');
    //src = 'https://fiat2ltc.com/IFRAME/'+theCurrency+'/1LTC&NOTAG&LTCONLY';
    
    function addIframe(curr,lites="") {
      src = chrome.runtime.getURL('frame'+curr+lites+'.html');
      lorl = '<a class="optLites">Lites</a>';
      if (lites !="") lorl = '<a class="optLTC">LTC</a>';
      $("body").prepend( '<div id="ltcMenu"><a class="optX">X</a>'+lorl+'<div id="optCCont"><a id="lpUSD" data-cur="USD" class="optC">USD</a><a id="lpGBP" data-cur="GBP" class="optC">GBP</a><a id="lpEUR" data-cur="EUR" class="optC">EUR</a><a id="lpAUD" data-cur="AUD" class="optC">AUD</a><a id="lpCAD" data-cur="CAD" class="optC">CAD</a><a id="lpPLN" data-cur="PLN" class="optC">PLN</a><a id="lpRUB" data-cur="RUB" class="optC">RUB</a><br /><a id="lpCZK" data-cur="CZK" class="optC">CZK</a><a id="lpRON" data-cur="RON" class="optC">RON</a><a id="lpKRW" data-cur="KRW" class="optC">KRW</a><a id="lpBRL" data-cur="BRL" class="optC">BRL</a><a id="lpTRY" data-cur="TRY" class="optC">TRY</a><a id="lpMXN" data-cur="MXN" class="optC">MXN</a></div></div><iframe id="ltcIframe" width="100%" height="50" src="'+src+'" frameborder="0" style="border:none;padding:0px;height: 50px;position: fixed;z-index: 9999;background-color: #fff;top:0px"></iframe>' );
      $(".optC").click(function() {
        theCurrency = $(this).attr("data-cur");
        removeIframe();
        //addIframe();
        save_options();
        addIframe(theCurrency);
      });
      $(".optX").click(function() {
        save_options("close");
        removeIframe();
      });
      $(".optLites").click(function() {
        save_options("lites");
        removeIframe();
        addIframe(theCurrency,"lites");
      });
      $(".optLTC").click(function() {
        save_options("LTC");
        removeIframe();
        addIframe(theCurrency);
      });
    }
    function removeIframe() {
      $("#ltcMenu,#ltcIframe").remove();
      $(elements).each(function() {
        $(this).css({top: (parseFloat($(this).css('top'))-50)});
      })
    }
    if (litesOnly == true) {
      addIframe(theCurrency,"lites");
    } else {
      addIframe(theCurrency);
    }
  });
}


  function save_options($ad=false) {
    optArr = {};
    optArr.theCurrency = theCurrency;
    if ($ad == "close") optArr.fEnabled = false;
    if ($ad == "lites") optArr.litesOnly = true;
    if ($ad == "LTC") optArr.litesOnly = false;
    chrome.storage.sync.set(optArr, function() {
      // Update status to let user know options were saved.
    });
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      theCurrency: 'USD',
      fEnabled: true,
      litesOnly: false
      //thePrice: '1LTC'
    }, function(prefs) {
      theCurrency = prefs.theCurrency;
      fEnabled = prefs.fEnabled;
      litesOnly = prefs.litesOnly;
      //thePrice = prefs.thePrice;
      if (fEnabled) setTimeout(function() { loadintodom(); }, 1000);
    });
  }

//document.addEventListener('DOMContentLoaded', restore_options);
$( document ).ready(function() {
  restore_options();
});
//loadintodom();