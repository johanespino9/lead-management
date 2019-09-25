<template>
  <div>
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
        <td>{{ item.enero }}</td>
        <td>{{ item.febrero }}</td>
        <td>{{ item.marzo }}</td>
        <td>{{ item.abril }}</td>
        <td>{{ item.mayo }}</td>
        <td>{{ item.junio }}</td>
        <td>{{ item.julio }}</td>
        <td>{{ item.agosto }}</td>
        <td>{{ item.septiembre }}</td>
        <td>{{ item.octubre }}</td>
        <td>{{ item.noviembre }}</td>
        <td>{{ item.diciembre }}</td>
        <td class="text-xs-right">{{ item.salary }}</td>
      </template>
    </v-data-table>

</v-container>
<v-col cols="auto" style="margin-top: 10px;">
        <v-btn color="#ff4200" >Registrar Visita</v-btn>
</v-col>
    <div>
        <template>
          <v-row>
            <v-col>
              <v-sheet height="400">
                <v-calendar
                  ref="calendar"
                  :now="today"
                  :value="today"
                  :events="events"
                  color="primary"
                  type="week"
                >
                  <!-- the events at the top (all-day) -->
                  <template v-slot:day-header="{ date }">
                    <template v-for="event in eventsMap[date]">
                      <!-- all day events don't have time -->
                      <div
                        v-if="!event.time"
                        :key="event.title"
                        class="my-event"
                        @click="open(event)"
                        v-html="event.title"
                      ></div>
                    </template>
                  </template>
                  <!-- the events at the bottom (timed) -->
                  <template v-slot:day-body="{ date, timeToY, minutesToPixels }">
                    <template v-for="event in eventsMap[date]">
                      <!-- timed events -->
                      <div
                        v-if="event.time"
                        :key="event.title"
                        :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                        class="my-event with-time"
                        @click="open(event)"
                        v-html="event.title"
                      ></div>
                    </template>
                  </template>
                </v-calendar>
              </v-sheet>
            </v-col>
          </v-row>
        </template>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    state: true,
    today: '2019-01-08',
    events: [
      {
        name: 'Weekly Meeting',
        start: '2019-01-07 09:00',
        end: '2019-01-07 10:00',
      },
      {
        name: 'Thomas\' Birthday',
        start: '2019-01-10',
      },
      {
        name: 'Mash Potatoes',
        start: '2019-01-09 12:30',
        end: '2019-01-09 15:30',
      },
    ],
    percents: {},
    values:[],
    value: 0,
    headers: [
      {
        sortable: false,
        text: "",
        value: "dato"
      },
      {
        sortable: false,
        text: "Enero",
        value: "enero"
      },
      {
        sortable: false,
        text: "Febrero",
        value: "febrero"
      },
      {
        sortable: false,
        text: "Marzo",
        value: "marzo"
      },
      {
        sortable: false,
        text: "Abril",
        value: "abril"
      },
      {
        sortable: false,
        text: "Mayo",
        value: "mayo"
      },
      {
        sortable: false,
        text: "Junio",
        value: "junio"
      },
      {
        sortable: false,
        text: "Julio",
        value: "julio"
      },
      {
        sortable: false,
        text: "Agosto",
        value: "agosto"
      },
      {
        sortable: false,
        text: "Septiembre",
        value: "septiembre"
      },
      {
        sortable: false,
        text: "Octubre",
        value: "octubre"
      },
      {
        sortable: false,
        text: "Noviembre",
        value: "noviembre"
      },
      {
        sortable: false,
        text: "Diciembre",
        value: "diciembre"
      }
    ],
    items: [],
  }),
   mounted (){
    var Dash = JSON.parse(localStorage.getItem('dashboard'))
      if(this.values.length==0 && Dash!=null && this.percents!=null){
        this.values = Dash.table
        this.percents = Dash.porcentajeConcrecion
        console.log('Carga Dash completa')
      }
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
      }
      
      
    } 
  
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>