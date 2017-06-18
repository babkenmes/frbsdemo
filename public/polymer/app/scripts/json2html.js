
/**
 * jQuery json-viewer
 * @author: Alexandre Bodelot <alexandre.bodelot@gmail.com>
 */
(function($){

  /**
   * Check if arg is either an array with at least 1 element, or a dict with at least 1 key
   * @return boolean
   */
  function isCollapsable(arg) {
    return arg instanceof Object && Object.keys(arg).length > 0;
  }

  /**
   * Check if a string represents a valid url
   * @return boolean
   */
  function isUrl(string) {
     var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
     return regexp.test(string);
  }

  /**
   * Transform a json object into html representation
   * @return string
   */
  function json2html(json, options) {
    var html = '';
    if (typeof json === 'string') {
      // Escape tags
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (isUrl(json))
        html += '<a href="' + json + '" class="json-string">' + json + '</a>';
      else
        html += '';
    }
    else if (typeof json === 'number') {
      html += '';
    }
    else if (typeof json === 'boolean') {
      html += '';
    }
    else if (json === null) {
      html += '';
    }
    else if (json instanceof Array) {
      if (json.length > 0) {
        html += '[<ol class="json-array">';
        for (var i = 0; i < json.length; ++i) {
          html += '<li>'
          // Add toggle button if item is collapsable
          if (isCollapsable(json[i])) {
            html += '<a href class="json-toggle"></a>';
          }
          html += json2html(json[i], options);
          // Add comma if item is not last
          if (i < json.length - 1) {
            html += ',';
          }
          html += '</li>';
        }
        html += '</ol>]';
      }
      else {
        html += '[]';
      }
    }
    else if (typeof json === 'object') {
      var key_count = Object.keys(json).length;
      if (key_count > 0) {
        html += '&nbsp<ul class="json-dict">';
        for (var key in json) {
          if (json.hasOwnProperty(key)) {
            if(typeof json[key] !== 'object') {
              html += '<li key="' + key + '">';  
            } else {
              html += '<li key="' + key + '">';
            }
            var keyRepr = options.withQuotes ?
              '<span class="json-string" >"' + key + '"</span>' : key;
            // Add toggle button if item is collapsable
            if (isCollapsable(json[key])) {
              html += '<a href class="json-toggle"><span class="key-val">' + keyRepr + '</span><i class="fa fa-arrows sort-icon icon"></i><i class="icon new-icon fa fa-plus"></i><i class="remove-icon fa fa-times icon"></i></a>';
            }
            else {
              html += '<span class="key-val">' + keyRepr + '</span>';
            }
            html += ' ' + json2html(json[key], options);
            if (!isCollapsable(json[key])) {
              html += '<i class="fa fa-arrows sort-icon icon"></i><i class="new-icon fa fa-plus icon"></i><i class="edit-icon fa fa-pencil icon"></i><i class="remove-icon fa fa-times icon"></i>';
            }
            // Add comma if item is not last
            if (--key_count > 0) {
              html += '</li>';
            }
          }
        }
        html += '</ul>&nbsp';
      }
      else {
        html += '&nbsp';
      }
    }
    return html;
  }

  /**
   * jQuery plugin method
   * @param json: a javascript object
   * @param options: an optional options hash
   */
  $.fn.jsonViewer = function(json, options) {
    options = options || {};

    // jQuery chaining
    return this.each(function() {

      // Transform to HTML
      var html = json2html(json, options)
      if (isCollapsable(json))
        html = '<a href class="json-toggle"></a>' + html;

      // Insert HTML in target DOM element
      $(this).html(html);

      // Bind click on toggle buttons
      $(this).off('click');
      $(this).on('click', 'a.json-toggle', function( e ) {
        if($(e.target).is('a.json-toggle')){
          var target = $(this).toggleClass('collapsed').siblings('ul.json-dict, ol.json-array');
          target.toggle();
          if (target.is(':visible')) {
            target.siblings('.json-placeholder').remove();
          }
          else {
            var count = target.children('li').length;
            var placeholder = count + (count > 1 ? ' items' : ' item');
            target.after('<a href class="json-placeholder">' + placeholder + '</a>');
          }
          return false;
        }
      });

      // Simulate click on toggle button when placeholder is clicked
      $(this).on('click', 'a.json-placeholder', function() {
        $(this).siblings('a.json-toggle').click();
        return false;
      });

      if (options.collapsed == true) {
        // Trigger click to collapse all nodes
        $(this).find('a.json-toggle').click();
      }
    });
  };
})(jQuery);
