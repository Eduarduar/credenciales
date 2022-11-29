// buttons ---------------------------------------------------------------------------
const btn_logout_session = document.querySelector('.container-button_logout button');
const btn_back = document.querySelector('.container-button_back button');
const btn_settings = document.querySelector('.container-button_confi button');

const buttons_Usuarios = document.querySelectorAll('.Registro_usuario');
const buttons_Alumnos = document.querySelectorAll('.Registro_alumno');

const btnSwitch = document.querySelector('#switch');

const buttons_delete = document.querySelectorAll('.delete')

const btnInsertUsuario = document.querySelector('#submit-form-insertar_usuario');

const btnUpdateUsuarioSession = document.querySelector('#submit-modificar_usuario_session');
const btnInsertAlumno = document.querySelector('#submit-form-insertar_alumno');
const btnUpdateAlumno = document.querySelector('#submit-form-modificar_alumno');
const btnUpdateUser = document.querySelector('#submit-form-modificar_usuario');
const btnChangePassword = document.querySelector('#submit-form_changePasword');
// -----------------------------------------------------------------------------------

// inputs ----------------------------------------------------------------------------
const input_select_filtro_alumnos = document.querySelector('#options-filtro_alumnos');
const input_filtro_alumnos = document.querySelector('#filtro_alumno');

const input_select_filtro_users = document.querySelector('#options-filtro_user');
const input_filtro_users = document.querySelector('#filtro_user');

const input_select_filtro_historial_alumnos = document.querySelector('#options-filtro_historial_publico');
const input_filtro_historial_alumnos = document.querySelector('#filtro_historial_publico');

const input_select_filtro_historial_users = document.querySelector('#options-filtro_historial_usuario');
const input_filtro_historial_users = document.querySelector('#filtro_historial_usuario');

const input_select_filtro_credenciales = document.querySelector('#options-filtro_credenciales');
const input_filtro_credenciales = document.querySelector('#filtro_credencial');

const input_select_esp_modificar_alumno = document.querySelector('#options-ESP-modificar_alumno');
const input_select_estado_modificar_alumno = document.querySelector('#options-estado-modificar_alumno');

const input_select_rol_modificar_user = document.querySelector('#options-rol-modificar');
const input_select_estado_modificar_user = document.querySelector('#options-estado-modificar');
// -----------------------------------------------------------------------------------

// Variables -------------------------------------------------------------------------
// clases para guardar temporalmente los datos antes de ser modificados
const datosUpdateAlumno = { 
    NoControl: '',
    nombre: '',
    apP: '',
    apM: '',
    esp: '',
    curp: '',
    generacion: '',
    nss: '',
    estado: ''
}

const datosUpdateUser = {
    id: '',
    user: '',
    nombre: '',
    apP: '',
    apM: '',
    correo: '',
    telefono: '',
    rol: '',
    estado: ''
}

// obtenemos los todos los inputs en la pagina para validarlos
const inputs = document.querySelectorAll('form input');

const formUpdateUsuarioSession = document.querySelector('.form-modificar_usuario_sesion');
const formUpdateAlumno = document.querySelector('.form-modificar_alumno');
const formUpdateUser = document.querySelector('#form-modificar_usuario');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{5,25}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/,
	password: /^.{0}\w{8,20}$/,  // 8 a 20 digitos.
    passwordS: /^.{0}\w{1,20}$/, // 1 a 20 digitos
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    NoControl: /^\d{14}$/,
    telefono: /^\d{10}$/,
    CURP: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,
    generacion: /^[0-9]{4}\s[\-]{1}\s[0-9]{4}$/,
    nss: /^\d{10}$/
}

const insertUsuario = { // formulario insertar usuario
    nombre: false,
    apellido_p: false,
    apellido_m: false,
    correo: false,
    telefono: false,
    pass: false
}

const updateUsuarioSession = { // formulario modificar datos del usuario actual
    user: true,
    nombre: true,
    apP: true,
    apM: true,
    correo: true,
    telefono: true
}

const insertAlumno = { // formulario insertar alumno
    nombre: false,
    apP: false,
    apM: false,
    esp: false,
    gncion: false,
    nss: false,
    NoControl: false,
    curp: false
}

const updateAlumno = { // formulario modificar datos de alumno
    NoControl: false,
    nombre: false,
    apP: false,
    apM: false,
    esp: false,
    curp: false,
    generacion: false,
    nss: false,
    estado: false
}

const updateUser = { // formulario modificar datos usuario
    user: false,
    nombre: false,
    apP: false,
    apM: false,
    correo: false,
    telefono: false,
    rol: false,
    estado: false
}

const changePassword = {
    passA: false,
    passN: false,
    passC: false
}

// -----------------------------------------------------------------------------------


// table -----------------------------------------------------------------------------
const tablas = document.querySelectorAll('.table-responsive table');
// -----------------------------------------------------------------------------------

// funciones -------------------------------------------------------------------------
btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('lightMode');
	btnSwitch.classList.toggle('active');
    tablas.forEach((e) => {
        e.classList.toggle('table-dark');
    });
	if(document.body.classList.contains('lightMode')){
		localStorage.setItem('dark-mode', 'false');
	} else {
		localStorage.setItem('dark-mode', 'true');
	}
});

const updateForm_modificar_usuario = function (e){
    if (rol == 1){
        let id_consultar_usuario = e.target.id;
        $.ajax({
            url:'./db/queries.php',
            type: 'POST',
            data: {id_consultar_usuario: id_consultar_usuario},
            success: function (respuesta) {
                let request = JSON.parse(respuesta);
                // reiniciamos los selects
                $("#options-rol-modificar option[value=1]").attr("selected",false);
                $("#options-rol-modificar option[value=2]").attr("selected",false);
                $("#options-estado-modificar option[value=1]").attr("selected",false);
                $("#options-estado-modificar option[value=0]").attr("selected",false);
                // validamos que los valores de los campos
                updateUser.user     = validarCampo(expresiones.usuario  , request.user      , $('#user-modificar').attr('id')       );
                updateUser.nombre   = validarCampo(expresiones.nombre   , request.nombre    , $('#nombre-modificar').attr('id')     );
                updateUser.apP      = validarCampo(expresiones.nombre   , request.ap_paterno, $('#apP-modificar').attr('id')        );
                updateUser.apM      = validarCampo(expresiones.nombre   , request.ap_materno, $('#apM-modificar').attr('id')        );
                updateUser.correo   = validarCampo(expresiones.correo   , request.mail      , $('#correo-modificar').attr('id')     );
                updateUser.telefono = validarCampo(expresiones.telefono , request.telefono  , $('#telefono-modificar').attr('id')   );
                // guardamos los datos para verificar los cambios
                datosUpdateUser.id      = request.id
                datosUpdateUser.user    = request.user;
                datosUpdateUser.nombre  = request.nombre;
                datosUpdateUser.apP     = request.ap_paterno;
                datosUpdateUser.apM     = request.ap_materno;
                datosUpdateUser.correo  = request.mail;
                datosUpdateUser.telefono= request.telefono;
                datosUpdateUser.rol     = request.ROL;
                datosUpdateUser.estado  = request.estado;
                // insertamos los datos en los campos correspondientes
                $('#user-modificar').val(request.user);
                $('#nombre-modificar').val(request.nombre);
                $('#apP-modificar').val(request.ap_paterno);
                $('#apM-modificar').val(request.ap_materno);
                $('#correo-modificar').val(request.mail);
                $('#telefono-modificar').val(request.telefono);
                // seleccionamos la opcion segun el valor que tenemos
                if (request.rol == 'admin'){  
                    $("#options-rol-modificar").html('');
                    $("#options-rol-modificar").html('<option value="1" selected>admin</option><option value="2">moder</option>');
                }else{
                    $("#options-rol-modificar").html('');
                    $("#options-rol-modificar").html('<option value="1">admin</option><option value="2" selected>moder</option>');
                }
                if(request.estado == 1){
                    $('#options-estado-modificar').html('');
                    $('#options-estado-modificar').html('<option value="1" selected>activo  </option><option value="0">inactivo</option>');
                }else{
                    $('#options-estado-modificar').html('');
                    $('#options-estado-modificar').html('<option value="1">activo  </option><option value="0" selected>inactivo</option>');
                }
                $("#options-estado-modificar option[value="+ request.estado +"]").attr("selected",true);
            }
        });
    }
}

