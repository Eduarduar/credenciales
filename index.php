<?php

    session_start();
    date_default_timezone_set("America/Mexico_City");
    include_once './db/queries.php';
    $consulta = new consultas();

    $moder = false;
    $errorLogin = false;

    if (isset($_POST['user']) and isset($_POST['pass'])){
        $login = $consulta->Login($_POST['user'], $_POST['pass']);
        if ($login != false){
            $_SESSION['id'] = $login['id'];
            $_SESSION['user'] = $login['user'];
            $_SESSION['rol'] = $login['rol'];
        }else{
            $errorLogin = true;
        }
    }

    if(isset($_SESSION['id']) and isset($_SESSION['user']) and isset($_SESSION['rol'])){
        if ($_SESSION['rol'] != 2 and $_SESSION['rol'] != 1){
            header('location: ./db/logout');
        }
        $moder = true;
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
        <link rel="stylesheet" href="./css/index.css">
        <title>Credenciales</title>
    </head>
    <body class="lightMode">

        <header>

            <div class="container-center">

                <div class="container-logoCetis84">

                    <img src="./img/Logo_cetis_transparent.png" alt="Logo del cetis 84">

                </div>

                <div class="conatiner-title-header">

                    <h2>CETIs 84</h1>

                </div>

                <?php
                
                    if ($moder){
                        ?>

                            <div class="container-button_confi">
                    
                                <button type="button" class="btn btn-dark">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
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

                        <?php
                    }else{

                        ?>
                        
                            <div class="container-button_login">

                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#formLogin-modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg>
                                </button>

                            </div>
                        
                        <?php

                    }

                ?>



            </div>

        </header>

        <main>  

            <div class="container-center">

                <div class="container-titlePrincipal">

                    <h1>
                        Consulta tu credencial escolar 
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                    </h1>

                </div>

                <div class="container-buttons">

                    <div class="container-button_CC hide">

                        <button type="button" id="CC" class="btn btn-success">Consulta tu credencial</button>

                    </div>

                    <div class="container-button_GC">

                        <button type="button" id="GC" class="btn btn-secondary">Generar tu credencial</button>

                    </div>
                    <div class="container-switch">
                        <button class="switch" id="switch">
                            <span><i class="fas fa-sun"></i></span>
                            <span><i class="fas fa-moon"></i></span>
                        </button>
                    </div>

                </div>

                <hr></hr>

                <div class="container-form_consulta">

                    <form action="" class="form_consulta">

                        <h2>Consulta</h2>

                        
                        <div class="mb-3">
                            <label for="consulta-NoContol" class="form-label">Numero de control:</label>
                            <input type="text" class="form-control" name="consulta-NoControl" id="consulta-NoControl" placeholder="Ingresa tu numero de control">
                            <div class="invalid-feedback">
                                Ingrese un Numero de control valido.
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="consulta-CURP" class="form-label">CURP:</label>
                            <input type="text" class="form-control" name="consulta-CURP" id="consulta-CURP" placeholder="Ingresa tu CURP">
                            <div class="invalid-feedback">
                                Ingrese una CURP valida.
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <button type="button" class="btn btn-outline-danger">Confirmar</button>
                        </div>

                        <hr/>
                        
                    </form>

                </div>

                <div class="container-form_generar hide">

                    <form action="./credenciales/" enctype="multipart/form-data" method="POST" class="form_generar">

                        <h2>Generar</h2>

                        
                        <div class="mb-3">
                            <label for="imagen" class="form-label">Foto:</label>
                            <input class="form-control" type="file" id="imagen" name="imagen">
                            <div class="invalid-feedback">
                                Ingrese una imagen valida.
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="generator-NoContol" class="form-label">Numero de control:</label>
                            <input type="text" class="form-control" name="generator-NoControl" id="generator-NoControl" placeholder="Ingresa tu numero de control">
                            <div class="invalid-feedback">
                                Ingrese un Numero de control valido.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="generator-CURP" class="form-label">CURP:</label>
                            <input type="text" class="form-control" id="generator-CURP" name="generator-CURP" placeholder="Ingresa tu CURP">
                            <div class="invalid-feedback">
                                Ingrese una CURP valida.
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <button type="button" id="btnGenerar" class="btn btn-outline-danger">Confirmar</button>
                        </div>
                        
                        <hr/>

                    </form>

                </div>

            </div>

            <!---------------------------------------------------------------------- Ventanas modales  --------------------------------------------------------------------->

                    <?php

                        if (!$moder){

                            ?>
                            
                                <!-- Modal -->
                                <div class="modal fade" id="formLogin-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5">Iniciar Sesión</h1>
                                            </div>
                                            <div class="modal-body">
                                                
                                                <?php
                                                
                                                    if ($errorLogin){
                                                        ?>
                                                        
                                                            <h6 id="errorLogin">Usuario o contraseña no son validos.</h6>
                                                        
                                                        <?php
                                                    }
                                                
                                                ?>

                                                <form style="max-width: 450px" action="./" class="form-login" method="post">

                                                    <div class="mb-3">
                                                        <label for="generator-NoContol" class="form-label">Usuario:</label>
                                                        <input type="text" name="user" id="user" class="form-control" placeholder="Ingresa tu nombre de usuario">
                                                        <div class="invalid-feedback">
                                                            Ingrese un usuario valido.
                                                        </div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="generator-CURP" class="form-label">Contraseña:</label>
                                                        <input type="text" name="pass" id="pass" class="form-control" placeholder="Ingresa tu contraseña">
                                                        <div class="invalid-feedback">
                                                            Ingrese una contraseña valida.
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" id="submitLogin" class="btn btn-primary">Confirmar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            <?php

                        }
                    
                    ?>

            <!--------------------------------------------------------------------------------------------------------------------------------------------------------------------------->




        </main>

        <footer>
            
            <div class="container-center">

            </div>

        </footer>

        <script src="./js/js-bootstrap/bootstrap.min.js"></script>
        <script src="./js/index.js"></script>
        <script>

            <?php
            
                if ($errorLogin){
                    ?>
                        btn_mostrar_form_login.click();
                        let msgErrorLogin = document.querySelector('#errorLogin');
                        setTimeout(() => {
                            msgErrorLogin.parentNode.removeChild(msgErrorLogin);
                        }, 2000);
                    
                    <?php
                }
            
            ?>
        </script>
        
    </body>
</html>