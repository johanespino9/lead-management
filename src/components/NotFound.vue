<template>
<div class="todo" id="todo">

    <div class="contenedor">
        <div class="text-wrapper">
            <div class="hit-the-floor">
                404
            </div>
            <div class="subtitle">
                Oops, pagina no encontrada.
            </div>
            <br>
            <div class="buttons">
                <a class="button" @click="irAlInicio" >Volver al inicio</a>
            </div>
        </div> 

    </div>

</div>
</template> 
<script>
export default {
    data() {
        return {
         Colors:[
             'dark',
             'blue-grey darken-2',
         ],
        cycle: true,
        model: 0,
        }
    },
    methods:{
        irAlInicio(){
            let role = JSON.parse(localStorage.getItem('usuario')).role
            if(role=='Ejecutivo'){
                /* window.location.href = '/dashboard-ejecutivos' */
               this.$router.push("/dashboard-ejecutivos"); 
            }else if(role == 'Supervisor de Segmento'){
                /* window.location.href = '/dashboard_jefes' */
                this.$router.push("/dashboard_jefes");
            }else{
                this.$router.push("/dashboard_gerentes");
            }
        }
    }

}
</script>
<style >

@import url(https://fonts.googleapis.com/css?family=Raleway:700);


*, *:before, *:after {
  box-sizing: border-box;
}
#todo {
    height: 850px;
}
.contenedor {
    background: url('../assets/notfound.gif') no-repeat center center fixed; 
    background-size: cover;
    font-family: 'Raleway', sans-serif;
    background-color: #342643; 
    height: 100%;
}

.text-wrapper {
    height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}

.title > p{
    font-size: 100px;
    font-weight: 700;
    color: #d69c4f;
}

.subtitle {
color: #d69c4f;
font-size: 3em;
font-weight: bold;
font-family: Helvetica;
text-shadow: 0 1px 0 #d69c4f, 0 2px 0 #000000, 0 3px 0 #bbb000, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(51, 47, 47, 0.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
}

.buttons {
    margin: 30px;
    
    

    
}
a.button {
        font-weight: 700;
        border: 2px solid #d69c4f;
        text-decoration: none;
        padding: 15px;
        text-transform: uppercase;
        color: #EE4B5E;
        border-radius: 26px;
        transition: all 0.2s ease-in-out;
        text-shadow: 0 1px 0 #000000;
       
    }
 .buttons :hover {
            background-color: #d69c4f;
            color: white;
            transition: all 0.2s ease-in-out;
}
.hit-the-floor {
color: #d69c4f;
font-size: 10em;
font-weight: bold;
font-family: Helvetica;
text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
}
.hit-the-floor {
  text-align: center;
}



</style>