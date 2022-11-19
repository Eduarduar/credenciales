
// buttons -----------------------------------------------------------------------
const btn_mostar_consulta = document.querySelector('.container-button_CC');
const btn_mostrar_generar = document.querySelector('.container-button_GC');
const btn_submit_login = document.querySelector('#submitLogin');
const btn_logout_session = document.querySelector('.container-button_logout button');
const btn_registros = document.querySelector('.container-button_confi button');
const btn_mostrar_form_login = document.querySelector('.container-button_login button');
// -------------------------------------------------------------------------------

// inputs -------------------------------------------------
    const inputs = document.querySelectorAll('form input');
// --------------------------------------------------------

// forms ----------------------------------------------------------------------
const form_consultar    =   document.querySelector('.container-form_consulta');
const form_generar      =   document.querySelector('.container-form_generar' );
const form_login        =   document.querySelector('.form-login');
// ----------------------------------------------------------------------------

// variables ---------------------------------------
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{5,25}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{0}\w{8,20}$/,  // 8 a 20 digitos.
    passwordS: /^.{0}\w{1,20}$/, // 1 a 20 digitos
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const userLogin = {
    user: false,
    pass: false
}
// -------------------------------------------------

// funciones ---------------------------------------
const changeForms = function (){
    form_consultar.classList.toggle('hide');
    form_generar.classList.toggle('hide');
    btn_mostar_consulta.classList.toggle('hide');
    btn_mostrar_generar.classList.toggle('hide');
}

const validarForm = (e) => {
    switch (e.target.name) {
        case 'user':
            userLogin.user = validarCampo(expresiones.usuario, e.target.value, e.target.id);
        break;
        case 'pass':
            userLogin.pass = validarCampo(expresiones.password, e.target.value, e.target.id);
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

const submitLogin = function () {
    let user = document.querySelector('#user');
    let pass = document.querySelector('#pass');
    userLogin.user = validarCampo(expresiones.usuario, user.value, user.id);
    userLogin.pass = validarCampo(expresiones.password, pass.value, pass.id);
    if (userLogin.user == true && userLogin.pass == true){
        form_login.submit();
    }
}

const logout = function () {
    window.location = './db/logout';
}
const registros = function () {
    window.location = './registros';
}
// -------------------------------------------------

// escuchadores ------------------------------------
btn_mostar_consulta.addEventListener('click', changeForms);
btn_mostrar_generar.addEventListener('click', changeForms);
inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});
if (btn_submit_login != null)
btn_submit_login.addEventListener('click', submitLogin);
if (btn_logout_session != null){
    btn_logout_session.addEventListener('click', logout);
    btn_registros.addEventListener('click', registros);
}
// -------------------------------------------------