const updateForm_modificar_alumno = function (e){
    let NoControl_consultar_alumno = e.target.id;
    $.ajax({
        url:'./db/queries.php',
        type: 'POST',
        data: {NoControl_consultar_alumno: NoControl_consultar_alumno},
        success: function (respuesta) {
            let request = JSON.parse(respuesta);
            // reiniciamos todos los opciones del select
            $("#options-ESP-modificar_alumno option[value=1]").attr(    "selected",false);
            $("#options-ESP-modificar_alumno option[value=2]").attr(    "selected",false);
            $("#options-ESP-modificar_alumno option[value=3]").attr(    "selected",false);
            $("#options-ESP-modificar_alumno option[value=4]").attr(    "selected",false);
            $("#options-ESP-modificar_alumno option[value=5]").attr(    "selected",false);
            $("#options-ESP-modificar_alumno option[value=6]").attr(    "selected",false);
            $("#options-estado-modificar_alumno option[value=1]").attr( "selected",false);
            $("#options-estado-modificar_alumno option[value=0]").attr( "selected",false);
            // validamos los valores de los campos
            updateAlumno.NoControl  = validarCampo( expresiones.NoControl,  request.NoControl,  $('#NoControl-modificar_alumno'   ).attr('id'));
            updateAlumno.nombre     = validarCampo( expresiones.nombre,     request.nombre,     $('#nombre-modificar_alumno'      ).attr('id'));
            updateAlumno.apP        = validarCampo( expresiones.nombre,     request.ap_paterno, $('#apP-modificar_alumno'         ).attr('id'));
            updateAlumno.apM        = validarCampo( expresiones.nombre,     request.ap_materno, $('#apM-modificar_alumno'         ).attr('id'));
            updateAlumno.curp       = validarCampo( expresiones.CURP,       request.curp,       $('#curp-modificar_alumno'        ).attr('id'));
            updateAlumno.generacion = validarCampo( expresiones.generacion, request.generacion, $('#generacion-modificar_alumno'  ).attr('id'));
            updateAlumno.nss        = validarCampo( expresiones.nss,        request.NSS,        $('#NSS-modificar_alumno'         ).attr('id'));
            // guardamos los datos para comparar los cambios
            datosUpdateAlumno.NoControl     = request.NoControl ;
            datosUpdateAlumno.nombre        = request.nombre    ;
            datosUpdateAlumno.apP           = request.ap_paterno;
            datosUpdateAlumno.apM           = request.ap_materno;
            datosUpdateAlumno.esp           = request.esp       ;
            datosUpdateAlumno.curp          = request.curp      ;
            datosUpdateAlumno.generacion    = request.generacion;
            datosUpdateAlumno.nss           = request.NSS       ;
            datosUpdateAlumno.estado        = request.estado    ;
            // ponemos el valor correspondiente en cada campo
            $('#NoControl-modificar_alumno').val(   request.NoControl   ); 
            $('#nombre-modificar_alumno').val(      request.nombre      );
            $('#apP-modificar_alumno').val(         request.ap_paterno  );
            $('#apM-modificar_alumno').val(         request.ap_materno  );
            $('#curp-modificar_alumno').val(        request.curp        );
            $('#generacion-modificar_alumno').val(  request.generacion  );
            $('#NSS-modificar_alumno').val(         request.NSS         );
            switch (request.ESP){ // seleccionamos la opcion correspondiente de especialidad y estado
                case 'Arquitectura':
                    $("#options-ESP-modificar_alumno").html('');
                    $("#options-ESP-modificar_alumno").html('<option id="Arquitectura-modificar_alumno"  value="1" selected>Arquitectura</option><option id="Logistica-modificar_alumno"     value="2">Logistica</option><option id="Ofimatica-modificar_alumno"     value="3">Ofimatica</option><option id="Preparacion-modificar_alumno"   value="4">Preparación de Alimentos y Bebidas</option><option id="Programacion-modificar_alumno"  value="5">Programación</option><option id="Contabilidad-modificar_alumno"  value="6">Contabilidad</option>');
                break;
                case 'Logistica':
                    $("#options-ESP-modificar_alumno").html('');
                    $("#options-ESP-modificar_alumno").html('<option id="Arquitectura-modificar_alumno"  value="1">Arquitectura</option><option id="Logistica-modificar_alumno"     value="2" selected>Logistica</option><option id="Ofimatica-modificar_alumno"     value="3">Ofimatica</option><option id="Preparacion-modificar_alumno"   value="4">Preparación de Alimentos y Bebidas</option><option id="Programacion-modificar_alumno"  value="5">Programación</option><option id="Contabilidad-modificar_alumno"  value="6">Contabilidad</option>');
                break;
                case 'Ofimatica':
                    $("#options-ESP-modificar_alumno").html('');
                    $("#options-ESP-modificar_alumno").html('<option id="Arquitectura-modificar_alumno"  value="1">Arquitectura</option><option id="Logistica-modificar_alumno"     value="2">Logistica</option><option id="Ofimatica-modificar_alumno"     value="3" selected>Ofimatica</option><option id="Preparacion-modificar_alumno"   value="4">Preparación de Alimentos y Bebidas</option><option id="Programacion-modificar_alumno"  value="5">Programación</option><option id="Contabilidad-modificar_alumno"  value="6">Contabilidad</option>');
                break;
                case 'Preparación de Alimentos y Bebidas':
                    $("#options-ESP-modificar_alumno").html('');
                    $("#options-ESP-modificar_alumno").html('<option id="Arquitectura-modificar_alumno"  value="1">Arquitectura</option><option id="Logistica-modificar_alumno"     value="2">Logistica</option><option id="Ofimatica-modificar_alumno"     value="3">Ofimatica</option><option id="Preparacion-modificar_alumno"   value="4" selected>Preparación de Alimentos y Bebidas</option><option id="Programacion-modificar_alumno"  value="5">Programación</option><option id="Contabilidad-modificar_alumno"  value="6">Contabilidad</option>');
                break;
                case 'Programación':
                    $("#options-ESP-modificar_alumno").html('');
                    $("#options-ESP-modificar_alumno").html('<option id="Arquitectura-modificar_alumno"  value="1">Arquitectura</option><option id="Logistica-modificar_alumno"     value="2">Logistica</option><option id="Ofimatica-modificar_alumno"     value="3">Ofimatica</option><option id="Preparacion-modificar_alumno"   value="4">Preparación de Alimentos y Bebidas</option><option id="Programacion-modificar_alumno"  value="5" selected>Programación</option><option id="Contabilidad-modificar_alumno"  value="6">Contabilidad</option>');
                break;
                case 'Contabilidad':
                    $("#options-ESP-modificar_alumno").html('');
                    $("#options-ESP-modificar_alumno").html('<option id="Arquitectura-modificar_alumno"  value="1">Arquitectura</option><option id="Logistica-modificar_alumno"     value="2">Logistica</option><option id="Ofimatica-modificar_alumno"     value="3">Ofimatica</option><option id="Preparacion-modificar_alumno"   value="4">Preparación de Alimentos y Bebidas</option><option id="Programacion-modificar_alumno"  value="5">Programación</option><option id="Contabilidad-modificar_alumno"  value="6" selected>Contabilidad</option>');
                break;
            }
            if (request.estado == 1){
                $('#options-estado-modificar_alumno').html('');
                $('#options-estado-modificar_alumno').html('<option value="1" selected>activo</option><option value="0">inactivo</option>');
            }else{
                $('#options-estado-modificar_alumno').html('');
                $('#options-estado-modificar_alumno').html('<option value="1">activo</option><option value="0" selected>inactivo</option>');
            }
            $("#options-estado-modificar_alumno option[value="+ request.estado +"]").attr("selected",true);
        }
    });
}

