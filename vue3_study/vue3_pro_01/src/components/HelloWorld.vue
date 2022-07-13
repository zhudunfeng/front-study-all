<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ user.username }}-{{ user.age }}</h1>
    <button @click="addAge">增加年龄</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import User from "@/moudles/User"
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    let user: User = reactive({
      username: '张三',
      age: 18
    })

    function addAge() {
      user.age++
    }

    return { user, addAge }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$bg-color: rgba(0, 0, 0, .4);

h1 {
  background-color: $bg-color;
}
</style>
