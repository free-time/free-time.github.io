echo.init({
	offset: 100,
	throttle: 250,
	unload: false,
});
$('.mfp-iframe').magnificPopup({type:'iframe'});

// Search
SimpleJekyllSearch({
  searchInput: document.querySelector('.main-form__search'),
  resultsContainer: document.querySelector('.results-container'),
  json: '/search.json',
})

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.echo = factory(root);
  }
})(this, function (root) {

  'use strict';

  var echo = {};

  var callback = function () {};

  var offset, poll, delay, useDebounce, unload;

  var isHidden = function (element) {
    return (element.offsetParent === null);
  };
  
  var inView = function (element, view) {
    if (isHidden(element)) {
      return false;
    }

    var box = element.getBoundingClientRect();
    return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
  };

  var debounceOrThrottle = function () {
    if(!useDebounce && !!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function(){
      echo.render();
      poll = null;
    }, delay);
  };

  echo.init = function (opts) {
    opts = opts || {};
    var offsetAll = opts.offset || 0;
    var offsetVertical = opts.offsetVertical || offsetAll;
    var offsetHorizontal = opts.offsetHorizontal || offsetAll;
    var optionToInt = function (opt, fallback) {
      return parseInt(opt || fallback, 10);
    };
    offset = {
      t: optionToInt(opts.offsetTop, offsetVertical),
      b: optionToInt(opts.offsetBottom, offsetVertical),
      l: optionToInt(opts.offsetLeft, offsetHorizontal),
      r: optionToInt(opts.offsetRight, offsetHorizontal)
    };
    delay = optionToInt(opts.throttle, 250);
    useDebounce = opts.debounce !== false;
    unload = !!opts.unload;
    callback = opts.callback || callback;
    echo.render();
    if (document.addEventListener) {
      root.addEventListener('scroll', debounceOrThrottle, false);
      root.addEventListener('load', debounceOrThrottle, false);
    } else {
      root.attachEvent('onscroll', debounceOrThrottle);
      root.attachEvent('onload', debounceOrThrottle);
    }
  };

  echo.render = function () {
    var nodes = document.querySelectorAll('img[data-echo], [data-echo-background]');
    var length = nodes.length;
    var src, elem;
    var view = {
      l: 0 - offset.l,
      t: 0 - offset.t,
      b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
      r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
    };
    for (var i = 0; i < length; i++) {
      elem = nodes[i];
      if (inView(elem, view)) {

        if (unload) {
          elem.setAttribute('data-echo-placeholder', elem.src);
        }

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = "url(" + elem.getAttribute('data-echo-background') + ")";
        }
        else {
          elem.src = elem.getAttribute('data-echo');
        }

        if (!unload) {
          elem.removeAttribute('data-echo');
          elem.removeAttribute('data-echo-background');
        }

        callback(elem, 'load');
      }
      else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = "url(" + src + ")";
        }
        else {
          elem.src = src;
        }

        elem.removeAttribute('data-echo-placeholder');
        callback(elem, 'unload');
      }
    }
    if (!length) {
      echo.detach();
    }
  };

  echo.detach = function () {
    if (document.removeEventListener) {
      root.removeEventListener('scroll', debounceOrThrottle);
    } else {
      root.detachEvent('onscroll', debounceOrThrottle);
    }
    clearTimeout(poll);
  };

  return echo;

});
!function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a)
                    return a(o, !0);
                if (i)
                    return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }
            , f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++)
        s(r[o]);
    return s
}
({
    1: [function(require, module, exports) {
        "use strict";
        function load(location, callback) {
            var xhr;
            xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
            xhr.open("GET", location, !0),
            xhr.onreadystatechange = function() {
                if (200 === xhr.status && 4 === xhr.readyState)
                    try {
                        callback(null , JSON.parse(xhr.responseText))
                    } catch (err) {
                        callback(err, null )
                    }
            }
            ,
            xhr.send()
        }
        module.exports = {
            load: load
        }
    }
    , {}],
    2: [function(require, module, exports) {
        "use strict";
        module.exports = function OptionsValidator(params) {
            function validateParams(params) {
                return params ? void 0 !== params.required && params.required instanceof Array : !1
            }
            if (!validateParams(params))
                throw new Error("-- OptionsValidator: required options missing");
            if (!(this instanceof OptionsValidator))
                return new OptionsValidator(params);
            var requiredOptions = params.required;
            this.getRequiredOptions = function() {
                return requiredOptions
            }
            ,
            this.validate = function(parameters) {
                var errors = [];
                return requiredOptions.forEach(function(requiredOptionName) {
                    void 0 === parameters[requiredOptionName] && errors.push(requiredOptionName)
                }
                ),
                errors
            }
        }
    }
    , {}],
    3: [function(require, module, exports) {
        "use strict";
        function put(data) {
            return isObject(data) ? addObject(data) : isArray(data) ? addArray(data) : void 0
        }
        function clear() {
            return data.length = 0,
            data
        }
        function get() {
            return data
        }
        function isObject(obj) {
            return !!obj && "[object Object]" === Object.prototype.toString.call(obj)
        }
        function isArray(obj) {
            return !!obj && "[object Array]" === Object.prototype.toString.call(obj)
        }
        function addObject(_data) {
            return data.push(_data),
            data
        }
        function addArray(_data) {
            for (var added = [], i = 0; i < _data.length; i++)
                isObject(_data[i]) && added.push(addObject(_data[i]));
            return added
        }
        function search(crit) {
            return crit ? findMatches(data, crit, opt.searchStrategy, opt) : []
        }
        function setOptions(_opt) {
            opt = _opt || {},
            opt.fuzzy = _opt.fuzzy || !1,
            opt.limit = _opt.limit || 10,
            opt.searchStrategy = _opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
        }
        function findMatches(data, crit, strategy, opt) {
            for (var matches = [], i = 0; i < data.length && matches.length < opt.limit; i++) {
                var match = findMatchesInObject(data[i], crit, strategy, opt);
                match && matches.push(match)
            }
            return matches
        }
        function findMatchesInObject(obj, crit, strategy, opt) {
            for (var key in obj)
                if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit))
                    return obj
        }
        function isExcluded(term, excludedTerms) {
            var excluded = !1;
            excludedTerms = excludedTerms || [];
            for (var i = 0; i < excludedTerms.length; i++) {
                var excludedTerm = excludedTerms[i];
                !excluded && new RegExp(term).test(excludedTerm) && (excluded = !0)
            }
            return excluded
        }
        module.exports = {
            put: put,
            clear: clear,
            get: get,
            search: search,
            setOptions: setOptions
        };
        var FuzzySearchStrategy = require("./SearchStrategies/FuzzySearchStrategy")
          , LiteralSearchStrategy = require("./SearchStrategies/LiteralSearchStrategy")
          , data = []
          , opt = {};
        opt.fuzzy = !1,
        opt.limit = 10,
        opt.searchStrategy = opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
    }
    , {
        "./SearchStrategies/FuzzySearchStrategy": 4,
        "./SearchStrategies/LiteralSearchStrategy": 5
    }],
    4: [function(require, module, exports) {
        "use strict";
        function FuzzySearchStrategy() {
            function fuzzyRegexFromString(string) {
                return new RegExp(string.split("").join(".*?"),"gi")
            }
            this.matches = function(string, crit) {
                return "string" != typeof string ? !1 : (string = string.trim(),
                !!fuzzyRegexFromString(crit).test(string))
            }
        }
        module.exports = new FuzzySearchStrategy
    }
    , {}],
    5: [function(require, module, exports) {
        "use strict";
        function LiteralSearchStrategy() {
            function matchesString(string, crit) {
                return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0
            }
            this.matches = function(string, crit) {
                return "string" != typeof string ? !1 : (string = string.trim(),
                matchesString(string, crit))
            }
        }
        module.exports = new LiteralSearchStrategy
    }
    , {}],
    6: [function(require, module, exports) {
        "use strict";
        function setOptions(_options) {
            options.pattern = _options.pattern || options.pattern,
            options.template = _options.template || options.template,
            "function" == typeof _options.middleware && (options.middleware = _options.middleware)
        }
        function compile(data) {
            return options.template.replace(options.pattern, function(match, prop) {
                var value = options.middleware(prop, data[prop], options.template);
                return void 0 !== value ? value : data[prop] || match
            }
            )
        }
        module.exports = {
            compile: compile,
            setOptions: setOptions
        };
        var options = {};
        options.pattern = /\{(.*?)\}/g,
        options.template = "",
        options.middleware = function() {}
    }
    , {}],
    7: [function(require, module, exports) {
        !function(window, document, undefined) {
            "use strict";
            function initWithJSON(json) {
                repository.put(json),
                registerInput()
            }
            function initWithURL(url) {
                jsonLoader.load(url, function(err, json) {
                    err && throwError("failed to get JSON (" + url + ")"),
                    initWithJSON(json)
                }
                )
            }
            function emptyResultsContainer() {
                options.resultsContainer.innerHTML = ""
            }
            function appendToResultsContainer(text) {
                options.resultsContainer.innerHTML += text
            }
            function registerInput() {
                options.searchInput.addEventListener("keyup", function(e) {
                    emptyResultsContainer(),
                    e.target.value.length > 0 && render(repository.search(e.target.value))
                }
                )
            }
            function render(results) {
                if (0 === results.length)
                    return appendToResultsContainer(options.noResultsText);
                for (var i = 0; i < results.length; i++)
                    appendToResultsContainer(templater.compile(results[i]))
            }
            function throwError(message) {
                throw new Error("SimpleJekyllSearch --- " + message)
            }
            var options = {
                searchInput: null ,
                resultsContainer: null ,
                json: [],
                searchResultTemplate: '<a href="{post.link}"><h2 class="lecture-title-search">{title}</h2></a>',
                templateMiddleware: function() {},
                noResultsText: '<h2>Não foi possível encontrar :(</h2>',
                limit: 10,
                fuzzy: !1,
                exclude: []
            }
              , requiredOptions = ["searchInput", "resultsContainer", "json"]
              , templater = require("./Templater")
              , repository = require("./Repository")
              , jsonLoader = require("./JSONLoader")
              , optionsValidator = require("./OptionsValidator")({
                required: requiredOptions
            })
              , utils = require("./utils");
            window.SimpleJekyllSearch = function(_options) {
                var errors = optionsValidator.validate(_options);
                errors.length > 0 && throwError("You must specify the following required options: " + requiredOptions),
                options = utils.merge(options, _options),
                templater.setOptions({
                    template: options.searchResultTemplate,
                    middleware: options.templateMiddleware
                }),
                repository.setOptions({
                    fuzzy: options.fuzzy,
                    limit: options.limit
                }),
                utils.isJSON(options.json) ? initWithJSON(options.json) : initWithURL(options.json)
            }
            ,
            window.SimpleJekyllSearch.init = window.SimpleJekyllSearch
        }
        (window, document)
    }
    , {
        "./JSONLoader": 1,
        "./OptionsValidator": 2,
        "./Repository": 3,
        "./Templater": 6,
        "./utils": 8
    }],
    8: [function(require, module, exports) {
        "use strict";
        function merge(defaultParams, mergeParams) {
            var mergedOptions = {};
            for (var option in defaultParams)
                mergedOptions[option] = defaultParams[option],
                void 0 !== mergeParams[option] && (mergedOptions[option] = mergeParams[option]);
            return mergedOptions
        }
        function isJSON(json) {
            try {
                return json instanceof Object && JSON.parse(JSON.stringify(json)) ? !0 : !1
            } catch (e) {
                return !1
            }
        }
        module.exports = {
            merge: merge,
            isJSON: isJSON
        }
    }
    , {}]
}, {}, [7]);
