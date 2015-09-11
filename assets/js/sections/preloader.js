var config = require('../config');
var utils = require('../utils');
var Tween = require('gsap');
var classes = require('dom-classes');

function Preloader(onComplete) {
    
    this.preloaded = onComplete;
    this.view = config.$view;
    this.el = null;

};

Preloader.prototype = {
    
    init: function(req, done) {
        
        var self = this;

        classes.add(config.$body, 'is-loading');
        
        this.createDOM();
        
        done();
        
    },

    createDOM: function() {
        
        var page = this.view.firstChild;

        this.el = utils.createEl({
            selector: 'div',
            styles: 'preloader',
            html: '<div class="vertical-center"><div class="vertical-el"><p>Preloader</p></div></div>'
        });
        
        this.view.insertBefore(this.el, page);
        
    },

    resize: function(width, height) {},
    
    animateIn: function(req, done) {
        
        var self = this;
        
        var tl = new TimelineMax({ paused: true, onComplete: function(){
            done();
            // call this.preloaded to bring the first route
            self.preloaded();
        }});
        tl.to(this.el, 1, {autoAlpha: 1});
        tl.restart();
        
    },
    
    animateOut: function(req, done) {

        var tl = new TimelineMax({ paused: true, onComplete: done });
        tl.to(this.el, 1, {autoAlpha: 0});
        tl.restart();
        
    },
    
    destroy: function(req, done) {

        classes.add(config.$body, 'is-loaded');
        classes.remove(config.$body, 'is-loading');

        this.view.removeChild(this.el);
        
        done();
    
    }

};

module.exports = Preloader;