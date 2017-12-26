<template>
  <section>
  	<div class="user_head">
  	  <my-select :message="tribeMessage" :option-value="tribeValue" v-on:selectChange="tribeStatusChange"></my-select>
  	  <my-search :option-value="tribeValue2" v-on:searchClick="tribeInfoSearch"></my-search>
  	  <paging :total="totalRecords" v-on:getSize="getTribeSize" v-on:getPage="getTribePage"></paging>
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
          <div v-for="col in expansionConent" :key="col.label">
            {{ col.label }}：{{ tribeDetailData[col.prop] }}
          </div>
        </section>
      </template>
   </egrid>
  </section>
</template>

<script>
  import {getTribeData, getTribeDetail} from '@/api/query'
  import Paging from '@/components/Paging/'
  import MySelect from '@/components/Select/'
  import MySearch from '@/components/Search/'
  
  //战队头像显示
  var tribeIcon = {
  	template: '<img :src="row.iconUrl" alt="暂无" style="width:40px;" />',
  	props: ['row']
  }
  
  //战队状态
  var tribeStaus = {
  	template: `<span v-if="row.status == 0">正常</span>
		 		<span v-else style="color:red;">解散</span>`,
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
  		tribeMessage: "状态",
  		totalRecords: 0,
  		tableData: [],
  		tribeDetailData: {},
  		tribeData: {
  		  like: '',
  		  status: '',
  		  pageSize: 10,
  		  pageNow: 0
  		},
  		tribeValue: [{
  		  'opti': '状态',
          'val' : ''
  		},{
  		  'opti': '正常',
          'val' : '0'
  		},{
  		  'opti': '解散',
          'val' : '1'
  		}],
  		tribeValue2: [{
          'opti': '战队名称',
          'val' : '0'
        },{
          'opti': '队长名称',
          'val' : '1'
        }],
        columns: [{
          'label': "序号",
          'prop': 'serial'
        },{
          'label': "战队图标",
          'prop': 'iconUrl'
        },{
          'label': "战队名称",
          'prop': 'circleName'
        },{
          'label': "队长",
          'prop': 'userName'
        },{
          'label': "战队等级",
          'prop': 'circle_level'
        },{
          'label': "战队人数",
          'prop': 'memCount'
        },{
          'label': "圈数",
          'prop': 'newTopic_count'
        },{
          'label': "约球",
          'prop': 'iconType'
        },{
          'label': "状态",
          'prop': 'status'
        }],
  	  	expansionConent: [{
          'label': "战队ID",
          'prop': 'circle_code'
        },{
          'label': "创建时间",
          'prop': 'createDate'
        },{
          'label': "战队二维码",
          'prop': 'zd_qrcode'
        },{
          'label': "战队排名",
          'prop': 'zh_rank'
        },{
          'label': "战队战斗力",
          'prop': 'zdl_rank'
        },{
          'label': "战队活跃度",
          'prop': 'circle_liveness'
        },{
          'label': "总约球数",
          'prop': 'yq_count'
        },{
          'label': "成功约球",
          'prop': 'yq_success'
        },{
          'label': "失败约球",
          'prop': 'yq_fail'
        },{
          'label': "战队宣言",
          'prop': 'circle_intro'
        },{
          'label': "圈总数",
          'prop': 'topic_count'
        },{
          'label': "删除圈",
          'prop': 'del_topic_count'
        },{
          'label': "锁定圈",
          'prop': 'lock_topic_count'
        }],
  	  	columnsProps: {
          align: "center",
          sortable: true
        },
	    columnsSchema: {
	      '战队图标': {
	      	sortable: false,
	      	component: tribeIcon
	      },
	      '状态': {
	      	sortable: false,
	      	component: tribeStaus
	      }
	    },
	    columnType: 'expand'
  	  }
  	},
  	created(){
  	  this.getData();	
  	},
  	methods: {
  	  getData() {
  	  	getTribeData(this.tribeData).then(response => {
  	  	  console.log(response);
  	  	  this.tableData = response.items;
  	  	  this.totalRecords = response.totalRecords;
  	  	}).catch(error => {
  	  	  console.log(error);
  	  	});
  	  },
  	  expandChange(row, expandedRows){
  	  	if(expandedRows){
  	  	  getTribeDetail(row.circleID).then(response => {
  	  	    this.tribeDetailData = response;
  	  	  }).catch(error => {
  	  	    console.log(error);
  	  	  });
  	  	}
  	  },
  	  tribeStatusChange(command) {
		this.tribeData.status = command;
		this.getData();
  	  },
  	  tribeInfoSearch(select, input) {
  	  	this.tribeData.like = input;
  	  	this.getData();
  	  },
  	  getTribeSize(pageSize) {
  	  	this.tribeData.pageSize = pageSize;
  	  	this.getData();
  	  },
  	  getTribePage(pageNow) {
  	  	this.tribeData.pageNow = pageNow;
  	  	this.getData();
  	  }
  	}
  }
</script>

<style>
</style>