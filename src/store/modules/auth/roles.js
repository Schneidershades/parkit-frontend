import Vue from 'vue'
import { Can, abilitiesPlugin } from '@casl/vue'
import { AbilityBuilder } from '@casl/ability'
import store from 'app/src/store/index'

Vue.component('Can', Can)

export default({ app, store }) =>{

	console.log(store.getters['auth/user'])

	let abilities =  AbilityBuilder.define(can => {
		can('post', 'comment')
	})

	Vue.use(abilitiesPlugin, abilities)
}

