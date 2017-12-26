<template>
  <div class="user_table">
		
  	<div class="user_head">
  		<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="downloadChange"></my-select>
  		
	  	<my-select :message="message2" :option-value="optionValue2" v-on:selectChange="userTypeChange"></my-select>
	  	
	  	<my-search :message="message3" :option-value="optionValue3" v-on:searchClick="userInfoSearch"></my-search>
	  	
	  	<paging :total="totalRecords" v-on:getSize="getUserSize" v-on:getPage="getUserPage"></paging>
  	</div>
  	
  	<egrid class="egrid"
  		fit
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :column-type="columnType"
      @expand="expandChange">
      <template slot="expand" slot-scope="{}">
        <section class="expand-detail">
          <div v-for="col in expansionConent" :key="col.expansionHead">
            {{ col.expansionHead }}：{{ detailData[col.expansionData] }}
          </div>
        </section>
      </template>
   </egrid>
  </div>
</template>
  
<script>
	import {getUserInfoData, getUserDetailData} from '@/api/query'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'
	
	//用户头像显示
	var userUrl = {
		template: '<img :src="row.iconUrl" alt="暂无" style="width:40px;" />',
		props: ['row']
	}
	
	//用户是否为vip
	var isVip = {
		template: `<span v-if="row.if_vip == 0">否</span>
		 					<span v-else style="color:red;">是</span>`,
		props: ['row']
	}
	
	//账号状态
	var accountStatus = {
		template: `<span v-if="row.accountStatus == 0">正常</span>
		 					<span v-else style="color:red;">禁用</span>`,
		props: ['row']
	}
	
	//vip等级
	var vipLevel = {
		template: `<span v-if="row.level !== 0">VIP{{row.level}}</span>
		 					<span v-else>--</span>`,
		props: ['row']
	}

  export default {
  	components: {
    	Paging,
    	MySelect,
    	MySearch
    },
    data() {
      return {
        tableData: [],
        message1: "下载渠道",
        message2: "用户类型",
        message3: "请选择",
        totalRecords: 0,
        detailData: {},
        optionValue1: [{
        	'opti': '下载渠道',
        	'val' : ''
        },{
        	'opti': '官网',
        	'val' : 'butterfly'
        }, {
        	'opti': '华为',
        	'val' : 'huawei'
        }, {
        	'opti': '360',
        	'val' : '360'
        }, {
        	'opti': '联想',
        	'val' : 'lianxiang'
        }, {
        	'opti': '绿茶软件园',
        	'val' : 'lvcha'
        }, {
        	'opti': 'PC6',
        	'val' : 'pc6'
        }],
        
        optionValue2: [{
        	'opti': '用户类型',
        	'val' : ''
        },{
        	'opti': '游客',
        	'val' : '1'
        }, {
        	'opti': '普通会员',
        	'val' : '2'
        }, {
        	'opti': 'VIP用户',
        	'val' : '3'
        }, {
        	'opti': '充值用户',
        	'val' : '4'
        }],
        
        optionValue3: [{
        	'opti': '请选择',
        	'val' : ''
        },{
        	'opti': '用户手机号',
        	'val' : '1'
        }, {
        	'opti': '用户绰号',
        	'val' : '2'
        }, {
        	'opti': '战队名称',
        	'val' : '3'
        }],
        columns: [{
        	'label': '序号', //列名称
        	'prop': 'serial', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : '60px',        // 宽度
        },{
        	'label': '用户头像', //列名称
        	'prop': 'iconUrl', //列数据
        	'isCustom': true, //是否自定义列
        	'isSortable': false, //是否显示排序
        	'width' : '',
        	'slotName': 'imageUrl'
        },{
        	'label': '用户手机号', //列名称
        	'prop': 'phone', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : '120px'
        },{
        	'label': '用户', //列名称
        	'prop': 'uname', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': false, //是否显示排序
        	'width' : ''
        },{
        	'label': '等级', //列名称
        	'prop': 'level', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '积分', //列名称
        	'prop': 'integral', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '红包余额', //列名称
        	'prop': 'balance', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '累计提现金额', //列名称
        	'prop': 'withdrawSum', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : '120px'
        },{
        	'label': '金币', //列名称
        	'prop': 'gold', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '赠送金币数', //列名称
        	'prop': 'goldGiftNum', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '游戏场次', //列名称
        	'prop': 'total_number', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '战队', //列名称
        	'prop': 'circleName', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': false, //是否显示排序
        	'width' : ''
        },{
        	'label': 'VIP', //列名称
        	'prop': 'if_vip', //列数据
        	'isCustom': true, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': 'VIP等级', //列名称
        	'prop': 'level', //列数据
        	'isCustom': true, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '账号状态', //列名称
        	'prop': 'accountStatus', //列数据
        	'isCustom': true, //是否自定义列
        	'isSortable': false, //是否显示排序
        	'width' : ''
        },{
        	'label': '在线时长', //列名称
        	'prop': 'onlinetime', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '当前版本', //列名称
        	'prop': 'version', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        },{
        	'label': '下载渠道', //列名称
        	'prop': 'channel', //列数据
        	'isCustom': false, //是否自定义列
        	'isSortable': true, //是否显示排序
        	'width' : ''
        }],
        expansionConent: [{
        	'expansionHead': '用户编码', //列名称
        	'expansionData': 'userCode', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '注册时间', //列名称
        	'expansionData': 'registerDate', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': 'VIP到期时间', //列名称
        	'expansionData': 'vipDate', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '游戏场次', //列名称
        	'expansionData': 'game_total_number', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '积分赛', //列名称
        	'expansionData': '', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '红包赛', //列名称
        	'expansionData': '', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '游戏胜场', //列名称
        	'expansionData': 'game_win_number', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '游戏排名', //列名称
        	'expansionData': 'game_rank', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '发起约球', //列名称
        	'expansionData': 'myCreateYq', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '参与约球', //列名称
        	'expansionData': 'myJoinYq', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '已发帖子', //列名称
        	'expansionData': 'myCreateTopic', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '参与帖子', //列名称
        	'expansionData': 'myjoinTopic', //列数据
        	'isCustom': false, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '设备绑定', //列名称
        	'expansionData': '', //列数据
        	'isCustom': true, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '总在线时长', //列名称
        	'expansionData': '', //列数据
        	'isCustom': true, //是否自定义列
        	'width' : ''
        },{
        	'expansionHead': '在线时长列表', //列名称
        	'expansionData': '', //列数据
        	'isCustom': true, //是否自定义列
        	'width' : ''
        }],
        columnsProps: {
        	align: "center",
        	sortable: true
        },
	      columnsSchema: {
	        '用户头像': {
	        	component: userUrl
	        },
	        'VIP': {
	        	component: isVip
	        },
	        '账号状态': {
	        	component: accountStatus
	        },
	        'VIP等级': {
	        	component: vipLevel
	        },
	        '赠送金币数': {
	        	width: "120px"
	        }
	      },
	      // columnType: 'selection',
	      columnType: 'expand',
	      downloadVal: '',
	      userType: '',
	      searchType: '',
	      searchConent: '',
	      pageNow: 0,
	      pageSize: 10
      }
    },
    created() {
    	this.getData()
    },
//  watch: {
//  	tableData: function(){
//  		
//  	}
//  },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      getData() {
      	getUserInfoData('', '', this.searchType, this.searchConent, this.pageSize, this.pageNow).then(response => {
	    		console.log(response);
					this.tableData = response.items;
					this.totalRecords = response.totalRecords;
	    	}).catch(error => {
	    		console.log(error);
	    	});
      },
	    expandChange (row, expandedRows) {
	    	if(expandedRows == true){
		    	getUserDetailData(row.user_id).then(response => {
		    		this.detailData = response.data;
		    		console.log(response);
		    	}).catch(error => {
		    		console.log(error);
		    	})
		    }
	    },
	    downloadChange (command) {
	    	this.downloadVal = command;
//	    	this.$message('父组件调用 ' + this.downloadVal);
	    },
	    userTypeChange (command) {
	    	this.userType = command;
//	    	this.$message('父组件调用 ' + this.downloadVal);
	    },
	    userInfoSearch (select, input) {
	    	this.searchType = select;
	    	this.searchConent = input;
	    	
	    	this.getData();
	    },
	    getUserSize (pageSize) {
	    	this.pageSize = pageSize;
	    	this.getData();
	    },
	    getUserPage (pageNow) {
	    	this.pageNow = pageNow;
	    	this.getData();
	    }
    }
  }
</script>

<style>
	.el-button {
		margin-left: -2px;
    width: 80px;
	}
</style>