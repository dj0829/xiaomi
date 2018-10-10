<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin:*");
    include "connect_db.php";
    $json = json_decode(file_get_contents("php://input"));
    $username = $json -> username;
    $password = $json -> password;
    $sql = "SELECT * from xiaomi_user WHERE username='$username'";
    $insert_sql = "INSERT into xiaomi_user (username, password) VALUES ('$username', '$password')";
    $coon = new db();
    $rows = $coon -> Query($sql, 2);
    if($rows) {
      $arr = array("code" => "1000", "msg" => "用户名已经存在, 注册不成功");

    } else {
      $result = $coon -> Query($insert_sql, 3);
      if($result) {
        $arr = array("code" => "200", "msg" => "");
      } else {
        $arr = array("code" => "1001", "msg" => "注册失败,未知原因");
      }
    }
    echo json_encode($arr);

  ?>