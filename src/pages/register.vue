<template>
	<div class="login-layout blur-login">
		<div class="main-container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="login-container">
						<div class="center">
							<h1>
								<span class="red">会员</span>
								<span class="white">后台管理系统</span>
							</h1>
							<h4 class="blue" id="id-company-text">© 旺财游戏</h4>
							<div class="space-6"></div>
							<div class="position-relative">
								<div id="login-box" class="signup-box visible widget-box no-border">
                                	<div class="widget-body">
                                    	<div class="widget-main">
                                        	<h4 class="header green lighter bigger">
												<i class="ace-icon fa fa-users blue"></i>
												新用户注册
											</h4>
                                        <div class="space-6"></div>
                                        <p class="text-left"> 请输入您的信息 </p>
                                        <form class="text-left">
                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
															<input v-model="user.wx" type="text" class="form-control" placeholder="请输入您的微信号">
														</span>
                                                </label>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
															<input v-model="user.mobile" class="form-control" placeholder="请输入您的手机号">
														</span>
                                                </label>
                                                <label class="input-group">
                                                	<div class="input-group">
														<input v-model="user.code" type="text" class="form-control search-query" placeholder="验证码">
														<span class="input-group-btn">
															<button @click="getCode" :disabled="disGetCode" type="button" class="btn btn-purple btn-sm">
																获取验证码
															</button>
														</span>
													</div>
                                                </label>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
														<input disabled type="password" class="form-control" placeholder="密码默认是手机后八位，请修改">
														<i class="ace-icon fa fa-lock"></i>
													</span>
                                                </label>
                                                <label class="block">
                                                    <input v-model="user.agree" type="checkbox" class="ace">
                                                    <span class="lbl">
														同意
														<a href="http://user.yayagame.cn/notice/agreement.txt">用户协议</a>
													</span>
                                                </label>
                                                <div class="space"></div>
                                                <div class="clearfix text-center">
                                                    <button @click="register" :disabled="disRegister" type="button" class="width-65 btn btn-sm btn-success">
                                                        <span class="bigger-110">注册</span>
                                                    </button>
                                                </div>
                                                <div class="space-4"></div>
                                            </fieldset>
                                        </form>
                                    	</div>
                                    	<div class="toolbar center">
                                        	<router-link to="/" class="back-to-login-link">
                                            	 返回登录
                                        	</router-link>
                                    	</div>
                                    <!-- /.widget-main -->
                                	</div>
                                <!-- /.widget-body -->
                            </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'login',
		data() {
			return {
				user:{
					wx: '',
					mobile: '',
					code:'',
					agree: false
				},
				disRegister: true,
				disGetCode: true,
			}
		},
		watch: {
			user: {
				handler: function(){
					if(this.user.agree && $.trim(this.user.wx) !=='' && $.trim(this.user.mobile)!==''&& $.trim(this.user.code)!==''){
						this.disRegister = false
					}else{
						this.disRegister = true
					}
					if($.trim(this.user.mobile)!==''){
						this.disGetCode = false
					}else{
						this.disGetCode = true
					}
				},
				deep: true
			}
		},
		methods: {
			getCode() {
				var url = this.$store.state.base.url + 'parter/mobileCode';
				if(!this.$store.state.reg.mobile.test(this.user.mobile)){
					layer.msg('请输入正确手机号');
					return;
				}
				$.ajax({
					url:url,
					data:{
						 mobile: this.user.mobile
					},
					dataType: 'json',
					type: 'get',
					success: function(res){
						if(res.code==='10000'){
							layer.msg('验证码已发送');
						}else{
							layer.msg(res.message);
						}
					},
					error: function(data,status){
						console.log(status);
					}
				});
			},
			register() {
				var url = this.$store.state.base.url + 'parter/register';
				var that = this;
				if(this.user.wx.length > 20){
					layer.msg('微信号不能大于20位');
					return;
				}
				if(!this.$store.state.reg.mobile.test(this.user.mobile)){
					layer.msg('请输入正确手机号');
					return;
				}
				if(this.user.code.length !== this.$store.state.reg.codeLenth){
					layer.msg('请输入4位验证码');
					return;
				}
				$.ajax({
					url:url,
					data:{
						mobile: this.user.mobile,
                        weixin: this.user.wx,
                        mbCode: this.user.code
					},
					dataType: 'json',
					type: 'post',
					success: function(res){
						if(res.code==='10000'){
							layer.msg('恭喜您注册成功，即将跳转到登录页',{
                                end: function(){
                                    that.$router.push('/login')
                                }
                            });
						}else{
							layer.msg(res.message);
						}
					},
					error: function(data,status){
						console.log(status);
					}
				});
			},
		},
		
	}
</script>
<style>
	.input-group-btn{
		height: 34px;
		width: auto;
		cursor: pointer;
	}
	img {
		height: 100%;
	}
</style>