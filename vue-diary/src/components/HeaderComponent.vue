<script setup>
    const props = defineProps({
        title: String,
        leftChild: Object,
        rightChild: Object
    })
</script>

<template>
    <header class="Header">
        <div class="header_left">
            <component :is="props.leftChild" />
        </div>
        <div class="header_center">
            {{props.title}}
        </div>
        <div class="header_right">
            <component :is="props.rightChild" />
        </div>
    </header>
</template>

<style scoped>
    .Header {
        display: flex;
        align-items: center;
        padding: 20px 0px;
        border-bottom: 1px solid rgb(226, 226, 226);
    }

    .Header > div {
        display: flex;
    }

    .Header .header_center {
        width: 50%;
        font-size: 25px;
        justify-content: center;
    }

    .Header .header_left {
        width: 25%;
        justify-content: flex-start;
    }

    .Header .header_right {
        width: 25%;
        justify-content: flex-end;
    }
</style>