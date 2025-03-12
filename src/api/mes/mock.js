// src/api/mes/mock.js
import Mock from 'mockjs';

// 定义生产完工单的 mock 数据
const finishOrderData = Mock.mock({
  'data|10': [{
    'id|+1': 1,
    'batchNo': '@string("upper", 10)',
    'createBy': '@name',
    'finishDate': '@datetime',
    'finishQuantity|1-1000': 100,
    'jobId|1-10': 1,
    'jobName': '@word',
    'materialCode': '@string("upper", 5)',
    'materialId|1-10': 1,
    'materialModel': '@word',
    'materialName': '@word',
    'materialSpecification': '@word',
    'materialUnit': '@word',
    'planId|1-10': 1,
    'planName': '@word',
    'planNo': '@string("upper", 5)',
    'remark': '@sentence',
    'scheduleId|1-10': 1,
    'serialNo': '@string("upper", 10)',
    'status|1': ['未入库', '入库中', '已入库', '检验合格', '检验未合格'],
    'updateBy': '@name',
    'updateTime': '@datetime'
  }]
});

// 使用 Mock.js 拦截请求并返回模拟数据
Mock.mock('/mesProduct/productFinish/list', 'get', () => {
  return {
    code: '200',
    msg: '操作成功',
    data: finishOrderData.data,
    total: finishOrderData.data.length
  };
});