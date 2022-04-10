const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/text-share',
    '<rootDir>/apps/api',
  ],
};
