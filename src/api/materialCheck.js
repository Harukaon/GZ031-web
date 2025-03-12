import request from '@/utils/request'

/**
 * 查询来料检验列表
 * @param {Object} params - 查询参数
 * @param {string} [params.serialNo] - 流水号
 * @param {string} [params.materialRequisitionNo] - 领料单流水
 * @param {string} [params.materialName] - 物料名称
 * @param {string} [params.checkResult] - 检验结果：0 不合格 1 合格
 * @param {string} [params.checkUser] - 检验人
 * @param {string} [params.checkDate] - 检验时间范围（数组格式：[startDate, endDate]）
 * @returns {Promise}
 */
export function getMaterialCheckList(params) {
  return request({
    url: '/mesCheck/materialCheck/list',
    method: 'get',
    params: {
      ...params,
      // 处理日期范围参数
      checkDateStart: params.checkDate?.[0],
      checkDateEnd: params.checkDate?.[1]
    }
  })
}

/**
 * 删除来料检验
 * @param {string} ids - 要删除的ID，多个用逗号分隔
 * @returns {Promise}
 */
export function deleteMaterialCheck(ids) {
  return request({
    url: `/mesCheck/materialCheck/${ids}`,
    method: 'delete'
  })
}

/**
 * 修改来料检验
 * @param {Object} data - 修改数据
 * @returns {Promise}
 */
export function updateMaterialCheck(data) {
  return request({
    url: '/mesCheck/materialCheck',
    method: 'put',
    data
  })
}
