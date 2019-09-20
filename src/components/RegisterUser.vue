<template>
<div>
    <b-alert
      :show="dismissCountDown"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <v-alert v-if="type=='error'" icon="mdi-delete" type="info" :v-show="dismissCountDown" >
           {{msjerror}}
      </v-alert>
      <v-alert  v-if="type=='success'" icon="mdi-shield-lock-outline" type="success" :v-show="dismissCountDown">
           {{msjsuccess}}
      </v-alert>
    </b-alert>
        <v-data-table
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
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                  <v-spacer></v-spacer>
                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">ADD NEW USER</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" v-if="editedIndex>-1">
                            <v-text-field cols="12" disabled  v-if="editedIndex>-1" v-model="editedItem.userId" label="ID"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8" >
                            <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="8">
                            <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                          </v-col>
                          <v-col cols="20" sm="6" md="80" class=center>
                                <v-text-field
                                  v-model="password"
                                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                  :rules="[rules.required, rules.min]"
                                  :type="show1 ? 'text' : 'password'"
                                  name="input-10-1"
                                  label="Password"
                                  hint="At least 8 characters"
                                  counter
                                  @click:append="show1 = !show1"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="20" sm="10" md="80" class=center>
                                <v-combobox v-model="editedItem.role" :items="rol" label="Seleccionar Rol"></v-combobox>
                                {{rol.indexOf(editedItem.role)}}
                              </v-col>
                          <v-col cols="20" sm="10" md="80" class=center>
                            <v-combobox v-model="editedItem.groupSegment" :items="groupSegment" label="Group Segment"></v-combobox>
                          </v-col>
                          <v-col cols="20" sm="10" md="80" class=center>
                            <v-combobox v-model="editedItem.manager" :items="supervisors" @focus="getManager" label="Supervisores"></v-combobox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
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
              <v-icon
                small
                @click="deleteItem(item)"
              >
                delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="allItems()">Reset</v-btn>
            </template>
          </v-data-table>
    </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex';
  export default {
    data: () => ({
    msjerror: 'Se eliminó correctamente',
    msjsuccess:'Se guardó correctamente',
    type: 'success',
    dismissSecs: 2,
    dismissCountDown: 0,
    showDismissibleAlert: false,

    dialog: false,
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
    search: "",
    desserts: [],
    editedIndex: -1,
    editedItem: {
      userId: '',
      name: "",
      lastName: '',
      username: '',
      email: '',
      groupSegment: '',
      role: '',
      manager: null
    },
    defaultItem: {
      userId:'',
      name: "",
      lastName: '',
      username: '',
      email: '',
      username: '',
      groupsegment: '',
      role: '',
      manager: null
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
    ...mapState(['Users', 'accessToken']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    managerId: function (){
      console.log(this.rol.indexOf(this.editedItem.role).toString())
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

  beforeMount() {
    /* this.getManager(); */
  },

  mounted() {
    this.$store.dispatch('getUsers')
  },
  created () {
    /* this.$store.dispatch('getUsers') */
    this.getUser()
    /* this.getManager() */
    /* this.initialize() */
  },
  methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }, 


    ...mapActions(['getUsers', 'editUser']),
    getUser(){
      console.log(this.Users)
      this.desserts= this.Users
    },
    allItems(){
      this.getUser()
    },
    async getManager(){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      // Supersivor = 1 +1 = 2
      //let id = this.rol.indexOf(this.editedItem.role).toString()
      //console.log('SIN + 1', id)
      console.log(this.managerId)
      let url = 'https://casa-andina.azurewebsites.net/user/manager/role/'+this.managerId
      //console.log('ID',id)
      console.log('URL', url)
      await axios.get(url, config)
      .then((response) => {
        console.log(response.data)
        this.supervisors = response.data
      })
      .catch((error) => {
        console.log(error)
        
      })
    },

   async addUser(){
      var datos = {	
          "active": true,
          "email": this.editedItem.email,
          "lastName": this.editedItem.lastName,
          "name": this.editedItem.name,
          "password": this.password,
          "username": this.editedItem.username,
          "manager": this.editedItem.manager,
          "groupSegment": this.editedItem.groupSegment,
          "role": this.editedItem.role
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user'
      await axios.post(url, datos, config)
      .then(response => { 
        console.log(response.data)
        this.Users.push(datos)
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    }, 

    async editUser(){
      var datos = {	
          "userId": this.editedItem.userId,
          "active": true,
          "email": this.editedItem.email,
          "lastName": this.editedItem.lastName,
          "name": this.editedItem.name,
          "password": this.password,
          "username": this.editedItem.username,
          "manager": this.editedItem.manager,
          "groupSegment": this.editedItem.groupSegment,
          "role": this.editedItem.role
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user'
      await axios.put(url, datos, config)
      .then(response => { 
        console.log(response.data)
        this.Users.splice(this.editedIndex, datos)
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },

    initialize () {
      this.desserts = []
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      this.type='error'
      this.showAlert()
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
        console.log('se edito') 
        this.editUser()
        this.type='success'
        this.showAlert()
      } else {
        this.addUser()
        this.close();
        this.type='success'
        this.showAlert()
        /* this.desserts.push(this.editedItem) */
      }
      this.close()
    },

    

  }
  }
</script>