const { gitDescribeSync } = require('git-describe');
process.env.VUE_APP_GIT_DESCRIPTION = gitDescribeSync({
  match: '[0-9]*',
  dirtyMark: '-unstaged'
});

// console.log(process.env.VUE_APP_GIT_DESCRIPTION);

module.exports = {}