<template>
    <v-container class="mt-0"> 
    <v-row>
    <v-col  cols="20" sm="2"  md="80" >
        <v-input v-model="mes" :success-messages="['rellene los campos']" success disabled>Mes de {{mes}}</v-input>
    </v-col>
    <v-col  cols="20" sm="2"  md="80"  >
        <v-text-field color="#d69c4f" label="$ Tarifa Neta"  v-mask="mask" :value="tarifa" @input="UpdateTarifa" >{{tarifa}}</v-text-field>
    </v-col>
    <v-col  cols="20" sm="2"  md="80"  >
        <v-text-field color="#d69c4f" label="Habitaciones" v-mask="mask" :value="habitaciones"  @input="UpdateHabitaciones">{{habitaciones}}</v-text-field>
    </v-col>
    <v-col  cols="20" sm="2"   md="80" >
        <v-text-field color="#d69c4f" label="Noches"  v-mask="mask"  :value="noches" @input="UpdateNoches">{{noches}}</v-text-field>
    </v-col>
    <!-- <v-col  cols="20" sm="3"  md="80" >
        <v-input v-model="totalmes1" :success-messages="[`total del mes Enero`]" success disabled>$</v-input>
    </v-col>
    <v-col  cols="20" sm="1"   md="80" ></v-col> -->
    </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import router from '../router'
import { mask } from 'vue-the-mask'
export default {
   name:'MonthInput',
   directives: {
      mask,
    },
   data: () => ({
       tarifames: 0,
       habitacionesmes: 0,
       nochesmes: 0,
       total: 0,
       mask: '################',

       obj: {
           tarifames: 0,
           habitacionesmes: 0
       }


  }),
   props: ['mes', 'tarifa', 'habitaciones', 'noches', 'totalmes'],
   
   methods: {
       UpdateTarifa(event){
            this.tarifames = event
            this.$emit('tarifa', this.tarifames);
       },
       UpdateHabitaciones(event){ 
            this.habitacionesmes = event
            this.$emit('habitaciones', this.habitacionesmes);
       },
       UpdateNoches(event){
            this.nochesmes = event
            this.$emit('noches', this.nochesmes);
       },
       sumaTotal: function(){ 
           let suma = parseInt(this.tarifames) * parseInt(this.habitacionesmes) * parseInt(this.nochesmes)
           return this.separaNumeros(suma)
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
   },

}
</script>