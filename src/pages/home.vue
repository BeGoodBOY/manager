<template>
    <div>
        <div id="navbar" class="navbar navbar-default ace-save-state">
            <div class="navbar-container ace-save-state" id="navbar-container">
                <button @click="navControl" type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
                    <span class="sr-only">Toggle sidebar</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div id="nav-header" class="navbar-header pull-left">
                    <a href="index.html" class="navbar-brand">
                        <small>
                        代理后台管理系统
                    </small>
                    </a>
                </div>
                <div id="app-nav-right" class="navbar-buttons navbar-header pull-right" role="navigation">
                    <ul class="nav ace-nav">
                        <li class="light-blue dropdown-modal">
                            <a data-toggle="dropdown" href="#" class="dropdown-toggle" aria-expanded="false">
                                <img class="nav-user-photo" src="static/images/avatars/user.jpg" alt="Jason's Photo">
                                <span class="user-info">
                                <small>欢迎您</small>
                                xxx
                            </span>
                                <i class="ace-icon fa fa-caret-down"></i>
                            </a>
                            <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                <li>
                                    <router-link to="/home/my-msg">
                                        <i class="ace-icon fa fa-user"></i> 我的信息
                                    </router-link>
                                    <router-link to="/home/modify-info">
                                        <i class="ace-icon fa fa-user"></i> 修改信息
                                    </router-link>
                                    <router-link to="/home/modify-pwd">
                                        <i class="ace-icon fa fa-user"></i> 修改密码
                                    </router-link>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a @click="loginOut">
                                        <i class="ace-icon fa fa-power-off"></i> 退出
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /.navbar-container -->
        </div>
        <div class="main-container ace-save-state" id="main-container">
            <div :class="{display:showNav}" id="sidebar" class="sidebar responsive ace-save-state">
                <div class="sidebar-shortcuts" id="sidebar-shortcuts">
                    <div class="sidebar-shortcuts-large text-left" id="sidebar-shortcuts-large">
                        <h6>剩余房卡：<span class="red">{{myCards}}</span></h6>
                    </div>
                    <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
                        <span class="btn btn-success"></span>
                        <span class="btn btn-info"></span>
                        <span class="btn btn-warning"></span>
                        <span class="btn btn-danger"></span>
                    </div>
                </div>
                <!-- /.sidebar-shortcuts -->
                <ul id="nav-list" class="nav nav-list">
                    <li @click="navControl" class="">
                        <router-link to="">
                            <i class="menu-icon fa fa-tachometer"></i>
                            <span class="menu-text"> 活动公告 </span>
                        </router-link>
                        <b class="arrow"></b>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="/home/recharge-card">
                            <i class="menu-icon fa fa-credit-card"></i>
                            <span class="menu-text">
                                玩家充卡
                            </span>
                        </router-link>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="/home/my-promoter">
                            <i class="menu-icon fa fa-users"></i>
                            <span class="menu-text"> 我的代理 </span>
                        </router-link>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="" class="dropdown-toggle">
                            <i class="menu-icon fa fa-exchange"></i>
                            <span class="menu-text"> 返利详情 </span>
                        </router-link>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="">
                            <i class="menu-icon fa fa-bar-chart-o"></i>
                            <span class="menu-text"> 购卡统计 </span>
                        </router-link>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="">
                            <i class="menu-icon fa fa-gift"></i>
                            <span class="menu-text">
                                房卡奖励
                            </span>
                        </router-link>
                        <b class="arrow"></b>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="/home/buy-card">
                            <i class="menu-icon glyphicon glyphicon-plus"></i>
                            <span class="menu-text"> 购买房卡 </span>
                        </router-link>
                    </li>
                    <li @click="navControl" class="">
                        <router-link to="/buy-card-page">
                            <i class="menu-icon glyphicon glyphicon-plus"></i>
                            <span class="menu-text"> 玩家购买房卡 </span>
                        </router-link>
                    </li>
                </ul>
                <!-- /.nav-list -->
                <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                    <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                </div>
            </div>
            <div class="main-content">
                <div class="main-content-inner">
                    <div class="page-content">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            showNav: false,
            myCards: ''
        }
    },
    mounted: function() {
        var url = this.$store.state.api.getCards;
        var that = this;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                // console.log(data);
                if (data.code === '10000') {
                    that.myCards = data.res;
                    return;
                } else {
                    layer.msg(data.message);
                    that.$router.push('/login');
                }
            }
        });
    },
    methods: {
        navControl() {
            this.showNav = !this.showNav
                // alert(this.showNav);
        },
        loginOut() {
            var url = this.$store.state.api.loginOut;
            var that = this;
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    if (data.code === '10000') {
                        that.$router.push('/login');
                    } else {
                        layer.msg(data.message);
                    }
                },
                error: function(data, status) {
                    console.log(status);
                }
            });
        }
    }
}
</script>
<style scoped>
#nav-header {
    float: left!important;
}

#app-nav-right {
    float: right!important;
}

.sidebar-shortcuts h6 {
    padding-left: 12px;
}
</style>
