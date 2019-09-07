<template>
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
            <v-btn color="primary" dark class="mb-2" v-on="on">Añadir Nuevo Lead</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
              <v-stepper non-linear>
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
                <v-row>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox
                      v-model="selectedSegment"
                      :items="corporateSegments"
                      label="Seleccionar Segmento"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox v-model="selectedAccount" :items="leadsAccounts" label="Seleccionar Cuenta"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox v-model="selectedHotel" :items="hotels" label="Seleccionar Hotel"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-text-field v-model="editedItem.name" label="Nombre de Grupo"></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center>
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
                  <v-col cols="20" sm="2" md="80" class=center>
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
                  <v-col cols="20" sm="2" md="80" class=center>
                    <v-text-field v-model="editedItem.rooms" label="Cantidad de Habitaciones"></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center>
                    <v-text-field v-model="editedItem.rateHotel" label="Ingresar Tarifa Neta"></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="4" md="80">
                    <v-combobox
                        v-model="model"
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
                  <v-col cols="20" sm="2" md="80" class=center>
                    <v-text-field v-model="editedItem.rateEvent" label="Ingresar Eventos AyB"></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center>
                    <v-text-field v-model="editedItem.rateEvent" label="Ingresar Eventos Equipos"></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="2" md="80" class=center>
                    <v-text-field v-model="editedItem.rateEvent" label="Ingresar Eventos Salas"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactName" label="Nombre Contacto"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Cargo"></v-text-field>
                  </v-col>-->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactEmail" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.contactPhone" label=" Celular/Teléfono"></v-text-field>
                  </v-col>
                </v-row>
                <v-btn @click="calcular">RESUMEN</v-btn>
                <v-row>
                  <v-col> Room Revenue: {{ roomrev }}</v-col>
                </v-row>
                <v-row>
                  <v-col> Eventos: {{ editedItem.rateEvent }}</v-col>
                </v-row>
                <v-row>
                  <v-col> <strong> TOTAL: {{ (parseInt(roomrev)) + (parseInt(editedItem.rateEvent)) }} </strong></v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createLead">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
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
      {
        text: "Nombre Lead",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Fecha de Creación", value: "initialBooking" },
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
    corporateSegments: ["Grupos", "Largas Estadías", "Tripulación"],
    leadsAccounts: [],
    hotels: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      contactName: '',
      rooms: 0,
      rateHotel: 0,
      rateEvent: 0,
      finaldate: 0,
      contact: '',
      account: '',
      tarifaneta: 0,
      status: 0
    },
    defaultItem: {
      name: "",
      contactName: '',
      rooms: 0,
      rateHotel: 0,
      rateEvent: 0,
      finaldate: 0,
      contact: '',
      account: '',
      tarifaneta: 0,
      status: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  beforeMount() {
    this.getAccounts();
    this.getHotels();
    this.getLeads();
  },
  created() {
    this.initialize();
  },

  methods: {
    async getLeads(){
      await axios.get('https://casa-andina.azurewebsites.net/user/leads')
      .then((response) => {
        console.log(response)
        this.desserts = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    calcular(){
      var start = new Date(this.date1)
      var end = new Date(this.date2)
      console.log(start)
      console.log(end)
      this.roomrev = (((end - start)/3600000/24) -1) * this.editedItem.rateHotel * this.editedItem.rooms 
    },
    createLead(){
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
      
     var data = {
    name: this.editedItem.name,
    initialBooking: start,
    finalBooking: end,
    nights: nights,
    months: [0,0],
    rateHotel: this.editedItem.rateHotel,
    rooms: this.editedItem.rooms,
    accountId: this.leadsAccounts.indexOf(this.selectedAccount) +1,
    segmentId: this.corporateSegments.indexOf(this.selectedSegment)+1,
    userId: 2,
    hotelId: this.hotels.indexOf(this.selectedHotel) +1,
    contactName: this.editedItem.contactName,
    contactPhone: this.editedItem.contactPhone,
    contactEmail: this.editedItem.contactEmail,
    events: [
      {
      eventId: 1,
      rateEvent: 5000
      },
      {
      eventId: 2,
      rateEvent: 5550
      }
    ]
}

console.log(data);
      var sendData = {}
      axios.post("https://casa-andina.azurewebsites.net/user/leads", data,config)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })

      this.dialog = false;
    },
    async getHotels() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      let respuesta = await axios.get(
        "https://casa-andina.azurewebsites.net/hotels", config
      );
      for (let i = 0; i < respuesta.data.length; i++) {
        this.hotels.push(respuesta.data[i].shortName);
      }
      console.log(this.hotels);
    },
    async getAccounts() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      const res = await axios.get(
        "https://casa-andina.azurewebsites.net/user/account", config
      );
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        this.leadsAccounts.push(res.data[i].name);
      }
      console.log(this.leadsAccounts);
    },
    
    initialize() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      axios.get('https://casa-andina.azurewebsites.net/user/leads', config)
      .then((res) => {
        console.log(res.data)
        this.desserts = res.data;  
      })
      
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>