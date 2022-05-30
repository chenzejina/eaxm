import axios from "axios";

/** 
 * @description 获取验证码
 * **/
export function getCaptchaApi() {
    return '/api/captcha?' + Math.random()
}


/*** 
 * @description 注册接口 
 * @param payload <object>
 * @param payload.username
 * @param payload.password
 * @param payload.email
 * @param payload.phone
 * @param payload.caprcha 
**/
export function registerApi(payload = {}) {
    return axios.post('/user/register', payload, getPostConfig())
}

/**
 * @description 登录接口
 * @param payload <object>
 * @param payload.username
 * @param payload.password
 * @param payload.captcha
 **/
export function loginApi(payload = {}) {
    return axios.post('/user/login', payload, getPostConfig())
}

/**
 * @description 局部配置 token
 */
const getPostConfig = function () {
    return {
        baseURL: '/api',
        headers: {
            contentType: 'application/json',
            authorization: sessionStorage.getItem("token"),
        }
    };
}

/** 
 * @description 获取用户信息接口
 * **/
export function getUserInfoApi(payload = {}) {
    return axios.post('/user/info', payload, getPostConfig())
}

/** 
 * @description 退出登录接口
 * **/
export function logOutApi(payload = {}) {
    return axios.post('/user/logout', payload, getPostConfig())
}

/**
 * @description 查询题库列表接口
 * @param payload <object>
 * @param payload.type  //题目类型 
 */
export function questionList(payload){
    return axios.post('api/question/list',payload)
}
/**
 * @description 创建题接口
 * @param payload <object>
 * @param payload.type  //题目类型
 * @param payload.title  //题目标题 
 * @param payload.questionA  // 选项a,
 * @param payload.questionB  // 选项b,
 * @param payload.answer     // 答案   
 * @param payload.level     // 难度系数 1：简单  2：普通 3：困难
 */
export function questionCreate(payload){
    return axios.post('/api/question/create',payload)
}


/**
 * @description 修改题接口
 * @param payload <object>
 * @param payload.id //题目id
 * @param payload.type  //题目类型
 * @param payload.title  //题目标题 
 * @param payload.questionA  // 选项a,
 * @param payload.questionB  // 选项b,
 * @param payload.answer     // 答案   
 * @param payload.level     // 难度系数 1：简单  2：普通 3：困难
 */
export function questionModify(payload){
    return axios.post('/api/question/update',payload)
}

   

/**
 * @description 删除题接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function questiondalete(payload){
    return axios.post('/api/question/delete',payload)
} 

/**
 * @description 修改接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function modifyInformation(payload){
    return axios.post('/api/user/update',payload)
} 

/**
 * @description 查询任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function notepad(payload){
    return axios.post('/api/diary/list',payload)
} 

/**
 * @description 查询任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function diraryCreate(payload){
    return axios.post('/api/diary/create',payload)
} 


/**
 * @description 創建任务接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function createTesk(payload){
    return axios.post('/api/task/create',payload)
} 

/**
 * @description 查看任務列表接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function createList(payload){
    return axios.post('/api/task/list',payload)
} 

/**
 * @description 查看用戶信息接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function userList(payload){
    return axios.post('/api/user/list',payload)
} 

/**
 * @description 發佈任務接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function releaseTask(payload){
    return axios.post('/api/task/release',payload)
} 

/**
 * @description 查询任务详情接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function taskDetail(payload){
    return axios.post('/api/task/detail',payload)
} 

/**
 * @description 创建角色接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function createRole(payload){
    return axios.post('/api/role/create',payload)
}

/**
 * @description 角色分组列表接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function roleGroupList(payload){
    return axios.post('/api/roleGroup/list',payload)
} 

/**
 * @description 角色列表接口
 * @param payload <object>
 * @param payload.id  //题目id
 * @param payload.type  //题目类型 
 */
export function roleEntry(payload){
    return axios.post('/api/role/list',payload)
} 