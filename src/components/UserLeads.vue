<template>
    <div>
        <div class="">
        <!-- primer ROW -->
        <div class="row">
          <div class="col-lg-12">
            <div class="">  
              <v-card  >
                <v-card-title>
                  <v-list-item two-line>
                    <v-list-item-avatar  class="ml-0" color="grey darken-3">
                        <img src="../assets/avatar2.jpg" alt="John">
                    </v-list-item-avatar>
                    <span class="title font-weight-light" color="#FAFAFA"><strong>Leads del usuario {{usuario}}</strong> </span>
                 </v-list-item>
                </v-card-title>
                <div class="card" style="background: #F5F5F5; margin-top: 4px; margin-bottom: 2px; border-radius: 5px;">
                    <v-container class="col-md-12">
                        <v-row justify="center">
                            <!-- <v-col cols="auto">
                            <span class="title font-weight-light" color="#FAFAFA">G. Segmento: Agencias</span>
                            </v-col>
                            <v-col cols="auto">
                            <span class="title font-weight-light" color="#FAFAFA">G. Segmento: Agencias</span>
                            </v-col>
                            <v-col cols="auto" >
                            <span class="title font-weight-light" color="#FAFAFA">G. Segmento: Agencias</span>
                            </v-col> -->
                        </v-row>
                    </v-container>
                </div>
                <div class="position-relative mb-4" style="margin-top:0;">

                    
                    
                </div>
              </v-card>
            </div>
          </div>
          </div>
        </div>
         <!-- SEGUNDO ROW -->
        <div class="row">
          <div class="col-lg-6">
            <!-- PRIMER CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <span class="title font-weight-light"><strong>Prospecto</strong> </span>
                  <div class="flex-grow-1"></div>
                    <v-text-field
                        v-model="search1"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts"
                        :sort-by="['mbruto']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search1"
                    ></v-data-table>
                </template>
                </div>
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
                  <span class="title font-weight-light"><strong>Tentativo</strong> </span>
                  <div class="flex-grow-1"></div>
                  <v-text-field
                        v-model="search2"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts"
                        :sort-by="['mbruto']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search2"
                    ></v-data-table>
                </template>
                </div>
              </v-card>
            </div>
          </div>
        </div>
        <!-- TERCER ROW -->
        <div class="row">
          <div class="col-lg-6">
            <!-- PRIMER CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <span class="title font-weight-light"><strong>Hot</strong> </span>
                  <div class="flex-grow-1"></div>
                    <v-text-field
                        v-model="search3"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts"
                        :sort-by="['mbruto']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search3"
                    ></v-data-table>
                </template>
                </div>
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
                  <span class="title font-weight-light"><strong>Congelado</strong> </span>
                  <div class="flex-grow-1"></div>
                  <v-text-field
                        v-model="search4"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts"
                        :sort-by="['mbruto']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search4"
                    ></v-data-table>
                </template>
                </div>
              </v-card>
            </div>
          </div>
        </div>

        <!-- CUARTO ROW -->
        <div class="row">
          <div class="col-lg-6">
            <!-- PRIMER CARD DESDE ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA -->
            <div class="card"> 
              <v-card light >
                <v-card-title>
                  <span class="title font-weight-light"><strong>Cancelado</strong> </span>
                  <div class="flex-grow-1"></div>
                    <v-text-field
                        v-model="search5"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                  <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts"
                        :sort-by="['mbruto']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search5"
                    ></v-data-table>
                </template>
                </div>
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
                  <span class="title font-weight-light"><strong>Confirmado</strong> </span>
                  <div class="flex-grow-1"></div>
                  <v-text-field
                        v-model="search6"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <div class="position-relative mb-4" style="margin-top:0;">
                    <template>
                    <v-data-table
                        color="#000000"
                        :headers="headers"
                        :items="desserts"
                        :sort-by="['mbruto']"
                        :sort-desc="[true]"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search6"
                    ></v-data-table>
                </template>
                </div>
              </v-card>
            </div>
          </div>
        </div>

      <!--  <template>
        <v-card>
            <v-card-title>
            Leads
            <div class="flex-grow-1"></div>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            ></v-data-table>
        </v-card>
     </template>    -->  
    </div>
</template>
<script>
export default {
    data () {
      return {
        datos:{},
        usuario: '',
        search1: '',
        search2: '',
        search3: '',
        search4: '',
        search5: '',
        search6: '',
         headers: [
          { text: 'Nombre', align: 'left', sortable: true , value: 'name',},
          { text: 'Monto bruto', sortable: true, value: 'mbruto' },
          { text: 'Concretado', sortable: true, value: 'mconcretado' },
          { text: 'Diferencia', sortable: true, value: 'mconcretado' },
        ],
        desserts: [
          {
            name: 'Luis Melgarejo',
            mbruto: 70000,
            mconcretado: 14587,
          },
          {
            name: 'Diana Peréz',
            mbruto: 10000,
            mconcretado: 5245,
          },
          {
            name: 'Martin Vizcarry',
            mbruto: 65000,
            mconcretado: 25000,
          },
          {
            name: 'Salvador del Solar',
            mbruto: 40000,
            mconcretado: 1590,
          },
          {
            name: 'Chupetin ',
            mbruto: 159000,
            mconcretado: 1590,
          },
          {
            name: 'Martin ',
            mbruto: 65000,
            mconcretado: 25000,
          },
          {
            name: 'Salvador  ',
            mbruto: 40000,
            mconcretado: 1590,
          },
          {
            name: 'Chupetin trujillo',
            mbruto: 159000,
            mconcretado: 1590,
          },
        ],
      }
    },
    mounted() {
        try {
            let datos = JSON.parse(localStorage.getItem('leads-user'))
            this.datos = datos
            this.usuario = datos.datos.nombre
        } catch (error) {
            
        }
    },
  }

</script>