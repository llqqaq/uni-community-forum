const http = uni.$u.http

// 获取首页广告轮播图
export const getAdvertising = () => http.get('/advertisingspace/advertising?space=1,2,3')

// 获取动态列表
export const getFeeds = params => http.get('/feeds', params)

// 获取资讯列表信息
export const getNews = params => http.get('/news', params)

// 获取指定id的动态详情
export const getFeedInfo = id => http.get(`/feeds/${id}`)

// 获取指定id的动态评论详情
export const getFeedComments = id => http.get(`/feeds/${id}/comments`)

// 点赞动态
export const likeThisFeed = params => http.post(`/feeds/${params.id}/like`)

// 取消点赞动态
export const unlikeThisFeed = params => http.delete(`/feeds/${params.id}/unlike`)

// 发布一条动态
export const postOneFeed = params => http.post(`/feeds`, params)

// 评论一条动态
export const commentOneFeed = params => http.post(`/feeds/${params.id}/comments`, {
	body: params.body
})

// 获取指定id的新闻详情
export const getNewInfo = id => http.get(`/news/${id}`)

// 获取指定id的资讯评论详情
export const getNewsComments = id => http.get(`/news/${id}/comments`)

// 点赞资讯
export const likeThisNew = params => http.post(`/news/${params.id}/like`)

// 取消点赞资讯
export const unlikeThisNew = params => http.delete(`/news/${params.id}/unlike`)

// 评论一条资讯
export const commentOneInfo = params => http.post(`/news/${params.id}/comments`, { body : params.body })

// 用户相关api
// 查找用户信息
export const findUser = name => http.get(`/users/${name}`)

// 获取注册验证码
export const getRegisterCode = params => http.post('/verifycodes/register', params)

// 获取手机号码登录验证码
export const getLoginCode = params => http.post('/verifycodes', params)

// 注册
export const userRegister = params => http.post('/users', params)

// 登录
export const userLogin = params => http.post('/auth/login', params)

// 退出
export const userLogout = () => http.post('/auto/logout')

// 获取当前登录用户相关通知信息
export const getUserMsg = () => http.get('/user/counts')


// 文件上传操作
export const uploadFile = async file => {
	let rfile = uni.getFileSystemManager().readFileSync(file)
	
	const result = await uni.uploadFile({
						url: `${uni.$u.http.config.baseURL}/files`, 
						header: {
							Authorization: `Bearer ${uni.getStorageSync('token')}`
						},
						file: rfile,
						filePath: file,
						name: 'file'
					})
	console.log(`${uni.$u.http.config.baseURL}/files`)
	return JSON.parse(result[1].data)
}