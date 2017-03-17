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
								<div id="login-box" class="login-box visible widget-box no-border">
                                	<div class="widget-body">
                                    	<div class="widget-main">
                                        	<h4 class="header blue lighter bigger">
												<i class="ace-icon fa fa-coffee green"></i>
												请输入您的信息
											</h4>
                                        <div class="space-6"></div>
                                        <form>
                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
															<input v-model="user.name" type="text" class="form-control" placeholder="用户名">
															<i class="ace-icon fa fa-user"></i>
														</span>
                                                </label>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
															<input v-model="user.pwd" type="password" class="form-control" placeholder="密码">
															<i class="ace-icon fa fa-lock"></i>
														</span>
                                                </label>
                                                <label class="input-group">
                                                	<div class="input-group">
                                                		<input v-model="user.code" type="text" class="form-control search-query" placeholder="验证码">
                                                		<span class="input-group-btn">
															<img @click="getCode" :src="code" alt="">
														</span>
                                                	</div>
                                                </label>
                                                <div class="space"></div>
                                                <div class="clearfix text-left">
                                                    <!-- <label class="inline">
                                                        <input :checked="remember" type="checkbox" class="ace">
                                                        <span class="lbl"> 记住密码</span>
                                                    </label> -->
                                                    <button :disabled="disLogin" @click="login" type="button" class="width-35 pull-right btn btn-sm btn-primary">
                                                        <i class="ace-icon fa fa-key"></i>
                                                        <span class="bigger-110">登录</span>
                                                    </button>
                                                </div>
                                                <div class="space-4"></div>
                                            </fieldset>
                                        </form>
                                        <div class="social-or-login center">
                                            <span class="bigger-110">欢迎使用</span>
                                        </div>
                                        <div class="space-6"></div>
                                    	</div>
                                    <!-- /.widget-main -->
                                    <div class="toolbar clearfix">
                                        <div>
                                            <router-link to="/reset-pwd" class="forgot-password-link">
                                                <i class="ace-icon fa fa-arrow-left"></i> 忘记密码
                                            </router-link>
                                        </div>
                                        <div>
                                            <router-link to="/register" class="user-signup-link">
													去注册	
													<i class="ace-icon fa fa-arrow-right"></i>
											</router-link>
                                        </div>
                                    </div>
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
					name: '',
					pwd: '',
					code:''
				},
				code: this.$store.state.base.url + 'parter/captcha?r=' + new Date().getTime(),
				disLogin: true,
				remember: true
			}
		},
		watch: {
			user: {
				handler: function(){
					if($.trim(this.user.name) !=='' && $.trim(this.user.pwd)!==''&& $.trim(this.user.code)!==''){
						this.disLogin = false
					}else{
						this.disLogin = true
					}
				},
				deep: true
			}
		},
		methods: {
			login() {
				var url = this.$store.state.base.url + 'parter/login';
				var that = this;
				if(this.user.name.length>20){
					layer.msg('用户名不能超过20位');
					return;
				}
				if(this.user.pwd.length>20){
					layer.msg('密码不能超过20位');
					return;
				}
				if(this.user.code.length!==this.$store.state.reg.codeLenth){
					layer.msg('请输入四位验证码');
					return;
				}
				$.ajax({
					url:url,
					data:{
						email:this.user.name,
						password:md5(this.user.pwd),
						validateCode:this.user.code
					},
					dataType: 'json',
					success: function(res){
						if(res.code==='10000'){
							that.$router.push('/home')
						}else{
							layer.msg(res.message);
						}
					},
					error: function(data,status){
						console.log(status);
					}
				});
			},
			getCode() {
				this.code = this.$store.state.base.url + 'parter/captcha?r=' + new Date().getTime();
			}
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