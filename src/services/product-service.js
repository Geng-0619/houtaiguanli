/**
 * product-service.js Created by SmallFour on 2019/10/22/14:16
 */

// 第二个文件：M层

/*
* M : 数据
* V： 视图
* C： 业务逻辑层
* */

import HTTP from '../utils/http'
const _http = new HTTP()
class Product {
  // detail方法
  // detail (productId) {
  //   return _http.request({
  //     type: 'post',
  //     url: 'shop/goods/detail',
  //     data: {
  //       id: productId
  //     }
  //   })
  // }
  // 登录
  login(login) {
    return _http.request({
      type: "post",
      url: "login",
      data: {
        username: login.username,
        password: login.password
      }
    })
  }
  //  用户列表
  users() {
    return _http.request({
      // type:"post",
      url: "users?query=&pagenum=1&pagesize=10",
    })
  }
  users1(n) {
    return _http.request({
      // type:"post",
      url: `users?query=&pagenum=${n.num}&pagesize=${n.val}`,
    })
  }
  //添加用户
  users2(n) {
    return _http.request({
      type: "post",
      url: "users",
      data: {
        username: n.username,
        password: n.password,
        email: n.email,
        mobile: n.mobile
      }
    })
  }
  //删除用户
  usersdel(n) {
    return _http.request({
      type: "delete",
      url: `users/${n}`
    })
  }
  //编辑用户
  userupdate(n) {
    return _http.request({
      type: "put",
      url: `users/${n.id}`,
      data: {
        username: n.username,
        email: n.email,
        mobile: n.mobile
      }
    })
  }
  //用户状态
  upcheck(n) {
    return _http.request({
      type: "put",
      url: `users/${n.id}/state/${n.mg_state}`
    })
  }
  //角色分配
  userfp(n) {
    return _http.request({
      type: "put",
      url: `users/${n.rids}/role`,
      data: {
        rid: n.id
      }
    })
  }
  //权限分配
  Jurisdic(n) {
    return _http.request({
      type: "post",
      url: `roles/${n.id}/rights`,
      data: {
        rids: n.rids
      }
    })
  }
  //  菜单
  menus() {
    return _http.request({
      // type:"post",
      url: "menus"
    })
  }
  //添加角色
  roles(n) {
    return _http.request({
      type: "post",
      url: "roles",
      data: {
        roleName: n.roleName,
        roleDesc: n.roleDesc
      }
    })
  }
  //编辑角色
  roleaa(n) {
    return _http.request({
      type: "put",
      url: `roles/${n.id}`,
      data: {
        roleName: n.roleName,
        roleDesc: n.roleDesc
      }
    })
  }
  //删除角色
  rolesa(n) {
    return _http.request({
      type: "delete",
      url: `roles/${n}`
    })
  }
  //角色列表
  roles1() {
    return _http.request({
      // type:"post",
      url: "roles"
    })
  }
  //权限列表
  rights() {
    return _http.request({
      // type:"post",
      url: "rights/tree"
    })
  }
  //商品列表
  Goodslist() {
    return _http.request({
      url: `goods?pagenum=1&pagesize=10`
    })
  }
  //分页
  Goodslist1(n) {
    return _http.request({
      url: `goods?pagenum=${n.num}&pagesize=${n.val}`
    })
  }
  //商品分类
  // goodsfl
  goodsClass() {
    return _http.request({
      url: `categories?type=8`
    })
  }
  //商品参数
  canshu(n) {
    return _http.request({
      url: `categories/${n}/attributes?sel=many`
    })
  }
  //商品属性
  shuxing(n) {
    return _http.request({
      url: `categories/${n}/attributes?sel=only`
    })
  }
  //订单列表
  order() {
    return _http.request({
      url: `orders?=&pagenum=1&pagesize=10`
    })
  }
  order1(n) {
    return _http.request({
      url: `orders?=&pagenum=${n.num}&pagesize=${n.val}`
    })
  }
//  动态删除参数
  dtgoodsdel(n){
    return _http.request({
      type:"delete",
      url:`categories/${n.cat_id}/attributes/${n.attr_id}`
    })
  }
//  动态删除属性
  dtgoodsdel1(n){
    return _http.request({
      type:"delete",
      url:`categories/${n.cat_id}/attributes/${n.attr_id}`
    })
  }
  //动态添加
  dtAddgoods(n) {
    return _http.request({
      type: "post",
      url: `categories/${n.rids}/attributes`,
      data: {
        attr_name: n.inputValue,
        attr_sel: 'many'
      }
    })
  }
  //静态属性
  dtAddgoods1(n) {
    return _http.request({
      type: "post",
      url: `categories/${n.rids}/attributes`,
      data: {
        attr_name: n.inputValue,
        attr_sel: 'only'
      }
    })
  }
  //数据报表
  reports(){
    return _http.request({
      url:"reports/type/1"
    })
  }
  //添加商品
  Addgoods(n){
    return _http.request({
      type:"post",
      url:"goods",
      data:{  
        goods_name:n.goods_name,
        goods_price:n.goods_price,
        goods_weight:n.goods_weight,
        goods_number:n.goods_number,
        goods_cat:n.goods_cat,
        goods_introduce:n.goods_introduce,
        pics:n.pics
      }
    })
  }
  //删除商品
  goodsDelete(n){
    return _http.request({
      type:"delete",
      url:`goods/${n}`
    })
  }
  //商品分类列表
  categories(n){
    return _http.request({
      url:`categories?type=${n.type}&pagenum=${n.pagenum}&pagesize=${n.pagesize}`
    })
  }
  //
  delDt(n){
    return _http.request({
      type:"put",
      url:`categories/${n.id1}/attributes/${n.id2}`,
      data:{
        attr_name:n.name,
        attr_sel:n.sel,
        attr_vals:n.vals
      }
    })
  }
  //删除添加修改标签
  delTag(obj){
    return _http.request({
      type:"put",
      url:`categories/${obj.cat_id}/attributes/${obj.attr_id}`,
      data:{
        attr_name:obj.attr_name,
        attr_sel:obj.attr_sel,
        attr_vals:obj.attr_vals
      }
    })
  }
  //动态参数静态属性添加
  activecan(obj){
    return _http.request({
      type:"post",
      url:`categories/${obj.id}/attributes`,
      data:{
        attr_name:obj.type,
        attr_sel:obj.attr_sel
      }
    })
  }
  ///
  quiet(id){
    return _http.request({
      type:"get",
      url:`categories/${id}/attributes?sel=only`
    })
  }
  //商品参数
  attributes(id){
    return _http.request({
      url:`categories/${id}/attributes?sel=many`
    })
  }
  //动态删除参数
  delActives(obj){
    return _http.request({
      type:"delete",
      url:`categories/${obj.cat_id}/attributes/${obj.attr_id}`
    })
  }
  //静态属性删除
  delquiets(obj){
    return _http.request({
      type:"delete",
      url:`categories/${obj.cat_id}/attributes/${obj.attr_id}`
    })
  }
  //添加分类
  Addcategories(n){
    return _http.request({
      type:"post",
      url:`categories`,
      data:{
        cat_pid:n.cat_pid,
        cat_name:n.cat_name,
        cat_level:n.cat_level
      }
    })
  }
  //删除分类
  handleDeletes(n){
    return _http.request({
      type:"delete",
      url:`categories/${n}`
    })
  }
}

export default Product
