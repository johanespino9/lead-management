<template>
  <div id="contenedor">
    <v-container class="col-md-10 ">
    <v-row justify="center">
      <v-col cols="auto">
        <v-combobox  v-model="hotelSelected" :items="hotels"  label="Seleccionar Hotel" :color="color" ></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox color="#d69c4f" v-model="monthSelected" :items="months" label="Seleccionar Mes"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox color="#d69c4f" v-model="yearSelected" :items="years" label="Seleccionar Año"></v-combobox>
      </v-col>
      <v-col cols="auto" style="margin-top: 10px;">
        <v-btn color="#d69c4f" style="color: #FAFAFA;" @click="FiltroDashboard()">Buscar Registros</v-btn>
      </v-col>
    </v-row>
  </v-container>  

  <v-container class="col-md-6">
    <v-row >
      <v-col>
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="percents.room_revenue"
        color="orange"
      >
        %{{ percents.room_revenue }}
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
        %{{ percents.eventos }}
      </v-progress-circular>
      <h2 cols="auto">Event Revenue : {{percents.eventos}}%</h2>
      </v-col>
    </v-row>

  </v-container>

  <v-container class="col-md-12">
   <v-data-table hide-default-footer :headers="headers" :items="values">
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>
      <template slot="items" slot-scope="{ item }">
        <td><strong> {{ item.lead }}</strong> </td>
        <td>{{ item.prospecto }}</td>
        <td>{{ item.tentativo }}</td>
        <td>{{ item.hot }}</td>
        <td>{{ item.congelado }}</td>
        <td>{{ item.cancelado }}</td>
        <td>{{ item.confirmado }}</td>
        <td class="text-xs-right">{{ item.salary }}</td>
      </template>
    </v-data-table>
</v-container>

<div class="row">
  <div class="col-lg-6">
              <!-- SEGUNDO CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
           <div class="card"> 
                <v-card light >
                  <v-card-title>
                    <span class="title font-weight-light"><strong>Visitas por realizar</strong> </span>
                  </v-card-title>
                  <div class="position-relative mb-4" style="margin-top:0;">
                      <template>
                      <v-data-table
                          hide-default-footer
                          color="#000000"
                          :headers="headers"
                          :items="values"
                          :sort-by="['mconcretado']"
                          :sort-desc="[true]"
                          :items-per-page="10"
                          :page.sync="page"
                          @page-count="pageCount = $event"
                          class="elevation-1"
                      ></v-data-table>
                  </template>
                  </div>
                </v-card>
          </div> 
  </div>
    

</div>

<div id="robotin" style="margin-bottom: 30px; margin-right: 10px; display:scroll;position:fixed; bottom:0px; right:0px;cursor:pointer;max-width:120px;">
  <a href=""> <img style="margin-bottom: 10px;" src="../assets/robotin.gif" alt="robotin"></a>
  
</div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    color: '#d69c4f',
    percents: {},
    page: 1,
    pageCount: 0,
    values:[],
    value: 0,
    hotelSelected: null,
    monthSelected: '',
    yearSelected: null,
    hotels: ['[Seleccionar todos]'],
    months:['[Seleccionar todos]',
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
    years: [],
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
        text: "Congelado",
        value: "congelado"
      },
      {
        sortable: false,
        text: "Cancelado",
        value: "cancelado"
      },
      {
        sortable: false,
        text: "Confirmado",
        value: "confirmado"
      },
      
    ],
    items: [],
    roomRevenue: null,
    events: null,

  }),


  computed: {
    ...mapState(['Users', 'Hoteles', 'Dashboard', 'accessToken']),
  },
  created() {
    
  },
  mounted() {  
    try {
      this.cargarAños()
      this.hotelSelected = '[Seleccionar todos]'
      this.monthSelected = '[Seleccionar todos]'
      var fecha = new Date();
      var año = fecha.getFullYear();
      this.yearSelected = año 
      var Dash = JSON.parse(localStorage.getItem('dashboard'))
      if(this.values.length==0 && Dash!=null && this.percents!=null){
        this.values = Dash.table
        this.percents = Dash.porcentajeConcrecion
        this.getNameHotels();
      }
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
      /* this.$store.dispatch('getUsers')
        this.desserts= this.Users */
    }catch (error){
      console.log('Hubo un error')
    }
  },
  updated() {
  },
  methods: {
    ...mapActions(['getHotels', 'getDashboard', 'stateToken']),
    getNameHotels() {
      var hoteless = JSON.parse(localStorage.getItem('hoteles'))
      for(let i = 0; i < hoteless.length; i++){
        this.hotels.push(hoteless[i].shortName);
      }
    },
    //Filtro dashboard
    async FiltroDashboard(){
      var datos = {
    		"hotel": this.hotelSelected,
    		"month": this.months.indexOf(this.monthSelected),
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      console.log(datos)
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/ejecutivos'
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
      
    },
    cargarAños(){
      var fecha = new Date();
      var año = fecha.getFullYear();
      for(var i=2018; i<=año; i++){
        this.years.push(i)
      }
    }


  },

};
</script>
<style >
  #contenedor{
    background-color: #fff;
  }
</style>
