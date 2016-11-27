<template>
    <dl class="g-list r-list m-border">
        <dt>
            <strong>供应商</strong>
            <span>{{card}}</span>
        </dt>
        <dd class="g-table-fix">
            <div class="g-cell">
                <strong>车牌号</strong>
                <span>{{card.tds.TRANSPORTER_ID.value}}</span>
            </div>
            <div class="g-cell">
                <strong>总重量</strong>
                <span>{{card.tds.WEIGHT.value}}</span>
            </div>
        </dd>
        <dd>
            <strong>产地</strong>
            <span>{{card.tds.AREA_ORIGIN_NAME.value}}</span>
        </dd>
        <dt>
            <strong>进场日期</strong>
            <span>{{card.tds.IN_DATE.value}}</span>
        </dt>
    </dl>
</template>
