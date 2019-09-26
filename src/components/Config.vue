<template>
    <div>
      <!-- <div class="flex-grow-1"></div> -->
      <!-- <v-dialog v-model="dialog" max-width="1000px" class="center"> -->
<!--       <template v-slot:activator="{ on }">
          <v-btn color="#ff4200" style="color: #FAFAFA;" dark class="mb-2" v-on="on">Editar Perfil</v-btn>
       </template> -->
         <v-card> 
              <v-container>
                <v-row>
                    <v-col cols="1" md="3" sm="10">
                        <v-avatar size="100">
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            >
                            </v-avatar>
                        </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                    <v-text-field
                            prepend-icon="account_circle"
                            ref="fullname"
                            v-model="fullname"
                            label="Full Name"
                            placeholder=""
                            disabled=""
                            
                    ></v-text-field>
                  </v-col>
                  <v-col cols="20" sm="3" md="80" class=center>
                      <v-text-field
                            prepend-icon="email"
                            ref="email"
                            v-model="email"
                            label="E-mail"
                            placeholder=""
                            disabled=""
                        ></v-text-field>
                    </v-col>
                    <v-col cols="20" sm="3" md="80" class=center>
                      <v-text-field
                            prepend-icon="account_circle"
                            ref="role"
                            v-model="role"
                            label="Role"
                            placeholder=""
                            disabled=""
                        ></v-text-field>
                    </v-col>
                    <v-col cols="20" sm="3" md="80" class=center>
                      <v-text-field
                            prepend-icon="group"
                            ref="groupsegment"
                            v-model="groupsegment"
                            label="Grupo de Segmento"
                            disabled=""
                            placeholder=""
                        ></v-text-field>
                    </v-col>
                    <v-col cols="20" sm="3" md="80" class=center>
                      <v-text-field
                            prepend-icon="account_circle"
                            ref="jefe"
                            v-model="jefe"
                            label="Jefe"
                            disabled=""
                            placeholder=""
                        ></v-text-field>
                    </v-col>
                </v-row>
              </v-container>
            <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="#ff4200" text @click="close">Cancel</v-btn>
                      <v-btn color="#ff4200" text @click="save()">Save</v-btn>
         </v-card-actions>
        </v-card>
  <!--   </v-dialog> -->
</div>
</template>


<script>
export default {
    data: () => ({
      fullname: null,
      email: null,
      role: null,
      groupsegment: null,
      jefe: null,
    }),
    computed: {
      form () {
        return {
          fullname: this.fullname,
          email: this.email,
          role: this.role,
          groupsegment: this.groupsegment,
          jefe: this.jefe,
        }
      },
    },
}
</script>