<?php

    class UserSession{
        public function closeSession(){
            session_start();
            session_unset();
            session_destroy();
        }
    }

?>