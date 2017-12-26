<template>
  <section>
  	<div class="user_head">
  	  <my-select :option-value="compeValue" v-on:selectChange="compeStatusChange"></my-select>
  	  <my-search :option-value="compeValue2" v-on:searchClick="compeInfoSearch"></my-search>
  	  <paging :total="totalRecords" v-on:getSize="getcompeSize" v-on:getPage="getcompePage"></paging>
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
            {{ col.label }}：{{ compeDetailData[col.prop] }}
          </div>
        </section>
      </template>
   </egrid>
  </section>
</template>

<script>
  import {getCompeData, getCompeDetail} from '@/api/query'
  import Paging from '@/components/Paging/'
  import MySelect from '@/components/Select/'
  import MySearch from '@/components/Search/'
  
	
  //赛事状态
  var compeStaus = {
    template: `<span v-else-if="row.status == 1">正在报名</span>
  			 <span v-else-if="row.status == 2">即将开始</span>
  			 <span v-else-if="row.status == 3">正在进行</span>
	         <span v-else>已经结束</span>`,
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
  		compeMessage: "状态",
  		totalRecords: 0,
  		tableData: [],
  		compeDetailData: {},
  		compeData: {
  		  type: '',
  		  like: '',
  		  status: '',
  		  pageSize: 10,
  		  pageNow: 0
  		},
  		compeValue: [{
  		  'opti': '赛事状态',
          'val' : ''
  		},{
  		  'opti': '正在报名',
          'val' : '1'
  		},{
  		  'opti': '即将开始',
          'val' : '2'
  		},{
  		  'opti': '正在进行',
          'val' : '3'
  		},{
  		  'opti': '已经结束',
          'val' : '4'
  		}],
  		compeValue2: [{
          'opti': '请选择',
          'val' : ''
        },{
          'opti': '赛事名称',
          'val' : '1'
        },{
          'opti': '发布者',
          'val' : '2'
        },{
          'opti': '比赛地点',
          'val' : '3'
        }],
        columns: [{
          'label': "序号",
          'prop': 'serial'
        },{
          'label': "赛事名称",
          'prop': 'competitionName'
        },{
          'label': "报名截止时间",
          'prop': 'competitionTime'
        },{
          'label': "赛事开始时间",
          'prop': 'registrationDeadline'
        },{
          'label': "比赛地点",
          'prop': 'competitionSite'
        },{
          'label': "报名金币",
          'prop': 'applyMoney'
        },{
          'label': "报名人数",
          'prop': 'yq_member_count'
        },{
          'label': "赛事状态",
          'prop': 'status'
        },{
          'label': "发布者",
          'prop': 'createName'
        }],
  	  	expansionConent: [{
          'label': "比赛简介",
          'prop': 'competition_intro'
        },{
          'label': "比赛规则",
          'prop': 'competition_regulation'
        },{
          'label': "支付说明",
          'prop': 'pay_explain'
        },{
          'label': "奖励说明",
          'prop': 'competitionRewards'
        }],
  	  	columnsProps: {
          align: "center",
          sortable: true
        },
	    columnsSchema: {
	      '赛事状态': {
	      	sortable: false,
	      	component: compeStaus
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
  	  	getCompeData(this.compeData).then(response => {
  	  	  console.log(response);
  	  	  this.tableData = response.items;
  	  	  this.totalRecords = response.totalRecords;
  	  	}).catch(error => {
  	  	  console.log(error);
  	  	});
  	  },
  	  expandChange(row, expandedRows){
  	  	if(expandedRows){
  	  	  getCompeDetail(row.competitionID).then(response => {
  	  	    this.compeDetailData = response;
  	  	  }).catch(error => {
  	  	    console.log(error);
  	  	  });
  	  	}
  	  },
  	  compeStatusChange(command) {
		this.compeData.status = command;
		this.getData();
  	  },
  	  compeInfoSearch(select, input) {
  	  	this.compeData.type = select;
  	  	this.compeData.like = input;
  	  	this.getData();
  	  },
  	  getcompeSize(pageSize) {
  	  	this.compeData.pageSize = pageSize;
  	  	this.getData();
  	  },
  	  getcompePage(pageNow) {
  	  	this.compeData.pageNow = pageNow;
  	  	this.getData();
  	  }
  	}
  }
</script>

<style>
</style>