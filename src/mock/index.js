import Mock from 'mockjs'
import queryAPI from './query'

//获取用户信息相关
Mock.mock(/..\/userL8\/userL8List.json/, 'post', queryAPI.getUserInfo)

//获取用户详细信息相关
Mock.mock(/..\/userL8\/userL8_details.json/, 'post', queryAPI.getUserDetail)

//获取战队信息相关
Mock.mock(/..\/circleL8\/circleL8List.json/, 'post', queryAPI.getTribeData)

//获取战队详细信息相关
Mock.mock(/..\/circleL8\/circleL8_details.json/, 'post', queryAPI.getTribeDetail)

//获取赛事信息相关
Mock.mock(/..\/competitionL8\/competitionL8list.json/, 'post', queryAPI.getCompeData)

//获取赛事详细信息相关
Mock.mock(/..\/competitionL8\/competitionL8_details.json/, 'post', queryAPI.getCompeDetail)

//举报信息相关
Mock.mock(/..\/wb_and_gfb\/whistleBlowingL8list.json/, 'get', queryAPI.getReportData)

//反馈信息相关
Mock.mock(/..\/wb_and_gfb\/giveFeedbackL8list.json/, 'get', queryAPI.getTickingData)