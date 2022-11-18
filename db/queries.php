<?php

    include_once 'db.php';

    class consultas extends DB {

        public function Login ($user, $pass){
            $pass = md5($pass);
            $query = $this->connect()->prepare("SELECT ID, user, password, rol FROM usuarios WHERE user = '$user'");
            $query->execute();
            if ($query->rowCount()){

                foreach($query as $registro){
                    $datos = [
                        'id' => $registro['ID'],
                        'user' => $registro['user'],
                        'rol' => $registro['rol']
                    ];
                    $password = $registro['password'];
                }

                if (password_verify($pass, $password)){
                    return $datos;
                }

            }
            return false;
        }

        public function getIdUser(){

        }

    }
?>

