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

// $phone=$_REQUEST["phone"];
$phone = isset($_POST['phone'])?$_POST['phone']:'';
// $passwordA=$_REQUEST["passwordA"];
$passwordA = isset($_POST['passwordA'])?$_POST['passwordA']:'';

// echo $passwordA;

if($phone){
    $sql1 = "SELECT*FROM dfyg WHERE phone = '$phone'";
    
    $res1 = $conn->query($sql1);
    $content = $res1->fetch_all(MYSQLI_ASSOC);
    
    // var_dump($res1);
    if($res1 ->num_rows){
        //存在,给登录
        echo 'yes';
      
    }else{
        echo 'no';
    }
    
    }

    
if($passwordA){
    $sql2 = "SELECT*FROM dfyg WHERE passwordA = $passwordA";
    
    $res2 = $conn->query($sql2);
    
    // var_dump ($res2);
    if($res2->num_rows){
        //存在,给予登录
        echo '1';
    }else{
        echo '0';
    }
}




// $result = mysqli_query($sql);
// echo $result;
?>