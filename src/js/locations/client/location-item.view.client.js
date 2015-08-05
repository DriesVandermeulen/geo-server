module.exports = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#location-item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toTemplateJSON()));
        return this;
    }
});





