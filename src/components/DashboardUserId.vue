<template>
  <div>
    <div v-if="role!='Ejecutivo'">
        <div class="">
        <!-- primer ROW -->
        <div class="row">
          <div class="col-lg-12">
            <div class="">  
              <v-card color="#000000">
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar class="ml-0" color="grey darken-3">
                      <v-icon color="#fafafa">dashboard</v-icon>
                    </v-list-item-avatar>
                    <span class="title font-weight-light" color="#FAFAFA"><h3 style="color: white">Dashboard del usuario {{usuario}}</h3> </span>
                    <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong></strong>  </v-list-item-subtitle>
                   </v-list-item-content>
                 </v-list-item>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    
                </div>
              </v-card>
            </div>
          </div>
          </div>
        </div>
        
        

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
        <v-btn color="#d69c4f" style="color: #FAFAFA;" @click="FiltroDashboardPorId(id, hotelSelected, months, yearSelected)">
          <i class="fas fa-search mr-2"></i> Buscar Registros
        </v-btn>
      </v-col>
    </v-row>
  </v-container> 

  <v-container class="col-md-6">
    <v-row class="ml-9">
      <v-col  md="80">
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="percents.room_revenue"
        color="orange"
      >
        {{ percents.room_revenue }}
      </v-progress-circular>
      <h3 class="text-left mt-4" cols="auto">% de concreción <!-- {{percents.room_revenue}}% --></h3>
      <h3 cols="auto">Room Revenue : {{percents.room_revenue}}%</h3>
      </v-col>
      <v-col  md="80">
        <v-progress-circular
        :rotate="360"
        :size="200"
        :width="40"
        :value="percents.eventos"
        color="green"
      >
        {{ percents.eventos }}
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

 <v-overlay v-if="overlay==true" >
        <v-progress-circular color="#d69c4f" indeterminate size="70"></v-progress-circular>
        <h5>Cargando..</h5>
 </v-overlay>

  <v-container fluid >
  <v-row>
    <v-col class="text-left">
      <v-btn color="#d69c4f" style="color: white;" class="mr-3" @click="anterior">
       <i class="fas fa-arrow-left mr-2"></i> Anterior
      </v-btn>
    </v-col>
    <v-col class="text-right">
      <v-btn color="#d69c4f" style="color: white;" class="mr-3" @click="cambiaLeads(months, yearSelected)">
        <i class="fas fa-list mr-2"></i>  Ver Leads
      </v-btn>
      <v-btn color="#d69c4f" style="color: white;" @click="cambiaVisitas">
       <i class="fas fa-calendar-alt mr-2"></i> IR A VISITAS
      </v-btn>
    </v-col>
  </v-row>
  
</v-container>


</div>
  

<div v-if="role=='Ejecutivo'"> 
      <NotFound/>
</div>

