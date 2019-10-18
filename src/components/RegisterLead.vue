<template>
<div>
    <div v-if="role=='Ejecutivo'">
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

  <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Gestión de Leads</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          color="#d69c4f"
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="1150px">
          <template v-slot:activator="{ on }">
            <v-btn color="#d69c4f" @click="FiltraDatos()" style="color: #FAFAFA;" dark class="mb-2" v-on="on" >Añadir Nuevo Lead</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
              <v-stepper  v-model="editedItem.statusid"  non-linear >
                      <v-stepper-header>
                        <v-stepper-step
                          color="#d69c4f"
                          editable
                          :complete="editedItem.statusid>0"
                          step="1"
                        >
                          Prospecto
                        </v-stepper-step>
                
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1" 
                          editable
                          :complete="editedItem.statusid>1"
                          step="2"
                        >
                          Tentativo
                        </v-stepper-step>
                
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>2"
                          step="3"
                          editable
                        >
                          Hot
                        </v-stepper-step>
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>3"
                          step="4"
                          editable
                        >
                          Congelado
                        </v-stepper-step>
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>4"
                          step="5"
                          editable
                        >
                          Cancelado
                        </v-stepper-step>
                        
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>5"
                          step="6"
                          editable
                        >
                          Confirmado
                        </v-stepper-step>
                      </v-stepper-header>
                    </v-stepper>

            <v-card-text>
              <v-container>
                <v-row >
                  <!-- <v-col v-if="editedIndex>-1" cols="20" sm="12" md="80" class=center >
                    <v-text-field v-model="editedItem.leadid" disabled  label="Lead ID" ></v-text-field>
                  </v-col> -->
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox color="#d69c4f" v-model="editedItem.segment" :items="segments" label="Seleccionar Segmento" ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox color="#d69c4f" v-model="editedItem.account" :items="leadsAccounts" label="Seleccionar Cuenta"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox color="#d69c4f" v-model="editedItem.hotel" :items="hotels" label="Seleccionar Hotel"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-text-field color="#d69c4f"  v-model="editedItem.name" label="Nombre de Grupo"></v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center>
                    <v-dialog
                      color="#d69c4f"
                      ref="dialog1"
                      v-model="modal1"
                      :return-value.sync="date1"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          color="#d69c4f"
                          v-model="date1"
                          label="Fecha Inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date1" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog1.save(date1)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center>
                    <v-dialog
                      color="#d69c4f"
                      ref="dialog2"
                      v-model="modal2"
                      :return-value.sync="date2"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          color="#d69c4f"
                          v-model="date2"
                          label="Fecha Fin"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date2" :min="date1" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog2.save(date2)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col  v-if="editedItem.segment!='Eventos'"  cols="20" sm="2" md="80" class=center >
                    <v-text-field color="#d69c4f" v-mask="mask" v-model="rooms" label="Cantidad de Habitaciones"  >{{editedItem.rooms}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment != 'Eventos'" cols="20" sm="2" md="80" class=center  >
                    <v-text-field color="#d69c4f" v-mask="mask" v-model="rateHotel" prefix="$" label="Ingresar Tarifa Neta">{{editedItem.rateHotel}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment=='Series'" cols="20" sm="2" md="80" class=center >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="nights" label="Cantidad de Noches" >{{editedItem.nights}}</v-text-field>
                  </v-col>

                  <v-col v-if="editedItem.segment =='Series'" cols="20" sm="10" md="80">
                    <v-combobox
                        color="#d69c4f" 
                        v-model="editedItem.month"
                        :items="months"
                        :search-input.sync="search"
                        hide-selected
                        hint=""
                        label="Seleccionar Meses"
                        multiple
                        persistent-hint
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                No results matching "<strong>{{ search }}</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                  </v-combobox>
                  </v-col>

                  <v-col v-if="editedItem.segment =='Series'" cols="20" sm="2" md="80" style="margin-top=15px;">
                      <v-btn  @click="monthsLenght()" class="mx-12" fab color="#d69c4f">
                        <v-icon color="#FAFAFA" dark>mdi-plus</v-icon>
                      </v-btn>
                  </v-col>
                  <!-- MESES -->
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 1 " cols="2" sm="1"   >
                    <v-text-field color="#d69c4f" label="$" v-mask="mask"  v-model="month1"  ></v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 2" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f"  v-mask="mask"  v-model="month2" label="$"  ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 3" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f"  v-mask="mask"  v-model="month3" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 4" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month4" label="$" ></v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 5" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month5" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 6" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month6" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 7" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month7" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 8" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month8" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 9" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month9" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 10" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month10" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 11" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month11" label="$" ></v-text-field>
                  </v-col>  
                  <v-col v-if="editedItem.segment=='Series' && lenghtMonth >= 12" cols="2" sm="1"  >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="month12" label="$" ></v-text-field>
                  </v-col>      

                   <!-- TERMINAN LOS MESES -->
                  
                  <v-col v-if="editedItem.segment!='Series' || editedItem.segment==''" cols="20" sm="12">
                    <v-btn-toggle color="primary" v-model="sevent">
                      <v-btn color="#d69c4f" @click="limpiarfilas()" text value="no">
                        Sin evento
                      </v-btn>
                      <v-btn color="#d69c4f" text value="si">
                        Evento
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si'" cols="20" sm="4" md="80" >
                    <v-combobox
                        color="#d69c4f"
                        v-model="editedItem.eventsName"
                        :items="items"
                        :search-input.sync="search"
                        hide-selected
                        hint=""
                        label="Seleccionar Eventos"
                        multiple
                        persistent-hint
                        
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-combobox>
                  </v-col>
                  <v-col v-if="sevent=='si'" cols="20" sm="2" md="80" style="margin-top=15px;">
                    <!-- <v-btn-toggle color="primary">
                      <v-btn @click="cantTfield()" text value="si">
                        Ingresar Costos
                      </v-btn>
                      </v-btn-toggle> -->
                      <v-btn  @click="cantTfield()" class="mx-12" fab color="#d69c4f">
                        <v-icon color="#FAFAFA" dark>mdi-plus</v-icon>
                      </v-btn>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si' && name1=='Alimentos y bebidas' || name2=='Alimentos y bebidas' || name3=='Alimentos y bebidas' " cols="20" sm="2" md="80" class=center >
                    <v-text-field color="#d69c4f" v-mask="mask" v-model="rateEvent1" prefix="$" label="Ingresar Eventos AyB">{{editedItem.rateEvent1}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si'  && (name1=='Equipos' || name2=='Equipos' || name3=='Equipos')" cols="20" sm="2" md="80" class=center >
                    <v-text-field color="#d69c4f" v-mask="mask" v-model="rateEvent2"  prefix="$" label="Ingresar Eventos Equipos">{{editedItem.rateEvent2}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si'  && (name1=='Salas' || name2=='Salas' || name3=='Salas')" cols="20" sm="2" md="80" class=center >
                    <v-text-field color="#d69c4f" v-mask="mask" v-model="rateEvent3"  prefix="$" label="Ingresar Eventos Salas">{{editedItem.rateEvent3}}</v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field color="#d69c4f" v-model="editedItem.contactName" label="Nombre Contacto"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Cargo"></v-text-field>
                  </v-col>-->
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field color="#d69c4f" v-model="editedItem.contactEmail" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="editedItem.contactPhone" label=" Celular/Teléfono"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-if="editedItem.Segment != 'Eventos'"> 
                    <h3 style="color: #000000;"> Room Revenue: ${{roomrevenue()}} </h3>
                  </v-col> 
                </v-row>
                <v-row>
                  <v-col v-if="editedItem.Segment!='Series' && editedItem.Segment!='Eventos'">
                     <h3 style="color: #000000;"> Eventos: ${{eventrevenue()}} </h3>
                  </v-col>
                  
                </v-row>
                <v-row>
                <v-col v-if="editedItem.Segment!='Series' && editedItem.Segment!='Eventos'">
                    <h3 style="color: #000000;"> <strong>TOTAL: ${{grantotal()}} </strong> </h3>

                </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="#d69c4f" text @click="close">Cancelar</v-btn>
              <v-btn color="#d69c4f" text @click="save()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      
     <!--  <v-icon small @click="deleteItem(item)">delete</v-icon> -->
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="allItems()">Reset</v-btn>
    </template> -->
  </v-data-table>


        <!-- <v-alert type="success" v-model="snackbar" dismissible width="300" height="50" style="float: right; position:absolute">
           I'm a success alert.
        </v-alert> -->   
</div>
<div v-if="role!='Ejecutivo'">
  <NotFound/>
</div>

  
</div>
</template>



<script>

import axios from "axios";
import NotFound from './NotFound'
import {mapActions, mapState} from 'vuex'
import { mask } from 'vue-the-mask'
export default {
  components:{
    NotFound
  },
  directives: {
      mask,
    },
  data: () => ({
    role: '',
    sevent:"no",
    rateEvent1:0,
    rateEvent2:0,
    rateEvent3:0,
    rooms:0,
    rateHotel:0,
    nights: 0,

    step: null,
    totalevt: 0,
    cantevtrate: [],
    mask: '################',
    snackbar:false,
    monthselected: [],
    msjerror: 'Se eliminó correctamente',
    msjsuccess:'Se guardó correctamente',
    type: 'success',
    dismissSecs: 2,
    dismissCountDown: 0,
    showDismissibleAlert: false,

    tipo_lead : 0, // Indicará el tipo de lead a elegir
    allstatus:['','Prospecto', 'Tentativo', 'Hot', 'Congelado', 'Cancelado',  'Confirmado'],
    items: ['Alimentos y bebidas', 'Equipos', 'Salas'], // Array Events
    model: [],
    selected:[],
    dialog: false,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      modal1: false,
      modal2: false,
      menu2: false,
     headers: [
      /* { text: "Lead ID", value: "leadid" }, */
      {
        text: "Nombre Lead",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Segmento", value: "segment" },
      { text: "Fecha de Creación", value: "createDate" },
      { text: "Contacto", value: "contactName" },
      { text: "Cuenta", value: "account" },
      { text: "Ingreso de Alojamiento", value: "totalhotel" },
      { text: "Ingreso de Eventos", value: "totalevents"},
      { text: "Total Ingresos", value: "totalgeneral"},
      { text: "Estado", value: "status" },
      { text: "Actions", value: "action", sortable: false }
      
    ],
    search: "",
    name1: "",
    name2: "",
    name3: "",
    desserts: [],
    selectedAccount: '',
    selectedHotel: '',
    selectedSegment: '',
    corporateView: false,
    agencyGroupsView: false,
    agencySeriesView: false,
    eventsView: false,
    corporateSegments: ["Grupos", "Largas Estadías", "Tripulación"],
    segments: [],
    leadsAccounts: [],
    hotels: [],
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
    editedIndex: -1,
    editedItem: {
      leadid: '',
      name: "",
      initialdate: '',
      finaldate: '',
      account: '',
      nights:'',
      segment:'',
      hotel:'',
      rateHotel: 0,
      rooms: 0,
      contactName: '',
      contactPhone:'',
      contactEmail: '',
      eventsName:[],
      rateEvent: 0,
      rateEvent1: 0,
      rateEvent2: 0,
      rateEvent3: 0,
      contact: '',
      month:[],
      status: 0,
      statusid:0 ,
      tarifaneta: 0,
      
    },
    defaultItem: {
      segment: '',
      name: "",
      contactName: '',
      rooms: 0,
      rateHotel: 0,
      rateEvent: 0,
      rateEvent1: 0,
      rateEvent2: 0,
      rateEvent3: 0,
      finaldate: 0,
      contact: '',
      account: '',
      tarifaneta: 0,
      status: '',
      statusid:0 
    },
    rateMonths:{
      month1:0,
      month2:0,
      month3:0,
      month4:0,
      month5:0,
      month6:0,
      month7:0,
      month8:0,
      month9:0,
      month10:0,
      month11:0,
      month12:0,
    },
    lenghtMonth: 0,
    month1:0,
    month2:0,
    month3:0,
    month4:0,
    month5:0,
    month6:0,
    month7:0,
    month8:0,
    month9:0,
    month10:0,
    month11:0,
    month12:0,
   
  }),
  computed: {
    ...mapState(['Users', 'Hoteles', 'Accounts', 'AllLeads', 'Segmentos', 'accessToken']),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Lead" : "Editar Lead";
    },
    
    suma:function ({state}) {
      return state.editedItem.rateEvent1+state.editedItem.rateEvent2+state.editedItem.rateEvent3
    }, 
    totalevtnto(){
      return this.totalevt =  parseInt(this.editedItem.rateEvent1) + parseInt(this.editedItem.rateEvent2)+ parseInt(this.editedItem.rateEvent3)
    }
  
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    selectedSegment: function () {
      
    },
    month(val) {
        if (val.length > 4) {
          this.$nextTick(() => this.editedItem.month.pop())
        }
    },
    event(val) {
        if (val.length > 3) {
          this.$nextTick(() => this.editedItem.eventsName.pop())
        }
    },
    
  },
  created() {
    
  },
  mounted() {
    try {
      if(this.leadsAccounts.length==0 && this.hotels.length==0 && this.segments.length==0 && this.desserts.length==0){
        this.getNameAccounts();
        this.getNameHotels();
        this.getNameSegments();
        this.calculaTotal()
        this.verificaPermisos()
      }
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
    }catch (error){
      console.log('Hubo un error')
    }
  },
  
  //MÉTODOS
  methods: {
     countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }, 


    ...mapActions(['getHotels', 'getAllLeads', 'stateToken']),
    getLeads(){
      this.desserts = this.AllLeads
    },
    test(){
      console.log('ESTA SELECCIONANDO')
    },
    getNameSegments(segmentos){ 
      var todosegmento = JSON.parse(localStorage.getItem('segmentos'))
        for (let i = 0; i < todosegmento.length; i++) {
        this.segments.push(todosegmento[i].name);
      }
    },
    getNameHotels(hoteles) {
      var todohotels = JSON.parse(localStorage.getItem('hoteles'))
      for (let i = 0; i < todohotels.length; i++) {
        this.hotels.push(todohotels[i].shortName);
      }
    },

    getNameAccounts(accounts) {
      var todoaccounts = JSON.parse(localStorage.getItem('accounts'))
      for (let i = 0; i < todoaccounts.length; i++) {
        this.leadsAccounts.push(todoaccounts[i].name);
      }
    },

    //POST LEADS
    //Agregar nuevo Lead Segmentos
    async addSegmentSeriesLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      let f1 = Date.parse(this.editedItem.initialdate)
      let f2 = Date.parse(this.editedItem.finaldate)
      let fe1= new Date(f1)
      let fe2= new Date(f2)
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      let rateMonthHotel = this.WatchLenght()
      var datos={
        "name": this.editedItem.name,
        "nights": parseInt(this.nights),
        "initialBooking": "",
        "finalBooking": "",
        "rateHotel": parseInt(this.rateHotel),
        "rooms": parseInt(this.rooms),
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "months": rateMonthHotel,
      }
       let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/leads'
      await axios.post(url, datos, config)
      .then(response => { 
        console.log(response.data)
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal()
        this.type='success'
        this.showAlert()

        this.$store.dispatch('getDashboard')
      }).catch(error => {
        console.log('Hubo un error ', error)
      }) 
    },
    //Agregar Lead de eventos
    async addEventLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var rateevent =[]
      var events =[]
      rateevent.push(this.rateEvent1, this.rateEvent2,this.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "name": this.editedItem.name,
        "initialBooking": this.editedItem.initialdate,
        "finalBooking": this.editedItem.finaldate,
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "events": events,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/leads'
      await axios.post(url, datos, config)
      .then(response => { 
        console.log(response.data)
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal()
        this.type='success'
        this.showAlert()

        this.$store.dispatch('getDashboard')
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    //Agregar otro tipo de Lead 
    async addOtherLead(){
      var fec1= this.date1
      var fec2= this.date2
      var f1= ''
      var f2= ''
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      var noches = diff/(1000*60*60*24)

      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var rateevent =[]
      var events =[]
      rateevent.push(this.rateEvent1, this.rateEvent2,this.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "name": this.editedItem.name,
        "initialBooking": this.editedItem.initialdate,
        "finalBooking": this.editedItem.finaldate,
        "rateHotel": parseInt(this.rateHotel),
        "rooms": parseInt(this.rooms),
        "account": this.editedItem.account,
        "nights": noches,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "events": events
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/leads'
      await axios.post(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal()
        this.type='success'
        this.showAlert()

        this.$store.dispatch('getDashboard')
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },

    /*----------- PUT DE LEADS -------------------*/
    //Edita Lead Segmentos
    async editSegmentSeriesLead(){
      let monthRate = this.WatchLenght()
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "nights": parseInt(this.nights),
        "initialBooking": "",
        "finalBooking": "",
        "rateHotel": parseInt(this.rateHotel),
        "rooms": parseInt(this.rooms),
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "status": this.allstatus[this.editedItem.statusid],
        "months": monthRate,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        console.log(response.data)
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal()
        this.type='success'
        this.showAlert()
        this.$store.dispatch('getDashboard')
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
     //EDITAR Lead de eventos
    async editEventLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var rateevent =[]
      var events =[]
      rateevent.push(this.rateEvent1, this.rateEvent2,this.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "initialBooking": this.date1,
        "finalBooking": this.date2,
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "status": this.allstatus[this.editedItem.statusid],
        "events": events,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal()
        this.type='success'
        this.showAlert()

        this.$store.dispatch('getDashboard')
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    //Editar otro tipo de Lead 
    async editOtherLead(){
      var rateevent =[]
      var events =[]
      if(this.editedItem.eventsName != undefined){
        rateevent.push(this.rateEvent1, this.rateEvent2,this.rateEvent3)
        for(let i = 0; i < this.editedItem.eventsName.length; i++){
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
        }
      }
      var fec1= this.date1
      var fec2= this.date2
      var f1= ''
      var f2= ''
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      this.date1 = f1
      this.date2 = f2
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      var noches = diff/(1000*60*60*24)
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "initialBooking": this.editedItem.initialdate,
        "finalBooking": this.editedItem.finaldate,
        "rateHotel": parseInt(this.rateHotel),
        "rooms": parseInt(this.rooms),
        "account": this.editedItem.account,
        "nights": noches,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "status": this.allstatus[this.editedItem.statusid],
        "events": events
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal()
        this.type='success'
        this.showAlert()

        this.$store.dispatch('getDashboard')
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },

    //MODALS
    editItem(item) {
      this.FiltraDatos()
      this.editedIndex=-1
      this.editedIndex = this.desserts.indexOf(item);
      this.dialog = true;
        if(this.editedIndex>=0){
          this.editedItem = Object.assign({}, item);
          this.SeparaMesyRate(item)
          this.EditMesyEvents()
        }else{
        }
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
      this.desserts.splice(index, 1);
      this.type='error'
      this.showAlert();
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
        if(this.editedItem.segment=='Series'){
          this.editSegmentSeriesLead()
        }else if(this.editedItem.segment=='Eventos'){
          this.editEventLead()
        }else{
          this.editOtherLead()
        }
      } else {
        if(this.editedItem.segment=='Series'){
          this.addSegmentSeriesLead()
        }else if(this.editedItem.segment=='Eventos'){
          this.addEventLead()
        }else{
          this.addOtherLead()
        }
      } 
      this.close();
    },

    
    

    /* EDICIONES LEADS */
    
    cantTfield(){
      try {
        if(this.editedItem.eventsName.length!=null || this.editedItem.eventsName.length>=0){
        this.name1 =this.editedItem.eventsName[0]
        this.name2 =this.editedItem.eventsName[1]
        this.name3 =this.editedItem.eventsName[2]
        return
        }
        this.name1 = ''
        this.name2 = ''
        this.name3 = ''
      } catch (error) {
        
      }
    },
    limpiarfilas(){
      this.rateEvent1 = 0
      this.rateEvent2 = 0
      this.rateEvent3 = 0
      this.editedItem.eventsName = []
      this.name1 = ''
      this.name2 = ''
      this.name3 = ''
    },
    FiltraDatos(){
       if(this.editedItem.segment=='Eventos'){
        this.rateHotel = 0
        this.romms = 0
        this.nights = 0
      }else if(this.editedItem.segment=='Series'){
        this.lenghtMonth= 0
        this.month1 =0
        this.month2 =0
        this.month3 =0
        this.month4 =0
        this.month5 =0
        this.month6 =0
        this.month7 =0
        this.month8 =0
        this.month9 =0
        this.month10 =0
        this.month11 =0
        this.month12 =0
        this.rateEvent1 = 0
        this.rateEvent2 = 0
        this.rateEvent3 = 0
        this.editedItem.eventsName = []
      }else if(this.editedItem.segment == ''){
        this.lenghtMonth= 0
        this.month1 =0
        this.month2 =0
        this.month3 =0
        this.month4 =0
        this.month5 =0
        this.month6 =0
        this.month7 =0
        this.month8 =0
        this.month9 =0
        this.month10 =0
        this.month11 =0
        this.month12 =0
        this.sevent ='no'
        this.editedItem.eventsName = []
        this.rateHotel = 0
        this.romms = 0
        this.nights =0
        this.rateEvent1 = 0
        this.rateEvent2 = 0
        this.rateEvent3 = 0
        this.nights=1
        this.name1 = ''
        this.name2 = ''
        this.name3 = ''
      }else{
        this.nights=1
      }
    },
    EditMesyEvents(){
      try {
      var events =this.editedItem.events
      var nombres = []
      var costos = []
      var status = this.editedItem.status
      for(var i = 0; i< this.allstatus.length; i++){
        if(this.allstatus[i]==status){
          this.editedItem.statusid=i
        }
      }
      var dias=0;
      if(this.editedItem.initialBooking!=null && this.editedItem.finalBooking!=null){
      var fec1= this.editedItem.initialBooking
      var fec2= this.editedItem.finalBooking
      var f1= ''
      var f2= ''  
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      dias = diff/(1000*60*60*24)
      this.date1 = f1
      this.date2 = f2
      }
      if(dias>1){
         this.nights = dias
      }else{
        this.nights=1
      }
      if(events.length>0){
      this.sevent='si'  
      for(var i=0; i<events.length; i++){
        nombres.push(events[i].name)
        if(events[i].name == 'Alimentos y bebidas'){
          this.rateEvent1 =events[i].rateEvent
        }else if(events[i].name == 'Equipos'){
          this.rateEvent2 =events[i].rateEvent
        }else if(events[i].name == 'Salas'){
          this.rateEvent3 =events[i].rateEvent
        }
      }
      this.name1 = nombres[0]
      this.name2 = nombres[1]
      this.name3 = nombres[2]
      this.editedItem.eventsName=nombres
      if(this.rateEvent1==null){this.rateEvent1=0}
      if(this.rateEvent2==null){this.rateEvent2=0}
      if(this.rateEvent3==null){this.rateEvent3=0}
      if(this.editedItem.rateHotel!=null){this.rateHotel = this.editedItem.rateHotel} 
      if(this.editedItem.rooms!=null){this.rooms = this.editedItem.rooms} 
      if(this.editedItem.nights!=null){this.nights = this.editedItem.nights} 
      }else{
        this.sevent='no'
        if(this.editedItem.rateHotel!=null){this.rateHotel = this.editedItem.rateHotel} 
        if(this.editedItem.rooms!=null){this.rooms = this.editedItem.rooms} 
        if(this.editedItem.nights!=null){this.nights = this.editedItem.nights} 
      }
      /* if(this.editedItem.months.length>0){
        var meses=["Enero","Febrero"]
        for(var i=0; i< meses.length; i++){

        }
      } */
      } catch (error) {  
      }

    },
    roomrevenue: function (){
      try {
      
      var fec1= this.date1
      var fec2= this.date2
      var f1= ''
      var f2= ''
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      var dias = diff/(1000*60*60*24)
      if(this.editedItem.segment=='Series'){
        return ((parseInt(this.rooms)) *(parseInt(this.rateHotel)) *(parseInt(this.nights))) +
        ( parseInt(this.month1)+parseInt(this.month2)+parseInt(this.month3)+parseInt(this.month4)+parseInt(this.month5)+parseInt(this.month6)
        +parseInt(this.month7)+parseInt(this.month8)+parseInt(this.month9)+parseInt(this.month10)+parseInt(this.month11)+parseInt(this.month12))
      }else {
        return (parseInt(this.rooms)) *(parseInt(this.rateHotel)) * dias
      }
      } catch (error) {      
      }
    },
    eventrevenue: function (){
      try {
      var fec1= this.date1
      var fec2= this.date2
      var f1= ''
      var f2= ''
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      var dias = diff/(1000*60*60*24)
      if(dias<=0){
        dias=1
      }
      var event = ((parseInt(this.rateEvent1) + parseInt(this.rateEvent2)+ parseInt(this.rateEvent3))*parseInt(dias))
      return event
      } catch (error) {}
    },
    grantotal: function(){ 
      return this.eventrevenue()+this.roomrevenue()
    },
    monthsLenght(){
      if(this.lenghtMonth > this.editedItem.month.length){
        this.month1 =0
        this.month2 =0
        this.month3 =0
        this.month4 =0
        this.month5 =0
        this.month6 =0
        this.month7 =0
        this.month8 =0
        this.month9 =0
        this.month10 =0
        this.month11 =0
        this.month12 =0
      }
      this.lenghtMonth = this.editedItem.month.length

    },
    WatchLenght: function(){
      let MonthsRate = []
      if(this.editedItem.month.length>=1){MonthsRate.push({"name":this.editedItem.month[0],"rateHotel": parseInt(this.month1)})}
      if(this.editedItem.month.length>=2){MonthsRate.push({"name":this.editedItem.month[1],"rateHotel": parseInt(this.month2)})}
      if(this.editedItem.month.length>=3){MonthsRate.push({"name":this.editedItem.month[2],"rateHotel": parseInt(this.month3)})}
      if(this.editedItem.month.length>=4){MonthsRate.push({"name":this.editedItem.month[3],"rateHotel": parseInt(this.month4)})}
      if(this.editedItem.month.length>=5){MonthsRate.push({"name":this.editedItem.month[4],"rateHotel": parseInt(this.month5)})}
      if(this.editedItem.month.length>=6){MonthsRate.push({"name":this.editedItem.month[5],"rateHotel": parseInt(this.month6)})}
      if(this.editedItem.month.length>=7){MonthsRate.push({"name":this.editedItem.month[6],"rateHotel": parseInt(this.month7)})}
      if(this.editedItem.month.length>=8){MonthsRate.push({"name":this.editedItem.month[7],"rateHotel": parseInt(this.month8)})}
      if(this.editedItem.month.length>=9){MonthsRate.push({"name":this.editedItem.month[8],"rateHotel": parseInt(this.month9)})}
      if(this.editedItem.month.length>=10){MonthsRate.push({"name":this.editedItem.month[9],"rateHotel": parseInt(this.month10)})}
      if(this.editedItem.month.length>=11){MonthsRate.push({"name":this.editedItem.month[10],"rateHotel": parseInt(this.month11)})}
      if(this.editedItem.month.length>=12){MonthsRate.push({"name":this.editedItem.month[11],"rateHotel": parseInt(this.month12)})}
      return MonthsRate
    },
    SeparaMesyRate(item){
      this.lenghtMonth = item.months.length
      this.editedItem.month = []
      for(let i=0; i<item.months.length; i++){
        this.editedItem.month.push(item.months[i].name)
      }
      if(this.lenghtMonth>=1){ this.month1= item.months[0].rateHotel}
      if(this.lenghtMonth>=2){ this.month2= item.months[1].rateHotel}
      if(this.lenghtMonth>=3){ this.month3= item.months[2].rateHotel}
      if(this.lenghtMonth>=4){ this.month4= item.months[3].rateHotel}
      if(this.lenghtMonth>=5){ this.month5= item.months[4].rateHotel}
      if(this.lenghtMonth>=6){ this.month6= item.months[5].rateHotel}
      if(this.lenghtMonth>=7){ this.month7= item.months[6].rateHotel}
      if(this.lenghtMonth>=8){ this.month8= item.months[7].rateHotel}
      if(this.lenghtMonth>=9){ this.month9= item.months[8].rateHotel}
      if(this.lenghtMonth>=10){ this.month10= item.months[9].rateHotel}
      if(this.lenghtMonth>=11){ this.month11= item.months[10].rateHotel}
      if(this.lenghtMonth>=12){ this.month12= item.months[11].rateHotel} 
    },
    calculaTotal(){
      try {
      var todoleads = JSON.parse(localStorage.getItem('leads'))
      
        for(let i=0; i<todoleads.length; i++){
          let totale = 0
          let totalh = 0 
          let totalmonths = 0
          let formatfecha = ''
           if(todoleads[i].events.length>0){
            for(let j=0; j<todoleads[i].events.length; j++){
              totale += todoleads[i].events[j].rateEvent
            }
           }
           if(todoleads[i].months.length>0 || todoleads[i].months.length!=null){
             for(let h=0; h<todoleads[i].months.length; h++){
                totalmonths += todoleads[i].months[h].rateHotel
              }
           }
           for(let h=0; h<19; h++){
             let letra = todoleads[i].createDate.charAt(h)
             if(letra==='T'){
               formatfecha+=' '
             }else{
               formatfecha+=letra
             } 
           }
           totalh = todoleads[i].rateHotel * todoleads[i].rooms *  (todoleads[i].nights) + totalmonths
           this.desserts.push(
             {
              account: todoleads[i].account,
              contactEmail: todoleads[i].contactEmail,
              contactName: todoleads[i].contactName,
              contactPhone: todoleads[i].contactPhone,
              createDate: formatfecha,
              finalBooking: todoleads[i].finalBooking,
              hotel: todoleads[i].hotel,
              initialBooking: todoleads[i].initialBooking,
              leadid: todoleads[i].leadid,
              months: todoleads[i].months,
              name: todoleads[i].name,
              nights: todoleads[i].nights,
              rateHotel: todoleads[i].rateHotel,
              rooms: todoleads[i].rooms,
              segment: todoleads[i].segment,
              status: todoleads[i].status,
              user: todoleads[i].user,
              events: todoleads[i].events,
              totalevents: totale,
              totalhotel: totalh,
              totalgeneral: parseInt(totale)+parseInt(totalh)
             })
        }
        } catch (error) {
        
      }
    },
    verificaPermisos(){
      this.role = JSON.parse(localStorage.getItem('usuario')).role
      console.log(this.role)
    }





  },

}
</script>