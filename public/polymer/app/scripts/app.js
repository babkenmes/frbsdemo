(function(document) {
  'use strict';
  
  var app = document.querySelector('#app');
  app.getJson = function ( path ) {

          var a = new Promise( function ( resolve, reject ) {
          var ref = firebase.database().ref( path );
          ref.on('value',function( data ) { 
            resolve( data.val() )
          },function( data ){
              reject( data.code )
            });
          });
          return a;
        }
  app.dbData = app.getJson();
  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Toggle Drawer
  app.toggleDrawer = function() {
    var drawerPanel = document.getElementById('paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.togglePanel();
    } else {
      drawerPanel.classList.toggle('collapsed-menu');
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    // document.getElementById('mainContainer').scrollTop = 0;
  };

  // Initial widgets cols number
  app.cols = '2';

  // Firebase location
  app.location;

  // Sign out user
  app.signOut = function() {
    this.$.data.signOut();
  };

  // Sign in user
  app.signIn = function() {
    this.$.data.signIn();
  };

})(document);
