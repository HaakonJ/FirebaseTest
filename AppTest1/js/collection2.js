/*function Clickable() {

    console.log()
    const egg = document.getElementById('egg' + i);
    egg.addEventListener('click', e => {
        document.getElementById('eggCard' + i).classList.remove('hide');
    });

    //const btnHide1 = document.getElementById('btnHide1');
    //btnHide1.addEventListener('click', e => {
    //eggCard1.classList.add('hide');
    // });
};*/

console.log('egg1');

function Clickable() {
    document.getElementById('egg1').addEventListener('click', e => {
        eggCard1.classList.remove('hide');
    });
}
//window.onload = Clickable;