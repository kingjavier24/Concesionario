$(document).ready(function(){

        $('.botons').on('click',function(){
    
        let btn=$('.botons').index(this);
        let Valor=$('.controls').eq(btn);
      
      
       
        let n=Valor.val();
        
      
    if(n=="No"){
        alert("Su Opcion Fue No, Sera Redireccionado a su vista.")
        location.href="/index";
    }else if(n=="Si"){
 
    
       location.href="/login";
        
        $.ajax({
            type:"POST",
            url:'/actualizarrol',
            data:{
                nn:n
            }
        });
    }
        });
    
    });