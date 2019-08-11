<?php


// 防止中文出现乱码
header('Content-type:text/html;charset=utf-8');
// 01-先连接到服务器的数据库(选择表)
/* 参数1：服务器地址 */
/* 参数2：用户名 */
/* 参数3：密码 */
/* 参数4：数据库名字 */
$servername = "localhost";
$username = "root";
$psw = "";
$dbname = "h51906";



// 通过构造函数  mysqli()建立连接
$conn = new  mysqli($servername,$username,$psw,$dbname);
if($conn->connect_error){
    die("连接失败：".$conn->connect_error);
}

// echo "连接成功";
$conn->set_charset("utf8");
// 写sql语句查询数据（建议在Navicat的查询里写好在粘贴来php）






?>