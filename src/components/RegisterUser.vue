<template>
        <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="email"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Gestión de Usuarios</v-toolbar-title>
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
                    <v-btn color="primary" dark class="mb-2" v-on="on">ADD NEW USER</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fullname" label="Full Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                                <v-text-field
                                  v-model="password"
                                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                  :rules="[rules.required, rules.min]"
                                  :type="show1 ? 'text' : 'password'"
                                  name="input-10-1"
                                  label="Password"
                                  hint="At least 8 characters"
                                  counter
                                  @click:append="show1 = !show1"
                                ></v-text-field>
                              </v-col>
                          <v-col cols="auto">
                            <v-combobox v-model="select" :items="groupsegment" label="Group Segment"></v-combobox>
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
  export default {
    data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Ejecutivos',
        align: 'left',
        sortable: false,
        value: 'fullname',
      },
      { text: 'Email', value: 'email' },
      { text: 'Username', value: 'username' },
      { text: 'Group Segment', value: 'groupsegment' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      fullname: '',
      email: '',
      username: '',
      groupsegment: '',
    },
    defaultItem: {
      fullname: '',
      email: '',
      username: '',
      groupsegment: '',
    },
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
    }
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

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
        },
        {
          fullname: 'Renzo Mondragon',
          email: 'renzgmc@gmail.com',
          username: 'renzgmc',
          groupsegment: 'corporativo',
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
    },
  }
  }
</script>