const filtrar_tabla_user = function () {
    if (rol == 1){
        const filtro = '%' + input_filtro_users.value.replace(/\s+/g, ' ') + '%';
        let consulta_filtro_user;
        if (input_select_filtro_users.value == ''){    
            consulta_filtro_user = `SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE (usuarios.rol = roles.NoRol and usuarios.ID <> ${user_session_id}) and (roles.nombreRol LIKE'${filtro}' or usuarios.ID LIKE'${filtro}' or usuarios.user LIKE'${filtro}' or usuarios.nombre LIKE'${filtro}' or usuarios.ap_paterno LIKE'${filtro}' or usuarios.ap_materno LIKE'${filtro}' or usuarios.telefono LIKE'${filtro}' or usuarios.mail LIKE'${filtro}' or usuarios.estado LIKE'${filtro}');`;
        }else if (input_select_filtro_users.value == 'nombreRol'){
            consulta_filtro_user = `SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE usuarios.rol = roles.NoRol and usuarios.ID <> ${user_session_id} and roles.nombreRol LIKE'${filtro}';`;
        }else{
            consulta_filtro_user = `SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE usuarios.rol = roles.NoRol and usuarios.ID <> ${user_session_id} and usuarios.${input_select_filtro_users.value} LIKE'${filtro}';`;
        }
        $.ajax({
            url:'./db/queries.php',
            type: 'POST',
            data: {consulta_filtro_user: consulta_filtro_user},
            success: function (respuesta) {
                document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                    elemnt.removeEventListener('click', updateForm_modificar_usuario);
                });
                let request = JSON.parse(respuesta);
                $('#container_registros_user').html(request);
                document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                    elemnt.addEventListener('click', updateForm_modificar_usuario);
                });
            }
        });
    }
}
const filtrar_tabla_alumno = function () {
    const filtro = '%' + input_filtro_alumnos.value.replace(/\s+/g, ' ') + '%';
    let consulta_filtro_alumno = '';
    if (input_select_filtro_alumnos.value == ''){    
        consulta_filtro_alumno = `SELECT NoControl, nombre, ap_paterno, ap_materno, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE (alumnos.especialidad = especialidades.NoEspecialidad) and (especialidades.nombreEspecialidad LIKE'${filtro}' or alumnos.NoControl LIKE'${filtro}' or alumnos.nombre LIKE'${filtro}' or alumnos.ap_paterno LIKE'${filtro}' or alumnos.ap_materno LIKE'${filtro}' or alumnos.estado LIKE'${filtro}' or alumnos.curp LIKE'${filtro}' or alumnos.generacion LIKE'${filtro}' or alumnos.NSS LIKE'${filtro}');`;
    }else if (input_select_filtro_alumnos.value == 'especialidad'){
        consulta_filtro_alumno = `SELECT NoControl, nombre, ap_paterno, ap_materno, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE alumnos.especialidad = especialidades.NoEspecialidad and especialidades.nombreEspecialidad LIKE'${filtro}';`;
    }else{
        consulta_filtro_alumno = `SELECT NoControl, nombre, ap_paterno, ap_materno, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE alumnos.especialidad = especialidades.NoEspecialidad and alumnos.${input_select_filtro_alumnos.value} LIKE'${filtro}';`;
    }
    $.ajax({
        url:'./db/queries.php',
        type: 'POST',
        data: {consulta_filtro_alumno: consulta_filtro_alumno},
        success: function (respuesta) {
            document.querySelectorAll('.Registro_alumno').forEach((elemnt) => {
                elemnt.removeEventListener('click', updateForm_modificar_alumno);
            });
            let request = JSON.parse(respuesta);
            $('#container_registros_alumnos').html(request);
            document.querySelectorAll('.Registro_alumno').forEach((elemnt) => {
                elemnt.addEventListener('click', updateForm_modificar_alumno);
            });
        }
    });
}
const filtrar_tabla_historial_alumnos  = function (){
    const filtro = '%' + input_filtro_historial_alumnos.value.replace(/\s+/g, ' ') + '%';
    let consulta_filtro_historial_alumno = '';
    if (input_select_filtro_historial_alumnos.value == ''){    
        consulta_filtro_historial_alumno = `SELECT NoRegistro, accion, NoControl, nombre, ap_paterno, ap_materno, fecha FROM consultaspublic, alumnos WHERE (consultaspublic.usuario = alumnos.NoControl) AND (consultaspublic.NoRegistro LIKE'${filtro}' OR consultaspublic.accion LIKE'${filtro}' OR consultaspublic.fecha LIKE'${filtro}' OR alumnos.NoControl LIKE'${filtro}' OR alumnos.nombre LIKE'${filtro}' OR alumnos.ap_paterno LIKE'${filtro}' OR alumnos.ap_materno LIKE'${filtro}') ORDER BY consultaspublic.NoRegistro DESC;`;
    }else if (input_select_filtro_historial_alumnos.value == 'alumno'){
        consulta_filtro_historial_alumno = `SELECT NoRegistro, accion, NoControl, nombre, ap_paterno, ap_materno, fecha FROM consultaspublic, alumnos WHERE (consultaspublic.usuario = alumnos.NoControl) AND (alumnos.NoControl LIKE'${filtro}' OR alumnos.nombre LIKE'${filtro}' OR alumnos.ap_paterno LIKE'${filtro}' OR alumnos.ap_materno LIKE'${filtro}') ORDER BY consultaspublic.NoRegistro DESC;`;
    }else{
        consulta_filtro_historial_alumno = `SELECT NoRegistro, accion, NoControl, nombre, ap_paterno, ap_materno, fecha FROM consultaspublic, alumnos WHERE (consultaspublic.usuario = alumnos.NoControl) AND (consultaspublic.${input_select_filtro_historial_alumno.value} LIKE'${filtro}') ORDER BY consultaspublic.NoRegistro DESC;`;
    }
    $.ajax({
        url:'./db/queries.php',
        type: 'POST',
        data: {consulta_filtro_historial_alumno: consulta_filtro_historial_alumno},
        success: function (respuesta) {
            let request = JSON.parse(respuesta);
            $('#container_historial_alumnos').html(request);
        }
    });
}
const filtrar_tabla_historial_users = function (){
    const filtro = '%' + input_filtro_historial_users.value.replace(/\s+/g, ' ') + '%';
    let consulta_filtro_historial_users = '';
    if (input_select_filtro_historial_users.value == ''){    
        consulta_filtro_historial_users = `SELECT NoRegistro, movimiento, ID, user, fecha FROM movimientosuser, usuarios WHERE (movimientosuser.usuario = usuarios.ID) AND (movimientosuser.NoRegistro LIKE'${filtro}' OR movimientosuser.movimiento LIKE'${filtro}' OR movimientosuser.fecha LIKE'${filtro}' OR usuarios.ID LIKE'${filtro}' OR usuarios.user LIKE'${filtro}') ORDER BY movimientosuser.NoRegistro DESC;`;
    }else if (input_select_filtro_historial_users.value == 'usuario'){
        consulta_filtro_historial_users = `SELECT NoRegistro, movimiento, ID, user, fecha FROM movimientosuser, usuarios WHERE (movimientosuser.usuario = usuarios.ID) AND (usuarios.ID LIKE'${filtro}' OR usuarios.user LIKE'${filtro}') ORDER BY movimientosuser.NoRegistro DESC;`;
    }else{
        consulta_filtro_historial_users = `SELECT NoRegistro, movimiento, ID, user, fecha FROM movimientosuser, usuarios WHERE (movimientosuser.usuario = usuarios.ID) AND (movimientosuser.${input_select_filtro_historial_users.value} LIKE'${filtro}');`;
    }
    $.ajax({
        url:'./db/queries.php',
        type: 'POST',
        data: {consulta_filtro_historial_users: consulta_filtro_historial_users},
        success: function (respuesta) {
            let request = JSON.parse(respuesta);
            $('#container_historial_users').html(request);
        }
    });
}
const filtrar_tabla_credenciales = function (){
    const filtro = '%' + input_filtro_credenciales.value.replace(/\s+/g, ' ') + '%';
    let consulta_filtro_credenciales = '';
    if (input_select_filtro_credenciales.value == ''){    
        consulta_filtro_credenciales = `SELECT NoCredencial, NoControl, nombre, ap_paterno, ap_materno FROM credencial c INNER JOIN alumnos a WHERE (c.alumno = a.NoControl) AND (c.NoCredencial LIKE'${filtro}' OR a.NoControl LIKE'${filtro}' OR a.nombre LIKE'${filtro}' OR a.ap_paterno LIKE'${filtro}' OR a.ap_materno LIKE'${filtro}'); `;
    }else if (input_select_filtro_credenciales.value == 'NoCredencial'){
        consulta_filtro_credenciales = `SELECT NoCredencial, NoControl, nombre, ap_paterno, ap_materno FROM credencial c INNER JOIN alumnos a WHERE c.alumno = a.NoControl AND c.NoCredencial LIKE'${filtro}';`;
    }else{
        consulta_filtro_credenciales = `SELECT NoCredencial, NoControl, nombre, ap_paterno, ap_materno FROM credencial c INNER JOIN alumnos a WHERE (c.alumno = a.NoControl) AND (a.${input_select_filtro_credenciales.value} LIKE'${filtro}');`;
    }
    $.ajax({
        url:'./db/queries.php',
        type: 'POST',
        data: {consulta_filtro_credenciales: consulta_filtro_credenciales},
        success: function (respuesta) {
            let request = JSON.parse(respuesta);
            document.querySelectorAll('.delete').forEach((element) => {
                element.removeEventListener('click', deleteCredencial);
            });
            $('#container_registros_credenciales').html(request);
            document.querySelectorAll('.delete').forEach((element) => {
                element.addEventListener('click', deleteCredencial);
            });
        }
    });
}
const deleteCredencial = function (e){
    if (confirm('¿Seguro que quiere eliminar esta credencia?')){
        let td;
        let svg;
        let id;
        if(e.target.localName == 'path'){
            svg = e.target.parentNode;
            id = svg.id;
            td = svg.parentNode;
        }else{
            id = e.target.id;
            td = e.target.parentNode;
        }
        let tr = td.parentNode; 
        let tbody = tr.parentNode;
        tbody.removeChild(tr);
        $.ajax({
            url:'./db/queries.php',
            type: 'POST',
            data: {deleteCredencial: id, user: user_session_id, consulta_filtro_historial_users: "SELECT NoRegistro, movimiento, ID, user, fecha FROM movimientosuser, usuarios WHERE (movimientosuser.usuario = usuarios.ID) ORDER BY movimientosuser.NoRegistro DESC;"},
            success:  function (respuesta){
                let request = JSON.parse(respuesta);
                $('#container_historial_users').html(request);
            }
        });
    }
}

