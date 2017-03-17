<template myCards="myCards">
    <div>
        <div class="page-header">
            <h1>玩家充卡 <router-link class="small red pull-right" to="/home/card-detail">售卡详情</router-link>   </h1>
        </div>
        <form class="form-search">
            <div class="row">
                <div class="col-xs-12 col-sm-8">
                    <div class="input-group">
                        <span class="input-group-addon">
                            好友ID
                        </span>
                        <input v-model="userId" class="form-control search-query" placeholder="输入好友ID">
                        <span class="input-group-btn">
                            <button @click="searchPlayer" type="button" class="btn btn-purple btn-sm">
                            <span class="ace-icon fa fa-search icon-on-right bigger-110"></span> 搜索
                        </button>
                        </span>
                    </div>
                </div>
                <div class="lh_10"></div>
                <div class="col-xs-12">
                    <table id="simple-table" class="table  table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>玩家ID</th>
                                <th>玩家昵称</th>
                                <th>剩余卡数</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{userId}}</td>
                                <td>{{nickName}}</td>
                                <td>{{restCard}}</td>
                                <td>
                                    <button @click="showRechargePage" class="btn btn-primary btn-sm">充值</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
        <div v-show="showRecharge" class="row">
            <div class="col-xs-12">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right" for="form-field-1">我的卡量*</label>
                        <div class="col-sm-9">
                            <input v-model="myCards" disabled type="text" id="form-field-1" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right" for="form-field-2">玩家ID*</label>
                        <div class="col-sm-9">
                            <input v-model="userId" disabled type="text" id="form-field-2" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right" for="form-field-3">充卡数量*</label>
                        <div class="col-sm-9">
                            <input type="text" id="form-field-3" class="col-xs-10 col-sm-5">
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="col-md-offset-3 col-md-9">
                            <button class="btn btn-info" type="button">
                                <i class="ace-icon fa fa-check bigger-110"></i> 充值
                            </button>
                            &nbsp; &nbsp; &nbsp;
                            <button @click="hideRechargePage" class="btn" type="reset">
                                <i class="ace-icon fa fa-undo bigger-110"></i> 取消
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="widget-box widget-color-blue ui-sortable-handle" id="widget-box-2" style="opacity: 1;">
            <div class="widget-header">
                <h3 class="widget-title bigger lighter">
                活动公告
            </h3>
            </div>
            <div class="widget-body">
                <div class="widget-main">
                    <div class="notice">
                        <h4 class="activity_title">活动通知</h4>
                        <p class="activity_time">活动时间: 不限</p>
                        <p class="usern">尊敬的推广员您好：</p>
                        <p class="user_con ">&nbsp;&nbsp;&nbsp;&nbsp;旺财游戏公司致力于开拓地方麻将市场，向着线上线下互动、好友交流情感、健康文明娱乐的方向不懈努力，未来将为广大玩家带来更多精品游戏，为您奉上极致游戏体验！
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['myCards'],
    data() {
            return {
                userId: '',
                nickName: '',
                restCard: '',
                showRecharge: false,
                myRestCard: '',
                canCharge: false
            }
        },
        methods: {
            searchPlayer: function() {
                var url = this.$store.state.api.searchPlayer;
                var that = this;
                if ($.trim(this.userId) === '' || this.userId.length > 10) {
                    layer.msg('ID不能为空或者大于10位');
                    return false;
                }
                if (!this.$store.state.reg.number.test(this.userId)) {
                    layer.msg('ID只能为数字');
                    return false;
                }
                $.ajax({
                    type: "post",
                    url: url,
                    dataType: "json",
                    data: {
                        playerId: this.userId
                    },
                    success: function(data) {
                        if (data && data.code === '10000') {
                            var res = data.res;
                            that.userId = res.id;
                            that.nickName = res.name;
                            that.restCard = res.card;
                            that.canCharge = true;
                            return;
                        } else {
                            that.canCharge = false;
                            that.showRecharge = false;
                        }
                        if (data.code && data.code != 10000) {
                            layer.msg(data.message, {
                                time: 1000
                            });
                            that.canCharge = false;
                            that.showRecharge = false;
                            that.nickName = '';
                            that.restCard = '';
                            return;
                        }
                        // inflatePlayerList(data.res);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                        return;
                    }
                });
            },
            showRechargePage: function() {
                if (this.canCharge) {
                    this.showRecharge = true;
                }
            },
            hideRechargePage() {
                this.showRecharge = false;
            }
        }
}
</script>
<style scoped>
.lh_10 {
    min-height: 10px;
    width: 1px;
    clear: both;
}

#simple-table>tbody>tr>td {
    vertical-align: middle;
    min-height: 50px;
}

.widget-box {
    margin-top: 20px;
}
</style>
