<style scoped lang="sass">
 h1.title{
    font-size: .84rem;
    color:#22ac38;
    margin:1.18rem 0 .94rem;
    text-align: center;
}
form.login{
    font-size:.3rem;
    padding:0 .42rem;
}
form.login ul.list{
    background: #fff;
    border-radius: 3px;
    padding:0 .2rem;
}
form.login ul.list li{
    position: relative;
    height:.78rem;
    line-height: .78rem;
}
form.login ul.list li:not(:last-of-type):after{
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}
form.login li.flex-box>span{
    display:inline-block;
    margin-right: 0.2rem;
    width:1rem; 
}
form.login li.flex-box input{
    width: 100%;
    height:100%;
}
form.login a.m-submit{
    display: block;
    background: #22ac38;
    color:#fff;
    margin-top: .4rem;
    height: .84rem;
    line-height: .84rem;
    text-align: center;
    border-radius: 3px;
}

</style>
<template>
    <header class="m-header">
         <a href="javascript:;" class="left-icon">
             <i class="iconfont icon-back"></i>
         </a>
         <h1>登录</h1>
    </header>
    <div class="m-content">
        <h1 class="title">E追溯</h1>  
        <form class="login">   
            <ul class="list">
                <li class="flex-box mui-input-row">
                    <span>用户名:</span>
                    <div class="flex-1">
                        <input  type="text" maxlength="10">
                    </div>
                </li>
                <li class="flex-box ">
                    <span>密&nbsp;码:</span>
                    <div class="flex-1">
                        <input type="password" maxlength="10">
                    </div>
                </li>
            </ul>
            <a href="/menu" class="m-submit">确认登录</a>
        </form>
    </div>
</template>
<script>
 export default{

 }
</script>