const validarForm = (e) => {
    switch (e.target.name) {
        case 'user-insertar':
            insertUsuario.user = validarCampo(expresiones.usuario, e.target.value, e.target.id);
        break;
        case 'nombre-insertar':
            insertUsuario.nombre = validarCampo(expresiones.nombre, e.target.value, e.target.id);
        break;
        case 'apP-insertar':
            insertUsuario.apellido_p = validarCampo(expresiones.nombre, e.target.value, e.target.id);
        break;
        case 'apM-insertar':
            insertUsuario.apellido_m = validarCampo(expresiones.nombre, e.target.value, e.target.id);
        break;
        case 'correo-insertar':
            insertUsuario.correo = validarCampo(expresiones.correo, e.target.value, e.target.id);
        break;
        case 'telefono-insertar':
            insertUsuario.telefono = validarCampo(expresiones.telefono, e.target.value, e.target.id);
        break;
        
        case 'pass-insertar':
            insertUsuario.pass = validarCampo(expresiones.password, e.target.value, e.target.id);
        break;

        case 'user-session':
            validarCambiosUsuarioSession();
        break;

        case 'nombre-session':
            validarCambiosUsuarioSession();
        break;

        case 'apP-session':
            validarCambiosUsuarioSession();
        break;

        case 'apM-session':
            validarCambiosUsuarioSession();
        break;

        case 'correo-session':
            validarCambiosUsuarioSession();
        break;

        case 'telefono-session':
            validarCambiosUsuarioSession();
        break;
        
        case 'nombre-insertar_alumno':
            insertAlumno.nombre = validarCampo(expresiones.nombre, e.target.value, e.target.id);
        break;

        case 'apP-insertar_alumno':
            insertAlumno.apP = validarCampo(expresiones.nombre, e.target.value, e.target.id);
        break;

        case 'apM-insertar_alumno':
            insertAlumno.apM = validarCampo(expresiones.nombre, e.target.value, e.target.id);
        break;

        case 'generacion-insertar_alumno':
            insertAlumno.gncion = validarCampo(expresiones.generacion, e.target.value, e.target.id);
        break;

        case 'NSS-insertar_alumno':
            insertAlumno.nss = validarCampo(expresiones.nss, e.target.value, e.target.id);
        break;

        case 'NoControl-insertar_alumno':
            insertAlumno.NoControl = validarCampo(expresiones.NoControl, e.target.value, e.target.id);
        break;

        case 'Curp-insertar_alumno':
            insertAlumno.curp = validarCampo(expresiones.CURP, e.target.value, e.target.id);
        break;

        case 'NoControl-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'nombre-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'apP-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'apM-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'curp-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'generacion-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'NSS-modificar_alumno':
            validarCambiosUpdateAlumno();
        break;

        case 'user-modificar':
            validarCambiosUpdateUser();
        break;

        case 'nombre-modificar':
            validarCambiosUpdateUser();
        break;

        case 'apP-modificar':
            validarCambiosUpdateUser();
        break;

        case 'apM-modificar':
            validarCambiosUpdateUser();
        break;

        case 'correo-modificar':
            validarCambiosUpdateUser();
        break;

        case 'telefono-modificar':
            validarCambiosUpdateUser();
        break;

        case 'cambiar-passA':
            changePassword.passA = validarCampo(expresiones.password, e.target.value, e.target.id);
        break;

        case 'cambiar-pass2':
            changePassword.passN = validarCampo(expresiones.password, e.target.value, e.target.id); 
            changePassword.passC = validarPassword(e.target.id.substring(0, e.target.id.length - 1));
        break;

        case 'cambiar-pass':
            changePassword.passC = validarPassword(e.target.id);
        break;
    }
}

const validarCambiosUpdateUser = function(){
    let user    = $('#user-modificar'           ),
    nombre      = $('#nombre-modificar'         ),
    apP         = $('#apP-modificar'            ),
    apM         = $('#apM-modificar'            ),
    correo      = $('#correo-modificar'         ),
    telefono    = $('#telefono-modificar'       ),
    rol         = $('#options-rol-modificar'    ).val(),
    estado      = $('#options-estado-modificar' ).val();
    
    updateUser.user     = validarCampo(expresiones.usuario  , user.val()    , user.attr('id')       );
    updateUser.nombre   = validarCampo(expresiones.nombre   , nombre.val()  , nombre.attr('id')     );
    updateUser.apP      = validarCampo(expresiones.nombre   , apP.val()     , apP.attr('id')        );
    updateUser.apM      = validarCampo(expresiones.nombre   , apM.val()     , apM.attr('id')        );
    updateUser.correo   = validarCampo(expresiones.correo   , correo.val()  , correo.attr('id')     );
    updateUser.telefono = validarCampo(expresiones.telefono , telefono.val(), telefono.attr('id')   );

    if (rol == 1 || rol == 2){
        updateUser.rol = true;
    }else{
        updateUser = false;
    }
    if (estado == 0 || estado == 1){
        updateUser.estado = true;
    }else{
        updateUser.estado = false;
    }

    if (user.val() !=  datosUpdateUser.user || nombre.val() != datosUpdateUser.nombre || apP.val() != datosUpdateUser.apP || apM.val() != datosUpdateUser.apM || correo.val() != datosUpdateUser.correo || telefono.val() != datosUpdateUser.telefono || rol != datosUpdateUser.rol || estado != datosUpdateUser.estado){
         if (updateUser.user && updateUser.nombre && updateUser.apP && updateUser.apM && updateUser.correo && updateUser.telefono && updateUser.rol && updateUser.estado){
            document.querySelector('#submit-form-modificar_usuario').removeAttribute('disabled');
            return true;
         }else{
            document.querySelector('#submit-form-modificar_usuario').setAttribute('disabled' , true);
            return false;
         }
    }else{
        document.querySelector('#submit-form-modificar_usuario').setAttribute('disabled' , true);
        return false;
    }
}

