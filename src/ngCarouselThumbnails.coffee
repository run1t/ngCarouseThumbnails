do ($angular = window.angular, _ = window._) ->
  $angular.module('ngCarouselThumbnails', []).directive('carouselThumbnails',['$window','$timeout',($window,$timeout) ->
    restrict: 'E'
    templateUrl: '/js/vendor/ng-carousel-thumbnails/dist/template/ngCarouselThumbnails.tpl.html'
    replace: true
    require: 'ngModel'
    scope:
      model: '=ngModel'
      callbackClick: '='
      callbackLazy: '='
      mode: '='
      selected: '='
    controller: ['$scope', ($scope) ->
      $scope.onClick =  (index,url) ->
        if $scope._selection is true
          $scope.selected = index
          $scope._selected = index
        if $scope.callbackClick is true
          $scope.callbackClick(index,url)
      return
    ]
    link: (scope,element) ->
      scope._currentLeftOffset = 0
      scope._offset            = 0
      scope._sizeContainer     = 0
      scope._sizeImages        = 0
      scope._selected          = if scope.selected is undefined then scope.selected else -1 
      scope._selection         = if scope.selected is undefined then true else false 
      scope._model             = scope.model
      scope._mode              = scope.mode
      scope._callbackClick     = scope.callbackClick
      scope._callbackLazy      = scope.callbackLazy
      scope._right             = false
      scope._left              = false
      
      _refresh = () ->
        $timeout( () ->
          scope.$apply()
        )
      
      _applyOffset = () ->
        imgs = element[0].querySelectorAll('img')
        for img in imgs
          angular.element(img).css('left',scope._currentLeftOffset+'px')
      
      _init = () ->
        imgs = element[0].querySelectorAll('img')
        scope._sizeContainer = element[0].offsetWidth
        scope._sizeImages = imgs[imgs.length - 1].offsetLeft + imgs[imgs.length - 1].offsetWidth
        scope._currentLeftOffset = 0
        
        if scope._mode is 'push' or scope._mode is 'lazy'
          if imgs.length > 3
            scope._currentLeftOffset = (imgs.length - 3) * -scope._offset
        
        _applyOffset()
        _refresh()
        return
    
      _displayArrows = () ->
        if scope._sizeImages > scope._sizeContainer
          scope._left = scope._right = true
        else
          scope._left = scope._right = false
        _refresh()
        return

      scope._offsetLeft = () ->
        if -scope._currentLeftOffset > 0
          scope._currentLeftOffset += scope._offset
          _applyOffset()
          _refresh()
        return
      
      scope._offsetRight = () ->
        if scope._sizeImages + scope._currentLeftOffset > scope._sizeContainer
          scope._currentLeftOffset -= scope._offset
          _applyOffset()
          _refresh()
        else
          if scope.mode is 'lazy'
            scope._callbackLazy()
        return
      
      scope.$watch('model', () ->
        scope._model = scope.model
        _init()
        _displayArrows()
        return
      , true)
      
      scope.$watch('selected', () ->
        scope._selected = scope.selected
        if((scope._offset*scope._selected + scope._offset) > scope._sizeContainer &&
          (scope._sizeImages + scope._currentLeftOffset > scope._sizeContainer ) ||
          (-scope._currentLeftOffset > 0))
            img = element[0].querySelectorAll('img') 
            if scope._selected > img.length - 3
              newOffset = (scope._selected - 2) * scope._offset
            else
              newOffset = scope._selected * scope._offset
            scope._currentLeftOffset = -newOffset
            _applyOffset()
            _refresh()
            return
      , true)
       
      element.ready( (event) ->
        imgs = element[0].querySelectorAll('img')
        scope._offset = angular.element(imgs[0])[0].offsetLeft + angular.element(imgs[0])[0].offsetWidth
        _displayArrows()
        return
      )
  ])
  return
