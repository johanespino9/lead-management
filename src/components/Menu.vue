<template>
    <div>
        <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item to="/">
          
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
          
        </v-list-item>
        <v-list-item to="/tabledash">
          
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>DashBoard Ejecutivo</v-list-item-title>
          </v-list-item-content>
          
        </v-list-item>
        

        <v-list-item to="/registerlead">
          <v-list-item-action>
            <v-icon>event</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Leads</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/registeruser">
          <v-list-item-action>
            <v-icon>account-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/registeraccount">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gestión de Cuentas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/modaledit">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Modal edit</v-list-item-title>
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