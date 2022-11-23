<?php

    session_start();
    date_default_timezone_set("America/Mexico_City");
    include_once '../db/user_session.php';
    include_once '../db/queries.php';
    $consulta = new consultas();
    $userSession = new UserSession();
    $user_active = false;
    if (isset($_SESSION['id']) and isset($_SESSION['user']) and isset($_SESSION['rol'])){
        if ($consulta->confirmarUserById($_SESSION['id'])){
            $userInfo = $consulta->getUserInfo($_SESSION['id']);
            if ($userInfo['estado'] == 0){
                $userSession->closeSession();
                $user_active = false;
            }else if ($userInfo['rol'] == 'moder'){
                $_SESSION['rol'] = 2;
                $_SESSION['user'] = $userInfo['user'];
                $user_active = true;
            }else if ($userInfo['rol'] == 'admin'){
                $_SESSION['rol'] = 1;
                $_SESSION['user'] = $userInfo['user'];
                $user_active = true;
            }else{
                $userSession->closeSession();
                $user_active = false;
            }
            
        }else{
            $userSession->closeSession();
            $user_active = false;
        }
    }else{
        $user_active = false;
    }
    
    
    if (isset($_FILES['imagen']) and isset($_POST['generator-NoControl']) and isset($_POST['generator-CURP'])){
        generearCredencial($user_active ,$consulta);
    }

    if (isset($_POST['consulta-NoControl']) and isset($_POST['consulta-CURP'])){
        consultarCredencial($user_active ,$consulta, $_POST['consulta-NoControl'], $_POST['consulta-CURP']);
    }

    function consultarCredencial($user_active ,$consulta, $NoControl, $curp){
        if (!$consulta->confirmAlumno($NoControl, $curp)){
            echo'<script>
            alert("No estas registrado en la base de datos");
            
            window.location = "../";
            </script>';
        }else{
            
            $datos = $consulta->getAlumnoInfo($NoControl);
            
            if ($datos['estado'] == 0){
                if ($user_active){
                    $consulta->setHistorialUsuario('Intento consultar la credencial de ' . $datos['nombre'] .' '. $datos['ap_paterno'] .' '. $datos['ap_materno'] .' '. $datos['NoControl'] . ', El cual esta dado de baja.', $_SESSION['id'], date('d/m/Y, h:i:s'));
                }else{
                    $consulta->setHistorialPublic('Intento consultar su credencial, El cual esta dado de baja.', $datos['NoControl'], date('d/m/Y, h:i:s'));
                }
                echo'<script>
                alert("Estas dado de baja por lo cual no puedes consultar tu credencial");
                
                window.location = "../";
                </script>';
            }else{

                if ($consulta->confirmImagenUser($NoControl)){
        
                    $credencial = $consulta->getCredencialInfo($NoControl);
        
                    generarPDF($credencial['imagen'], $credencial['NoCredencial'], $datos);

                    if ($user_active){
                        $consulta->setHistorialUsuario('Consulto la credencial de '. $datos['nombre'] .' '. $datos['ap_paterno'] .' '. $datos['ap_materno'] .' '. $datos['NoControl'], $_SESSION['id'], date('d/m/Y, h:i:s'));
                    }else{
                        $consulta->setHistorialPublic('Consulto su credencial.', $datos['NoControl'],  date('d/m/Y, h:i:s'));
                    }
                }else{
                    if ($user_active){
                        $consulta->setHistorialUsuario('Intento consultar la credencial de '. $datos['nombre'] .' '. $datos['ap_paterno'] .' '. $datos['ap_materno'] .' '. $datos['NoControl'] .', La cual no ha sido generada.', $_SESSION['id'], date('d/m/Y, h:i:s'));
                    }else{
                        $consulta->setHistorialPublic('Intento consultar su credencial, La cual no ha sido generada.', $datos['NoControl'], date('d/m/Y, h:i:s'));
                    }
                    echo'<script>
                    alert("Tu credencial todavía no ha sido generada");
                    
                    window.location = "../";
                    </script>';
                }

            }
    
        }
        

    }

    function generearCredencial($user_active ,$consulta){
        $size = $_FILES['imagen']['size'];

        if ($size <= 5242880){
            
            if (!$consulta->confirmAlumno($_POST['generator-NoControl'], $_POST['generator-CURP'])){
                echo'<script>
                alert("No estas registrado en la base de datos");
                
                window.location = "../";
                </script>';
            }else{

                $datos = $consulta->getAlumnoInfo($_POST['generator-NoControl']);
                
                if ($datos['estado'] == 0){
                    if ($user_active){
                        $consulta->setHistorialUsuario('Intento generar la credencial de ' . $datos['nombre'] .' '. $datos['ap_paterno'] .' '. $datos['ap_materno'] .' '. $datos['NoControl'] . ', El cual esta dado de baja.', $_SESSION['id'], date('d/m/Y, h:i:s'));
                    }else{
                        $consulta->setHistorialPublic('Intento generar su credencial, El cual esta dado de baja.', $datos['NoControl'], date('d/m/Y, h:i:s'));
                    }
                    echo'<script>
                    alert("Estas dado de baja por lo cual no puedes generar tu credencial");
                    
                    window.location = "../";
                    </script>';
                }else{

                    if ($consulta->confirmImagenUser($_POST['generator-NoControl'])){
                        if ($user_active){
                            $consulta->setHistorialUsuario('Intento volver ha generar la credencial de '. $datos['nombre'] .' '. $datos['ap_paterno'] .' '. $datos['ap_materno'] .' '. $datos['NoControl'] .', La cual ya ha sido generada.', $_SESSION['id'], date('d/m/Y, h:i:s'));
                        }else{
                            $consulta->setHistorialPublic('Intento volver ha generar su credencial, La cual ya ha sido generada.', $datos['NoControl'], date('d/m/Y, h:i:s'));
                        }
                        echo '
                        <script>
                        
                        alert("Tu credencial ya avía sido generada antes por lo cual no se ha generado ningun cambio.");
                        alert("Si quieres cambiar la imagen o datos de tu credencial, pide ayuda a un docente para que te ayude.");
                        
                        window.location = "../";
                        </script>';
                    }else{
        
                        do{
                        $nameRandom = substr( md5(microtime()), 1 , 15); // generamos nombre aleatorio
                        $explode = explode('.', $_FILES['imagen']['name']); // sacamos el nombre con extencion
                        $extencion = array_pop($explode); // sacamos extencion
            
                        $newName = $nameRandom . '.' . $extencion; // agregamos el nuevo nombre con la extencion optenida
            
                        $nameFull = './' . $newName; // agregamos la dirección completa con el nuevo nombre
                        }while($consulta->confirmNameImagen($nameFull));
                        
                        do{
                            $NoCredencial = '';
                            for($i=0; $i<10;$i++){
                                $NoCredencial .= substr('ABC0123456789DFGHIJK0123456789LMNOPQRSTUV0123456789WXYZ0123456789', rand(0,65), 1);
                            }
                        }while($consulta->confirmCredencialID($NoCredencial));
            
                        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $nameFull)){  // subimos el archivo con el nuevo nombre                   
            
                            $consulta->setCredencial($NoCredencial,$_POST['generator-NoControl'], $nameFull);
                        
                        }
                        
                        generarPDF($nameFull, $NoCredencial, $datos);

                        if ($user_active){
                            $consulta->setHistorialUsuario('Genero la credencial de '. $datos['nombre'] .' '. $datos['ap_paterno'] .' '. $datos['ap_materno'] .' '. $datos['NoControl'], $_SESSION['id'], date('d/m/Y, h:i:s'));
                        }else{
                            $consulta->setHistorialPublic('Genero su credencial.', $datos['NoControl'], date('d/m/Y, h:i:s'));
                        }
                
                    }

                }
    
            }

        }else{
            echo'<script>
            alert("La imagen que has proporcionado pesa mas de 5MB");
            
            window.location = "../";
            </script>';
        }
    }

    function generarPDF($nameFull, $NoCredencial, $datos){
            include_once '../fpdf184/fpdf.php';
            
            $pdf = new FPDF('P', 'cm', array(5.5,8.5));
            $pdf->AddPage(); // Agregamos una pagina
            $pdf->Image('../img/aguila_transparente.png',0,0,5.5);
            $pdf->Image('../img/Fondo_targeta.png',0,0,5.5);

            $pdf->Image('../img/Logo_cetis_transparent.png',0.1,0.1,2);
            
            $pdf->SetFont('Arial','B',3.5);
            $pdf->SetTextColor(167, 32, 31);
            $pdf->Text(2.8,0.4,utf8_decode('DIRECCIÓN GENERAL DE EDUCACIÓN'));
            $pdf->Text(3.5,0.53,utf8_decode('TECNOLÓGICA INDUSTRIAL'));
            
            $pdf->SetFont('Arial','B',9);
            $pdf->Text(3.7,0.8,utf8_decode('CETIS 84'));
            
            $pdf->SetFont('Arial','',9);
            $pdf->SetTextColor(0, 0, 0);
            $pdf->Text(3.4,1.5,utf8_decode($NoCredencial)); // No.Credencial
            
            $pdf->Text(0.3,3.3,utf8_decode($datos['ap_paterno'])); // nombre
            $pdf->Text(0.3,3.7,utf8_decode($datos['ap_materno'])); // apellidos
            $pdf->Text(0.3,4.1,utf8_decode($datos['nombre']));

            $pdf->SetFont('Arial','',8);
            $pdf->Text(0.1,5,utf8_decode($datos['NoControl'])); // NO.Control
            
            $pdf->SetFont('Arial','',8);
            $pdf->Text(0.1,5.6,utf8_decode($datos['ESP'])); // Especialidad
            $pdf->Text(0.1,6,utf8_decode('NSS:' . $datos['NSS'])); // Numero de seguridad social
            $pdf->Text(0.1,6.4,utf8_decode($datos['curp'])); // CURP

            $pdf->SetFont('Arial','',5);
            $pdf->Text(0.2,6.9,utf8_decode($datos['generacion'] . ' - vigencia')); // generación
            
            $pdf->Image($nameFull,2.65,2.5,2.6); // Foto Retrato en tamaño infantil
            
            

            $pdf->AddPage(); // Agregamos una pagina
            
            $pdf->SetFont('Times','B',18);
            $pdf->SetTextColor(167, 32, 31);
            $pdf->Text(0.9,1.1,utf8_decode('EDUCACIÓN'));
            
            $pdf->SetTextColor(180, 173, 84);
            $pdf->SetFont('Arial','B',4.5);
            $pdf->Text(1.3,1.4,utf8_decode('SECRETARIA DE EDUCACIÓN PUBLICA'));
            
            $pdf->Image('../img/aguilaColor.png',2.3,1.7,1.2);
            
            $pdf->SetFont('Arial','B',9);
            $pdf->Text(2,3.5,utf8_decode('AUTORIZA:'));
            
            $pdf->Image('../img/firma.png',0,0,5.5);
            
            $pdf->SetFont('Arial','B',7);
            $pdf->SetTextColor(124, 149, 186);
            $pdf->Text(0.5,6.8,utf8_decode('LIC. DANIEL ANDRÉS OSORIO FLORES'));
            
            $pdf->SetTextColor(180, 173, 84);
            $pdf->Text(2.2,7.2,utf8_decode('DIRECTOR'));
            
            
            $pdf->SetFont('Arial','B',6);
            $pdf->SetTextColor(0, 0, 0);
            $pdf->Text(0.2,8,utf8_decode('Concha Nacar 148, La Joya ll, 28869 Manzanillo, Col.'));
            $pdf->Text(1.8,8.3,utf8_decode('Telefono: 314 332 3400'));
            
            $pdf->Output(); // Cierra y muestra el documento
    }
?>