import { expect } from '@playwright/test';
import test from '../fixtures';

import projectsData from '../../resources/projects.json';

test.describe('My Projects', () => {
  test('should show all projects defined in config', async ({ portfolio }) => {
    await portfolio.header.goTo('My Projects');
    const projectNames = await portfolio.myProjects.getAllProjectNames();
    projectsData.forEach((project) => {
      const projectName = project.link ? `${project.name} 🔗` : project.name;
      expect(projectNames).toContain(projectName);
    });
  });
});
