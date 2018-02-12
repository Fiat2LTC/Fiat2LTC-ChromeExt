// content.js
var theCurrency = 'USD';
// Saves options to chrome.storage
var metaTag = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; font-src \'self\' data: fonts.googleapis.com;"';
var style = $('<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"><style id="f2lcss">#ltcMenu, #logoRight {font-family: "Raleway", Helvetica, Arial, sans-serif; border:none;padding:0px;height: 50px;position: fixed;z-index: 99999;background-color: #fff;width:160px;left:0px} #logoRight { right: 0px; left: auto; width: 70px;} #logoRight #logo { height: 45px; margin:0px; padding:0px; display:inline; margin-top: 1px; } a.optC { margin:0px; padding:0px; cursor: pointer; text-decoration: none;color: #777 !important; font-weight: 500; font-size:20px; } a.optC:hover { cursor: pointer;color: #027ce8 !important; text-decoration: none; }</style>');
$('html > head').append(style);
function loadintodom() {
  $( document ).ready(function() {
    //restore_options();
    
    var elements = $('body *').filter(function () { 
        return $(this).css('position') == 'fixed';
    });
    $(elements).each(function() {
      $(this).css({top: (parseFloat($(this).css('top'))+50)});
    })
    $("body").wrapInner('<div style="position: fixed;left: 0px;right: 0px;bottom: 0px;top: 50px;overflow: scroll;"></div>');
    //src = 'https://fiat2ltc.com/IFRAME/'+theCurrency+'/1LTC&NOTAG&LTCONLY';
    
    function addIframe(curr) {
      src = chrome.runtime.getURL('frame'+curr+'.html');
      $("body").prepend( '<div id="ltcMenu"><a id="lpUSD" data-cur="USD" class="optC">USD</a> <a id="lpGBP" data-cur="GBP" class="optC">GBP</a> <a id="lpEUR" data-cur="EUR" class="optC">EUR</a></div><div id="logoRight"><a href="https://fiat2ltc.com/'+curr+'/1LTC"><img id="logo" class="" src="https://fiat2ltc.com/f2lLogo1.png"></a></div><iframe id="ltcIframe" width="100%" height="50" src="'+src+'" frameborder="0" style="border:none;padding:0px;height: 50px;position: fixed;z-index: 9999;background-color: #fff;"></iframe>' );
      $(".optC").click(function() {
        theCurrency = $(this).attr("data-cur");
        removeIframe();
        //addIframe();
        addIframe(theCurrency);
        save_options(theCurrency);
      });
    }
    function removeIframe() {
      $("#ltcMenu,#ltcIframe").remove();
    }
    addIframe(theCurrency);
  });
}


  function save_options() {
    chrome.storage.sync.set({
      theCurrency: theCurrency
      //thePrice: thePrice
    }, function() {
      // Update status to let user know options were saved.
    });
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      theCurrency: 'USD'
      //thePrice: '1LTC'
    }, function(prefs) {
      theCurrency = prefs.theCurrency;
      //thePrice = prefs.thePrice;
      loadintodom();
    });
  }

//document.addEventListener('DOMContentLoaded', restore_options);
$( document ).ready(function() {
  restore_options();
});
//loadintodom();