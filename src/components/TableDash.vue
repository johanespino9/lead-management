<template>
  <div>
    <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-combobox v-model="hotelSelected" :items="values2" label="Seleccionar Hotel"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox v-model="monthSelected" :items="values2" label="Seleccionar Año"></v-combobox>
      </v-col>
      <v-col cols="auto">
        <v-combobox v-model="daySelected" :items="items" label="Seleccionar Mes"></v-combobox>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="values">
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>
      <template slot="items" slot-scope="{ item }">
        <td>{{ item.lead }}</td>
        <td>{{ item.prospecto }}</td>
        <td>{{ item.tentativo }}</td>
        <td>{{ item.hot }}</td>
        <td>{{ item.confirmado }}</td>
        <td>{{ item.congelado }}</td>
        <td>{{ item.cancelado }}</td>
        <td class="text-xs-right">{{ item.salary }}</td>
      </template>
    </v-data-table>
    <v-row justify="center">
      <v-col cols="auto">
        <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="value"
        color="orange"
      >
        {{ value }}
      </v-progress-circular>
      </v-col>
      <v-col cols="auto">
        <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="value"
        color="orange"
      >
        {{ value }}
      </v-progress-circular>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    hotelSelected: '',
    monthSelected: '',
    daySelected: '',
    months:[ 
      {
        id: 1,
        name: 'Enero'
      },
      {
        id: 2,
        name: 'Febrero'
      },
      {
        id: 3,
        name: 'Marzo'
      },
      {
        id: 4,
        name: 'Abril'
      },
      {
        id: 5,
        name: 'Mayo'
      },
      {
        id: 6,
        name: 'Junio'
      },
      {
        id: 7,
        name: 'Julio'
      },
      {
        id: 8,
        name: 'Agosto'
      },
      {
        id: 9,
        name: 'Setiembre'
      },
      {
        id: 10,
        name: 'Octubre'
      },
      {
        id: 11,
        name: 'Noviembre'
      },
      {
        id: 12,
        name: 'Diciembre'
      }


    ],
    headers: [
      {
        sortable: false,
        text: "",
        value: "dato"
      },
      {
        sortable: false,
        text: "Prospecto",
        value: "prospecto"
      },
      {
        sortable: false,
        text: "Tentativo",
        value: "tentativo"
      },
      {
        sortable: false,
        text: "Hot",
        value: "hot"
      },
      {
        sortable: false,
        text: "Confirmado",
        value: "confirmado"
      },
      {
        sortable: false,
        text: "Congelado",
        value: "congelado"
      },
      {
        sortable: false,
        text: "Cancelado",
        value: "cancelado"
      }
    ],
    items: [
      {
        lead: "Cantidad",
        prospecto: "5",
        tentativo: "1",
        hot: "1",
        confirmado: "1",
        congelado: "1",
        cancelado: "1"
      },
      {
        lead: "Room Revenue",
        prospecto: "S/.20.000",
        tentativo: "S/.10.000",
        hot: "S/.8.000",
        confirmado: "S/.40.000",
        congelado: "S/.10.000",
        cancelado: "S/.15.000"
      },
      {
        lead: "Eventos",
        prospecto: "S/.30.000",
        tentativo: "S/.20.000",
        hot: "S/.8.000",
        confirmado: "S/.40.000",
        congelado: "S/.11.000",
        cancelado: "S/.13.000"
      },
      {
        lead: "No atentidos",
        prospecto: "1",
        tentativo: "4",
        hot: "3",
        confirmado: "2",
        congelado: "0",
        cancelado: "2"
      }
    ],
    values2: ["Chincha", "Marriot", "Hilton"],
    values: []
  }),
  created() {
    this.getUser();
    // this.login();
  },
  methods: {
    async getUser() {
      let datos = await axios.get(
        "https://casa-andina.azurewebsites.net/robval96/Dashboard"
      );
      this.values = datos.data.table;
    },
    // CREDENCIALES = username: robval96, password: 123456
    login() {
      axios
        .post("https://casa-andina.azurewebsites.net/Home", {
          username: "robval96",
          password: "123456"
        })
        .then(response => {
          // Respuesta del servidor
          console.log(response);
          this.values2 = response.data.table;
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>