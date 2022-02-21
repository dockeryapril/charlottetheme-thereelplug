var selectors = {
	wrapperSelector: '#recently-viewed-products'
};
selectors.limit = parseInt(jQuery(selectors.wrapperSelector).parent().data('limit'));

//console.log(Shopify);
Shopify.Products.recordRecentlyViewed();
Shopify.Products.showRecentlyViewed({ 
	howManyToShow: 4,
	onComplete: function(evt){
		jQuery(selectors.wrapperSelector).parent().show();
      	jQuery('#recently-viewed-products .price-item--save').each(function(){
          var t = jQuery(this);
          var p = t.text();
          t.html(Shopify.formatMoney(p, window.money_format));
        });
      
      	jQuery('#recently-viewed-products span.price-item.save-price').each(function(){
          if($(this).is(':contains("-")')){
            $(this).hide();
          }
        });
      
        jQuery('#recently-viewed-products dd.price__compare').each(function(){
          if($(this).is(':contains("$0")')){
            $(this).hide();
          }
        });
	}
});


/**console.log(Shopify);
Shopify.Products.recordRecentlyViewed();
window.myprice = "{{ shop.money_with_currency_format }}";
Shopify.Products.showRecentlyViewed({ 
	howManyToShow: 4,
	onComplete: function(evt){
		jQuery(selectors.wrapperSelector).parent().show();
      	jQuery('#recently-viewed-products .price-item--regular').each(function(){
          var t = jQuery(this);
          var p = t.text();
          t.html(Shopify.formatMoney(p, window.myprice);
        });
	}
});*/
      

