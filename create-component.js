#!/usr/bin/env node
/** @format */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const COMPONENT_TYPES = {
  'components.ui': 'UI component',
  'components-shared': 'Shared component',
  utils: 'Utility function',
  hooks: 'Hook function',
};

function createComponent() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter component name:',
        validate: function (input) {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return 'Component name may only include letters, numbers, underscores and hashes.';
        },
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Select component type:',
        choices: Object.values(COMPONENT_TYPES),
      },
      {
        type: 'confirm',
        name: 'hasTest',
        message: 'Would you like to add this component to unit test?',
        when: answers => answers.componentType === 'UI component' || answers.componentType === 'Shared component',
      },
      {
        type: 'confirm',
        name: 'hasStory',
        message: 'Would you like to add this component to stories?',
        when: answers => answers.componentType === 'UI component' || answers.componentType === 'Shared component',
      },
    ])
    .then(({ componentName, componentType, hasTest, hasStory }) => {
      const componentTypeKey = Object.keys(COMPONENT_TYPES).find(key => COMPONENT_TYPES[key] === componentType);
      const dirPath = path.join(
        process.cwd(),
        componentTypeKey === 'components.ui'
          ? 'common/components.ui'
          : componentTypeKey === 'components-shared'
          ? 'common/components-shared'
          : componentTypeKey === 'utils'
          ? 'common/utils'
          : 'common/hooks',
      );
      const componentFilePath = path.join(dirPath, `${componentNameUpper}.tsx`);

      if (fs.existsSync(componentFilePath)) {
        console.error(`Component "${componentName}" already exists!`);
        process.exit(1);
      }

      fs.mkdirSync(dirPath, { recursive: true });

      const componentNameUpper = componentName.charAt(0).toUpperCase() + componentName.slice(1);

      let componentContent = '';

      if (componentTypeKey === 'components.ui') {
        componentContent = `
import { memo } from 'react';

import styled from '@emotion/styled';

      const Styled${componentNameUpper}Container = styled.div\({
      /* Add your styles here */
      \});
            
      interface Props {
      label?: string;
      /* Add your props here */
      }
            
      export const ${componentNameUpper} = memo(({ label }: Props) =>  <Styled${componentNameUpper}Container>{label}</Styled${componentNameUpper}Container>
        );
        `;
      } else if (componentTypeKey === 'components-shared') {
        componentContent = `
        import { memo } from 'react';

        import styled from '@emotion/styled';
        import { useTranslation } from 'next-i18next';

              const Styled${componentNameUpper}Container = styled.div\({
              /* Add your styles here */
              \});
                    
              interface Props {
              label?: string;
              /* Add your props here */
              }
                    
              export const ${componentNameUpper} = memo(({ label="default" }: Props) => {
                const { t } = useTranslation('common');
                return (
                  <Styled${componentNameUpper}Container>
                  {t(label)}
                  </Styled${componentNameUpper}Container>
                );
                },
                );
                `;
      } else if (componentTypeKey === 'utility') {
        componentContent = `export const ${componentNameUpper} = () => {
          // Add your utility function here
        };
        `;
      } else if (componentTypeKey === 'hook') {
        componentContent = `export const ${componentNameUpper} = () => {
                  // Add your hook function here
                  const count = 0;
                  return {
                    // Add your return here
                    count
                  }
                };
                `;
      }

      fs.writeFileSync(componentFilePath, componentContent);

      console.log(`Component "${componentName}" created successfully as "${componentType}" component!`);

      if (hasTest) {
        componentContent = `
/** @format */

import React from 'react';
import { render } from '@testing-library/react';
import { ${componentNameUpper} } from '../common/${componentTypeKey}/${componentNameUpper}';
        
        describe('${componentNameUpper}', () => {
          test('renders without errors', () => {
            const { getByText } = render(<${componentNameUpper} label="Click Me" />);
            const componentElement = getByText('Click Me');
            expect(componentElement).toBeInTheDocument();
          });
        });
            
`;
        const componentFilePath = path.join('./_test_', `${componentName}.test.jsx`);
        fs.writeFileSync(componentFilePath, componentContent);
      }
      if (hasStory) {
        componentContent = `
        import { ${componentNameUpper} } from '../common/${componentTypeKey}/${componentNameUpper}';

        export default {
          title: "Example/${componentName}",
          component: ${componentNameUpper},
        }

        export const Component = () => <${componentNameUpper} />;
        `;

        const componentFilePath = path.join('./stories', `${componentNameUpper}.stories.tsx`);
        fs.writeFileSync(componentFilePath, componentContent);
      }
    });
}

createComponent();
