<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6>確認刪除商品?</h6>
          </div>
          <div class="modal-body">
            <p>以下商品將被刪除:</p>
          </div>
          <div class="modal-footer">
            <b-button pill variant="outline-secondary">取消</b-button>
            <b-button pill variant="outline-secondary">確認</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemoveProductModal"
}
</script>

<style scoped>

.modal-overlay {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000da;
}

.modal {
  display: block;
}


</style>
