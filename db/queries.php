<?php

    include_once 'db.php';
    
    date_default_timezone_set("America/Mexico_City");

    class consultas extends DB {

        public function Login ($user, $pass){
            $pass = md5($pass);
            $query = $this->connect()->prepare("SELECT ID, user, password, rol FROM usuarios WHERE user = '$user' AND estado = 1");
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
                    $this->setHistorialUsuario('Inicio sessión', $datos['id'], date('d/m/Y, h:i:s'));
                    return $datos;
                }
                $this->setHistorialUsuario('Intento Iniciar Sessión', $datos['id'], date('d/m/Y, h:i:s'));

            }
            return false;
        }
        
        public function confirmarUserById($id){
            $query = $this->connect()->prepare("SELECT ID FROM usuarios WHERE ID = $id");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }
        
        public function confirmarUserByUser($user, $id = null){
            if ($id == null){
                $query = $this->connect()->prepare("SELECT user FROM usuarios WHERE user = '$user';");
            }else{
                $query = $this->connect()->prepare("SELECT user FROM usuarios WHERE user = '$user' AND ID <> $id;");
            }
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function confirmarUserByIdPass($id, $pass){
            $pass = md5($pass);
            $query = $this->connect()->prepare("SELECT password FROM usuarios WHERE ID = $id");
            $query->execute();
            if ($query->rowCount()){
                foreach($query as $registro){
                    $password = $registro['password'];
                }
                if (password_verify($pass, $password)){
                    return true;
                }
            }
            return false;
        }

        public function getUserInfo($id){
            $query = $this->connect()->prepare("SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, rol,nombreRol, estado FROM usuarios, roles WHERE usuarios.ID = $id AND usuarios.rol = roles.NoRol;");
            $query->execute();
            foreach($query as $registro){
                $datos = [
                    'id'            => $registro['ID'],
                    'user'          => $registro['user'],
                    'nombre'        => $registro['nombre'],
                    'ap_paterno'    => $registro['ap_paterno'],
                    'ap_materno'    => $registro['ap_materno'],
                    'telefono'      => $registro['telefono'],
                    'mail'          => $registro['mail'],
                    'rol'           => $registro['nombreRol'],
                    'ROL'           => $registro['rol'],
                    'estado'        => $registro['estado']
                ];
            }
            return $datos;
        }

        public function getAlumnoInfo($NoControl){
            $query = $this->connect()->prepare("SELECT NoControl, nombre, ap_paterno, ap_materno, NoEspecialidad, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE alumnos.NoControl = $NoControl AND alumnos.especialidad = especialidades.NoEspecialidad;");
            $query->execute();
            foreach($query as $registro){
                $datos = [
                    'NoControl'     => $registro['NoControl'],
                    'nombre'        => $registro['nombre'],
                    'ap_paterno'    => $registro['ap_paterno'],
                    'ap_materno'    => $registro['ap_materno'],
                    'ESP'           => $registro['nombreEspecialidad'],
                    'esp'           => $registro['NoEspecialidad'],
                    'curp'          => $registro['curp'],
                    'generacion'    => $registro['generacion'],
                    'NSS'           => $registro['NSS'],
                    'estado'        => $registro['estado']
                ];
            }
            return $datos;
        }

        public function getCredenciaInfoTabla(){
            return $this->connect()->query("SELECT NoCredencial , NoControl, nombre, ap_paterno, ap_materno FROM alumnos a INNER JOIN credencial c WHERE a.NoControl = c.alumno;");
        }

        public function confirmNameImagen($imagen) {
            $query = $this->connect()->prepare("SELECT NoCredencial FROM credencial WHERE imagen = '$imagen'");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function confirmImagenUser($NoControl) {
            $query = $this->connect()->prepare("SELECT NoCredencial FROM credencial WHERE alumno = $NoControl");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function confirmCredencialID($NoCredencial){
            $query = $this->connect()->prepare("SELECT NoCredencial FROM credencial WHERE NoCredencial = '$NoCredencial';");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function setCredencial($NoCredencial,$NoControl,$direccion){
            $this->connect()->query("INSERT INTO credencial VALUES ('$NoCredencial', $NoControl, '$direccion');");
        }

        public function confirmAlumno($NoControl, $curp){
            $query = $this->connect()->prepare("SELECT NoControl FROM alumnos WHERE NoControl = $NoControl AND curp = '$curp';");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function getCredencialInfo($NoControl){
            $query = $this->connect()->prepare("SELECT NoCredencial, imagen FROM credencial WHERE alumno = $NoControl");
            $query->execute();
            foreach($query as $registro){
                $datos = [
                    'NoCredencial'  => $registro['NoCredencial'],
                    'imagen'        => $registro['imagen']
                ];
            }
            return $datos;
        }

        public function getCredencialInfoByNoCredencial($NoCredencial){
            $query = $this->connect()->prepare("SELECT imagen FROM credencial WHERE NoCredencial = '$NoCredencial'");
            $query->execute();
            foreach($query as $registro){
                $imagen = $registro['imagen'];
            }
            return $imagen;
        }

        public function getHistorialAlumnos(){
            return $this->connect()->query("SELECT NoRegistro, accion, NoControl, nombre, ap_paterno, ap_materno, fecha FROM consultaspublic, alumnos WHERE consultaspublic.usuario = alumnos.NoControl ORDER BY consultaspublic.NoRegistro DESC;");
        }
        
        public function getHistorialUsers(){
            return $this->connect()->query("SELECT NoRegistro, movimiento, ID, user, fecha FROM movimientosuser, usuarios WHERE movimientosuser.usuario = usuarios.ID ORDER BY movimientosuser.NoRegistro DESC;");
        }

        public function getUsersInfo($id){
            return $this->connect()->query("SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE usuarios.rol = roles.NoRol and usuarios.ID <> $id;");
        }

        public function getAlumnosInfo(){
            return $this->connect()->query("SELECT NoControl, nombre, ap_paterno, ap_materno, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE alumnos.especialidad = especialidades.NoEspecialidad;");
        }

        public function consultaFiltro($consulta){
            return $this->connect()->query("".$consulta."");
        }

        public function setHistorialPublic($accion, $usuario, $fecha){
            $this->connect()->query("INSERT INTO consultaspublic VALUES (NULL, '$accion', $usuario, '$fecha');");
        }

        public function setHistorialUsuario($accion, $usuario, $fecha){
            $this->connect()->query("INSERT INTO movimientosuser VALUES (NULL, '$accion', $usuario, '$fecha');");
        }
        
        public function deleteCredencial($NoCredencial){
            $query = $this->connect()->prepare("SELECT alumno FROM credencial WHERE NoCredencial = '$NoCredencial'");
            $query->execute();
            $NoControl;
            foreach($query as $registro){
                $NoControl = $registro['alumno'];
            }
            $datos = $this->getAlumnoInfo($NoControl);
            $this->connect()->query("DELETE FROM credencial WHERE NoCredencial = '$NoCredencial';");
            return $datos;
        }

        public function insertUsuario($user, $name, $apellido_p, $apellido_m, $correo, $telefono, $rol, $pass){
            $md5 = md5($pass);
            $pass = password_hash($md5, PASSWORD_DEFAULT, ['cost' => 10]);
            $this->connect()->query("INSERT INTO usuarios VALUES (NULL, '$user', '$name', '$apellido_p', '$apellido_m', $telefono, '$correo', '$pass', $rol, 1);");
        }

        public function updateUsuarioSession($ID ,$user, $nombre, $apP, $apM, $correo, $telefono){
            if (!$this->confirmarUserByUser($user, $ID)){
                $this->connect()->query("UPDATE usuarios SET user = '$user', nombre = '$nombre', ap_paterno = '$apP', ap_materno = '$apM', telefono = $telefono, mail = '$correo' WHERE ID = $ID;");
                return true;
            }
            return false;
        }

        public function setAlumno($NoControl, $nombre, $apellido_p, $apellido_m, $curp, $esp, $generacion, $nss, $estado = 1){
            $this->connect()->query("INSERT INTO alumnos VALUES ($NoControl, '$nombre', '$apellido_p', '$apellido_m',  $esp, '$curp', '$generacion', $nss, $estado);");
        }

        public function confirmNoControl($NoControl){
            $query = $this->connect()->prepare("SELECT NoControl FROM alumnos WHERE NoControl = $NoControl");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function confirmCurp($curp){
            $query = $this->connect()->prepare("SELECT curp FROM alumnos WHERE curp = '$curp'");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function confirmNss($NSS){
            $query = $this->connect()->prepare("SELECT NSS FROM alumnos WHERE NSS = $NSS");
            $query->execute();
            if ($query->rowCount()){
                return true;
            }
            return false;
        }

        public function deleteAlumno ($NoControl){
            $this->connect()->query("DELETE FROM alumnos WHERE NoControl = $NoControl");
        }

        public function updateUser($id, $user, $nombre, $apP, $apM, $correo, $telefono, $rol, $estado){
            $this->connect()->query("UPDATE usuarios SET user = '$user', nombre = '$nombre', ap_paterno = '$apP', ap_materno = '$apM', telefono = $telefono, mail = '$correo', rol = $rol, estado = $estado WHERE ID = $id;");
        }

        public function updatePassword($id, $pass){
            $md5 = md5($pass);
            $pass = password_hash($md5, PASSWORD_DEFAULT, ['cost' => 10]);
            $this->connect()->query("UPDATE usuarios SET password = '$pass' WHERE ID = $id;");
        }

    }

    $consulta = new consultas();

    if (isset($_POST['id_consultar_usuario'])){
        echo json_encode($consulta->getUserInfo($_POST['id_consultar_usuario']));
    }

    if (isset($_POST['insertAlumno_nombre']) && isset($_POST['insertAlumno_ap_p']) && isset($_POST['insertAlumno_aP_m']) && isset($_POST['insertAlumno_esp']) && isset($_POST['insertAlumno_gen']) && isset($_POST['insertAlumno_nss']) && isset($_POST['insertAlumno_NoControl']) && isset($_POST['insertAlumno_curp'])){
        $consulta->setAlumno($_POST['insertAlumno_NoControl'], $_POST['insertAlumno_nombre'], $_POST['insertAlumno_ap_p'], $_POST['insertAlumno_aP_m'], $_POST['insertAlumno_curp'], $_POST['insertAlumno_esp'], $_POST['insertAlumno_gen'], $_POST['insertAlumno_nss']);
    }

    if (isset($_POST['user_session_id']) && isset($_POST['passA']) && isset($_POST['passC'])){
        if ($consulta->confirmarUserByIdPass($_POST['user_session_id'], $_POST['passA'])){
            $consulta->updatePassword($_POST['user_session_id'], $_POST['passC']);
            echo json_encode(0);
        }else{
            echo json_encode(1);
        }
    }

    if (isset($_POST['updateUser_id']) && isset($_POST['updateUser_user']) && isset($_POST['updateUser_nombre']) && isset($_POST['updateUser_apP']) && isset($_POST['updateUser_apM']) && isset($_POST['updateUser_correo']) && isset($_POST['updateUser_telefono']) && isset($_POST['updateUser_rol']) && isset($_POST['updateUser_estado']) && isset($_POST['idUser'])){
        $id         = $_POST['updateUser_id'];
        $user       = $_POST['updateUser_user'];
        $nombre     = $_POST['updateUser_nombre'];
        $apP        = $_POST['updateUser_apP'];
        $apM        = $_POST['updateUser_apM'];
        $correo     = $_POST['updateUser_correo'];
        $telefono   = $_POST['updateUser_telefono'];
        $rol        = $_POST['updateUser_rol'];
        $estado     = $_POST['updateUser_estado'];
        $idUser     = $_POST['idUser'];
        if ($consulta->confirmarUserById($id)){
            $consulta->updateUser($id, $user, $nombre, $apP, $apM, $correo, $telefono, $rol, $estado);
            $consulta->setHistorialUsuario('Modifico la informacion del usuario con id: ' . $id, $idUser, date('d/m/Y, h:i:s'));
            echo json_encode(0);
        }else{
            echo json_encode(1);
        }
    }

    if (isset($_POST['updateAlumno_NoControl']) && isset($_POST['updateAlumno_nombre']) && isset($_POST['updateAlumno_apP']) && isset($_POST['updateAlumno_apM']) && isset($_POST['updateAlumno_esp']) && isset($_POST['updateAlumno_curp']) && isset($_POST['updateAlumno_generacion']) && isset($_POST['updateAlumno_nss']) && isset($_POST['updateAlumno_estado']) && isset($_POST['updateAlumno_NoControl_old']) && isset($_POST['user_session_id'])){
        $NoControl = $_POST['updateAlumno_NoControl'];
        $nombre = $_POST['updateAlumno_nombre'];
        $apP = $_POST['updateAlumno_apP'];
        $apM = $_POST['updateAlumno_apM'];
        $esp = $_POST['updateAlumno_esp'];
        $curp = $_POST['updateAlumno_curp'];
        $generacion = $_POST['updateAlumno_generacion'];
        $nss = $_POST['updateAlumno_nss'];
        $estado = $_POST['updateAlumno_estado'];
        $NoControl_old = $_POST['updateAlumno_NoControl_old'];
        $user_id = $_POST['user_session_id'];
        $error;
        if ($consulta->confirmNoControl($NoControl_old)){
            $datos_old = $consulta->getAlumnoInfo($NoControl_old);
            $consulta->deleteAlumno($NoControl_old);
            if (!$consulta->confirmCurp($curp)){
                if (!$consulta->confirmNss($nss)){
                    if (!$consulta->confirmNoControl($NoControl)){
                        $consulta->setAlumno($NoControl, $nombre, $apP, $apM, $curp, $esp, $generacion, $nss, $estado);
                        $error = 0;
                        $consulta->setHistorialUsuario('Modifico la informacion de ' . $datos_old['NoControl'] . ' a ' . $NoControl, $user_id, date('d/m/Y, h:i:s'));
                        echo json_encode($error);
                    }else{
                        $error = 3;
                        echo json_encode($error);
                        $consulta->setAlumno($datos_old['NoControl'], $datos_old['nombre'], $datos_old['ap_paterno'], $datos_old['ap_materno'], $datos_old['curp'], $datos_old['esp'], $datos_old['generacion'], $datos_old['NSS'], $datos_old['estado']);
                    }
                }else{
                    $error = 2;
                    echo json_encode($error);
                    $consulta->setAlumno($datos_old['NoControl'], $datos_old['nombre'], $datos_old['ap_paterno'], $datos_old['ap_materno'], $datos_old['curp'], $datos_old['esp'], $datos_old['generacion'], $datos_old['NSS'], $datos_old['estado']);
                }
            }else{
                $error = 1;
                echo json_encode($error);
                $consulta->setAlumno($datos_old['NoControl'], $datos_old['nombre'], $datos_old['ap_paterno'], $datos_old['ap_materno'], $datos_old['curp'], $datos_old['esp'], $datos_old['generacion'], $datos_old['NSS'], $datos_old['estado']);
            }
        }else{
            $error = 4;
            echo json_encode($error);
        }

    }

    if(isset($_POST['insertUsuario_usuario']) && isset($_POST['insertUsuario_nombre']) && isset($_POST['insertUsuario_ap_p']) && isset($_POST['insertUsuario_ap_m']) && isset($_POST['insertUsuario_correo']) && isset($_POST['insertUsuario_telefono']) && isset($_POST['insertUsuario_rol']) && isset($_POST['insertUsuario_pass']) && isset($_POST['id_user'])){
        $user = $_POST['insertUsuario_usuario']; 
        if (!$consulta->confirmarUserByUser($user)){
            $name = $_POST['insertUsuario_nombre']; // guardamos las variables
            $apellido_p = $_POST['insertUsuario_ap_p'];
            $apellido_m = $_POST['insertUsuario_ap_m'];    
            $correo = $_POST['insertUsuario_correo'];
            $telefono = $_POST['insertUsuario_telefono'];
            $rol = $_POST['insertUsuario_rol'];
            $pass = $_POST['insertUsuario_pass'];
            $idUser = $_POST['id_user'];
    
            $consulta->insertUsuario($user, $name, $apellido_p, $apellido_m, $correo, $telefono, $rol, $pass); // insertamos el usuario en la base de datos
            $consulta->setHistorialUsuario('Creo un nuevo usuario '. $user , $idUser, date('d/m/Y, h:i:s')); // insertamos la acción en el historial
            $error = 0;
            echo json_encode($error);
        }else{
            $error = 1;
            echo json_encode($error);
        }
    }

    if (isset($_POST['deleteCredencial']) and isset($_POST['user'])){
        $user = $_POST['user'];
        $NoCredencial = $_POST['deleteCredencial'];
        $imagen = $consulta->getCredencialInfoByNoCredencial($NoCredencial);
        $array = explode('/', $imagen);
        $nombre = array_pop($array);
        $direccion = '../credenciales/'.$nombre;
        unlink($direccion);
        $datos = $consulta->deleteCredencial($NoCredencial);
        $consulta->setHistorialUsuario('Elimino la credencial de ' . $datos['nombre'] . ' ' . $datos['ap_paterno'] . ' ' . $datos['ap_materno'] . ' ' . $datos['NoControl'], $user, date('d/m/Y, h:i:s'));
    }

    if (isset($_POST['NoControl_consultar_alumno'])){
        echo json_encode($consulta->getAlumnoInfo($_POST['NoControl_consultar_alumno']));
    }

    if (isset($_POST['consulta_filtro_user'])){
        $filtro = $_POST['consulta_filtro_user'];
        $tabla = '';
        foreach($consulta->consultaFiltro($filtro) as $registro){
            $tabla .= '
            <tr class="Registro_usuario" id="'. $registro['ID'] .'" data-bs-toggle="modal" data-bs-target="#form-modificar_usuario-modal">
                <td id="'. $registro['ID'] .'">'.$registro['ID'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['user'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['nombre'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['ap_paterno'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['ap_materno'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['mail'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['telefono'].'</td>
                <td id="'. $registro['ID'] .'">'.$registro['nombreRol'].'</td>
                <td class="estado" id="'. $registro['ID'] .'">'.$registro['estado'].'</td>
            </tr>
            ';
        }

        $tabla.= '
        <tr id="insertUser">
            <th scope="row" data-bs-toggle="modal" data-bs-target="#form-insertar_usuario-modal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></th>
            <td colspan="8" class="table-active" data-bs-toggle="modal" data-bs-target="#form-insertar_usuario-modal" >Insertar Nuevo Usuario</td>
        </tr>
        ';
        echo json_encode($tabla);
    }

    if (isset($_POST['consulta_filtro_alumno'])){
        $filtro = $_POST['consulta_filtro_alumno'];
        $tabla = '';
        foreach($consulta->consultaFiltro($filtro) as $registro){
            $tabla .= '
            <tr class="Registro_alumno" id="'. $registro['NoControl'] .'" data-bs-toggle="modal" data-bs-target="#form-modificar_alumno-modal">
                <td id="'. $registro['NoControl'] .'">'.$registro['NoControl'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['nombre'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['ap_paterno'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['ap_materno'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['nombreEspecialidad'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['curp'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['generacion'].'</td>
                <td id="'. $registro['NoControl'] .'">'.$registro['NSS'].'</td>
                <td class="estado" id="'. $registro['NoControl'] .'">'.$registro['estado'].'</td>
            </tr>
            ';
        }

        $tabla.= '
        <tr id="insertAlumno">
            <th scope="row" data-bs-toggle="modal" data-bs-target="#form-insertar_alumno-modal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></th>
            <td colspan="8" class="table-active" data-bs-toggle="modal" data-bs-target="#form-insertar_alumno-modal">Insertar Nuevo Alumno</td>
        </tr>
        ';
        echo json_encode($tabla);
    }

    if (isset($_POST['consulta_filtro_historial_alumno'])){
        $filtro = $_POST['consulta_filtro_historial_alumno'];
        $tabla = '';
        foreach($consulta->consultaFiltro($filtro) as $registro){
            $tabla .= '
            <tr>
                <td>'. $registro['NoRegistro'] .'</td>
                <td>'. $registro['accion'] .'</td>
                <td>'. $registro['NoControl'] .'<br>'. $registro['nombre'] .' '. $registro['ap_paterno'] .' '.  $registro['ap_materno'] .'</td>
                <td>'. $registro['fecha'] .'</td>
            </tr>
            ';
        }
        echo json_encode($tabla);
    }

    if (isset($_POST['consulta_filtro_historial_users'])){
        $filtro = $_POST['consulta_filtro_historial_users'];
        $tabla = '';
        foreach($consulta->consultaFiltro($filtro) as $registro){
            $tabla .= '
            <tr>
                <td>'. $registro['NoRegistro'] .'</td>
                <td>'. $registro['movimiento'] .'</td>
                <td>'. $registro['ID'] .'<br>'. $registro['user'] .'</td>
                <td>'. $registro['fecha'] .'</td>
            </tr>
            ';
        }
        echo json_encode($tabla);
    }

    if (isset($_POST['consulta_filtro_credenciales'])){
        $filtro = $_POST['consulta_filtro_credenciales'];
        $tabla = '';
        foreach($consulta->consultaFiltro($filtro) as $registro){
            $tabla .= '
                <tr class="Registro_credencial" id="'. $registro['NoCredencial'] .'">
                    <td id="'. $registro['NoCredencial'] .'">'. $registro['NoCredencial'] .'</td>
                    <td id="'. $registro['NoCredencial'] .'">'. $registro['NoControl'] .'</td>
                    <td id="'. $registro['NoCredencial'] .'">'. $registro['nombre'] .'</td>
                    <td id="'. $registro['NoCredencial'] .'">'. $registro['ap_paterno'] .'</td>
                    <td id="'. $registro['NoCredencial'] .'">'. $registro['ap_materno'] .'</td>
                    <td><svg xmlns="http://www.w3.org/2000/svg" id="'. $registro['NoCredencial'] .'" width="16" height="16" fill="currentColor" class="bi bi-trash-fill delete" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></td>
                </tr>
            ';
        }
        echo json_encode($tabla);
    }

?>
