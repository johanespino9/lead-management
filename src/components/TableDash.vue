<template>
  <div>
    <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-combobox v-model="hotelSelected" :items="hotels" label="Seleccionar Hotel"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox v-model="monthSelected" :items="months" label="Seleccionar Mes"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox v-model="yearSelected" :items="years" label="Seleccionar Año"></v-combobox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div class="text-center">
        <v-btn @click="filterPerHotel">Button</v-btn>
      </div>
    </v-row>
    <v-data-table :headers="headers" :items="values">
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>
      <template slot="items" slot-scope="{ item }">
        <td>{{ item.lead }}</td>
        <td>{{ item.prospecto }}</td>
        <td>{{ item.tentativo }}</td>
        <td>{{ item.hot }}</td>
        <td>{{ item.confirmado }}</td>
        <td>{{ item.congelado }}</td>
        <td>{{ item.cancelado }}</td>
        <td class="text-xs-right">{{ item.salary }}</td>
      </template>
    </v-data-table>
    <v-row justify="center">
      <v-col cols="left">
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="roomRevenue"
        color="orange"
      >
        {{ value }}
      </v-progress-circular>
      <h2 cols="auto">Room Revenue : {{roomRevenue}}%</h2>
      </v-col>
      <v-col cols="auto">
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="events"
        color="green"
      >
        {{ value }}
      </v-progress-circular>
      <h2 cols="auto">Event Revenue : {{events}}%</h2>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    hotelSelected: '',
    monthSelected: '',
    yearSelected: null,
    hotels: [],
    months:[
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Setiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    years: [ 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
    headers: [
      {
        sortable: false,
        text: "",
        value: "dato"
      },
      {
        sortable: false,
        text: "Prospecto",
        value: "prospecto"
      },
      {
        sortable: false,
        text: "Tentativo",
        value: "tentativo"
      },
      {
        sortable: false,
        text: "Hot",
        value: "hot"
      },
      {
        sortable: false,
        text: "Confirmado",
        value: "confirmado"
      },
      {
        sortable: false,
        text: "Congelado",
        value: "congelado"
      },
      {
        sortable: false,
        text: "Cancelado",
        value: "cancelado"
      }
    ],
    items: [],
    roomRevenue: null,
    events: null
  }),
  created() {
    try {
      this.getHotels();
      //this.getUser();  
      // this.login();
    } catch (error) {
    }
   
  },
  computed: {
  },
  methods: {
    
    async getHotels() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      let res = await axios.get('https://casa-andina.azurewebsites.net/hotels', config);
      console.log(res);
      for(let i = 0; i < res.data.length; i++){
        this.hotels.push(res.data[i].shortName);
      }
      console.log(this.hotels);
    },
    filterPerHotel(){
      let hotelId = this.hotels.indexOf(this.hotelSelected) + 1;
      let monthId = this.months.indexOf(this.monthSelected) + 1;
      var sendData = {
            hotels:{
              hotelId: hotelId,
              shortName: this.hotelSelected
            },
            month: monthId,
            year: this.yearSelected
      }
      console.log(sendData.hotels.hotelId);
      console.log(sendData.hotels.shortName);
      console.log(sendData.month);
      console.log(sendData.year);

      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      axios
        .post("https://casa-andina.azurewebsites.net/user/dashboard", sendData, config)
        .then(response => {
          // Respuesta del servidor
          this.values = response.data.table;

      this.roomRevenue = response.data.porcentajeConcrecion.room_revenue;
      this.events = response.data.porcentajeConcrecion.eventos;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  
    async getUser() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      let datos = await axios.get(
        "https://casa-andina.azurewebsites.net/robval96/dashboard", config
      );
      this.values = datos.data.table;
    },
    // CREDENCIALES = username: robval96, password: 123456
    login() {
      axios
        .post("https://casa-andina.azurewebsites.net/Home", {
          username: "robval96",
          password: "123456"
        })
        .then(response => {
          // Respuesta del servidor
          console.log(response);
          this.values2 = response.data.table;
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>