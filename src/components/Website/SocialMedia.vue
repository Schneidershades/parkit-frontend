<template>
	<!-- <div class="social-icons" align="center">
	  <a class="social-icon social-icon--codepen">
	    <i class="fa fa-codepen"></i>
	    <div class="tooltip">Codepen</div>
	  </a>
	  <a class="social-icon social-icon--github">
	    <i class="fa fa-github"></i>
	    <div class="tooltip">Github</div>
	  </a>
	  <a class="social-icon social-icon--twitter">
	    <i class="fa fa-twitter"></i>
	    <div class="tooltip">Twitter</div>
	  </a>
	  <a class="social-icon social-icon--dribbble">
	    <i class="fa fa-dribbble"></i>
	    <div class="tooltip">Dribbble</div>
	  </a>
	  <a class="social-icon social-icon--instagram">
	    <i class="fa fa-instagram"></i>
	    <div class="tooltip">Instagram</div>
	  </a>
	  <a class="social-icon social-icon--linkedin">
	    <i class="fa fa-linkedin"></i>
	    <div class="tooltip">LinkedIn</div>
	  </a>
	  <a class="social-icon social-icon--facebook">
	    <i class="fa fa-facebook"></i>
	    <div class="tooltip">Facebook</div>
	  </a>
	</div> -->
	<div class="q-pa-md q-gutter-sm">
		<!-- <q-icon name="ti-facebook" /> -->
    <q-btn round color="primary" icon="fas fa-facebook" />
    <q-btn round color="secondary" icon="navigation" />
    <q-btn round color="amber" glossy text-color="black" icon="layers_clear" />
    <q-btn round color="brown-5" icon="directions" />
    <q-btn round color="deep-orange" icon="edit_location" />
    <q-btn round color="purple" glossy icon="local_grocery_store" />
    <q-btn round color="black" icon="my_location" />
  </div>
</template>

<style scoped>
	/* Demo */
body {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  min-height: 100vh;
}

/* Color Variables */
/* Social Icon Mixin */
/* Social Icons */
.social-icons {
  display: -webkit-box;
  display: flex;
}

.social-icon {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 2.5rem;
  text-decoration: none;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
}
.social-icon:hover {
  color: #fff;
}
.social-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
  -webkit-transform: translate(-50%, -150%);
          transform: translate(-50%, -150%);
}
.social-icon:active {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5) inset;
}
.social-icon--linkedin {
  background: #006599;
  color: #fff;
}
.social-icon--linkedin .tooltip {
  background: #006599;
  color: currentColor;
}
.social-icon--linkedin .tooltip:after {
  border-top-color: #006599;
}
.social-icon--twitter {
  background: #2b97f1;
  color: #fff;
}
.social-icon--twitter .tooltip {
  background: #2b97f1;
  color: currentColor;
}
.social-icon--twitter .tooltip:after {
  border-top-color: #2b97f1;
}
.social-icon--codepen {
  background: #000;
  color: #fff;
}
.social-icon--codepen .tooltip {
  background: #000;
  color: currentColor;
}
.social-icon--codepen .tooltip:after {
  border-top-color: #000;
}
.social-icon--facebook {
  background: #3b5a9b;
  color: #fff;
}
.social-icon--facebook .tooltip {
  background: #3b5a9b;
  color: currentColor;
}
.social-icon--facebook .tooltip:after {
  border-top-color: #3b5a9b;
}
.social-icon--instagram {
  background: #527fa6;
  color: #fff;
}
.social-icon--instagram .tooltip {
  background: #527fa6;
  color: currentColor;
}
.social-icon--instagram .tooltip:after {
  border-top-color: #527fa6;
}
.social-icon--dribbble {
  background: #ef5a92;
  color: #fff;
}
.social-icon--dribbble .tooltip {
  background: #ef5a92;
  color: currentColor;
}
.social-icon--dribbble .tooltip:after {
  border-top-color: #ef5a92;
}
.social-icon--github {
  background: #4284c0;
  color: #fff;
}
.social-icon--github .tooltip {
  background: #4284c0;
  color: currentColor;
}
.social-icon--github .tooltip:after {
  border-top-color: #4284c0;
}
.social-icon i {
  position: relative;
  top: 1px;
}

/* Tooltips */
.tooltip {
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  padding: 0.8rem 1rem;
  border-radius: 40px;
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0;
  pointer-events: none;
  text-transform: uppercase;
  -webkit-transform: translate(-50%, -100%);
          transform: translate(-50%, -100%);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  z-index: 1;
}
.tooltip:after {
  display: block;
  position: absolute;
  bottom: 1px;
  left: 50%;
  width: 0;
  height: 0;
  content: "";
  border: solid;
  border-width: 10px 10px 0 10px;
  border-color: transparent;
  -webkit-transform: translate(-50%, 100%);
          transform: translate(-50%, 100%);
}
</style>