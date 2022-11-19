// buttons ---------------------------------------------------------------------------
const btn_logout_session = document.querySelector('.container-button_logout button');
const btn_back = document.querySelector('.container-button_back button');
const buttons_Usuarios = document.querySelectorAll('.Registro_usuario');
const buttons_Alumnos = document.querySelectorAll('.Registro_alumno');
const inputs_form_modificar_usuario = document.querySelector('.form-modificar_usuario');
// -----------------------------------------------------------------------------------

// inputs ----------------------------------------------------------------------------
const input_select_filtro_alumnos = document.querySelector('#options-filtro_alumnos');
const input_filtro_alumnos = document.querySelector('#filtro_alumno');
const input_select_filtro_users = document.querySelector('#options-filtro_user');
const input_filtro_users = document.querySelector('#filtro_user');
// -----------------------------------------------------------------------------------

// funciones -------------------------------------------------------------------------
const updateForm_modificar_usuario = function (e){
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
            $("#options-estado-modificar option[value=2]").attr("selected",false);
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
            $("#options-estado-modificar_estado option[value="+ request.estado +"]").attr("selected",true);
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
// -----------------------------------------------------------------------------------

// escuchadores ----------------------------------------------------------------------
btn_logout_session.addEventListener('click', logout);
btn_back.addEventListener('click', back);
buttons_Usuarios.forEach((elemnt) => {
    elemnt.addEventListener('click', updateForm_modificar_usuario);
});
buttons_Alumnos.forEach((elemnt) => {
    elemnt.addEventListener('click', updateForm_modificar_alumno);
});
input_filtro_alumnos.addEventListener('keypress', filtrar_tabla_alumno);
input_filtro_alumnos.addEventListener('keyup', filtrar_tabla_alumno);
input_select_filtro_alumnos.addEventListener('click', filtrar_tabla_alumno);
input_select_filtro_alumnos.addEventListener('focus', filtrar_tabla_alumno);
input_select_filtro_alumnos.addEventListener('blur', filtrar_tabla_alumno);

input_filtro_users.addEventListener('keypress', filtrar_tabla_user);
input_filtro_users.addEventListener('keyup', filtrar_tabla_user);
input_select_filtro_users.addEventListener('focus', filtrar_tabla_user);
input_select_filtro_users.addEventListener('click', filtrar_tabla_user);
input_select_filtro_users.addEventListener('blur', filtrar_tabla_user);
// -----------------------------------------------------------------------------------