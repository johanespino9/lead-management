<template>
  <div>
    <div class="card" style="background: #F5F5F5; margin-top: 4px; margin-bottom: 2px; border-radius: 5px;">
    <v-container class="col-md-10">
      <v-row justify="center">
        <v-col cols="auto">
          <v-combobox :items="months" v-model="monthSelected" color="#d69c4f" label="Seleccionar Mes"></v-combobox>
        </v-col>
        <v-col cols="auto">
          <v-combobox :items="years" v-model="yearSelected" color="#d69c4f" label="Seleccionar Año"></v-combobox>
        </v-col>
        <v-col cols="auto" style="margin-top: 12px;">
          <v-btn color="#000000" style="color: #FAFAFA;" @click="Filtro()">Filtrar Registros</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

    <!-- COMIENZAN LOS CARDS -->
    <div class="wrapper">
      <div class="content">
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
                    <span class="title font-weight-light">Hoteles</span>
                    <v-list-item-content class="text-right" style="margin-top:5px">
                      <v-list-item-subtitle> <strong>{{fecha}} </strong>  </v-list-item-subtitle>
                   </v-list-item-content>
                 </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">${{total1}}</v-list-item-title>
                      <v-list-item-subtitle><strong>Monto bruto total </strong> </v-list-item-subtitle>
                    </v-list-item-content>

                    
                    <v-list-item-content class="text-right">
                       <v-list-item-subtitle > 
                        <v-list-item-title class="headline" style="color: black;">${{totalconcretado1}}</v-list-item-title>
                        <v-list-item-subtitle><strong>Monto concretado </strong> </v-list-item-subtitle>
                      </v-list-item-subtitle>
                      <!-- <v-list-item-subtitle>
                        <span v-if="porcentaje1<0" class="red--text">
                        <i class="fas fa-arrow-up"></i>
                        <strong>{{porcentaje1}}%</strong> 
                      </span>
                      <span v-if="porcentaje1>=0" class="green--text">
                        <i class="fas fa-arrow-up"></i>
                        <strong>+{{porcentaje1}}%</strong> 
                      </span>
                      </v-list-item-subtitle> -->
                    </v-list-item-content>

                  </v-list-item>
                </v-card-title>
                <div class="position-relative mb-4">
                  <canvas id="sales-chart" height="200"></canvas>
                </div>
                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/avatar2.jpg"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title><a class="link" href="#">{{MejorEmpleadoRR.nombre}}</a></v-list-item-title>
                      <v-list-item-subtitle>${{MejorEmpleadoRR.monto}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-icon color="#007bff">mdi-rectangle</v-icon>

                      <span class="subheading mr-2">Monto bruto registrado</span>

                      <v-icon color="#ced4da" class="mr-1">mdi-rectangle</v-icon>
                      <span class="subheading mr-2">Monto concretado</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </div>
          </div>
          <!-- /.card -->
          <!-- HASTA ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->

          <div class="col-lg-6">
            <!-- SEGUNDO CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card">
              <v-card light>
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/gift-3-48.png"
                      ></v-img>
                    </v-list-item-avatar>

                    <span class="title font-weight-light">Eventos</span>
                    <v-list-item-content class="text-right" style="margin-top:5px">
                        <v-list-item-subtitle> <strong>{{fecha}} </strong>  </v-list-item-subtitle>
                      </v-list-item-content>
                 </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">${{total2}}</v-list-item-title>
                      <v-list-item-subtitle><strong>Monto bruto total</strong></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content class="text-right">
                       <v-list-item-subtitle > 
                        <v-list-item-title class="headline" style="color: black;">${{totalconcretado2}}</v-list-item-title>
                      <v-list-item-subtitle><strong>Monto concretado</strong></v-list-item-subtitle>
                      </v-list-item-subtitle>
<!--                       <v-list-item-subtitle>
                        <span v-if="porcentaje2<0" class="red--text">
                        <i class="fas fa-arrow-up"></i>
                        <strong>{{porcentaje2}}%</strong> 
                      </span>
                      <span v-if="porcentaje2>=0" class="green--text">
                        <i class="fas fa-arrow-up"></i>
                        <strong>+{{porcentaje2}}%</strong> 
                      </span>
                      </v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>
                </v-card-title>
                <div class="position-relative mb-4">
                  <canvas id="sales-chart2" height="200"></canvas>
                </div>
                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="../assets/profile.png"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title ><a class="link" href="/#/register-lead">{{MejorEmpleadoEv.nombre}}</a> </v-list-item-title>
                      <v-list-item-subtitle>${{MejorEmpleadoEv.monto}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-icon color="#007bff">mdi-rectangle</v-icon>

                      <span class="subheading">Monto bruto registrado</span>

                      <v-icon color="#ced4da" class="mr-1">mdi-rectangle</v-icon>
                      <span class="subheading ">Monto concretado</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </div>
          </div>

        </div>
      </div>
      
    </div>

<!-- <v-btn color="#37474F">Exportar</v-btn>
<br>
    <v-card light dark max-width="50%">
      <v-card-title>
        <v-list-item two-line>
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <span class="title font-weight-light">Ejecutivos</span>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">${{total1}}</v-list-item-title>
            <v-list-item-subtitle>Ventas</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-title>
      <div class="position-relative mb-4">
        <canvas id="sales-chart" height="250"></canvas>
      </div>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{MejorEmpleadoRR.nombre}}</v-list-item-title>
            <v-list-item-subtitle>${{MejorEmpleadoRR.monto}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-icon color="blue lighten-2">mdi-rectangle</v-icon>

            <span class="subheading mr-2">Monto Bruto</span>

            <v-icon class="mr-1">mdi-rectangle</v-icon>
            <span class="subheading mr-2">Concretado</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card> -->


  </div>
</template>





<script>
import axios from "axios";
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      totalconcretado1: 0,
      totalconcretado2: 0,
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
    data2:{
       dashboardRateHotel:[
			      {
            user_id:4,
            name:"Luis",
            last_name:"Melgarejo",
            rate_hotel:2000,
            total:41000
			      },
			  ],
       dashboardRateEvents : [
            {
            user_id:4,
            name:"gaaaa",
            last_name:"xd",
            rate_events:4000,
            total:22000
           },
           {
            user_id:5,
            name:"eee",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
            },
            {
            user_id:6,
            name:"aaaaaa",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
           },
         ],

    },
     
     data:{
       dashboardRateHotel:[
			     {
            user_id:1,
            name: "aaaaaa",
            last_name:"aaaaaaa",
            rate_hotel:5000,
            total:18000
			      },
			      {
            user_id:2,
            name:"aaaaaa",
            last_name:"aaaaaaa",
            rate_hotel:4000,
            total:21000
            },
            {
            user_id:3,
            name: "aaaaaa",
            last_name:"aaaaaaa",
            rate_hotel:2000,
            total:31000
			      },
			      {
            user_id:4,
            name:"Luis",
            last_name:"Melgarejo",
            rate_hotel:2000,
            total:41000
			      },
			  ],
       dashboardRateEvents : [
            {
            user_id:1,
            name:"u",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
            },
            {
            user_id:2,
            name:"m",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
           },
           {
            user_id:3,
            name:"l",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
            },
            {
            user_id:4,
            name:"gaaaa",
            last_name:"xd",
            rate_events:4000,
            total:22000
           },
           {
            user_id:5,
            name:"eee",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
            },
            {
            user_id:6,
            name:"aaaaaa",
            last_name:"aaaaaaa",
            rate_events:2000,
            total:21000
           },
         ],

    },
      estado: 'Prospecto',
      fecha: '',
      MejorEmpleadoRR: {
        nombre: "",
        monto: ""
      },
      MejorEmpleadoEv: {
        nombre: "",
        monto: ""
      },

      ids1:[], 
      ej_d1: [],
      data1_bruto: [],
      data1_concretado: [],
      total1: 0,
      /* porcentaje1: 0, */
      ids2:[],
      ej_d2: [],      
      data2_bruto: [],
      data2_concretado: [],
      total2: 0,
      /* porcentaje2: 0 */
      dataTemp: []
    };
  },
  computed: {
    ...mapState(['accessToken'])
  },
  methods: {
    
    ...mapActions(['stateToken']),
    tot() {
      let total1 = 0;
      let index1 = 0;
      let index2 = 0;
      let mejor_empleado1 = 0;
      let mejor_empleado2 = 0;
      let concretado1 = 0
      let concretado2 = 0
      //sumando el total rr bruto
      this.data1_bruto.forEach(function(element) {
        total1 += element;
      });
      this.total1 = total1;
      //sumando el total rr concretado
      this.data1_concretado.forEach(function(element) {
        concretado1 += element;
      });
      this.totalconcretado1 = concretado1;
      //sumando el total re concretado
      this.data2_concretado.forEach(function(element) {
        concretado2 += element;
      });
      this.totalconcretado2 = concretado2;
      
      let total2 = 0;
      this.data2_bruto.forEach(function(element) {
        total2 += element;
      });
      this.total2 = total2;

      this.data1_bruto.forEach(mejorempleado);
      function mejorempleado(element, indice) {
        if (element > mejor_empleado1) {
          mejor_empleado1 = element;
          index1 = indice;
        }
      }
      this.data2_bruto.forEach(mejorempleado2);
      function mejorempleado2(element2, indice2) {
        if (element2 > mejor_empleado2) {
          mejor_empleado2 = element2;
          index2 = indice2;
        }
      }
      this.MejorEmpleadoRR.nombre = this.ej_d1[index1];
      this.MejorEmpleadoRR.monto = this.data1_bruto[index1];
      this.MejorEmpleadoEv.nombre = this.ej_d2[index2];
      this.MejorEmpleadoEv.monto = this.data2_bruto[index2];

    },

    /* porcentajes() {
      var total_pasado = 0;
      this.data1_bruto_ant.forEach(function(element) {
        total_pasado += element;
      });
      var porcentaje1 = (this.total1 * 100) / total_pasado - 100;
      this.porcentaje1 = porcentaje1.toFixed(2);

      var total_pasado2 = 0;
      this.data2_bruto_ant.forEach(function(element) {
        total_pasado2 += element;
      });
      var porcentaje2 = (this.total2 * 100) / total_pasado2 - 100;
      this.porcentaje2 = porcentaje2.toFixed(2);
    }, */
    generarAlertas(colors, texto, estado) {
      this.alerts.push({ color: colors, text: texto, state: estado });
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
   cargarAños(){
      var fecha = new Date();
      var año = fecha.getFullYear();
      for(var i=2018; i<=año; i++){
        this.years.push(i)
      }
    },
    modificarFecha(){
      if(this.monthSelected!='[Seleccionar todos]'){
        this.fecha = this.monthSelected +' '+this.yearSelected
      }else{
        this.fecha = this.yearSelected
      }
     
    },
    grafico1() {
      var ctx = document.getElementById("sales-chart").getContext("2d");
      var ticksStyle = {
        fontColor: "#000000",
        fontStyle: "bold"
      };
      var mode = "index";
      var intersect = true;
      var chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.ej_d1,
          datasets: [
            {
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              data: this.data1_bruto
            },
            {
              backgroundColor: "#ced4da",
              borderColor: "#ced4da",
              data: this.data1_concretado
            }
          ]
        },
        // Opciones del gráfico
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                // display: false,
                gridLines: {
                  display: true,
                  lineWidth: "4px",
                  color: "rgba(0, 0, 0, .2)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  beginAtZero: true,
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    if (value >= 1000) {
                      value /= 1000;
                      value += "k";
                    }
                    return "$" + value;
                  }
                }
              }
            ],
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false
                },
                ticks: ticksStyle
              }
            ]
          }
        }
      });
    },

    grafico2() {
      var ctx = document.getElementById("sales-chart2").getContext("2d");
      var ticksStyle = {
        fontColor: "#000000",
        fontStyle: "bold"
      };
      var mode = "index";
      var intersect = true;
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "bar",
        // The data for our dataset
        data: {
          labels: this.ej_d2,
          datasets: [
            {
              backgroundColor: "#007bff",
              borderColor: "#6200EA",
              data: this.data2_bruto
            },
            {
              backgroundColor: "#ced4da",
              borderColor: "#ced4da",
              data: this.data2_concretado
            }
          ]
        },
        // Opciones del gráfico
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                // display: false,
                gridLines: {
                  display: true,
                  lineWidth: "4px",
                  color: "rgba(0, 0, 0, .2)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  beginAtZero: true,
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    if (value >= 1000) {
                      value /= 1000;
                      value += "k";
                    }
                    return "$" + value;
                  }
                }
              }
            ],
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false
                },
                ticks: ticksStyle
              }
            ]
          }
        }
      });
    },
    async Filtro(){
      this.resetFiltro()
      let datos = {
    		"month": this.months.indexOf(this.monthSelected),
    		"year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user/dashboard/jefes'
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
        this.tot()
        /* this.grafico1()
        this.grafico2() */
        location.reload() 
      })
      .catch(error => {
         alert('Hubo un error Filtrando los datos')
      })
    },

    resetFiltro(){
      this.total1 = 0
      this.total2 = 0
      this.ids1 = []
      this.ids2 = []
      this.ej_d1 = []
      this.ej_d2 = []
      this.data1_bruto = []
      this.data2_bruto = []
      this.data1_concretado = []
      this.data2_concretado = []
    }


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
    this.cargarDatos(data)
    this.cargarAños();
    this.grafico1();
    this.grafico2();
    this.tot();
    /* this.porcentajes(); */
    if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
    }
    } catch (error) {
      
    }
  },

};
</script>
<style >
  #percent{
    font-size: 15px;
  }
  .link{
    text-decoration: none;
    color: #FAFAFA;
    font-family: 'Segoe UI';
  }
  
</style>
