<template>
  <div>  
    <div>
         <v-card> 
              <v-container>
                <v-row>
                    <v-col cols="12" md="3" sm="80">
                        <v-layout column align-center>
                        <v-flex class="mt-5">
                          <v-avatar size="200">
                            <img
                              src="https://github.com/github.png?size=300"
                              alt="Cucho"
                            >
                          </v-avatar>
                        </v-flex>
                      </v-layout>
                    </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="group"
                            ref="groupsegment"
                            v-model="user.groupSegment"
                            label="Grupo de Segmento"
                            disabled=""
                            placeholder=""
                        ></v-text-field>
                        <v-text-field
                            color="#d69c4f" 
                            prepend-icon="account_circle"
                            ref="jefe"
                            v-model="user.manager"
                            label="Manager"
                            disabled=""
                            placeholder=""
                        ></v-text-field>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="account_circle"
                            ref="role"
                            v-model="user.role"
                            label="Rol"
                            placeholder=""
                            disabled=""
                        ></v-text-field>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="account_circle"
                            ref="email"
                            v-model="user.username"
                            label="Username"
                            placeholder=""
                            disabled=""
                    ></v-text-field>
                  </v-col>

                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="account_circle"
                            ref="id"
                            v-model="user.userId"
                            label="ID Usuario"
                            placeholder=""
                            disabled
                    ></v-text-field>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="email"
                            ref="email"
                            v-model="user.email"
                            label="E-mail"
                            placeholder=""
                    ></v-text-field>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="account_circle"
                            ref="name"
                            v-model="user.name"
                            label="Nombres"
                            placeholder=""  
                    ></v-text-field>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon="account_circle"
                            ref="lastname"
                            v-model="user.lastName"
                            label="Apellidos"
                            placeholder=""
                    ></v-text-field>
                    </v-col>

                    <v-col cols="20" sm="3" md="80" class=center>
                    <v-text-field
                            color="#d69c4f" 
                            prepend-icon=""
                            ref="active"
                            v-model="estado"
                            label="Estado Actual"
                            placeholder=""
                            disabled
                    ></v-text-field>
                    <v-text-field
                      color="#d69c4f"
                      v-model="user.password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      hint="Se recomienda 8 caracteres"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    </v-col> 
                </v-row>
              </v-container>
            <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="#d69c4f" text @click="editUser()">Guardar cambios</v-btn>
         </v-card-actions>
        </v-card>
  <!--   </v-dialog> -->
  </div>
  
</div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
    data: () => ({
      estado:'',
      user:{
        userId: 0,
        username: '',
        active: true,
        email: '',
        groupSegment: '',
        name: '',
        lastName: '',
        manager: '',
        password: '',
        role: ''
      },
      show1: false,
      msjsuccess:'Se guardó correctamente',
      type: 'success',
      dismissCountDown: 0,
      dismissSecs: 2,
    }),
    computed: {
      ...mapState(['User','accessToken']), 
    },
    mounted() {
      /* this.$store.dispatch('getDashJefes') */

      this.user = JSON.parse(localStorage.getItem('usuario'))
      if(this.user.active== true){
        this.estado='Activo'
      }else{
        this.estado='Inactivo'
      }
    },
    //METHODS
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }, 
      async editUser(){
        var datos = {	
          "userId": this.user.userId,
          "active": this.user.active,
          "email": this.user.email,
          "lastName": this.user.lastName,
          "name": this.user.name,
          "password": this.user.password,
          "username": this.user.username,
          "manager": this.user.manager,
          "groupSegment": this.user.groupSegment,
          "role": this.user.role,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/'+this.user.userId
      await axios.put(url, datos, config)
      .then(response => { 
        this.$store.commit('Users', response.data)
        for(let i=0; i<response.data.length; i++){
          if(response.data[i].userId==this.user.userId){
            localStorage.setItem('usuario', JSON.stringify(response.data[i]))
            this.$store.commit('User', response.data[i])
            this.user=this.User
          }
        }
        this.alerts('Se guardó correctamente', 'success')
      }).catch(error => {
        this.alerts('Ocurrió un error y no se guardó', 'error')
        console.log('Hubo un error ', error)
      })
      },
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


    },
    
    updated() {
    if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
   },

}
</script>