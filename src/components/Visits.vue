<template>
<div>
  
  <div v-if="groupSG != 'Eventos' ||  role!='Administrador'">
  <v-container class="col-md-12">
    <v-row >
        <v-col cols="auto">
          <v-combobox color="#d69c4f"  v-model="yearSelected" :items="years" label="Seleccionar Año"></v-combobox>
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

<v-container fluid>
<v-row>

  <v-col cols="20" sm="6" md="80">
      <template>
         <v-card class="mb-0" style="border-radius: 0px;">
            <v-card-text style="marging-top:0; padding-top:0;">
                <v-row>
                  <v-col cols="20" sm="8" md="80">
                    <v-text-field
                      color="#d69c4f"
                      class="text-xs-center"
                      v-model="search"
                      append-icon="search"
                      label="Búsqueda"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="4" md="80">
                    <v-combobox id="mes-selected" color="#d69c4f" @change="cambiaTableVisits(monthSelected)" class="text-xs-center"  v-model="monthSelected" :items="months" label="Seleccionar Mes" single-line hide-details></v-combobox>
                  </v-col> 
              </v-row>
            
            </v-card-text>
          </v-card>
        <v-data-table
          :search="search"
          :headers="header_tvisitas"
          :items="tableVisits"
          multi-sort
          class="elevation-1 mt-0"
          
          :items-per-page="itemsPerPage2"
          @page-count="pageCount2 = $event"
          :page.sync="page2"
        >        
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page2" :length="pageCount2"></v-pagination>
        </div>
      </template>
  </v-col> 
  <v-col cols="20" sm="6" md="80">
      <template>
        <v-data-table
          :headers="header_visita"
          :items="tableOlvidadosInt"
          multi-sort
          class="elevation-1"
          :items-per-page="itemsPerPage"
          
          @page-count="pageCount = $event"
          :page.sync="page"
        >
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-col>  
    <v-col cols="auto" sm="12" md="80">
      <template>
        <div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px" class="center">
          <template  v-slot:activator="{ on }">
              <v-btn  style="margin-left: 11px;" dark class="mb-2" v-on="on" @click="LimpiarCampos()">Registrar Nueva Visita</v-btn>
          </template>
          <v-card >
            <v-card-title>
                  <span class="headline"><strong> Gestión de visitas</strong></span>
            </v-card-title>
          <v-card-text >
            <v-container>
                  <v-row>
                    <!-- <v-col cols="20" sm="6" md="80" class=center >
                        <v-text-field 
                        v-model="editedItem.name"
                        color="#d69c4f" 
                        label="Motivo">
                        </v-text-field>
                      </v-col> -->
                      <v-col cols="20" sm="6" md="80" class=center>
                        <v-combobox
                          v-model="editedItem.reason"
                          :items="razones"
                          color="#d69c4f"
                          label="Seleccionar motivo"
                          id="reason"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="20" sm="6" md="80" class=center>
                        <v-combobox
                          v-model="editedItem.account"
                          :items="allAccounts"
                          color="#d69c4f"
                          label="Seleccionar Empresa"
                          id="account"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="20" sm="3" md="80" class=center>
                        <v-combobox
                          @change="cambiaTextA()"
                          v-model="status" 
                          :items="Status"
                          color="#d69c4f"
                          label="Seleccionar estado"
                          id="status"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="20" sm="3" md="80" class=center>
                          <v-menu
                            ref="menu"
                            color="#d69c4f"
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
                                color="#d69c4f"
                                v-model="date1"
                                label="Fecha de Visita"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker :min="defaultDate" v-model="date1" no-title scrollable color="#000000">
                              <div class="flex-grow-1"></div>
                              <v-btn text color="#d69c4f" @click="menu = false">Cancel</v-btn>
                              <v-btn text color="#d69c4f" @click="$refs.menu.save(date1)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                      </v-col>
                      
                      <v-col v-if="status == 'Cancelado'" cols="12" sm="6" md="80" >
                        <v-textarea
                          v-model="editedItem.description"
                          color="#d69c4f" 
                          height="30"
                          :auto-grow="true"
                          :clearable="true"
                          label="Descripción"
                        ></v-textarea>
                      </v-col>
                      <v-col v-if="status != 'Cancelado'" cols="12" sm="6" md="80" ></v-col>
                      
                      <v-col class="lg-offset8" md="6" lg="6">
                            <h3>Hora Inicio</h3>
                            <v-time-picker :min="HoraMin" :max="HoraMax" width="250" header-color="#000000"  v-model="horaInicio" color="#d69c4f"></v-time-picker>
                    </v-col>
                    <v-col class="lg-offset8" md="6" lg="6">
                          <h3>Hora Fin</h3>
                          <v-time-picker :min="HoraMin" :max="HoraMax" width="250" header-color="#000000"  v-model="horaFin"  color="#d69c4f"></v-time-picker>
                    </v-col>
                  
                </v-row>

            </v-container>
              <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="#d69c4f" text @click="close">Cancel</v-btn>
                          <v-btn color="#d69c4f" text @click="save()">Save</v-btn>
                </v-card-actions>
          </v-card-text>
          </v-card>         
          </v-dialog>


        </div>
        </template>
  </v-col>  
