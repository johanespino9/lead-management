<template>
  <div> 
    <v-container class="col-md-10 ">
    <v-row justify="center">
      <v-col cols="auto">
        <v-combobox  label="Selecciona Estado"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox label="Seleccionar Hotel"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox  label="Seleccionar Mes"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox label="Seleccionar Año"></v-combobox>
      </v-col>
      <v-col cols="auto" style="margin-top: 10px;">
        <v-btn >Filtrar Registros</v-btn>
      </v-col>
    </v-row>
  </v-container>
    <div class="wrapper"> 
    <div class="content">
    <div class="row">
  	 <div class="col-lg-6">
          <!-- DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card">
              <div class="card-header border-0">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Ejecutivos</h3>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex">
                  <p class="d-flex flex-column">
                    <span class="text-bold text-lg">${{total1}}</span>
                    <span>Ventas</span>
                  </p>
                  <p class="ml-auto d-flex flex-column text-right">
                    <span v-if="porcentaje1<0" class="text-danger">
                      <i class="fas fa-arrow-up"></i> {{porcentaje2}}%
                    </span>
                    <span v-if="porcentaje1>=0" class="text-success">
                      <i class="fas fa-arrow-up"></i> {{porcentaje2}}%
                    </span>
                    <span v-if="porcentaje1>=0" class="text-success">Alzas</span>
                    <span v-if="porcentaje1<0" class="text-danger">Bajas</span>
                  </p>
                </div>
                <!-- /.d-flex -->

                <div class="position-relative mb-4">
                  <canvas id="sales-chart" height="200"></canvas>
                </div>

                <div class="d-flex flex-row justify-content-end">
                  <span class="mr-2">
                    <i class="fas fa-square text-primary"></i> Monto bruto
                  </span>

                  <span>
                    <i class="fas fa-square text-gray"></i> Concretado
                  </span>
                </div>
              </div>
            </div>
        </div>
            <!-- /.card -->
 <!-- HASTA ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->

<div class="col-lg-6">
            <div class="card">
              <div class="card-header border-0">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Gerentes</h3>
                  
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex">
                  <p class="d-flex flex-column">
                    <span class="text-bold text-lg"> ${{total2}}</span>
                    <span>Ventas</span>
                  </p>
                  <p class="ml-auto d-flex flex-column text-right">
                    <span v-if="porcentaje2<0" class="text-danger">
                      <i class="fas fa-arrow-up"></i> {{porcentaje2}}%
                    </span>
                    <span v-if="porcentaje2>=0" class="text-success">
                      <i class="fas fa-arrow-up"></i> {{porcentaje2}}%
                    </span>
                    <span v-if="porcentaje2>=0" class="text-success">Alzas</span>
                    <span v-if="porcentaje2<0" class="text-danger">Bajas</span>
                  </p>
                </div>
                <!-- /.d-flex -->

                <div class="position-relative mb-4">
                  <canvas id="sales-chart2" height="200"></canvas>
                </div>

                <div class="d-flex flex-row justify-content-end">
                  <span class="mr-2">
                    <i class="fas fa-square text-primary"></i> Monto bruto
                  </span>

                  <span>
                    <i class="fas fa-square text-gray"></i> Concretado
                  </span>
                </div>
              </div>
            </div>
          </div>
       </div>
	</div>
  <button class="btn btn-danger" @click="tot()">ver size</button>
</div>
    
  </div>
</template>






  </div>


</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      total1: 0,
      total2: 0,
      ej_d1:['Luis', 'Vera<3', 'Alvaro', 'Johan', 'Rodrigo', 'Miguel', 'Roberto', 'Renzo', 'Sideral', 'Chupetin'],
      data1_bruto:[20000, 15000, 45000, 60000, 27000, 48000, 13000,60000, 50000, 40000],
      data1_bruto_ant:[15000, 15000, 45000, 60000, 27000, 48000, 13000,60000, 50000, 40000],
      data1_concretado:[15000, 10000, 40000, 10000, 20000, 30000, 10000, 10000, 40000, 10000],
      porcentaje1: 0,

      ej_d2:['Luis', 'Renzo', 'Alvaro', 'Johan', 'Rodrigo', 'Miguel', 'Roberto'],
      data2_bruto:[20000, 15000, 45000, 60000, 27000, 48000, 13000],
      data2_bruto_ant:[30000, 10000, 45000, 70000, 37000, 58000, 15000],
      data2_concretado:[15000, 10000, 40000, 10000, 20000, 30000, 10000],
      porcentaje2: 0,
    }
  },
  computed: {
  },
  methods: {
    tot(){
      var total1 = 0
      this.data1_bruto.forEach(function(element) {
        total1 += element
      })
      this.total1 = total1

      var total2 = 0
      this.data2_bruto.forEach(function(element) {
        total2 += element
      })
      
      this.total2 = total2
    },

    porcentajes(){
      var total_pasado = 0
      this.data1_bruto_ant.forEach(function(element){
        total_pasado+= element
      })
      var porcentaje1 = ((this.total1*100)/total_pasado)-100
      this.porcentaje1 = porcentaje1.toFixed(2)

      var total_pasado2 = 0
      this.data2_bruto_ant.forEach(function(element){
        total_pasado2+= element
      })
      var porcentaje2 = ((this.total2*100)/total_pasado2)-100
      this.porcentaje2 = porcentaje2.toFixed(2)
    },
    generarAlertas(colors, texto, estado){
    this.alerts.push({color:colors, text:texto, state:estado})
    },

    grafico1(){
    var ctx = document.getElementById('sales-chart').getContext('2d');
    var ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    }
    var mode      = 'index'
    var intersect = true
    var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels  : this.ej_d1,
      datasets: [
        {
          backgroundColor: '#007bff',
          borderColor    : '#007bff',
          data           : this.data1_bruto
        },
        {
          backgroundColor: '#ced4da',
          borderColor    : '#ced4da',
          data           : this.data1_concretado
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
        mode     : mode,
        intersect: intersect
      },
      legend : {
        display: false
      },
      scales:{
        yAxes: [{
          // display: false,
          gridLines: {
            display      : true,
            lineWidth    : '4px',
            color        : 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks:({
            beginAtZero: true,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              if (value >= 1000) {
                value /= 1000
                value += 'k'
              }
              return '$' + value
            }
          })  
        }],
        xAxes: [{
          display  : true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      }
      }
    });
  },

  grafico2(){
    var ctx = document.getElementById('sales-chart2').getContext('2d');
    var ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    }
    var mode      = 'index'
    var intersect = true
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels  : this.ej_d2,
      datasets: [
        {
          backgroundColor: '#007bff',
          borderColor    : '#007bff',
          data           : this.data2_bruto
        },
        {
          backgroundColor: '#ced4da',
          borderColor    : '#ced4da',
          data           : this.data2_concretado
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
        mode     : mode,
        intersect: intersect
      },
      legend : {
        display: false
      },
      scales:{
        yAxes: [{
          // display: false,
          gridLines: {
            display      : true,
            lineWidth    : '4px',
            color        : 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks:({
            beginAtZero: true,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              if (value >= 1000) {
                value /= 1000
                value += 'k'
              }
              return '$' + value
            }
          })  
        }],
        xAxes: [{
          display  : true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      }
      }
    });
  }

  },
  
  mounted() {
   this.grafico1()
   this.grafico2()
   this.tot()
   this.porcentajes()
  },
  
  
}
</script>
