export default {
    bind: function() {
        let el = $(this.el);
        el.on('scroll', function(event) {
            let height = parseFloat(el.hegiht());
            let scrollTop = parseFloat(el.scrollTop());
            let totalHeight = height + scrollTop;
            if(el[0].scrollHeight - totalHeight <=3){
            	this.vm[this.expression]()
            }
        });

    }
}
