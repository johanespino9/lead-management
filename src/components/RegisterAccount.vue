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
                  <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                   <v-spacer></v-spacer>
                  <div class="flex-grow-1"></div>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">new account</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
          
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nombre de Cuenta"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.phone" label="Teléfono"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                              <v-combobox v-model="select" :items="branch" label="Seleccionar Sector"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                               <v-combobox v-model="select" :items="category" label="Seleccionar Categoría"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                             <v-combobox v-model="select" :items="groupsegment" label="Grupo Segmento"></v-combobox>
                            </v-col>
                            <v-col cols="auto">
                             <v-combobox v-model="select" :items="segment" label="Seleccionar Segmento"></v-combobox>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
          
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
    </v-data-table>
</template>
<script>
import axios from "axios";

  export default {
    data: () => ({
    dialog: false,
      headers: [
        {
          text: 'Nombre de Cuenta',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Teléfono', value: 'phone' },
        { text: 'Sector', value: 'branch' },
        { text: 'Categoría', value: 'category' },
        { text: 'Grupo Segmento', value: 'groupsegment' },
        { text: 'Segmento', value: 'segment' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      search: "",
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        phone: 0,
        branch: 0,
        category: 0,
        groupsegment: 0,
        segment: 0,
      },
      defaultItem: {
        name: '',
        phone: 0,
        branch: 0,
        category: 0,
        groupsegment: 0,
        segment: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },
      
      beforeMount() {
          this.getAccount();
        },
    created () {
      this.initialize()
    },

    methods: {

      async getAccount(){
      await axios.get('https://casa-andina.azurewebsites.net/user/account')
      .then((response) => {
        console.log(response)
        this.desserts = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },


      initialize () {
        this.desserts = []
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