<template>
    <div>
        <div v-if="role == 'Administrador'">
        <!-- <v-container class="col-lg-6" >
              <v-row justify="center">
                <v-col cols="6">
                  <v-combobox @change="FiltraCuentas()" color="#d69c4f"  v-model="filtroSelected" :items="filtro" label="Selecciona un elemento"></v-combobox>
                </v-col>
              </v-row>
        </v-container> -->
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
                      <v-btn @click="rellenadatos()" color="#d69c4f" dark class="mb-2" v-on="on">Añadir Nuevo Hotel</v-btn>
                    </template>
                      <!-- CARD ADD AND EDIT -->
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
                              <v-text-field v-if="editedIndex>=0  &&  editedItem.edit==false && role=='Ejecutivo'" id="name-id" required disabled color="#d69c4f" v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                              <v-text-field v-else required color="#d69c4f" id="name-id" v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                              <v-combobox color="#d69c4f" id="sector-id" required v-if="editedIndex>=0  && editedItem.edit==false && role=='Ejecutivo'" disabled v-model="editedItem.branch" :items="branchs" label="Seleccionar Sector"></v-combobox>
                              <v-combobox color="#d69c4f" id="sector-id" required v-else v-model="editedItem.branch" :items="branchs" label="Seleccionar Sector"></v-combobox>
                            </v-col>

                            <v-col cols="auto">
                              <v-combobox color="#d69c4f" required v-if="editedIndex>=0  && editedItem.edit==false && role=='Ejecutivo'" id="category-id" disabled v-model="editedItem.category" :items="categories" label="Seleccionar Categoria"></v-combobox>
                              <v-combobox color="#d69c4f" required v-else  v-model="editedItem.category" id="category-id" :items="categories" label="Seleccionar Categoria"></v-combobox>
                            </v-col>

                            <v-col cols="auto" v-if="role=='Supervisor de Segmento'" >
                               <v-combobox color="#d69c4f" @change="cambiaGS()"  v-model="editedItem.user" @focus="getEjecutivos()" :items="misEjecutivos" label="Seleccionar Ejecutivo"></v-combobox>
                            </v-col>

                            <v-col v-if="role == 'Ejecutivo'"  cols="12" sm="6" md="6">
                              <v-text-field color="#d69c4f" id="gs-id" required disabled v-model="editedItem.groupSegment" label="Group Segment"></v-text-field>
                            </v-col>
                            
                            <v-col v-if="role == 'Supervisor de Segmento'" cols="12" sm="6" md="6">
                              <v-text-field color="#d69c4f" id="gs-id" required disabled v-model="editedItem.groupSegment" label="Group Segment"></v-text-field>
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
                </v-toolbar>
              </template> 

              <template v-slot:item.edit="{ item }">
                <!-- <v-chip :color="getEstado(item.edit)" dark>{{ item.edit }}</v-chip>
                <v-chip v-if="item.edit == true" :color="getEstado(item.edit)" dark>Puedes editar</v-chip> -->
                
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-if="item.edit == false" v-on="on"  small class="mr-2" @click="editItem(item)">mdi-account-details</v-icon>
                  </template>
                  <span>Detalles</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-if="item.edit == true" v-on="on" small class="mr-2" @click="editItem(item)">edit</v-icon>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </template>
        </v-data-table>
        <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>


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
    role: '',
    select: '',
      headers: [
        /* { text: 'Sector', value: 'accountId' }, */
        {
          text: 'Nombre del Hotel',
          align: 'left',
          value: 'name',
        },
        { text: 'Estado', value: 'groupSegment' },
        { text: 'Actions', value: 'edit' },
        /* { text: 'Actions', value: 'action', sortable: false }, */
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
        edit: false,
        user: ''
      },
      defaultItem: {
        name: '',
        branch: '',
        category: '',
        groupsegment: '',
        user: ''
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
      cuentasTemporal: []
    }),
    mounted() {
        this.verificaPermisos()
        console.clear()
    },
    methods:{
        verificaPermisos(){
            this.role = JSON.parse(localStorage.getItem('usuario')).role
        },
    }
}
</script>
