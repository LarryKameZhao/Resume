window.Model = function(options){
    let resourceName = options.resourceName
    return {
      init: function(){
        var APP_ID = 'qdWMBwQtpKRcmRXaAPD6WF61-gzGzoHsz';
      var APP_KEY = 'Rzhv9CVWxaf1sYTjc9OYABWX';
        AV.init({ appId: APP_ID, appKey: APP_KEY })
      },
      fetch: function(){
        var query = new AV.Query(resourceName);
        return query.find() // Promise 对象
      },
      save: function(object){
        var X = AV.Object.extend(resourceName);
        var x = new X();
        return x.save(object)
      }
    }
  }