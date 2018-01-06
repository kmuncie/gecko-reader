'use strict';

var Vue = require('vue'),
    VueRouter = require('vue-router'),
    VuexRouterSync = require('vuex-router-sync'),
    template = require('./app.html'),
    store = require('../store/index'),
    NavigationBar = require('../components/navigation-bar/NavigationBar'),
    BookPicker = require('../components/panels/book-picker/BookPicker'),
    ChapterPicker = require('../components/panels/chapter-picker/ChapterPicker'),
    ReadingPanel = require('../components/panels/reading-panel/ReadingPanel'),
    router;

Vue.use(VueRouter);

router = new VueRouter({
   routes: [
      {
         path: '/',
         name: 'bookSelection',
         component: BookPicker,
      },
      {
         path: '/:book',
         name: 'chapterSelection',
         component: ChapterPicker,
      },
      {
         path: '/:book/:chapter',
         name: 'readingPage',
         component: ReadingPanel,
      },
   ],
});

VuexRouterSync.sync(store, router);

module.exports = Vue.extend({

   template: template,
   router: router,
   store: store,

   components: {
      'navigation-bar': NavigationBar,
   },

   data: function() {
      return {
         navigationItems: [
            { title: 'Home', route: { name: 'bookSelection' } },
         ],
      };
   },

   created: function() {
      this.$store.dispatch('fetchLanguages')
         .then(function() {
            return this.$store.dispatch('fetchEdition', 'nwtsty');
         }.bind(this))
         .done();
   },

});
