<template>
  <div class="main-content">
    <wheelsky
      class="wheel-block"
      @update-flavor="updateHighlightedFlavor"
      @reset-wheel="resetWheel"
      :highlightedFlavor="highlightedFlavor"
      :availableFlavors="activeFlavorArray"
      ref="wheel"
    ></wheelsky>
    <div class="right-aside-block">
      <flavor-details
        class="details-block"
        :highlightedFlavor="highlightedFlavor"
        :depthTier="depthTier"
        @dig-flavor="flavorIsChosen"
        @reset-depth="selectFlavor"
      ></flavor-details>
      <chosen-flavors :selectedFlavors="selectedFlavors"></chosen-flavors>
    </div>
  </div>
</template>

<script>
import Draggable from "gsap/Draggable";
import Wheelsky from "./components/Wheelsky.vue";
import FlavorDetails from "./components/FlavorDetails.vue";
import ChosenFlavors from "./components/ChosenFlavors.vue";
import UserForm from "./components/UserForm.vue";

import whiskyFlavors from "./data/whiskyFlavors.json";
import whiskyOrigin from "./data/whiskyOrigin.json";
import whiskyType from "./data/whiskyType.json";

export default {
  name: "app",
  components: {
    Wheelsky,
    FlavorDetails,
    ChosenFlavors
  },
  data() {
    return {
      allFlavors: [
        {
          name: "banana",
          color: "#1ad1e5"
        },
        {
          name: "strawberry",
          color: "#e2071c"
        },
        {
          name: "cherry",
          color: "#fb1"
        },
        {
          name: "pineapple",
          color: "#b000b5"
        },
        {
          name: "watermelon",
          color: "#fa7a55"
        }
      ],
      all: whiskyFlavors,
      highlightedFlavor: undefined,
      selectedFlavors: [],
      previouslySelectedFlavor: undefined,
      depthTier: 1,
      activeFlavorArray: [
        {
          name: "Doux"
        },
        {
          name: "Floral"
        },
        {
          name: "Fruité"
        },
        {
          name: "Herbacé"
        },
        {
          name: "Marin"
        },
        {
          name: "Minéral"
        },
        {
          name: "Huileux"
        },
        {
          name: "Fumé"
        },
        {
          name: "Soufré"
        },
        {
          name: "Vineux"
        },
        {
          name: "Boisé"
        },
        {
          name: "Céréale"
        }
      ]
    };
  },
  mounted() {
    window.onbeforeunload = function() {
      return "Êtes-vous sûr de vouloir recharger la page ?";
    };
  },
  methods: {
    updateHighlightedFlavor(e) {
      this.highlightedFlavor = e.name;
    },
    selectFlavor(e) {
      this.selectedFlavors.push(e);
      this.resetWheel();
    },
    flavorIsChosen(e) {
      this.activeFlavorArray = [];
      let tempArray = [];
      this.depthTier += 1;
      if (this.depthTier == 2) {
        let elementsTier2 = this.all[0].children.find(el => el.name == e)
          .children;
        for (let i = 0; i < elementsTier2.length; i++) {
          console.log(elementsTier2[i]);
          tempArray.push(elementsTier2[i]);
          //!todo need to filter the N+1 to avoid printing parents w/ no children...
        }
        console.log(elementsTier2);
        this.previouslySelectedFlavor = e;
      } else if (this.depthTier == 3) {
        let elementsTier2 = this.all[0].children.find(
          el => el.name == this.previouslySelectedFlavor
        ).children;
        let elementsTier3 = elementsTier2.find(el2 => el2.name == e).children;
        for (let i = 0; i < elementsTier3.length; i++) {
          tempArray.push(elementsTier3[i]);
        }
      }
      tempArray = tempArray.filter(
        x => this.selectedFlavors.indexOf(x.name) < 0
      );
      this.activeFlavorArray = tempArray;
      if (this.activeFlavorArray.length == 1) {
        this.activeFlavorArray.push(this.activeFlavorArray[0]);
      }
      if (this.activeFlavorArray.length == 0) {
        this.resetWheel();
        //!todo OMFG, what an MLG pro. kill me.
      }
      this.$refs.wheel.checkFlavor(Draggable.get("#wheel"));
    },
    resetWheel() {
      this.depthTier = 1;
      this.activeFlavorArray = [
        {
          name: "Doux"
        },
        {
          name: "Floral"
        },
        {
          name: "Fruité"
        },
        {
          name: "Herbacé"
        },
        {
          name: "Marin"
        },
        {
          name: "Minéral"
        },
        {
          name: "Huileux"
        },
        {
          name: "Fumé"
        },
        {
          name: "Soufré"
        },
        {
          name: "Vineux"
        },
        {
          name: "Boisé"
        },
        {
          name: "Céréale"
        }
      ];
    }
  }
};
</script>

<style lang="sass">
*
  box-sizing: content-box
  // overflow: auto;
body
  margin: 0
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
.main-content
  width: 100%
  display: flex
  justify-content: center
  align-items: center
.wheel-block
  position: relative
  flex: 1 1 0
.right-aside-block
  display: flex
  flex-direction: column
  flex: 1 0 0
  transform: translate3d(-25%, 0, 0)
  border: 3px solid yellow
</style>
