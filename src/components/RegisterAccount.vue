<template>
  <div>
        <v-data-table
              :headers="headers"
              :items="desserts"
              sort-by="phone"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Gestión de Cuentas</v-toolbar-title>
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
                      <v-btn @click="rellenadatos()" color="#d69c4f" dark class="mb-2" v-on="on">Añadir Nueva Cuenta</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <!-- <v-col v-if="editedIndex>-1" cols="12" sm="6" md="12">
                              <v-text-field disabled color="#ff4200" v-model="editedItem.accountId" label="Account Id"></v-text-field>
                            </v-col> -->
                            <v-col cols="12" sm="6" md="12">
                              <v-text-field  color="#d69c4f" v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                              <v-combobox color="#d69c4f" v-model="editedItem.branch" :items="branchs" label="Seleccionar Sector"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                               <v-combobox color="#d69c4f" v-model="editedItem.category" :items="categories" label="Seleccionar Categoría"></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field color="#d69c4f" disabled v-model="editedItem.groupSegment" label="Group Segment"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="#d69c4f" text @click="close">Cancel</v-btn>
                        <v-btn color="#d69c4f" text @click="save">Save</v-btn>
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
</template>
<script>
import { mask } from 'vue-the-mask';
import {mapState, mapActions} from 'vuex'
import axios from 'axios';
  export default {
    directives: {
      mask,
    },
    data: () => ({
    dialog: false,
    select: '',
      headers: [
        /* { text: 'Sector', value: 'accountId' }, */
        {
          text: 'Nombre de Cuenta',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Sector', value: 'branch' },
        { text: 'Categoría', value: 'category' },
        { text: 'Grupo Segmento', value: 'groupSegment' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      search: "",
      desserts: [],
      mask: '####-####-####-####',
      editedIndex: -1,
      gsegment: JSON.parse(localStorage.getItem('usuario')).groupSegment,
      editedItem: {
        accountId: 0,
        name: '',
        branch: '',
        category: '',
        groupSegment: JSON.parse(localStorage.getItem('usuario')).groupSegment,
      },
      defaultItem: {
        name: '',
        branch: '',
        category: '',
        groupsegment: '',
      },
      categories:[],
      branchs:[],
      msjsuccess:'Se guardó correctamente',
      type: 'success',
      dismissCountDown: 0,
      dismissSecs: 2,
    }),

    computed: {
       ...mapState(['Accounts', 'Branchs', 'Categories', 'accessToken']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Cuenta' : 'Editar Nueva Cuenta'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    }, 
   created() {
     try {
       this.$store.dispatch('getCategories')
       this.$store.dispatch('getBranch')
       var cuentas = JSON.parse(localStorage.getItem('accounts'))
       var categories = JSON.parse(localStorage.getItem('categories'))
       var branchs = JSON.parse(localStorage.getItem('branchs'))
       if(this.desserts.length==0 && this.branchs.length==0 && this.categories.length==0){
         this.desserts = cuentas
         this.categories = categories
         this.branchs = branchs
         /* this.gsegment = JSON.parse(localStorage.getItem('usuario')).groupSegment */
         /* this.$store.commit('Accounts', cuentas)
         this.$store.commit('Categories', categories)
         this.$store.commit('Branchs', branchs) */
         /* this.$store.dispatch('getCategories')
         this.$store.dispatch('getGroupSegment')
         this.$store.dispatch('getBranch') */
       }
     } catch (error) {
       console.log('Hubo un error')
     }
   },
   mounted(){

     if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
     }
   },
    methods: {
      ...mapActions(['stateToken']), 
      
      async getAccount(){
        this.desserts = this.Accounts
      },
      allItems(){
        this.getAccount();
      },
    //Agregrar nueva cuenta
    async addAcount(){
      var datos = {	
          "name": this.editedItem.name,
          "category": this.editedItem.category,
          "branch": this.editedItem.branch,
          "groupSegment": this.editedItem.groupSegment
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/accounts'
      await axios.post(url, datos, config)
      .then(response => { 
        localStorage.setItem('accounts', JSON.stringify(response.data))
        this.$store.commit('Accounts', response.data)
        this.desserts=this.Accounts
        this.alerts('Se guardó correctamente', 'success')
      }).catch(error => {
        console.log('Hubo un error ', error)
        this.alerts('Ocurrio un error y no se guardó', 'error')
      })
    }, 

    //Editar cuenta
    async editAccount(){
      var datos = {	
          "accountId": this.editedItem.accountId,
          "name": this.editedItem.name,
          "category": this.editedItem.category,
          "branch": this.editedItem.branch,
          "groupSegment": this.editedItem.groupSegment
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/accounts'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('accounts', JSON.stringify(response.data))
        this.$store.commit('Accounts', response.data)
        this.desserts=this.Accounts
        this.alerts('Se guardó correctamente', 'success')
      }).catch(error => {
        console.log('Hubo un error ', error)
        this.alerts('Ocurrio un error y no se guardó', 'error')
      })
    }, 

      rellenadatos(){
        var user = JSON.parse(localStorage.getItem('usuario'))
        this.editedItem.groupSegment = user.groupSegment
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        if(this.editedIndex>-1){
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        }
        
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
          console.log('se edito')
          this.editAccount()
        } else {
          console.log('se añadio')
          this.addAcount()
        }
        this.close()
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

  }
</script>