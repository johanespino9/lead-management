<template>
<div>
    <!-- Los que no son ejecutivos no tienen acceso -->
    <div v-if="role!='Ejecutivo'">
        <div class="">
        <!-- primer ROW -->
        <div class="row">
          <div class="col-lg-12">
            <div class="">  
              <v-card color="#000000" >
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar class="ml-0" color="grey darken-3">
                      <v-icon color="#fafafa">dashboard</v-icon>
                    </v-list-item-avatar>
                    <span class="title font-weight-light" color="#FAFAFA"><h3 style="color: white">Dashboard Gerentes</h3> </span>
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
     
        <!-- COMIENZAN LOS CARDS -->
    <div class="wrapper">
      
        <div class="card" style="background: #FFF; margin-top: 0px; margin-bottom: 10px; border-radius: 5px;">
            <v-container class="col-md-10">
            <v-row justify="center">
                <!-- <v-col cols="auto">
                <v-combobox :items="groupSegments" v-model="groupSegment" color="#757575" label="Group Segment"></v-combobox>
                </v-col> -->
                <v-col cols="auto">
                <v-combobox :items="months" v-model="monthSelected" color="#757575" label="Seleccionar Mes"></v-combobox>
                </v-col>
                <v-col cols="auto">
                <v-combobox :items="years" v-model="yearSelected" color="#757575" label="Seleccionar Año"></v-combobox>
                </v-col>
                <v-col cols="auto" style="margin-top: 12px;">
                <v-btn id="btn-filtro" color="#000000" style="color: #FAFAFA;" v-on:click="Filtro()">Filtrar Registros</v-btn>
                </v-col>
            </v-row>
            </v-container>
         </div>

        <!-- SEGUNDO ROW -->
        <div class="row">
          <div class="col-lg-6">
            <!-- PRIMER CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar class="ml-0" color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/hotel-2-64.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <span class="title font-weight-light"><strong>Alojamiento</strong> </span>
                    <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong></strong>  </v-list-item-subtitle>
                   </v-list-item-content>
                 </v-list-item>

                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <div id="chart">
                  </div>
                </div>
              </v-card>
            </div>
          </div>
          <!-- /.card -->
          <!-- HASTA ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
          
          <div class="col-lg-6">
            <!-- SEGUNDO CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar class="ml-0" color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/gift-3-48.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <span class="title font-weight-light"> <strong>Eventos</strong></span>
                    <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong></strong>  </v-list-item-subtitle>
                   </v-list-item-content>
                 </v-list-item>

                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <div id="chart2"></div>
                </div>

              </v-card>
            </div>
          </div>
          <!-- /.card -->
          <!-- HASTA ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
        </div>

        <!-- TERCER ROW -->
        <div class="row">
          <div class="col-lg-6">
            <!-- PRIMER CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar class="ml-0" color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/hotel-2-64.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <span class="title font-weight-light"><strong>Visitas</strong> </span>
                    <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong></strong>  </v-list-item-subtitle>
                   </v-list-item-content>
                 </v-list-item>

                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <div id="chart3"></div>
                </div>
              </v-card>
            </div>
   
          </div>
          <!-- /.card -->
          <!-- HASTA ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
          
          <div class="col-lg-6">
            <!-- SEGUNDO CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <span class="title font-weight-light"><strong>Alojamiento</strong> </span>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts1"
                        :sort-by="['mconcretado']"
                        :sort-desc="[true]"
                        :items-per-page="3"
                        class="elevation-1"
                        hide-default-footer
                        :page.sync="page"
                        @page-count="pageCount = $event"
                    ></v-data-table>
                    <div class="text-center pt-2">
                      <v-pagination v-model="page" :length="pageCount"></v-pagination>
                    </div>
                </template>
                </div>
              </v-card>
            </div>

            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <span class="title font-weight-light"><strong>Eventos</strong> </span>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts2"
                        :sort-by="['mconcretado']"
                        :sort-desc="[true]"
                        :items-per-page="3"
                        class="elevation-1"
                        hide-default-footer
                        :page.sync="page2"
                        @page-count="pageCount2 = $event"
                    ></v-data-table>
                    <div class="text-center pt-2">
                      <v-pagination v-model="page" :length="pageCount"></v-pagination>
                    </div>
                </template>
                </div>
              </v-card>
            </div>

            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <span class="title font-weight-light"><strong>Visitas</strong> </span>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers_visits"
                        :items="desserts3"
                        :sort-by="['mconcretado']"
                        :sort-desc="[true]"
                        :items-per-page="4"
                        class="elevation-1"
                        hide-default-footer
                        :page.sync="page3"
                        @page-count="pageCount3 = $event"
                    ></v-data-table>
                    <div class="text-center pt-2">
                      <v-pagination v-model="page" :length="pageCount"></v-pagination>
                    </div>
                </template>
                </div>
              </v-card>
            </div>

          </div>
        </div>
      </div>

      <v-btn id="btn-modal1" color="#000000" style="display:none;" dark @click="abreModalHoteles()">Abrir Modal</v-btn>
      <v-btn id="btn-modal2" color="#000000" style="display:none;" dark @click="abreModalEventos()">Abrir Modal</v-btn>
      <v-btn id="btn-modal3" color="#000000" style="display:none;" dark @click="abreModalVisitas()">Abrir Modal</v-btn>

      <v-dialog  fullscreen   v-model="dialog" persistent max-width="1000px" hide-overlay transition="dialog-bottom-transition">   
            <!-- <template v-slot:activator="{ on }">
                <v-btn color="#000000" dark v-on="on">Nueva Reserva</v-btn>
            </template> -->
      
         <v-card>
                <v-toolbar dark >
                <!-- <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn> -->
                <v-toolbar-title>
                  <v-container>
                    Ejecutivos del Grupo de Segmento {{dataModal.groupSegment}} -
                  </v-container>
                </v-toolbar-title>
                <v-toolbar-title class="text-right">{{dataModal.type}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar-items>

                <v-toolbar-items>
                    
                </v-toolbar-items>
                </v-toolbar> 

               <!--  <v-card color="#000000" >
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar class="ml-0" color="grey darken-3">
                      <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-list-item-avatar>
                    <span class="title font-weight-light" color="#FAFAFA"><h5 style="color: white"> Ejecutivos del Grupo de Segmento {{dataModal.groupSegment}} - {{dataModal.type}}</h5> </span>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                  
                    <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong>Hoteles</strong>  </v-list-item-subtitle>
                   </v-list-item-content>
                 </v-list-item>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    
                </div>
              </v-card> -->
                <v-list three-line subheader>
                <v-list-item>
                  <v-container justify-center>
                      <div id="div1" class="position-relative mb-4 text-center" style="margin-top:0;">
                        <div id="chart4"></div>
                      </div>
                  </v-container>
                </v-list-item>
                </v-list>
                <v-divider></v-divider>

                <v-data-table
                    :headers="headers_usersg"
                    :items="groups_user"
                     item-key="name"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <!-- <template v-slot:expanded-item="{ headers }">
                        <div class="container">
                        
                        </div>
                    </template> -->
                    <template v-slot:item.action="{ item }">
                    <!-- <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      edit
                    </v-icon> -->
                    <v-btn @click="visitarUsuario(item)">
                      Visitar perfil
                      <v-icon > supervised_user_circle</v-icon>
                      </v-btn>
                    <!-- <v-icon
                      small
                      @click="deleteItem(item)"
                    >
                      delete
                    </v-icon> -->
                  </template>
                </v-data-table>

            </v-card>
            </v-dialog>

           

      

    </div>
    
    <div v-if="role=='Ejecutivo'"> 
      <NotFound/>
    </div>
    
</div> 
</template>
<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
import NotFound from './NotFound'
export default {
  components:{
    NotFound
  },
    data: () => ({
      /* elimiar luego desde aca */
      ciudades:[
            'Santiago de surco',
            'Lima'
        ],
        search: '',

        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,

        expanded: [],
        singleExpand: false,

        /* HASTA ACA */
      dataModal:{
        groupSegment: '',
        type: ''
      },
      role: '',
      chart: null,
      chart2: null,
      chart3: null,
      chart4: null,
      groupSegment: '[Seleccionar todos]',
      yearSelected: "",
      monthSelected : "",
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
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Total $', sortable: true, value: 'mbruto' },
          { text: 'Concretado $', sortable: true, value: 'mconcretado' },
          { text: '% de Concreción', sortable: true, value: 'diferencia' },
        ],
        headers_usersg: [
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Total $', sortable: true, value: 'mbruto' },
          { text: 'Concretado $', sortable: true, value: 'mconcretado' },
          { text: '% de Concreción', sortable: true, value: 'diferencia' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        headers_visits: [
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Meta', sortable: true, value: 'number_Of_Visits' },
          /* { text: 'Visitas Hechas', sortable: true, value: 'hechas' },
          { text: 'Restante', sortable: true, value: 'restante' }, */
          { text: 'Nº Visitas', sortable: true, value: 'pbruto' },
          { text: '% de Visita', sortable: true, value: 'pconcretado' },
          /* { text: '% de Concreción', sortable: true, value: 'diferencia' }, */
        ],
        desserts1: [],
        desserts2: [],
        desserts3: [],
        ids1: [],
        data1: [] ,
        data2: [],
        ej1: [],
        
        ids2:[],
        data3: [] ,
        data4: [],
        ej2: [],

        ids3:[],
        data5: [],
        data6:[],
        ej3: [],

        ids4:[],
        data7: [],
        data8:[],
        ej4: [],

        aux1: [],
        aux2: [],
        aux3: [],

        groupSegments: ['[Seleccionar todos]','Agencias', 'Corporativo', 'Eventos'],
        page: 1,
        pageCount: 0,
        page2: 1,
        pageCount2: 0,
        page3: 1,
        pageCount3: 0,
        groups_user:[],

        auxiliarg4:[],
    }),
    computed: {
        ...mapState(['accessToken']),
    },
    mounted() {
        try {
        
        if(JSON.parse(localStorage.getItem('yearandmonth'))==null){
        this.monthSelected = '[Seleccionar todos]'
        this.groupSegment = '[Seleccionar todos]'
        let fecha = new Date();
        let año = fecha.getFullYear();
        this.yearSelected = año
        this.monthSelected = ( this.months[fecha.getMonth()+1] )
        this.modificarFecha();
        }else {
        let yam = JSON.parse(localStorage.getItem('yearandmonth'))
        this.groupSegment = yam.groups
        if(yam.month==''){
            this.monthSelected='[Seleccionar todos]'
            this.yearSelected = yam.year
        }else{
            this.monthSelected = yam.month
            this.yearSelected = yam.year
        }
        this.fecha = yam.month + " " + yam.year
        }
        this.cargarDataInicial()
        this.verificaPermisos()
        this.cargarAños()
       /*  this.graph1(this.chart)
        this.graph2(this.chart2)
        this.graph3(this.chart3)
        this.graph4(this.chart4) */
        this.graficaTodo()
        
        if(localStorage.length>=8){
            this.$store.dispatch('stateToken')
        }
        console.clear()
        } catch (error) {

        }
   
    },
    /* updated() {
      let data = JSON.parse(localStorage.getItem('dashgerente'))
      this.cargarDataInicial(data)
    },  */
    methods: {
    graficaTodo(){
      setTimeout( () => {
        this.graph1(this.chart)
        return true
      }, 1400);
      setTimeout( () => {
        this.graph2(this.chart2)
        return true
      }, 1400);
      setTimeout( () => {
        this.graph3(this.chart3)
        return true
      }, 1400);
      setTimeout( () => {
        this.graph4(this.chart4)
        console.clear()
        return true
      }, 1400);
      setTimeout( () => {
        let data = JSON.parse(localStorage.getItem('dashgerente'))
        this.cargarTablas(data)
        return true
      }, 1400);
      
    },
    abreModalHoteles(){
      try {
        this.headers_usersg = [
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Total $', sortable: false, value: 'mbruto' },
          { text: 'Concretado $', sortable: false, value: 'mconcretado' },
          { text: '% de Concreción', sortable: false, value: 'diferencia' },
          { text: 'Actions', value: 'action', sortable: false },
        ]
        this.groups_user = []
        let {nombre} =  JSON.parse(localStorage.getItem('leads-user')).datos
        let {dashboardRateHotel} = JSON.parse(localStorage.getItem('dashgerente'))
        let aux = []
        let mbruto = []
        let mconcretado = []
        let ejecutivos = []
        let ids = []
        this.auxiliarg4 = []
        var array = dashboardRateHotel.map( item => { 
          let temporal = ((item.rate_hotel*100) /item.total)
          let montoB = item.total
          let concretado = item.rate_hotel
          let names = item.name+" "+item.last_name
          delete item.porcentaje_concrecion;
          delete item.rate_hotel;
          delete item.total;
          delete item.last_name;
          item.name = names
          item.diferencia = temporal.toFixed(2)+'%';
          item.mbruto = this.separaNumeros(montoB)
          item.mconcretado = this.separaNumeros(concretado)
          item.concretado = concretado
          item.bruto = montoB
          if(item.group_segment == nombre){
            this.dataModal.groupSegment = item.group_segment
            this.dataModal.type = 'Hoteles'
            mbruto.push(parseInt(montoB)-parseInt(item.concretado))
            mconcretado.push(parseInt(item.concretado))
            ejecutivos.push(item.name)
            this.auxiliarg4.push(parseInt(item.bruto))
            ids.push(parseInt(item.user_id))
            return aux.push(item)
          }else{
            return
          }
        });
        this.chart4 = null
        this.data7 = mbruto
        this.data8 = mconcretado
        this.ej4 = ejecutivos
        this.ids4 = ids
        let auxiliar = this.auxiliarg4
        setTimeout(() => {
          let aux = this.auxiliarg4
          this.graph4(this.chart4)
          this.chart4.updateSeries([
              {
                name: 'Monto concretado',
                data: mconcretado
              },{   
                name: 'Monto total',
                data: mbruto
              },
          ])
        this.chart4.updateOptions({
        chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": ejecutivos[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${ejecutivos[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_gerentes/dashboard-user/id'
                          } 
                        }); 
                        
                    }
                    }
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
        },
        xaxis: {
            type: 'category',
            categories: ejecutivos,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
            },
          },
          yaxis:[
            {
            labels: {
            formatter: function(val, e) {
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
            }
            },  
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
          },  

          ],
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e){
                e.series[1][e.dataPointIndex] = auxiliar[e.dataPointIndex]
                let num = val.toFixed(2) 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
          }  
      })
        }, 500);
        this.groups_user = aux
        this.dialog = true
        console.clear()
        } catch (error) {  
        }
    },
    abreModalEventos(){
      try {
        this.headers_usersg = [
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Total $', sortable: false, value: 'mbruto' },
          { text: 'Concretado $', sortable: false, value: 'mconcretado' },
          { text: '% de Concreción', sortable: false, value: 'diferencia' },
          { text: 'Actions', value: 'action', sortable: false },
        ]
        this.groups_user = []
        let {nombre} =  JSON.parse(localStorage.getItem('leads-user')).datos
        let {dashboardRateEvents} = JSON.parse(localStorage.getItem('dashgerente'))
        let aux = []
        let mbruto = []
        let mconcretado = []
        let ejecutivos = []
        let ids = []
        this.auxiliarg4 = []
        var array = dashboardRateEvents.map( item => { 
          let temporal = ((item.rate_events*100) /item.total)
          let montoB = item.total
          let concretado = item.rate_events
          let names = item.name+" "+item.last_name
          delete item.porcentaje_concrecion;
          delete item.rate_events;
          delete item.total;
          delete item.last_name;
          item.name = names
          item.diferencia = temporal.toFixed(2)+'%';
          item.mbruto = this.separaNumeros(montoB)
          item.mconcretado = this.separaNumeros(concretado)
          item.concretado = concretado
          item.bruto = montoB
          if(item.group_segment == nombre){
            this.dataModal.groupSegment = item.group_segment
            this.dataModal.type = 'Eventos'
            mbruto.push(parseInt(montoB)-parseInt(item.concretado))
            mconcretado.push(parseInt(item.concretado))
            ejecutivos.push(item.name)
            this.auxiliarg4.push(parseInt(item.bruto))
            ids.push(parseInt(item.user_id))
            return aux.push(item)
          }else{
            return
          }
        });
        this.chart4 = null
        this.data7 = mbruto
        this.data8 = mconcretado
        this.ej4 = ejecutivos
        this.ids4 = ids
        let auxiliar = this.auxiliarg4
        setTimeout(() => {
          let aux = this.auxiliarg4
          this.graph4(this.chart4)
          this.chart4.updateSeries([
              {
                name: 'Monto concretado',
                data: mconcretado
              },{   
                name: 'Monto total',
                data: mbruto
              },
          ])
        this.chart4.updateOptions({
        chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                       console.log(ids[e.dataPointIndex])
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": ejecutivos[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${ejecutivos[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_gerentes/dashboard-user/id'
                          } 
                        }); 
                    }
                    }
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
        },
        xaxis: {
            type: 'category',
            categories: ejecutivos,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
            },
          },
          yaxis:[
            {
            labels: {
            formatter: function(val, e) {
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
            }
            },  
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
          },  

          ],
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e){
                e.series[1][e.dataPointIndex] = auxiliar[e.dataPointIndex]
                let num = val.toFixed(2) 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
          }  
      })
      }, 500);
      this.groups_user = aux
      this.dialog = true
      console.clear() 
      } catch (error) {  
      }
    },
    abreModalVisitas(){
      try {
        this.headers_usersg = [
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Meta', sortable: true, value: 'mbruto' },
          { text: 'N° de Visitas', sortable: true, value: 'ptotal' },
          { text: '% de Visitas', sortable: true, value: 'diferencia' },
          { text: 'Actions', value: 'action', sortable: false },
        ]
        this.groups_user = []
        let {nombre} =  JSON.parse(localStorage.getItem('leads-user')).datos
        console.log(nombre)
        let {tableVisitInt} = JSON.parse(localStorage.getItem('dashgerente'))
        let aux = []
        let vbruto = []
        let vconcretado = []
        let ejecutivos = []
        let ids = []
        this.auxiliarg4 = []
        
        var array = tableVisitInt.map( item => { 
          let temporal =  item.suma
          let montoB = 100
          let concretado = item.suma
          let names = item.name+" "+item.last_Name
          delete item.last_name;
          item.name = names
          item.diferencia = temporal.toFixed(2)+'%';
          item.mbruto = item.number_Of_Visits
          item.mconcretado = this.separaNumeros(concretado)+"%"
          item.ptotal = item.suma*item.mbruto/100//aqui
          item.concretado = concretado
          item.bruto = montoB
          if(item.group_Segment == nombre){
            this.dataModal.groupSegment = item.group_Segment
            this.dataModal.type = 'Visitas'
            vbruto.push(100-parseInt(item.concretado))
            vconcretado.push(item.concretado+"%")
            ejecutivos.push(item.name)
            this.auxiliarg4.push(100)
            ids.push(parseInt(item.user_Id))
            return aux.push(item)
          }else{
            return
          }
        });
        
        this.chart4 = null
        this.data7 = vbruto
        this.data8 = vconcretado
        this.ej4 = ejecutivos
        this.ids4 = ids
        let auxiliar = this.auxiliarg4
        setTimeout(() => {
          let aux = this.auxiliarg4
          this.graph4(this.chart4)
          this.chart4.updateSeries([
              {
                name: 'Monto concretado',
                data: vconcretado
              },{   
                name: 'Monto total',
                data: vbruto
              },
          ])
        this.chart4.updateOptions({
        chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                       console.log(ids[e.dataPointIndex])
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": ejecutivos[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${ejecutivos[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_gerentes/visits-user/id'//no es por esto lo, no funcionaba antes de que lo cambie
                          } 
                        }); 
                    }
                    }
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
        },
        xaxis: {
            type: 'category',
            categories: ejecutivos,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
            },
        },
        yaxis:[
            {
            labels: {
            formatter: function(val, e) {
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return numero_separado+"%"
            }
            },  
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
          },  

        ],
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e){
                e.series[1][e.dataPointIndex] = auxiliar[e.dataPointIndex]
                let num = val.toFixed(2) 
                let tamaño = num.toString().length
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
                return numero_separado+"%"
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
          }  
      })
      }, 500);
      this.groups_user = aux
      this.dialog = true
      console.clear()
      } catch (error) {  
      }
    },
    visitarUsuario(item){
      swal({
        title: `Seguro que deseas visitar el dashboard del ejecutivo ${item.name}?`,
        text: "La siguiente accion redireccionara la pagina!",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((willDelete) => {
        if (willDelete) {
          let user = JSON.parse(localStorage.getItem('leads-user'))
          user.datos.nombre = item.name
          user.datos.user_id = item.user_id
          localStorage.setItem('leads-user', JSON.stringify(user))
          window.location.href = '/#/dashboard_gerentes/dashboard-user/id'
          /* swal("Vista cargada correctamente"); */
          /* swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          }); */
        } /* else {
          swal("Your imaginary file is safe!");
        } */
      });  
    },
    ...mapActions(['stateToken']),
    graph1(chart){
    var users = this.ej1
    var ids = this.ids1
    var auxiliar1 = this.aux1
    let data1 = this.data1
    let data2 = this.data2
    try { 
        var options = {
            chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                
                zoom: {
                    enabled: false
                },
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": users[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        setTimeout(function(){ 
                          let btn = document.getElementById('btn-modal1')
                          btn.click()
                        }, 1000);
                    }
                    },
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40%',
                }
            },
            colors: ['#ff4200', '#000000'],
            series: [
                {
                name: 'Monto concretado',
                data: this.data1
                },
                {
                name: 'Total',
                data: this.data2
                },
            ],
            legend: {
                offsetY: 0,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'top',
                horizontalAlign: 'center', 
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            xaxis: {
            type: 'category',
            categories: this.ej1,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },


          },
         yaxis:[
            {
            labels: {
            formatter: function(val, e) {
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
            }
            },  
            axisBorder: {
              show: false
            },
            /*  title: {
              text: 'Montos'
            },  */
            axisTicks: {
              show: false,
            },
          },  

        ],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
            
          fill: {
            opacity: 1,
            colors: ['#ff4200', '#000000'],
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            },
          },
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return "$"+val ;
            },
            offsetY: 0,
            style: {
              fontSize: '10px',
              colors: ["#FAFAFA"]
            }
          },
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e){
                e.series[1][e.dataPointIndex] = auxiliar1[e.dataPointIndex]
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
            
            shared: true,
            inverseOrder: false,
            enabledOnSeries: undefined,
            followCursor: true,
            style: {
            fontSize: '13px',
            fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
           
          }  
        }
        chart = new ApexCharts(
            document.querySelector("#chart"),
            options
        );
        chart.render();
        this.chart = chart
    

    } catch (error) {  
    }
    },

    graph2(chart2){
    try {    
    var users = this.ej2
    var ids =  this.ids2
    var auxiliar2 = this.aux2
        var options = {
            chart: {
                 background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": users[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        setTimeout(function(){ 
                          let btn = document.getElementById('btn-modal2')
                          btn.click()
                          }, 1000);
                    }
                    },
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40%',
                }
            },
            colors: ['#ff4200', '#000000'],
            series: [
                {
                name: 'Monto concretado',
                data: this.data3
                },
                {
                name: 'Total',
                data: this.data4
                },
            ],
            legend: {
                offsetY: 0,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'top',
                horizontalAlign: 'center', 
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            xaxis: {
            type: 'category',
            categories: this.ej2,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
            },
          },
         yaxis:[
            {
            labels: {
            formatter: function(val, e) {
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
            }
            },  
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
          },  

          ],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
            
          fill: {
            opacity: 1,
            colors: ['#ff4200', '#000000'],
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            },
          },
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return "$"+val ;
            },
            offsetY: 0,
            style: {
              fontSize: '10px',
              colors: ["#FAFAFA"]
            }
          },
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e) {
                e.series[1][e.dataPointIndex] = auxiliar2[e.dataPointIndex]
                let num = val.toFixed(2);;
                let tamaño = num.toString().length
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
                
                return "$"+numero_separado
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
            
            shared: true,
            inverseOrder: false,
            enabledOnSeries: undefined,
            followCursor: true,
            style: {
            fontSize: '13px',
            fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
           
          }  
        }
        chart2 = new ApexCharts(
            document.querySelector("#chart2"),
            options
        );
        chart2.render();
        this.chart2 = chart2

    } catch (error) {  
    }
    },

    graph3(chart){
    var users = this.ej3
    var ids = this.ids3
    var auxiliar3 = this.aux3
    try { 
        var options = {
            chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": users[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        setTimeout(function(){ 
                          let btn = document.getElementById('btn-modal3')
                          btn.click()
                          }, 1000);
                    }
                    },
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40%',
                }
            },
            colors: ['#ff4200', '#000000'],
            series: [
                {
                name: '% Visitas concretada',
                data: this.data5
                },
                {
                name: '% Total',
                data: this.data6
                },
            ],
            legend: {
                offsetY: 0,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'top',
                horizontalAlign: 'center', 
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            xaxis: {
            type: 'category',
            categories: this.ej3,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },


          },
         yaxis:[
            {
            labels: {
            formatter: function(val, index) {
                return  val+"%";
            }
            },  
            axisBorder: {
              show: false
            },
            /*  title: {
              text: 'Montos'
            },  */
            axisTicks: {
              show: false,
            },
          },  

          ],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
            
          fill: {
            opacity: 1,
            colors: ['#ff4200', '#000000'],
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            },
          },
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return val+"%" ;
            },
            offsetY: 0,
            style: {
              fontSize: '10px',
              colors: ["#FAFAFA"]
            }
          },
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e) {
                e.series[1][e.dataPointIndex]= auxiliar3[e.dataPointIndex]
                return val+"%"
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
            
            shared: true,
            inverseOrder: false,
            enabledOnSeries: undefined,
            followCursor: true,
            style: {
            fontSize: '13px',
            fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
           
          }  
        }
        chart = new ApexCharts(
            document.querySelector("#chart3"),
            options
        );
        chart.render();
        this.chart3 = chart
    

    } catch (error) {  
    }
    },

    graph4(chart){
    var users = this.ej4
    var ids = this.ids4
    var auxiliar = this.aux4
    
    try { 
        var options = {
            chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                
                zoom: {
                    enabled: false
                },
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "nombre": users[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        setTimeout(function(){ 
                          let btn = document.getElementById('btn-modal1')
                          btn.click()
                        }, 1000);
                    }
                    },
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40%',
                }
            },
            colors: ['#ff4200', '#000000'],
            series: [
                {
                name: 'Monto concretado',
                data: this.data7
                },
                {
                name: 'Total',
                data: this.data8
                },
            ],
            legend: {
                offsetY: 0,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'top',
                horizontalAlign: 'center', 
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            xaxis: {
            type: 'category',
            categories: this.ej4,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 

          },
         yaxis:[
            {
            labels: {
            formatter: function(val, e) {
                return val
            }
            },  
            axisBorder: {
              show: false
            },
            /*  title: {
              text: 'Montos'
            },  */
            axisTicks: {
              show: false,
            },
          },  

          ],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
            
          fill: {
            opacity: 1,
            colors: ['#ff4200', '#000000'],
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            },
          },
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return "$"+val ;
            },
            offsetY: 0,
            style: {
              fontSize: '10px',
              colors: ["#FAFAFA"]
            }
          },
          tooltip: {
              enabled: true,
            y: {
              formatter: function (val, e){
                e.series[1][e.dataPointIndex] = auxiliar[e.dataPointIndex]
                let num = val.toFixed(2);; 
                let tamaño = num.toString().length
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
                return "$"+numero_separado
              }
            },
            x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
            },
            
            shared: true,
            inverseOrder: false,
            enabledOnSeries: undefined,
            followCursor: true,
            style: {
            fontSize: '13px',
            fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
           
          }  
        }
        chart = new ApexCharts(
            document.querySelector("#chart4"),
            options
        );
        chart.render();
        this.chart4 = chart
        console.clear()
    } catch (error) {  
    }
    },
    updated() {
      console.clear()
    },

    cargarAños(){
      var fecha = new Date();
      var año = fecha.getFullYear();
      for(var i=2018; i<=año; i++){
        this.years.push(i)
      }
    },
    updateGraficos(chart, name1, name2, data_concretado, data_bruto, ejecutivos, ids){
      chart.updateSeries([
          {   
            name: name1,
            data: data_concretado  
          },
          {
            name: name2,
            data: data_bruto
          }
      ])
      chart.updateOptions({
        chart: {
                background: '#fff',
                height: 350,
                type: 'bar',
                stacked: true,
                events: {
                    click: function(chart, w, e) {
                     if(e.dataPointIndex>=0){
                        let user = {
                            datos:{
                                "user_id": ids[e.dataPointIndex],
                                "segmento": ejecutivos[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        /* alert("Se está dirigiendo a ver los Leads del usuario "+ejecutivos[e.dataPointIndex]+"")
                        window.location.href = '/#/dashboard_jefes/dashboard-user/id'   */
                    }
                    }
                },
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
        },
        xaxis: {
            type: 'category',
            categories: ejecutivos,
            labels: {
              style: {
                fontStyle: 'arial',
                fontSize: '14px'
              }
            }, 
            labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
            },
          },
      })
    },

    
   preparaFiltro(chart, data, tipo){
     try {
       if(data.length>0){  
        //nombre de chart, los datos y el tipo Event o Hotel
        let ids = []
        let ejecutivos = []
        let data_bruto = []
        let data_concretado = []
        if(tipo==1){ //hoteles
          for(let i=0; i<data.dashboardRateHotel.length; i++){
              if(data.dashboardRateHotel[i].group_segment == 'Corporativo'){
                
                ids.push(data.dashboardRateHotel[i].user_id)
                ejecutivos.push('Corporativo')
                data_concretado.push(data.dashboardRateHotel[i].rate_hotel)
                data_bruto.push(data.dashboardRateHotel[i].total)
              }
              /* ids.push(data.dashboardRateHotel[i].user_id)
              ejecutivos.push(data.dashboardRateHotel[i].name+" "+data.dashboardRateHotel[i].last_name)
              data_concretado.push(data.dashboardRateHotel[i].rate_hotel)
              data_bruto.push(data.dashboardRateHotel[i].total) */
          }
          this.updateGraficos(chart,"Monto concretado","Total", data_concretado, data_bruto, ejecutivos, ids)
        }else if(tipo==2){//eventos
          for(let i=0; i<data.dashboardRateEvents.length; i++){
              ids.push(data.dashboardRateEvents[i].user_id)
              ejecutivos.push(data.dashboardRateEvents[i].name+" "+data.dashboardRateEvents[i].last_name)
              data_concretado.push(data.dashboardRateEvents[i].rate_events)
              data_bruto.push(data.dashboardRateEvents[i].total)
          }
          this.updateGraficos(chart,"Monto concretado","Total",  data_concretado, data_bruto, ejecutivos, ids)
        }else{//visitas
          for(let i=0; i<data.tableVisitInt.length; i++){
              ids.push(data.tableVisitInt[i].user_Id)
              ejecutivos.push(data.tableVisitInt[i].name+" "+data.tableVisitInt[i].last_Name)
              data_concretado.push(data.tableVisitInt[i].suma)
              data_bruto.push(data.tableVisitInt[i].number_Of_Visits)
          }
          this.updateGraficos(chart,"% Visitas concretada","% Total", data_concretado, data_bruto, ejecutivos, ids)
        } 
      }
    } catch (error) {
       
    }
   },
   
   async Filtro(){
      /* this.resetFiltro()  */
      let datos = {
        /* "groupSegment": this.groupSegment, */
    		"month": this.months.indexOf(this.monthSelected),
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/gerentes'
      await axios.post(url, datos, config)
      .then(response =>{ 
          let fec = {}
          console.log(response.data)
          if(this.monthSelected!='[Seleccionar todos]' || this.groupSegment != '[Seleccionar todos]'){
            fec = {
                    /* groups: this.groupSegment, */
                    year:this.yearSelected,
                    month: this.monthSelected
                  }
          }else{
            fec = {
                    /* groups: this.groupSegment, */
                    year:this.yearSelected,
                    month: ''
                  }
          } 
          this.preparaFiltro(this.chart, response.data, 1)
          this.preparaFiltro(this.chart2, response.data, 2)
          this.preparaFiltro(this.chart3, response.data, 3)
          this.cargarTablas(response.data)
          localStorage.setItem('dashgerente', JSON.stringify(response.data))
          localStorage.setItem('yearandmonth', JSON.stringify(fec))
          setTimeout(function(){ location.reload(); }, 1000);
        
        
      })
      .catch(error => {
         alert('Hubo un error Filtrando los datos')
      })  
    },
    resetFiltro(){
      this.ids1 = []
      this.ids2 = []
      this.ej1 = []
      this.ej2 = []
      this.data1 = []
      this.data2 = []
      this.data3 = []
      this.data4 = []
      let user = {}
      localStorage.setItem('leads-user', JSON.stringify(user))
    },
    modificarFecha(){
      if(this.monthSelected!='[Seleccionar todos]'){
        this.fecha = this.monthSelected +' '+this.yearSelected
      }else{
        this.fecha = this.yearSelected
      }
    },
    cargarTablas(data){
      try {
        let array1 = []
        let array2 = []
        let array3 = []
        let rate1 = 0, rate2 = 0, rate3 =0
        let total1 = 0, total2 = 0, total3 = 0
        let taux = 0, taux2 = 0, taux3 = 0
        //HOTELES
        for(let i=0; i< data.dashboardRateHotel.length; i++){
            if(data.dashboardRateHotel[i].group_segment == 'Agencias'){
                rate1 += data.dashboardRateHotel[i].rate_hotel
                total1 +=  data.dashboardRateHotel[i].total

            }else if(data.dashboardRateHotel[i].group_segment == 'Corporativo'){
                rate2 += data.dashboardRateHotel[i].rate_hotel
                total2 +=  data.dashboardRateHotel[i].total
            }else{
            }
        }
        if(total1==0){total1=0}
        if(total2==0){total2=0}
        if(total3==0){total3=0}
        array1.push({
            name: 'Agencias',
            mbruto: this.separaNumeros(total1),
            mconcretado: this.separaNumeros(rate1),
            diferencia: this.separaNumeros((rate1/total1)*100)+"%"
        },{
            name: 'Corporativo',
            mbruto: this.separaNumeros(total2),
            mconcretado: this.separaNumeros(rate2),
            diferencia: this.separaNumeros((rate2/total2)*100)+"%"
        })
        //EVENTOS
        rate1=0; rate2=0; rate3 =0; total1 = 0; total2 = 0; total3 = 0; taux = 0; taux2 = 0; taux3 = 0
        for(let i=0; i< data.dashboardRateEvents.length; i++){
            if(data.dashboardRateEvents[i].group_segment == 'Agencias'){
                rate1 += data.dashboardRateEvents[i].rate_events
                total1 +=  data.dashboardRateEvents[i].total

            }else if(data.dashboardRateEvents[i].group_segment == 'Corporativo'){
                rate2 += data.dashboardRateEvents[i].rate_events
                total2 +=  data.dashboardRateEvents[i].total
            }else{
                rate3 += data.dashboardRateEvents[i].rate_events
                total3 +=  data.dashboardRateEvents[i].total
            }
        }
        if(total1==0){total1=0}
        if(total2==0){total2=0}
        if(total3==0){total3=0}
        array2.push({
            name: 'Agencias',
            mbruto: this.separaNumeros(total1),
            mconcretado: this.separaNumeros(rate1),
            diferencia: this.separaNumeros((rate1/total1)*100)+"%"
        },{
            name: 'Corporativo',
            mbruto: this.separaNumeros(total2),
            mconcretado: this.separaNumeros(rate2),
            diferencia: this.separaNumeros((rate2/total2)*100)+"%"
        },
        {
            name: 'Eventos',
            mbruto: this.separaNumeros(total3),
            mconcretado: this.separaNumeros(rate3),
            diferencia: this.separaNumeros((rate3/total3)*100)+"%"
        })
        //VISITAS
        rate1=0; rate2=0; rate3 =0; total1 = 0; total2 = 0; total3 = 0; taux = 0; taux2 = 0; taux3 = 0
        let visit1=0, visit2=0, visit3=0
        for(let i=0; i< data.tableVisitInt.length; i++){
            if(data.tableVisitInt[i].group_Segment == 'Agencias'){
                rate1 += data.tableVisitInt[i].suma
                total1 +=  100
                visit1 += data.tableVisitInt[i].number_Of_Visits
            }else if(data.tableVisitInt[i].group_Segment == 'Corporativo'){
                rate2 += data.tableVisitInt[i].suma
                total2 +=  100
                visit2 += data.tableVisitInt[i].number_Of_Visits
            }else if(data.tableVisitInt[i].group_Segment == 'Eventos'){
                rate3 += data.tableVisitInt[i].suma
                total3 +=  100
                visit3 += data.tableVisitInt[i].number_Of_Visits
            }else{
              return
            }
        }
        if(total1==0){total1=0}
        if(total2==0){total2=0}
        if(total3==0){total3=0}
        array3.push({
            name: 'Agencias',
            number_Of_Visits: visit1,
            pbruto: this.separaNumeros(visit1*rate1/total1),
            pconcretado: this.separaNumeros(rate1)+"%",
            diferencia: this.separaNumeros((rate1/total1)*100)+"%"
        },{
            name: 'Corporativo',
            number_Of_Visits: visit2,
            pbruto: this.separaNumeros(visit2*rate2/total2),
            pconcretado: this.separaNumeros(rate2)+"%",
            diferencia: this.separaNumeros((rate2/total2)*100)+"%"
        },
        /*{
            name: 'Eventos',
            number_Of_Visits: visit3,
            pbruto: this.separaNumeros(visit3*rate3/total3),
            pconcretado: this.separaNumeros(rate3)+"%",
            diferencia: this.separaNumeros((rate3/total2)*100)+"%"
        }*/)


 
       /*  for(let i=0; i< data.tableVisitInt.length; i++){
            array3.push({
            name: data.tableVisitInt[i].name+' '+data.tableVisitInt[i].last_Name,
            number_Of_Visits: data.tableVisitInt[i].number_Of_Visits,
            pbruto: 100 +"%",
            pconcretado:  data.tableVisitInt[i].suma +"%",
            diferencia: (100 -parseInt( data.tableVisitInt[i].suma))+"%"
          })
          
        }
   */
        this.desserts1 = array1
        this.desserts2 = array2
        this.desserts3 = array3
      } catch (error) {
        console.log('Ocurrio un error')
      }
    },
    cargarDataInicial(){
      let data = JSON.parse(localStorage.getItem('dashgerente'))
      try {
        if(data!= null){
          this.ej1 = []
          this.ej2 = []
          this.ej3 = []
          this.data1 = []
          this.data2 = []
          this.data3 = []
          this.data4 = []
          this.data5 = []
          this.data6 = []
          this.aux1 = []
          this.aux2 = []
          this.aux3 = []
          let rate1 = 0, rate2 = 0, rate3 =0
          let total1 = 0, total2 = 0, total3 = 0
          let taux = 0, taux2 = 0, taux3 = 0
          //Hoteles
          for(let i=0; i<data.dashboardRateHotel.length; i++){
            if(data.dashboardRateHotel[i].group_segment == 'Agencias'){
                rate1 += data.dashboardRateHotel[i].rate_hotel
                taux += data.dashboardRateHotel[i].total
                if(data.dashboardRateHotel[i].total<data.dashboardRateHotel[i].rate_hotel){
                    total1 +=  data.dashboardRateHotel[i].total
                }else{
                    total1 += (data.dashboardRateHotel[i].total-data.dashboardRateHotel[i].rate_hotel)
                }
            }else if(data.dashboardRateHotel[i].group_segment == 'Corporativo'){
                rate2 += data.dashboardRateHotel[i].rate_hotel
                taux2 += data.dashboardRateHotel[i].total
                if(data.dashboardRateHotel[i].total<data.dashboardRateHotel[i].rate_hotel){
                    total2 +=  data.dashboardRateHotel[i].total
                }else{
                    total2 += (data.dashboardRateHotel[i].total-data.dashboardRateHotel[i].rate_hotel)
                }  
            }else{
                console.log('no habia')
            }
          }
          /* if(rate1>0 || total1>0){
            this.ej1.push('Agencias')
            this.data1.push(rate1)
            this.data2.push(total1)
            this.aux1.push(taux)
          }else if(rate2>0 || total2>0){
            this.ej1.push('Corporativo')
            this.data1.push(rate2)
            this.data2.push(total2)
            this.aux1.push(taux2)
          } */
          if(data.dashboardRateHotel.length > 0){
            this.ej1.push('Agencias','Corporativo')
            this.data1.push(rate1,rate2)
            this.data2.push(total1,total2)
            this.aux1.push(taux,taux2)
          } 
          //VISITAS
          rate1=0; rate2=0; rate3 =0; total1 = 0; total2 = 0; total3 = 0; taux = 0; taux2 = 0; taux3 = 0
          let c1=0,c2=0,c3=0
          for(let i=0; i<data.tableVisitInt.length; i++){
            if(data.tableVisitInt[i].group_Segment == 'Agencias'){
                rate1 += data.tableVisitInt[i].suma
                c1++     
            }else if(data.tableVisitInt[i].group_Segment == 'Corporativo'){
                rate2 += data.tableVisitInt[i].suma
                c2++
            }else{
                rate3 += data.tableVisitInt[i].suma
                c3++            
            }
          }
          taux = 100
          let percent1= ((rate1/(c1*100))*100)
          let percent2= ((rate2/(c2*100))*100)
          let percent3= ((rate3/(c3*100))*100)
          if(c1==0){percent1=0}
          if(c2==0){percent2=0}
          if(c3==0){percent3=0}
          if(data.tableVisitInt.length > 0){
            this.ej3.push('Agencias', 'Corporativo'/*, 'Eventos'*/)
            this.data5.push(rate1, rate2/*, rate3*/)
            this.data6.push((100-percent1), (100-percent2)/*, (100-percent3)*/)
            this.aux3.push(taux, taux/*, taux*/)
          }
          //Eventos
          rate1=0; rate2=0; rate3 =0; total1 = 0; total2 = 0; total3 = 0; taux = 0; taux2 = 0; taux3 = 0
          for(let i=0; i<data.dashboardRateEvents.length; i++){
            if(data.dashboardRateEvents[i].group_segment == 'Agencias'){
                rate1 += data.dashboardRateEvents[i].rate_events
                taux += data.dashboardRateEvents[i].total
                if(data.dashboardRateEvents[i].total<data.dashboardRateEvents[i].rate_events){
                    total1 +=  data.dashboardRateEvents[i].total
                }else{
                    total1 += (data.dashboardRateEvents[i].total-data.dashboardRateEvents[i].rate_events)
                }       
            }else if(data.dashboardRateEvents[i].group_segment == 'Corporativo'){
                rate2 += data.dashboardRateEvents[i].rate_events
                taux2 += data.dashboardRateEvents[i].total
                if(data.dashboardRateEvents[i].total<data.dashboardRateEvents[i].rate_events){
                    total2 +=  data.dashboardRateEvents[i].total
                }else{
                    total2 += (data.dashboardRateEvents[i].total-data.dashboardRateEvents[i].rate_events)
                }            
            }else{
                rate3 += data.dashboardRateEvents[i].rate_events
                taux3 += data.dashboardRateEvents[i].total
                if(data.dashboardRateEvents[i].total<data.dashboardRateEvents[i].rate_events){
                    total3 +=  data.dashboardRateEvents[i].total
                }else{
                    total3 += (data.dashboardRateEvents[i].total-data.dashboardRateEvents[i].rate_events)
                }             
            }
          }
          if(data.dashboardRateEvents.length > 0){
            this.ej2.push('Agencias', 'Corporativo', 'Eventos')
            this.data3.push(rate1, rate2, rate3)
            this.data4.push(total1, total2, total3)
            this.aux2.push(taux, taux2, taux3)
          }
          
        }else{
          this.resetFiltro()
        }

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
    verificaPermisos(){
        this.role = JSON.parse(localStorage.getItem('usuario')).role
        window.scrollTo(500, 0);
    },
    




  

    },
}
</script>
<style>
#chart, #chart2, #chart3 {
        max-width: 600px;
        margin: 5px auto;
}
#chart .apexcharts-xaxis-label, #chart2 .apexcharts-xaxis-label , #chart3 .apexcharts-xaxis-label {
    font-weight: bold;
}

* {
    font-family: Arial;
}

body {
    height: 100vh;
    background: #f9f9f9;
}

#chart, #chart2, #chart3, .chart-box {
    padding-top: 0px;
    padding-left: 0px;
    background: #fff;
 
}

select.flat-select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: #008FFB url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60px\' height=\'60px\'><polyline fill=\'white\' points=\'46.139,15.518 25.166,36.49 4.193,15.519\'/></svg>") no-repeat scroll right 2px top 9px / 16px 16px;
    border: 0 none;
    border-radius: 3px;
    color: #fff;
    font-family: arial,tahoma;
    font-size: 16px;
    font-weight: bold;
    outline: 0 none;
    height: 33px;
    padding: 5px 20px 5px 10px;
    text-align: center;
    text-indent: 0.01px;
    text-overflow: "";
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease 0s;
    width: auto;
    -webkit-transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -ms-transition: 0.3s ease all;
    -o-transition: 0.3s ease all;
    transition: 0.3s ease all;
  }
  select.flat-select:focus, select.flat-select:hover {
    border: 0;
    outline: 0;
  }
  

.apexcharts-canvas {
    margin: 0 auto;
}
#html {
    display: none;
}
</style>