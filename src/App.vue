<template>
  <div class="main-content">
    <wheelsky
      class="wheel-block"
      @update-flavor="updateHighlightedFlavor"
      @reset-wheel="resetWheel"
      :highlightedFlavor="highlightedFlavor"
      :availableFlavors="activeFlavorArray"
      v-if="mounted"
      ref="wheel"
    ></wheelsky>
    <div class="right-aside-block">
      <flavor-details
        class="details-block"
        :highlightedFlavor="highlightedFlavor"
        @dig-flavor="flavorIsChosen"
      ></flavor-details>
      <chosen-flavors></chosen-flavors>
    </div>
  </div>
</template>

<script>
import Draggable from "gsap/Draggable";
import Wheelsky from "./components/Wheelsky.vue";
import FlavorDetails from "./components/FlavorDetails.vue";
import ChosenFlavors from "./components/ChosenFlavors.vue";

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
      all: [
        {
          children: [
            {
              name: "a",
              children: [
                {
                  name: "a1",
                  children: [
                    {
                      name: "a1+"
                    },
                    {
                      name: "a1++"
                    },
                    {
                      name: "a1+++"
                    }
                  ]
                },
                {
                  name: "a2",
                  children: [
                    {
                      name: "a2+"
                    }
                  ]
                },
                {
                  name: "a3",
                  children: []
                }
              ]
            },
            {
              name: "b",
              children: [
                {
                  name: "b1",
                  children: [
                    {
                      name: "b1+"
                    }
                  ]
                },
                { name: "b2" }
              ]
            },
            {
              name: "c",
              children: [
                {
                  name: "c1",
                  children: [
                    {
                      name: "c1+"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      highlightedFlavor: undefined,
      selectedFlavors: ["Aucun parfum choisi"],
      previouslySelectedFlavor: undefined,
      depthTier: 1,
      mounted: true,
      activeFlavorArray: [
        {
          name: "a"
        },
        {
          name: "b"
        },
        {
          name: "c"
        }
      ]
    };
  },
  methods: {
    updateHighlightedFlavor(e) {
      this.highlightedFlavor = e.name;
    },
    flavorIsChosen(e) {
      this.activeFlavorArray = [];
      this.depthTier += 1;
      if (this.depthTier == 2) {
        let elementsTier2 = this.all[0].children.find(el => el.name == e)
          .children;
        for (let i = 0; i < elementsTier2.length; i++) {
          this.activeFlavorArray.push(elementsTier2[i]);
        }
        if (this.activeFlavorArray.length == 1) {
          this.activeFlavorArray.push(this.activeFlavorArray[0]);
        }
        this.previouslySelectedFlavor = e;
      } else if (this.depthTier == 3) {
        // does not refetch the selected flavor....nextTick needed again
        let elementsTier2 = this.all[0].children.find(
          el => el.name == this.previouslySelectedFlavor
        ).children;
        let elementsTier3 = elementsTier2.find(el2 => el2.name == e).children;
        for (let i = 0; i < elementsTier3.length; i++) {
          this.activeFlavorArray.push(elementsTier3[i]);
        }
        if (this.activeFlavorArray.length == 1) {
          this.activeFlavorArray.push(this.activeFlavorArray[0]);
        }
      }
      this.$refs.wheel.checkFlavor(Draggable.get("#wheel"));
    },
    resetWheel() {
      this.depthTier = 1;
      this.activeFlavorArray = [
        {
          name: "a"
        },
        {
          name: "b"
        },
        {
          name: "c"
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
