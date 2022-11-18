
// buttons -----------------------------------------------------------------------
const btn_mostar_consulta = document.querySelector('.container-button_CC');
const btn_mostrar_generar = document.querySelector('.container-button_GC');
// -------------------------------------------------------------------------------

// forms ----------------------------------------------------------------------
const form_consultar    =   document.querySelector('.container-form_consulta');
const form_generar      =   document.querySelector('.container-form_generar' );
// ----------------------------------------------------------------------------

// variables ---------------------------------------

// -------------------------------------------------

// funciones ---------------------------------------
const changeForms = function (){
    form_consultar.classList.toggle('hide');
    form_generar.classList.toggle('hide');
    btn_mostar_consulta.classList.toggle('hide');
    btn_mostrar_generar.classList.toggle('hide');
}
// -------------------------------------------------

// escuchadores ------------------------------------
btn_mostar_consulta.addEventListener('click', changeForms);
btn_mostrar_generar.addEventListener('click', changeForms);
// -------------------------------------------------