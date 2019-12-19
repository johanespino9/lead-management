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
    <v-row class="ml-9">
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
      <h3 class="text-left mt-4" cols="auto">% de concreción <!-- {{percents.room_revenue}}% --></h3>
      <h3 cols="auto">Room Revenue : {{percents.room_revenue}}%</h3>
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
      <h3 class="text-left mt-4" cols="auto">% de concreción <!-- {{percents.room_revenue}}% --></h3>
      <h3 cols="auto">Event Revenue : {{percents.eventos}}%</h3>

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
    <template>
        <v-simple-table
          hide-default-header
          hide-default-footer
        >
          <template v-slot:default>
            <tbody>
              <tr v-for="item in values2" :key="item.dato">
                <td>{{ item.dato }}</td>
                <td class="text-left"><v-btn  @click="verNoAtendidos(item.prospecto, 'Prospecto',months, yearSelected)" fab dark small color="primary">{{ item.prospecto }}</v-btn> </td>
                <td class="text-left"><v-btn  @click="verNoAtendidos(item.tentativo, 'Tentativo',months, yearSelected)" fab dark small color="primary">{{ item.tentativo }}</v-btn></td>
                <td class="text-left"><v-btn  @click="verNoAtendidos(item.hot, 'Hot',months, yearSelected)" fab dark small color="primary">{{ item.hot }}</v-btn></td>
                <td class="text-left"><v-btn  disabled @click="verNoAtendidos(item.congelado, 'Congelado',months, yearSelected)" fab  small color="primary" style="color: #000;" >{{ item.congelado }}</v-btn></td>
                <td class="text-left"><v-btn  disabled @click="verNoAtendidos(item.cancelado, 'Cancelado',months, yearSelected)" fab  small color="primary" style="color: #000;" >{{ item.cancelado }}</v-btn></td>
                <td class="text-left"><v-btn  disabled @click="verNoAtendidos(item.confirmado, 'Confirmado',months, yearSelected)" fab  small color="primary" style="color: #000;" >{{ item.confirmado}}</v-btn></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
    </template>
</v-container>




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
    visitas: [],
    roomRevenue: null,
    events: null,
    role: '',
    values2: []
  }),


  computed: {
    ...mapState(['Users', 'Hoteles', 'Dashboard', 'accessToken', 'linkServer']),
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
        /* this.imprimeNumeros(Dash) */
        this.FiltroDashboard()
        /* this.percents = Dash.porcentajeConcrecion */
        this.getNameHotels();
      }
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
      this.verificaPermisos()
      console.clear()
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
      let datos = {
    		"hotel": this.hotelSelected,
    		"month": this.months.indexOf(this.monthSelected),
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = this.linkServer+'/user/dashboard/ejecutivos'
      console.log(this.linkServer)
      console.log(url)
      await axios.post(url, datos, config)
      .then((res) => {
        this.imprimeNumeros(res.data)
        this.percents = res.data.porcentajeConcrecion
        let array = res.data.table
        let array2 = []
        for(let i=3; i<array.length; i++){
          array2.push(array[i]);
        }
        this.values2 = array2
        let array3 = []
        for(let i=0; i<array.length-1; i++){
          array3.push(array[i])
        }
        this.values = array3
      }) 
      .catch((error) => {
        console.log('Hubo un error',error)
        /* localStorage.removeItem('token') */
      })
      
    },
    verNoAtendidos(item, valor, month, year){
      let fecha = this.monthSelected+' '+year
      let filtro = 0
      if(month.indexOf(this.monthSelected)<10){
        filtro = year+'-0'+month.indexOf(this.monthSelected)
      }else{
        filtro = year+'-'+month.indexOf(this.monthSelected)
      } 
      let dataLS = {
        datos: {
          user_id: JSON.parse(localStorage.getItem('usuario')).userId
        },
        search: '',
        fecha: fecha,
        filtro: filtro,
        hotel: this.hotelSelected,
        status: valor
      }
      localStorage.setItem('leads-user', JSON.stringify(dataLS))
      window.location.href = '/#/dashboard-ejecutivos/leads-user/id'
      /* localStorage.setItem('leads-user', JSON.stringify(dataLS))
      console.log(item, valor)
      let {role} = JSON.parse(localStorage.getItem('usuario')) 
      if(role == 'Administrador' || role == 'Gerente de ventas'){
        window.location.href = '/#/dashboard_gerentes/leads-user/id'
      }else{
        window.location.href = '/#/dashboard_jefes/leads-user/id'
      }  */ 
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
    },
    verificaPermisos(){
      this.role = JSON.parse(localStorage.getItem('usuario')).role
      if(this.role == 'Ejecutivo' || this.role == 'Supervisor de Segmento'){
        localStorage.removeItem('dashgerente')
      }
    },

  },

};
</script>
<style >
  #contenedor{
    background-color: #fff;
  }
</style>
