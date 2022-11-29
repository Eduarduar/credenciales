<?php

    session_start();
    date_default_timezone_set("America/Mexico_City");
    include_once './db/queries.php';
    $consulta = new consultas();
    $error = false;
    if(!isset($_SESSION['id']) and !isset($_SESSION['user']) and !isset($_SESSION['rol'])){
        header('location: ./');
    }else{
        if ($consulta->confirmarUserById($_SESSION['id'])){
            $userInfo = $consulta->getUserInfo($_SESSION['id']);
            if ($userInfo['estado'] == 0){
                header('location: ./db/logout');
            }else if ($userInfo['rol'] == 'moder'){
                $_SESSION['rol'] = 2;
            }else if ($userInfo['rol'] == 'admin'){
                $_SESSION['rol'] = 1;
            }else{
                header('location: ./db/logout');
            }
            
            $_SESSION['user'] = $userInfo['user'];
            
        }else{
            header('location: ./db/logout');
        }
        
    }

    if (isset($_POST['user-session']) and isset($_POST['nombre-session']) and isset($_POST['apP-session']) and isset($_POST['apM-session']) and isset($_POST['correo-session']) and isset($_POST['telefono-session'])){
        $user = $_POST['user-session'];
        $nombre = $_POST['nombre-session'];
        $apP = $_POST['apP-session'];
        $apM = $_POST['apM-session'];
        $correo = $_POST['correo-session'];
        $telefono = $_POST['telefono-session'];
        if ($consulta->updateUsuarioSession($_SESSION['id'], $user, $nombre, $apP, $apM, $correo, $telefono)){
            header('location: ./registros');
        }else{
            $error = true;
        }
    }

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="shortcut icon" href="./img/credencial-icono-traparente.ico" type="image/x-icon">
        <link rel="stylesheet" href="./css/css-bootstrap/bootstrap.min.css">
        <link rel="stylesheet" href="./fontawesome/css/all.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./css/registros.css">
        <title>Registros</title>
    </head>
    <body class="lightMode">
        
        <header>

            <div class="container-center">

                <div class="container-logoCetis84">

                    <img src="./img/Logo_cetis_transparent.png" alt="Logo del cetis 84">

                </div>

                <div class="conatiner-title-header">

                    <a href="http://cetis084.com.mx/" target="_blank"><h2>CETIS 84</h1></a>

                </div>

                <div class="container-button_confi">
                    
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#form-modificar_usuario_sesion-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg>
                    </button>

                </div>

                <div class="container-button_logout">

                    <button type="button" class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                    </button>

                </div>

            </div>

        </header>

        <main>

            <div class="container-center">

                <div class="container-button_back">
                    <button type="button" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                    <div class="clear"></div>
                        <div class="container-switch">
                            <button class="switch" id="switch">
                                <span><i class="fas fa-sun"></i></span>
                                <span><i class="fas fa-moon"></i></span>
                            </button>
                        </div>
                </div>

                <div class="container-options_tabla_alumnos">

                    <div class="container-filtro_alumnos form">

                        <h4>Alumnos</h4>

                        <div class="input-group mb-3">
                            <label class="input-group-text" for="options-filtro_alumnos">Filtros</label>
                            <select class="form-select" id="options-filtro_alumnos">
                                <option selected></option>
                                <option value="NoControl">NoControl</option>
                                <option value="nombre">Nombre</option>
                                <option value="ap_paterno">ap_Paterno</option>
                                <option value="ap_materno">ap_Materno</option>
                                <option value="especialidad">Especialidad</option>
                                <option value="curp">CURP</option>
                                <option value="generacion">Generación</option>
                                <option value="NSS">NSS</option>
                                <option value="estado">Estado</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="filtro_alumnos" class="form-label">Filtrar:</label>
                            <input type="text" class="form-control" id="filtro_alumno" placeholder="ingrese un filtro">
                        </div>

                    </div>

                    <div class="container-tabla_alumnos table-responsive">

                        
                        <table class="table  table-striped table-sm table-hover">

                            <thead>

                                <tr>
                                    <th>NoControl</th>
                                    <th>Nombre</th>
                                    <th>ap_paterno</th>
                                    <th>ap_materno</th>
                                    <th>especialidad</th>
                                    <th>CURP</th>
                                    <th>Generación</th>
                                    <th>NSS</th>
                                    <th>Estado</th>
                                </tr>
                                
                            </thead>
                            <tbody id="container_registros_alumnos" class="table-group-divider">

                                <?php
                                
                                    foreach($consulta->getAlumnosInfo() as $registro){

                                        ?>
                                        
                                            <tr class="Registro_alumno" id="<?php echo $registro['NoControl'] ?>" data-bs-toggle="modal" data-bs-target="#form-modificar_alumno-modal">
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['NoControl'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['nombre'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['ap_paterno'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['ap_materno'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['nombreEspecialidad'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['curp'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['generacion'] ?></td>
                                                <td id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['NSS'] ?></td>
                                                <td class="estado" id="<?php echo $registro['NoControl'] ?>"><?php echo $registro['estado'] ?></td>
                                            </tr> 

                                        <?php

                                    }

                                ?>

                                <tr id="insertAlumno">
                                    <th scope="row" data-bs-toggle="modal" data-bs-target="#form-insertar_alumno-modal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></th>
                                    <td colspan="8" class="table-active" data-bs-toggle="modal" data-bs-target="#form-insertar_alumno-modal">Insertar Nuevo Alumno</td>
                                </tr>
                                
                            </tbody>

                        </table>
                    
                    </div>
                </div>

                <?php
                
                    if ($_SESSION['rol'] == 1){

                        ?>
                        

                        
                            <hr/>
            
                            <div class="container-options_tabla_user">
            
                                <div class="container-filtro_user form">
            
                                    <h4>Usuarios</h4>
            
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="options-filtro_user">Filtros</label>
                                        <select class="form-select" id="options-filtro_user">
                                            <option selected></option>
                                                <option value="ID">ID</option>
                                                <option value="user">User</option>
                                                <option value="nombre">Nombre</option>
                                                <option value="ap_paterno">ap_Paterno</option>
                                                <option value="ap_materno">ap_Materno</option>
                                                <option value="mail">Mail</option>
                                                <option value="telefono">Telefono</option>
                                                <option value="nombreRol">Rol</option>
                                                <option value="estado">Estado</option>
                                        </select>
                                    </div>
            
                                    <div class="mb-3">
                                        <label for="filtro_user" class="form-label">Filtrar:</label>
                                        <input type="text" class="form-control" id="filtro_user" placeholder="ingrese un filtro">
                                    </div>
            
                                </div>
            
                                <div class="container-tabla_user table-responsive">
            
                                    
                                    <table class="table  table-striped table-sm table-hover">
            
                                        <thead>
            
                                            <tr>
                                                <th>ID</th>
                                                <th>User</th>
                                                <th>Nombre</th>
                                                <th>ap_Paterno</th>
                                                <th>ap_Materno</th>
                                                <th>Mail</th>
                                                <th>Telefono</th>
                                                <th>Rol</th>
                                                <th>Estado</th>
                                            </tr>
                                            
                                        </thead>
                                        <tbody id="container_registros_user" class="table-group-divider">
            
                                            <?php
                                            
                                                foreach($consulta->getUsersInfo($_SESSION['id']) as $registro){
            
                                                    ?>
            
                                                        <tr class="Registro_usuario" id="<?php echo $registro['ID'] ?>" data-bs-toggle="modal" data-bs-target="#form-modificar_usuario-modal">
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['ID'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['user'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['nombre'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['ap_paterno'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['ap_materno'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['mail'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['telefono'] ?></td>
                                                            <td id="<?php echo $registro['ID'] ?>"><?php echo $registro['nombreRol'] ?></td>
                                                            <td class="estado" id="<?php echo $registro['ID'] ?>"><?php echo $registro['estado'] ?></td>
                                                        </tr>
            
                                                    <?php
            
                                                }
                                        
                                            ?>
            
                                            <tr id="insertUser">
                                                <th scope="row" data-bs-toggle="modal" data-bs-target="#form-insertar_usuario-modal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></th>
                                                <td colspan="8" class="table-active" data-bs-toggle="modal" data-bs-target="#form-insertar_usuario-modal" >Insertar Nuevo Usuario</td>
                                            </tr>
                                            
                                        </tbody>
            
                                    </table>
                                
                                </div>
                            </div>
                        <?php
                        
                    }
                
                ?>

                <hr/>

                <div class="container-options-tabla_credenciales">

                    <div class="container-filtro_credenciales form">

                        <h4>Credenciales</h4>
            
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-filtro_credenciales">Filtros</label>
                                <select class="form-select" id="options-filtro_credenciales">
                                    <option selected></option>
                                        <option value="NoCredencial">NoCredencial</option>
                                        <option value="NoControl">NoControl</option>
                                        <option value="nombre">Nombre</option>
                                        <option value="ap_paterno">ap_paterno</option>
                                        <option value="ap_materno">ap_materno</option>
                                </select>
                            </div>
    
                            <div class="mb-3">
                                <label for="filtro_credencial" class="form-label">Filtrar:</label>
                                <input type="text" class="form-control" id="filtro_credencial" placeholder="ingrese un filtro">
                            </div>

                    </div>

                    <div class="container-tabla_credenciales table-responsive">

                        
                        <table class="table  table-striped table-sm table-hover">

                            <thead>

                                <tr>
                                    <th>NoCredencial</th>
                                    <th>NoControl</th>
                                    <th>Nombre</th>
                                    <th>ap_paterno</th>
                                    <th>ap_materno</th>
                                    <th>Eliminar</th>
                                </tr>
                                
                            </thead>
                            <tbody id="container_registros_credenciales" class="table-group-divider">

                                <?php
                                
                                    foreach($consulta->getCredenciaInfoTabla() as $registro){

                                        ?>
                                        
                                            <tr class="Registro_credencial" id="<?php echo $registro['NoCredencial'] ?>">
                                                <td id="<?php echo $registro['NoCredencial'] ?>"><?php echo $registro['NoCredencial'] ?></td>
                                                <td id="<?php echo $registro['NoCredencial'] ?>"><?php echo $registro['NoControl'] ?></td>
                                                <td id="<?php echo $registro['NoCredencial'] ?>"><?php echo $registro['nombre'] ?></td>
                                                <td id="<?php echo $registro['NoCredencial'] ?>"><?php echo $registro['ap_paterno'] ?></td>
                                                <td id="<?php echo $registro['NoCredencial'] ?>"><?php echo $registro['ap_materno'] ?></td>
                                                <td><svg xmlns="http://www.w3.org/2000/svg" id="<?php echo $registro['NoCredencial'] ?>" width="16" height="16" fill="currentColor" class="bi bi-trash-fill delete" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></td>                                                
                                            </tr> 

                                        <?php

                                    }

                                ?>
                                
                            </tbody>

                        </table>

                </div>

                <hr/>
                
                <div class="container-historiales">

                    <div class="container-historial_usuarios_publicos">

                        <div class="container-filtro_historial_publico form">

                            <h4>Historial Alumnos</h4>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-filtro_historial_publico">Filtros</label>
                                <select class="form-select" id="options-filtro_historial_publico">
                                    <option selected></option>
                                    <option value="NoRegistro">NoRegistro</option>
                                    <option value="Accion">Acción</option>
                                    <option value="alumno">Alumno</option>
                                    <option value="fecha">fecha</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="filtro_historial_publico" class="form-label">Filtrar:</label>
                                <input type="text" class="form-control" id="filtro_historial_publico" placeholder="ingrese un filtro">
                            </div>
                            
                        </div>

                        <div class="table-responsive">
                            <table class="table  table-striped table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th>NoRegistro</th>
                                        <th>acción</th>
                                        <th>alumno</th>
                                        <th>fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="container_historial_alumnos" class="table-group-divider">
                                
                                        <?php
                                        
                                            foreach($consulta->getHistorialAlumnos() as $registro){

                                                ?>
                                                
                                                    <tr>
                                                        <td><?php echo $registro['NoRegistro']; ?></td>
                                                        <td><?php echo $registro['accion']; ?></td>
                                                        <td><?php echo $registro['NoControl'] . '<br>' . $registro['nombre'] . ' ' . $registro['ap_paterno'] . ' ' . $registro['ap_materno']; ?></td>
                                                        <td><?php echo $registro['fecha']; ?></td>
                                                    </tr>
                                                
                                                <?php

                                            }

                                        ?>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <hr class="divTabla"/>
                    
                    <div class="container-historial_usuarios">
                        
                        <div class="container-filtro_historial_usuarios form">

                            <h4>Historial Usuarios</h4>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-filtro_historial_usuario">Filtros</label>
                                <select class="form-select" id="options-filtro_historial_usuario">
                                    <option selected></option>
                                    <option value="NoRegistro">NoRegistro</option>
                                    <option value="movimiento">Acción</option>
                                    <option value="usuario">Usuario</option>
                                    <option value="fecha">fecha</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="filtro_historial_usuario" class="form-label">Filtrar:</label>
                                <input type="text" class="form-control" id="filtro_historial_usuario" placeholder="ingrese un filtro">
                            </div>
                            
                        </div>
                        
                        <div class="table-responsive">
                            <table class="table  table-striped table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th>NoRegistro</th>
                                        <th>acción</th>
                                        <th>usuario</th>
                                        <th>fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="container_historial_users" class="table-group-divider">
                                    <?php
                                    
                                        foreach($consulta->getHistorialUsers() as $registro){
                                            
                                            ?>
                                            
                                                <tr>
                                                    <td><?php echo $registro['NoRegistro']; ?></td>
                                                    <td><?php echo $registro['movimiento']; ?></td>
                                                    <td><?php echo $registro['ID'] . '<br>' . $registro['user']; ?></td>
                                                    <td><?php echo $registro['fecha']; ?></td>
                                                </tr>
                                            
                                            <?php

                                        }
                                    
                                    ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="clear"></div>

                    <hr/>
                    
                </div>
                

            </div>
            
        </main>

        <footer>
            
            <div class="container-center">
                


            </div>

        </footer>

        <!-- Modal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="modal fade" id="form-modificar_usuario_sesion-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Modificar Datos</h1>
                    </div>
                    <div class="modal-body">

                        <form style="max-width: 450px" action="./registros" class="form-modificar_usuario_sesion" method="post">

                            <div class="mb-3">
                                <label for="user-session" class="form-label">Usuario:</label>
                                <input type="text" name="user-session" id="user-session" class="form-control is-valid" placeholder="Ingresa tu nombre de usuario" value="<?php echo $userInfo['user']; ?>">
                                <div class="invalid-feedback">
                                    Ingrese un usuario valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="nombre-session" class="form-label">Nombre:</label>
                                <input type="text" name="nombre-session" id="nombre-session" class="form-control is-valid" placeholder="Ingresa tu nombre" value="<?php echo $userInfo['nombre']; ?>">
                                <div class="invalid-feedback">
                                    Ingrese un nombre valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apP-session" class="form-label">Apellido paterno:</label>
                                <input type="text" name="apP-session" id="apP-session" class="form-control is-valid" placeholder="Ingresa tu apellido" value="<?php echo $userInfo['ap_paterno']; ?>">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apM-session" class="form-label">Apellido materno</label>
                                <input type="text" name="apM-session" id="apM-session" class="form-control is-valid" placeholder="Ingresa tu apellido" value="<?php echo $userInfo['ap_materno']; ?>">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="correo-session" class="form-label">Correo</label>
                                <input type="email" name="correo-session" id="correo-session" class="form-control is-valid" placeholder="Ingresa tu correo" value="<?php echo $userInfo['mail']; ?>">
                                <div class="invalid-feedback">
                                    Ingrese un correo valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="telefono-session" class="form-label">Telefono</label>
                                <input type="text" name="telefono-session" id="telefono-session" class="form-control is-valid" placeholder="Ingresa tu telefono" value="<?php echo $userInfo['telefono']; ?>">
                                <div class="invalid-feedback">
                                    Ingrese un telefono valido.
                                </div>
                            </div>

                        </form>
                        
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#form-modificar-password-modal">Cambiar contraseña</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" id="submit-modificar_usuario_session" class="btn btn-primary" disabled>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="modal fade" id="form-modificar-password-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Cambiar Contraseña</h1>
                    </div>
                    <div class="modal-body">

                        <form style="max-width: 450px" action="./" class="form-modificar-password" method="post">

                            <div class="mb-3">
                                <label for="cambiar-passA" class="form-label">Contraseña Actual</label>
                                <input type="text" name="cambiar-passA" id="cambiar-passA" class="form-control" placeholder="Ingresa tu contraseña actual">
                                <div class="invalid-feedback">
                                    contraseña invalida.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="cambiar-pass2" class="form-label">Nueva Contraseña</label>
                                <input type="text" name="cambiar-pass2" id="cambiar-pass2" class="form-control" placeholder="Ingresa tu nueva contraseña">
                                <div class="invalid-feedback">
                                    Ingrese una contraseña valida.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="cambiar-pass" class="form-label">Confirmar Contraseña</label>
                                <input type="text" name="cambiar-pass" id="cambiar-pass" class="form-control" placeholder="Confirma tu nueva contraseña">
                                <div class="invalid-feedback">
                                    La contraseña no coinside.
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#form-modificar_usuario_sesion-modal">Atras</button>
                        <button type="button" id="submitLogin" class="btn btn-primary" disabled>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="modal fade" id="form-insertar_usuario-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Insertar usuario</h1>
                    </div>
                    <div class="modal-body">

                        <form style="max-width: 450px" action="./" class="form-insertar_usuario" method="post">

                            <div class="mb-3">
                                <label for="usuario-insertar" class="form-label">Usuario:</label>
                                <input type="text" name="user-insertar" id="user-insertar" class="form-control" placeholder="Ingresar usuario">
                                <div class="invalid-feedback">
                                    Ingrese un usuario valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="nombre-insertar" class="form-label">Nombre:</label>
                                <input type="text" name="nombre-insertar" id="nombre-insertar" class="form-control" placeholder="Ingresar nombre">
                                <div class="invalid-feedback">
                                    Ingrese un nombre valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apP-insertar" class="form-label">Apellido paterno:</label>
                                <input type="text" name="apP-insertar" id="apP-insertar" class="form-control" placeholder="Ingresar apellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apM-insertar" class="form-label">Apellido materno</label>
                                <input type="text" name="apM-insertar" id="apM-insertar" class="form-control" placeholder="Ingresar apellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="correo-insertar" class="form-label">Correo</label>
                                <input type="email" name="correo-insertar" id="correo-insertar" class="form-control" placeholder="Ingresar correo">
                                <div class="invalid-feedback">
                                    Ingrese un correo valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="telefono-insertar" class="form-label">Telefono</label>
                                <input type="text" name="telefono-insertar" id="telefono-insertar" class="form-control" placeholder="Ingresar telefono">
                                <div class="invalid-feedback">
                                    Ingrese un telefono valido.
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-rol-insertar">Rol</label>
                                <select class="form-select" id="options-rol-insertar">
                                    <option value="1">admin</option>
                                    <option value="2" selected>moder</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="pass-insertar" class="form-label">Contraseña</label>
                                <input type="text" name="pass-insertar" id="pass-insertar" class="form-control" placeholder="Ingresar contraseña">
                                <div class="invalid-feedback">
                                    Ingrese una contraseña valida.
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close-modal-form_insertar_usuario" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" id="submit-form-insertar_usuario" class="btn btn-primary">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="modal fade" id="form-insertar_alumno-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Insertar alumno</h1>
                    </div>
                    <div class="modal-body">

                        <form style="max-width: 450px" action="./" class="form-insertar_alumno" method="post">

                            <div class="mb-3">
                                <label for="nombre-insertar_alumno" class="form-label">NoControl:</label>
                                <input type="text" name="NoControl-insertar_alumno" id="NoControl-insertar_alumno" class="form-control" placeholder="Ingresar numero de control">
                                <div class="invalid-feedback">
                                    Ingrese un numero de control valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="nombre-insertar_alumno" class="form-label">Nombre:</label>
                                <input type="text" name="nombre-insertar_alumno" id="nombre-insertar_alumno" class="form-control" placeholder="Ingresar nombre">
                                <div class="invalid-feedback">
                                    Ingrese un nombre valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apP-insertar_alumno" class="form-label">Apellido paterno:</label>
                                <input type="text" name="apP-insertar_alumno" id="apP-insertar_alumno" class="form-control" placeholder="Ingresar apellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apM-insertar_alumno" class="form-label">Apellido materno:</label>
                                <input type="text" name="apM-insertar_alumno" id="apM-insertar_alumno" class="form-control" placeholder="Ingresar pellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>
                            
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-ESP-insertar_alumno">Especialidad</label>
                                <select class="form-select" id="options-ESP-insertar_alumno">
                                    <option selected></option>
                                    <option value="1">Arquitectura</option>
                                    <option value="2">Logistica</option>
                                    <option value="3">Ofimatica</option>
                                    <option value="4">Preparación de Alimentos y Bebidas</option>
                                    <option value="5">Programación</option>
                                    <option value="6">Contabilidad</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="nombre-insertar_alumno" class="form-label">Curp:</label>
                                <input type="text" name="Curp-insertar_alumno" id="Curp-insertar_alumno" class="form-control" placeholder="Ingresar Curp">
                                <div class="invalid-feedback">
                                    Ingrese una Curp valida.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="generacion-insertar_alumno" class="form-label">Generación</label>
                                <input type="text" name="generacion-insertar_alumno" id="generacion-insertar_alumno" class="form-control" placeholder="ejemplo: 2000 - 2003">
                                <div class="invalid-feedback">
                                    Ingrese una generación valida.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="NSS-insertar_alumno" class="form-label">NSS</label>
                                <input type="email" name="NSS-insertar_alumno" id="NSS-insertar_alumno" class="form-control" placeholder="Ingresar numero de seguridad social">
                                <div class="invalid-feedback">
                                    Ingrese un NSS valido.
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close-form-insertar_alumno" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" id="submit-form-insertar_alumno" class="btn btn-primary" >Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="modal fade" id="form-modificar_usuario-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Modificar usuario</h1>
                    </div>
                    <div class="modal-body">

                        <form style="max-width: 450px" action="./" class="form-modificar_usuario" method="post">

                            <div class="mb-3">
                                <label for="usuario-modificar" class="form-label">Usuario:</label>
                                <input type="text" name="user-modificar" id="user-modificar" class="form-control" placeholder="Ingresar usuario">
                                <div class="invalid-feedback">
                                    Ingrese un usuario valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="nombre-modificar" class="form-label">Nombre:</label>
                                <input type="text" name="nombre-modificar" id="nombre-modificar" class="form-control" placeholder="Ingresar nombre">
                                <div class="invalid-feedback">
                                    Ingrese un nombre valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apP-modificar" class="form-label">Apellido paterno:</label>
                                <input type="text" name="apP-modificar" id="apP-modificar" class="form-control" placeholder="Ingresar apellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apM-modificar" class="form-label">Apellido materno</label>
                                <input type="text" name="apM-modificar" id="apM-modificar" class="form-control" placeholder="Ingresar apellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="correo-modificar" class="form-label">Correo</label>
                                <input type="email" name="correo-modificar" id="correo-modificar" class="form-control" placeholder="Ingresar correo">
                                <div class="invalid-feedback">
                                    Ingrese un correo valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="telefono-modificar" class="form-label">Telefono</label>
                                <input type="text" name="telefono-modificar" id="telefono-modificar" class="form-control" placeholder="Ingresar telefono">
                                <div class="invalid-feedback">
                                    Ingrese un telefono valido.
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-rol-modificar">Rol</label>
                                <select class="form-select" id="options-rol-modificar">
                                    <option value="1">admin</option>
                                    <option value="2">moder</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-estado-modificar">Estado</label>
                                <select class="form-select" id="options-estado-modificar">
                                    <option value="1">activo</option>
                                    <option value="0">inactivo</option>
                                </select>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" id="submit-form-modificar_usuario" class="btn btn-primary" disabled>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="modal fade" id="form-modificar_alumno-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Modificar alumno</h1>
                    </div>
                    <div class="modal-body">

                        <form style="max-width: 450px" action="./" class="form-modificar_alumno" method="post">

                            <div class="mb-3">
                                <label for="NoControl-modificar_alumno" class="form-label">NoControl:</label>
                                <input type="text" name="NoControl-modificar_alumno" id="NoControl-modificar_alumno" class="form-control" placeholder="Ingresar numero de control">
                                <div class="invalid-feedback">
                                    Ingrese un numero de control valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="nombre-modificar_alumno" class="form-label">Nombre:</label>
                                <input type="text" name="nombre-modificar_alumno" id="nombre-modificar_alumno" class="form-control" placeholder="Ingresar nombre">
                                <div class="invalid-feedback">
                                    Ingrese un nombre valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apP-modificar_alumno" class="form-label">Apellido paterno:</label>
                                <input type="text" name="apP-modificar_alumno" id="apP-modificar_alumno" class="form-control" placeholder="Ingresar apellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="apM-modificar_alumno" class="form-label">Apellido materno:</label>
                                <input type="text" name="apM-modificar_alumno" id="apM-modificar_alumno" class="form-control" placeholder="Ingresar pellido">
                                <div class="invalid-feedback">
                                    Ingrese un apellido valido.
                                </div>
                            </div>
                            
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-ESP-modificar_alumno">Especialidad</label>
                                <select class="form-select" id="options-ESP-modificar_alumno">
                                    <option id="Arquitectura-modificar_alumno"  value="1">Arquitectura</option>
                                    <option id="Logistica-modificar_alumno"     value="2">Logistica</option>
                                    <option id="Ofimatica-modificar_alumno"     value="3">Ofimatica</option>
                                    <option id="Preparacion-modificar_alumno"   value="4">Preparación de Alimentos y Bebidas</option>
                                    <option id="Programacion-modificar_alumno"  value="5">Programación</option>
                                    <option id="Contabilidad-modificar_alumno"  value="6">Contabilidad</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="curp-modificar_alumno" class="form-label">CURP:</label>
                                <input type="text" name="curp-modificar_alumno" id="curp-modificar_alumno" class="form-control" placeholder="Ingresar CURP">
                                <div class="invalid-feedback">
                                    Ingrese una CURP valida.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="generacion-modificar_alumno" class="form-label">Generación</label>
                                <input type="text" name="generacion-modificar_alumno" id="generacion-modificar_alumno" class="form-control" placeholder="ejemplo: 2000 - 2003">
                                <div class="invalid-feedback">
                                    Ingrese una generación valida.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="NSS-modificar_alumno" class="form-label">NSS</label>
                                <input type="email" name="NSS-modificar_alumno" id="NSS-modificar_alumno" class="form-control" placeholder="Ingresar numero de seguridad social">
                                <div class="invalid-feedback">
                                    Ingrese un NSS valido.
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <label class="input-group-text" for="options-estado-modificar_alumno">Estado</label>
                                <select class="form-select" id="options-estado-modificar_alumno">
                                    <option value="1">activo</option>
                                    <option value="0">inactivo</option>
                                </select>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close-form-modificar_alumno" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" id="submit-form-modificar_alumno" class="btn btn-primary" disabled>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
        <script>

            const datosUsuarioSession = {
                user: '<?php echo $userInfo['user']; ?>',
                nombre: '<?php echo $userInfo['nombre']; ?>',
                apP: '<?php echo $userInfo['ap_paterno']; ?>',
                apM: '<?php echo $userInfo['ap_materno']; ?>',
                correo: '<?php echo $userInfo['mail']; ?>',
                telefono: '<?php echo $userInfo['telefono']; ?>'
            }

            const user_session_id = <?php echo $_SESSION['id']; ?>;
            const rol = <?php echo $_SESSION['rol']; ?>

        </script>
        <script src="./js/jquery-3.6.1.min.js"></script>
        <script src="./js/js-bootstrap/bootstrap.min.js"></script>
        <script src="./js/registros.js"></script>
        <script>
            <?php
            
                if ($error){

                    ?>
                    
                        btn_settings.click();

                        $('#user-session').val('<?php echo $_POST['user-session']; ?>');
                        $('#user-session + .invalid-feedback').html('Este nombre de usuario no esta disponible');

                        setTimeout(() => {
                            $('#user-session + .invalid-feedback').html('Ingrese un usuario valido.');
                        }, 2000);
                    
                    <?php

                }

            ?>
        </script>

    </body>
</html>