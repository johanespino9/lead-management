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

  <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Gestión de Leads</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
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
            <v-btn color="#444444" style="color: #FAFAFA;" dark class="mb-2" v-on="on" >Añadir Nuevo Lead</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
              <v-stepper non-linear v-if="editedIndex=-1">
                      <v-stepper-header>
                        <v-stepper-step
                          editable
                          step="1"
                        >
                          Prospecto
                        </v-stepper-step>
                
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          editable
                          step="2"
                        >
                          Tentativo
                        </v-stepper-step>
                
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          step="3"
                          editable
                        >
                          Hot
                        </v-stepper-step>
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          step="4"
                          editable
                        >
                          Confirmado
                        </v-stepper-step>
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          step="5"
                          editable
                        >
                          Congelado
                        </v-stepper-step>
                        
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          step="6"
                          editable
                        >
                          Cancelado
                        </v-stepper-step>
                      </v-stepper-header>
                    </v-stepper>
            <v-card-text>
              <v-container>
                <v-row >
                  <v-col cols="20" sm="2" md="80" class=center >
                    <v-text-field  disabled  label="Lead ID" ></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-combobox  v-model="editedItem.segment" :items="segments" label="Seleccionar Segmento" ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox  v-model="editedItem.account" :items="leadsAccounts" label="Seleccionar Cuenta"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-combobox  v-model="editedItem.hotel" :items="hotels" label="Seleccionar Hotel"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-text-field   v-model="editedItem.name" label="Nombre de Grupo"></v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center>
                    <v-dialog
                      ref="dialog1"
                      v-model="modal1"
                      :return-value.sync="date1"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
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
                      ref="dialog2"
                      v-model="modal2"
                      :return-value.sync="date2"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date2"
                          label="Fecha Fin"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date2" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog2.save(date2)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center >
                    <v-text-field v-mask="mask" v-if="editedItem.segment!='Eventos' && editedItem.segment!='Series'" v-model="editedItem.rooms" label="Cantidad de Habitaciones" >{{editedItem.rooms}}</v-text-field>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center v-if="editedItem.segment != 'Eventos'" >
                    <v-text-field v-mask="mask" v-model="editedItem.rateHotel" prefix="S/." label="Ingresar Tarifa Neta">{{editedItem.rateHotel}}</v-text-field>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center >
                    <v-text-field v-mask="mask" v-if="editedItem.segment=='Series'" v-model="editedItem.rooms" label="Cantidad de Noches" >{{editedItem.rooms}}</v-text-field>
                  </v-col>
                  

                  <v-col v-if="editedItem.segment =='Series'" cols="20" sm="3" md="80">
                    <v-combobox 
                        v-model="editedItem.month"
                        :items="months"
                        :search-input.sync="search"
                        hide-selected
                        hint=""
                        label="Seleccionar Meses"
                        multiple
                        persistent-hint
                        small-chips
                      
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


                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="3" md="80" >
                    <v-combobox
                        v-model="editedItem.eventsName"
                        :items="items"
                        :search-input.sync="search"
                        hide-selected
                        hint=""
                        label="Seleccionar Eventos"
                        multiple
                        persistent-hint
                        small-chips
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
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center >
                    <v-text-field v-mask="mask" v-model="editedItem.rateEvent1" prefix="S/." label="Ingresar Eventos AyB">{{editedItem.rateEvent1}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center >
                    <v-text-field v-mask="mask" v-model="editedItem.rateEvent2" prefix="S/." label="Ingresar Eventos Equipos">{{editedItem.rateEvent2}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center >
                    <v-text-field v-mask="mask" v-model="editedItem.rateEvent3" prefix="S/." label="Ingresar Eventos Salas">{{editedItem.rateEvent3}}</v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field  v-model="editedItem.contactName" label="Nombre Contacto"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Cargo"></v-text-field>
                  </v-col>-->
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field  v-model="editedItem.contactEmail" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-mask="mask"  v-model="editedItem.contactPhone" label=" Celular/Teléfono"></v-text-field>
                  </v-col>
                </v-row>
                <v-btn @click="calcular">RESUMEN</v-btn>
                <v-row>
                  <v-col> Room Revenue: {{ roomrev }}</v-col>
                </v-row>
                <v-row>
                  <v-col> Eventos: {{  }}</v-col>
                </v-row>
                <v-row>
                  <v-col> <strong> TOTAL: {{ (parseInt(roomrev)) + (parseInt(editedItem.rateEvent)) }} </strong></v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="allItems()">Reset</v-btn>
    </template> -->
  </v-data-table>


        <!-- <v-alert type="success" v-model="snackbar" dismissible width="300" height="50" style="float: right; position:absolute">
           I'm a success alert.
        </v-alert> -->
       

    
    

</div>
</template>



<script>

import axios from "axios";
import {mapActions, mapState} from 'vuex'
import { mask } from 'vue-the-mask'
export default {
  directives: {
      mask,
    },
  data: () => ({
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
    items: ['Alimentos y bebidas', 'Equipos', 'Salas'], // Array Events
    model: [],
    selected:[],
    roomrev: 0,
    dialog: false,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      modal1: false,
      modal2: false,
      menu2: false,
     headers: [
      { text: "Lead ID", value: "leadid" },
      {
        text: "Nombre Lead",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Fecha de Creación", value: "createDate" },
      { text: "Contacto", value: "contactName" },
      { text: "Cuenta", value: "account" },
      { text: "Ingreso de Hotel", value: "rateHotel" },
      { text: "Ingreso de Eventos", value: "rateEvent"},
      { text: "Estado", value: "status" },
      { text: "Actions", value: "action", sortable: false }
      
    ],
    search: "",
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
     
      tarifaneta: 0,
      status: 0
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
      status: 0
    }
  }),
  computed: {
    ...mapState(['Users', 'Hoteles', 'Accounts', 'AllLeads', 'Segmentos', 'accessToken']),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    
    suma:function ({state}) {
      return state.editedItem.rateEvent1+state.editedItem.rateEvent2+state.editedItem.rateEvent3
    },
 
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
    }
    
  },
  created() {
    
  },
  mounted() {
    try {
      var todoleads = JSON.parse(localStorage.getItem('leads'))
      if(this.leadsAccounts.length==0 && this.hotels.length==0 && this.segments.length==0 && this.desserts.length==0){
        this.getNameAccounts();
        this.getNameHotels();
        this.getNameSegments();
        this.desserts = todoleads
        console.log('Carga de Leads completa')
      }
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
    }catch (error){
      console.log('Hubo un error')
    }
  },
  updated() {
     
  },
  created() {
    /* try { 
      
      this.getLeads();
    } catch (error) {   
    }   */
  },
  

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
    calcular(){
      var start = new Date(this.date1)
      var end = new Date(this.date2)
      console.log(start)
      console.log(end)
      this.roomrev = (((end - start)/3600000/24) -1) * this.editedItem.rateHotel * this.editedItem.rooms 
    },
    /* createLead(){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      var events = [ 'Salas', 'Eventos', 'Alimentos y Bebidas']
      var indices = []
      for(var i = 0; i < this.selected.length; i++){
        console.log("HOOOOOLAAAAA")
        console.log(this.selected[i])
        indices.push((this.selected[i]))
      console.log(indices)
      }
      console.log("TOTAL DE INDICES", indices)

      var start = new Date(this.date1)
      var end = new Date(this.date2)
      var nights;
      console.log(start)
      console.log(end)
      nights = (((end - start)/3600000/24) -1)
      // COMPARA ESTE JSON CON EL QUE SI FUNCIONA CUANDO LO HAGAS CON POSTMAN, MAS QUE TODO LA ESTRUCTURA.
     var data = {
    name: this.editedItem.name,
    initialBooking: start,
    finalBooking: end,
    nights: nights,
    months: [],
    rateHotel: parseInt(this.editedItem.rateHotel,10 ),
    rooms: parseInt(this.editedItem.rooms, 10),
    accountId: this.leadsAccounts.indexOf(this.selectedAccount) +1,
    segmentId: this.corporateSegments.indexOf(this.selectedSegment)+1,
    userId: 2,
    hotelId: this.hotels.indexOf(this.selectedHotel) +1,
    contactName: this.editedItem.contactName,
    contactPhone: parseInt(this.editedItem.contactPhone,10),
    contactEmail: this.editedItem.contactEmail,
    events: [
      {
      eventId: 1,
      rateEvent2: 5000
      },
      {
      eventId: 2,
      rateEvent2: 5550
      }
    ]
}
console.log(data);
      var sendData = {}
      axios.post("https://casa-andina.azurewebsites.net/user/leads", data,config) // MIRA ESTOS COMENTARIOS
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })

      this.dialog = false;
    }, */

    //Modified
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

    async getNameAccounts(accounts) {
      var todoaccounts = JSON.parse(localStorage.getItem('accounts'))
      for (let i = 0; i < todoaccounts.length; i++) {
        this.leadsAccounts.push(todoaccounts[i].name);
      }
    },
    allItems(){
      this.getNameAccounts();
      this.getNameHotels();
      this.getNameSegments();
      this.getLeads();
    },
    // hasta aqui
    

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.editedItem.events)
      console.log(this.editedIndex)
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
        /*Object.assign(this.desserts[this.editedIndex], this.editedItem); */
        if(this.editedItem.segment=='Series'){
          this.editSegmentSeriesLead()
        }else if(this.editedItem.segment=='Eventos'){
          this.editEventLead()
        }else{
          this.editOtherLead()
        }
      } else {
        /* this.desserts.push(this.editedItem); */
        if(this.editedItem.segment=='Series'){
          this.addSegmentSeriesLead()
        }else if(this.editedItem.segment=='Eventos'){
          this.addEventLead()
        }else{
          this.addOtherLead()
        }
        
      } 
      this.close();
      this.type='success'
      this.showAlert()
    },
    /*  POST ADD LEADS */
    verdatos(){
      try {
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var f1 = Date.parse(this.editedItem.initialdate)
      var f2 = Date.parse(this.editedItem.finaldate)
      var fe1= new Date(f1)
      var fe2= new Date(f2)

      var rateevent =[]
      var events =[]
      rateevent.push(this.editedItem.rateEvent1, this.editedItem.rateEvent2,this.editedItem.rateEvent3)
      console.log(rateevent)
      console.log(this.editedItem.eventsName)
      console.log(this.editedItem.eventsName.length)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         console.log(this.editedItem.eventsName[i], rateevent[i])
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "name": this.editedItem.name,
        "nights": this.editedItem.nights,
        "initialBooking": fe1,
        "finalBooking": fe2,
        "rateHotel": this.editedItem.rateHotel,
        "rooms": this.editedItem.rooms,
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": this.editedItem.contactPhone,
        "contactEmail": this.editedItem.contactEmail,
        "months": this.editedItem.month,
        "events": events
      }
      console.log(datos)
      } catch (error) {
        console.log(error)
      }
    },
    //Agregar nuevo Lead Segmentos
    async addSegmentSeriesLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var f1 = Date.parse(this.editedItem.initialdate)
      var f2 = Date.parse(this.editedItem.finaldate)
      var fe1= new Date(f1)
      var fe2= new Date(f2)

      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var datos={
        "name": this.editedItem.name,
        "nights": 5,
        "initialBooking": "",
        "finalBooking": "",
        "rateHotel": parseInt(this.editedItem.rateHotel),
        "rooms": parseInt(this.editedItem.rooms),
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "months": this.editedItem.month,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      console.log(datos)
      let url = 'https://casa-andina.azurewebsites.net/user/leads'
      await axios.post(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = this.AllLeads
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    //Agregar Lead de eventos
    async addEventLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      /* var f1 = Date.parse(this.editedItem.initialdate)
      var f2 = Date.parse(this.editedItem.finaldate)
      var fe1= new Date(f1)
      var fe2= new Date(f2) */
      var rateevent =[]
      var events =[]
      rateevent.push(this.editedItem.rateEvent1, this.editedItem.rateEvent2,this.editedItem.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         console.log(this.editedItem.eventsName[i], rateevent[i])
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
      console.log(datos)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = 'https://casa-andina.azurewebsites.net/user/leads'
      await axios.post(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = this.AllLeads
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    //Agregar otro tipo de Lead 
    async addOtherLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var rateevent =[]
      var events =[]
      rateevent.push(this.editedItem.rateEvent1, this.editedItem.rateEvent2,this.editedItem.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         console.log(this.editedItem.eventsName[i], rateevent[i])
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "name": this.editedItem.name,
        "initialBooking": this.editedItem.initialdate,
        "finalBooking": this.editedItem.finaldate,
        "rateHotel": parseInt(this.editedItem.rateHotel),
        "rooms": parseInt(this.editedItem.rooms),
        "account": this.editedItem.account,
        "nights": 8,
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
      let url = 'https://casa-andina.azurewebsites.net/user/leads'
      await axios.post(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = this.AllLeads
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },

    /* EDICIONES LEADS */
     //Edita Lead Segmentos
    async editSegmentSeriesLead(){
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "nights": 5,
        "initialBooking": "",
        "finalBooking": "",
        "rateHotel": parseInt(this.editedItem.rateHotel),
        "rooms": parseInt(this.editedItem.rooms),
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "months": this.editedItem.month,
      }
      console.log(datos)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      console.log(datos)
      let url = 'https://casa-andina.azurewebsites.net/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = this.AllLeads
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    //EDITAR Lead de eventos
    async editEventLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      /* var f1 = Date.parse(this.editedItem.initialdate)
      var f2 = Date.parse(this.editedItem.finaldate)
      var fe1= new Date(f1)
      var fe2= new Date(f2) */
      var rateevent =[]
      var events =[]
      rateevent.push(this.editedItem.rateEvent1, this.editedItem.rateEvent2,this.editedItem.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         console.log(this.editedItem.eventsName[i], rateevent[i])
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
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
      let url = 'https://casa-andina.azurewebsites.net/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = this.AllLeads
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    //Editar otro tipo de Lead 
    async editOtherLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "initialBooking": this.editedItem.initialdate,
        "finalBooking": this.editedItem.finaldate,
        "rateHotel": parseInt(this.editedItem.rateHotel),
        "rooms": parseInt(this.editedItem.rooms),
        "account": this.editedItem.account,
        "nights": 8,
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
      let url = 'https://casa-andina.azurewebsites.net/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = this.AllLeads
      }).catch(error => {
        console.log('Hubo un error ', error)
      })
    },
    


  }
}
</script>