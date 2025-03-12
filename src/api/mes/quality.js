import request from '@/utils/request'

/**
 * 查询产品检验列表
 * @param {Object} params - 查询参数
 * @param {string} [params.checkDate] - 检验时间
 * @param {string} [params.checkItemName] - 检验项
 * @param {number} [params.checkQuantity] - 抽检数量
 * @param {string} [params.checkResult] - 检验结果：0 不合格 1 合格
 * @param {number} [params.checkStandardId] - 检验标准编号
 * @param {string} [params.checkUser] - 检验人
 * @param {number} [params.checkValue] - 检验值
 * @param {string} [params.createBy] - 创建用户
 * @param {number} [params.id] - 编号
 * @param {string} [params.materialBatchNo] - 检验批次
 * @param {string} [params.materialCode] - 物料编码
 * @param {number} [params.materialId] - 物料档案编号
 * @param {string} [params.materialModel] - 物料型号
 * @param {string} [params.materialName] - 产品名称
 * @param {string} [params.materialSpecification] - 物料规格
 * @param {string} [params.materialUnit] - 物料单位
 * @param {number} [params.maxValue] - 标准值上限
 * @param {number} [params.minValue] - 标准值下限
 * @param {string} [params.productDate] - 生产日期
 * @param {number} [params.productFinishId] - 完工单id
 * @param {string} [params.productFinishNo] - 完工单号
 * @param {number} [params.productJobId] - 生产作业编号
 * @param {string} [params.productJobName] - 作业名称
 * @param {number} [params.productLineId] - 生产线编号
 * @param {string} [params.productLineName] - 生产线名称
 * @param {number} [params.productPlanId] - 生产计划编号
 * @param {string} [params.productPlanNo] - 计划编号
 * @param {number} [params.productQuantity] - 生产数量
 * @param {number} [params.productScheduleId] - 计划排产编号
 * @param {number} [params.qualifiedRate] - 合格率
 * @param {string} [params.serialNo] - 流水号
 * @param {Object} [params.params] - 额外参数
 * @param {string} [params.remark] - 备注
 * @param {string} [params.searchValue] - 搜索值
 * @param {string} [params.updateBy] - 更新人
 * @param {string} [params.updateTime] - 更新时间
 * @returns {Promise<any>}
 */
export function getProductCheckList(params) {
  return request({
    url: '/mesCheck/productCheck/list',
    method: 'get',
    params
  })
}

/**
 * 修改产品检验
 * @param {import('./types').UpdateProductCheckParams} params 修改参数
 * @returns {Promise<import('./types').ProductCheckResponse>} 请求Promise对象
 */
export function updateProductCheck(params) {
  return request({
    url: '/mesCheck/productCheck',
    method: 'put',
    data: params
  })
}

/**
 * 删除产品检验
 * @param {string} ids 
 * @returns {Promise<import('./types').RemoveResponse>} 请求Promise对象
 */
export function removeProductCheck(ids) {
  return request({
    url: `/mesCheck/productCheck/${ids}`,
    method: 'delete'
  })
}

/**
 * 新增产品检验
 * @param {import('./types').AddProductCheckParams} params - 新增参数
 * @returns {Promise<import('./types').ProductCheckResponse>} 请求Promise对象
 */
export function addProductCheck(params) {
  return request({
    url: '/mesCheck/productCheck',
    method: 'post',
    data: params
  })
}

/**
 * 查询生产完工单列表
 * @param {Object} params - 查询参数
 * @returns {Promise<any>}
 */
export function getFinishOrderList(params) {
  return request({
    url: '/mesProduct/productFinish/list',
    method: 'get',
    params
  });
}

/**
 * 修改生产完工单
 * @param {Object} params - 生产完工单数据
 * @returns {Promise<any>}
 */
export function updateFinishOrder(params) {
  return request({
    url: '/mesProduct/productFinish',
    method: 'put',
    data: params
  });
}

/**
 * 删除生产完工单
 * @param {string} ids - 生产完工单id
 * @returns {Promise<any>}
 */
export function deleteFinishOrder(ids) {
  return request({
    url: `/mesProduct/productFinish/${ids}`,
    method: 'delete'
  });
}