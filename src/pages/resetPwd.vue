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
												<i class="ace-icon fa fa-unlock blue"></i>
												重置密码
											</h4>
                                        <div class="space-6"></div>
                                        <p class="text-left"> 请输入您的信息 </p>
                                        <form class="text-left">
                                            <fieldset>
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
                                                <div class="space"></div>
                                                <div class="clearfix text-center">
                                                    <button @click="resetPwd" :disabled="disResetPwd" type="button" class="width-65 btn btn-sm btn-success">
                                                        <span class="bigger-110">重置密码</span>
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
		name: 'resetPwd',
		data() {
			return {
				user:{
					mobile: '',
					code:'',
				},
				disResetPwd: true,
				disGetCode: true,
			}
		},
		watch: {
			user: {
				handler: function(){
					if($.trim(this.user.mobile)!==''&& $.trim(this.user.code)!==''){
						this.disResetPwd = false
					}else{
						this.disResetPwd = true
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
					return false;
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
			resetPwd() {
				var url = this.$store.state.base.url + 'parter/resetPassword';
				var that = this;

				if(!this.$store.state.reg.mobile.test(this.user.mobile)){
					layer.msg('请输入正确手机号');
					return false;
				}
				if(this.user.code.length !== this.$store.state.reg.codeLenth){
					layer.msg('请输入4位验证码');
					return false;
				}
				$.ajax({
					url:url,
					data:{
						mobile: this.user.mobile,
                        mbCode: this.user.code
					},
					dataType: 'json',
					type: 'post',
					success: function(res){
						if(res.code==='10000'){
							layer.msg('修改成功，即将跳转到登录页',{
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