</v-row>

</v-container>




<div >
        

 <template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Hoy
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
          color="info"
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
              color="#d69c4f"
              dark
            > 
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
              
              <v-btn icon @click="editItem(selectedEvent)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn> 
              <v-btn  @click="CambiaColor" icon>
                <v-icon 
                :color="colorIcon"
                @click:append="CambiaColor"
                >mdi-heart</v-icon>
              </v-btn>
              <!-- <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.account"></span>
              <span v-html="selectedEvent.description
                +'<br><br>Hora Inicio: '+selectedEvent.start
                +'<br>Hora Fin: '+selectedEvent.end"
              ></span>
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

 <div v-if="role=='Administrador' || groupSG == 'Eventos'">
   <NotFound/>
 </div>

</div>
</template>

<script>
import axios from "axios";
import NotFound from './NotFound'
import { mapState, mapActions } from 'vuex';
export default {
  components:{
    NotFound
  },
  data: () => ({
    role:'',
    groupSG: '',
    colorIcon: 'white',
    yearSelected: null,
    years: [],
    horaInicio: null,
    horaFin: null,
    HoraMin: '06:00',
    HoraMax: '22:00',
    Status: ['Planificado', 'Completado', 'Cancelado'],
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
      estado: '',
      editedItem: {
        visitId: '',
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
        razon:'',
        status:''
      },
      status:'',
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
      defaultDate: new Date().toISOString().substr(0, 10),
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
    razones: ['Mantenimiento', 'Negociacion', 'Capacitacion', 'Reclamo', 'Ferias', 'Door to door', 'Otros'],
    header_visita: [
      {text: "Cuenta", value:"account"},
      {text: "Categoria", value:"category"},
      {text: "Última visita", value:"date"},
      {text: "Dias sin visita", value:"days"},
    ],
    tableOlvidadosInt: [],
    itemsPerPage: 5,
    pageCount: 0,
    page: 1,
    monthSelected: '',
    itemsPerPage2: 4,
    pageCount2: 0,
    page2: 1,
    search: '',
    months: ['[Seleccionar todos]', 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
    tableVisits: [],
    header_tvisitas: [
      {text: "Cuenta", value:"account"},
     /*  {text: "Usuario", value:"user"}, */
      {text: "Fecha", value:"finish"},
      {text: "H. Inicio", value:"start2"},
      {text: "H. Fin", value:"finish2"},
      {text: "Estado", value:"status"},
      {text: "Motivo", value:"reason"},
    ],
    
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
      this.verificaPermisos()
      let visitas = JSON.parse(localStorage.getItem('visitas'))
      this.cargarVisitas(visitas)
      this.listaVisitas = visitas.calendar.listVisit
      this.tablaVisitas = visitas.tableVisits 
      var fecha = new Date();
      var año = fecha.getFullYear();
      this.yearSelected = año 
      this.cargarAños()
      /* this.$store.dispatch('getReasons') */
      this.getNameAccounts()
      this.tablaVisitas1 = this.tablaVisitas.tableVisitsNumber1
      this.tablaVisitas2 = this.tablaVisitas.tableVisitsNumber2
      this.tablaVisitas3 = this.tablaVisitas.tableVisitsPercent
      this.cargaTable()
      this.cargaOlvidados(visitas.tableOlvidadosInt)
      this.fechaActual()
      this.cambiaTableVisits('')
      } catch (error) {
       console.log('Ocurrio un error')
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
      let url = 'https://casa-andina-backend.azurewebsites.net/user/dashboard/visits'
      await axios.post(url, datos, config)
      .then((res) => {
        let array = []
        array.push(res.data.tableVisits.tableVisitsNumber1, res.data.tableVisits.tableVisitsNumber1, res.data.tableVisits.tableVisitsPercent)
        this.values= array
        this.cargaOlvidados(res.data.tableOlvidadosInt)
        this.cargaTablaVisitas(res.data, '')
      })
      .catch((error) => {
        alert('Error obteniendo las visitas del año '+ this.yearSelected)
        console.log(error)
      })
    },

    cargaTablaVisitas(data, type){
      let calendar = data.calendar.listVisit;
      let arrayVisits = []
      for(let i=0; i<calendar.length; i++){
        let num_mes = parseInt(calendar[i].start.substring(5, 7))
        let nombre_mes = this.months[num_mes]
        if(type === '[Seleccionar todos]' || type === ''){
          calendar[i].start2 = calendar[i].start.substring(11, 16)
          calendar[i].finish2 = calendar[i].finish.substring(11, 16)
          calendar[i].finish = calendar[i].start.substring(0, 10)
          arrayVisits.push(calendar[i])
        }else{
          if(nombre_mes === type){
            calendar[i].start2 = calendar[i].start.substring(11, 16)
            calendar[i].finish2 = calendar[i].finish.substring(11, 16)
            calendar[i].finish = calendar[i].start.substring(0, 10)
            arrayVisits.push(calendar[i])
          }
        }
      }
      this.tableVisits = arrayVisits
    },
    cambiaTableVisits(mes){
      let data = JSON.parse(localStorage.getItem('visitas'))
      this.cargaTablaVisitas(data, mes)
    },
    
    //AGREGAR UNA VISITA
    async addVisit(){
      try {
      let hour1= this.horaInicio
      let hour2= this.horaFin
      let datos= {
        "description": this.editedItem.description,
        "start": this.date1+"T"+hour1+":00",
        "finish": this.date1+"T"+hour2+":00",
        "account": this.editedItem.account,
        "reason": this.editedItem.reason,
        "status": this.status,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/visits'
      await axios.post(url, datos, config)
      .then((res) => {
        this.$store.commit('Visits', res.data)
        localStorage.setItem('visitas', JSON.stringify(res.data))
        let visitas = res.data.calendar.listVisit
        let array = []
        for(let i=0; i<visitas.length; i++){
          array.push({
            id: visitas[i].visitId,
            user: visitas[i].user,
            /* name: visitas[i].name, */
            description: visitas[i].description,
            start: visitas[i].start.toString(),
            end: visitas[i].finish.toString(),
            account: visitas[i].account,
            name: visitas[i].reason+'<br>'+ visitas[i].account,
            reason: visitas[i].reason,
            status: visitas[i].status,
            color: '#d69c4f',
          })
        }
        this.events = array 
        this.values = []
        this.tablaVisitas1 = res.data.tableVisits.tableVisitsNumber1
        this.tablaVisitas2 = res.data.tableVisits.tableVisitsNumber2
        this.tablaVisitas3 = res.data.tableVisits.tableVisitsPercent
        this.values.push(this.tablaVisitas1, this.tablaVisitas2, this.tablaVisitas3)
        this.cargaOlvidados(res.data.tableOlvidadosInt)
        toastr.success('Se guardó correctamente')
      })
      .catch((error) => {
        toastr.error('Ocurrió un error agregando la visita')
        console.log(error)
      }) 
      } catch (error) {
        
      } 
    },

    //Edit a visit
    async editVisit(){
      try {
      let hour1= this.horaInicio
      let hour2= this.horaFin
      let datos= {
        "visitId": this.editedItem.id,
        "description": this.editedItem.description,
        "start": this.date1+"T"+hour1+":00",
        "finish": this.date1+"T"+hour2+":00",
        "account": this.editedItem.account,
        "status": this.status,
        "reason": this.editedItem.reason,
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      let url = 'https://casa-andina-backend.azurewebsites.net/user/visits'
      await axios.put(url, datos, config)
      .then((res) => {
        this.$store.commit('Visits', res.data)
        localStorage.setItem('visitas', JSON.stringify(res.data))
        let visitas = res.data.calendar.listVisit
        let array = []
        for(let i=0; i<visitas.length; i++){
          array.push({
            id: visitas[i].visitId,
            user: visitas[i].user,
            name: visitas[i].reason+'<br>'+ visitas[i].account,
            description: visitas[i].description,
            start: visitas[i].start.toString(),
            end: visitas[i].finish.toString(),
            account: visitas[i].account,
            reason: visitas[i].reason,
            status: visitas[i].status,
            color: '#d69c4f',
          })
        }
        this.events = array 
        this.values = []
        this.tablaVisitas1 = res.data.tableVisits.tableVisitsNumber1
        this.tablaVisitas2 = res.data.tableVisits.tableVisitsNumber2
        this.tablaVisitas3 = res.data.tableVisits.tableVisitsPercent
        this.values.push(this.tablaVisitas1, this.tablaVisitas2, this.tablaVisitas3)
        this.cargaOlvidados(res.data.tableOlvidadosInt)
        toastr.success('Se guardó correctamente')
      })
      .catch((error) => {
        toastr.error('Ocurrió un error agregando la visita')
        console.log(error)
      }) 
      } catch (error) {
        
      } 
    },

    /* RECURSIVIDAD */
    cambiaTextA(){
      if(this.status != 'Cancelado'){
        this.editedItem.description = ''
      } 
    },
    cargaTable(){
      this.values.push(this.tablaVisitas1, this.tablaVisitas2, this.tablaVisitas3) 
    },

     editItem (item) {
       try {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.status = item.status
        this.dialog = true
        let fecha= ''
        let horai= ''
        let horaf= ''
        for(let i=0; i<item.start.length; i++){
          if(item.start.charAt(i) == ' '){
            for(let j=i+1; j<item.start.length; j++){
              horai += item.start.charAt(j)
            }
            for(let h=i+1; h<item.end.length; h++){
              horaf += item.end.charAt(h)
            }
            break;
            return;
          }else{
            fecha += item.start.charAt(i)
          }
        }
        this.editedItem.status = item.status
        this.editedItem.reason = item.reason
        this.date1 = fecha
        this.horaInicio = horai
        this.horaFin = horaf
       } catch (error) {
         
       }
    }, 
    save () {
        if (this.editedIndex > -1) {
          console.log('se edito')
          this.editVisit()
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
      cargarVisitas(data){
        try {
        let visitas =  data.calendar.listVisit
        let array = []
        for(let i=0; i<visitas.length; i++){
          array.push({
            id: visitas[i].visitId,
            user: visitas[i].user,
            name: visitas[i].reason+'<br>'+ visitas[i].account,
            description: visitas[i].description,
            start: visitas[i].start.toString(),
            end: visitas[i].finish.toString(),
            account: visitas[i].account,
            status: visitas[i].status,
            reason: visitas[i].reason,
            color: '#d69c4f',
          })
        }     
        this.events = []
        this.events= array
        } catch (error) {
        }
      },
      separaFecha: function(cadena){
        let formatfecha = ''
        for(let h=0; h<19; h++){
             let letra = cadena.charAt(h)
             if(letra==='T'){
               formatfecha+=' '
             }else{
               formatfecha+=letra
             } 
        }
        return formatfecha
      },
      cargaOlvidados(tableOlvidadosInt){
        try {
          let array = tableOlvidadosInt
          for(let i=0; i< array.length; i++){
            array[i].date = this.separaFecha(array[i].date.toString())
          }
          this.tableOlvidadosInt = array
        } catch (error) {
          
        }
      },
      verificaPermisos(){
        this.role = JSON.parse(localStorage.getItem('usuario')).role
        this.groupSG = JSON.parse(localStorage.getItem('usuario')).groupSegment
       },
       LimpiarCampos(){
         this.status = ''
         this.editedItem.reason = ''
         this.editedItem.account = ''
         this.date1 = this.defaultDate
         this.editedItem.description = ''
         this.horaInicio = null
         this.horaFin = null
         this.reason = ''
         this.date1 = this.defaultDate
         this.date2 = this.defaultDate
       },
       CambiaColor(){
         if(this.colorIcon == 'red'){
           this.colorIcon = 'white'
         }else{
           this.colorIcon = 'red'
         }
       },
       fechaActual(){
        let fecha = new Date()
        if((fecha.getMonth()+1)<10){
          if(fecha.getDate()<10){
            this.today = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
            this.defaultDate = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
            return  this.date1 = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
          }else{
            this.today = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-"+fecha.getDate()
            this.defaultDate = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-"+fecha.getDate()
            return  this.date1 = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-"+fecha.getDate()
          }
        }else{
          if(fecha.getDate()<10){
            this.today = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
            this.defaultDate = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
            return  this.date1 = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
          }else{
            this.today = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
            this.defaultDate = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
            return  this.date1 = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
          }
        }
      },


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