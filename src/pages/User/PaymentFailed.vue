<template>
	<q-card style="width: 400px; max-width: 80vw; margin: auto; margin-top:70px" class="q-pt-md">  
        <q-card-actions align="center">
            <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
        </q-card-actions> 
	
        <q-card-section v-if="details != null">  
        	{{details}}
        </q-card-section>

        <q-card-section v-else class="row" align="center">  
        	<div class="col-md-12">
        		<h6>Payment Failed</h6>
        	</div> 
        	<div class="col-md-12">
            	<q-btn to="/" label="Back to Home" color="primary" v-close-popup />
        	</div> 
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" v-if="timeout != null">
            <q-btn to="/" label="Back to Home" color="primary" v-close-popup />
            <q-btn v-if="authenticated != null" to="/user/dashboard" label="Back to Dashboard" color="primary"/>
        </q-card-actions>
    </q-card>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'

    export default{
        data(){
            return{
                  
            }
        },

        computed: {
            ...mapGetters({
                details: 'auth/paymentDetails',
                timeout: 'auth/paymentTimeout',
            	authenticated: 'auth/user',
            }),
        },
            
        methods:{

        }
    }
</script>
	