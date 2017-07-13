# 图片预加载
浏览前预加载图片，使用jquery封装插件，其中有三个实例展示。

- 图片无序预加载，翻页展示，loading显示百分比进度
- qq表情无序预加载，打开展示，显示loading
- 漫画有序预加载，翻页展示

# 使用方法:
## 先引入Preload插件
## 调用示例：
	$.preload(imgs,{
      // 每一次加载完毕执行的方法
      each: function(count) {
        $progress.html(Math.round((count + 1) / len * 100) + '%');
      },
      // 所有的图片加载完毕执行的方法
      all: function() {
        $('.loading').hide();
        document.title = '1/' + len;
      }
    })

接收两个参数，第一个是图片地址的数组，第二个是每张图片加载完毕或全部图片加载完毕，以及加载顺序是有序还是无序的参数，默认是无序