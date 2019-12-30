<template>
    <div class="todo" id="todo">
        <div class="text-wrapper">
            <div class="subtitle">
                Se acaba de Vincular con Office 365
            </div>
            <br>
            <div class="buttons">
                <a class="button" @click="irAlInicio()" >Volver al inicio</a>
            </div>
        </div> 

    

</div>
</template>

<script>
import router from 'vue-router'
import axios from "axios"
import { mapState, mapActions } from 'vuex';

export default {
    data: () => ({
        code:'',

        token_ms:JSON.parse(localStorage.getItem('token_ms')),
        razones: ['Mantenimiento', 'Negociacion', 'Capacitacion', 'Reclamo', 'Ferias', 'Door to door','Prospección', 'Otros'],
    }),
    mounted() {
        this.code=this.$route.query.code
        console.log(this.code)
        if(this.token_ms==null){
            this.obtenerToken()
        }
    },
    computed: {
    ...mapState(['accessToken','linkServer']),
    },
    methods: {
        alerts(msj, type){
        const msje = msj
            if(type == 'success'){
              toastr.success(msje, {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
            })
            }else{
              toastr.error(msje, {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
            })
            }
    },
        async obtenerToken(){
            let config = {
                headers: {
                'Authorization': 'Bearer ' + this.accessToken
                }
            }
            let url = this.linkServer+'/microsoft/token'
            await axios.post(url, this.code, config)
            .then((res) => {
                localStorage.setItem('token_ms', JSON.stringify(res.data))
                this.getVisitsMS()
            })
            .catch((error) => {
                console.log(error)
                this.$router.push("/authorization_error")
                this.alerts('Ocurrió un error generando el Token')
            })
        },
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
        },
        async getVisitsMS(){
            let array = []
            var token_ms=JSON.parse(localStorage.getItem('token_ms'))
            let accounts=JSON.parse(localStorage.getItem('accounts'))
            let visitas=JSON.parse(localStorage.getItem('visitas'))
            let config = {
                headers: {
                'Authorization': 'Bearer ' + this.accessToken
                }
            }
            let url = this.linkServer+'/microsoft/get_event'
            let fec = new Date()
            let visitascalendar=visitas.calendar.listVisit
            let year = fec.getFullYear()
            let datos= {
                "year": year,
                "token":token_ms.access_token
            }
            await axios.post(url, datos, config)
            .then((res) => {
                let visitasMS=res.data.value
                for(let i=0; i<visitasMS.length; i++){
                    var date1=new Date(visitasMS[i].start.dateTime)
                    var date2=new Date(visitasMS[i].end.dateTime)
                    var initialdate=this.convertDate(date1)
                    var finaldate=this.convertDate(date2)
                    array.push({
                        id: '',
                        user: '',
                        name: visitasMS[i].subject+'<br>'+ visitasMS[i].location.displayName,
                        description: '',
                        start: initialdate,
                        end: finaldate,
                        account: visitasMS[i].location.displayName,
                        edit: false,
                        status: '',
                        reason: visitasMS[i].subject,
                        color: '#077cd2',
                    })
                }
                for(let i=0; i<array.length; i++){
                    for(let j=0; j<visitascalendar.length; j++){
                        if(array[i].reason==visitascalendar[j].reason&&array[i].account==visitascalendar[j].account&&array[i].start==visitascalendar[j].start&&array[i].end==visitascalendar[j].finish){
                            array.splice(i,1,{
                            id: visitascalendar[j].visitId,
                            user: visitascalendar[j].user,
                            name: visitascalendar[j].reason+'<br>'+ visitascalendar[j].account,
                            description: visitascalendar[j].description,
                            start: visitascalendar[j].start.toString(),
                            end: visitascalendar[j].finish.toString(),
                            account: visitascalendar[j].account,
                            edit: visitascalendar[j].edit,
                            status: visitascalendar[j].status,
                            reason: visitascalendar[j].reason,
                            color: '#d69c4f',
                            })
                            visitascalendar.splice(j,1)
                            j--
                        }   
                    }
                }
                for(let j=0; j<visitascalendar.length; j++){
                    array.push({
                        id: visitascalendar[j].visitId,
                        user: visitascalendar[j].user,
                        name: visitascalendar[j].reason+'<br>'+ visitascalendar[j].account,
                        description: visitascalendar[j].description,
                        start: visitascalendar[j].start.toString(),
                        end: visitascalendar[j].finish.toString(),
                        account: visitascalendar[j].account,
                        edit: visitascalendar[j].edit,
                        status: visitascalendar[j].status,
                        reason: visitascalendar[j].reason,
                        color: '#d69c4f',
                    })
                }

                localStorage.setItem('visitas2', JSON.stringify(array))
                console.log(array)
            })
            .catch((error) => {
                console.log(error)
                this.alerts('Ocurrió un error al obtener los Eventos')
            })
      
        },
        convertDate(date){
        var day=''
        var month=''
        var year=''
        var hour=''
        var min=''
        if(date.getDate()<10){
            day='0'+date.getDate().toString()
        }else{
            day=date.getDate().toString()
        }
        if(date.getMonth()<10){
            var x=date.getMonth()+1
            month='0'+x.toString()
        }else{
            var x=date.getMonth()+1
            month=x.toString()
        }   
        if(date.getFullYear()<10){
            year='0'+date.getFullYear().toString()
        }else{
            year=date.getFullYear().toString()
        }  
        if(date.getHours()<10){
            hour='0'+date.getHours().toString()
        }else{
            hour=date.getHours().toString()
        }    
        if(date.getMinutes()<10){
            min='0'+date.getMinutes().toString()
        }else{
            min=date.getMinutes().toString()
        }                   
        var initialdate= year+'-'+month+'-'+day+' '+hour+':'+min        
        return initialdate;
    },       
    },
                 

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
    background-size: cover;
    font-family: 'Raleway', sans-serif;
    background-color: #342643; 
    height: 100%;
}

.text-wrapper {
vertical-align: top;
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