<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Gestión de Leads</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-on="on">Añadir Nuevo Lead</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="auto">
        <v-combobox v-model="select" :items="values2" label="Seleccionar Segmento"></v-combobox>
      </v-col>
                   <!--     <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field> 
                    </v-col>--><v-col cols="auto">
        <v-combobox v-model="select" :items="values2" label="Seleccionar Cuenta"></v-combobox>
      </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Nombre de Grupo"></v-text-field>
                    </v-col>
                    <v-col cols="auto">
        <v-combobox v-model="select" :items="values2" label="Seleccionar Hotel"></v-combobox>
      </v-col>
                    <v-col cols="12" lg="6">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="Fecha Inicio"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
  
        <v-col cols="12" lg="6">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Fecha Fin"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Cantidad de Habitaciones"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Ingresar Tarifa"></v-text-field>
                    </v-col>
                    <v-col cols="auto">
        <v-combobox v-model="select" :items="values2" label="Seleccionar Revenue Eventos"></v-combobox>
      </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Nombre Contacto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Apellido Contacto"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Cargo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Correo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label=" Celular/Teléfono"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
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
export default {
    data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nombre Lead',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Últ. Fech Modif', value: 'finaldate' },
      { text: 'Contacto', value: 'contact' },
      { text: 'Cuenta', value: 'account' },
      { text: 'Total Revenue', value: 'totalrevenue' },
      { text: 'Estado', value: 'status' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    search:'',
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      finaldate: 0,
      contact: 0,
      account: 0,
      totalrevenue: 0,
      status: 0,
    },
    defaultItem: {
      name: '',
      finaldate: 0,
      contact: 0,
      account: 0,
      totalrevenue: 0,
      status: 0,
    },
  }),computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          name: 'Alquiler de cuarto en Huanuco',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Chiclayo',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Huaraz',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Piura',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Tacna',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Lima',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Trujillo',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Ancash',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Tumbes',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
        {
          name: 'Alquiler de cuarto en Arequipa',
          finaldate: 159,
          contact: 6,
          account: 0,
          totalrevenue: 0,
          status: 0,
        },
      ]
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
    }
  }
  }
</script>