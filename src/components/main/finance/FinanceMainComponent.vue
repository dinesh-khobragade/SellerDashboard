<template>
<div class="container">
  <h1>Finance Main</h1>
  <app-amounts></app-amounts>
  <app-pending-payments></app-pending-payments>
  <app-payment-history></app-payment-history>
</div>
</template>

<script>
    import AmountsComponent from "./AmountsComponent";
    import PendingPaymentsComponent from "./PendingPaymentsComponent";
    import PaymentHistoryComponent from "./PaymentHistoryComponent";

    export default {
      components: {
        appAmounts:AmountsComponent,
        appPendingPayments:PendingPaymentsComponent,
        appPaymentHistory:PaymentHistoryComponent
      }
    }
</script>

<style scoped>

</style>