const validarCambiosUpdateAlumno = function(){
    let NoControl   = document.querySelector('#NoControl-modificar_alumno'),
    nombre          = document.querySelector('#nombre-modificar_alumno'),
    apP             = document.querySelector('#apP-modificar_alumno'),
    apM             = document.querySelector('#apM-modificar_alumno'),
    esp             = document.querySelector('#options-ESP-modificar_alumno'),
    curp            = document.querySelector('#curp-modificar_alumno'),
    generacion      = document.querySelector('#generacion-modificar_alumno'),
    nss             = document.querySelector('#NSS-modificar_alumno'),
    estado          = document.querySelector('#options-estado-modificar_alumno');

    updateAlumno.NoControl  = validarCampo(expresiones.NoControl,   NoControl.value,    NoControl.id    );
    updateAlumno.nombre     = validarCampo(expresiones.nombre,      nombre.value,       nombre.id       );
    updateAlumno.apP        = validarCampo(expresiones.nombre,      apP.value,          apP.id          );
    updateAlumno.apM        = validarCampo(expresiones.nombre,      apM.value,          apM.id          );
    updateAlumno.curp       = validarCampo(expresiones.CURP,        curp.value,         curp.id         );
    updateAlumno.generacion = validarCampo(expresiones.generacion,  generacion.value,   generacion.id   );
    updateAlumno.nss        = validarCampo(expresiones.nss,         nss.value,          nss.id          ); 

    if (estado.value == 0 || estado.value == 1){
        updateAlumno.estado = true;
    }else{
        updateAlumno.estado = false;
    }
    if (esp.value > 0 && esp.value < 7){
        updateAlumno.esp = true;
    }else{
        updateAlumno.esp = false;
    }

    if (datosUpdateAlumno.NoControl != NoControl.value || datosUpdateAlumno.nombre != nombre.value || datosUpdateAlumno.apP != apP.value || datosUpdateAlumno.apM != apM.value || datosUpdateAlumno.esp != esp.value || datosUpdateAlumno.curp != curp.value || datosUpdateAlumno.generacion != generacion.value || datosUpdateAlumno.nss != nss.value || datosUpdateAlumno.estado != estado.value){
        if (updateAlumno.NoControl && updateAlumno.nombre && updateAlumno.apP && updateAlumno.apM && updateAlumno.esp && updateAlumno.curp && updateAlumno.generacion && updateAlumno.nss && updateAlumno.estado){
            document.querySelector('#submit-form-modificar_alumno').removeAttribute('disabled');
            return true;
        }else{
            document.querySelector('#submit-form-modificar_alumno').setAttribute('disabled', true);
            return false;
        }
    }else{
        document.querySelector('#submit-form-modificar_alumno').setAttribute('disabled', true);
        return false;
    }
    
}

const validarCambiosUsuarioSession = function(){
    let user    = document.querySelector('#user-session'),
    nombre      = document.querySelector('#nombre-session'),
    apP         = document.querySelector('#apP-session'),
    apM         = document.querySelector('#apM-session'),
    correo      = document.querySelector('#correo-session'),
    telefono    = document.querySelector('#telefono-session');

    updateUsuarioSession.user   = validarCampo(expresiones.usuario, user.value,     user.id     );
    updateUsuarioSession.nombre = validarCampo(expresiones.nombre,  nombre.value,   nombre.id   );
    updateUsuarioSession.apP    = validarCampo(expresiones.nombre,  apP.value,      apP.id      );
    updateUsuarioSession.apM    = validarCampo(expresiones.nombre,  apM.value,      apM.id      );
    updateUsuarioSession.correo = validarCampo(expresiones.correo,  correo.value,   correo.id   );
    updateUsuarioSession.user   = validarCampo(expresiones.telefono,telefono.value, telefono.id );

    if (updateUsuarioSession.user && updateUsuarioSession.nombre &&  updateUsuarioSession.apP && updateUsuarioSession.apM && updateUsuarioSession.correo && updateUsuarioSession.telefono){
        if (datosUsuarioSession.user != user.value || datosUsuarioSession.nombre != nombre.value || datosUsuarioSession.apP != apP.value || datosUsuarioSession.apM != apM.value || datosUsuarioSession.correo != correo.value || datosUsuarioSession.telefono != telefono.value){
            document.querySelector('#submit-modificar_usuario_session').removeAttribute('disabled');
            return true;
        }else{
            document.querySelector('#submit-modificar_usuario_session').setAttribute('disabled',true);
            return false;
        }
    }
    document.querySelector('#submit-modificar_usuario_session').setAttribute('disabled', true);
    return false;
    
}

const validarPassword = (campo) => {
    if ((document.getElementById(`${campo}`).value == document.getElementById(`${campo + "2"}`).value) && ((document.getElementById(`${campo}`).value != "") && (document.getElementById(`${campo + "2"}`).value != ""))){
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`${campo}`).classList.add('is-valid');
        return true;
    }else{
        document.getElementById(`${campo}`).classList.remove('is-valid');
        document.getElementById(`${campo}`).classList.add('is-invalid');
        return false;
        
    }
}

const validarCampo = (exprecion, value, campo) => {
    if (exprecion.test(value)){
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`${campo}`).classList.add('is-valid');
        return true;
    }else{
        document.getElementById(`${campo}`).classList.remove('is-valid');
        document.getElementById(`${campo}`).classList.add('is-invalid');
        return false;
    }
}

