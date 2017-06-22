/*global angular */

/**
 * Directive that fetches the image.
 */
angular.module('todomvc')
	.directive('todoGif', function () {
		'use strict';

        const loadingGif = 'images/loader.gif';

		return function (scope, elem, attrs) {
            scope.$watch(attrs.todoGif, function (media) {
                if (!media || media === '' || media === 'null') {
                    elem.attr('src', loadingGif)    
                } else {
                    elem.attr('src', media)
                }
			});
		};
	});
