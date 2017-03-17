<template>
    <div>
        <div class="page-header">
            <h1>添加推广员</h1>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right">新推广员昵称:*</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="promoter.name" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right">新推广员微信号:*</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="promoter.wx" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right">新推广员游戏ID:*</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="promoter.gamerId" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right">图片验证码:*</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="promoter.inputImgCode" class="col-xs-4 col-sm-5">
                            <button @click="getImgCode" class="btn btn-primary btn-sm">{{promoter.imgCode}}
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right">新推广员手机号:*</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="promoter.mobile" class="col-xs-6 col-sm-5">
                            <button @click="getCode" :disabled="getCodeDis" class="btn btn-primary btn-sm">获取手机验证码
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right">验证码: *</label>
                        <div class="col-sm-9">
                            <input type="text" v-model="promoter.code" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="col-md-offset-3 col-md-9">
                            <button @click="addPromoter" :disabled="subDis" class="btn btn-info" type="button">
                                <i class="ace-icon fa fa-check bigger-110"></i> 添加
                            </button>
                            &nbsp; &nbsp; &nbsp;
                            <router-link to="/home/my-promoter" class="btn" type="reset">
                                <i class="ace-icon fa fa-undo bigger-110"></i> 取消
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                promoter: {
                    name: '',
                    wx: '',
                    gamerId: '',
                    inputImgCode: '',
                    imgCode: 'xxxx',
                    mobile: '',
                    code: '',
                },
                getCodeDis: true,
                subDis: true,
            }
        },
        mounted() {
            this.getImgCode()
        },
        watch: {
            promoter: {
                handler: function() {
                    if (this.$store.state.reg.mobile.test(this.promoter.mobile)) {
                        this.getCodeDis = false;
                    } else {
                        this.getCodeDis = true;
                    }
                    if ($.trim(this.promoter.name) !== '' && $.trim(this.promoter.wx) !== '' && $.trim(this.promoter.gamerId) !== '' && $.trim(this.promoter.inputImgCode) !== '' && $.trim(this.promoter.mobile) !== '' && $.trim(this.promoter.code) !== '') {
                        this.subDis = false;
                    } else {
                        this.subDis = true;
                    }
                },
                deep: true
            },
        },
        methods: {
            getImgCode: function() {
                var url = this.$store.state.api.getImgCode;
                var that = this;
                $.get(url, function(data) {
                    data = JSON.parse(data);
                    that.promoter.imgCode = data.res.validateCode;
                });
            },
            getCode: function() {
                var url = this.$store.state.api.getMobileCode,
                    mobile = this.promoter.mobile;
                    var that = this;
                $.post(url, {
                    mobile: mobile
                }, function(data) {
                    data = JSON.parse(data);
                    if (data.code === '10000') {
                        layer.msg('验证码已发送');
                    } else {
                        layer.msg(data.message);
                    }
                });

            },
            addPromoter: function() {
                var url = this.$store.state.api.addPromoter,
                    name = this.promoter.name,
                    wx = this.promoter.wx,
                    gameId = this.promoter.gamerId,
                    validateCode = this.promoter.inputImgCode,
                    mobile = this.promoter.mobile,
                    mbCode = this.promoter.code;
                var that = this;

                if(validateCode.length !== this.$store.state.reg.codeLenth){
                	layer.msg('请输入4位图形验证码');
                	return false;
                }

                if(!this.$store.state.reg.mobile.test(mobile)){
                	layer.msg('请输入正确手机号');
                	return false;
                }

                $.ajax({
                    url: url,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        nickName: name,
                        weixin: wx,
                        gamerId: gameId,
                        validateCode: validateCode,
                        mobile: mobile,
                        mbCode: mbCode,
                        gameType: 'kwx'
                    },
                    success: function(data) {
                        if (data.code === '10000') {
                            that.$router.push('/home/my-promoter');
                            return;
                        } else {
                            layer.msg(data.message);
                            return;
                        }
                    },
                    error: function(data, status) {
                        console.log(status);
                    }
                });
            },
        }
}
</script>
