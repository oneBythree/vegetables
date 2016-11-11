<script>
// import v from 'lodash';
export default {
    data(router) {              
        return {
            Index: {
                 title:'',
                 isChildrenForm:false,   
           }
        }

    },
    ready:function(){
    	this.DefualtData()
    },
    methods: {
       IsEdit:function(params){
       		return isEmptyObject(this.$route.query);
       },
       TitleText:function(){
       		this.Index.title = this.IsEdit(this.$router.query)?'添加蔬菜进场':'修改蔬菜进场';
       },
       DefualtData:function(){
       		this.TitleText();
       },
       InChildrenForm:function() {
       		this.Index.isChildrenForm = true;
       		this.Index.title = '添加商品明细';
       },
       BackFartherForm:function(){
       		this.Index.isChildrenForm = false;
       		this.TitleText();
       }
    }
}

function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
} 
</script>
<template>
<header class="mui-bar mui-bar-nav">
  <a  v-link="{ path: '/into' }" class="mui-icon mui-icon-left-nav"></a>
  <h1 class="mui-title">{{Index.title}}</h1>
</header>
 <div class="mui-content">
	<div class="mainform" v-if="!Index.isChildrenForm">
		<div class="mui-input-group" >
		    <div class="mui-input-row">
		        <label>供应商</label>
		        <input type="text" class="mui-input-clear" placeholder="请输入用户名">
		    </div>
		    <div class="mui-input-row">
		        <label>进场日期*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入密码">
		    </div>
		    <div class="mui-input-row">
		        <label>产地*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入密码">
		    </div>
		    <div class="mui-input-row">
		    	 <label>生产基地*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入生产基地">
		    </div>
		    <div class="mui-input-row">
		    	 <label>运输车牌号</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入运输车牌号">
		    </div>
		     <div class="mui-input-row">
		    	 <label>供货单位*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入供货单位">
		    </div>
		</div>
		<div class="mui-button-row">
		    <button  type="button" class="mui-btn mui-btn-danger">重置</button>
		    <button type="button" class="mui-btn mui-btn-primary" @click="InChildrenForm()">保存</button>
		</div>
 	</div>
 	<div class="mainform" v-else>
		<div class="mui-input-group" >
		    <div class="mui-input-row">
		        <label>商品名称</label>
		        <input type="text" class="mui-input-clear" placeholder="请输入用户名">
		    </div>
		    <div class="mui-input-row">
		        <label>规格*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入密码">
		    </div>
		    <div class="mui-input-row">
		        <label>数量*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入密码">
		    </div>
		    <div class="mui-input-row">
		    	 <label>重量(公斤)*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入生产基地">
		    </div>
		    <div class="mui-input-row">
		    	 <label>单价(元/公斤)</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入运输车牌号">
		    </div>
		     <div class="mui-input-row">
		    	 <label>总价*</label>
		        <input type="text" class="mui-input-clear mui-input-password" placeholder="请输入供货单位">
		    </div>
		     <div class="mui-input-row">
		    	 <label>备注*</label>
		    	 <textarea  placeholder="请输入供货单位"></textarea>
		    </div>
		</div>
		<div class="mui-button-row">
		    <button  type="button" class="mui-btn mui-btn-danger" @click="BackFartherForm()">返回修改</button>
		    <button type="button" class="mui-btn mui-btn-primary">确认添加</button>
		</div>
 	</div>
</div>
</template>