const submitInsertUsuario = function(){
    if (rol == 1){
        let usuario = document.querySelector('#user-insertar');
        let nombre = document.querySelector('#nombre-insertar');
        let ap_p = document.querySelector('#apP-insertar');
        let ap_m = document.querySelector('#apM-insertar');
        let correo = document.querySelector('#correo-insertar');
        let telefono = document.querySelector('#telefono-insertar');
        let rol = document.querySelector('#options-rol-insertar');
        let pass = document.querySelector('#pass-insertar');
    
        insertUsuario.user = validarCampo(expresiones.usuario, usuario.value, usuario.id);
        insertUsuario.nombre = validarCampo(expresiones.nombre, nombre.value, nombre.id);
        insertUsuario.apellido_p = validarCampo(expresiones.nombre, ap_p.value, ap_p.id);
        insertUsuario.apellido_m = validarCampo(expresiones.nombre, ap_m.value, ap_m.id);
        insertUsuario.correo = validarCampo(expresiones.correo, correo.value, correo.id);
        insertUsuario.telefono = validarCampo(expresiones.telefono, telefono.value, telefono.id);
        insertUsuario.pass = validarCampo(expresiones.password, pass.value, pass.id);
    
    
        if (insertUsuario.user == true && insertUsuario.nombre == true && insertUsuario.apellido_p == true && insertUsuario.apellido_m == true && insertUsuario.correo == true && insertUsuario.telefono == true && insertUsuario.pass == true){
            $.ajax({
                url:"./db/queries.php",
                type:"POST",
                data:{
                    insertUsuario_usuario: usuario.value,
                    insertUsuario_nombre: nombre.value,
                    insertUsuario_ap_p: ap_p.value,
                    insertUsuario_ap_m: ap_m.value,
                    insertUsuario_correo: correo.value,
                    insertUsuario_telefono: telefono.value,
                    insertUsuario_rol: rol.value,
                    insertUsuario_pass: pass.value,
                    consulta_filtro_user: `SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE (usuarios.rol = roles.NoRol AND usuarios.ID <> ${user_session_id}) AND usuarios.nombre LIKE '%%';`,
                    id_user: user_session_id
                },
                success: function(respuesta){
                    if (respuesta.charAt(0) != 1){
                        respuesta = respuesta.substring(1);
                        document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                            elemnt.removeEventListener('click', updateForm_modificar_usuario);
                        });
                        let request = JSON.parse(respuesta);
                        $('#container_registros_user').html(request);
                        document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                            elemnt.addEventListener('click', updateForm_modificar_usuario);
                        });
                        $("#options-rol-insertar option[value=1]").attr("selected",false);
                        $("#options-rol-insertar option[value=2]").attr("selected",false);
                        $("#options-estado-insertar option[value=1]").attr("selected",false);
                        $("#options-estado-insertar option[value=0]").attr("selected",false);
                        $('#user-insertar').val('');
                        $('#nombre-insertar').val('');
                        $('#apP-insertar').val('');
                        $('#apM-insertar').val('');
                        $('#correo-insertar').val('');
                        $('#telefono-insertar').val('');
                        $('#pass-insertar').val('');
                        
                        $('#user-insertar').removeClass('is-valid');
                        $('#nombre-insertar').removeClass('is-valid');
                        $('#apP-insertar').removeClass('is-valid');
                        $('#apM-insertar').removeClass('is-valid');
                        $('#correo-insertar').removeClass('is-valid');
                        $('#telefono-insertar').removeClass('is-valid');
                        $('#pass-insertar').removeClass('is-valid');
                        document.querySelector('#close-modal-form_insertar_usuario').click();
                    }else{
                        $('#user-insertar').removeClass('is-valid');
                        $('#user-insertar').addClass('is-invalid');
                        $('#user-insertar + div').html('Este nombre de usuario no esta disponible');
                        setTimeout(() => {
                            $('#user-insertar + div').html('Ingrese un nombre valido.');
                        }, 2000);
                    }
                }
            });
        }
    }
}

const submitFormInsertAlumno = function(){
    let nombre = document.querySelector('#nombre-insertar_alumno');
    let ap_paterno = document.querySelector('#apP-insertar_alumno');
    let ap_materno = document.querySelector('#apM-insertar_alumno');
    let especialidades = document.querySelector('#options-ESP-insertar_alumno');
    let generacion = document.querySelector('#generacion-insertar_alumno');
    let nss = document.querySelector('#NSS-insertar_alumno');
    let NoControl = document.querySelector('#NoControl-insertar_alumno');
    let curp = document.querySelector('#Curp-insertar_alumno');
    insertAlumno.nombre = validarCampo(expresiones.nombre, nombre.value, nombre.id);
    insertAlumno.apP = validarCampo(expresiones.nombre, ap_paterno.value, ap_paterno.id);
    insertAlumno.apM = validarCampo(expresiones.nombre, ap_materno.value, ap_materno.id);
    insertAlumno.generacion = validarCampo(expresiones.generacion, generacion.value, generacion.id);
    insertAlumno.nss = validarCampo(expresiones.nss, nss.value, nss.id);
    insertAlumno.NoControl = validarCampo(expresiones.NoControl, NoControl.value, NoControl.id);
    insertAlumno.curp = validarCampo(expresiones.CURP, curp.value, curp.id);
    if (especialidades.value > 0 && especialidades.value < 7){
        insertAlumno.esp = true;
    }else{
        insertAlumno.esp = false;
    }
    if(insertAlumno.nombre && insertAlumno.apP && insertAlumno.apM && insertAlumno.esp && insertAlumno.generacion && insertAlumno.nss && insertAlumno.NoControl && insertAlumno.curp){
        $.ajax({
            url:'./db/queries.php',
            type:'POST',
            data:{
                insertAlumno_nombre: nombre.value,
                insertAlumno_ap_p: ap_paterno.value,
                insertAlumno_aP_m: ap_materno.value,
                insertAlumno_esp: especialidades.value,
                insertAlumno_gen: generacion.value,
                insertAlumno_nss: nss. value,
                insertAlumno_NoControl: NoControl.value,
                insertAlumno_curp: curp.value,
                consulta_filtro_alumno: "SELECT NoControl, nombre, ap_paterno, ap_materno, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE alumnos.especialidad = especialidades.NoEspecialidad and alumnos.NoControl LIKE'%%';"
            },
            success: function (respuesta){
                document.querySelectorAll('.Registro_alumno').forEach((elemnt) => {
                    elemnt.removeEventListener('click', updateForm_modificar_alumno);
                });
                let request = JSON.parse(respuesta);
                $('#container_registros_alumnos').html(request);
                document.querySelectorAll('.Registro_alumno').forEach((elemnt) => {
                    elemnt.addEventListener('click', updateForm_modificar_alumno);
                });
                
                $("#options-ESP-insertar_alumno option[value=1]").attr(    "selected",false);
                $("#options-ESP-insertar_alumno option[value=2]").attr(    "selected",false);
                $("#options-ESP-insertar_alumno option[value=3]").attr(    "selected",false);
                $("#options-ESP-insertar_alumno option[value=4]").attr(    "selected",false);
                $("#options-ESP-insertar_alumno option[value=5]").attr(    "selected",false);
                $("#options-ESP-insertar_alumno option[value=6]").attr(    "selected",false);
                $('#nombre-insertar_alumno').val('');
                $('#apP-insertar_alumno').val('');
                $('#apM-insertar_alumno').val('');
                $('#options-ESP-insertar_alumno').val('');
                $('#generacion-insertar_alumno').val('');
                $('#NSS-insertar_alumno').val('');
                $('#NoControl-insertar_alumno').val('');
                $('#Curp-insertar_alumno').val('');

                
                $('#nombre-insertar_alumno').removeClass('is-valid');
                $('#apP-insertar_alumno').removeClass('is-valid');
                $('#apM-insertar_alumno').removeClass('is-valid');
                $('#options-ESP-insertar_alumno').removeClass('is-valid');
                $('#generacion-insertar_alumno').removeClass('is-valid');
                $('#NSS-insertar_alumno').removeClass('is-valid');
                $('#NoControl-insertar_alumno').removeClass('is-valid');
                $('#Curp-insertar_alumno').removeClass('is-valid');

                document.querySelector('#close-form-insertar_alumno').click();
            }
        });
    }
}

