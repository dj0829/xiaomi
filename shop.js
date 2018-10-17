//获取商品信息,点击添加,判断商品是否存在,数字累加;

//如果数据请求成功但是没有打印出来,可能就是回调函数有问题
var shop = (function(){
    return {
        //基本结构:初始化
        init:function(ele){
            this.$ele = document.querySelector(ele);
            this.event()
            //数据一开始就要获取数据
            this.getData();
        },
        //基本结构获取时间
        event:function(){
            var _this = this;
            this.$ele.addEventListener('click', function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                // 给添加购物车按钮添加事件
                if(target.nodeName === 'BUTTON' && target.className === 'btn shop-btn-car') {
                    // 获取商品id(自定义属性的)
                    var id = target.getAttribute('attr-id');
                    // console.log(id);
                    // 获取商品数量
                    var count = target.parentNode.querySelector('.shop-count').value;
                //    console.log(target);
                    _this.addCar(id, count);
                    // console.dir(count);
                    alert("宝贝已加入购物车");
                }
            }, false);
        },
        //获取数据
        getData:function(){
            
            var _this = this; //改变sucess的this指向
            var params = {
                url:'shop.json',//获取服务器上的shop.json
                success: function(data){ //回调函数,回调insertData
                   _this.insertData(data);
                }
            }
            //获取数据需要ajax请求数据
            sendAjax(params);
        },
        //插入数据(渲染数据)
        insertData:function (data){
            //拿到data里面的数据
            // console.log(data);
            data = data.data;
            var arr = [];
            for (var i = 0 ;i < data.length; i++){
                //复制整条数据,只需要改变对应的data值
           arr.push(`        <div class="car">
           <div class="txt">
               <h2 class="shop-name">${data[i].name}</h2>
               <h3>「你值得拥有」
               <b>潮流镜面渐变色 / 2400万自拍旗舰 / 7.5mm超薄机身 / 6.26"小刘海全面屏 / AI裸妆美颜 / 骁龙660AIE处理器</b>
               </h3>
               <span>售价:250.41元</span>
           </div>
           <div class="present">
               <h4>赠品</h4>
               <span>赠米粉卡，内含100元话费</span>
           </div>
           <div class="location">
               <li>
                   <i class="iconfont icon-renyuandingwei"></i>
               </li>
               <li>北京</li>
               <li>北京</li>
               <li>北京</li>
               <li>北京</li>
               <li>
                   <a href="#">修改</a>
               </li>
               </br>
               <li class="li-7">北京</li>
           </div>
           <div class="smallbox-1">
               <h5>选择版本</h5>
               <a href="#" class="small-1">4GB+64GB全网通
                   <span>1339元</span>
               </a>
               <a href="#" class="small-1 small-2">4GB+64GB全网通
                   <span>1339元</span>
               </a>
               <a href="#" class="small-1">4GB+64GB全网通
                   <span>1339元</span>
               </a>
           </div>
           <div class=" smallbox-2">
               <h5>选择颜色</h5>
               <a href="#" class="small-1">
                   <img src="images/dp_06.jpg" alt="img">
                   <span>深空灰</span>
               </a>
               <a href="#" class="small-1 small-2">
                   <img src="images/dp_06.jpg" alt="img">
                   <span>深空灰</span>
               </a>
               <a href="#" class="small-1">
                   <img src="images/dp_06.jpg" alt="img">
                   <span>深空灰</span>
               </a>
               <br>
           </div>
           <div class=" smallbox-3">
               <h5>选择小米提供的保障服务
                   <a href="#">了解保障服务</a>
               </h5>
               <a href="#">
                   <div class="small-3 small--4">
                       <div class="circle"></div>
                       <i class="iconfont icon-baozhang-copy"></i>
                       <span class="span-1">意外保障服务</span>
                       <span class="span-2">意外保障服务</span>
                       <span class="span-3">意外保障服务</span>
                       <span class="span-4">99元</span>
                   </div>
               </a>
               <a href="#">
                   <div class="small-3">
                       <div class="circle"></div>
                       <i class="iconfont icon-baozhang-copy"></i>
                       <span class="span-1">意外保障服务</span>
                       <span class="span-2">意外保障服务</span>
                       <span class="span-3">意外保障服务</span>
                       <span class="span-4">99元</span>
                   </div>
               </a>
           </div>
           <div class="price">
               <h4>小米8 青春版 4GB+64GB 深空灰<span>1399元</span></h4>
               <b class="shop-price">总计 ：${data[i].price}</b>
           </div>
           <div class="inpp">
               <input type="number" class="count shop-count" min="1" value="1">
               <button class="btn shop-btn-car" attr-id=${data[i].id}>加入购物车</button>
               <button class="but">❤&nbsp;喜欢</button>
           </div>
       </div>
`) 
            }
           //把商品数据渲染到页面中
            this.$ele.innerHTML = arr.join('');
        },
        //写一个单独的函数完成加入购物车功能
        addCar:function(id,count){
            //把商品数据添加到本地,提供给购物车页面使用
            //把数据添加到shop里面,数据类型是个数组,把多个商品信息存放进去
            //添加第一个商品是,可能localStorade
            //本地存储都是字符串的形式,需要转换为对象
            var shop = localStorage.shop||'[]';
            //转换为对象进行操作
            shop = JSON.parse(shop);
            //判断原有数据中是否已经添加过该商品,如果添加过直接进行累加,如果没有 添加一条新数据
             for(var j = 0 ;j < shop.length ;j++){
                 if(shop[j].id===id){
                     //证明商品已经存在,返回来是字符串类型,转换成数字类型(累加)
                    shop[j].count = Number(shop[j].count) + Number(count);
                     break;
                 }                
                 }
                 if(j === shop.length){
                    //商品不存在,添加一条新数据
                    shop.push({id:id ,count:count});              
             }
            localStorage.shop = JSON.stringify(shop);   
        }
    }
}())