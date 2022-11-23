import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs'
import showMoreStyles from './modules/showMoreStyles'
import burger from './modules/burger'
import filter from './modules/filter'
import calc from "./modules/calc";
import pictureSize from "./modules/pictureSize";
import accordion from "./modules/accordion";


window.addEventListener("DOMContentLoaded", ()=>{
    modals();
    sliders('.feedback-slider-item', 'horizontal','.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms()
    mask('[name="phone"]')
    checkTextInputs('[name="name"]')
    checkTextInputs('[name="message"]')
    showMoreStyles('.button-styles', '#styles .row')
    burger('.burger-menu', '.burger')
    filter()
    calc('#size','#material', '#options', '.promocode', '.calc-price')
    pictureSize('.sizes-block')
    accordion('.accordion-heading', '.accordion-block')
})