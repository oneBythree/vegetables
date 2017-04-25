export default {
    bind: function() {
        this.handler = function(event) {
            this.el.value = this.el.value.replace(/^[^\d.]+$/, '')
        }.bind(this)
        this.el.addEventListener('input', this.handler)
    },
    unbind: function() {
        this.el.removeEventListener('input', this.handler)
    }
}
