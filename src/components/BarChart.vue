<template>
    <div>
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
                <v-combobox :items="months" v-model="monthSelected" color="#757575" label="Seleccionar Mes"></v-combobox>
                </v-col>
                <v-col cols="auto">
                <v-combobox :items="years" v-model="yearSelected" color="#757575" label="Seleccionar Año"></v-combobox>
                </v-col>
                <v-col cols="auto" style="margin-top: 12px;">
                <v-btn color="#000000" style="color: #FAFAFA;" v-on:click="Filtro()">Filtrar Registros</v-btn>
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
                    <span class="title font-weight-light"><strong>Hoteles</strong> </span>
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
                  <span class="title font-weight-light"><strong>Ejecutivos Hoteles</strong> </span>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts1"
                        :sort-by="['mconcretado']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </template>
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
                  <span class="title font-weight-light"><strong>Ejecutivos Eventos</strong> </span>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts2"
                        :sort-by="['mconcretado']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </template>
                </div>
              </v-card>
            </div>
          </div>
        </div>



      </div>
      
    </div>
    
    
    <!-- <div id="chart">
    <apexchart type=bar height=350 :options="chartOptions" :series="series" />
    </div>

    <div id="html">
        &lt;div id="chart">
        &lt;apexchart type=bar height=350 :options="chartOptions" :series="series" />
        &lt;/div>
    </div> -->
    
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
export default {
    data: () => ({
        chart1: null,
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
          { text: 'Monto bruto $', sortable: true, value: 'mbruto' },
          { text: 'Concretado $', sortable: true, value: 'mconcretado' },
          { text: 'Diferencia $', sortable: true, value: 'diferencia' },
        ],
        desserts1: [],
        desserts2: [],

        data1: [1300, 2300, 2000, 800, 1300, 2700] ,
        data2: [4400, 5500, 4100, 6700, 2200, 4030],
        ej1: ['Luis', 'Joe', 'Jake', 'Amber', 'Mary', 'Lily'],

        data3: [1200, 2300, 2000, 800, 1300, 2700] ,
        data4: [4300, 4500, 5100, 5700, 2200, 4130],
        ej2: ['Diana', 'Sofia', 'Jake', 'Joe', 'Lily', 'Lilo']

    }),
    computed: {
        ...mapState(['accessToken'])
    },
    mounted() {
        try { 
        let data = JSON.parse(localStorage.getItem('dashjefe'))
        if(JSON.parse(localStorage.getItem('yearandmonth'))==null){
        this.monthSelected = '[Seleccionar todos]'
        var fecha = new Date();
        var año = fecha.getFullYear();
        this.yearSelected = año
        this.modificarFecha();
        }else {
        let yam = JSON.parse(localStorage.getItem('yearandmonth'))
        if(yam.month==''){
            this.monthSelected='[Seleccionar todos]'
            this.yearSelected = yam.year
        }else{
            this.monthSelected = yam.month
            this.yearSelected = yam.year
        }
        this.fecha = yam.month + " " + yam.year
        }
        this.cargarAños()
        this.graph1()
        this.graph2()
        this.cargarTablas()
        if(localStorage.length>=8){
            this.$store.dispatch('stateToken')
        }
        } catch (error) {
        }
   
    },
    methods: {
    ...mapActions(['stateToken']),
    graph1(){
    var users = this.ej1
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
                         console.log(users)
                        let user = {
                            datos:{
                                "nombre": users[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        alert("Se está dirigiendo a ver los Leads del usuario "+users[e.dataPointIndex]+"")
                        window.location.href = '/#/datos-lead-user'  
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
            colors: ['#ff4200', '#F5F5F5'],
            series: [
                {
                name: 'Monto concretado',
                data: this.data1
                },
                {
                name: 'Monto bruto',
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
            formatter: function(val, index) {
                return "$"+val;
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
            colors: ['#ff4200', '#F5F5F5'],
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
              formatter: function (val/* , index */) {
                return "$" + val 
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
        var chart = new ApexCharts(
            document.querySelector("#chart"),
            options
        );
        chart.render();
    } catch (error) {  
    }
    },

    graph2(){
    try {    
    var users = this.ej2
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
                                /* "id": ids[e.dataPointIndex],  */
                                "nombre": users[e.dataPointIndex],
                            },
                            leads:[],
                        }
                        localStorage.setItem('leads-user', JSON.stringify(user))
                        alert("Se está dirigiendo a ver los Leads del usuario "+users[e.dataPointIndex]+"")
                        window.location.href = '/#/datos-lead-user'  
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
            colors: ['#ff4200', '#F5F5F5'],
            series: [
                {
                name: 'Monto concretado',
                data: this.data3
                },
                {
                name: 'Monto bruto',
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
            formatter: function(val, index) {
                return "$"+val;
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
            colors: ['#ff4200', '#F5F5F5'],
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
              formatter: function (val/* , index */) {
                return "$" + val 
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
        var chart2 = new ApexCharts(
            document.querySelector("#chart2"),
            options
        );
        chart2.render();

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
    cargarDatos(data){
    try {
      //Rellenando arrays de rate hotel
      let rhotel = data.dashboardRateHotel
      this.dashboardRateHotel = rhotel 
      for(let i = 0; i< this.dashboardRateHotel.length; i++){
        this.ids1.push(parseInt(this.dashboardRateHotel[i].user_id))
        this.data1_bruto.push(parseInt(this.dashboardRateHotel[i].total))
        this.data1_concretado.push(parseInt(this.dashboardRateHotel[i].rate_hotel))
        this.ej_d1.push(this.dashboardRateHotel[i].name+" "+this.dashboardRateHotel[i].last_name)
      }
      //Rellenando arrays de rate event
      let revent = data.dashboardRateEvents
      this.dashboardRateEvents = revent
      for(let i = 0; i< this.dashboardRateEvents.length; i++){
        this.ids2.push(parseInt(this.dashboardRateEvents[i].user_id))
        this.data2_bruto.push(parseInt(this.dashboardRateEvents[i].total))
        this.data2_concretado.push(parseInt(this.dashboardRateEvents[i].rate_events))
        this.ej_d2.push(this.dashboardRateEvents[i].name+" "+this.dashboardRateEvents[i].last_name)
      }
    } catch (error) {
      console.log('error cargando datos')
    } 
  },

   Filtro(){
      /* this.resetFiltro() */
      this.ej1=['Luis', 'Sofi']
      this.data1=[8000, 4000]
      this.data2=[35100, 20000]  
      let datos = {
    		"month": this.months.indexOf(this.monthSelected),
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      this.cargarTablas()  
      this.graph1()  
      /* let url = 'https://casa-andina.azurewebsites.net/user/dashboard/jefes'
      await axios.post(url, datos, config)
      .then(response =>{
        let fec = {}
        if(this.monthSelected!='[Seleccionar todos]'){
          fec = {
                  year:this.yearSelected,
                  month: this.monthSelected
                  }
        }else{
          fec = {
                  year:this.yearSelected,
                  month: ''
                  }
        } 
        localStorage.setItem('dashjefe', JSON.stringify(response.data))
        localStorage.setItem('yearandmonth', JSON.stringify(fec))
        this.cargarDatos(JSON.parse(localStorage.getItem('dashjefe')))
        this.modificarFecha()
        this.graph1()
        this.graph2()
        this.tot()
        location.reload() 
      })
      .catch(error => {
         alert('Hubo un error Filtrando los datos')
      }) */
    },
    resetFiltro(){
      /* this.total1 = 0
      this.total2 = 0 */
      /* this.ids1 = []
      this.ids2 = [] */
      this.ej1 = []
      this.ej2 = []
      this.data1 = []
      this.data2 = []
      this.data3 = []
      this.data4 = []
    },
    modificarFecha(){
      if(this.monthSelected!='[Seleccionar todos]'){
        this.fecha = this.monthSelected +' '+this.yearSelected
      }else{
        this.fecha = this.yearSelected
      }
    },
    cargarTablas(){
        let array1 = []
        let array2 = []
        for(let i=0; i< this.data1.length; i++){
            let diff = parseInt(this.data2[i]-this.data1[i])
            array1.push({
            name: this.ej1[i],
            mbruto: this.data2[i],
            mconcretado: this.data1[i],
            diferencia: diff
          })
        }
        for(let i=0; i< this.data3.length; i++){
            let diff = parseInt(this.data2[i]-this.data1[i])
            array2.push({
            name: this.ej2[i],
            mbruto: this.data4[i],
            mconcretado: this.data3[i],
            diferencia: diff
          })
        }
        this.desserts1 = array1
        this.desserts2 = array2
    }


    },
}
</script>
<style>
#chart, #chart2 {
        max-width: 750px;
        margin: 5px auto;
}
#chart .apexcharts-xaxis-label, #chart2 .apexcharts-xaxis-label {
    font-weight: bold;
}

* {
    font-family: Arial;
}

body {
    height: 100vh;
    background: #f9f9f9;
}

#chart, #chart2, .chart-box {
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