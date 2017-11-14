<template>
    <div id="navbar-section" class="section u-full-width">
        <div class="row">
            <div class="one-half column">
                 <a class="navbar-brand button" href="#">{{title}}</a>
            </div>
            <div class="one-half column">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style>
#navbar-section {
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding:10px;
    height:60px;
}

.navbar-brand {
    text-align:center;
    margin-bottom: 0;
    letter-spacing: 5px;
    font-weight:bold;
}
</style>
