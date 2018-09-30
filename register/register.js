var register = (function(){
    return{
        init:function(ele){
           this.$ele = document.querySelector(ele);
           this.$loginBth = this.$ele['login-btn'];
           this.$usernameInp = this.$ele['username'];
           this.$passwordInp = this.$ele['password'];
           this.event();
        },
        event:function(){
            var _this = this;
            this.$loginBth.onclick = function(){
                var params = {
                    method:'post',
                    data:{
                        username:_this.$usernameInp.value,
                        password:_this.$passwordInp.value
                    },
                    success:function(data){
                        data = JSON.parse(data);
                        _this.register(data);
                    }
                }
                sendAjax('http://localhost:8029/xiaomi/xiaomi111.html')
            }
        }
    }
}())
