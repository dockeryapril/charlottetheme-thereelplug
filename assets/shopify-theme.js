var collection = (function() {
    var collection = null;
    return collection;
})();

/* Collection Filter */
(function($) {
  function getProducts(p_options) {
    return new Promise(function(resolve, reject) {
     var collection_handle = (collection !== null) ? collection.handle : 'all';
       $.get(`/collections/${collection_handle}?view=json`, function(response) {
        var $products = $(response).find('#product-grid li');
        $products = _.filter($products, function($product) {
          return true;
        });
        resolve($products);
      });
    });
  }
  
  function filterProductsByTags(p_options) {
    //console.log(p_options);
    return new Promise(function(resolve, reject) {
      var collection_handle = (collection !== null) ? collection.handle : 'all';
      $.get(`/collections/${collection_handle}?view=json`, function(response) {
        var $products = $(response).find('#product-grid li');
        var matchingProducts = _.filter($products, function(product) {
          var $product = $(product);
          var tags;
          if (p_options.selectedTags.length == 0) {
            tags = $product.data('tags').split(',');
          }
          else {
            tags = _.intersection($product.data('tags').split(','), p_options.selectedTags);            
          }
          return tags.length > 0;
        });
        
        resolve(matchingProducts);
      });
    });
  }
  
  function loadProducts($products) {
    //console.log($products);
    var $productsList = $('#product-grid');
    var $filterCount = $('.product-count__text');
    
    $productsList.html('');
    $products.forEach(function(product) {
      var $product = $(product);
      $productsList.append($product);
    });

    if ($products.length == 0) {
      $productsList.html('<p>Sorry, there are no matching results.</p>');
    }
    
    $filterCount.html($products.length + ' products');    
  }
  
  var isCollectionPage = window.location.pathname.indexOf('/collections/') !== -1;
  
  // On Document ready
  $(document).ready(function() {
    if (isCollectionPage) {
      var $products = [];
      getProducts()
      .then(function(allProducts) {
        $products = allProducts;
      }); 
    }
    
    $(document).on('click', '.filter-tag-list a', function(e) {
      e.preventDefault();
      var $item = $(e.currentTarget);
      $item.toggleClass('active');
      
      // Remove pagination
      $('#ProductGridContainer').find('.pagination__list').hide();

      var $matchingProducts = $products; 
      $item.closest('.collection-sidebar').find('.filter-tag-list').each(function(i, taglist) {
        var $taglist = $(taglist);
        
        var selectedTags = [];
        $taglist.find('a.active').each(function(i, item) {
          var tag = $(item).data('tag');
          var notInList = selectedTags.indexOf(tag) == -1;
          if (notInList) {
            selectedTags.push(tag);
          }
        });
        
        if (selectedTags.length) {
          $matchingProducts = _.filter($matchingProducts, function(product) {
            var $product = $(product);
            var tags;
            if (selectedTags.length == 0) {
              tags = $product.data('tags').split(',');
            }
            else {
              var selectedFilter = $product.data('tags').split(',');
              tags = $(selectedFilter).filter(selectedTags); 
              //tags = _.intersection($product.data('tags').split(','), selectedTags);            
            }
            return tags.length > 0;
          });          
        }
      });
      
      loadProducts($matchingProducts);
    });      
  });
})(jQuery);