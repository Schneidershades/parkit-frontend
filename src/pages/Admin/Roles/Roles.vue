<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="All Roles" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <!-- {{roles}} -->
        <!-- {{permissionChange}} -->
        <q-btn type="submit" unelevated color="primary" class="q-px-md" size="md" label="Create New Role" @click="createRole = true" />
        <q-list bordered>
          <q-expansion-item group="somegroup" icon="explore"  v-for="role in roles" :key="role.id" :label="role.name" header-class="text-primary text-h5 q-py-md">
            <q-card>
              <q-card-section>

                <div class="q-ma-sm">
                  <q-btn class="q-ma-sm" v-for="(p, index) in permissionChange" :key="index" color="teal" size="sm" >{{p.role}} - {{p.permission}}
                    <q-badge class="q-ma-sm" v-if="p.status == 'remove'" color="red" >-</q-badge>
                    <q-badge class="q-ma-sm" v-if="p.status == 'add'" color="green" >+</q-badge>
                    <q-badge color="orange" floating @click="deleteRolePermission(index)" >
                      x
                    </q-badge>
                  </q-btn>
                </div>
                <div class="q-ma-md" v-if="permissionChange.length > 0">
                  <q-btn type="submit" unelevated color="primary" @click="saveRolesPermissions" class="q-px-md" size="md" label="Save Permissions" />
                </div>

                  <q-table
                    flat
                    title="All Expense Transactions"
                      :data="permissions"
                      :columns="columns"
                      row-key="name"
                      :filter="filterPermission"
                    >
                    <template v-slot:top-right>
                        <q-input borderless dense debounce="300" v-model="filterPermission" placeholder="Search">
                          <template v-slot:append>
                            <q-icon name="search" v-model="filterPermission"/>
                          </template>
                        </q-input>
                      </template>
                    <template slot="body" slot-scope="props">
                        <q-tr :props="props">
                          <q-td key="action" :props="props">
                            <!-- <q-btn color="warning"  label="View Transaction"/> -->
                            <q-checkbox :value="currentPermissionExists(role.name, props.row.name)" v-on:click.native="sendRolePermission(role.name, props.row.name, currentPermissionExists(role.name, props.row.name))"/>
                          </q-td>
                          <q-td key="id" :props="props">1019239{{props.row.id}}</q-td>
                          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                        </q-tr>
                    </template>
                  </q-table>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />          
        </q-list>
        
        <q-dialog v-model="createRole" >
          <q-card>
            <q-card-section>
              <div class="text-h6">Create a new role</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">

              <q-form
                  @submit.prevent="saveRole"
                  ref="form"
                >
                <q-input
                  ref="name"
                  filled
                  v-model="form.name"
                  label="Your Role *"
                  hint="Please insert a role"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                <q-btn
                    type="submit"
                    label="Save Role"
                    class="q-mt-md"
                    color="primary"
                >
                </q-btn>
              </q-form>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import { Notify } from 'quasar'

export default {
  data () {
    return {
      permissionItems: [],
      permissionChange: [],
      createRole: false,
      form :{
        name: ''
      },
      filterPermission: '',
      columns: [
         {
            name: 'id',
            align: 'left',
            label: 'ID',
            field: 'id',
            sortable: true
         },
         
         {
            name: 'name',
            align: 'left',
            label: 'Name',
            field: 'name',
            sortable: true
         },
         {
            name: 'action',
            align: 'left',
            label: 'Action',
            field: 'action',
         }
      ],
    }
  },

  computed: {
      ...mapGetters({
          user: 'auth/user',
          roles: 'roles/roles',
          permissions: 'roles/permissions',
      })
  },

  methods:{
      ...mapActions({
          getRoles: 'roles/getRoles',
          getPermissions: 'roles/getPermissions',
          sendRolesPermissions: 'roles/sendRolesPermissions',
          saveNewRole: 'roles/saveRole',
      }),


      currentPermissionExists(roleType, permissionType) {
        var length = this.roles.length;
        for(var i = 0; i < length; i++) {
          if(this.roles[i].name == roleType){
            var permissions = this.roles[i].permissions
            const hasAdmin = permissions.find(p => p.name === permissionType);
            if(hasAdmin){
              return true
            }else{
              return false
            }
          }
        }
      },

      sendRolePermission(roleType, permissionType, status){
        // console.log(roleType, permissionType, status)
        if(status==true){
          var action = 'remove'
        }else{
          var action = 'add'
        }

        const existing = this.permissionChange.find((item)=>{
          return item.role === roleType && item.permission === permissionType
        })

        if(existing){
          
        }else{
          this.permissionChange.push({
            role: roleType,
            permission: permissionType,
            status: action,
          })
        }
      },

      deleteRolePermission(index){
        this.$delete(this.permissionChange, index)
      },

      saveRole(){
        this.saveNewRole(this.form).then((res) => {
            this.positiveNotification('your transactions has been saved')
        }).catch((error) => {
            this.errorMessages = error
            console.log(this.errorMessages)
            if(this.errorMessages){
                this.negativeNotification(this.errorMessages)
            }
        })  
      },

      saveRolesPermissions(location) {
        this.sendRolesPermissions(this.permissionChange).then((res) => {
            this.permissionChange = []
            this.positiveNotification('your transactions has been saved')
        }).catch((error) => {
            this.errorMessages = error
            console.log(this.errorMessages)
            if(this.errorMessages){
                this.negativeNotification(this.errorMessages)
            }
        })  
      },

      positiveNotification(message){
          Notify.create({
              type: 'positive',
              color: 'positive',
              timeout: 3000,
              position: 'center',
              message: message
          })
      },

      negativeNotification(error){
          Notify.create({
              type: 'negative',
              color: 'negative',
              timeout: 3000,
              position: 'center',
              message: error
          })
      },
  },

  mounted(){
    this.getRoles()
    this.getPermissions()
    this.permissionItems = this.permissions
  }
}
</script>