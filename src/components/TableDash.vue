<template>
  <div>
    <v-container class="col-md-10 ">
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
      <v-col cols="auto" style="margin-top: 10px;">
        <v-btn @click="FiltroDashboard()">Buscar Registros</v-btn>
      </v-col>
    </v-row>
  </v-container>  
  <v-container class="col-md-12">
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
</v-container>

<v-container class="col-md-6 ">
    <v-row >
      <v-col>
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="percents.room_revenue"
        color="orange"
      >
        {{ percents.room_revenue }}
      </v-progress-circular>
      <h2 cols="auto">Room Revenue : {{percents.room_revenue}}%</h2>
      </v-col>
      <v-col>
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="percents.eventos"
        color="green"
      >
        {{ percents.eventos }}
      </v-progress-circular>
      <h2 cols="auto">Event Revenue : {{percents.eventos}}%</h2>
      </v-col>
    </v-row>

    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    percents: {},
    values:[],
    value: 0,
    hotelSelected: null,
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


  computed: {
    ...mapState(['Users', 'Hoteles', 'Dashboard', 'accessToken']),
  },
  mounted() {
    try {
      var Dash = JSON.parse(localStorage.getItem('dashboard'))
      if(this.values.length==0 && Dash!=null && this.percents!=null){
        this.values = Dash.table
        this.percents = Dash.porcentajeConcrecion
        this.getNameHotels();
        console.log('Carga Dash completa')
      }
      /* this.$store.dispatch('getUsers')
        this.desserts= this.Users */
    }catch (error){
      console.log('Hubo un error')
    }
    /* console.log(this.Dashboard)
    this.values = this.Dashboard
    console.log(this.values) */
  },
  methods: {
    ...mapActions(['getHotels', 'getDashboard']),
    getNameHotels() {
      var hoteless = JSON.parse(localStorage.getItem('hoteles'))
      for(let i = 0; i < hoteless.length; i++){
        this.hotels.push(hoteless[i].shortName);
      }
    },
/* 
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
    }, */
    async FiltroDashboard(){
      var datos = {
    		"hotel": this.hotels.indexOf(this.hotelSelected) + 1,
    		"month": this.months.indexOf(this.monthSelected) + 1,
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      console.log(datos)
      let url = 'https://casa-andina.azurewebsites.net/user/dashboard'
      await axios.post(url, datos, config)
      .then((res) => {
        console.log(res.data)
        this.values = res.data.table
        this.percents = res.data.porcentajeConcrecion
      }) 
      .catch((error) => {
        console.log('Hubo un error',error)
        /* localStorage.removeItem('token') */
      })
      
    }

    
    // CREDENCIALES = username: robval96, password: 123456
    /* login() {
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
    } */
  }
};
</script>
