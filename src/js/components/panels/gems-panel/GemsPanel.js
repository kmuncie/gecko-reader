'use strict';

var _ = require('underscore'),
    template = require('./gems-panel.html');

module.exports = {

   template: template,

   computed: {

      studyContent: function() {
         var chapter = this.$store.state.chapter,
             items = [],
             titleStudyNote, verseZero;

         if (!chapter) {
            return [];
         }

         titleStudyNote = _.find(chapter.commentaries, function(commentary) {
            return !!commentary.label;
         });

         if (titleStudyNote) {
            verseZero = {
               standardCitation: titleStudyNote.label,
               studyNotes: titleStudyNote,
            };
         }

         items = _.chain([ verseZero ])
            .concat(_.map(chapter.verses, function(verse) {
               return {
                  studyNotes: _.find(chapter.commentaries, function(commentary) {
                     return commentary.source === verse.vsID;
                  }),
                  standardCitation: verse.standardCitation,
               };
            }))
            .filter(_.identity)
            .value();

         return items;
      },

   },

};
