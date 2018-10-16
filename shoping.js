var shoping = (function(){

    return{
        init:function(ele){
            this.$ele = document.querySelector(ele);
            this.event();
            this.getShop();//页面一加载就渲染数据
            // this.getData();
        },
        event:function(){
            var _this = this;
            this.$ele.oninput = function(e){
                if(e.target.className =='shop-count'){
                    //获取商品总价
                    var _parent = e.target.parentNode
                    _parent.querySelector('.shop-total').innerHTML = e.target.value * _parent.querySelector('.shop-price').innerHTML;
                }
            }
        },
        //获取商品数据(ajax)
        getShop:function(){
            var _this = this; //改变sucess的this指向
            var params = {
                url:'shop.json',//获取服务器上的shop.json
                success: function(data){ //回调函数,回调insertData
                 //把商品的数据放到实例的属性上
                    _this.shop = data.data;
                    _this.getData();
                }
            }
            //获取数据需要ajax请求数据
            sendAjax(params);
        },
        //获取购物车数据
        getData:function(){
            this.carShop = JSON.parse(localStorage.shop||'[]');
            this.insertData(this.carShop);
        },
        //把商品渲染到页面中
        insertData:function(data){
            // console.log(data);
            var arr=[];
            for(var i = 0 ;i< data.length ;i++){
                //通过id获取商品信息(出去工作是后台提供id,现在自己操作)
                var shops;
               for(var j = 0 ;j <this.shop.length;j++){
                   if(this.shop[j].id == data[i].id){
                       //获取商品信息
                       shops = this.shop[j];
                       break;
                   }
               }
                arr.push(`<div>
                <p></p>
                <a href='#'> <img src="images/dp_11.jpg" alt="t"></a>
                <span class="shop-name">${shops.name}</span>
                <span class="shop-price">${shops.price}</span>               
                <input class="shop-count" type="number" value="${data[i].count}" min="1">
                <span class="shop-total">${shops.price*data[i].count}</span>
                <span class="shop-tip">${shops.ps}</span>
                <button class="btn shop-btn-car attr-id=${data[i].id}">x</button>               
                </div >
                <div class="settle">
                <a href="xiaomi111.html">继续购买</a>
                <b>共 ${data[i].count} 件商品，已选择 ${data[i].count} 件</b>
                <button class="set">结算</button>
                </div>`)
        
            }
            this.$ele.innerHTML = arr.join('');
        }
    }
}())