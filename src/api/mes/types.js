/**
 * 产品检验列表查询参数类型
 * @typedef {Object} ProductCheckQueryParams
 * @property {string} [checkDate] - 检验时间
 * @property {string} [checkItemName] - 检验项
 * @property {number} [checkQuantity] - 抽检数量
 * @property {string} [checkResult] - 检验结果：0 不合格 1 合格
 * @property {number} [checkStandardId] - 检验标准编号
 * @property {string} [checkUser] - 检验人
 * @property {number} [checkValue] - 检验值
 * @property {string} [createBy] - 创建用户
 * @property {number} [id] - 编号
 * @property {string} [materialBatchNo] - 检验批次
 * @property {string} [materialCode] - 物料编码
 * @property {number} [materialId] - 物料档案编号
 * @property {string} [materialModel] - 物料型号
 * @property {string} [materialName] - 产品名称
 * @property {string} [materialSpecification] - 物料规格
 * @property {string} [materialUnit] - 物料单位
 * @property {number} [maxValue] - 标准值上限
 * @property {number} [minValue] - 标准值下限
 * @property {string} [productDate] - 生产日期
 * @property {number} [productFinishId] - 完工单id
 * @property {string} [productFinishNo] - 完工单号
 * @property {number} [productJobId] - 生产作业编号
 * @property {string} [productJobName] - 作业名称
 * @property {number} [productLineId] - 生产线编号
 * @property {string} [productLineName] - 生产线名称
 * @property {number} [productPlanId] - 生产计划编号
 * @property {string} [productPlanNo] - 计划编号
 * @property {number} [productQuantity] - 生产数量
 * @property {number} [productScheduleId] - 计划排产编号
 * @property {number} [qualifiedRate] - 合格率
 * @property {string} [serialNo] - 流水号
 * @property {Object} [params] - 额外参数
 * @property {string} [remark] - 备注
 * @property {string} [searchValue] - 搜索值
 * @property {string} [updateBy] - 更新人
 * @property {string} [updateTime] - 更新时间
 */

/**
 * 产品检验列表响应项类型
 * @typedef {Object} ProductCheckItem
 * @property {string} checkDate - 检验时间
 * @property {string} checkItemName - 检验项
 * @property {number} checkQuantity - 抽检数量
 * @property {string} checkResult - 检验结果：0 不合格 1 合格
 * @property {number} checkStandardId - 检验标准编号
 * @property {string} checkUser - 检验人
 * @property {number} checkValue - 检验值
 * @property {string} createBy - 创建用户
 * @property {number} id - 编号
 * @property {string} materialBatchNo - 检验批次
 * @property {string} materialCode - 物料编码
 * @property {number} materialId - 物料档案编号
 * @property {string} materialModel - 物料型号
 * @property {string} materialName - 产品名称
 * @property {string} materialSpecification - 物料规格
 * @property {string} materialUnit - 物料单位
 * @property {number} maxValue - 标准值上限
 * @property {number} minValue - 标准值下限
 * @property {Object} params - 额外参数
 * @property {string} productDate - 生产日期
 * @property {number} productFinishId - 完工单id
 * @property {string} productFinishNo - 完工单号
 * @property {number} productJobId - 生产作业编号
 * @property {string} productJobName - 作业名称
 * @property {number} productLineId - 生产线编号
 * @property {string} productLineName - 生产线名称
 * @property {number} productPlanId - 生产计划编号
 * @property {string} productPlanNo - 计划编号
 * @property {number} productQuantity - 生产数量
 * @property {number} productScheduleId - 计划排产编号
 * @property {number} qualifiedRate - 合格率
 * @property {string} remark - 备注
 * @property {string} searchValue - 搜索值
 * @property {string} serialNo - 流水号
 * @property {string} updateBy - 更新人
 * @property {string} updateTime - 更新时间
 */

/**
 * 产品检验列表响应类型
 * @typedef {Object} ProductCheckResponse
 * @property {string} code - 状态码，200正确，其他错误
 * @property {string} msg - 返回消息内容
 * @property {Array<ProductCheckItem>} rows - 返回业务数据
 * @property {string} total - 总记录数
 */

/**
 * @typedef {Object} UpdateProductCheckParams
 * @property {string} [checkDate] - 检验时间
 * @property {string} [checkItemName] - 检验项
 * @property {number} [checkQuantity] - 抽检数量
 * @property {string} [checkResult] - 检验结果：0 不合格 1 合格
 * @property {number} [checkStandardId] - 检验标准编号
 * @property {string} [checkUser] - 检验人
 * @property {number} [checkValue] - 检验值
 * @property {string} [createBy] - 创建用户
 * @property {number} [id] - 编号
 * @property {string} [materialBatchNo] - 检验批次
 * @property {string} [materialCode] - 物料编码
 * @property {number} [materialId] - 物料档案编号
 * @property {string} [materialModel] - 物料型号
 * @property {string} [materialName] - 产品名称
 * @property {string} [materialSpecification] - 物料规格
 * @property {string} [materialUnit] - 物料单位
 * @property {number} [maxValue] - 标准值上限
 * @property {number} [minValue] - 标准值下限
 * @property {Object} [params] - 额外参数
 * @property {string} [productDate] - 生产日期
 * @property {number} [productFinishId] - 完工单 id
 * @property {string} [productFinishNo] - 完工单号
 * @property {number} [productJobId] - 生产作业编号
 * @property {string} [productJobName] - 作业名称
 * @property {number} [productLineId] - 生产线编号
 * @property {string} [productLineName] - 生产线名称
 * @property {number} [productPlanId] - 生产计划编号
 * @property {string} [productPlanNo] - 计划编号
 * @property {number} [productQuantity] - 生产数量
 * @property {number} [productScheduleId] - 计划排产编号
 * @property {number} [qualifiedRate] - 合格率
 * @property {string} [remark] - 备注
 * @property {string} [searchValue] - 搜索值
 * @property {string} [serialNo] - 流水号
 * @property {string} [updateBy] - 更新人
 * @property {string} [updateTime] - 更新时间
 */

