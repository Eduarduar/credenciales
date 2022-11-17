<?php

    class UserSession{

        public function setCurrentUser($user, $id){
            $_SESSION['user'] = $user;
            $_SESSION['id'] = $id;
        }

        public function getCurrentUser(){
            return $_SESSION['user'];
        }

        public function closeSession(){
            session_start();
            session_unset();
            session_destroy();
        }
    }

?>