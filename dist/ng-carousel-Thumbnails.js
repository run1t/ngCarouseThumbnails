(function($angular, _) {
  $angular.module('ngCarouselThumbnails', []).directive('carouselThumbnails', [
    '$window', '$timeout', function($window, $timeout) {
      return {
        restrict: 'E',
        templateUrl: '/js/vendor/ng-carousel-thumbnails/dist/template/ngCarouselThumbnails.tpl.html',
        replace: true,
        require: 'ngModel',
        scope: {
          model: '=ngModel',
          callbackClick: '=',
          callbackLazy: '=',
          mode: '=',
          selected: '='
        },
        controller: [
          '$scope', function($scope) {
            $scope.onClick = function(index, url) {
              if ($scope._selection === true) {
                $scope.selected = index;
                $scope._selected = index;
              }
              if ($scope.callbackClick === true) {
                return $scope.callbackClick(index, url);
              }
            };
          }
        ],
        link: function(scope, element) {
          var _applyOffset, _displayArrows, _init, _refresh;
          scope._currentLeftOffset = 0;
          scope._offset = 0;
          scope._sizeContainer = 0;
          scope._sizeImages = 0;
          scope._selected = scope.selected === void 0 ? scope.selected : -1;
          scope._selection = scope.selected === void 0 ? true : false;
          scope._model = scope.model;
          scope._mode = scope.mode;
          scope._callbackClick = scope.callbackClick;
          scope._callbackLazy = scope.callbackLazy;
          scope._right = false;
          scope._left = false;
          _refresh = function() {
            return $timeout(function() {
              return scope.$apply();
            });
          };
          _applyOffset = function() {
            var i, img, imgs, len, results;
            imgs = element[0].querySelectorAll('img');
            results = [];
            for (i = 0, len = imgs.length; i < len; i++) {
              img = imgs[i];
              results.push(angular.element(img).css('left', scope._currentLeftOffset + 'px'));
            }
            return results;
          };
          _init = function() {
            var imgs;
            imgs = element[0].querySelectorAll('img');
            scope._sizeContainer = element[0].offsetWidth;
            scope._sizeImages = imgs[imgs.length - 1].offsetLeft + imgs[imgs.length - 1].offsetWidth;
            scope._currentLeftOffset = 0;
            if (scope._mode === 'push' || scope._mode === 'lazy') {
              if (imgs.length > 3) {
                scope._currentLeftOffset = (imgs.length - 3) * -scope._offset;
              }
            }
            _applyOffset();
            _refresh();
          };
          _displayArrows = function() {
            if (scope._sizeImages > scope._sizeContainer) {
              scope._left = scope._right = true;
            } else {
              scope._left = scope._right = false;
            }
            _refresh();
          };
          scope._offsetLeft = function() {
            if (-scope._currentLeftOffset > 0) {
              scope._currentLeftOffset += scope._offset;
              _applyOffset();
              _refresh();
            }
          };
          scope._offsetRight = function() {
            if (scope._sizeImages + scope._currentLeftOffset > scope._sizeContainer) {
              scope._currentLeftOffset -= scope._offset;
              _applyOffset();
              _refresh();
            } else {
              if (scope.mode === 'lazy') {
                scope._callbackLazy();
              }
            }
          };
          scope.$watch('model', function() {
            scope._model = scope.model;
            _init();
            _displayArrows();
          }, true);
          scope.$watch('selected', function() {
            var img, newOffset;
            scope._selected = scope.selected;
            if ((scope._offset * scope._selected + scope._offset) > scope._sizeContainer && (scope._sizeImages + scope._currentLeftOffset > scope._sizeContainer) || (-scope._currentLeftOffset > 0)) {
              img = element[0].querySelectorAll('img');
              if (scope._selected > img.length - 3) {
                newOffset = (scope._selected - 2) * scope._offset;
              } else {
                newOffset = scope._selected * scope._offset;
              }
              scope._currentLeftOffset = -newOffset;
              _applyOffset();
              _refresh();
            }
          }, true);
          return element.ready(function(event) {
            var imgs;
            imgs = element[0].querySelectorAll('img');
            scope._offset = angular.element(imgs[0])[0].offsetLeft + angular.element(imgs[0])[0].offsetWidth;
            _displayArrows();
          });
        }
      };
    }
  ]);
})(window.angular, window._);
