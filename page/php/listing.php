<?php


  $page = isset($_GET['page']) ? $_GET['page'] : '';//页数，哪一页
  $num = isset($_GET['num']) ? $_GET['num'] : '';//一页数据有10条
  // $paixu =  isset($_GET['paixu']) ? $_GET['paixu'] : "";
  $ret = isset($_GET['ret']) ? $_GET['ret'] : "";
  $hun = isset($_GET['hun']) ? $_GET['hun'] : "";
  $orderType =isset($_GET['orderType']) ? $_GET['orderType'] : "";
  
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

// $sql = "SELECT * FROM moxi LIMIT $index,40";  //得到字符串

// 执行sql语句
// $res = $conn->query($sql);//得到一个结果
// // var_dump($res);

// // 得到结果集里面的内容部分
// $content = $res->fetch_all(MYSQLI_ASSOC);
// var_dump($content);
// 把数据传给前端，把数据先转成字符串再传给前端
// echo json_encode($content);


// // 区间查询
switch($orderType){
  case 'init':  // 初始化
  $sql4 =  "SELECT * FROM moxi LIMIT $index,40";
  break;
  case 'price':
  $sql4 = "SELECT * FROM moxi WHERE price  BETWEEN $ret AND $hun";
  break;
  case 'ascending':
  $sql4 = "SELECT * FROM moxi ORDER BY price LIMIT $index,40";
    break;
    case 'descending':
    $sql4 = "SELECT * FROM moxi ORDER BY price DESC LIMIT $index,40";
    break;
}


$res = $conn->query($sql4);//得到一个结果
// var_dump($res);

// 得到结果集里面的内容部分
$content = $res->fetch_all(MYSQLI_ASSOC);

$sql2 = 'SELECT * FROM moxi';

$res2 = $conn->query($sql2);



$data = array(
  "page" =>$page,
"num" =>$num,
"data" => $content,
"pages" =>$res->num_rows,
);
 echo json_encode($data);
?>