module.exports = Backbone.Model.extend({
    defaults: {
        _id: '',
        __v: '',
        latitude: '',
        longitude: '',
        experiment: '',
        created_at: ''
    },
    created_at_formatted: function() {
        var date = new Date(this.created_at);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    },
    created_at_formatted_time: function() {
        var date = new Date(this.created_at);
        return date.getHours() + ':' + date.getMinutes();
    },
    toTemplateJSON: function() {
        var attr = this.toJSON();
        attr.created_at_formatted = this.created_at_formatted;
        attr.created_at_formatted_time = this.created_at_formatted_time;
        return attr;
    }
});