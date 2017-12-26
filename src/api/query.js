import request from '@/utils/request'

//获取用户信息;
export function getUserInfoData(channel, vip, type, like, pageSize, pageNow) {
  return request({
		url: '../userL8/userL8List.json',
		method: 'post',
		data: {
		  channel,
		  vip,
		  type,
		  like,
		  pageSize,
		  pageNow
		}
  });
}

//获取用户详细信息;
export function getUserDetailData(userID) {
  return request({
		url: '../userL8/userL8_details.json',
		method: 'post',
		data: {
		  userID
		}
  });
}

//获取战队信息
export function getTribeData(data) {
	return request({
		url: '../circleL8/circleL8List.json',
		method: 'post',
		data: data
	});
}

//获取战队详细信息
export function getTribeDetail(circleID) {
	return request({
		url: '../circleL8/circleL8_details.json',
		method: 'post',
		data: {
			circleID
		}
	});
}

//获取战队信息
export function getCompeData(data) {
	return request({
		url: '../competitionL8/competitionL8list.json',
		method: 'post',
		data: data
	});
}

//获取战队详细信息
export function getCompeDetail(competitionID) {
	return request({
		url: '../competitionL8/competitionL8_details.json',
		method: 'post',
		data: {
			competitionID
		}
	});
}

//获取举报信息
export function getReportData(data) {
	return request({
		url: '../wb_and_gfb/whistleBlowingL8list.json',
		method: 'get',
		data: data
	});
}

//获取反馈信息
export function getTickingData(data) {
	return request({
		url: '../wb_and_gfb/giveFeedbackL8list.json',
		method: 'get',
		data: data
	});
}
