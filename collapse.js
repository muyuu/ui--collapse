(function(definition){
    "use strict";

    var moduleName = "uiCollapse";

    var root = (typeof self === "object" && self.self === self && self) || (typeof global === "object" && global.global === global && global);

    if (typeof exports === "object") {
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})(function(root, $){
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------
    /**
     * judge exist function
     * @param  {any} x anything
     * @return {boolean}
     */
    function existy(x){ return x != null; }

    /**
     * judge true
     * @param  {any} x anything
     * @return {boolean}
     */
    function truthy(x){ return (x !== false) && existy(x); }

    /**
     * trim string "."
     * @param  {string} string text
     * @return {string}        cutted "." string
     */
    function trimDot(string){ return string.replace(".", ""); }

    /**
     * judge undefined
     * @param  {any} obj anything
     * @return {boolean}
     */
    function isUndefined(obj){ return obj === void 0; }


    // -------------------------------------------------------
    // module
    // -------------------------------------------------------

    /**
     * module factory
     * this module is dependent on jQuery
     * @prop {string} rootElement default root element class or id
     * @prop {array} instance
     * @namespace
     */
    function factory(param){
        var rootElement = ".js-collapse";
        var opt = existy(param) ? param : {};

        var $self = $(rootElement);
        if (existy(opt.root)) $self = opt.root instanceof jQuery ? param.root : $(param.root);

        return $self.map(function(key, val){ return new Module(opt, val); });
    }


    /**
     * constructor
     * @type {Function}
     */
    function Module(opt, moduleRoot){

        // options
        this.opt = {
            current  : opt.current || "close",
            closeBtn : opt.closeBtn || ".js-collapse__closeBtn",
            animation: opt.animation || true,

            onLoad   : opt.onLoad || null,
            onClick  : opt.onClick || null,
            onOpen   : opt.onOpen || null,
            onClose  : opt.onClose || null
        };

        // elements
        this.$root = $(moduleRoot);
        this.$target = $(this.$root.attr("data-target"));
        this.$closeBtn = $(this.opt.closeBtn);

        // states
        this.state = this.opt.current;

        this.init();
    }

    Module.prototype.init = function() {
        this.$target.hide();
        this.setRootEvent();
        this.setCloseEvent();

        // callback
        if ( typeof this.opt.onLoad === 'function' ) this.opt.onLoad(this.$root);
        return this;
    };

    Module.prototype.setRootEvent = function() {
        var self = this;
        this.$root.on("click", function(){
            self.toggleEvent();
        });
        return this;
    };

    Module.prototype.setCloseEvent = function() {
        var self = this;
        this.$closeBtn.on("click", function(){
            self.close();
        });
        return this;
    };

    Module.prototype.toggleEvent = function() {
        if(this.state === 'open') return this.close();
        if(this.state === 'close') return this.open();
    };

    Module.prototype.close = function() {
        var self = this;

        self.$target.slideUp(function(){
            if (typeof self.opt.onClick === 'function') self.opt.onClick();
        });
        self.state = "close";
        return self;
    };

    Module.prototype.open = function() {
        var self = this;

        self.$target.slideDown(function(){
            if (typeof self.opt.onClick === 'function') self.opt.onClick();
        });
        self.state = "open";
        return self;
    };

    return factory;
});

