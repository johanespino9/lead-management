<template>
    <div>
         <v-card>
            <v-toolbar-title>Gestión de Visitas</v-toolbar-title>
              <v-container>
                <v-row>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-combobox
                      v-model="select"
                      :items="items"
                      label="Seleccionar Motivo"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-combobox
                      v-model="select"
                      :items="items"
                      label="Seleccionar Empresa"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date"
                            label="Fecha de Visita"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="20" sm="3" md="80" class=center>
                      <v-switch v-model="switch1" inset :label="`Status: ${switch1.toString()}`"></v-switch> 
                    </v-col>
                </v-row>
              </v-container>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createLead">Guardar</v-btn>
            </v-card-actions>
          </v-card>
    </div>
    </template>

<script>
export default {
   data () {
      return {
        switch1: true,
        switch2: false,
      }
    },

  date: new Date().toISOString().substr(0, 10),
    menu: false,
}
</script>