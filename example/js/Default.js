(function($angular) {

    // Off we go!
    $angular.module('carouselApp', ['ngCarouselThumbnails']).controller('IndexController', function IndexController($scope,$interval) {

        /**
         * @property images
         * @type {[string...]}
         */
        $scope.images = [
          'http://dummyimage.com/100x100/000/fff&text=1',
          'http://dummyimage.com/100x100/000/fff&text=2',
          'http://dummyimage.com/100x100/000/fff&text=3',
          'http://dummyimage.com/100x100/000/fff&text=4'
        ];
        
        var images_iter = 4;
        
        $scope.addImages = function(){
          $scope.images.push('http://dummyimage.com/100x100/000/fff&text='+(++images_iter));
        };

        /**
         * @property colors
         * @type {[string...]}
         */
        $scope.images_selected = [
          'http://dummyimage.com/100x100/000/fff&text=1',
          'http://dummyimage.com/100x100/000/fff&text=2',
          'http://dummyimage.com/100x100/000/fff&text=3',
          'http://dummyimage.com/100x100/000/fff&text=4',
          'http://dummyimage.com/100x100/000/fff&text=5'
        ];
        
        $scope.selected = 0;  
        
        /**
         * @property colors
         * @type {[string...]}
         */
        $scope.images_callback = [
          'http://dummyimage.com/100x100/000/fff&text=1',
          'http://dummyimage.com/100x100/000/fff&text=2',
          'http://dummyimage.com/100x100/000/fff&text=3',
          'http://dummyimage.com/100x100/000/fff&text=4',
          'http://dummyimage.com/100x100/000/fff&text=5'
        ]; 
        
        $scope.onClick = function(index,el){
          console.log(index,el);
        };
        
        /**
         * @property colors
         * @type {[string...]}
         */
        $scope.images_lazy = [
          'http://dummyimage.com/100x100/000/fff&text=1',
          'http://dummyimage.com/100x100/000/fff&text=2',
          'http://dummyimage.com/100x100/000/fff&text=3',
          'http://dummyimage.com/100x100/000/fff&text=4'
        ];
        
        var lazy_iter = 4;
        $scope.onLazy = function(){
          $scope.images_lazy.push('http://dummyimage.com/100x100/000/fff&text='+(++lazy_iter));
        };
        
        /**
         * @property colors
         * @type {[string...]}
         */
        $scope.images_push = [
          'http://dummyimage.com/100x100/000/fff&text=1'
        ];
        
        var push_iter = 1;
        $scope.pushImages = function(){
          $scope.images_push.push('http://dummyimage.com/100x100/000/fff&text='+(++push_iter));
        };
        
    })
    .filter("prettyJSON", () => json => JSON.stringify(json, null, " "));
})(window.angular);