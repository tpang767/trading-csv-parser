<template>
    <div id="main-content" class="section">
        <div class="row">
            <div class="two columns" id="left-panel">
                <h6 class="section-subheader">{{ subHeader }}</h6>
            </div>
            <div class="ten columns" id="right-panel">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['subHeader']
}
</script>

<style>
#main-content{
  color: black;
  border:solid 1px black;
  padding:10px;
  height:100%;
}
.section-subheader{
  text-align:center;
}
</style>
