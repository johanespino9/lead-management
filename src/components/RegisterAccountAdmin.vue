<template>
<div>
  <div>
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
              <v-btn type="submit" x-large color="primary" dark >
                Subir Cuentas
                <i class="fas fa-file-upload fa-2x ml-4"></i>
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </form>

        <v-container fluid class="mb-0 pb-0 mt-0 pt-0">
                      <v-card id="card" style="border-radius: 0px;">
                          <v-card-title >
                              <v-row>
                                  <v-col class="text-left mt-5" cols="20" sm="3" md="80">
                                    <p style="font-size: 22px;"><span>Gestión de Cuentas</span></p>
                                  </v-col>
                                  <v-col cols="20" sm="4" md="80">
                                    <v-text-field color="#d69c4f" v-model="search" append-icon="search" label="Búsqueda" ></v-text-field>
                                  </v-col>
                                  <v-col cols="20" sm="3" md="80">
                                    <v-combobox @change="FiltraCuentas()" color="#d69c4f"  class="text-xs-center"   v-model="filtroSelected" :items="filtro" label="Selecciona un elemento"></v-combobox>
                                  </v-col>
                                  <v-col class="text-center mt-3" cols="20" sm="2" md="80">
                                        <v-btn @click="rellenadatos()" color="#d69c4f" dark class="btn-block">
                                          Nueva Cuenta
                                           <i class="fas fa-plus-circle  ml-2"></i>
                                        </v-btn> 
                                  </v-col>
                              </v-row>
                          </v-card-title>
                </v-card>
        </v-container>
        <v-container fluid>
        <v-data-table
              :search="search"
              :headers="headers"
              :items="desserts"
              sort-by="phone"
              class="elevation-1 mt-0"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              
              @page-count="pageCount = $event"
            >
            
              <template v-slot:top>
                  
                
                     <!-- <v-toolbar-title>Gestión de Cuentas</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-text-field color="#d69c4f" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-combobox @change="FiltraCuentas()" color="#d69c4f"  class="text-xs-center" single-line hide-details  v-model="filtroSelected" :items="filtro" label="Selecciona un elemento"></v-combobox>
                        <v-spacer></v-spacer> 
                  <div class="flex-grow-1"></div> -->

                  <v-dialog v-model="dialog" max-width="500px">
                    <!-- <template v-slot:activator="{ on }">
                      <v-btn @click="rellenadatos()" color="#d69c4f" dark class="mb-2" v-on="on">Nueva Cuenta</v-btn>
                    </template> -->
                      <!-- CARD ADD AND EDIT -->
                    
                        
                    
                    
                      <v-card class="mt-0 pt-0">
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <!-- <v-col v-if="editedIndex>-1" cols="12" sm="6" md="12">
                              <v-text-field disabled color="#ff4200" v-model="editedItem.accountId" label="Account Id"></v-text-field>
                            </v-col> -->
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field v-if="editedIndex>=0  &&  editedItem.edit==false && role=='Ejecutivo'" id="globalId" required disabled color="#d69c4f" v-model="editedItem.globalId" label="ID Global"></v-text-field>
                              <v-text-field v-else required color="#d69c4f" id="globalId" v-model="editedItem.globalId" label="ID Global"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field v-if="editedIndex>=0  &&  editedItem.edit==false && role=='Ejecutivo'" id="name-id" required disabled color="#d69c4f" v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                              <v-text-field v-else required color="#d69c4f" id="name-account" v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field v-if="editedIndex>=0  &&  editedItem.edit==false && role=='Ejecutivo'" id="ruc" required disabled color="#d69c4f" v-mask="mask" v-model="editedItem.ruc" label="RUC"></v-text-field>
                              <v-text-field v-else required color="#d69c4f" id="ruc" v-mask="mask" v-model="editedItem.ruc" label="RUC"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                              <v-combobox color="#d69c4f" id="sector-id" required v-if="editedIndex>=0  && editedItem.edit==false && role=='Ejecutivo'" disabled v-model="editedItem.branch" :items="branchs" label="Seleccionar Sector"></v-combobox>
                              <v-combobox color="#d69c4f" id="sector-id" required v-else v-model="editedItem.branch" :items="branchs" label="Seleccionar Sector"></v-combobox>
                            </v-col>

                            <v-col cols="auto">
                              <v-combobox color="#d69c4f" required v-if="editedIndex>=0  && editedItem.edit==false && role=='Ejecutivo'" id="category-id" disabled v-model="editedItem.category" :items="categories" label="Seleccionar Categoria"></v-combobox>
                              <v-combobox color="#d69c4f" required v-else  v-model="editedItem.category" id="category-id" :items="categories" label="Seleccionar Categoria"></v-combobox>
                            </v-col>

                            <v-col cols="auto" v-if="role=='Administrador'" >
                               <v-combobox color="#d69c4f" @change="cambiaGS()"  v-model="editedItem.user"  :items="misEjecutivos" label="Seleccionar Ejecutivo"></v-combobox>
                            </v-col>
                            
                            <v-col v-if="role == 'Administrador'" cols="12" sm="6" md="6"> 
                             <v-text-field  id="name-id" required disabled color="#d69c4f" v-model="editedItem.groupSegment" label="Group Segment"></v-text-field>
                            </v-col>

                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="#d69c4f" text @click="close">Cancel</v-btn>
                        <v-btn v-if="editedIndex==-1 || editedItem.edit == true " color="#d69c4f" text @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                
              </template> 

              <template v-slot:item.edit="{ item }">
                <!-- <v-chip :color="getEstado(item.edit)" dark>{{ item.edit }}</v-chip>
                <v-chip v-if="item.edit == true" :color="getEstado(item.edit)" dark>Puedes editar</v-chip> -->

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon  v-on="on" small class="mr-2" @click="editItem(item)">edit</v-icon>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </template>
    </v-data-table>
    </v-container>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

  </div>
  <div v-if="role != 'Administrador'">
      <NotFound />
  </div>