const submitUpdateAlumno = function (){
    if (validarCambiosUpdateAlumno()){
        let NoControl   = document.querySelector('#NoControl-modificar_alumno'),
        nombre          = document.querySelector('#nombre-modificar_alumno'),
        apP             = document.querySelector('#apP-modificar_alumno'),
        apM             = document.querySelector('#apM-modificar_alumno'),
        esp             = document.querySelector('#options-ESP-modificar_alumno'),
        curp            = document.querySelector('#curp-modificar_alumno'),
        generacion      = document.querySelector('#generacion-modificar_alumno'),
        nss             = document.querySelector('#NSS-modificar_alumno'),
        estado          = document.querySelector('#options-estado-modificar_alumno');
        $.ajax({
            url: './db/queries.php',
            type: 'POST',
            data: {
                updateAlumno_NoControl: NoControl.value,
                updateAlumno_nombre: nombre.value,
                updateAlumno_apP: apP.value,
                updateAlumno_apM: apM.value,
                updateAlumno_esp: esp.value,
                updateAlumno_curp: curp.value,
                updateAlumno_generacion: generacion.value,
                updateAlumno_nss: nss.value,
                updateAlumno_estado: estado.value,
                updateAlumno_NoControl_old: datosUpdateAlumno.NoControl,
                user_session_id: user_session_id, 
                consulta_filtro_alumno: "SELECT NoControl, nombre, ap_paterno, ap_materno, nombreEspecialidad, curp, generacion, NSS, estado FROM alumnos, especialidades WHERE alumnos.especialidad = especialidades.NoEspecialidad and alumnos.NoControl LIKE'%%';"
            },
            success: function(respuesta){
                switch (respuesta.charAt(0)){
                    case 1:
                        $('#curp-modificar_alumno').removeClass('is-valid');
                        $('#curp-modificar_alumno').addClass('is-invalid');
                        $('#curp-modificar_alumno + div').html('Esta curp se encuentra repetida');
                        setTimeout(() => {
                            $('#curp-modificar_alumno + div').html('Ingrese una curp valida.');
                        }, 2000);
                    break;
                    case 2:
                        $('#NSS-modificar_alumno').removeClass('is-valid');
                        $('#NSS-modificar_alumno').addClass('is-invalid');
                        $('#NSS-modificar_alumno + div').html('El NSS ya se encuentra registrado.');
                        setTimeout(() => {
                            $('#NSS-modificar_alumno + div').html('Ingrese un NSS valido.');
                        }, 2000);
                    break
                    case 3:
                        $('#NoControl-modificar_alumno').removeClass('is-valid');
                        $('#NoControl-modificar_alumno').addClass('is-invalid');
                        $('#NoControl-modificar_alumno + div').html('Este NoControl ya esta registrado');
                        setTimeout(() => {
                            $('#NoControl-modificar_alumno + div').html('Ingrese numero de control valido.');
                        }, 2000);
                    break;
                    case 4:
                        $("#options-ESP-modificar_alumno option[value=1]").attr(    "selected",false);
                        $("#options-ESP-modificar_alumno option[value=2]").attr(    "selected",false);
                        $("#options-ESP-modificar_alumno option[value=3]").attr(    "selected",false);
                        $("#options-ESP-modificar_alumno option[value=4]").attr(    "selected",false);
                        $("#options-ESP-modificar_alumno option[value=5]").attr(    "selected",false);
                        $("#options-ESP-modificar_alumno option[value=6]").attr(    "selected",false);
                        $("#options-estado-modificar_alumno option[value=1]").attr( "selected",false);
                        $("#options-estado-modificar_alumno option[value=0]").attr( "selected",false);
                        $('#nombre-modificar_alumno').val('');
                        $('#apP-modificar_alumno').val('');
                        $('#apM-modificar_alumno').val('');
                        $('#generacion-modificar_alumno').val('');
                        $('#NSS-modificar_alumno').val('');
                        $('#NoControl-modificar_alumno').val('');
                        $('#curp-modificar_alumno').val('');
                        
                        $('#nombre-modificar_alumno').removeClass('is-valid');
                        $('#apP-modificar_alumno').removeClass('is-valid');
                        $('#apM-modificar_alumno').removeClass('is-valid');
                        $('#options-ESP-modificar_alumno').removeClass('is-valid');
                        $('#generacion-modificar_alumno').removeClass('is-valid');
                        $('#NSS-modificar_alumno').removeClass('is-valid');
                        $('#NoControl-modificar_alumno').removeClass('is-valid');
                        $('#curp-modificar_alumno').removeClass('is-valid');
                        alert('El alumno que intentas modificar no existe.');
                        document.querySelector('#close-form-modificar_alumno').click();
                    break;
                }
                respuesta = respuesta.substring(1);
                document.querySelectorAll('.Registro_alumno').forEach((elemnt) => {
                    elemnt.removeEventListener('click', updateForm_modificar_alumno);
                });
                let request = JSON.parse(respuesta);
                $('#container_registros_alumnos').html(request);
                document.querySelectorAll('.Registro_alumno').forEach((elemnt) => {
                    elemnt.addEventListener('click', updateForm_modificar_alumno);
                });
                $("#options-ESP-modificar_alumno option[value=1]").attr(    "selected",false);
                $("#options-ESP-modificar_alumno option[value=2]").attr(    "selected",false);
                $("#options-ESP-modificar_alumno option[value=3]").attr(    "selected",false);
                $("#options-ESP-modificar_alumno option[value=4]").attr(    "selected",false);
                $("#options-ESP-modificar_alumno option[value=5]").attr(    "selected",false);
                $("#options-ESP-modificar_alumno option[value=6]").attr(    "selected",false);
                $("#options-estado-modificar_alumno option[value=1]").attr( "selected",false);
                $("#options-estado-modificar_alumno option[value=0]").attr( "selected",false);
                $('#nombre-modificar_alumno').val('');
                $('#apP-modificar_alumno').val('');
                $('#apM-modificar_alumno').val('');
                $('#generacion-modificar_alumno').val('');
                $('#NSS-modificar_alumno').val('');
                $('#NoControl-modificar_alumno').val('');
                $('#curp-modificar_alumno').val('');
                
                $('#nombre-modificar_alumno').removeClass('is-valid');
                $('#apP-modificar_alumno').removeClass('is-valid');
                $('#apM-modificar_alumno').removeClass('is-valid');
                $('#options-ESP-modificar_alumno').removeClass('is-valid');
                $('#generacion-modificar_alumno').removeClass('is-valid');
                $('#NSS-modificar_alumno').removeClass('is-valid');
                $('#NoControl-modificar_alumno').removeClass('is-valid');
                $('#curp-modificar_alumno').removeClass('is-valid');
                document.querySelector('#close-form-modificar_alumno').click();
            }
        });
    }
}

const submitUpdateUser = function (){
    if (rol == 1){
        if (validarCambiosUpdateUser()){
            let user    = $('#user-modificar'           ),
            nombre      = $('#nombre-modificar'         ),
            apP         = $('#apP-modificar'            ),
            apM         = $('#apM-modificar'            ),
            correo      = $('#correo-modificar'         ),
            telefono    = $('#telefono-modificar'       ),
            rol         = $('#options-rol-modificar'    ).val(),
            estado      = $('#options-estado-modificar' ).val();
            $.ajax({
                url: './db/queries.php',
                type: 'POST',
                data: {
                    updateUser_user: user.val(),
                    updateUser_nombre: nombre.val(),
                    updateUser_apP: apP.val(),
                    updateUser_apM: apM.val(),
                    updateUser_correo: correo.val(),
                    updateUser_telefono: telefono.val(),
                    updateUser_rol: rol,
                    updateUser_estado: estado,
                    updateUser_id: datosUpdateUser.id,
                    idUser: user_session_id,
                    consulta_filtro_user: `SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE (usuarios.rol = roles.NoRol AND usuarios.ID <> ${user_session_id}) AND usuarios.nombre LIKE '%%';`
                },
                success: function(respuesta){
                    if (respuesta.charAt(0) != 1){
                        respuesta = respuesta.substring(1);
                        document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                            elemnt.removeEventListener('click', updateForm_modificar_usuario);
                        });
                        let request = JSON.parse(respuesta);
                        $('#container_registros_user').html(request);
                        document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                            elemnt.addEventListener('click', updateForm_modificar_usuario);
                        });
    
                        $("#options-rol-modificar option[value=1]").attr("selected",false);
                        $("#options-rol-modificar option[value=2]").attr("selected",false);
                        $("#options-estado-modificar option[value=1]").attr("selected",false);
                        $("#options-estado-modificar option[value=0]").attr("selected",false);
                        $('#user-modificar'     ).val('');
                        $('#nombre-modificar'   ).val('');
                        $('#apP-modificar'      ).val('');
                        $('#apM-modificar'      ).val('');
                        $('#correo-modificar'   ).val('');
                        $('#telefono-modificar' ).val('');
                        $('#user-modificar'     ).removeClass('is-valid');
                        $('#nombre-modificar'   ).removeClass('is-valid');
                        $('#apP-modificar'      ).removeClass('is-valid');
                        $('#apM-modificar'      ).removeClass('is-valid');
                        $('#correo-modificar'   ).removeClass('is-valid');
                        $('#telefono-modificar' ).removeClass('is-valid');
                        document.querySelector('#close-form-modificar_usuario').click();
    
                    }else{
                        respuesta = respuesta.substring(1);
                        document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                            elemnt.removeEventListener('click', updateForm_modificar_usuario);
                        });
                        let request = JSON.parse(respuesta);
                        $('#container_registros_user').html(request);
                        document.querySelectorAll('.Registro_usuario').forEach((elemnt) => {
                            elemnt.addEventListener('click', updateForm_modificar_usuario);
                        });
                        $("#options-rol-modificar option[value=1]").attr("selected",false);
                        $("#options-rol-modificar option[value=2]").attr("selected",false);
                        $("#options-estado-modificar option[value=1]").attr("selected",false);
                        $("#options-estado-modificar option[value=0]").attr("selected",false);
                        $("#options-estado-modificar").val('');
                        $('#user-modificar'     ).val('');
                        $('#nombre-modificar'   ).val('');
                        $('#apP-modificar'      ).val('');
                        $('#apM-modificar'      ).val('');
                        $('#correo-modificar'   ).val('');
                        $('#telefono-modificar' ).val('');
                        $('#user-modificar'     ).removeClass('is-valid');
                        $('#nombre-modificar'   ).removeClass('is-valid');
                        $('#apP-modificar'      ).removeClass('is-valid');
                        $('#apM-modificar'      ).removeClass('is-valid');
                        $('#correo-modificar'   ).removeClass('is-valid');
                        $('#telefono-modificar' ).removeClass('is-valid');
                        document.querySelector('#close-form-modificar_usuario').click();
                        alert('El usuario que intentas modificar no existe.');
                    }
                }
            });
        }
    }
}

