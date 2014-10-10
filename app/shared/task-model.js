(function(that) {
  that.Task = function(id, name, description, schemaMap) {
    this.id = id;
    this.name = id;
    this.description = description;
    this.schemaMap = schemaMap;
  };

  that.Task.prototype = {
    addToSchemaField: function(key, value) {
      this.schemaMap[key] = value;
    }
  };

  that.TaskData = function() {
    this.fieldNameToValue = {};
  };

  that.TaskData.prototype = {
    addToData: function(key, value) {
      this.fieldNameToValue[key] = value;
    }
  }

  that.KeyValuePair = function(key, value) {
    this.key = key;
    this.value = value;
  }

})(this)
