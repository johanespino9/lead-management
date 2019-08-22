<template>
    <div>
        <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Leads
          </v-list-item-title>
          <v-list-item-subtitle>
            Gestión de Leads
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>airplane</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>HOLA</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>
<script>
export default {
    data: () => ({
      items: 'HOLA'
    })
}
</script>