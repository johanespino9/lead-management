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
                    <span class="title font-weight-light" color="#FAFAFA"><h3 style="color: white">Dashboard</h3> </span>
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
                <v-col cols="auto">
                <v-combobox :items="groupSegments" v-model="groupSegment" color="#757575" label="Group Segment"></v-combobox>
                </v-col>
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

                  <!-- <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">$</v-list-item-title>
                      <v-list-item-subtitle><strong>Monto bruto total </strong> </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="text-right">
                       <v-list-item-subtitle > 
                        <v-list-item-title class="headline" style="color: black;">$</v-list-item-title>
                        <v-list-item-subtitle><strong>Monto concretado </strong> </v-list-item-subtitle>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item> -->

                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <div id="chart"></div>
                </div>

                <!-- <v-card-actions style="margin-top:0px;">
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/avatar2.jpg"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title><a class="link" href="#">Luis</a></v-list-item-title>
                      <v-list-item-subtitle>$500000</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item> 

                </v-card-actions>  -->
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

                  <!-- <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">$</v-list-item-title>
                      <v-list-item-subtitle><strong>Monto bruto total </strong> </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="text-right">
                       <v-list-item-subtitle > 
                        <v-list-item-title class="headline" style="color: black;">$</v-list-item-title>
                        <v-list-item-subtitle><strong>Monto concretado </strong> </v-list-item-subtitle>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item> -->

                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <div id="chart2"></div>
                </div>

                <!-- <v-card-actions style="margin-top:0px;">
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/avatar2.jpg"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title><a class="link" href="#">Luis</a></v-list-item-title>
                      <v-list-item-subtitle>$500000</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item> 

                </v-card-actions>  -->
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
      role: '',
      chart: null,
      chart2: null,
      chart3: null,
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
        headers_visits: [
          { text: 'Nombre', align: 'left', value: 'name',},
          { text: 'Meta', sortable: true, value: 'number_Of_Visits' },
          /* { text: 'Visitas Hechas', sortable: true, value: 'hechas' },
          { text: 'Restante', sortable: true, value: 'restante' }, */
          { text: 'Nº Visitas', sortable: true, value: 'pbruto' },
          { text: '% de Visitas', sortable: true, value: 'pconcretado' },
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
        data5:[],
        ej3: [],

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

    }),
    computed: {
        ...mapState(['accessToken'])
    },
    mounted() {
        try {
        let data = JSON.parse(localStorage.getItem('dashjefe'))
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
        /* this.graph1(this.chart)
        this.graph2(this.chart2)
        this.graph3(this.chart3)
        this.cargarTablas(data) */
        if(localStorage.length>=8){
            this.$store.dispatch('stateToken')
        }
        window.scrollTo(500, 0);
        console.clear() 
        } catch (error) {
        }
   
    },
    
    methods: {
    ...mapActions(['stateToken']),
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
        let data = JSON.parse(localStorage.getItem('dashjefe'))
        this.cargarTablas(data)
        return true
      }, 1400);
      
    },
    graph1(chart){
    var users = this.ej1
    var ids = this.ids1
    var auxiliar1 = this.aux1
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
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${users[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_jefes/dashboard-user/id'
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
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${users[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_jefes/dashboard-user/id'
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
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${users[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_jefes/visits-user/id'
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
                                "nombre": ejecutivos[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        swal({
                          title: `Seguro que deseas visitar el dashboard del ejecutivo ${users[e.dataPointIndex]}?`,
                          text: "La siguiente accion redireccionara la pagina!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: false,
                        })
                        .then((willDelete) => {
                          if (willDelete) {
                            window.location.href = '/#/dashboard_jefes/dashboard-user/id'
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
              ids.push(data.dashboardRateHotel[i].user_id)
              ejecutivos.push(data.dashboardRateHotel[i].name+" "+data.dashboardRateHotel[i].last_name)
              data_concretado.push(data.dashboardRateHotel[i].rate_hotel)
              data_bruto.push(data.dashboardRateHotel[i].total)
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
        }else{
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
        "groupSegment": this.groupSegment,
    		"month": this.months.indexOf(this.monthSelected),
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/jefes'
      await axios.post(url, datos, config)
      .then(response =>{ 
          let fec = {}
          if(this.monthSelected!='[Seleccionar todos]' || this.groupSegment != '[Seleccionar todos]'){
            fec = {
                    groups: this.groupSegment,
                    year:this.yearSelected,
                    month: this.monthSelected
                  }
          }else{
            fec = {
                    groups: this.groupSegment,
                    year:this.yearSelected,
                    month: ''
                  }
          } 
          
          this.preparaFiltro(this.chart, response.data, 1)
          this.preparaFiltro(this.chart2, response.data, 2)
          this.preparaFiltro(this.chart3, response.data, 3)
          this.cargarTablas(response.data)
          localStorage.setItem('dashjefe', JSON.stringify(response.data))
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
        for(let i=0; i< data.dashboardRateHotel.length; i++){
            let diff = (parseInt(data.dashboardRateHotel[i].rate_hotel)*100)/parseInt(data.dashboardRateHotel[i].total)
            if(data.dashboardRateHotel[i].total == 0){
              diff = 0
            }
            array1.push({
            name: data.dashboardRateHotel[i].name+' '+data.dashboardRateHotel[i].last_name,
            mbruto: this.separaNumeros(data.dashboardRateHotel[i].total),
            mconcretado: this.separaNumeros(data.dashboardRateHotel[i].rate_hotel),
            diferencia: this.separaNumeros(diff)+"%"
          })
        }
        for(let i=0; i< data.dashboardRateEvents.length; i++){
            let diff = (parseInt(data.dashboardRateEvents[i].rate_events)*100)/parseInt(data.dashboardRateEvents[i].total)
            if(data.dashboardRateEvents[i].total == 0){
              diff = 0
            }
            array2.push({
            name: data.dashboardRateHotel[i].name+' '+data.dashboardRateHotel[i].last_name,
            mbruto: this.separaNumeros(data.dashboardRateEvents[i].total),
            mconcretado: this.separaNumeros(data.dashboardRateEvents[i].rate_events),
            diferencia: this.separaNumeros(diff)+"%"
          })
        }
        for(let i=0; i< data.tableVisitInt.length; i++){
            array3.push({
            name: data.tableVisitInt[i].name+' '+data.tableVisitInt[i].last_Name,
            number_Of_Visits: data.tableVisitInt[i].number_Of_Visits,
            pbruto: data.tableVisitInt[i].number_Of_Visits*data.tableVisitInt[i].suma/100,
            pconcretado:  data.tableVisitInt[i].suma +"%",
            diferencia: (100 -parseInt( data.tableVisitInt[i].suma))+"%"
          })
          
        }
  
        this.desserts1 = array1
        this.desserts2 = array2
        this.desserts3 = array3
      } catch (error) {
        console.log('Ocurrio un error')
      }
    },
    cargarDataInicial(){
      let data = JSON.parse(localStorage.getItem('dashjefe'))
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
          for(let i=0; i<data.dashboardRateHotel.length; i++){
            this.ids1.push(data.dashboardRateHotel[i].user_id)
            this.ej1.push(data.dashboardRateHotel[i].name+" "+data.dashboardRateHotel[i].last_name)
            this.data1.push(data.dashboardRateHotel[i].rate_hotel)
            if(data.dashboardRateHotel[i].total < data.dashboardRateHotel[i].rate_hotel){
              this.data2.push(data.dashboardRateHotel[i].total)
              this.aux1.push(data.dashboardRateHotel[i].total)
            }else{
              this.data2.push(data.dashboardRateHotel[i].total-data.dashboardRateHotel[i].rate_hotel)
              this.aux1.push(data.dashboardRateHotel[i].total)
            }
          }
          for(let i=0; i<data.dashboardRateEvents.length; i++){
            this.ids2.push(data.dashboardRateEvents[i].user_id)
            this.ej2.push(data.dashboardRateEvents[i].name+" "+data.dashboardRateEvents[i].last_name)
            this.data3.push(data.dashboardRateEvents[i].rate_events)
            if(data.dashboardRateEvents[i].total < data.dashboardRateEvents[i].rate_events){
              this.data4.push(data.dashboardRateEvents[i].total)
              this.aux2.push(data.dashboardRateEvents[i].total)
            }else{
              this.data4.push(data.dashboardRateEvents[i].total-data.dashboardRateEvents[i].rate_events)
              this.aux2.push(data.dashboardRateEvents[i].total)
            }
          }
          for(let i=0; i<data.tableVisitInt.length; i++){
            this.ids3.push(data.tableVisitInt[i].user_Id)
            this.ej3.push(data.tableVisitInt[i].name+" "+data.tableVisitInt[i].last_Name)
            this.data5.push(data.tableVisitInt[i].suma)
            this.data6.push(100-data.tableVisitInt[i].suma)
            this.aux3.push(100)
          }
          this.graficaTodo()
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
        if(this.role == 'Ejecutivo' || this.role == 'Supervisor de Segmento'){
          localStorage.removeItem('dashgerente')
        }
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