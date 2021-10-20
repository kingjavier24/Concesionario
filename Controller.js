const Connection=require('../Conexion/Conexion');  //ACA REQUERIMOS LA CONEXION DE BASE DE DATOS PARA LAS CONSULTAS
const  cnn=Connection();  //ACA POR MEDIO DE LA CONSTANTE CNN VAMOS A CONTENER LA CONEXION A LA BD
const {render}=require('ejs'); //ACA RENDERISAMOS LOS EJS PARA LA HORA DE HACER RENDERS LOS TOME CORRECTAMENTE
const bcryptjs=require('bcryptjs'); //LLAMAMOS EL MODULO DE INCRIPTACION DE CLAVES ANTERIORMENTE INSTALADO

const Controller={}; //HACEMOS INICIALIZAMOS EL CONTROLADOR 
Controller.index=(req,res,next)=>{
    res.render('Principal')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
    
    }

    Controller.comprador=(req,res,next)=>{
        res.render('index')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
        res.send("ERROR DE CONTROLADOR");
        
        }
     

    Controller.Datos=(req,res,next)=>{
        res.render('Datos')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
        res.send("ERROR DE CONTROLADOR");
        
        }

        Controller.Cerrar=(req,res,next)=>{
            req.session.destroy(()=>{
             
                res.redirect('/');
            
            })
            
            }

    Controller.login=(req,res,next)=>{
        res.render('login')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
        res.send("ERROR DE CONTROLADOR");
        
        }

    Controller.registro=(req,res,next)=>{
        res.render('registro')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
        res.send("ERROR DE CONTROLADOR");
        
        }
        Controller.registroa=(req,res,next)=>{
            res.render('registroam')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
            res.send("ERROR DE CONTROLADOR");
            
            }
        Controller.registroco=(req,res,next)=>{
            res.render('registroc')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
            res.send("ERROR DE CONTROLADOR");
            
            }

            Controller.vendedor=(req,res,next)=>{
                res.render('Vistavendedor')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
                res.send("ERROR DE CONTROLADOR");
                
                }
                Controller.vender=(req,res,next)=>{
                    res.render('Vendedor')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
                    res.send("ERROR DE CONTROLADOR");
                    
                    }
                    Controller.ambos=(req,res,next)=>{
                        res.render('Ambos')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
                        res.send("ERROR DE CONTROLADOR");
                        
                        }
                        Controller.confi=(req,res,next)=>{
                            res.render('Confirmacion')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
                            res.send("ERROR DE CONTROLADOR");
                            
                            }
   
                            Controller.confi2=(req,res,next)=>{
                                res.render('ConfirmacionV')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
                                res.send("ERROR DE CONTROLADOR");
                                
                                }
       
    Controller.insertar=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const n=req.body.Nombre;
        const a=req.body.Apellido;
        const t=req.body.Tipo;
        const nu=req.body.numdoc;
        const tel=req.body.numero;
        const co=req.body.correo;
        const usu=req.body.usu;
        const cla=req.body.cla;
        let c= await bcryptjs.hash(cla,8);
        
        console.log(n+a+t+nu+tel+co+usu+c);
        cnn.query('INSERT INTO usuario SET?',{usulogin:usu,usupassword:c},async(err,results)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
          
        }
        else{
            console.log("1  records Inserted, ID:"+ results.insertId);
            
          iduser=results.insertId;
           
             cnn.query('INSERT INTO datospersonales SET?',{usuid:iduser,datnombre:n,datapellido:a,datipoid:t,datnumeroid:nu,datelefono:tel,datcorreo:co},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
                 });

                 cnn.query('INSERT INTO usuario_rol SET?',{usuid:iduser,rolid:2},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
                 });
         
        res.render('login')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
    
        });

       
            
    }


    Controller.Datos=(req,res,next)=>{ 
        //creamos una consulta de usuarios por medio de la funcion flecha

         cnn.query('SELECT * FROM datospersonales WHERE  usuid="'+usuid+'"',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
             if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                 next(new Error(err));
                 console.log("ERROR EN LA CONSULTA");
             }   
             else{
                
                 console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                 res.render('Datos',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
             }
         })
     
     }  

        Controller.loginentrar=async(req,res,next)=>{  //LOGINN 
            const usu =  req.body.Usuario;  // TRAEMOS LOS NAME DE EL LOGIN PARA VALIDAR LOS CAMPOS
            const cla = await req.body.Password;

            console.log(usu+cla);
            
            cnn.query('SELECT * FROM usuario WHERE usulogin=?',[usu],async(err,results)=>{  //CONSULTAMOS LOS DATOS EN LA BASE DE DATOS Y REEMPLAZAMOS VALORES CON LOS QUE DILIGENCIA EL USUARIO
                if(err){
                    next(new Error("ERROR AL REALIZAR LA CONSULTA",err)); //VALIDAMOS SI EXITEN ERRORES
            
                }else if(results!=0 && await(bcryptjs.compare(cla,results[0].usupassword))){ // SI EL RESULTADO ES DIFERENTE DE 0 ES QUE ENCONTRO EL USUARIO,POR MEDIO DE UN ARREGLO Y COMPARE, COMPARAMOS LO DILIGENCIADO POR EL USUARIO Y LO REGISTRADO EN LA BD                           console.log("Datos Correctossssssss");
    

    usuid=results[0].usuid;
    cnn.query('SELECT * FROM usuario_rol WHERE usuid=?',[usuid],async(err,results)=>{
        rol=results[0].rolid;
      
            
            
            console.log(rol)


                //CREAMOS SESIONES POR MEDIO DE UN ARREGLO, QUE NOS RETORNA LOS DATOS DE EL USUARIO LOGEADO
            req.session.Login=true; //GENERAMOS LA SESION AL DARLE COMO TRUE EN VERDADERA.
            switch(rol){
                case 2:

                   

                    cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],async(err,results)=>{ //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                        if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                            next(new Error(err));
                            console.log("ERROR EN LA CONSULTA");
                        }   
                        else{
                            nombre=results[0].datnombre;
                            apellido=results[0].datapellido;
                            datid=results[0].datid;
                            console.log(nombre+apellido)
                      
                           
                  
                           res.redirect('Vistavendedor')
                       
                        }
                    })
                
                        break; //DESCANSA
                    
                
        
                        case 1:  //VALIDAMOS IGUAL QUE ARRIBA 
                        cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],async(err,results)=>{ //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                            if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                                next(new Error(err));
                                console.log("ERROR EN LA CONSULTA");
                            }   
                            else{
                                nombre=results[0].datnombre;
                                apellido=results[0].datapellido;
                                datid=results[0].datid;
                                console.log(nombre+apellido)
                          
                               
                      
                               res.redirect('index')
                           
                            }
                        })
            res.render('index')
                break;

                case 5:
                    cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],async(err,results)=>{ //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                        if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                            next(new Error(err));
                            console.log("ERROR EN LA CONSULTA");
                        }   
                        else{
                            nombre=results[0].datnombre;
                            apellido=results[0].datapellido;
                            datid=results[0].datid;
                            console.log(nombre+apellido)
                      
                           
                  
                           res.redirect('Ambos')
                       
                        }
                    })
                
                    
                    break;
            }
            })
    


            

                }
            else {
                    console.log("DATOS INCORRECTOS"); //SALIMOS DEL IF DE ENTRADA Y SWITCH A UN VALIDADOR SI LOS DATOS SON INCORRECTOS 
                    res.render('Login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "VERIFIQUE SU USUARIO O CONTRASEÑA.",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/'    
                    });//NOS REDIRIGE AL MISMO ARCHIVO
                }
            })
            
            
            
            
                }


 Controller.vehiculo=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
    const cat=req.body.categoria;
    const placa=req.body.placa;
    const modelo=req.body.modelo;
    const marca=req.body.marca;
    const linea=req.body.linea;
    const estado=req.body.estado;
    const precio=req.body.precio;
    const color=req.body.color;
    const img=req.file.filename;

    console.log(cat+placa+modelo+marca+estado+precio+color+img+datid);
        
    cnn.query('INSERT INTO vehiculo SET?',{catid:cat,vehplaca:placa,datid:datid,vehmodelo:modelo,vehmarca:marca,vehlinea:linea,vehestado:estado,vehprecio:precio,color:color,imagen:img},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
      
        if(err){
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
          
        }
        else{
         

               res.send("subio de manera correcta") 
         
        res.render('Vistavendedor')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
    
        });


       
            
    }

   

   
    Controller.insertarco=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const n=req.body.Nombre;
        const a=req.body.Apellido;
        const t=req.body.Tipo;
        const nu=req.body.numdoc;
        const tel=req.body.numero;
        const co=req.body.correo;
        const usu=req.body.usu;
        const cla=req.body.cla;
        let c= await bcryptjs.hash(cla,8);
        
        console.log(n+a+t+nu+tel+co+usu+c);
        cnn.query('INSERT INTO usuario SET?',{usulogin:usu,usupassword:c},async(err,results)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
          
        }
        else{
            console.log("1  records Inserted, ID:"+ results.insertId);
            
          iduser=results.insertId;
           
             cnn.query('INSERT INTO datospersonales SET?',{usuid:iduser,datnombre:n,datapellido:a,datipoid:t,datnumeroid:nu,datelefono:tel,datcorreo:co},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
                 });

                 cnn.query('INSERT INTO usuario_rol SET?',{usuid:iduser,rolid:1},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
                 });
         
        res.render('login')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
    
        });

       
            
    }

   
    Controller.insertaram=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const n=req.body.Nombre;
        const a=req.body.Apellido;
        const t=req.body.Tipo;
        const nu=req.body.numdoc;
        const tel=req.body.numero;
        const co=req.body.correo;
        const usu=req.body.usu;
        const cla=req.body.cla;
        let c= await bcryptjs.hash(cla,8);
        
        console.log(n+a+t+nu+tel+co+usu+c);
        cnn.query('INSERT INTO usuario SET?',{usulogin:usu,usupassword:c},async(err,results)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
          
        }
        else{
            console.log("1  records Inserted, ID:"+ results.insertId);
            
          iduser=results.insertId;
           
             cnn.query('INSERT INTO datospersonales SET?',{usuid:iduser,datnombre:n,datapellido:a,datipoid:t,datnumeroid:nu,datelefono:tel,datcorreo:co},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
                 });

                 cnn.query('INSERT INTO usuario_rol SET?',{usuid:iduser,rolid:5},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
              
                 });
         
        res.render('login')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
    
        });

       
            
    }

        Controller.Buscarau=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
            const m=req.body.Marca;
            const mo=req.body.Modelo;
            const p=req.body.PrecioM;
            const p2=req.body.PrecioMa;
            const t=req.body.Tipo;
            const es=req.body.Estado;
            const l=req.body.Linea;
           console.log(m+mo+t+es+p+p2+l+t);
            // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
            cnn.query('SELECT * FROM vehiculo  where vehmarca="'+m+'" and vehlinea="'+l+'" and vehmodelo="'+mo+'" and vehestado="'+es+'" AND vehprecio >='+p+' and vehprecio <='+p2+' And catid="'+t+'"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                if(err){
                    next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                }
                else{
                    console.log(resbd);
                    res.render('auto',{Datos:resbd}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                }
            
                });
              
          
         
                
            }
    
    
            Controller.detalles=(req,res,next)=>{ 
                const {datid} = req.params;
                const {vehplaca} = req.params;

                console.log(datid+vehplaca)
              
                  cnn.query('SELECT v.vehmarca, v.vehmodelo, v.vehprecio, v.vehplaca, v.imagen,v.vehlinea, v.color,v.vehestado, d.datnombre, d.datapellido, d.datelefono FROM vehiculo v, datospersonales d WHERE  d.datid=? AND v.vehplaca=?',[datid,vehplaca],(err,resbd)=>{  
                      if(err){ 
                          next(new Error(err));
                          console.log("ERROR EN LA CONSULTA");
                      }   
                      else{
                          console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                          res.render('detalles',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
                      }
                  })
              
              
              }

              
        Controller.cate=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
            
            // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
            cnn.query('SELECT * FROM categoria',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                if(err){
                    next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                }
                else{
                    console.log(resbd);
                    res.render('Vendedor',{Datos:resbd}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                }
            
                });
              }


              Controller.Automoviles=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                const a= 1;
                const b= "Automovil";

                console.log(a);
                console.log(b);
             
                // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                cnn.query('SELECT * FROM vehiculo WHERE catid="7"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                    if(err){
                        next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                    }
                    else{
                        console.log(resbd);
                      a;
                      b;
                        res.render('auto',{Datos:resbd,a,b}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                    }
                
                    });
                  }

                  Controller.Camionetas=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                const a=2;
                const b="Camioneta"
             
                    // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                    cnn.query('SELECT * FROM vehiculo WHERE catid="3"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                        if(err){
                            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                        }
                        else{
                            console.log(resbd);
                            res.render('auto',{Datos:resbd,a,b}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                        }
                    
                        });
                      }
                      Controller.Camperos=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                const a=3;
                const b="Camperos";
             
                        // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                        cnn.query('SELECT * FROM vehiculo WHERE catid="8"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                            if(err){
                                next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                            }
                            else{
                                console.log(resbd);
                                res.render('auto',{Datos:resbd,a,b}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                            }
                        
                            });
                          }
                          Controller.Deportivos=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                
             const a=4;
             const b="Deportivos";
                            // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                            cnn.query('SELECT * FROM vehiculo WHERE catid="9"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                                if(err){
                                    next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                                }
                                else{
                                    console.log(resbd);
                                    res.render('auto',{Datos:resbd,a,b}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                                }
                            
                                });
                              }
                              Controller.Bus=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                const a=5;
                const b="Bus";
             
                                // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                                cnn.query('SELECT * FROM vehiculo WHERE catid="2"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                                    if(err){
                                        next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                                    }
                                    else{
                                        console.log(resbd);
                                        res.render('auto',{Datos:resbd,a,b});//SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                                    }
                                
                                    });
                                  }
                                  Controller.Camion=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                const a=6;
                const b="Camion";
             
                                    // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                                    cnn.query('SELECT * FROM vehiculo WHERE catid="5"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                                        if(err){
                                            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                                        }
                                        else{
                                            console.log(resbd);
                                            res.render('auto',{Datos:resbd,a,b}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                                        }
                                    
                                        });
                                      }
                                      Controller.Moto=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                                        const a=6;
                                        const b="Camion";
                                     
                                                            // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
                                                            cnn.query('SELECT * FROM vehiculo WHERE catid="6"',(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                                                                if(err){
                                                                    next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                                                                }
                                                                else{
                                                                    console.log(resbd);
                                                                    res.render('auto',{Datos:resbd,a,b}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                                                                }
                                                            
                                                                });
                                                              }
                                        
                
                                      
                
                
                
                                     
 


                                              Controller.actualizar=async(req,res,next)=>{  
                                                const n=req.body.nn;
                                                  const a=req.body.aa;
                                                                                           const t=req.body.tt;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
                                                                                           const c=req.body.cc;
                                                                                        console.log(n+a+t+c)
                                                                                             
                                                                                           cnn.query('UPDATE datospersonales SET datnombre="'+n+'",datapellido="'+a+'",datelefono="'+t+'",datcorreo="'+c+'" WHERE usuid="'+usuid+'"',async(err,respbb)=>{
                                                                                              
                                                                                               if(err){
                                                                                                   next(new Error(err));
                                                                                       
                                                                                               }else{
                                                                                                  res.send('Se Actualizo con existo');
                                                                                                   res.redirect('Datos');
                                                                                               }
                                                                                       
                                                                                                })
                                                                                           
                                                                                       
      
      
      
      
                                                                                            }


                                                                                            Controller.actualizarrol=async(req,res,next)=>{  
                                                                                               
                                                                                                                                             
                                                                                                                                           cnn.query('UPDATE usuario_rol SET rolid="5" WHERE usuid="'+usuid+'"',async(err,respbb)=>{
                                                                                                                                              
                                                                                                                                               if(err){
                                                                                                                                                   next(new Error(err));
                                                                                                                                       
                                                                                                                                               }else{
                                                                                                                                                  res.send('Se Actualizo con existo');
                                                                                                                                                  
                                                                                                                                               }
                                                                                                                                       
                                                                                                                                                })
                                                                                                                                           
                                                                                                                                       
                                                                                                                                       }                                                                                       

module.exports=Controller;