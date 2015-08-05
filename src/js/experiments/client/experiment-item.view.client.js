module.exports = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#experiment-item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toTemplateJSON()));
        return this;
    }
});





