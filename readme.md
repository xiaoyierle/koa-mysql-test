#koa+mysql 简单例子
##数据库创建
```
--- 创建数据库
CREATE DATABASE koa;

--- 创建用户并授予权限
CREATE USER 'user'@'localhost' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON koa.* TO 'user'@'localhost';

--- 处理 MySQL 8.0 版本的认证协议问题
ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';
flush privileges;
```