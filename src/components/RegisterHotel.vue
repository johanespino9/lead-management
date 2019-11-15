<template>
    <div>
        <div v-if="role == 'Administrador'">
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
              <v-btn type="submit" x-large color="primary" dark>Subir Hoteles</v-btn>
            </template>
          </v-col>
        </v-row>
      </form>
        <v-data-table
              :search="search"
              :headers="headers"
              :items="desserts"
              sort-by="phone"
              class="elevation-1"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              
              @page-count="pageCount = $event"
            >
            
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Gestión de Hoteles</v-toolbar-title>
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
                      <v-btn @click="vaciaDatos()" color="#d69c4f" dark class="mb-2" v-on="on">Añadir Nuevo Hotel</v-btn>
                    </template>
                      <!-- CARD ADD AND EDIT -->
                      <v-card >
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        <!-- <v-container><span class="headline">{{ formTitle }}</span></v-container> -->
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <!-- <v-col v-if="editedIndex>-1" cols="12" sm="6" md="12">
                              <v-text-field disabled color="#ff4200" v-model="editedItem.accountId" label="Account Id"></v-text-field>
                            </v-col> -->
                            <v-col cols="20" sm="12" md="80">
                              <v-text-field v-if="role=='Administrador'" id="name-id"   color="#d69c4f" v-model="editedItem.shortName" label="Nombre del Hotel"></v-text-field>
                            </v-col>
                            <v-col cols="20" sm="8" md="80">
                              <v-combobox color="#d69c4f"  v-if="role=='Administrador'" id="category-id"  v-model="editedItem.typeHotel" :items="types" label="Seleccionar Categoria"></v-combobox>
                            </v-col>
                            <v-col cols="20" sm="8" md="80">
                              <v-combobox color="#d69c4f" id="sector-id"  v-if="role=='Administrador'"  v-model="editedItem.region" :items="regions" label="Seleccionar Region"></v-combobox>
                  
                            </v-col>

                            

                            <!-- <v-col cols="auto" v-if="role=='Administrador'" >
                               <v-combobox color="#d69c4f" @change="cambiaGS()"  v-model="editedItem.user" @focus="getEjecutivos()" :items="misEjecutivos" label="Seleccionar Ejecutivo"></v-combobox>
                            </v-col>

                            <v-col v-if="role == 'Administrador'"  cols="12" sm="6" md="6">
                              <v-text-field color="#d69c4f" id="gs-id" required disabled v-model="editedItem.groupSegment" label="Group Segment"></v-text-field>
                            </v-col>
                            
                            <v-col v-if="role == 'Administrador'" cols="12" sm="6" md="6">
                              <v-text-field color="#d69c4f" id="gs-id" required disabled v-model="editedItem.groupSegment" label="Group Segment"></v-text-field>
                            </v-col>
 -->
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
                <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                
              <!--  <v-icon small @click="deleteItem(item)">delete</v-icon> -->
              </template>
        </v-data-table>
        <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>

    <div v-if="role!='Administrador'"> 
      <NotFound/>
    </div>

  </div>
