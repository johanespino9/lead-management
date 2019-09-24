<template>
        <v-data-table
              :headers="headers"
              :items="desserts"
              sort-by="phone"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Gestión de Cuentas</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-text-field color="#ff4200" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                   <v-spacer></v-spacer>
                  <div class="flex-grow-1"></div>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="#ff4200" dark class="mb-2" v-on="on">Añadir Nueva Cuenta</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field color="#ff4200" v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field color="#ff4200" v-model="editedItem.phone" v-mask="mask" label="Teléfono"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                              <v-combobox color="#ff4200" v-model="select" :items="editedItem.branch" label="Seleccionar Sector"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                               <v-combobox color="#ff4200" v-model="select" :items="editedItem.category" label="Seleccionar Categoría"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                             <v-combobox color="#ff4200" v-model="select" :items="editedItem.groupsegment" label="Grupo Segmento"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                             <v-combobox color="#ff4200" v-model="select" :items="editedItem.segment" label="Seleccionar Segmento"></v-combobox>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="#ff4200" text @click="close">Cancel</v-btn>
                        <v-btn color="#ff4200" text @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.action="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  delete
                </v-icon>
              </template>
              <!-- <template v-slot:no-data>
                <v-btn color="primary" @click="allItems()">Reset</v-btn>
              </template> -->
    </v-data-table>
</template>
<script>
import { mask } from 'vue-the-mask';
import {mapState, mapActions} from 'vuex'
  export default {
    directives: {
      mask,
    },
    data: () => ({
    dialog: false,
    select: '',
      headers: [
        {
          text: 'Nombre de Cuenta',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Sector', value: 'branch.name' },
        { text: 'Categoría', value: 'category.name' },
        { text: 'Grupo Segmento', value: 'groupSegment.name' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      search: "",
      desserts: [],
      mask: '####-####-####-####',
      editedIndex: -1,
      editedItem: {
        name: '',
        branch: 0,
        category: 0,
        groupsegment: 0,
      },
      defaultItem: {
        name: '',
        branch: 0,
        category: 0,
        groupsegment: 0,
      },
    }),

    computed: {
       ...mapState(['Accounts']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Cuenta' : 'Editar Nueva Cuenta'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    }, 
   created() {
     try {
       var cuentas = JSON.parse(localStorage.getItem('accounts'))
       if(this.desserts.length==0){
         this.desserts = cuentas
         this.$store.commit('Accounts', cuentas)
         console.log('Carga de Accounts completa')
       }
     } catch (error) {
       console.log('Hubo un error')
     }
   },
   mounted(){
     if(localStorage.length>=8){
        this.$store.dispatch('stateToken')
     }
   },
    methods: {
      ...mapActions(['stateToken']), 
      
      async getAccount(){
        this.desserts = this.Accounts
      },
      allItems(){
        this.getAccount();
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
  }
  }
</script>