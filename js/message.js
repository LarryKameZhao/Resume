
// !function(){
//   var model = {
//     // 获取数据
//     init: function(){
//       var APP_ID = 'qdWMBwQtpKRcmRXaAPD6WF61-gzGzoHsz';
//       var APP_KEY = 'Rzhv9CVWxaf1sYTjc9OYABWX';
//       AV.init({ appId: APP_ID, appKey: APP_KEY })
//     },
//     fetch: function(){ 
//       var query = new AV.Query('Message');
//       return query.find() // Promise 对象
//     },
//     // 创建数据
//     save: function(name, content){
//       var Message = AV.Object.extend('Message');
//       var message = new Message();
//       return message.save({  // Promise 对象
//         'name': name,
//         'content': content
//       })
//     }
//   }

//   var view = document.querySelector('section.message')


//   var controller = {
//     view: null,
//     model: null,
//     messageList: null,
//     init: function(view, model){
//       this.view = view
//       this.model = model

//       this.messageList = view.querySelector('#messageList')
//       this.form = view.querySelector('form')
//       this.model.init()
//       this.loadMessages()
//       this.bindEvents()
//     },
//     loadMessages: function(){
//       this.model.fetch().then(
//         (messages) => {
//           let array = messages.map((item)=> item.attributes )
//           array.forEach((item)=>{
//             let li = document.createElement('li')
//             li.innerText = `${item.name}: ${item.content}`
//             this.messageList.appendChild(li)
//           })
//         } 
//       )
//     },
//     bindEvents: function(){
//       this.form.addEventListener('submit', function(e){
//         e.preventDefault();
//         console.log('bindEvents');
//         this.saveMessage();
//       })
//       console.log('brak')
//     },
//     saveMessage: function(){
//       console.log('here1')
//       let myForm = this.form
//       let content = myForm.querySelector('input[name=content]').value
//       let name = myForm.querySelector('input[name=name]').value
//       this.model.save(name, content).then(function(object) {
//         let li = document.createElement('li')
//         li.innerText = `${object.attributes.name}: ${object.attributes.content}`
//         let messageList = document.querySelector('#messageList')
//         messageList.appendChild(li)
//         myForm.querySelector('input[name=content]').value = ''
//         console.log('success')
//         console.log(object)
//       });
//     }

//   }

//   controller.init(view, model)


// }.call()



!function(){
  var model = Model({resourceName:'Message'})

  var view = View('section.message')

  var controller = Controller({
    messageList: null,
    form: null,
    init: function(view, controller){
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.loadMessages()
      // object 上有这三个属性吗
    },
    loadMessages: function(){
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item)=> item.attributes )
          array.forEach((item)=>{
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        } 
      )
    },
    bindEvents: function(){
      console.log(this.form)
      this.form.addEventListener('submit', (e)=>{
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function(){
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save({
        'name': name, 'content': content
      }).then(function(object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        console.log(object)
      })
    }
  })

  controller.init(view, model)


}.call()