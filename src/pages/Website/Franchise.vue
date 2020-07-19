<template>
  <q-page>
    <q-img src="statics/selected/franchise-banner.jpg" style="height:600px">
      <div class="absolute-full text-subtitle2 flex flex-center">
        <div class="row">
          <div class="col-md-12 q-pa-sm" >
            <h6 class="text-center" style="padding: 12px;background-color: #0d47a1;font-weight: 700">FRANCHISE</h6>
            <div style="position: relative;">                                
              <blockquote class="white-text darken-4-text valign-wrapper" id="parkit-corporate-vision-body">
                <h6 class="flow-text" style="margin: 0;text-align: center;">Become a liscensed Partner.</h6>
              </blockquote>
              <div class="corporate-page-banner-mission-vision-body-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </q-img>

    <div class="q-pa-xl">
      <div class="q-gutter-y-md">
        <div class="container">
          <div>
            <h4>Interested in becoming a franchise?</h4>
            <p style="margin-bottom: 0;">At Parkit, we are a team of passionate car wash professionals working to create opportunities for our partners to become the best car wash operators they can be. Our team was responsible for successfully setting up the first car wash and auto spa in a “shoprite” mall in the entire West African region.</p>
          </div>
        </div>

        <q-list bordered>
          <q-expansion-item group="somegroup" icon="explore" label="How much does a Parkit franchise cost?" default-opened header-class="text-primary text-h5 q-py-md">
            <q-card>
              <q-card-section>
                The franchise fee for owning a Parkit franchise is N1,000,000 however setup cost can vary from N2,000,000 to N4,500,000 depending on the size and location.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="explore" label="How much liquid capital do I need?"  header-class="text-primary text-h5 q-py-md">
            <q-card>
              <q-card-section>
                A liquid capital of N500,000 to N1,000,000+ is required for other running costs for the first 3 months at least.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="explore" label="What is the royalty fee?"  header-class="text-primary text-h5 q-py-md">
            <q-card>
              <q-card-section>
                An ongoing royalty fee of 10% of the Net sales (gross minus taxes) is paid monthly, fee also includes all marketing costs.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="What kind of training does Parkit provide?"
             header-class="text-primary text-h5 q-py-md"
            expand-icon-class="text-white"
          >
            <q-card >
              <q-card-section>
                Parkit doesn’t require prior experience, we make training and support an ongoing part of being in the Parkit family.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="Does Parkit setup a location for Franchisees?"
             header-class="text-primary text-h5 q-py-md"
            expand-icon-class="text-white"
          >
            <q-card >
              <q-card-section>
                The Parkit team will guide you through all phases of site selection, lease negotiation, construction, training, grand opening and ongoing processes for marketing and operations. However there’s an option to allow Parkit take up the entire construction project if the franchisee is interested.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="q-gutter-y-md">
        <div class="container ">
          <h4>Fill our Franchise Interest Form</h4>
          <div class="row">
            <iframe class="col-md-12" style="height:1200px; width:1200px" src="https://docs.google.com/forms/d/e/1FAIpQLSfla6pXYjR1b2KnumrP-nnRsRcrUZ0sD_mZfMMI6T-YA8wrLw/viewform?usp=send_form"></iframe>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scope>