</div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex';
import NotFound from './NotFound'
export default {
  components:{
      NotFound
  },
  data: () => ({
    overlay: false,
    usuario: '',
    id: 0,
    color: '#d69c4f',
    percents: {},
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
      }
    ],
    items: [],
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
      this.cargarUser()
      this.overlay = true
      this.hotelSelected = '[Seleccionar todos]'
      this.monthSelected = JSON.parse(localStorage.getItem('yearandmonth')).month
      this.yearSelected =  JSON.parse(localStorage.getItem('yearandmonth')).year
      this.getNameHotels();
      this.FiltroDashboardPorId(this.id, this.hotelSelected, this.months, this.yearSelected)
      let Dash = JSON.parse(localStorage.getItem('dashboard'))
      if(this.values.length==0 && Dash!=null && this.percents!=null){
        /* this.imprimeNumeros(Dash) */
        this.percents = Dash.porcentajeConcrecion
        this.getNameHotels();
      }
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
      this.verificaPermisos()
      window.scrollTo(500, 0);
    }catch (error){
      console.log('Hubo un error')
    }
  },
  updated() {
  },
  methods: {
    ...mapActions(['getHotels', 'getDashboard', 'stateToken']),
    getNameHotels() {
      let hoteless = JSON.parse(localStorage.getItem('hoteles'))
      for(let i = 0; i < hoteless.length; i++){
        this.hotels.push(hoteless[i].shortName);
      }
    },
    verificaPermisos(){
      this.role = JSON.parse(localStorage.getItem('usuario')).role
    },
    //Filtro dashboard
    async FiltroDashboardPorId(id, hotel, month, year){
      console.log(month)
      let datos_user = JSON.parse(localStorage.getItem('leads-user')).datos
      let fecha = this.monthSelected+' '+year
      let filtro = 0
      if(month.indexOf(this.monthSelected)!=0){
        if(month.indexOf(this.monthSelected)<10){
          filtro = year+'-0'+month.indexOf(this.monthSelected)
        }else{
          filtro = year+'-'+month.indexOf(this.monthSelected)
        } 
      }else{
        filtro=year
      }
      let dataLS = {
        datos: datos_user,
        leads: [],
        fecha: fecha,
        filtro: filtro,
        hotel: this.hotelSelected
      }
      localStorage.setItem('leads-user', JSON.stringify(dataLS))
      let datos = {
    		"hotel": hotel,
    		"month": month.indexOf(this.monthSelected),
    		"year": year
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }

      let url = this.linkServer+'/user/dashboard/ejecutivos/'+id
      await axios.post(url, datos, config)
      .then((res) => {
        let array= []
        this.overlay = false
        array = res.data.table
        this.values = array
        this.percents = res.data.porcentajeConcrecion
        this.imprimeNumeros(res.data)
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
    async FiltroVisitas(id, year){  
      let datos = {
    		"year": year
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      
      let url = this.linkServer+'/user/dashboard/ejecutivos/'+id
      await axios.post(url, datos, config)
      .then((res) => {
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
    },
    cargarUser(){
        try {
            let datos = JSON.parse(localStorage.getItem('leads-user'))
            this.datos = datos
            /* this.usuario = datos.datos.nombre */
            this.usuario = datos.datos.nombre
            this.id = datos.datos.user_id
        } catch (error) {
            
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
        try {
        let array = []
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
      } catch (error) {
        
      }
      this.values = Dash.table 
    },
    cambiaVisitas(){
      let {role} = JSON.parse(localStorage.getItem('usuario')) 
      if(role == 'Supervisor de Segmento'){
        window.location.href = '/dashboard_jefes/visits-user/id'
      }else{
        window.location.href = '/dashboard_gerentes/visits-user/id'
      } 
    },
    anterior(){
      let {role} = JSON.parse(localStorage.getItem('usuario')) 
      if(role == 'Administrador' || role == 'Gerente de ventas'){
        window.location.href = '/dashboard_gerentes'
      }else{
        window.location.href = '/dashboard_jefes'
      }  
    },
    cambiaLeads(month, year){
      let datos_user = JSON.parse(localStorage.getItem('leads-user')).datos
      let fecha = this.monthSelected+' '+year
      let filtro = 0

      if(month.indexOf(this.monthSelected)!=0){
        if(month.indexOf(this.monthSelected)<10){
          filtro = year+'-0'+month.indexOf(this.monthSelected)
        }else{
          filtro = year+'-'+month.indexOf(this.monthSelected)
        } 
      }else{
        filtro = year
      }
      let dataLS = {
        datos: datos_user,
        leads: [],
        fecha: fecha,
        filtro: filtro,
        hotel: this.hotelSelected,
      }

      let {role} = JSON.parse(localStorage.getItem('usuario')) 
      if(role == 'Administrador' || role == 'Gerente de ventas'){
        window.location.href = '/dashboard_gerentes/leads-user/id'
      }else{
        window.location.href = '/dashboard_jefes/leads-user/id'
      }  
    },
    verNoAtendidos(item, valor, month, year){
      let datos_user = JSON.parse(localStorage.getItem('leads-user')).datos
      let fecha = ''
      let filtro = 0
      if(month.indexOf(this.monthSelected)!=0){
        fecha = this.monthSelected+' '+year
        if(month.indexOf(this.monthSelected)<10){
          filtro = year+'-0'+month.indexOf(this.monthSelected)
        }else{
          filtro = year+'-'+month.indexOf(this.monthSelected)
        } 
      }else{
        fecha = year
        filtro=year
      }
      let dataLS = {
        datos: datos_user,
        leads: [],
        fecha: fecha,
        filtro: filtro,
        hotel: this.hotelSelected,
        status: valor
      }
      localStorage.setItem('leads-user', JSON.stringify(dataLS))
      console.log(item, valor)
      

      let {role} = JSON.parse(localStorage.getItem('usuario')) 
      if(role == 'Administrador' || role == 'Gerente de ventas'){
        window.location.href = '/dashboard_gerentes/leads-user/id'
      }else{
        window.location.href = '/dashboard_jefes/leads-user/id'
      }  
    }
   


  },
  
    

};
</script>