</div>
</template>
<script>
import { mask } from 'vue-the-mask';
import NotFound from '../components/NotFound';
import {mapState, mapActions} from 'vuex';
import axios from 'axios';
  export default {
    components:{
        NotFound
    },
    directives: {
      mask,
    },
    data: () => ({
    dialog: false,
    select: '',
      headers: [
        { text: 'ID', value: 'accountId' },
        { text: 'ID Global', value: 'globalId' },
        {
          text: 'Nombre de Cuenta',
          align: 'left',
          value: 'name',
        },
        { text: 'Ruc', value: 'ruc' },
        { text: 'Sector', value: 'branch' },
        { text: 'Categoría', value: 'category' },
        { text: 'Grupo Segmento', value: 'groupSegment' },
        { text: 'Actions', value: 'edit' },
        /* { text: 'Actions', value: 'action', sortable: false }, */
      ],
      search: "",
      desserts: [],
      mask: '###########',
      editedIndex: -1,
      gsegment: JSON.parse(localStorage.getItem('usuario')).groupSegment,
      editedItem: {
        accountId: 0,
        name: '',
        branch: '',
        category: '',
        groupSegment: JSON.parse(localStorage.getItem('usuario')).groupSegment,
        edit: false,
        user: '',
        ruc: '',
        globalId: ''
      },
      defaultItem: {
        name: '',
        branch: '',
        category: '',
        groupsegment: '',
        user: '',
        ruc: '',
        globalId: ''
      },
      categories:[],
      branchs:[],
      msjsuccess:'Se guardó correctamente',
      type: 'success',
      dismissCountDown: 0,
      dismissSecs: 2,
      role: '',
      misEjecutivos: [],
      gruposDeUsuarios:[],
      groupSegmentSelected: '',
      ejecutivoSelected: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      filtro: [],
      filtroSelected: 'Todas las cuentas',
      cuentasTemporal: [],
      file_upload: null,
      positionEdit: null
    }),

    computed: {
       ...mapState(['Accounts', 'Branchs', 'Categories', 'accessToken', 'linkServer']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Cuenta' : 'Detalles de Cuenta'
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
         this.cuentasTemporal = cuentas
         this.categories = categories
         this.branchs = branchs
         this.verificaPermisos()
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
     this.verificaPermisos()
     this.cargarFiltro()
     this.getEjecutivos()
     if(this.role == 'Supervisor de Segmento'){
       this.getAccountsEjecutivos()
     }
     if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
     }
     window.scrollTo(500, 0);
   },
    methods: {
      ...mapActions(['stateToken']), 
      
      async getAccount(){
        this.desserts = this.Accounts
      },
      allItems(){
        this.getAccount();
      },
      getEstado(value) {
        if (value == true) return 'red'
        else return 'green'
      },
    

    

    /* CRUD CUENTAS JEFES */
    async getEjecutivos(){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = this.linkServer+'/user/ejecutivos/all'
      await axios.get(url, config)
      .then(response => { 
        this.getNameEjecutivos(response.data)
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },

    async  getAccountsEjecutivos(){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = this.linkServer+'/account/jefes'
      await axios.get(url, config)
      .then(response => { 
        this.desserts = response.data
        this.cuentasTemporal = response.data
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },

    async addAcountJefes(){
      let datos = {	
          "name": this.editedItem.name,
          "category": this.editedItem.category,
          "branch": this.editedItem.branch,
          "groupSegment": this.editedItem.groupSegment,
          "user": this.editedItem.user,
          "ruc": parseInt(this.editedItem.ruc),
          "globalId": this.editedItem.globalId
      }
      
      if(!this.verificarRuc(1) && !this.verificarNombre(1) && !this.verificarGlobalId(1)){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }
        let url = this.linkServer+'/account/jefes'
        await axios.post(url, datos, config)
        .then(response => { 
          localStorage.setItem('accounts', JSON.stringify(response.data))
          this.$store.commit('Accounts', response.data)
          this.desserts=this.Accounts
          this.FiltrarCuentas(response.data)
          this.alerts('Se guardó correctamente', 'success')
          this.close()
        }).catch(error => {
          console.log('Hubo un error ', error)
          this.alerts('Ocurrio un error y no se guardó', 'error')
          this.close()
        });
      }else{
        if(this.verificarNombre(1)){
          toastr.error('Ya existe una cuenta con el mismo nombre')
        } 
        if(this.verificarRuc(1)){
          toastr.error('Ya existe una cuenta con el mismo N° de Ruc')
        }
        if(this.verificarGlobalId(1)){
          toastr.error('Ya existe una cuenta con el mismo Global ID')
        }
      }
    }, 
    async editAccountJefes(){
      let datos = {	
          "accountId": this.editedItem.accountId,
          "name": this.editedItem.name,
          "category": this.editedItem.category,
          "branch": this.editedItem.branch,
          "groupSegment": this.editedItem.groupSegment,
          "user": this.editedItem.user,
          "ruc": parseInt(this.editedItem.ruc),
          "globalId": this.editedItem.globalId
      }
      if(!this.verificarNombre(2) && !this.verificarRuc(2) && !this.verificarGlobalId(2)){
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }
        let url = this.linkServer+'/account/jefes'
        await axios.put(url, datos, config)
        .then(response => {
          localStorage.setItem('accounts', JSON.stringify(response.data))
          this.$store.commit('Accounts', response.data)
          this.desserts=this.Accounts
          this.FiltrarCuentas(response.data)
          this.alerts('Se guardó correctamente', 'success')
          this.close()
        }).catch(error => {
          console.log('Hubo un error ', error)
          this.alerts('Ocurrio un error y no se guardó', 'error')
          this.close()
        }); 
      }else{
        if(this.verificarNombre(2)){
          toastr.error('Ya existe una cuenta con el mismo nombre')
        } 
        if(this.verificarRuc(2)){
          toastr.error('Ya existe una cuenta con el mismo N° de Ruc')
        }
        if(this.verificarGlobalId(2)){
          toastr.error('Ya existe una cuenta con el mismo Global ID')
        }
      }
      
    }, 



    /* RECURSIVIDAD */
    getNameEjecutivos(data){
      for(let i= 0; i < data.length; i++){
        this.misEjecutivos.push(data[i].name)
        this.gruposDeUsuarios.push(data[i].groupSegment)
      }  
    },
    cambiaGS(){
      let pos = this.misEjecutivos.indexOf(this.editedItem.user)
      this.editedItem.groupSegment = this.gruposDeUsuarios[pos]
    },
    
    cargarFiltro(){
      if(this.role=='Administrador'){
        this.filtro = ['Todas las cuentas', 'Corporativo', 'Agencias', 'Eventos']
      }
    },
    FiltraCuentas(){
      this.desserts = []
      let filtro = this.filtroSelected
      let cuentas = this.cuentasTemporal
      if(filtro == 'Todas las cuentas'){
        this.desserts = cuentas
      }/* else if(filtro == 'Mis cuentas'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].edit == true){
            this.desserts.push(cuentas[i])
          }    
        }
      } */
      else if(filtro == 'Agencias'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].groupSegment == 'Agencias'){
            this.desserts.push(cuentas[i])
          }    
        }
      }else if(filtro == 'Corporativo'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].groupSegment == 'Corporativo'){
            this.desserts.push(cuentas[i])
          }    
        }
      }else if(filtro == 'Eventos'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].groupSegment == 'Eventos'){
            this.desserts.push(cuentas[i])
          }    
        }
      }/* else{
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].edit == true){
            this.desserts.push(cuentas[i])
          }    
        }
      } */
      
    },
    FiltrarCuentas(data){
      this.desserts = []
      let filtro = this.filtroSelected
      let cuentas = data
      if(filtro == 'Todas las cuentas'){
        this.desserts = cuentas
      }/* else if(filtro == 'Mis cuentas'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].edit == true){
            this.desserts.push(cuentas[i])
          }    
        }
      } */
      else if(filtro == 'Agencias'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].groupSegment == 'Agencias'){
            this.desserts.push(cuentas[i])
          }    
        }
      }else if(filtro == 'Corporativo'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].groupSegment == 'Corporativo'){
            this.desserts.push(cuentas[i])
          }    
        }
      }else if(filtro == 'Eventos'){
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].groupSegment == 'Eventos'){
            this.desserts.push(cuentas[i])
          }    
        }
      }/* else{
        this.desserts = []
        for(let i=0; i<cuentas.length; i++){
          if(cuentas[i].edit == true){
            this.desserts.push(cuentas[i])
          }    
        }
      } */
      
    },
    //subir varias cuentas a la vez con excel
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
                let url = this.linkServer+'/file/upload/accounts'
                await axios.post(url, formData, config)
                .then(response => { 
                  toastr.success('Se subió el archivo correctamente')
                  this.file_upload = null
                  localStorage.setItem('accounts', JSON.stringify(response.data))
                  this.desserts = response.data
                }).catch(error => {
                  toastr.error('El modelo de archivo es erroneo')
                });
          }else{
              toastr.warning('Debes seleccionar un archivo Excel .xlsx')
          } 
        }else{
            toastr.error('Selecciona un archivo primero')
        }
    },

      rellenadatos(){
        this.dialog = true
        var user = JSON.parse(localStorage.getItem('usuario'))
        this.editedItem.groupSegment = user.groupSegment
        this.editedIndex = -1 
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        item.edit = true
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
            this.editAccountJefes()
            
        } else {
            this.addAcountJefes()
            /* if(!this.verificarNombre()){
              this.close()
            } */
        }
        
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
    verificaPermisos(){
      this.role = JSON.parse(localStorage.getItem('usuario')).role
    },
    verificarNombre(type){
          try {
              let nombre = (document.getElementById('name-account').value).trim()
              if(type==1){//añadir
                for(let i=0; i<this.desserts.length; i++){
                  if(nombre.toLowerCase() == (this.desserts[i].name.toLowerCase()).trim()){
                    return true;
                  }
                } 
              }else if(type==2){//editar
                for(let i=0; i<this.desserts.length; i++){
                  if(i!=this.editedIndex){
                    if(nombre.toLowerCase() == (this.desserts[i].name.toLowerCase()).trim()){
                      return true;
                    }
                  }
                }
              }

              return false;
          } catch (error) { 
          }
    },
    verificarRuc(type){
      try {
          let ruc = (document.getElementById('ruc').value)
          if(type==1){//añadir
            for(let i=0; i<this.desserts.length; i++){
              if(ruc == this.desserts[i].ruc){
                return true;
              }
            } 
          }else if(type==2){//editar
            for(let i=0; i<this.desserts.length; i++){
              if(i!=this.editedIndex){
                if(ruc == this.desserts[i].ruc){
                  return true;
                }
              }
            }
          }
          return false;
  
      } catch (error) { 
      }
    },
    verificarGlobalId(type){
      try {
          let id = (document.getElementById('globalId').value)
          if(type == 1){//Añadir
            for(let i=0; i<this.desserts.length; i++){
              if(id.trim().toLowerCase() == this.desserts[i].globalId.trim().toLowerCase()){
                return true;
              }
            } 
          }else if(type==2){//editar
            for(let i=0; i<this.desserts.length; i++){
              if(i!=this.editedIndex){
                if(id.trim().toLowerCase() == this.desserts[i].globalId.trim().toLowerCase()){
                  return true;
                }
              }
            }
          }
          
          return false;
      } catch (error) { 
      }
    },
  
    
  },

  }
</script>
<style >
    #card{
        border-radius: 0px;
    }
</style>