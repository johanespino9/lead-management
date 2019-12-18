<template>
<div>

<!-- Los que no son ejecutivos no tienen acceso -->
<div v-if="role!='Ejecutivo'">
      <form @submit.prevent="FileUpload()" enctype="multipart/form-data">
        <v-row class="mb-4">
          <v-col cols="20" sm="9" md="80"> 
            <template>
              <v-file-input  label="Subir archivo" v-model="file_upload" outlined dense placeholder="Selecciona un documento .xlsx"></v-file-input>
              <!-- <input type="file" ref="file"> -->
            </template>
          </v-col>
          <v-col cols="20" sm="3" md="80" class="text-center"> 
            <template>
              <v-btn type="submit" x-large color="primary" dark> 
                
                Subir usuarios
                <i class="fas fa-file-upload fa-2x ml-4"></i>
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </form>

        <v-data-table
            :search="search"
            :headers="headers"
            :items="desserts"
            sort-by="userId"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Gestión de Usuarios</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-text-field color="#d69c4f" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                  <v-spacer></v-spacer>
                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="#d69c4f"  style="color: #FAFAFA;" dark class="mb-2" v-on="on">
                       Nuevo Usuario
                      <i class="fas fa-user-plus ml-2"></i>
                    </v-btn>
                  </template>
                  <v-card >
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" v-if="editedIndex>-1">
                            <v-text-field color="#d69c4f" cols="12" disabled  v-if="editedIndex>-1" v-model="editedItem.userId" label="ID"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field color="#d69c4f" id="nombre" :onkeyup="verificarNombre()"  v-model="editedItem.name" label="Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8" >
                            <v-text-field color="#d69c4f" id="apellido" v-model="editedItem.lastName" label="Last Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field color="#d69c4f" id="username" :onkeyup="verificaUsername()" v-model="editedItem.username" label="Username"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="8">
                            <v-text-field color="#d69c4f" v-model="editedItem.email" label="E-mail"></v-text-field>
                          </v-col>
                          <v-col cols="20" sm="6" md="80" class=center>
                                <v-text-field
                                  color="#d69c4f"
                                  v-model="password"
                                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                  :rules="[rules.required, rules.min]"
                                  :type="show1 ? 'text' : 'password'"
                                  name="input-10-1"
                                  label="Password"
                                  hint="At least 8 characters"
                                  counter
                                  @click:append="show1 = !show1"
                                  @focus="vaciaPass"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="20" sm="10" md="80" class=center>
                                <v-combobox color="#d69c4f" @change="getManagers()" v-model="editedItem.role" :items="rol" label="Seleccionar Rol"></v-combobox>
                              </v-col>
                          <v-col v-if="editedItem.role=='Ejecutivo' || editedItem.role == 'Supervisor de Segmento'" cols="20" sm="10" md="80" class=center>
                            <v-combobox color="#d69c4f"  @change="filtraSupervisors()" v-model="editedItem.groupSegment" :items="groupSegment" label="Group Segment"></v-combobox>
                          </v-col>
       
                          <v-col v-if="editedItem.role=='Ejecutivo' || editedItem.role == 'Supervisor de Segmento'" cols="20" sm="10" md="80" class=center>
                            <v-combobox color="#d69c4f" v-model="editedItem.manager" :items="supervisors"  label="Supervisores"></v-combobox>
                          </v-col>
                          <v-col cols="20" sm="10" md="80" class=center><v-switch color="#d69c4f" v-model="editedItem.active" :label="`Activo ${editedItem.active.toString()}`"></v-switch></v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="#d69c4f" text @click="close">Cancel</v-btn>
                      <v-btn color="#d69c4f" text @click="save()">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                edit
              </v-icon>
              <!-- <v-icon
                small
                @click="deleteItem(item)"
              >
                delete
              </v-icon> -->
            </template>
            <!-- <template v-slot:no-data>
              <v-btn color="primary" @click="allItems()">Reset</v-btn>
            </template> -->
          </v-data-table>
    </div>

    <div v-if="role=='Ejecutivo'"> 
      <NotFound/>
    </div>

