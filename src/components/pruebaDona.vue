<template>
    <div>
        <v-container class="col-md-6">
            <v-row cols="8">
                <v-col>
                    <h2 cols="auto">Room Revenue : {{percents.room_revenue}}%</h2>
                    <div id="chart"></div>
                
                </v-col>
                <v-col>
                    <!-- <v-progress-circular
                    :rotate="360"
                    :size="200"
                    :width="40"
                    :value="percents.eventos"
                    color="green"
                >
                    {{ percents.eventos }}
                </v-progress-circular> -->
                <h2 cols="auto">Event Revenue : {{percents.eventos}}%</h2>
                <div id="chart2"></div>
                </v-col>
            </v-row>

        </v-container>


        <div class="row">
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
</template>
<script>
export default {

    mounted(){
        this.primeraDona()
        this.segundaDona()
    },
    methods:{
        primeraDona(){
      try {
      var options = {
            chart: {
                type: 'donut',
            },
            labels: ['Completado', 'Restante'],
            series: [60, 40],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#d69c4f', '#F0DDFF'],
            tooltip: {
              enabled: true,
              y: {
                formatter: function (val/* , index */) {
                  return "%" + val 
                }
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
    segundaDona(){
      try {
      var options = {
            chart: {
                type: 'donut',
            },
            labels: ['Completado', 'Pendiente'],
            series: [50, 50],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#d69c4f', '#F0DDFF'],
            tooltip: {
              enabled: true,
              y: {
                formatter: function (val/* , index */) {
                  return "%" + val 
                }
              },
          } 
        }

       var chart = new ApexCharts(
            document.querySelector("#chart2"),
            options
        );
      chart.render();
      } catch (error) {
        
      }
    }
    }
}
</script>