h4 {
    display: inline-block;
    border: 0 solid #e91e63;
    color: #c2185b;
    border-top-width: 3px;
    border-left-width: 10px;
    padding: 4px;
    font-weight: 700;
}


  .q-field__label .no-pointer-events .absolute .ellipsis{
    color:white;
  }

  #home-packages h5>strong, #corporate-page-intro h5, #corporate-page-company_story h5, #corporate-page-packages h5, #corporate-page-singles h5 {
      display: inline-block;
      border: 0 solid #e91e63;
      color: #c2185b;
      border-top-width: 3px;
      border-left-width: 10px;
      padding: 4px;
      font-weight: 700;
  }

  .package {
    box-sizing: border-box;
    width: 220px;
    height: 380px;
    border: 3px solid #e8e8e8;
    border-radius: 7px;
    display: inline-block;
    padding: 24px;
    text-align: center;
    float: left;
    -webkit-transition: margin-top .5s linear;
    transition: margin-top .5s linear;
    position: relative;
    margin-right: 11px;
  }
  .package:hover {
    margin-top: -30px;
    -webkit-transition: margin-top .3s linear;
    transition: margin-top .3s linear;
  }

  .name {
    color: #565656;
    font-weight: 600;
    font-size: 2rem;
    margin-top: -5px;
  }

  .price {
    margin-top: 7px;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .price::after {
    /*content: " / month per user";*/
    font-weight: normal;
  }

  hr {
    background-color: #dedede;
    border: none;
    height: 1px;
  }

  .trial {
    font-size: .9rem;
    font-weight: 600;
    padding: 2px 21px 2px 21px;
    color: #ffffff;
    border: 1px solid #e4e4e4;
    display: inline-block;
    border-radius: 15px;
    background-color: rgb(5, 18, 189);
    position: relative;
    bottom: -20px;
  }

  ul {
    list-style: none;
    padding: 0;
    text-align: left;
    margin-top: 29px;
  }

  li {
    margin-bottom: 15px;
  }
  li:before {
    font-size: 1.3rem;
    color: #0512bd;
    margin-right: 3px;
  }

  /*.checkIcon, li:before, .brilliant::after {
    font-family: "FontAwesome";
    content: "\f00c";
  }*/

  .brilliant {
    border-color: #0512bd;
  }
  .brilliant::before {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 64px 64px 0 0;
    border-color: #0512bd transparent transparent transparent;
    position: absolute;
    left: 0;
    top: 0;
    content: "";
  }
  .brilliant::after {
    color: white;
    position: absolute;
    left: 9px;
    top: 6px;
    text-shadow: 0 0 2px #37c5b6;
    font-size: 1.4rem;
  }


  .pricingdiv{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: 'Source Sans Pro', Arial, sans-serif;
  }

  .pricingdiv ul.theplan{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    color: white;
    background: radial-gradient(circle, #7c3ac9 0%, #014a88 100%);
    position: relative;
    width: 230px; /* width of each table */
    margin-right: 10px; /* spacing between tables */
    margin-bottom: 1em;
    transition: all .5s;
  }

  .pricingdiv ul.theplan:hover{ /* when mouse hover over pricing table */
    transform: scale(1.05);
    transition: all .5s;
    z-index: 100;
    box-shadow: 0 0 10px gray;
  }

  .pricingdiv ul.theplan li{
    margin: 10px 20px;
    position: relative;
  }

  .pricingdiv ul.theplan li.title{
    font-size: 150%;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    text-transform: uppercase;
    border-bottom: 5px solid white;
  }

  .pricingdiv ul.theplan:nth-of-type(2){
    background: #e53499;
  }
      
  .pricingdiv ul.theplan:nth-of-type(3){
    background: #2a2cc8;
  }

  .pricingdiv ul.theplan:last-of-type{ /* remove right margin in very last table */
    margin-right: 0;
  }

  /*very last LI within each pricing UL */
  .pricingdiv ul.theplan li:last-of-type{
    text-align: center;
    margin-top: inherit; /*align last LI (price botton li) to the very bottom of UL */
  }  

  .pricingdiv a.pricebutton{
    background: white;
    text-decoration: none;
    padding: 10px;
    display: inline-block;
    margin: 10px auto;
    border-radius: 5px;
    color: navy;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 500px) {
    .pricingdiv ul.theplan{
      border-radius: 0;
      width: 100%;
      margin-right: 0;
    }
    
    .pricingdiv ul.theplan:hover{
      transform: none;
      box-shadow: none;
    }
    
    .pricingdiv a.pricebutton{
      display: block;
    }
  } 
</style>

<script>    
    export default {
      data () {
        return {
          slide: 'first',
          tab: 'mails'
        }
      },
      components:{
      }
    }
</script>
