<template>
    <q-footer bordered id="footer" class="text-white">
      <q-toolbar>
        <div class="container">
            <div class="row q-pa-md">
                <div class="col-md-3 q-pa-sm">
                    <div>
                        <header class="text-h6">ABOUT PARKIT</header>
                        <p>Parkit is a technology driven vehicle wash and care service. We pride ourselves in having; unparalleled customer experience; with our easy to use booking, payment and location finder system via our app, customers enjoy seamless booking experiences.</p>
                    </div>
                </div>
                <div class="col-md-3 q-pa-sm">
                    <header class="text-h6">LINKS</header>
                    <!-- <q-btn flat label="Gallery" to="/gallery"/> -->
                    <q-btn flat label="Home Service" to="/home-service"/>
                    <q-btn flat label="Parkit Corporate" to="/parkit-corporate"/>
                    <q-btn flat label="Membership" to="" @click="membershipModal = true"/>
                    <q-btn flat label="Become a Partner" @click="partnerModal = true"/>
                    <q-btn flat label="Careers" @click="careerModal = true"/>
                    <q-btn flat label="Franchise" to="/parkit-franchise"/>
                    <q-btn flat label="Training and Consultancy" @click="trainingAndConsultancyModal = true"/>
                </div>

                <q-dialog v-model="membershipModal">
                    <Membership/>
                </q-dialog>

                <q-dialog v-model="partnerModal">
                    <Partner/>
                </q-dialog>

                <q-dialog v-model="careerModal">
                    <Career/>
                </q-dialog>

                <q-dialog v-model="trainingAndConsultancyModal">
                    <TrainingAndConsultancy/>
                </q-dialog>


                <div class="col-md-3 q-pa-sm">
                    <div class="align-center">
                        <header class="text-h6">LOCATIONS</header>
                        <table>
                            <tbody>
                                <tr>
                                    <th><span class="material-icons">local_car_wash</span></th>
                                    <td style="padding-bottom: 5px;"><a target="blank" href="https://www.google.com.ng/maps/dir/''/parkit+car+wash/@6.4685362,3.5691634,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x103bf925ab41f45b:0xff391b4a7cfd59e6!2m2!1d3.639204!2d6.468541">Novare Shopping Mall Sangotedo, Lekki - Epe Expressway, Lagos.</a></td>
                                </tr>
                                <tr>
                                    <th><span class="material-icons">local_car_wash</span></th>
                                    <td><a target="blank" href="https://www.google.com.ng/maps/place/Maryland+Mall+Anthony+Lagos/@6.5673205,3.3673632,15z/data=!4m5!3m4!1s0x0:0x2d8150be778faeda!8m2!3d6.5673205!4d3.3673632">Maryland Mall Anthony Lagos, 350-360 Ikorodu Rd, Anthony, Lagos.</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-3 q-pa-sm">
                    <header class="text-h6">CONTACT US</header>
                    <table>
                        <tbody>
                            <tr>
                                <th><span class="material-icons">place</span></th>
                                <td style="padding-bottom: 5px;"><a href="https://www.google.com.ng/maps?rlz=1C1CHBF_enNG754NG754&amp;nfpr=1&amp;q=No.+11+Elsie+Femi+Pearse,+Victoria+Island,+Lagos+State,+Nigeria.&amp;biw=1366&amp;bih=662&amp;um=1&amp;ie=UTF-8&amp;sa=X&amp;ved=0ahUKEwjwupyYx6bdAhVCW8AKHW0MA_MQ_AUICigB">No. 11 Elsie Femi Pearse, Victoria Island, Lagos State, Nigeria.</a></td>
                            </tr>
                            <tr>
                                <th><span class="material-icons">phone</span></th>
                                <td><a href="tel:+2349031526466">+234 903 152 6466</a></td>
                            </tr>
                            <tr>
                                <th><span class="material-icons">email</span></th>
                                <td><a href="mailto:info@parkit.ng?subject=Contact+Parkit">info@parkit.ng</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
      </q-toolbar>
    </q-footer>


    <!-- <div id="footer">
        
    </div> -->
</template>
<style scoped>
    #footer {
        background-color: #151c1f;
        color: #eceff1;
        padding-top: 25px;
        padding-bottom: 25px;
    }
    #footer a{
        text-decoration: none;
        color: #039be5;
    }
</style>


<script>
    import Membership from 'components/Website/Membership.vue'
    import Partner from 'components/Website/Partner.vue'
    import TrainingAndConsultancy from 'components/Website/TrainingAndConsultancy.vue'
    import Career from 'components/Website/Career.vue'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'MyLayout',

        components:{
            Membership,
            Partner,
            TrainingAndConsultancy,
            Career
        },
        
        data () {
            return {
                membershipModal: false,
                partnerModal: false,
                careerModal: false,
                trainingAndConsultancyModal: false,
            }
        },
    }
</script>