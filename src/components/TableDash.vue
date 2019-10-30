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
                          :headers="header_visits"
                          :items="visitas"
                          :sort-by="['mconcretado']"
                          :sort-desc="[true]"
                          :items-per-page="5"
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
    header_visits: [
          {text: 'Cuenta', align: 'left', value: 'name',},
          {text: 'Categoria', align: 'left', value: 'name',},
          {text: 'Lógica', align: 'left', value: 'name',},
          {text: 'Última visita', align: 'left', value: 'name',},
          {text: 'Dias sin visita', align: 'left', value: 'name',}
    ],
    items: [],
    visitas: [],
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
      var Dash = JSON.parse(localStorage.getItem('dashboard'))
      if(this.values.length==0 && Dash!=null && this.percents!=null){ 
        this.imprimeNumeros(Dash)
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
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/ejecutivos'
      await axios.post(url, datos, config)
      .then((res) => {
        this.imprimeNumeros(Dash)
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
    },
    separaNumeros(numero){
      try {
        const num = numero.toFixed(2);
        const tamaño = num.toString().length
        let nuevo_num = ''
        let index = 1
        for(let i=tamaño-1; i>=0; i--){
            if(num.toString().charAt(i)=='.'){
                index = 1
                nuevo_num += num.toString().charAt(i)
            }else{
                if(index%3==0){
                    nuevo_num += num.toString().charAt(i)
                    if(i>0){
                      nuevo_num += ','
                    }
                    index++
                }else{
                    nuevo_num += num.toString().charAt(i)
                    index++   
                }
            }
        }
        let tamaño2 = nuevo_num.length
        let numero_separado = ''
        for(let i=tamaño2-1; i>=0; i--){
            numero_separado += nuevo_num.charAt(i)
        }
        return numero_separado;
      } catch (error) { 
      }
    },
    imprimeNumeros(Dash){
      for(let i=1; i< Dash.table.length-1; i++){
        let num_separado1 = `$ ${this.separaNumeros(Dash.table[i].prospecto)}`
        let num_separado2 = `$ ${this.separaNumeros(Dash.table[i].tentativo)}`
        let num_separado3 = `$ ${this.separaNumeros(Dash.table[i].hot)}`
        let num_separado4 = `$ ${this.separaNumeros(Dash.table[i].congelado)}`
        let num_separado5 = `$ ${this.separaNumeros(Dash.table[i].cancelado)}`
        let num_separado6 = `$ ${this.separaNumeros(Dash.table[i].confirmado)}`
        Dash.table[i].prospecto = num_separado1
        Dash.table[i].tentativo = num_separado2
        Dash.table[i].hot = num_separado3
        Dash.table[i].congelado = num_separado4
        Dash.table[i].cancelado = num_separado5
        Dash.table[i].confirmado = num_separado6
      }
      this.values = Dash.table
    }


  },

};
</script>
<style >
  #contenedor{
    background-color: #fff;
  }
</style>
