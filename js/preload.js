// 插件写法，面向对象方法，沙箱模式
(function($) {
  function PreLoad(imgs, options) {
    // 只有一张图片的时候，传递字符串
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    // $extend合并对象，拷贝
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    // 加载顺序是无序还是有序
    if (this.opts.order === "ordered") {
      this._ordered() // 有序
    } else {
      this._unordered(); // 无序
    }
  }
  // 默认参数
  PreLoad.DEFAULTS = {
    order: 'unordered', //无序预加载
    each: null, //每张图片加载完毕后执行
    all: null //所有图片加载完后执行
  };
  // 在原型上写方法
  PreLoad.prototype._unordered = function(){   //无序加载
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;
    $.each(imgs, function(i, src) {
      // 传进来的src必须是字符串
      if (typeof src != 'string') {
        return;
      }
      var imgObj = new Image();
      $(imgObj).on('load error', function() {
        opts.each && opts.each(count);
        if (count >= len - 1) {
          opts.all && opts.all();
        }
        count++;
      });
      imgObj.src = src;
    });
  };
  PreLoad.prototype._ordered = function() {
    var opts = this.opts,
        imgs = this.imgs,
        len = imgs.length,
        count = 0;

        load();

        function load() {
          var imgObj = new Image();
          $(imgObj).on('load error', function() {
              opts.each && opts.each(count);
              if (count >= len) {
                //所有图片已经加载完毕
                opts.all && opts.all();
              } else {
                load();
              }
              count++;
          });
          imgObj.src = imgs[count];
        }
  }
  // $.fn.extend -> $('#img').preload()
  // 工具函数
  $.extend({
    preload: function(imgs, opts) {
      new PreLoad(imgs, opts);
    }
  });
})(jQuery);
