$(document).ready(function(){

    $('.action_btn2').on('click',function(){

    let btn=$('.action_btn2').index(this);
    let nom=$('.nom').eq(btn);
    let ape=$('.ape').eq(btn);
    let tel=$('.tel').eq(btn);
    let correo=$('.correo').eq(btn);
   
    let n=nom.val();
    let a=ape.val();
    let t=tel.val();
    let c=correo.val();


   


    
    $.ajax({
        type:"POST",
        url:'/actualizar',
        data:{
            nn:n,aa:a,tt:t,cc:c
        }
    });

    });
});