/**
 * 删除响应类型
 * @typedef {Object} RemoveResponse
 * @property {string} code - 状态码，200正确，其他错误
 * @property {string} msg - 返回消息内容
 */

/**
 * 新增产品检验参数类型
 * @typedef {Object} AddProductCheckParams
 * @property {string} [checkDate] - 检验时间
 * @property {string} [checkItemName] - 检验项
 * @property {number} [checkQuantity] - 抽检数量
 * @property {string} [checkResult] - 检验结果：0 不合格 1 合格
 * @property {number} [checkStandardId] - 检验标准编号
 * @property {string} [checkUser] - 检验人
 * @property {number} [checkValue] - 检验值
 * @property {string} [createBy] - 创建用户
 * @property {number} [id] - 编号
 * @property {string} [materialBatchNo] - 检验批次
 * @property {string} [materialCode] - 物料编码
 * @property {number} [materialId] - 物料档案编号
 * @property {string} [materialModel] - 物料型号
 * @property {string} [materialName] - 产品名称
 * @property {string} [materialSpecification] - 物料规格
 * @property {string} [materialUnit] - 物料单位
 * @property {number} [maxValue] - 标准值上限
 * @property {number} [minValue] - 标准值下限
 * @property {Object} [params] - 额外参数
 * @property {string} [productDate] - 生产日期
 * @property {number} [productFinishId] - 完工单id
 * @property {string} [productFinishNo] - 完工单号
 * @property {number} [productJobId] - 生产作业编号
 * @property {string} [productJobName] - 作业名称
 * @property {number} [productLineId] - 生产线编号
 * @property {string} [productLineName] - 生产线名称
 * @property {number} [productPlanId] - 生产计划编号
 * @property {string} [productPlanNo] - 计划编号
 * @property {number} [productQuantity] - 生产数量
 * @property {number} [productScheduleId] - 计划排产编号
 * @property {number} [qualifiedRate] - 合格率
 * @property {string} [remark] - 备注
 * @property {string} [searchValue] - 搜索值
 * @property {string} [serialNo] - 流水号
 * @property {string} [updateBy] - 更新人
 * @property {string} [updateTime] - 更新时间
 */

/**
 * 生产完工单查询参数类型
 * @typedef {Object} FinishOrderQueryParams
 * @property {string} [batchNo] - 生产批号
 * @property {string} [createBy] - 创建用户
 * @property {string} [finishDate] - 完工日期
 * @property {number} [finishQuantity] - 生产数量
 * @property {number} [id] - 编号
 * @property {number} [jobId] - 生产作业
 * @property {string} [jobName] - 作业名称
 * @property {string} [materialCode] - 物料编码
 * @property {number} [materialId] - 产品
 * @property {string} [materialModel] - 物料型号
 * @property {string} [materialName] - 物料名称
 * @property {string} [materialSpecification] - 物料规格
 * @property {string} [materialUnit] - 物料单位
 * @property {number} [planId] - 生产计划
 * @property {string} [planName] - 计划名称
 * @property {string} [planNo] - 计划号
 * @property {number} [scheduleId] - 计划排产
 * @property {string} [serialNo] - 生产完工单号
 * @property {string} [status] - 状态
 * @property {Object} [params] - 额外参数
 * @property {string} [remark] - 备注
 * @property {string} [searchValue] - 搜索值
 * @property {string} [updateBy] - 更新人
 * @property {string} [updateTime] - 更新时间
 */

/**
 * 生产完工单响应项类型
 * @typedef {Object} FinishOrderItem
 * @property {string} batchNo - 生产批号
 * @property {string} createBy - 创建用户
 * @property {string} finishDate - 完工日期
 * @property {number} finishQuantity - 生产数量
 * @property {number} id - 编号
 * @property {number} jobId - 生产作业
 * @property {string} jobName - 作业名称
 * @property {string} materialCode - 物料编码
 * @property {number} materialId - 产品
 * @property {string} materialModel - 物料型号
 * @property {string} materialName - 物料名称
 * @property {string} materialSpecification - 物料规格
 * @property {string} materialUnit - 物料单位
 * @property {Object} params - 额外参数
 * @property {number} planId - 生产计划
 * @property {string} planName - 计划名称
 * @property {string} planNo - 计划号
 * @property {string} remark - 备注
 * @property {number} scheduleId - 计划排产
 * @property {string} searchValue - 搜索值
 * @property {string} serialNo - 生产完工单号
 * @property {string} status - 状态
 * @property {string} updateBy - 更新人
 * @property {string} updateTime - 更新时间
 */

/**
 * 生产完工单列表响应类型
 * @typedef {Object} FinishOrderResponse
 * @property {string} code - 状态码，200正确，其他错误
 * @property {string} msg - 返回消息内容
 * @property {Array<FinishOrderItem>} data - 返回业务数据
 * @property {string} total - 总记录数
 */

export const ProductCheckTypes = {};
export const FinishOrderTypes = {}; 