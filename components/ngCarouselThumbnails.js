(function($angular, _) {

    'use strict';

    $angular.module('ngCarouselThumbnails', []).directive('carouselThumbnails', ['$window','$timeout', function ngCarouselThumbnails($window,$timeout) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'E',

            /**
             * @method controller
             * @param $scope {Object}
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @method iter
                 * @param max {Number}
                 * @return {Array}
                 */
                $scope.onClick = function (index,url) {
                  
                  if($scope._selection){
                    $scope.selected = index;
                    $scope._selected = index;
                  }
                  
                  if($scope.callbackClick){
                    $scope.callbackClick(index,url);
                  }
                  
                };

            }],

            /**
             * @property template
             * @type {String}
             */
            template: function template(element, attrs) {

              return `
                <section class="carousel-thumbnail">
                  <div class="container">
                    <div ng-show="_left" ng-click="_offsetLeft()" class="left"></div>
                    <div ng-repeat="thumbnails in _model" class="thumbnails">
                      <img ng-class="{selected: $index == _selected}" src="{{thumbnails}}" ng-click="onClick($index,thumbnails)"/>
                    </div>
                    <div ng-show="_right" ng-click="_offsetRight()" class="right"></div>
                  </div>
                </section>
                `;

            },

            /**
             * @property replace
             * @type {Boolean}
             */
            replace: true,

            /**
             * @property require
             * @type {String}
             */
            require: 'ngModel',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                model: '=ngModel',
                callbackClick: '=',
                mode: '=',
                callbackLazy: '=',
                selected: '='
            },

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {
                
              /**
               * @property _currentLeftOffset
               * @type {Integer}
               * @private
               */
              
              scope._currentLeftOffset = 0;
              
              /**
               * @property _offset
               * @type {Integer}
               * @private
               */
              
              scope._offset = 0;
              
              /**
               * @property _sizeContainer
               * @type {Integer}
               * @private
               */
              
              scope._sizeContainer = 0;
              
              /**
               * @property _sizeImages
               * @type {Integer}
               * @private
               */  
              
              scope._sizeImages = 0;
                
              /**
               * @property _selected
               * @type {Integer}
               * @private
               */
               scope._selected = (scope.selected !== undefined)? scope.selected : -1 ;
             
               /**
                * @property _selection
                * @type {Boolean}
                * @private
                */
                scope._selection = (scope.selected !== undefined)? true : false ;
                
               /**
                * @property _model
                * @type {Array}
                * @private
                */
                
                scope._model = scope.model;
                
                /**
                 * @property _mode
                 * @type {String}
                 * @private
                 */
                  
                scope._mode = scope.mode;
                
                /**
                 * @property _callbackClick
                 * @type {Function}
                 * @private
                 */
                scope._callbackClick = scope.callbackClick;
                
                /**
                 * @property _callbackLazy
                 * @type {Function}
                 * @private
                 */
                scope._callbackLazy = scope.callbackLazy;
                
                /**
                 * @property _right
                 * @type {Boolen}
                 * @private
                 */
                scope._right = false;
                
                /**
                 * @property _left
                 * @type {Boolen}
                 * @private
                 */
                scope._left = false;
                
                /**
                 * @method _applyOffset
                 * @return {void}
                 * @private
                 */
                var _refresh = function _refresh() {
                  $timeout(function(){
                    scope.$apply();
                  });
                };
                
                /**
                 * @method _applyOffset
                 * @return {void}
                 * @private
                 */
                var _applyOffset = function _applyOffset(){
                  var imgs = element[0].querySelectorAll('img');
                  for(var i = 0; i < imgs.length ; i++){
                    angular.element(imgs[i]).css('left',scope._currentLeftOffset +'px');
                  }
                };
                
                /**
                 * @method _init
                 * @return {void}
                 * @private
                 */
                var _init = function _init(){
                  var imgs = element[0].querySelectorAll('img');
                  scope._sizeContainer = element[0].offsetWidth;
                  scope._sizeImages = imgs[imgs.length - 1].offsetLeft + imgs[imgs.length - 1].offsetWidth;
                  scope._currentLeftOffset = 0;
                  
                  //default mode
                  if(!scope._mode){
                    _applyOffset();
                  }else if(scope._mode === 'push' || scope._mode === 'lazy'){
                    
                    if(imgs.length <= 3){
                      scope._currentLeftOffset = 0;
                    }else{
                      scope._currentLeftOffset = (imgs.length - 3) * -scope._offset;
                    }
                    
                    _applyOffset();
                  }
                  _refresh();
                };
                
                /**
                 * @method _displayArrows
                 * @return {String}
                 * @private
                 */
                var _displayArrows = function _displayArrows(){
                  console.log(scope._sizeImages > scope._sizeContainer);
                  if(scope._sizeImages > scope._sizeContainer){
                    scope._left = scope._right = true;
                  }else{
                    scope._left = scope._right = false;
                  }
                  _refresh();
                };
                
                /**
                 * @method _offsetLeft
                 * @return {void}
                 */
                scope._offsetLeft = function(){
                  if(-scope._currentLeftOffset > 0){
                    scope._currentLeftOffset += scope._offset;
                    _applyOffset();
                    _refresh();
                  }
                
                };
                
                /**
                 * @method _offsetRight
                 * @return {void}
                 */
                scope._offsetRight = function(){
                  if(scope._sizeImages + scope._currentLeftOffset > scope._sizeContainer){
                    scope._currentLeftOffset -= scope._offset;
                    _applyOffset();
                    _refresh();
                  }else{
                    if(scope.mode === 'lazy'){
                      scope._callbackLazy();
                    }
                  }
                };

                scope.$watch('model', function () {
                  scope._model = scope.model;
                  _init();
                  _displayArrows();
                 }, true);
                 
                scope.$watch('selected', function () {
                  scope._selected = scope.selected;   
                
                  if((scope._offset*scope._selected + scope._offset) > scope._sizeContainer && 
                     (scope._sizeImages + scope._currentLeftOffset > scope._sizeContainer ) ||
                     (-scope._currentLeftOffset > 0)){
                    var newOffset;
                    var img = element[0].querySelectorAll('img'); 
                    
                    if(scope._selected > img.length - 3){
                      newOffset = (scope._selected - 2) * scope._offset;
                    }else{
                      newOffset = scope._selected * scope._offset;
                    }
                    
                    scope._currentLeftOffset = -newOffset;
                    _applyOffset();
                  }
                   
                   _refresh();
                  }, true);

                element.ready(function(event){
                  var imgs = element[0].querySelectorAll('img');
                  scope._offset = angular.element(imgs[0])[0].offsetLeft + angular.element(imgs[0])[0].offsetWidth;
                  _displayArrows();
                });
                
            }

        };

    }]);

})(window.angular, window._);