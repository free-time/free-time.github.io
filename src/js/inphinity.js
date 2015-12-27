/*!
   --------------------------------
   Inphinity.js
   --------------------------------
   + https://github.com/raphamorim/inphinity
   + version 1.0.4
   + Copyright 2015 Raphael Amorim
   + Licensed under the MIT license

   + Documentation: https://github.com/raphamorim/inphinity
*/

var inphinity = (function() {
    this.loading = false;
    this.debug = false;
    this.url = '';
    this.currentPage = 1;
    this.itemSelector = 'div.post';
    this.nextSelector = 'div.navigation a:first';
    this.navSelector = 'div.navigation';
    this.basePath = false;
    this.path = false;
    this.dataType = 'html';
    this.bag = false;
    this.bagClassName = false;
    this.loader = false;
    this.trustedRequest = false;
    this.defaults = {
        finishedMsg: "<em>That's all folks!</em>",
        animationSpeed: 500
    };

    this.scroller = function(scrollTop) {
        if (this.loading === true)
            return;

        var scrollActivate = (this.element.offsetTop + this.element.offsetHeight),
            diff = scrollActivate - scrollTop;

        if (diff <= 750) {
            this.loading = true;
            this.request();
        }
    };

    this.getPath = function() {
        var path = this.basePath;
        if (path.match(/^(.*?)\b2\b(.*?$)/)) {
            path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);

            // if there is any 2 in the url at all.
        } else if (path.match(/^(.*?)2(.*?$)/)) {
            if (path.match(/^(.*?page=)2(\/.*|$)/)) {
                path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                return path;
            }

            path = path.match(/^(.*?)2(.*?$)/).slice(1);
        } else {
            // page= is used in drupal too but second page is page=1 not page=2:
            if (path.match(/^(.*?page=)1(\/.*|$)/)) {
                path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                return path;
            } else {
                this.currentPage = path.match(/\d+/)[0] - 1;
                path = [this.path, ''];
            }
        }
        return path;
    };

    this.getUrlPath = function() {
        var nextSel = (document.querySelector(this.nextSelector).href).split('/');
        return nextSel[nextSel.length - 1];
    };

    this.createBag = function() {
        var bag = document.createElement('div');
        bag.style.display = 'none';
        this.bagClassName = this.bagClassName || 'ph-bag';
        bag.className = this.bagClassName;
        this.element.appendChild(bag);
        this.bag = document.querySelector('.' + this.bagClassName);
    };

    this.createLoader = function() {
        var loader = document.createElement('div');
        loader.style.display = 'none';
        loader.className = 'ph-loader';

        this.element.appendChild(loader);
        this.loader = document.querySelector('.ph-loader');
    };

    this.updateLoader = function() {
        this.element.removeChild(this.loader);
        this.createLoader();
    };

    this.loaderToggle = function(status, fn) {
        this.loader.style.display = 'block';

        if (status === true)
            this.animation().fadeIn(this.loader, fn);
        else if (status === false)
            this.animation().fadeOut(this.loader, fn);
    };

    this.request = function() {
        var self = this,
            url = self.path + '' + (self.currentPage + 1),
            xhr = new XMLHttpRequest();

        if (window.location.pathname.indexOf(self.path) > -1)
            url = '../' + url;

        self.loaderToggle(true);

        xhr.open('GET', encodeURI(url));
        xhr.onload = function() {
            if (xhr.status === 200 || self.trustedRequest) {
                var bodyItems = (/<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(xhr.responseText).slice(1))[0];
                self.trustedRequest = true;
                self.loaderToggle(false, self.render.bind(self, bodyItems));
            } else {
                self._debug('Request failed. Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    };

    this.render = function(bodyItems, skip) {
        var self = this;
        self.bag.innerHTML = bodyItems;
        var nextPosts = self.bag.querySelectorAll(self.itemSelector);

        if (!nextPosts.length)
            return self.finished();

        if (skip !== true) {
            var navSel = document.querySelector(self.navSelector);
            return self.animation().fadeOut(navSel, function() {
                return self.render(bodyItems, true);
            });
        }

        for (var i = 0; i < nextPosts.length; i++) {
            self.element.appendChild(nextPosts[i])
        }

        self.toNext();
    }

    this.toNext = function() {
        this.updateLoader();
        this.currentPage = this.currentPage + 1;
        this.loading = false;
    }

    this.finished = function(){ 
        var finished = document.createElement('div');
        finished.className = 'ph-end';
        finished.innerHTML = this.defaults.finishedMsg;
        this.element.appendChild(finished);
    }

    this.on = function(selector) {
        this.sel = selector;
        this.element = document.querySelector(selector);
        return this;
    };

    this.set = function(config) {
        if (config.navSelector)
            this.navSelector = config.navSelector;
        if (config.nextSelector)
            this.nextSelector = config.nextSelector;
        if (config.itemSelector)
            this.itemSelector = config.itemSelector;
        if (config.path)
            this.path = config.path;
        if (config.basePath)
            this.basePath = config.basePath;
        if (config.finishedMsg)
            this.defaults.finishedMsg = config.finishedMsg;
        if (config.animationSpeed) {
            this.defaults.animationSpeed = config.animationSpeed;

            if (config.animationSpeed === "slow")
                this.defaults.animationSpeed = 800;
            if (config.animationSpeed === "normal")
                this.defaults.animationSpeed = 500;
            if (config.animationSpeed === "fast")
                this.defaults.animationSpeed = 300;
        }
        this.init();
    };

    this.init = function() {
        this.basePath = this.basePath || this.getUrlPath();
        this.path = this.path || this.getPath()[0] || 'page';
        this.createLoader();
        this.createBag();
        this.setEventScroll();
    };

    this.setEventScroll = function() {
        var self = this;
        window.addEventListener("scroll", function(ev) {
            self.scroller(window.scrollY || ev.target.activeElement.scrollTop);
        });
    };

    this._debug = function(message) {
        console.log('Inphinity: ', message);
    };

    this.animation = function() {
        var self = this;
        return {
            fadeOut: function(el, callback) {
                el.style.opacity = 1;
                var last = +new Date();
                var tick = function() {
                    el.style.opacity = +el.style.opacity - (new Date() - last) / self.defaults.animationSpeed;
                    last = +new Date();

                    if (+el.style.opacity > 0) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                    } else {
                        el.style.display = 'none';
                        if (typeof callback === 'undefined') return true;
                        callback();
                    }
                };
                tick();
            },
            fadeIn: function(el, callback) {
                el.style.opacity = 0;
                var last = +new Date();
                var tick = function() {
                    el.style.opacity = +el.style.opacity + (new Date() - last) / self.defaults.animationSpeed;
                    last = +new Date();

                    if (+el.style.opacity < 1) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                    } else {
                        if (typeof callback === 'undefined') return true;
                        callback();
                    }
                };
                tick();
            }
        }
    };

    return this.on.bind(this);
})();
