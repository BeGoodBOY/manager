<template>
    <div>
        <div class="page-header">
            <h1>我的信息</h1>
        </div>
        <div class="profile-user-info profile-user-info-striped no-border">
            <div class="profile-info-row">
                <div class="profile-info-name"> 昵称 </div>
                <div class="profile-info-value">
                    {{nickName}}
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name"> 推广员ID </div>
                <div class="profile-info-value">
                    {{userId}}
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name"> 手机号 </div>
                <div class="profile-info-value">
                    {{mobile}}
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name"> 微信号 </div>
                <div class="profile-info-value">
                    {{wx}}
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name"> 加入时间 </div>
                <div class="profile-info-value">
                    {{joinTime}}
                </div>
            </div>
            <div class="profile-info-row">
                <div class="profile-info-name"> 代理级别</div>
                <div class="profile-info-value">
                    <span :class="{btn:vip,'btn-warning':vip}">{{grade}}</span>
                </div>
            </div>
        </div>
        <div class="alert alert-info"><i class="ace-icon fa fa-hand-o-right"></i> 		<em class="red">金牌代理</em> 永久享有
            <mark>0.7元/张房卡</mark>的VIP购买权。
        </div>
        <p>普通代理升级为金牌代理，您只需：</p>
        <p>1. 发展5个普通代理，注册时填写您的ID</p>
		<p>2. 您发展的代理首次购卡成功</p>
		<p>3. 享受最低折扣，坐享最高收益</p>
    </div>
</template>
<script>
export default {
    data() {
            return {
                nickName: 'xx',
                userId: 'xx',
                mobile: 'xx',
                wx: 'xx',
                joinTime: 'xx',
                grade: 'xx',
                vip: false,
                beVip: '',
                grade: ''
            }
        },
        mounted() {
            var url = this.$store.state.api.myMsg;
            var that = this;
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    if (data.code === '10000') {
                        that.nickName = data.res.pname;
                        that.userId = data.res.id;
                        that.mobile = data.res.mobile;
                        that.wx = data.res.weixin;
                        that.joinTime = data.res.atime;
                        if (data.res.vip) {
                            that.vip = true;
                            that.grade = '金牌代理'
                        } else {
                            that.vip = false;
                            that.beVip = data.res.paycount;
                            that.grade = '普通代理'
                        }
                    }
                }
            });
        }
}
</script>
<style scoped>
.profile-user-info {
    width: 100%;
    font-size: 140%;
}
</style>
