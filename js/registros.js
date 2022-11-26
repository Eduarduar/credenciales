// buttons ---------------------------------------------------------------------------
const btn_logout_session = document.querySelector('.container-button_logout button');
const btn_back = document.querySelector('.container-button_back button');

const buttons_Usuarios = document.querySelectorAll('.Registro_usuario');
const buttons_Alumnos = document.querySelectorAll('.Registro_alumno');

const btnSwitch = document.querySelector('#switch');

const buttons_delete = document.querySelectorAll('.delete')

const btnInsertUsuario = document.querySelector('#submit-form-insertar_usuario');
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
// -----------------------------------------------------------------------------------

// Variables -------------------------------------------------------------------------
const inputs = document.querySelectorAll('form input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{5,25}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/,
	password: /^.{0}\w{8,20}$/,  // 8 a 20 digitos.
    passwordS: /^.{0}\w{1,20}$/, // 1 a 20 digitos
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    NoControl: /^\d{14}$/,
    telefono: /^\d{10}$/,
    CURP: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
}

insertUsuario = {
    nombre: false,
    apellido_p: false,
    apellido_m: false,
    correo: false,
    telefono: false,
    pass: false
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
                $("#options-rol-modificar option[value=1]").attr("selected",false);
                $("#options-rol-modificar option[value=2]").attr("selected",false);
                $("#options-estado-modificar option[value=1]").attr("selected",false);
                $("#options-estado-modificar option[value=0]").attr("selected",false);
                $('#user-modificar').val(request.user);
                $('#nombre-modificar').val(request.nombre);
                $('#apP-modificar').val(request.ap_paterno);
                $('#apM-modificar').val(request.ap_materno);
                $('#correo-modificar').val(request.mail);
                $('#telefono-modificar').val(request.telefono);
                if (request.rol == 'admin'){
                    $("#options-rol-modificar option[value=1]").attr("selected",true);
                }else{
                    $("#options-rol-modificar option[value=2]").attr("selected",true);
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
            $("#options-ESP-modificar_alumno option[value=1]").attr("selected",false);
            $("#options-ESP-modificar_alumno option[value=2]").attr("selected",false);
            $("#options-ESP-modificar_alumno option[value=3]").attr("selected",false);
            $("#options-ESP-modificar_alumno option[value=4]").attr("selected",false);
            $("#options-ESP-modificar_alumno option[value=5]").attr("selected",false);
            $("#options-ESP-modificar_alumno option[value=6]").attr("selected",false);
            $("#options-estado-modificar_alumno option[value=1]").attr("selected",false);
            $("#options-estado-modificar_alumno option[value=0]").attr("selected",false);
            $('#nombre-modificar_alumno').val(request.nombre);
            $('#apP-modificar_alumno').val(request.ap_paterno);
            $('#apM-modificar_alumno').val(request.ap_materno);
            $('#generacion-modificar_alumno').val(request.generacion);
            $('#NSS-modificar_alumno').val(request.NSS);
            switch (request.ESP){
                case 'Arquitectura':
                    console.log('a');
                    $("#options-ESP-modificar_alumno option[value=1]").attr("selected",true);
                break;
                case 'Logistica':
                    $("#options-ESP-modificar_alumno option[value=2]").attr("selected",true);
                break;
                case 'Ofimatica':
                    $("#options-ESP-modificar_alumno option[value=3]").attr("selected",true);
                break;
                case 'Preparación de Alimentos y Bebidas':
                    $("#options-ESP-modificar_alumno option[value=4]").attr("selected",true);
                break;
                case 'Programación':
                    $("#options-ESP-modificar_alumno option[value=5]").attr("selected",true);
                break;
                case 'Contabilidad':
                    $("#options-ESP-modificar_alumno option[value=6]").attr("selected",true);
                break;
            }
            $("#options-estado-modificar_alumno option[value="+ request.estado +"]").attr("selected",true);
        }
    });
}
const logout = function (){
    window.location = './db/logout';
}
const back = function (){
    window.location = './'  
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
                consulta_filtro_user: `SELECT ID, user, nombre, ap_paterno, ap_materno, telefono, mail, nombreRol, estado FROM usuarios, roles WHERE (usuarios.rol = roles.NoRol AND usuarios.ID <> ${user_session_id}) AND usuarios.nombre LIKE '%%';`
            },
            success: function(respuesta){
                let request = JSON.parse(respuesta);
                $('#container_registros_user').html(request);
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
            }
        });
    }
}
// -----------------------------------------------------------------------------------

// escuchadores ----------------------------------------------------------------------
btn_logout_session.addEventListener('click', logout);
btn_back.addEventListener('click', back);
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