</template>
<script>
import { mask } from 'vue-the-mask';
import {mapState, mapActions} from 'vuex'
import axios from 'axios';
import NotFound from './NotFound'
export default {
    components:{
      NotFound
    },
    directives: {
      mask,
    },
    data: () => ({
    dialog: false,
    role: '',
    select: '',
      headers: [
        { text: 'Hotel ID', value: 'hotelId' }, 
        {
          text: 'Nombre del Hotel',
          align: 'left',
          value: 'shortName',
        },
        { text: 'Región', value: 'region' },
        { text: 'Tipo de Hotel', value: 'typeHotel' },
        { text: 'Actions', value: 'action', sortable: false }, 
      ],
      search: "",
      desserts: [],
      mask: '####-####-####-####',
      editedIndex: -1,
      gsegment: JSON.parse(localStorage.getItem('usuario')).groupSegment,
      editedItem: {
        hotelId: 0,
        shortName: '',
        region: '',
        typeHotel: ''
      },
      defaultItem: {
        hotelId: 0,
        shortName: '',
        region: '',
        type: ''
      },
      types: [],
      regions:[],

      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      filtro: [],
      filtroSelected: 'Todas las cuentas',
      cuentasTemporal: [],
      file_upload: null,
    }),
    computed: {
      ...mapState(['Hoteles', 'accessToken']),
      formTitle() {
      return this.editedIndex === -1 ? "Nuevo Hotel" : "Editar Hotel";
      },
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
    },
    mounted() {
        this.rellenadatos()
        this.verificaPermisos()
        console.clear()
    },
    methods:{
        verificaPermisos(){
            this.role = JSON.parse(localStorage.getItem('usuario')).role
        },
        async getRegions(){
          let config = {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            }  
          }
          let url = 'https://casa-andina-backend.azurewebsites.net/region'
          await axios.get(url, config)
          .then(response => { 
            this.regions = response.data
          }).catch(error => {
            console.log('Hubo un error ', error)
          }) 
        },
        async getTipoHoteles(){
          let config = {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            }  
          }
          let url = 'https://casa-andina-backend.azurewebsites.net/type_hotel'
          await axios.get(url, config)
          .then(response => { 
            this.types = response.data
          }).catch(error => {
            console.log('Hubo un error ', error)
          }) 
        },
        async addHotels(){
          const datos = {
            "shortName": this.editedItem.shortName,
            "region": this.editedItem.region,
            "typeHotel": this.editedItem.typeHotel
          }
          if(!this.verificarNombre()){
            let config = {
              headers: {
                'Authorization': 'Bearer ' + this.accessToken
              }  
            }
            let url = 'https://casa-andina-backend.azurewebsites.net/hotels'
            await axios.post(url, datos, config)
            .then(response => { 
              localStorage.setItem('hoteles', JSON.stringify(response.data))
              this.desserts = response.data
              toastr.success('Se guardó correctamente', {
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
            }).catch(error => {
              /* this.alerts('Ocurrio un error y no se guardó', 'error') */
              console.log('Hubo un error ', error)
              toastr["error"]("Ocurrió un error y no se guardó")
            }) 
          }else{
            toastr.error('El nombre de hotel ya se encuentra registrado.')
          }
        },
        async editHotels(){
          const datos = {
            "hotelId": this.editedItem.hotelId,
            "shortName": this.editedItem.shortName,
            "region": this.editedItem.region,
            "typeHotel": this.editedItem.typeHotel
          }
          let config = {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            }  
          }
          let url = 'https://casa-andina-backend.azurewebsites.net/hotels'
          await axios.put(url, datos, config)
          .then(response => { 
            localStorage.setItem('hoteles', JSON.stringify(response.data))
            this.desserts = response.data
            toastr.success('Se guardó correctamente', {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
            })
          }).catch(error => {
            /* this.alerts('Ocurrio un error y no se guardó', 'error') */
            console.log('Hubo un error ', error)
            toastr["error"]("Ocurrió un error y no se guardó")
          }) 
        },
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
                let url = 'https://casa-andina-backend.azurewebsites.net/file/upload/hotels'
                await axios.post(url, formData, config)
                .then(response => { 
                  toastr.success('Se subió el archivo correctamente')
                  this.file_upload = null
                  localStorage.setItem('hoteles', JSON.stringify(response.data))
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
          this.getRegions()
          this.getTipoHoteles()
          let hoteles = JSON.parse(localStorage.getItem('hoteles'))
          this.desserts = hoteles
        },
        vaciaDatos(){
          this.editedItem = {}
        },
        editItem(item) {
          this.editedIndex=-1
          this.editedIndex = this.desserts.indexOf(item);
          this.editedIndex = this.desserts.indexOf(item);
          this.dialog = true;
            if(this.editedIndex>=0){
              this.editedItem = Object.assign({}, item);
            }else{
            }
        },
        close() {
          this.dialog = false;
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
          }, 300);
        },
        save(){
          if (this.editedIndex > -1) {
            //editando hotel
            this.editHotels()
            this.close()
          } else {
            //editar hotel
            this.addHotels()
            if(!this.verificarNombre()){
              this.close();
            }
          }   
        },

        verificarNombre(){
          try {
              let nombre = document.getElementById('name-id').value
              for(let i=0; i<this.desserts.length; i++){
                if(nombre.toLowerCase() == (this.desserts[i].shortName.toLowerCase())){
                  return true;
                }
              } 
              return false;
          } catch (error) { 
          }
        },
    }
}
</script>
