
// buttons -----------------------------------------------------------------------
const btn_mostar_consulta = document.querySelector('.container-button_CC');
const btn_mostrar_generar = document.querySelector('.container-button_GC');
const btn_submit_login = document.querySelector('#submitLogin');
const btn_logout_session = document.querySelector('.container-button_logout button');
const btn_registros = document.querySelector('.container-button_confi button');
const btn_mostrar_form_login = document.querySelector('.container-button_login button');
const btnSwitch = document.querySelector('#switch');
const inputImagen = document.querySelector("#imagen");
const btn_submit_form_generar = document.querySelector("#btnGenerar");
const btn_submit_form_consultar = document.querySelector('#btnConsultar');
// -------------------------------------------------------------------------------

// inputs -------------------------------------------------
    const inputs = document.querySelectorAll('form input');
// --------------------------------------------------------

// forms ----------------------------------------------------------------------
const form_consultar    =   document.querySelector('.container-form_consulta');
const form_generar      =   document.querySelector('.container-form_generar' );
const form_login        =   document.querySelector('.form-login');
const form_consultarF   = document.querySelector('.form_consulta');
// ----------------------------------------------------------------------------

// variables ---------------------------------------
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{5,25}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{0}\w{8,20}$/,  // 8 a 20 digitos.
    passwordS: /^.{0}\w{1,20}$/, // 1 a 20 digitos
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    NoControl: /^\d{14}$/,
    CURP: /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
}

const userLogin = {
    user: false,
    pass: false
}

const consultar = {
    NoControl: false,
    curp: false
}

const generar = {
    imagen: false,
    NoControl: false,
    curp: false
}
// -------------------------------------------------

// funciones ---------------------------------------
const validarImagen = function(){
    let error = false;
    try{
        if (inputImagen.files[0].size > 5242880){ // no sea mallor a un 5Mb.
            inputImagen.value = null;
            if (inputImagen.classList.value.includes('is-valid'))
            inputImagen.classList.remove('is-valid');
            inputImagen.classList.add('is-invalid');
            setTimeout(() => {
                inputImagen.classList.remove('is-invalid');
            }, 2000);
            return false;
        }
    }catch{
        error = true;
        return false;
    }
    if (!error){
        inputImagen.classList.add('is-valid');
        return true;
    }else{
        return false;
    }
}

const validarForm_generar = function (){
    let NoControl = document.querySelector('#generator-NoControl');
    let Curp = document.querySelector('#generator-CURP');
    let form = document.querySelector('.form_generar');
    generar.imagen = validarImagen();
    generar.NoControl = validarCampo(expresiones.NoControl, NoControl.value, NoControl.id);
    generar.curp = validarCampo(expresiones.CURP, Curp.value, Curp.id);
    if (generar.NoControl == true && generar.curp == true && generar.imagen == true){
        form.submit();
    }else{
        if (generar.imagen == false){
            inputImagen.classList.add('is-invalid');
            setTimeout(() => {
                inputImagen.classList.remove('is-invalid');
            }, 2000);
        }
    }
}

btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('lightMode');
	btnSwitch.classList.toggle('active');
	if(document.body.classList.contains('lightMode')){
		localStorage.setItem('dark-mode', 'false');
	} else {
		localStorage.setItem('dark-mode', 'true');
	}
});

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

        case 'generator-NoControl':
            generar.NoControl = validarCampo(expresiones.NoControl, e.target.value, e.target.id);
        break;
        case 'generator-CURP':
            generar.curp = validarCampo(expresiones.CURP, e.target.value, e.target.id);
        break;

        case 'consulta-NoControl':
            consultar.NoControl = validarCampo(expresiones.NoControl, e.target.value, e.target.id);
        break;
        
        case 'consulta-CURP':
            consultar.curp = validarCampo(expresiones.CURP, e.target.value, e.target.id);
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

const submitConsulta = function (){
    let NoControl = document.querySelector('#consulta-NoControl');
    let curp = document.querySelector('#consulta-CURP');
    consultar.NoControl = validarCampo(expresiones.NoControl, NoControl.value, NoControl.id);
    consultar.curp = validarCampo(expresiones.CURP, curp.value, curp.id);
    if (consultar.NoControl && consultar.curp){
        form_consultarF.submit();
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
inputImagen.addEventListener('blur', validarImagen);
btn_submit_form_generar.addEventListener('click', validarForm_generar);
btn_submit_form_consultar.addEventListener('click', submitConsulta);
// -------------------------------------------------

if(localStorage.getItem('dark-mode') === 'true'){
	document.body.classList.remove('lightMode');
	btnSwitch.classList.add('active');
} else {
	document.body.classList.add('lightMode');
	btnSwitch.classList.remove('active');
}


let NoControl = document.querySelector('#generator-NoControl');
let Curp = document.querySelector('#generator-CURP');
inputImagen.value = null;
Curp.value = '';
NoControl.value = '';