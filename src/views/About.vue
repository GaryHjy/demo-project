<template>
  <div class="about">
    <h1>This is an about page</h1>
    <custom-component />
  </div>
</template>

<script>
import CustomComponent from "@/components/custom-component";

export default {
  components: {
    CustomComponent
  }
};
</script>
