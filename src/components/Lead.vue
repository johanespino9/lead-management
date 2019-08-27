<template>
  <div>
      <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="800px"
  >
    

    <v-card-title><strong>{{ lead.name }} </strong> </v-card-title>
    <v-card-text>
        <v-icon color="blue">home</v-icon> 
        <span class="mt-2">{{ lead.status }}</span>
      <h3>Descripción</h3>
      <div>{{ lead.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-text>
        <v-row>
            <v-col>
                <h2>Contacto</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Nombres</h3>
                <span>{{ lead.account.contact.names }}</span>
            </v-col>
            <v-col>
                <h3>Apellidos</h3>
                <span>{{ lead.account.contact.lastNames }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Cargo</h3>
                <span>{{ lead.account.contact.jobTitle }}</span>
            </v-col>
            <v-col>
                <h3>Teléfono</h3>
                <span>{{ lead.account.contact.phoneNumber }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Email</h3>
                <span>{{ lead.account.contact.email }}</span>
            </v-col>
        </v-row>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
        <v-row>
           <v-col cols="col-2">
                <h3>Hotel</h3>
                <span>{{lead.hotelName}}</span>
           </v-col>
           <v-col>
               <h3>Número de habitaciones</h3>
            <span>{{lead.roomCuantity}}</span>
            </v-col> 
        </v-row>
        <v-row>
            <v-col cols="col-2">
                <h3>Fecha</h3>
            <v-chip>{{ lead.startDate }}</v-chip>
            -
            <v-chip>{{ lead.finalDate }}</v-chip>
            </v-col>
            <v-col>
                <h3>Costo Total</h3>
                <span>{{ lead.hotelFare}}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Tarifa del evento</h3>
            <span>{{ lead.eventFare }}</span>
            </v-col>
        </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple accent-4"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
export default {
    data() {
        return{
            lead:{
                name: 'Claro MasGamers Festival',
                description: 'Evento para desarrolladores de videojuegos y gamers',
                status: 'Prospecto',
                startDate: '09 de Agosto',
                finalDate: '09 de Setiembre',
                nightCuantity: 4,
                hotelName: 'Casa Andina Chincha Standard',
                hotelFare: 1350.0,
                roomCuantity: 2,
                eventFare: 2000,
                eventService: 'Equipos',
                account: {
                    name: 'Claro',
                    category: 'Diamante',
                    segment: 'Segmento',
                    segmentGroup: 'Grupo de Segmento',
                    sector: 'Telecomunicaciones',
                    phoneNumber: '983982293',
                    contact: {
                        names: 'Juan José',
                        lastNames: 'Peréz Gonzales',
                        jobTitle: 'Gerente de Ventas',
                        phoneNumber: '9839244298',
                        email: 'jperez@claro.com.pe'

                    }

                }
            }
        }
    }
}
</script>

<style>

</style>