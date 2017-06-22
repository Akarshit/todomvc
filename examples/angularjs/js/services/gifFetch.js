/*global angular */

/**
 * Services that retrieve gifs from the API's on the basis of
 * the todo's title.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
	.factory('gifFetch', function ($resource) {
		'use strict';

		var gif = {

            defURL: 'https://marshallwritingcenter.files.wordpress.com/2015/04/gif2.gif',

			api: $resource('https://api.tenor.com/v1/search', {
                limit: 1,
                tag: '',
            }),

			get: function (tag) {
                if (_.size(tag) === 0) {
                    return gif.defURL;
                }
                // "eggs" give better result than "Buy eggs tomorrow"
                const parsed = nlp(tag);
                const nouns = parsed.nouns().out('topk');
                const mainNoun = _.head(nouns) ? _.head(nouns).normal : tag;
                return gif.api.get({limit: 1, tag}).$promise
                    .then((res) => {
                        const url = _.head(_.head(res.results).media).gif.url;
                        return url;
                    })
                    .catch((err) => {
                        return gif.defURL;
                    });
			},
        };
		return gif;
	});
