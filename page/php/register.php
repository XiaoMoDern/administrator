<?php

/* (1) 接收前端提交的参数：用户名 && 密码 && 手机号码 */
/* (2) 检查用户名和手机号码是否已经被使用，如果已经被使用返回错误信息提醒用户 */
/* (3) 如果满足注册的条件，那么就把当前的账户保存起来 */


/* 数据库操作：命令行  ||  通过编程语言PHP   ||  利用自带的网页工具  */
# INSERT INTO `userList` (`username`, `password`, `phone`) VALUES ('zs', '0000000', '18689429780');

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

$passwordA= $_REQUEST["passwordA"];
// $passwdrdB = $_REQUEST["passwdrdT"];
$phone = $_REQUEST["phone"];
// echo $phone;


//   // $passwdrdA =  isset($_POST['passwdrdR']);
//   // $passwdrdB = isset($_POST['passwdrdT']) ;
//   // $phone = isset($_POST['phone']);

$sql = "INSERT INTO `dfyg` (`phone`,`passwordA`) VALUES ('$phone','$passwordA')";
// $sql ="INSERT INTO `DFYG`(`phone`) VALUES('$phone')"
// echo $sql;
$result = mysqli_query($conn, $sql);
// var_dump($result);



// // #bool(false)  | bool(true)
// // var_dump($result);

// /* 返回JSON数据给客户端 */
// /* 规范：{"status":"success","msg":"注册成功","data":""} */
$data = array("status"=>"", "msg"=>"", "data"=>"");
if($result)
{
  $data["status"] = "success";
  $data["msg"] = "恭喜你，注册成功！";
}else{
  $data["status"] = "error";
  $data["msg"] = "抱歉，用户名或者手机号码已经被注册了！";
}
echo json_encode($data);
?>