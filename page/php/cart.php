<?php


$goid = isset($_POST['goid'])?$_POST['goid']:'';
$usman = isset($_POST['usman']) ? $_POST['usman'] : "";
$userName = isset($_POST['userName']) ? $_POST['userName'] : "";

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





if($usman){
  $sql = "SELECT * FROM cart WHERE id = $usman";
  $res = $conn->query($sql);


    if($res->num_rows){
        $sql2 = "UPDATE cart SET num = num + 1 WHERE id = $usman";
        $res2 = $conn->query($sql2);
    }else{
        $sql3 = "INSERT INTO cart(id,num,phone) VALUES ('$usman',1,'$userName')" ;
        $res3 = $conn->query($sql3);
    }
}

 if($userName){
    //  购物车的id和列表的id合并
    $sql4 ="SELECT * FROM  moxi  inner join cart on cart.id=moxi.id where phone='$userName'" ;
    // echo $sql4;
    $res4 = $conn->query($sql4);
    $content = mysqli_fetch_all($res4,MYSQLI_ASSOC);
    echo json_encode($content);
 }

 if($goid){
    $sql5 = "DELETE FROM cart WHERE id=$goid";
    $res5 = $conn->query($sql5);
    // if($res5){
    //     echo 'Y';
    // }else{
    //     echo 'N';
    // }
}


?>