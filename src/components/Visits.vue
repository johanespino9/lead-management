<template>
  <div>
  <v-container class="col-md-12">
    <v-row >
        <v-col cols="auto">
          <v-combobox color="#ff4200"  v-model="yearSelected" :items="years" label="Seleccionar Año"></v-combobox>
        </v-col>
        <v-col cols="auto" style="margin-top: 12px;">
          <v-btn @click="getVisits()" color="#000000" style="color: #FAFAFA;">Filtrar Registros</v-btn>
        </v-col>
      </v-row>
      <template>
        <v-data-table
           hide-default-footer
          :headers="headers"
          :items="values"
          multi-sort
          class="elevation-1"
        >
        </v-data-table>
      </template>
</v-container>
<template>
    <div>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="1000px" class="center">
      <template  v-slot:activator="{ on }">
          <v-btn  style="margin-left: 11px;" dark class="mb-2" v-on="on">Registrar Nueva Visita</v-btn>
       </template>
       <v-card >
         <v-card-title>
              <span class="headline"><strong> Gestión de visitas</strong></span>
         </v-card-title>
       <v-card-text >
         <v-container>
              <v-row>
                <v-col cols="20" sm="6" md="80" class=center >
                    <v-text-field 
                    v-model="editedItem.name"
                    color="#ff4200" 
                    label="Nombre">
                    </v-text-field>
                  </v-col>
                  <v-col cols="20" sm="6" md="80" class=center>
                    <v-combobox
                      v-model="editedItem.account"
                      :items="allAccounts"
                      color="#ff4200"
                      label="Seleccionar Empresa"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-combobox
                      v-model="editedItem.razon"
                      :items="Reasons"
                      color="#ff4200"
                      label="Seleccionar razón"
                    ></v-combobox>

                  </v-col>
                  
                  <v-col cols="20" sm="3" md="80" class=center>
                      <v-menu
                        ref="menu"
                        color="#ff4200"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date1"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        min="26-09-2019"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            color="#ff4200"
                            v-model="date1"
                            label="Fecha de Visita"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date1" no-title scrollable color="#000000">
                          <div class="flex-grow-1"></div>
                          <v-btn text color="#ff4200" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="#ff4200" @click="$refs.menu.save(date1)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="80" >
                    <v-textarea
                      v-model="editedItem.description"
                      color="#ff4200" 
                      height="30"
                      :auto-grow="true"
                      :clearable="true"
                      label="Descripción"
                    ></v-textarea>
                  </v-col>
                  
                  <v-col class="lg-offset8" md="6" lg="6">
                        <h3>Hora Inicio</h3>
                        <v-time-picker width="250" header-color="#000000"  v-model="horaInicio" color="#ff4200"></v-time-picker>
                 </v-col>
                 <v-col class="lg-offset8" md="6" lg="6">
                      <h3>Hora Fin</h3>
                       <v-time-picker width="250" header-color="#000000"  v-model="horaFin"  color="#ff4200"></v-time-picker>
                 </v-col>
              
            </v-row>

         </v-container>
          <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="#ff4200" text @click="save()">Save</v-btn>
            </v-card-actions>
       </v-card-text>
       </v-card>         
      </v-dialog>


    </div>
    </template>

    <div class="container">
        


 <template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              color="#ff4200"
              dark
            >
              <!-- <v-btn icon @click="editItem(selectedEvent)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn> -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.description"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
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
    yearSelected: null,
    years: [],
    horaInicio: null,
    horaFin: null,
    grow: true,
    dialog: false,
    select:'',
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      start: null,
      end: null,
      editedItem: {
        name: '',
        description:'',
        start: '',
        finish: '',
        account: '',
        reason:'',
        razon: '',
      },
      defaultItem:{
        name: '',
        description:'',
        start: '',
        finish: '',
        account: '',
        reason:'',
        razon:''
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      allAccounts:[],
      listaVisitas:[],
      tablaVisitas:[],
      tablaVisitas1:{},
      tablaVisitas2:{},
      tablaVisitas3:{},
      events: [],
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      search: "",
      switch1: true,
      switch2: false,
      state: true,
      temporalVisits:[],
      percents: {},
      values:[],
      value: 0,
      editedIndex: -1,
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
        value: "setiembre"
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
  computed: {
    ...mapState(['Accounts', 'Reasons', 'accessToken', 'Visits']),
    title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }
        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
  },
   mounted (){ 
    try {  
      this.cargarVisitas()
      let visitas = JSON.parse(localStorage.getItem('visitas'))
      this.listaVisitas = visitas.calendar.listVisit
      this.tablaVisitas = visitas.tableVisits 
      var fecha = new Date();
      var año = fecha.getFullYear();
      this.yearSelected = año 
      this.cargarAños()
      this.$store.dispatch('getReasons')
      this.getNameAccounts()
      this.tablaVisitas1 = this.tablaVisitas.tableVisitsNumber1
      this.tablaVisitas2 = this.tablaVisitas.tableVisitsNumber1
      this.tablaVisitas3 = this.tablaVisitas.tableVisitsPercent
      this.cargaTable()
      } catch (error) {
       
     }
    },
    
  updated() {
      if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
    }
  },
  methods: {
    ...mapActions(['getReasons']),
    getNameAccounts(accounts) {
      let todoaccounts = JSON.parse(localStorage.getItem('accounts'))
      for (let i = 0; i < todoaccounts.length; i++) {
        this.allAccounts.push(todoaccounts[i].name);
      }
    },
    cargarAños(){
      var fecha = new Date();
      var año = fecha.getFullYear();
      for(var i=2018; i<=año; i++){
        this.years.push(i)
      }
    },
    viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },

      async getVisits(){
      let datos= {
        "year": this.yearSelected
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina.azurewebsites.net/user/dashboard/visits'
      await axios.post(url, datos, config)
      .then((res) => {
        console.log(res.data)
        let array = []
        array.push(res.data.tableVisits.tableVisitsNumber1, res.data.tableVisits.tableVisitsNumber1, res.data.tableVisits.tableVisitsPercent)
        this.values= array
      })
      .catch((error) => {
        alert('Error obteniendo las visitas del año '+ this.yearSelected)
        console.log(error)
      })
    },
    //AGREGAR UNA VISITA
    async addVisit(){
      try {
      let hour1= this.horaInicio
      let hour2= this.horaFin
      let datos= {
        "name": this.editedItem.name,
        "description": this.editedItem.name,
        "start": this.date1+"T"+hour1+":00",
        "finish": this.date1+"T"+hour2+":00",
        "account": this.editedItem.account,
        "reason": this.editedItem.razon,
      }
      console.log(datos)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      console.log(datos)
      let url = 'https://casa-andina.azurewebsites.net/user/visits'
      await axios.post(url, datos, config)
      .then((res) => {
        console.log(res.data)
        this.$store.commit('Visits', res.data)
        localStorage.setItem('visitas', JSON.stringify(res.data))
        let visitas = res.data.calendar.listVisit
        let array = []
        for(let i=0; i<visitas.length; i++){
          array.push({
            id: visitas[i].visitId,
            user: visitas[i].user,
            name: visitas[i].name,
            description: visitas[i].description,
            start: visitas[i].start.toString(),
            end: visitas[i].finish.toString(),
            account: visitas[i].account,
            reason: visitas[i].reason,
            color: '#ff4200',
          })
        }
        this.events = array 
      })
      .catch((error) => {
        alert('Error agregando la visita')
        console.log(error)
      }) 
      } catch (error) {
        
      } 
    },

    cargaTable(){
      this.values.push(this.tablaVisitas1, this.tablaVisitas2, this.tablaVisitas3) 
    },

/*     editItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log(this.editedIndex)
    }, */
    save () {
        if (this.editedIndex > -1) {
          console.log('se edito')
         
        } else {
          console.log('se añadio')
          this.addVisit()
        }
        this.close()
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      focuss(){
        this.editedItem.reason = ''
      },
      cargarVisitas(){
        try {
        let data = JSON.parse(localStorage.getItem('visitas'))
        let visitas =  data.calendar.listVisit
        console.log(visitas)

        let array = []
        for(let i=0; i<visitas.length; i++){
          array.push({
            id: visitas[i].visitId,
            user: visitas[i].user,
            name: visitas[i].name,
            description: visitas[i].description,
            start: visitas[i].start.toString(),
            end: visitas[i].finish.toString(),
            account: visitas[i].account,
            reason: visitas[i].reason,
            color: '#ff4200',
          })
        }     
        console.log(array)
        this.events = []
        this.events= array

        } catch (error) {
          
        }
      }

  },

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