</div>    
</template>
<script>
import axios from "axios";
import NotFound from './NotFound'
import { mapState, mapActions } from 'vuex';
  export default {
    components:{
      NotFound
    },
    data: () => ({
    role:'',
    msjerror: 'Se eliminó correctamente',
    msjsuccess:'Se guardó correctamente',
    type: 'success',
    dismissSecs: 2,
    dismissCountDown: 0,
    showDismissibleAlert: false,
    dialog: false,
    segments:[],
    order:[],
    headers: [
      {text: 'ID', value: 'userId'},
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Group Segment', value: 'groupSegment' },
      { text: 'Rol', value: 'role' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    rol: ['Ejecutivo', 'Supervisor de Segmento', 'Gerente de ventas', 'Administrador'],
    groupSegment: ['Agencias', 'Corporativo', 'Eventos'],
    supervisors: [],
    managers: [],
    search: "",
    desserts: [],
    editedIndex: -1,
    file_upload: null,
    editedItem: {
      userId: '',
      active: true,
      name: "",
      lastName: '',
      username: '',
      email: '',
      groupSegment: '',
      role: '',
      manager: null,
      password: ''
    },
    defaultItem: {
      userId:'',
      active: false,
      name: "",
      lastName: '',
      username: '',
      email: '',
      username: '',
      groupsegment: '',
      role: '',
      manager: null,
    },
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
    }
  }),

  computed: {
    ...mapState(['Users', 'accessToken', 'linkServer']),
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
    managerId: function (){
      return this.rol.indexOf(this.editedItem.role).toString()
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    
  },
  created() {
    
  },
  mounted() {
    try {
      var usuarios = JSON.parse(localStorage.getItem('usuarios'))
      if(this.desserts.length==0 && usuarios!=null){
        this.desserts = JSON.parse(localStorage.getItem('usuarios'))
      }
      this.verificaPermisos()
    }catch (error){
      console.log('Hubo un error')
    }

  },
  updated() {
    if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
  },

  methods: {
      ...mapActions(['getUsers', 'editUser', 'getSegmentos', 'stateToken']),
      getUser(){
       this.desserts= this.Users
      },
    allItems(){
      this.getUser()
    },
    vaciaPass(){
      this.password=''
    },
   //Agregrar usuarios
   async addUser(){
      const datos = {	
          "active": this.editedItem.active.toString(),
          "email": this.editedItem.email,
          "lastName": this.editedItem.lastName,
          "name": this.editedItem.name,
          "password": this.password,
          "username": this.editedItem.username,
          "manager": this.editedItem.manager,
          "groupSegment": this.editedItem.groupSegment,
          "role": this.editedItem.role
      }
      if(!this.verificarNombre(1) && !this.verificaUsername(1)){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }
        let url = this.linkServer+'/user'
        await axios.post(url, datos, config)
        .then(response => { 
          localStorage.setItem('usuarios', JSON.stringify(response.data))
          this.$store.commit('Users', response.data)
          this.desserts=this.Users
          this.alerts('Se guardó correctamente', 'success')
          this.close()
          return true;
        }).catch(error => {
          this.alerts('Ocurrió un error guardando los datos', 'error')
          console.log('Hubo un error ', error)
          this.close()
        })
      }else{ 
        if(this.verificarNombre(1)){
          toastr.error('El nombre ya se encuentra en uso')
        }
        if(this.verificaUsername(1)){
          toastr.error('El username ya se encuentra en uso')
        }
      }
    }, 
    //Editar usuarios
    async editUser(){
      var datos = {	
          "userId": this.editedItem.userId,
          "active": this.editedItem.active.toString(),
          "email": this.editedItem.email,
          "lastName": this.editedItem.lastName,
          "name": this.editedItem.name,
          "password": this.password,
          "username": this.editedItem.username,
          "manager": this.editedItem.manager,
          "groupSegment": this.editedItem.groupSegment,
          "role": this.editedItem.role
      }
      if(!this.verificarNombre(2) && !this.verificaUsername(2)){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
        }
        }
        let url = this.linkServer+'/user'
        await axios.put(url, datos, config)
        .then(response => {
          localStorage.setItem('usuarios', JSON.stringify(response.data))
          this.$store.commit('Users', response.data)
          this.desserts=this.Users
          this.alerts('Se guardó correctamente', 'success')
          this.close()
        }).catch(error => {
          this.alerts('Ocurrió un error guardando los datos', 'error')
          console.log('Hubo un error ', error)
          this.close()
        })
      }else{
        if(this.verificarNombre(2)){
          toastr.error('El nombre ya se encuentra en uso')
        }
        if(this.verificaUsername(2)){
          toastr.error('El username ya se encuentra en uso')
        }
      }
      
    },

    initialize () {
      this.desserts = []
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.password = this.editedItem.password
      let role = item.role
      if(this.editedIndex >-1){
        if(role == 'Ejecutivo' || role == 'Supervisor de Segmento'){
          this.getManagers()
          
        }
        this.dialog = true
      }
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      if(this.desserts.length< JSON.parse(localStorage.getItem('usuarios'))){
        this.alerts('Se eliminó correctamente', 'error')
      }
      
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {  
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.editUser()
      } else {
        this.addUser()

        /* this.desserts.push(this.editedItem) */
      }
      /* this.close() */
    },
    //Obteniendo Managers
    async getManagers(){
        if(this.editedItem.role=='Ejecutivo' || this.editedItem.role=='Supervisor de Segmento'){
          let config = {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }
        let url = this.linkServer+'/role/'+(this.rol.indexOf(this.editedItem.role)) +'/manager'
        await axios.get(url, config)
        .then((response) => {
          this.supervisors = []
          this.managers = response.data
          for(let i=0; i<response.data.length; i++){
            this.supervisors.push(response.data[i].fullName)
          }
          this.filtraSupervisors() 
        })
        .catch((error) => {
          console.log(error)
          /* localStorage.removeItem('token')
          location.reload(); */
        })
      }
    },
    filtraSupervisors(){
      let gs = this.editedItem.groupSegment
      if(this.editedItem.role == 'Ejecutivo'){
        this.supervisors = []
        
        if(gs == 'Agencias'){
          for(let i=0; i<this.managers.length; i++){
            let gsegment = this.managers[i].groupSegment
            if(gsegment == 'Agencias'){
              this.supervisors.push(this.managers[i].fullName)
            }
          }
        }else if(gs == 'Corporativo'){
          for(let i=0; i<this.managers.length; i++){
            let gsegment = this.managers[i].groupSegment
            if(gsegment == 'Corporativo'){
              this.supervisors.push(this.managers[i].fullName)
            }
          }
        }else{
          for(let i=0; i<this.managers.length; i++){
            let gsegment = this.managers[i].groupSegment
            if(gsegment == 'Eventos'){
              this.supervisors.push(this.managers[i].fullName)
            }
          }
        }
      }
    },
    //UPLOAD USERS DESDE EXCEL
    async FileUpload(){
      let archivo = this.file_upload;
      if(archivo!=null){
        let extension = archivo.name.substring(archivo.name.length-4 ,archivo.name.length).toLowerCase();
        if(extension == 'xlsx'){
            const formData = new FormData();
            formData.append('file', archivo);
            let config = {
              headers: {
                'Authorization': 'Bearer ' + this.accessToken
              }
            }
            let url = this.linkServer+'/file/upload/users'
            await axios.post(url, formData, config)
            .then(response => { 
              this.alerts('Se subió el archivo correctamente', 'success')
              this.file_upload = null
              this.desserts = response.data
              localStorage.setItem('usuarios', JSON.stringify(response.data))
            }).catch(error => {
              this.alerts('El modelo de archivo es erroneo', 'error')
            });
        }else{
          toastr.warning('Debes seleccionar un archivo Excel .xlsx')
        } 
      }else{
        toastr.error('Selecciona un archivo primero')
      }
    },

    Ordenamiento(){
      for(let i=0; i< this.desserts.length; i++){
        this.order.push(i)
      }
    },
    verificaPermisos(){
        this.role = JSON.parse(localStorage.getItem('usuario')).role
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
    verificarNombre(type){
      try {
          let nombre = document.getElementById('nombre').value
          let apellido = document.getElementById('apellido').value
          let nombre_completo = nombre+' '+apellido
          if(type==1){
            for(let i=0; i<this.desserts.length; i++){
              if(nombre_completo.toLowerCase().trim() == (this.desserts[i].name+' '+this.desserts[i].lastName).toLowerCase().trim()){
                return true;
              }
            } 
          }else if(type==2){
            for(let i=0; i<this.desserts.length; i++){
              if(i!=this.editedIndex){
                if(nombre_completo.toLowerCase().trim() == (this.desserts[i].name+' '+this.desserts[i].lastName).toLowerCase().trim()){
                  return true;
                }
              }
            } 
          }
          return false;
  
      } catch (error) { 
      }
    },
    verificaUsername(type){
      try {
          let username = document.getElementById('username').value
          if(type==1){
            for(let i=0; i<this.desserts.length; i++){
              if(username.toLowerCase().trim() == this.desserts[i].username.toLowerCase().trim()){
                return true;
              }
            }
          }else if(type==2){
            for(let i=0; i<this.desserts.length; i++){
              if(i!=this.editedIndex){
                if(username.toLowerCase().trim() == this.desserts[i].username.toLowerCase().trim()){
                  return true;
                }
              }  
            }
          }
          return false; 
      } catch (error) {
        
      }
    } 
  },



  }
</script>