<template>
    <div>
        <chartjs-bar :scalesdisplay="myboolean"></chartjs-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labels: ["Apples", "Bananaas", "Grape"],
            datasets: [
                {
                    data: [20,30,50],
                    background
                }
            ]
        };
    }
};
</script>
<style scoped>

</style>