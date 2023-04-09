import { post, get, put, del } from './server'
export const loginApi = (data: any) => {
  return put({
    url: '/user/login',
    data
    // data: {
    //   'userName': 'root',
    //   'userPassword': 'root'
    // }
  })
}

export const registApi = (data: any) => {
  return put({
    url: '/user/register',
    data
  })
}