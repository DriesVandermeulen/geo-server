module.exports = Backbone.Model.extend({
    defaults: {
        _id: '',
        __v: '',
        name: '',
        created_at: ''
    },
    created_at_formatted: function() {
        var date = new Date(this.created_at);
        return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    },
    restUrl : function() {
        return this.id ? "/api/experiments" : "/api/experiments/" + this._id;
    },
    routerUrl : function() {
        return this.id ? "/#/experiments" : "/#/experiments/" + this._id;
    },
    toTemplateJSON: function() {
        var attr = this.toJSON();
        attr.restUrl = this.restUrl;
        attr.routerUrl = this.routerUrl;
        attr.created_at_formatted = this.created_at_formatted;
        return attr;
    }
});