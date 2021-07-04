# 2021.6.22

* 初始化vue3blog项目
* 构建layout



# 2021.6.22

* header 组件开发完成

# 2021.6.28

* 修复刷新界面 导航动画不匹配
* 主界面动态适配
* 引入svgIcon
* 文章卡片布局完善
* 文章卡片动画封装mixin函数

# 2021.6.29

* 构建登录界面

* 解决input历史记录时，背景颜色改变

  ```css
  //css 解决
  input:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset; // 关键代码
    -webkit-text-fill-color: #666; // 修改输入字体颜色
  }
  ```

* footer 开发

# 2021.6.30

* 侧边栏开发

# 2021.7.1

* 侧边栏开发完成
* 通用卡片封装
* 通用标签封装

# 2021.7.3
* 使用MySQL创建文章表、用户表、分类表、标签表
* id使用UUID

# 2021.7.4
* 搭建express后端
* 开始接入数据
* 时间需要格式化