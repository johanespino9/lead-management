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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Añadir Nuevo Lead</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="auto">
                    <v-combobox
                      v-model="selectedSegments"
                      :items="corporateSegments"
                      label="Seleccionar Segmento"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="auto">
                    <v-combobox v-model="selectedAccount" :items="leadsAccounts" label="Seleccionar Cuenta"></v-combobox>
                  </v-col>
                  <v-col cols="auto">
                    <v-combobox v-model="selectedHotel" :items="hotels" label="Seleccionar Hotel"></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nombre de Grupo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.description" label="Descripción de Lead"></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
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
                          label="Picker in dialog"
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
                  <v-col cols="12" lg="6">
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
                          label="Picker in dialog"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.rooms" label="Cantidad de Habitaciones"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.rateHotel" label="Ingresar Tarifa Neta"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Ingresar Tarifa Total"></v-text-field>
                  </v-col>
                  <v-col cols="auto">
                    <v-radio-group v-model="ex5" column label="Seleccionar Evento">
                      <v-radio label="Salas" value="salas"></v-radio>
                      <v-radio label="Equipos" value="equipos"></v-radio>
                      <v-radio label="Venta AyB" value="ayb"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="auto">
                    <v-text-field v-model="editedItem.rateEvent" label="Ingresar Revenue Eventos"></v-text-field>
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
      { text: "Últ. Fech Modif", value: "finaldate" },
      { text: "Contacto", value: "contact" },
      { text: "Cuenta", value: "account" },
      { text: "Tarifa Neta", value: "tarifaneta" },
      { text: "Estado", value: "status" },
      { text: "Actions", value: "action", sortable: false }
    ],
    search: "",
    desserts: [],
    selectedAccount: '',
    selectedHotel: '',
    corporateSegments: ["Grupos", "Largas Estadías", "Tripulación"],
    leadsAccounts: [],
    hotels: [],
    agencySegments: ["Grupos", "Series"],
    editedIndex: -1,
    editedItem: {
      name: "",
      contactName: '',
      description: '',
      rooms: null,
      rateHotel: null,
      rateEvent: null,
      finaldate: 0,
      contact: 0,
      account: 0,
      tarifaneta: 0,
      status: 0
    },
    defaultItem: {
      name: "",
      finaldate: 0,
      contact: 0,
      account: 0,
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
  },
  created() {
    this.initialize();
  },

  methods: {

    createLead(){
      var sendData = {
        name: this.editedItem.name,
        description: this.editedItem.description,
        initialBooking: "2019-08-16T00:00:00.000+0000",
        finalBooking: "2019-08-16T00:00:00.000+0000",
        nights: 5,
        months: 3,
        rateHotel: this.editedItem.rateHotel,
        rateEvent: this.editedItem.rateEvent,
        rooms: this.editedItem.rooms,
        accountId: this.leadsAccounts.indexOf(this.selectedAccount) +1,
        userId: 2,
        hotelId: this.hotels.indexOf(this.selectedHotel) +1,
        eventsServiceId: null,
        contactName: this.editedItem.contactName,
        contactPhone: null,
        contactEmail: null,
        statusId: null,
        events: [
            1,
            2
        ]
      }
      axios.post("https://casa-andina.azurewebsites.net/user/leads", sendData)
      .then((res) => {
        console.log(res)
      })
    },
    async getHotels() {
      let respuesta = await axios.get(
        "https://casa-andina.azurewebsites.net/hotels"
      );
      for (let i = 0; i < respuesta.data.length; i++) {
        this.hotels.push(respuesta.data[i].shortName);
      }
      console.log(this.hotels);
    },
    async getAccounts() {
      const res = await axios.get(
        "https://casa-andina.azurewebsites.net/user/account"
      );
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        this.leadsAccounts.push(res.data[i].name);
      }
      console.log(this.leadsAccounts);
    },
    initialize() {
      this.desserts = [
        {
          name: "Alquiler de cuarto en Huanuco",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Chiclayo",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Huaraz",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Piura",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Tacna",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Lima",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Trujillo",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Ancash",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Tumbes",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        },
        {
          name: "Alquiler de cuarto en Arequipa",
          finaldate: 159,
          contact: 6,
          account: 0,
          tarifaneta: 0,
          status: 0
        }
      ];
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