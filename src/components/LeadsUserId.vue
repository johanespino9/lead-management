<template>
<div>
  <div >
  <v-card >
          <v-card-title>
            <v-container fluid>
              <v-row class="child-flex">
                <div style="flex-basis: 50%">
                    <v-row>
                      <v-col cols="20" sm="4" md="80">
                        LEADS - {{name_user}} 
                      </v-col>
                      <v-divider class="mx-4" inset vertical></v-divider>
                       <v-spacer></v-spacer>
                      <v-col cols="20" sm="7" md="80">
                        <v-text-field
                          
                          id="search-lead-user"
                          color="#d69c4f"
                          class="text-xs-center"
                          v-model="search"
                          
                          label="Búsqueda"
                          
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-divider class="mx-4" inset vertical></v-divider>
                    </v-row>
                  
                </div>

                <div style="flex-basis: 43%" class="ml-4">
                  
                    <v-row>
                      <!-- <v-spacer></v-spacer> -->
                      <v-col cols="20" sm="4" md="80">
                        <v-dialog
                          color="#d69c4f"
                          ref="dialog4"
                          v-model="modal4"
                          :return-value.sync="date_filtro1"
                          persistent
                          full-width
                          width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              id="date_filtro1"
                              color="#d69c4f"
                              v-model="date_filtro1"
                              label="Fecha Inicio"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              hide-details
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date_filtro1"  scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog4.save(date_filtro1); FiltraPorFecha()">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-col cols="20" sm="4" md="80">
                        <v-dialog
                          color="#d69c4f"
                          ref="dialog5"
                          v-model="modal5"
                          :return-value.sync="date_filtro2"
                          persistent
                          full-width
                          width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              id="date_filtro2"
                              color="#d69c4f"
                              v-model="date_filtro2"
                              label="Fecha Fin"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              hide-details
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date_filtro2" :min="date_filtro1" scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="modal5 = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog5.save(date_filtro2); FiltraPorFecha();">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-col v-if="role!='Ejecutivo'" cols="20" sm="3" md="80" class="mt-3 ml-3">
                        <v-btn
                        :loading="loading"
                        :disabled="loading"
                        color="primary"
                        class="ma-2 white--text"
                        @click="ExportarLeads()"
                      >
                        Exportar Leads
                        <v-icon right dark>mdi-cloud-downlad</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  
                </div>
                <!-- <div style="flex-basis: 10%">
                  <v-toolbar height="130">
                    <v-container fluid class="text-center">
                      <v-btn color="#d69c4f" @click="FiltraDatos()" style="color: #FAFAFA;" dark class="mb-2" v-on="on" >Añadir Nuevo Lead</v-btn>
                    </v-container>
                  </v-toolbar>
                </div> -->
              </v-row>
            </v-container>
            </v-card-title>
          
  <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <!-- <v-toolbar-title>LEADS - {{name_user}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          disabled
          color="#d69c4f"
          class="text-xs-center"
          v-model="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer> -->
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="1150px">
          
          <template v-slot:activator="{ on }">
            <h5>{{fecha}}</h5>
            <!-- <v-btn color="#d69c4f" @click="FiltraDatos()" style="color: #FAFAFA;" dark class="mb-2" v-on="on" >Añadir Nuevo Lead</v-btn> -->
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
              <v-stepper v-model="editedItem.statusid" @change="cambiaRazones()"  non-linear >
                      <v-stepper-header>
                        <v-stepper-step
                          color="#d69c4f"
                          
                          
                          :complete="editedItem.statusid>0"
                          step="1"
                        >
                          Prospecto
                        </v-stepper-step>
                
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1" 
                          
                          
                          :complete="editedItem.statusid>1"
                          step="2"
                        >
                          Tentativo
                        </v-stepper-step>
                
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>2"
                          step="3"
                          
                          
                        >
                          Hot
                        </v-stepper-step>
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>3"
                          step="4"
                          
                          
                        >
                          Congelado
                        </v-stepper-step>
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>4"
                          step="5"
                          
                      
                        >
                          Cancelado
                        </v-stepper-step>
                        
                        <v-divider></v-divider>
                
                        <v-stepper-step
                          color="#d69c4f"
                          v-if="editedIndex>-1"
                          :complete="editedItem.statusid>5"
                          step="6"
                        >
                          Confirmado
                        </v-stepper-step>
                      </v-stepper-header>
                    </v-stepper>

            <v-card-text>
              <v-container>
                <v-row >
                  <!-- <v-col v-if="editedIndex>-1" cols="20" sm="12" md="80" class=center >
                    <v-text-field v-model="editedItem.leadid" disabled  label="Lead ID" ></v-text-field>
                  </v-col> -->
                  <v-col v-if="razon==4" cols="20" sm="4" md="80" class=center>
                    <v-combobox disabled color="#d69c4f" id="segments-id1" v-model="editedItem.razon"  :items="razones" label="Seleccionar Motivo" ></v-combobox>
                  </v-col>
                  <v-col v-if="razon==5" cols="20" sm="4" md="80" class=center>
                    <v-combobox disabled color="#d69c4f" id="segments-id2" v-model="editedItem.razon"  :items="razones2" label="Seleccionar Motivo" ></v-combobox>
                  </v-col>
                  <v-col  v-if="editedItem.statusid==4" cols="20" sm="8" md="80" class=center></v-col>
                  <v-col v-if="editedItem.statusid==5" cols="20" sm="8" md="80" class=center></v-col>

                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox disabled color="#d69c4f" id="segments-id" v-model="editedItem.segment"  :items="segments" label="Seleccionar Segmento" ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox disabled  color="#d69c4f" id="accounts-id" v-model="editedItem.account" :items="leadsAccounts" label="Seleccionar Cuenta"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-combobox disabled  color="#d69c4f" id="hotels-id" v-model="editedItem.hotel" :items="hotels" label="Seleccionar Hotel"></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="4" md="80" class=center>
                    <v-text-field  disabled color="#d69c4f" id="group-id" v-model="editedItem.name" label="Nombre de Grupo"></v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center>
                    <v-dialog
                       disabled 
                      color="#d69c4f"
                      ref="dialog1"
                      v-model="modal1"
                      :return-value.sync="date1"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          disabled
                          color="#d69c4f"
                          v-model="date1"
                          label="Fecha Inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date1" :min="date" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog1.save(date1)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center>
                    <v-dialog
                     disabled 
                      color="#d69c4f"
                      ref="dialog2"
                      v-model="modal2"
                      :return-value.sync="date2"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          disabled
                          color="#d69c4f"
                          v-model="date2"
                          label="Fecha Fin"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date2" :min="date1" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog2.save(date2)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col  v-if="editedItem.segment!='Eventos' && editedItem.segment!='Series'"  cols="20" sm="2" md="80" class=center >
                    <v-text-field disabled  id="habitation-id" color="#d69c4f" v-mask="mask" v-model="rooms" label="Cantidad de Habitaciones"  >{{rooms}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment != 'Eventos' && editedItem.segment!='Series'" cols="20" sm="2" md="80" class=center  >
                    <v-text-field  disabled  id="tarifa-id" color="#d69c4f" v-mask="mask" v-model="rateHotel" prefix="$" label="Ingresar Tarifa Neta">{{editedItem.rateHotel}}</v-text-field>
                  </v-col>
                  <!-- <v-col v-if="editedItem.segment=='Series'" cols="20" sm="2" md="80" class=center >
                    <v-text-field color="#d69c4f" v-mask="mask"  v-model="nights" label="Cantidad de Noches" >{{editedItem.nights}}</v-text-field>
                  </v-col> -->

                  <v-col v-if="editedItem.segment =='Series'" cols="20" sm="10" md="80">
                    <v-combobox
                        disabled 
                        color="#d69c4f" 
                        id="selection_months"
                        v-model="editedItem.month"
                        :items="months"
                        :search-input.sync="search"
                        hide-selected
                        hint=""
                        label="Seleccionar Meses"
                        multiple
                        persistent-hint
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                No results matching "<strong>{{ search }}</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                  </v-combobox>
                  </v-col>

                  <v-col v-if="editedItem.segment =='Series'" cols="20" sm="2" md="80" style="margin-top=15px;">
                      <v-btn  disabled   @click="monthsLenght()" class="mx-12" fab color="#d69c4f">
                        <v-icon color="#FAFAFA" dark>mdi-plus</v-icon>
                      </v-btn>
                  </v-col>
                  <!-- MESES -->
                
                  <MonthInput v-if="editedItem.segment =='Series' && estado1==true"  @tarifa="tarifa1 = $event" @habitaciones="habitaciones1 = $event" @noches="noches1 = $event"  
                  :mes="mes1" :tarifa="tarifa1" :habitaciones="habitaciones1" :noches="noches1" :value="totalmeses"  :totalmes="totalmes1"/>
                  

                  <MonthInput v-if="editedItem.segment =='Series' && estado2==true " @tarifa="tarifa2 = $event" @habitaciones="habitaciones2 = $event" @noches="noches2 = $event"  
                  :mes="mes2" :tarifa="tarifa2" :habitaciones="habitaciones2" :noches="noches2"  :totalmes="totalmes2" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado3==true " @tarifa="tarifa3 = $event" @habitaciones="habitaciones3 = $event" @noches="noches3 = $event" 
                  :mes="mes3" :tarifa="tarifa3" :habitaciones="habitaciones3" :noches="noches3"  :totalmes="totalmes3" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado4==true " @tarifa="tarifa4 = $event" @habitaciones="habitaciones4 = $event" @noches="noches4 = $event"  
                  :mes="mes4" :tarifa="tarifa4" :habitaciones="habitaciones4" :noches="noches4"  :totalmes="totalmes4" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado5==true " @tarifa="tarifa5 = $event" @habitaciones="habitaciones5 = $event" @noches="noches5 = $event" 
                  :mes="mes5" :tarifa="tarifa5" :habitaciones="habitaciones5" :noches="noches5"  :totalmes="totalmes5" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado6==true " @tarifa="tarifa6 = $event" @habitaciones="habitaciones6 = $event" @noches="noches6 = $event"  
                  :mes="mes6" :tarifa="tarifa6" :habitaciones="habitaciones6" :noches="noches6"  :totalmes="totalmes6" />
                  
                  <MonthInput v-if="editedItem.segment =='Series' && estado7==true " @tarifa="tarifa7 = $event" @habitaciones="habitaciones7 = $event" @noches="noches7 = $event"  
                  :mes="mes7" :tarifa="tarifa7" :habitaciones="habitaciones7" :noches="noches7"  :totalmes="totalmes7" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado8==true " @tarifa="tarifa8 = $event" @habitaciones="habitaciones8 = $event" @noches="noches8 = $event"  
                  :mes="mes8" :tarifa="tarifa8" :habitaciones="habitaciones8" :noches="noches8"  :totalmes="totalmes8" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado9==true " @tarifa="tarifa9 = $event" @habitaciones="habitaciones9 = $event" @noches="noches9 = $event"  
                  :mes="mes9" :tarifa="tarifa9" :habitaciones="habitaciones9" :noches="noches9"  :totalmes="totalmes9" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado10==true " @tarifa="tarifa10 = $event" @habitaciones="habitaciones10 = $event" @noches="noches10 = $event"  
                  :mes="mes10" :tarifa="tarifa10" :habitaciones="habitaciones10" :noches="noches10"  :totalmes="totalmes10" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado11==true " @tarifa="tarifa11 = $event" @habitaciones="habitaciones11 = $event" @noches="noches11 = $event" 
                  :mes="mes11" :tarifa="tarifa11" :habitaciones="habitaciones11" :noches="noches11"  :totalmes="totalmes11" />

                  <MonthInput v-if="editedItem.segment =='Series' && estado12==true " @tarifa="tarifa12 = $event" @habitaciones="habitaciones12 = $event" @noches="noches12 = $event"  
                  :mes="mes12" :tarifa="tarifa12" :habitaciones="habitaciones12" :noches="noches12"  :totalmes="totalmes12" />

                   <!-- TERMINAN LOS MESES -->
                  
                  <v-col v-if="editedItem.segment!='Series' || editedItem.segment==''" cols="20" sm="12">
                    <v-btn-toggle color="primary" v-model="sevent">
                      <v-btn  disabled  color="#d69c4f" @click="limpiarfilas()" text value="no">
                        Sin evento
                      </v-btn>
                      <v-btn disabled color="#d69c4f" text value="si">
                        Evento
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si'" cols="20" sm="4" md="80" >
                    <v-combobox
                         disabled 
                        id="events-id"
                        color="#d69c4f"
                        v-model="editedItem.eventsName"
                        :items="items"
                        :search-input.sync="search"
                        hide-selected
                        hint=""
                        label="Seleccionar Eventos"
                        multiple
                        persistent-hint
                        
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-combobox>
                  </v-col>
                  <v-col v-if="sevent=='si' && editedItem.segment!='Series'" cols="20" sm="2" md="80" style="margin-top=15px;">
                    <!-- <v-btn-toggle color="primary">
                      <v-btn @click="cantTfield()" text value="si">
                        Ingresar Costos
                      </v-btn>
                      </v-btn-toggle> -->
                      <!-- <v-btn    @click="cantTfield()" class="mx-12" fab color="#d69c4f">
                        <v-icon color="#FAFAFA" dark>mdi-plus</v-icon>
                      </v-btn> -->
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si' && name1=='Alimentos y bebidas' || name2=='Alimentos y bebidas' || name3=='Alimentos y bebidas' " cols="20" sm="2" md="80" class=center >
                    <v-text-field disabled  color="#d69c4f" v-mask="mask" v-model="rateEvent1" prefix="$" label="Ingresar Eventos AyB">{{editedItem.rateEvent1}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si'  && (name1=='Equipos' || name2=='Equipos' || name3=='Equipos')" cols="20" sm="2" md="80" class=center >
                    <v-text-field  disabled color="#d69c4f" v-mask="mask" v-model="rateEvent2"  prefix="$" label="Ingresar Eventos Equipos">{{editedItem.rateEvent2}}</v-text-field>
                  </v-col>
                  <v-col v-if="editedItem.segment!='Series' && sevent=='si'  && (name1=='Salas' || name2=='Salas' || name3=='Salas')" cols="20" sm="2" md="80" class=center >
                    <v-text-field  disabled color="#d69c4f" v-mask="mask" v-model="rateEvent3"  prefix="$" label="Ingresar Eventos Salas">{{editedItem.rateEvent3}}</v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field  disabled color="#d69c4f" v-model="editedItem.contactName" label="Nombre Contacto"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Cargo"></v-text-field>
                  </v-col>-->
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field  disabled color="#d69c4f" v-model="editedItem.contactEmail" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field disabled  color="#d69c4f" v-mask="mask"  v-model="editedItem.contactPhone" label=" Celular/Teléfono"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.segment != 'Eventos'">
                  <v-col > 
                    <h3 style="color: #000000;"> Room Revenue: ${{roomrevenue()}} </h3>
                  </v-col> 
                </v-row>
                <v-row v-if="editedItem.segment != 'Series' ">
                  <v-col >
                     <h3 style="color: #000000;"> Eventos: ${{eventrevenue()}} </h3>
                  </v-col>  
                </v-row> 
                <v-row>
                  <v-col>
                    <h3 style="color: #000000;"> <strong>TOTAL: ${{grantotal()}} </strong> </h3>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="#d69c4f" text @click="close">CERRAR</v-btn>
              <v-btn v-if="role == 'Ejecutivo'" color="#d69c4f" text @click="atender">Atender</v-btn>
             <!--  <v-btn color="#d69c4f" text @click="save()">Guardar</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">details</v-icon>
    </template>
  </v-data-table>
  </v-card>
</div>
<v-container fluid class="text-left">
  <v-btn color="#d69c4f" style="color: white;" class="mr-3" @click="regresa()">
   <i class="fas fa-arrow-left mr-2"></i> Anterior
  </v-btn>
</v-container>
</div>
</template>



<script>

import axios from "axios";
import NotFound from './NotFound'
import {mapActions, mapState} from 'vuex'
import { mask } from 'vue-the-mask'


import MonthInput from '../components/MonthInput'

export default {
  components:{
    NotFound,
    MonthInput
  },
  directives: {
      mask,
    },
  props: ['totalmeses'],
  data: () => ({
    loading:false,
    role: '',
    sevent: 'no',
    rateEvent1:0,
    rateEvent2:0,
    rateEvent3:0,
    rooms:0,
    rateHotel:0,
    nights: 0,
    fecha: '',
    name_user: '',
    step: null,
    totalevt: 0,
    cantevtrate: [],
    mask: '################',
    snackbar:false,
    monthselected: [],
    msjerror: 'Se eliminó correctamente',
    msjsuccess:'Se guardó correctamente',
    type: 'success',
    dismissSecs: 2,
    dismissCountDown: 0,
    showDismissibleAlert: false,

    tipo_lead : 0, // Indicará el tipo de lead a elegir
    allstatus:['','Prospecto', 'Tentativo', 'Hot', 'Congelado', 'Cancelado',  'Confirmado'],
    items: ['Alimentos y bebidas', 'Equipos', 'Salas'], // Array Events
    model: [],
    selected:[],
    dialog: false,
    date: '',
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      modal1: false,
      modal2: false,
      menu2: false,
     headers: [
      /* { text: "Lead ID", value: "leadid" }, */
      {
        text: "Nombre Lead",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Segmento", value: "segment", sortable: true },
      { text: "Fecha de Creación", value: "createDate" , sortable: true },
      { text: "Contacto", value: "contactName", sortable: true  },
      { text: "Cuenta", value: "account", sortable: true  },
      { text: "Ingreso de Alojamiento", value: "totalhotel" },
      { text: "Ingreso de Eventos", value: "totalevents"},
      { text: "Total Ingresos", value: "totalgeneral"},
      { text: "Estado", value: "status" },
      { text: "Actions", value: "action", sortable: false }
    ],
    search: "",
    name1: "",
    name2: "",
    name3: "",
    desserts: [],
    selectedAccount: '',
    selectedHotel: '',
    selectedSegment: '',
    corporateView: false,
    agencyGroupsView: false,
    agencySeriesView: false,
    eventsView: false,
    corporateSegments: ["Grupos", "Largas Estadías", "Tripulación"],
    segments: [],
    leadsAccounts: [],
    hotels: [],
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
    editedIndex: -1,
    editedItem: {
      leadid: '',
      name: "",
      initialdate: '',
      finaldate: '',
      account: '',
      nights:'',
      segment:'',
      hotel:'',
      rateHotel: 0,
      rooms: 0,
      contactName: '',
      contactPhone:'',
      contactEmail: '',
      eventsName:[],
      rateEvent: 0,
      rateEvent1: 0,
      rateEvent2: 0,
      rateEvent3: 0,
      contact: '',
      month:[],
      status: 0,
      statusid:0 ,
      tarifaneta: 0,
      razon: 0
      
    },
    razon: 0,
    defaultItem: {
      segment: '',
      name: "",
      contactName: '',
      rooms: 0,
      rateHotel: 0,
      rateEvent: 0,
      rateEvent1: 0,
      rateEvent2: 0,
      rateEvent3: 0,
      finaldate: 0,
      contact: '',
      account: '',
      tarifaneta: 0,
      status: '',
      statusid:0 
    },

    razones:[],
    razones2:[],
    todoRazones: [],
    
    mes1 : 'Enero',
    mes2 : 'Febrero',
    mes3 : 'Marzo',
    mes4 : 'Abril',
    mes5 : 'Mayo',
    mes6 : 'Junio',
    mes7 : 'Julio',
    mes8 : 'Agosto',
    mes9 : 'Septiembre',
    mes10 : 'Octubre',
    mes11 : 'Noviembre',
    mes12 : 'Diciembre',

    tarifa1: 0,
    tarifa2: 0,
    tarifa3: 0,
    tarifa4: 0,
    tarifa5: 0,
    tarifa6: 0,
    tarifa7: 0,
    tarifa8: 0,
    tarifa9: 0,
    tarifa10: 0,
    tarifa11: 0,
    tarifa12: 0,

    habitaciones1: 0,
    habitaciones2: 0,
    habitaciones3: 0,
    habitaciones4: 0,
    habitaciones5: 0,
    habitaciones6: 0,
    habitaciones7: 0,
    habitaciones8: 0,
    habitaciones9: 0,
    habitaciones10: 0,
    habitaciones11: 0,
    habitaciones12: 0,

    noches1: 0,
    noches2: 0,
    noches3: 0,
    noches4: 0,
    noches5: 0,
    noches6: 0,
    noches7: 0,
    noches8: 0,
    noches9: 0,
    noches10: 0,
    noches11: 0,
    noches12: 0,

    totalmes1: 0,
    totalmes2: 0,
    totalmes3: 0,
    totalmes4: 0,
    totalmes5: 0,
    totalmes6: 0,
    totalmes7: 0,
    totalmes8: 0,
    totalmes9: 0,
    totalmes10: 0,
    totalmes11: 0,
    totalmes12: 0,

    estado1: false,
    estado2: false,
    estado3: false,
    estado4: false,
    estado5: false,
    estado6: false,
    estado7: false,
    estado8: false,
    estado9: false,
    estado10: false,
    estado11: false,
    estado12: false,

    room_revenue: 0,
    event_revenue: 0,
    date_filtro1: '',
    date_filtro2: '',
    dialog4: false,
    dialog5: false,
    modal4: false,
    modal5: false,
   
  }),
  computed: {
    ...mapState(['Users', 'Hoteles', 'Accounts', 'AllLeads', 'Segmentos', 'accessToken', 'linkServer']),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Lead" : "Editar Lead";
    },
    
    suma:function ({state}) {
      return state.editedItem.rateEvent1+state.editedItem.rateEvent2+state.editedItem.rateEvent3
    }, 
    totalevtnto(){
      return this.totalevt =  parseInt(this.editedItem.rateEvent1) + parseInt(this.editedItem.rateEvent2)+ parseInt(this.editedItem.rateEvent3)
    }
  
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    selectedSegment: function () {
      
    },
    month(val) {
        if (val.length > 4) {
          this.$nextTick(() => this.editedItem.month.pop())
        }
    },
    event(val) {
        if (val.length > 3) {
          this.$nextTick(() => this.editedItem.eventsName.pop())
        }
    },
    
  },
  created() {
    
  },
  mounted() {
    try {
      this.verificaPermisos()
      this.getUserLeads()
      this.fecha = JSON.parse(localStorage.getItem('leads-user')).fecha
      this.name_user = JSON.parse(localStorage.getItem('leads-user')).datos.nombre
      let mes = parseInt(JSON.parse(localStorage.getItem('leads-user')).filtro.substring(5,7))
      /* if(mes == 0){
        this.search = JSON.parse(localStorage.getItem('leads-user')).filtro.substring(0,5)
      }else{
        this.search = JSON.parse(localStorage.getItem('leads-user')).filtro
      }  */
    }catch (error){
      console.log('Hubo un error')
    }
  },
  
  //MÉTODOS
  methods: {
    ...mapActions(['getHotels', 'getAllLeads', 'stateToken']),
    /* getLeads(){
      this.desserts = this.AllLeads
    }, */
    test(){
      console.log('ESTA SELECCIONANDO')
    },
    /* getNameSegments(segmentos){ 
      let todosegmento = JSON.parse(localStorage.getItem('segmentos'))
        for (let i = 0; i < todosegmento.length; i++) {
        this.segments.push(todosegmento[i].name);
      }
    },
    getNameHotels(hoteles) {
      let todohotels = JSON.parse(localStorage.getItem('hoteles'))
      for (let i = 0; i < todohotels.length; i++) {
        this.hotels.push(todohotels[i].shortName);
      }
    },

    getNameAccounts(accounts) {
      let todoaccounts = JSON.parse(localStorage.getItem('accounts'))
      let {groupSegment} = JSON.parse(localStorage.getItem('usuario'))
      for (let i = 0; i < todoaccounts.length; i++) {
        this.leadsAccounts.push(todoaccounts[i].name);
      }
    },
    */
    cambiaRazones(){
      let reasons = this.todoRazones
      let razon = parseInt(this.editedItem.statusid)
      this.razones = []
      this.razon = razon
      this.editedItem.razon = ''
      for(let i=0; i< reasons.length; i++){
          if(reasons[i].status == 'Cancelado'){ 
            this.razones2.push(reasons[i].reason)
          }
        }
        for(let i=0; i<reasons.length; i++){
          if(reasons[i].status == 'Congelado'){ 
            this.razones.push(reasons[i].reason)
          }
        }
    }, 

    /* Get Leads */
    async getUserLeads(){
      const {user_id} = JSON.parse(localStorage.getItem('leads-user')).datos
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      await axios.get(this.linkServer+'/user/'+user_id+'/leads', config)
      .then((res) => {
        let role = JSON.parse(localStorage.getItem('usuario')).role
        this.role = role
        let hotel = JSON.parse(localStorage.getItem('leads-user')).hotel
        let status = JSON.parse(localStorage.getItem('leads-user')).status
        localStorage.setItem('leads', JSON.stringify(res.data))
        this.$store.commit('AllLeads', res.data)
        this.desserts = []
        let leads = []
        if(role == 'Ejecutivo'){
            if(hotel == '[Seleccionar todos]'){
                for(let i=0; i<res.data.length; i++){
                    if((res.data[i].noAttend == true) && (status == res.data[i].status)){
                        leads.push(res.data[i])   
                    }  
                }
            }else{
                for(let i=0; i<res.data.length; i++){
                    if((hotel == res.data[i].hotel) && (res.data[i].noAttend == true) && (status == res.data[i].status)){
                        leads.push(res.data[i])
                    }
                }
            }
        }else{
          let fechaFiltro = JSON.parse(localStorage.getItem('leads-user')).filtro
          //Gerente
          if(status == undefined){
           
            for(let i=0; i<res.data.length; i++){  
                    leads.push(res.data[i])
            }
           /*  if(hotel == '[Seleccionar todos]'){
                for(let i=0; i<res.data.length; i++){  
                  if(res.data[i].createDate.indexOf(fechaFiltro)>=0){
                    leads.push(res.data[i])
                  }  
                }
            }else{
                for(let i=0; i<res.data.length; i++){
                    if(hotel == res.data[i].hotel && res.data[i].createDate.indexOf(fechaFiltro)>=0){
                        leads.push(res.data[i])
                    }
                }
            } */
          }else{
            let status = JSON.parse(localStorage.getItem('leads-user')).status
            
            if(hotel == '[Seleccionar todos]'){
                for(let i=0; i<res.data.length; i++){
                    if((res.data[i].noAttend == true) && (status == res.data[i].status) && (res.data[i].createDate.indexOf(fechaFiltro)>=0)){
                        leads.push(res.data[i])   
                    }  
                }
            }else{
                for(let i=0; i<res.data.length; i++){
                    if((hotel == res.data[i].hotel) && (res.data[i].noAttend == true) && (status == res.data[i].status) && (res.data[i].createDate.indexOf(fechaFiltro)>=0)){
                        leads.push(res.data[i])
                    }
                }
            }
          }
          localStorage.setItem('leads', JSON.stringify(leads))
        }
        this.calculaTotal(leads)
      }).catch(error =>{
        console.log(error)
      })
    },

     //EDITAR Lead de eventos
   /*  async editEventLead(){
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var rateevent =[]
      var events =[]
      rateevent.push(this.rateEvent1, this.rateEvent2,this.rateEvent3)
      for(let i = 0; i < this.editedItem.eventsName.length; i++){
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
      }
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "initialBooking": this.date1,
        "finalBooking": this.date2,
        "account": this.editedItem.account,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "status": this.allstatus[this.editedItem.statusid],
        "events": events,
        "reason": this.editedItem.razon
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = this.linkServer+'/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal(response.data)
        this.alerts('Se guardó correctamente', 'success')
        this.$store.dispatch('getDashboard')
      }).catch(error => {
        this.alerts('Ocurrio un error y no se guardó', 'error')
        console.log('Hubo un error ', error)
      })
    }, */
    //Editar otro tipo de Lead 
   /*  async editOtherLead(){
      var rateevent =[]
      var events =[]
      if(this.editedItem.eventsName != undefined){
        rateevent.push(this.rateEvent1, this.rateEvent2,this.rateEvent3)
        for(let i = 0; i < this.editedItem.eventsName.length; i++){
         var obj = {name: this.editedItem.eventsName[i], rateEvent: parseInt(rateevent[i])}
         events.push(obj)
        }
      }
      var fec1= this.date1
      var fec2= this.date2
      var f1= ''
      var f2= ''
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      this.date1 = f1
      this.date2 = f2
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      var noches = (diff/(1000*60*60*24))
      this.editedItem.initialdate=this.date1
      this.editedItem.finaldate=this.date2
      var datos={
        "leadid": parseInt(this.editedItem.leadid),
        "name": this.editedItem.name,
        "initialBooking": this.editedItem.initialdate,
        "finalBooking": this.editedItem.finaldate,
        "rateHotel": parseInt(this.rateHotel),
        "rooms": parseInt(this.rooms),
        "account": this.editedItem.account,
        "nights": noches,
        "segment": this.editedItem.segment,
        "hotel": this.editedItem.hotel,
        "contactName": this.editedItem.contactName,
        "contactPhone": parseInt(this.editedItem.contactPhone),
        "contactEmail": this.editedItem.contactEmail,
        "status": this.allstatus[this.editedItem.statusid],
        "events": events,
        "reason": this.editedItem.razon
      }
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }  
      }
      let url = this.linkServer+'/user/leads'
      await axios.put(url, datos, config)
      .then(response => { 
        localStorage.setItem('leads', JSON.stringify(response.data))
        this.$store.commit('AllLeads', response.data)
        this.desserts = []
        this.calculaTotal(response.data)
        this.alerts('Se guardó correctamente', 'success')
        this.$store.dispatch('getDashboard')
      }).catch(error => {
        this.alerts('Ocurrio un error y no se guardó', 'error')
        console.log('Hubo un error ', error)
      })
    }, */
    

    async getRazones() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
      await axios.get(this.linkServer+'/lead/reason', config)
      .then(response =>{
        this.razones = []
        this.razones2=[]
        for(let i=0; i< response.data.length; i++){
          if(response.data[i].status == 'Cancelado'){ 
            this.razones2.push(response.data[i].reason)
          }
        }
        for(let i=0; i<response.data.length; i++){
          if(response.data[i].status == 'Congelado'){ 
            this.razones.push(response.data[i].reason)
            
          }
        }
        this.todoRazones = response.data
      }).catch(error =>{
        console.log(error)
      }); 
    },

    //MODALS
    editItem(item) {
      this.FiltraDatos()
      this.editedIndex=-1
      this.editedIndex = this.desserts.indexOf(item);
      this.dialog = true;
      if(item.status == 'Congelado'){
        this.editedItem.statusid = 4
        this.razon = 4
        this.cambiaRazones()
      }else if(item.status == 'Cancelado'){
        this.editedItem.statusid = 5
        this.razon = 5
        this.cambiaRazones()
      }else{
        this.razon = 0
      }
        if(this.editedIndex>=0){
          this.editedItem = Object.assign({}, item);
          this.SeparaMesyRate(item)
          this.EditMesyEvents()
          this.editedItem.razon = item.reason 
        }else{
        }
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
      this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);

    },
    atender(){
      if (this.editedIndex > -1) {
        let datos = JSON.parse(localStorage.getItem('leads-user'))
        datos.search = this.editedItem.createDate
        localStorage.setItem('leads-user', JSON.stringify(datos))
        window.location.href = '/register-lead'
      } 
      this.close();
    },

    
    

    /* EDICIONES LEADS */
    
    cantTfield(){
      try {
        if(this.editedItem.eventsName.length!=null || this.editedItem.eventsName.length>=0){
        this.name1 =this.editedItem.eventsName[0]
        this.name2 =this.editedItem.eventsName[1]
        this.name3 =this.editedItem.eventsName[2]
        return
        }
        this.name1 = ''
        this.name2 = ''
        this.name3 = ''
      } catch (error) {
        
      }
    },
    limpiarfilas(){
      this.rateEvent1 = 0
      this.rateEvent2 = 0
      this.rateEvent3 = 0
      this.editedItem.eventsName = []
      this.name1 = ''
      this.name2 = ''
      this.name3 = ''
    },
    FiltraDatos(){
      let groupSegment = JSON.parse(localStorage.getItem('usuario')).groupSegment
       /* if(groupSegment === 'Eventos'){
          console.log('si', groupSegment)
       } */
       if(this.editedItem.segment=='Eventos'){
        this.sevent = 'si'
        this.rateHotel = 0
        this.editedItem.rateHotel = 0
        this.romms = 0
        this.editedItem.rooms = 0
        this.nights = 0
        this.editedItem.nights = 0
      }else if(this.editedItem.segment=='Series'){
        this.lenghtMonth= 0

        this.tarifa1= 0;
        this.tarifa2= 0;
        this.tarifa3= 0;
        this.tarifa4= 0;
        this.tarifa5= 0;
        this.tarifa6= 0;
        this.tarifa7= 0;
        this.tarifa8= 0;
        this.tarifa9= 0;
        this.tarifa10 = 0;
        this.tarifa11= 0;
        this.tarifa12= 0;

        this.habitaciones1= 0;
        this.habitaciones2= 0;
        this.habitaciones3= 0;
        this.habitaciones4= 0;
        this.habitaciones5= 0;
        this.habitaciones6= 0;
        this.habitaciones7= 0;
        this.habitaciones8= 0;
        this.habitaciones9= 0;
        this.habitaciones10= 0;
        this.habitaciones11= 0;
        this.habitaciones12= 0;

        this.noches1= 0;
        this.noches2= 0;
        this.noches3= 0;
        this.noches4= 0;
        this.noches5= 0;
        this.noches6= 0;
        this.noches7= 0;
        this.noches8= 0;
        this.noches9= 0;
        this.noches10= 0;
        this.noches11= 0;
        this.noches12= 0;

        this.totalmes1= 0;
        this.totalmes2= 0;
        this.totalmes3= 0;
        this.totalmes4= 0;
        this.totalmes5= 0;
        this.totalmes6= 0;
        this.totalmes7= 0;
        this.totalmes8= 0;
        this.totalmes9= 0;
        this.totalmes10= 0;
        this.totalmes11= 0;
        this.totalmes12= 0;

        this.estado1= false;
        this.estado2= false;
        this.estado3= false;
        this.estado4= false;
        this.estado5= false;
        this.estado6= false;
        this.estado7= false;
        this.estado8= false;
        this.estado9= false;
        this.estado10= false;
        this.estado11= false;
        this.estado12= false;

        this.rateEvent1 = 0
        this.rateEvent2 = 0
        this.rateEvent3 = 0
        this.editedItem.eventsName = []
      }else if(this.editedItem.segment == ''){
        this.lenghtMonth= 0
        this.tarifa1= 0;
        this.tarifa2= 0;
        this.tarifa3= 0;
        this.tarifa4= 0;
        this.tarifa5= 0;
        this.tarifa6= 0;
        this.tarifa7= 0;
        this.tarifa8= 0;
        this.tarifa9= 0;
        this.tarifa10 = 0;
        this.tarifa11= 0;
        this.tarifa12= 0;

        this.habitaciones1= 0;
        this.habitaciones2= 0;
        this.habitaciones3= 0;
        this.habitaciones4= 0;
        this.habitaciones5= 0;
        this.habitaciones6= 0;
        this.habitaciones7= 0;
        this.habitaciones8= 0;
        this.habitaciones9= 0;
        this.habitaciones10= 0;
        this.habitaciones11= 0;
        this.habitaciones12= 0;

        this.noches1= 0;
        this.noches2= 0;
        this.noches3= 0;
        this.noches4= 0;
        this.noches5= 0;
        this.noches6= 0;
        this.noches7= 0;
        this.noches8= 0;
        this.noches9= 0;
        this.noches10= 0;
        this.noches11= 0;
        this.noches12= 0;

        this.totalmes1= 0;
        this.totalmes2= 0;
        this.totalmes3= 0;
        this.totalmes4= 0;
        this.totalmes5= 0;
        this.totalmes6= 0;
        this.totalmes7= 0;
        this.totalmes8= 0;
        this.totalmes9= 0;
        this.totalmes10= 0;
        this.totalmes11= 0;
        this.totalmes12= 0;

        this.estado1= false;
        this.estado2= false;
        this.estado3= false;
        this.estado4= false;
        this.estado5= false;
        this.estado6= false;
        this.estado7= false;
        this.estado8= false;
        this.estado9= false;
        this.estado10= false;
        this.estado11= false;
        this.estado12= false;

        this.sevent ='si'
        this.editedItem.eventsName = []
        this.rateHotel = 0
        this.rooms = 0
        this.editedItem.rooms = 0
        this.nights =0
        this.rateEvent1 = 0
        this.rateEvent2 = 0
        this.rateEvent3 = 0
        this.nights=1
        this.name1 = ''
        this.name2 = ''
        this.name3 = ''
      }else{
        this.nights=1
      }
      /* this.fechaActual() */
    },
    EditMesyEvents(){
      try {
      var events =this.editedItem.events
      var nombres = []
      var costos = []
      var status = this.editedItem.status
      for(var i = 0; i< this.allstatus.length; i++){
        if(this.allstatus[i]==status){
          this.editedItem.statusid=i
        }
      }
      var dias=0;
      if(this.editedItem.initialBooking!=null && this.editedItem.finalBooking!=null){
      var fec1= this.editedItem.initialBooking
      var fec2= this.editedItem.finalBooking
      var f1= ''
      var f2= ''  
      for(var i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      var fechaInicio = new Date(f1).getTime();
      var fechaFin    =new Date(f2).getTime ();
      var diff = fechaFin - fechaInicio;
      dias = diff/(1000*60*60*24)
      this.date1 = f1
      this.date2 = f2
      }
      if(dias>1){
         this.nights = dias
      }else{
        this.nights=1
      }
      if(events.length>0){
      this.sevent='si'  
      for(var i=0; i<events.length; i++){
        nombres.push(events[i].name)
        if(events[i].name == 'Alimentos y bebidas'){
          this.rateEvent1 =events[i].rateEvent
        }else if(events[i].name == 'Equipos'){
          this.rateEvent2 =events[i].rateEvent
        }else if(events[i].name == 'Salas'){
          this.rateEvent3 =events[i].rateEvent
        }
      }
      this.name1 = nombres[0]
      this.name2 = nombres[1]
      this.name3 = nombres[2]
      this.editedItem.eventsName=nombres
      if(this.rateEvent1==null){this.rateEvent1=0}
      if(this.rateEvent2==null){this.rateEvent2=0}
      if(this.rateEvent3==null){this.rateEvent3=0}
      if(this.editedItem.rateHotel!=null){this.rateHotel = this.editedItem.rateHotel} 
      if(this.editedItem.rooms!=null){this.rooms = this.editedItem.rooms} 
      if(this.editedItem.nights!=null){this.nights = this.editedItem.nights} 
      }else{
        this.sevent='no'
        if(this.editedItem.rateHotel!=null){this.rateHotel = this.editedItem.rateHotel} 
        if(this.editedItem.rooms!=null){this.rooms = this.editedItem.rooms} 
        if(this.editedItem.nights!=null){this.nights = this.editedItem.nights} 
      }
      /* if(this.editedItem.months.length>0){
        var meses=["Enero","Febrero"]
        for(var i=0; i< meses.length; i++){

        }
      } */
      } catch (error) {  
      }

    },
    roomrevenue: function (){
      try {
      let fec1= this.date1
      let fec2= this.date2
      let f1= ''
      let f2= ''
      for(let i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      let fechaInicio = new Date(f1).getTime();
      let fechaFin    =new Date(f2).getTime ();
      let diff = fechaFin - fechaInicio; 
      let dias = (diff/(1000*60*60*24))
      if(this.editedItem.segment=='Series'){
        let mes1 = 0, mes2=0, mes3=0, mes4=0, mes5=0, mes6=0, mes7=0, mes8=0, mes9=0, mes10=0, mes11=0, mes12=0
        if(this.estado1 == true){
          mes1 = this.tarifa1 * this.habitaciones1 * this.noches1
        }
        if(this.estado2 == true){
          mes2 = this.tarifa2 * this.habitaciones2 * this.noches2
        } 
        if(this.estado3 == true){
          mes3 = this.tarifa3 * this.habitaciones3 * this.noches3
        } 
        if(this.estado4 == true){
          mes4 = this.tarifa4 * this.habitaciones4 * this.noches4
        } 
        if(this.estado5 == true){
          mes5 = this.tarifa5 * this.habitaciones5 * this.noches5
        } 
        if(this.estado6 == true){
          mes6 = this.tarifa6 * this.habitaciones6 * this.noches6
        } 
        if(this.estado7 == true){
          mes7 = this.tarifa7 * this.habitaciones7 * this.noches7
        } 
        if(this.estado8 == true){
          mes8 = this.tarifa8 * this.habitaciones8 * this.noches8
        } 
        if(this.estado9 == true){
          mes9 = this.tarifa9 * this.habitaciones9 * this.noches9
        } 
        if(this.estado10 == true){
          mes10 = this.tarifa10 * this.habitaciones10 * this.noches10
        } 
        if(this.estado11 == true){
          mes11 = this.tarifa11 * this.habitaciones11 * this.noches11
        } 
        if(this.estado12 == true){
          mes12 = this.tarifa12 * this.habitaciones12 * this.noches12
        }
        let revenue = ((parseInt(this.rooms)) *(parseInt(this.rateHotel)) *(parseInt(this.nights))) + 
        mes1 + mes2 + mes3 + mes4 + mes5 + mes6 + mes7 + mes8 + mes9 + mes10 + mes11 + mes12
        this.room_revenue = revenue
        return this.separaNumeros(revenue)
      }else {
        let revenue = (parseInt(this.rooms)) * (parseInt(this.rateHotel)) * dias
        this.room_revenue = revenue
        return this.separaNumeros(revenue)
      }
      } catch (error) {      
      }
    },
    eventrevenue: function (){
      try {
      let fec1= this.date1
      let fec2= this.date2
      let f1= ''
      let f2= ''
      for(let i=0; i<10; i++){
        f1+= fec1.charAt(i) 
        f2+= fec2.charAt(i) 
      }
      let fechaInicio = new Date(f1).getTime();
      let fechaFin    =new Date(f2).getTime ();
      let diff = fechaFin - fechaInicio;
      let dias = diff/(1000*60*60*24)
      if(dias<=0){
        dias=1
      }
      let event = ((parseInt(this.rateEvent1) + parseInt(this.rateEvent2)+ parseInt(this.rateEvent3)) /* *parseInt(dias) */ )
      this.event_revenue = event
      return this.separaNumeros(event)
      } catch (error) {}
    },
    grantotal: function(){ 
      return this.separaNumeros(this.room_revenue + this.event_revenue)
    },
    monthsLenght(){
      this.total_months = []

      this.estado1 = false
      this.estado2 = false
      this.estado3 = false
      this.estado4 = false
      this.estado5 = false
      this.estado6 = false
      this.estado7 = false
      this.estado8 = false
      this.estado9 = false
      this.estado10 = false
      this.estado1 = false
      this.estado12 = false

      for(let i =0; i< this.editedItem.month.length; i++){
        this.total_months.push({
          name: `${this.editedItem.month[i]}` ,
          rateHotel: 0,
          rooms: 0,
          nights: 0,
      })
      }
      for(let i=0; i< this.total_months.length; i++){
        if(this.total_months[i].name == 'Enero'){this.estado1 = true}
        else if(this.total_months[i].name== 'Febrero'){this.estado2 = true}
        else if(this.total_months[i].name== 'Marzo'){this.estado3 = true}
        else if(this.total_months[i].name== 'Abril'){this.estado4 = true}
        else if(this.total_months[i].name== 'Mayo'){this.estado5 = true}
        else if(this.total_months[i].name== 'Junio'){this.estado6 = true}
        else if(this.total_months[i].name== 'Julio'){this.estado7 = true}
        else if(this.total_months[i].name== 'Agosto'){this.estado8 = true}
        else if(this.total_months[i].name== 'Septiembre'){this.estado9 = true}
        else if(this.total_months[i].name== 'Octubre'){this.estado10 = true}
        else if(this.total_months[i].name== 'Noviembre'){this.estado11 = true}
        else if(this.total_months[i].name== 'Diciembre'){this.estado12 = true} 
      }
    },
    WatchLenght: function(){
      try {
      this.monthsLenght()
      for(let i=0; i< this.total_months.length; i++){
        if(this.total_months[i].name == 'Enero'){
          this.total_months[i].rateHotel = parseInt(this.tarifa1)
          this.total_months[i].rooms = parseInt(this.habitaciones1)
          this.total_months[i].nights = parseInt(this.noches1)
        }else if(this.total_months[i].name == 'Febrero'){
          this.total_months[i].rateHotel = parseInt(this.tarifa2)
          this.total_months[i].rooms = parseInt(this.habitaciones2)
          this.total_months[i].nights = parseInt(this.noches2)
        }else if(this.total_months[i].name == 'Marzo'){
          this.total_months[i].rateHotel = parseInt(this.tarifa3)
          this.total_months[i].rooms = parseInt(this.habitaciones3)
          this.total_months[i].nights = parseInt(this.noches3)
        }else if(this.total_months[i].name == 'Abril'){
          this.total_months[i].rateHotel = parseInt(this.tarifa4)
          this.total_months[i].rooms = parseInt(this.habitaciones4)
          this.total_months[i].nights = parseInt(this.noches4)
        }else if(this.total_months[i].name == 'Mayo'){
          this.total_months[i].rateHotel = parseInt(this.tarifa5)
          this.total_months[i].rooms = parseInt(this.habitaciones5)
          this.total_months[i].nights = parseInt(this.noches5)
        }else if(this.total_months[i].name == 'Junio'){
          this.total_months[i].rateHotel = parseInt(this.tarifa6)
          this.total_months[i].rooms = parseInt(this.habitaciones6)
          this.total_months[i].nights = parseInt(this.noches6)
        }else if(this.total_months[i].name == 'Julio'){
          this.total_months[i].rateHotel = parseInt(this.tarifa7)
          this.total_months[i].rooms = parseInt(this.habitaciones7)
          this.total_months[i].nights = parseInt(this.noches7)
        }else if(this.total_months[i].name == 'Agosto'){
          this.total_months[i].rateHotel = parseInt(this.tarifa8)
          this.total_months[i].rooms = parseInt(this.habitaciones8)
          this.total_months[i].nights = parseInt(this.noches8)
        }else if(this.total_months[i].name == 'Septiembre'){
          this.total_months[i].rateHotel = parseInt(this.tarifa9)
          this.total_months[i].rooms = parseInt(this.habitaciones9)
          this.total_months[i].nights = parseInt(this.noches9)
        }else if(this.total_months[i].name == 'Octubre'){
          this.total_months[i].rateHotel = parseInt(this.tarifa10)
          this.total_months[i].rooms = parseInt(this.habitaciones10)
          this.total_months[i].nights = parseInt(this.noches10)
        }else if(this.total_months[i].name == 'Noviembre'){
          this.total_months[i].rateHotel = parseInt(this.tarifa11)
          this.total_months[i].rooms = parseInt(this.habitaciones11)
          this.total_months[i].nights = parseInt(this.noches11)
        }else if(this.total_months[i].name == 'Diciembre'){
          this.total_months[i].rateHotel = parseInt(this.tarifa12)
          this.total_months[i].rooms = parseInt(this.habitaciones12)
          this.total_months[i].nights = parseInt(this.noches12)
        }
      }
      return this.total_months
      } catch (error) {
        
      }
    },

    SeparaMesyRate(item){
      this.lenghtMonth = item.months.length
      this.editedItem.month = []
      for(let i=0; i<item.months.length; i++){
        this.editedItem.month.push(item.months[i].name)
        if(item.months[i].name == 'Enero'){
          this.tarifa1 = item.months[i].rateHotel
          this.habitaciones1 = item.months[i].rooms
          this.noches1 = item.months[i].nights
          this.estado1 = true
          this.totalmes1 = parseInt(item.months[i].rateHotel) * parseInt(item.months[i].rooms) * parseInt(item.months[i].nights)  
        }
        else if(item.months[i].name == 'Febrero'){
          this.tarifa2 = item.months[i].rateHotel
          this.habitaciones2 = item.months[i].rooms
          this.noches2 = item.months[i].nights
          this.estado2 = true
        }
        else if(item.months[i].name == 'Marzo'){
          this.tarifa3 = item.months[i].rateHotel
          this.habitaciones3 = item.months[i].rooms
          this.noches3 = item.months[i].nights
          this.estado3 = true
        } 
        else if(item.months[i].name == 'Abril'){
          this.tarifa4 = item.months[i].rateHotel
          this.habitaciones4 = item.months[i].rooms
          this.noches4 = item.months[i].nights
          this.estado4 = true
        } 
        else if(item.months[i].name == 'Mayo'){
          this.tarifa5 = item.months[i].rateHotel
          this.habitaciones5 = item.months[i].rooms
          this.noches5 = item.months[i].nights
          this.estado5 = true
        } 
        else if(item.months[i].name == 'Junio'){
          this.tarifa6 = item.months[i].rateHotel
          this.habitaciones6 = item.months[i].rooms
          this.noches6 = item.months[i].nights
          this.estado6 = true
        } 
        else if(item.months[i].name == 'Julio'){
          this.tarifa7 = item.months[i].rateHotel
          this.habitaciones7 = item.months[i].rooms
          this.noches7 = item.months[i].nights
          this.estado7 = true
        } 
        else if(item.months[i].name == 'Agosto'){
          this.tarifa8 = item.months[i].rateHotel
          this.habitaciones8 = item.months[i].rooms
          this.noches8 = item.months[i].nights
          this.estado8 = true
        } 
        else if(item.months[i].name == 'Septiembre'){
          this.tarifa9 = item.months[i].rateHotel
          this.habitaciones9 = item.months[i].rooms
          this.noches9 = item.months[i].nights
          this.estado9 = true
        } 
        else if(item.months[i].name == 'Octubre'){
          this.tarifa10 = item.months[i].rateHotel
          this.habitaciones10 = item.months[i].rooms
          this.noches10 = item.months[i].nights
          this.estado10 = true
        } 
        else if(item.months[i].name == 'Noviembre'){
          this.tarifa11 = item.months[i].rateHotel
          this.habitaciones11 = item.months[i].rooms
          this.noches11 = item.months[i].nights
          this.estado11 = true
        } 
        else if(item.months[i].name == 'Diciembre'){
          this.tarifa12 = item.months[i].rateHotel
          this.habitaciones12 = item.months[i].rooms
          this.noches12 = item.months[i].nights
          this.estado12 = true
        }
      }
    },
    calculaTotal(todoleads){
      try {
     /*  var todoleads = JSON.parse(localStorage.getItem('leads')) */
        for(let i=0; i<todoleads.length; i++){
          let totale = 0
          let totalh = 0 
          let totalmonths = 0
          let formatfecha = ''

           if(todoleads[i].events.length>0){
            for(let j=0; j<todoleads[i].events.length; j++){
              totale += todoleads[i].events[j].rateEvent
            }
           }
           if(todoleads[i].months.length>0 || todoleads[i].months.length!=null){
             for(let h=0; h<todoleads[i].months.length; h++){
                totalmonths += todoleads[i].months[h].rateHotel * todoleads[i].months[h].nights * todoleads[i].months[h].rooms
              }
           }
           for(let h=0; h<19; h++){
             let letra = todoleads[i].createDate.charAt(h)
             if(letra==='T'){
               formatfecha+=' '
             }else{
               formatfecha+=letra
             } 
           }
           totalh = todoleads[i].rateHotel * todoleads[i].rooms *  (todoleads[i].nights) + totalmonths
           this.desserts.push(
             {
              account: todoleads[i].account,
              contactEmail: todoleads[i].contactEmail,
              contactName: todoleads[i].contactName,
              contactPhone: todoleads[i].contactPhone,
              createDate: formatfecha,
              finalBooking: todoleads[i].finalBooking,
              hotel: todoleads[i].hotel,
              initialBooking: todoleads[i].initialBooking,
              leadid: todoleads[i].leadid,
              months: todoleads[i].months,
              name: todoleads[i].name,
              nights: todoleads[i].nights,
              rateHotel: todoleads[i].rateHotel,
              rooms: todoleads[i].rooms,
              reason: todoleads[i].reason,
              segment: todoleads[i].segment,
              status: todoleads[i].status,
              user: todoleads[i].user,
              events: todoleads[i].events,
              totalevents: this.separaNumeros(totale),
              totalhotel: this.separaNumeros(totalh),
              totalgeneral: this.separaNumeros(parseInt(totale)+parseInt(totalh))
             })
        }
        } catch (error) {
          console.log('Hubo un error')
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
    /* fechaActual(){
      let fecha = new Date()
      if((fecha.getMonth()+1)<10){
        if(fecha.getDate()<10){
           this.date = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
           this.date2 = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
           return  this.date1 = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
        }else{
          this.date = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-"+fecha.getDate()
          this.date2 = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-"+fecha.getDate()
          return  this.date1 = fecha.getFullYear()+"-0"+(fecha.getMonth()+1)+"-"+fecha.getDate()
        }
      }else{
        if(fecha.getDate()<10){
           this.date = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
           this.date2 = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
           return  this.date1 = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-0"+fecha.getDate()
        }else{
          this.date = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
          this.dat2 = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
          return  this.date1 = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
        }
      }
    }, */
    alerts(msj, type){
        const msje = msj
            if(type == 'success'){
              toastr.success(msje, {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
            })
            }else{
              toastr.error(msje, {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
            })
            }
    },
    verificaPermisos(){
      this.role = JSON.parse(localStorage.getItem('usuario')).role
    },
    regresa(){
        let {role} = JSON.parse(localStorage.getItem('usuario')) 
        if(role == 'Administrador' || role == 'Gerente de ventas'){
            window.location.href = '/dashboard_gerentes/dashboard-user/id'
        }else if(role == 'Supervisor de Segmento'){
            window.location.href = '/dashboard_jefes/dashboard-user/id'
        }else{
           window.location.href = '/dashboard-ejecutivos'
        }

    },
    ConvertirMesesAFecha(meses, createDate, filtro_i, filtro_f){
      let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre']
      let arrayFechas=[]
      let fechaCreacion = createDate.substring(0, 7).replace('-', '')+'01'
      let year = parseInt(fechaCreacion.substring(0,4))
      try {
        for(let i=0; i<meses.length; i++){
          let fechaaInsertar = ''
          if(meses[i].name===months[0]){fechaaInsertar = year+'-'+'01'+'-'+'31'}
          else if(meses[i].name===months[1]){fechaaInsertar = year+'-'+'02'+'-'+'29'}
          else if(meses[i].name===months[2]){fechaaInsertar = year+'-'+'03'+'-'+'31'}
          else if(meses[i].name===months[3]){fechaaInsertar = year+'-'+'04'+'-'+'30'}
          else if(meses[i].name===months[4]){fechaaInsertar = year+'-'+'05'+'-'+'31'}
          else if(meses[i].name===months[5]){fechaaInsertar = year+'-'+'06'+'-'+'30'}
          else if(meses[i].name===months[6]){fechaaInsertar = year+'-'+'07'+'-'+'31'}
          else if(meses[i].name===months[7]){fechaaInsertar = year+'-'+'08'+'-'+'31'}
          else if(meses[i].name===months[8]){fechaaInsertar = year+'-'+'09'+'-'+'30'}
          else if(meses[i].name===months[9]){fechaaInsertar = year+'-'+'10'+'-'+'31'}
          else if(meses[i].name===months[10]){fechaaInsertar = year+'-'+'11'+'-'+'30'}
          else if(meses[i].name===months[11]){fechaaInsertar = year+'-'+'12'+'-'+'31'}

          if(parseInt(fechaaInsertar.replace('-', '').replace('-', '')) <= parseInt(fechaCreacion)){
            let semicad = fechaaInsertar.substring(4,10)
            fechaaInsertar = (year+1) + semicad
          }
          arrayFechas.push(fechaaInsertar)

        }
        let mayor = 0
        let menor = 0
        let indexmayor=0
        let indexmenor=0
        for(let i=0; i<arrayFechas.length; i++){
          let fecha = parseInt(arrayFechas[i].replace('-', '').replace('-', ''))
          if(fecha > mayor){
            mayor = fecha
            indexmayor = i
          }
          if(fecha < menor){
            menor = fecha
            indexmenor = i
          }
        }
 /*        console.log('mayor', indexmayor, arrayFechas[indexmayor])
        console.log('menor', indexmenor, arrayFechas[indexmenor])  */

        let fechai= arrayFechas[indexmenor].replace('-', '').replace('-', '')
        let fechaf= arrayFechas[indexmayor].replace('-', '').replace('-', '')

        if(fechai>=filtro_i && fechaf<=filtro_f){
          return true
        }else{
          return false
        }
      } catch (error) {
        console.log(error)
      }
    },
    FiltraPorFecha(){
      try {
        /* this.search = JSON.parse(localStorage.getItem('leads-user')).filtro */
        let fecha_i = parseInt(this.date_filtro1.replace('-', '').replace('-', ''))
        let fecha_f = parseInt(this.date_filtro2.replace('-', '').replace('-', ''))
        if(fecha_i>0 && fecha_f>0){
          let array = []
          this.desserts=[]
          let leads = JSON.parse(localStorage.getItem('leads'))
          for(let i=0; i<leads.length; i++){
            if(leads[i].initialBooking!=null && leads[i].finalBooking!=null){
              let initialBooking = parseInt((leads[i].initialBooking.substring(0,10)).replace('-', '').replace('-', ''))
              let finalBooking = parseInt((leads[i].finalBooking.substring(0,10)).replace('-', '').replace('-', ''))
              if((initialBooking>=fecha_i && finalBooking<=fecha_f)){
                array.push(leads[i])
              }
            }else{
              let condition = this.ConvertirMesesAFecha(leads[i].months, leads[i].createDate, fecha_i, fecha_f)
              if(condition){
                array.push(leads[i])
              }
            }
          }
          this.calculaTotal(array)
        }
        
      } catch (error) {
        console.log(error)
      }
    },
    async ExportarLeads(){
      this.loading=true
      let datos = []
      for(let i=0; i<this.desserts.length; i++){
        datos.push(this.desserts[i].leadid)
      }
      let config = {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          },
          responseType: "blob"  
      }
      let url = this.linkServer+'/user/leads/export'
      await axios.post(url, datos, config)
      .then(response => { 
        console.log(response) 
        let blob = new Blob([response.data],
        {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"});
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'leads.xlsx');
        /* link.download = 'visits.xlsx'; */
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.alerts('Se exportó correctamente', 'success')
        this.close()
        this.loading=false
      }).catch(error => {
      console.log('Hubo un error ', error)
      this.alerts('Ocurrio un error y no se logró exportar', 'error')
      this.close()
      this.loading=false
      }) 
    }
 
  },


}
</script>