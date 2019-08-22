<template>
  <div>
    <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="black"
          title="Gestión de Leads"
          text="Aquí podrá visualizar el estado de sus leads"
        >
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="Seleccionar Hotel"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="Seleccionar Año"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="Seleccionar Mes"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>
          <v-data-table
            :headers="headers"
            :items="items"

          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
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
          
        </material-card>
      </v-flex>
      <v-flex
        md12
      >
        
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>

export default {
  data: () => ({
    select: 'HOLA',
    headers: [
      {
        sortable: false,
        text: 'Lead',
        value: 'lead'
      },
      {
        sortable: false,
        text: 'Prospecto',
        value: 'prospecto'
      },
      {
        sortable: false,
        text: 'Tentativo',
        value: 'tentativo'
      },
      {
        sortable: false,
        text: 'Hot',
        value: 'hot'
      },
      {
        sortable: false,
        text: 'Confirmado',
        value: 'confirmado'
      },
      {
        sortable: false,
        text: 'Congelado',
        value: 'congelado'
      },
      {
        sortable: false,
        text: 'Cancelado',
        value: 'cancelado'
      },
    ],
    items: [
      {
        lead: 'Cantidad',
        prospecto: '5',
        tentativo: '1',
        hot: '1',
        confirmado: '1',
        congelado: '1',
        cancelado: '1'
      },
      {
        lead: 'Room Revenue',
        prospecto: 'S/.20.000',
        tentativo: 'S/.10.000',
        hot: 'S/.8.000',
        confirmado: 'S/.40.000',
        congelado: 'S/.10.000',
        cancelado: 'S/.15.000'
      }, {
        lead: 'Eventos',
        prospecto: 'S/.30.000',
        tentativo: 'S/.20.000',
        hot: 'S/.8.000',
        confirmado: 'S/.40.000',
        congelado: 'S/.11.000',
        cancelado: 'S/.13.000'
      }, {
        lead: 'No atentidos',
        prospecto: '1',
        tentativo: '4',
        hot: '3',
        confirmado: '2',
        congelado: '0',
        cancelado: '2'
      }
    ]
  })
}
</script>