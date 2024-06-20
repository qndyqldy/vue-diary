<script setup lang="ts">
    import {Button} from "@/types/button.ts";

    const props = defineProps<{
        title: string;
        leftChild?: Button;
        rightChild?: Button;
    }>();
</script>

<template>
    <header class="Header">
        <template v-if="props.leftChild">
            <div class="header_left">
                <component
                    :is="props.leftChild.component"
                    :text="props.leftChild.text"
                    :type="props.leftChild.type"
                    @on-click="props.leftChild.click"/>
            </div>
        </template>
        <div class="header_center">
            {{props.title}}
        </div>
        <template v-if="props.rightChild">
            <div class="header_right">
                <component
                    :is="props.rightChild.component"
                    :text="props.rightChild.text"
                    :type="props.rightChild.type"
                    @on-click="props.rightChild.click"/>
            </div>
        </template>
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