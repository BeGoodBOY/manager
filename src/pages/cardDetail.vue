<template>
    <div>
        <div class="page-header">
            <h1>售卡详情</h1>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="col-xs-4 col-sm-4">
                    <mu-date-picker v-model="begin" autoOk hintText="选择开始日期" />
                </div>
                <div class="col-xs-4 col-sm-4">
                    <mu-date-picker v-model="end" autoOk hintText="选择结束日期" />
                </div>
                <div class="col-xs-4 col-sm-4">
                    <button @click="getResults" class="btn btn-primary btn-sm">查询</button>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="widget-box widget-color-blue ui-sortable-handle">
                    <div class="widget-header">
                        <h5 class="widget-title bigger lighter">
                            <span>一级代理： <em>3</em></span>&nbsp;&nbsp;&nbsp;
                            <span>二级代理： <em>77</em></span>
                        </h5>
                    </div>
                    <div class="widget-body">
                        <table id="table" class="table  table-hover">
                            <thead class="thin-border-bottom">
                                <tr>
                                    <th>
                                        售卡时间
                                    </th>
                                    <th>
                                        玩家ID
                                    </th>
                                    <th>充卡数量</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items">
                                    <td class="">{{item.atime}}</td>
                                    <td>
                                        {{item.userId}}
                                    </td>
                                    <td>
                                        {{item.card}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--  <form class="form-search">
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
        </form> -->
    </div>
</template>
<script>
// import Date from '../components/Date'

export default {
    data() {
            return {
                begin: '',
                end: '',
                items: [{
                    atime: '',
                    userId: '',
                    card: ''
                }],
            }
        },
        methods: {
            getResults() {
                var url = this.$store.state.api.getSellCards;
                var that = this;
                $.ajax({
                    url: url,
                    data: {
                        start: this.begin,
                        end: this.end
                    },
                    type: 'get',
                    dataType: 'json',
                    success: function(res) {
                        if (res.code === '10000') {
                            that.items = res.res.results;
                        }
                    },
                    error: function(data, status) {
                        layer.msg(status);
                    }

                });
            },
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
