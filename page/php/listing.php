<?php


  $page = isset($_GET['page']) ? $_GET['page'] : '';//页数，哪一页
  $num = isset($_GET['num']) ? $_GET['num'] : '';//一页数据有10条
 

// echo $page,$num;
// 防止中文出现乱码
// header('Content-type:text/html;charset=utf-8');
// 或者写http://127.0.0.1
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

$index = ($page - 1) * $num;
$sql = "SELECT * FROM moxi LIMIT $index,40";  //得到字符串

// 执行sql语句
$res = $conn->query($sql);//得到一个结果
// var_dump($res);

// 得到结果集里面的内容部分
$content = $res->fetch_all(MYSQLI_ASSOC);
// var_dump($content);
// 把数据传给前端，把数据先转成字符串再传给前端
// echo json_encode($content);


$sql2 = 'SELECT * FROM moxi';

$res2 = $conn->query($sql2);

$data = array(
"data" => $content,
"pages" =>$res2->num_rows,
"page" =>$page,
"num" =>$num
);
 echo json_encode($data);
?>