const submitChangePassword = function(){
    let passA   = $('#cambiar-passA'),
    passN       = $('#cambiar-pass2'),
    passC       = $('#cambiar-pass');
    changePassword.passA = validarCampo(expresiones.password, passA.val(), passA.attr('id'));
    changePassword.passN = validarCampo(expresiones.password, passN.val(), passN.attr('id'));
    changePassword.passC = validarPassword(passC.attr('id'));
    if (changePassword.passA && changePassword.passN && changePassword.passC){
        $.ajax({
            url: './db/queries.php',
            type: 'POST',
            data: {
                user_session_id: user_session_id,
                passA: passA.val(),
                passC: passC.val()
            },
            success: function(respuesta){
                console.log(respuesta);
                if (respuesta.charAt(0) != 0){
                    $('#cambiar-passA').val('');
                    $('#cambiar-passA').removeClass('is-valid');
                    $('#cambiar-passA').addClass('is-invalid');
                    $('#cambiar-passA + div').html('La contraseña no es correcta.');
                    setTimeout(() => {
                        $('#cambiar-passA + div').html('contraseña invalida.');
                    }, 2000);
                }else{
                    $('#cambiar-passA').val('');
                    $('#cambiar-pass2').val('');
                    $('#cambiar-pass').val('');
                    $('#cambiar-passA').removeClass('is-valid');
                    $('#cambiar-pass2').removeClass('is-valid');
                    $('#cambiar-pass').removeClass('is-valid');
                    document.querySelector('#close-form_changePasword').click();
                    setTimeout(() => {
                        alert('Se a cambiado su contraseña exitosamente.');
                    }, 500);
                }
            }
        });
    }
} 
// -----------------------------------------------------------------------------------

// escuchadores ----------------------------------------------------------------------
btnUpdateUsuarioSession.addEventListener('click', ()=>{
    if (validarCambiosUsuarioSession()){
        formUpdateUsuarioSession.submit();
    }
});
btnChangePassword.addEventListener('click', submitChangePassword);
btnInsertAlumno.addEventListener('click', submitFormInsertAlumno);
btnUpdateAlumno.addEventListener('click', submitUpdateAlumno);
btnUpdateUser.addEventListener('click', submitUpdateUser);
btn_logout_session.addEventListener('click', () => {window.location = './db/logout'});
btn_back.addEventListener('click', () => {window.location = './'});
btnInsertUsuario.addEventListener('click', submitInsertUsuario);
buttons_Usuarios.forEach((elemnt) => {
    elemnt.addEventListener('click', updateForm_modificar_usuario);
});
buttons_Alumnos.forEach((elemnt) => {
    elemnt.addEventListener('click', updateForm_modificar_alumno);
});
buttons_delete.forEach((element) => {
    element.addEventListener('click', deleteCredencial);
});
input_filtro_alumnos.addEventListener(          'keypress',filtrar_tabla_alumno);
input_filtro_alumnos.addEventListener(          'keyup',   filtrar_tabla_alumno);
input_select_filtro_alumnos.addEventListener(   'click',   filtrar_tabla_alumno);
input_select_filtro_alumnos.addEventListener(   'focus',   filtrar_tabla_alumno);
input_select_filtro_alumnos.addEventListener(   'blur',    filtrar_tabla_alumno);
if (rol == 1){
    input_filtro_users.addEventListener(        'keypress',     filtrar_tabla_user);
    input_filtro_users.addEventListener(        'keyup',        filtrar_tabla_user);
    input_select_filtro_users.addEventListener( 'focus',        filtrar_tabla_user);
    input_select_filtro_users.addEventListener( 'click',        filtrar_tabla_user);
    input_select_filtro_users.addEventListener( 'blur',         filtrar_tabla_user);
}

input_filtro_historial_alumnos.addEventListener(        'keypress',     filtrar_tabla_historial_alumnos);
input_filtro_historial_alumnos.addEventListener(        'keyup',        filtrar_tabla_historial_alumnos);
input_select_filtro_historial_alumnos.addEventListener( 'focus',        filtrar_tabla_historial_alumnos);
input_select_filtro_historial_alumnos.addEventListener( 'click',        filtrar_tabla_historial_alumnos);
input_select_filtro_historial_alumnos.addEventListener( 'blur',         filtrar_tabla_historial_alumnos);

input_filtro_historial_users.addEventListener(        'keypress',     filtrar_tabla_historial_users);
input_filtro_historial_users.addEventListener(        'keyup',        filtrar_tabla_historial_users);
input_select_filtro_historial_users.addEventListener( 'focus',        filtrar_tabla_historial_users);
input_select_filtro_historial_users.addEventListener( 'click',        filtrar_tabla_historial_users);
input_select_filtro_historial_users.addEventListener( 'blur',         filtrar_tabla_historial_users);

input_filtro_credenciales.addEventListener(         'keypress', filtrar_tabla_credenciales);
input_filtro_credenciales.addEventListener(         'keyup',    filtrar_tabla_credenciales);
input_select_filtro_credenciales.addEventListener(  'focus',    filtrar_tabla_credenciales);
input_select_filtro_credenciales.addEventListener(  'click',    filtrar_tabla_credenciales);
input_select_filtro_credenciales.addEventListener(  'blur',     filtrar_tabla_credenciales);

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

input_select_esp_modificar_alumno.addEventListener(  'focus',    validarCambiosUpdateAlumno);
input_select_esp_modificar_alumno.addEventListener(  'click',    validarCambiosUpdateAlumno);
input_select_esp_modificar_alumno.addEventListener(  'blur',     validarCambiosUpdateAlumno);

input_select_estado_modificar_alumno.addEventListener(  'focus',    validarCambiosUpdateAlumno);
input_select_estado_modificar_alumno.addEventListener(  'click',    validarCambiosUpdateAlumno);
input_select_estado_modificar_alumno.addEventListener(  'blur',     validarCambiosUpdateAlumno);

input_select_rol_modificar_user.addEventListener(  'focus',    validarCambiosUpdateUser);
input_select_rol_modificar_user.addEventListener(  'click',    validarCambiosUpdateUser);
input_select_rol_modificar_user.addEventListener(  'blur',     validarCambiosUpdateUser);

input_select_estado_modificar_user.addEventListener(  'focus',    validarCambiosUpdateUser);
input_select_estado_modificar_user.addEventListener(  'click',    validarCambiosUpdateUser);
input_select_estado_modificar_user.addEventListener(  'blur',     validarCambiosUpdateUser);

// -----------------------------------------------------------------------------------


if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.remove('lightMode');
	btnSwitch.classList.add('active');
    tablas.forEach((e) => {
        e.classList.toggle('table-dark');
    });
} else {
	document.body.classList.add('lightMode');
	btnSwitch.classList.remove('active');
}