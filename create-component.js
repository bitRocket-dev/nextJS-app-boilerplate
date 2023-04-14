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
  pages: 'Page component',
};

const ROUTE_TYPES = {
  dynamic: 'Dynamic Route',
  static: 'Static Route',
};
const PROPS_TYPES = {
  server: 'Server Props',
  static: 'Static Props',
};
const FOLDER_TYPES = {
  folder: 'Create new folder',
  main: 'Create on page directory',
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
      {
        type: 'list',
        name: 'routeType',
        message: 'Select Route type:',
        choices: Object.values(ROUTE_TYPES),
        when: answers => answers.componentType === 'Page component',
      },
      {
        type: 'list',
        name: 'propsType',
        message: 'Select Props type:',
        choices: Object.values(PROPS_TYPES),
        when: answers => answers.componentType === 'Page component',
      },
      {
        type: 'list',
        name: 'folderType',
        message: 'Select Folder type:',
        choices: Object.values(FOLDER_TYPES),
        when: answers => answers.componentType === 'Page component',
      },
    ])
    .then(({ componentName, componentType, hasTest, hasStory, routeType, propsType, folderType }) => {
      const componentTypeKey = Object.keys(COMPONENT_TYPES).find(key => COMPONENT_TYPES[key] === componentType);
      const folderTypeKey = Object.keys(FOLDER_TYPES).find(key => FOLDER_TYPES[key] === folderType);
      const dirPath = path.join(
        process.cwd(),
        componentTypeKey === 'components.ui'
          ? 'common/components.ui'
          : componentTypeKey === 'components-shared'
          ? 'common/components-shared'
          : componentTypeKey === 'utils'
          ? 'common/utils'
          : componentTypeKey === 'hooks'
          ? 'common/hooks'
          : folderTypeKey === 'folder' && routeType === 'Static Route'
          ? `pages/${componentName}`
          : folderTypeKey === 'folder' && routeType === 'Dynamic Route'
          ? `pages/[${componentName}]`
          : 'pages',
      );
      const componentNameUpper = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      const componentFilePath = path.join(
        dirPath,
        folderTypeKey === 'folder'
          ? `index.tsx`
          : folderTypeKey === 'main' && routeType === 'Dynamic Route'
          ? `[${componentName}].tsx`
          : componentTypeKey === 'pages' && routeType === 'Static Route'
          ? `${componentName}.tsx`
          : `${componentNameUpper}.tsx`,
      );

      if (fs.existsSync(componentFilePath)) {
        console.error(`Component "${componentName}" already exists!`);
        process.exit(1);
      }

      fs.mkdirSync(dirPath, { recursive: true });

      let componentContent = '';

      if (componentTypeKey === 'components.ui') {
        componentContent = `
import { memo } from 'react';

import styled from '@emotion/styled';

// #region: STYLED
const Styled${componentNameUpper}Container = styled.div\({
/* Add your styles here */
\});
// #endregion
            
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
import { i18n } from 'next-i18next';

// #region: STYLED
const Styled${componentNameUpper}Container = styled.div\({
/* Add your styles here */
\});
// #endregion
                    
interface Props {
label?: string;
/* Add your props here */
}
                    
export const ${componentNameUpper} = memo(({ label="default" }: Props) => (
   <Styled${componentNameUpper}Container>
   {i18n?.t(label)}
   </Styled${componentNameUpper}Container>
   )
);
`;
      } else if (componentTypeKey === 'utility') {
        componentContent = `
export const ${componentNameUpper} = () => {
 // Add your utility function here
};
        `;
      } else if (componentTypeKey === 'hook') {
        componentContent = `
export const ${componentNameUpper} = () => {
// Add your hook function here
 const count = 0;
  return {
// Add your return here
   count
}
};
                `;
      } else if (componentTypeKey === 'pages') {
        if (propsType === 'Static Props') {
          if (routeType === 'Static Route') {
            componentContent = `
import styled from '@emotion/styled';
import { NextPageContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// #region: STYLED
const StyledContainer = styled.div({
/* Add your styles here */
});
// #endregion

        
export async function getStaticProps({ locale }: NextPageContext) {
 if (!locale) {
  return {
   notFound: true,
};
}
        
return {
 props: {
  ...(await serverSideTranslations(locale, ['common'])),
},
};
}
        
export default () => (
  <StyledContainer>
   <h1> {i18n?.t('page')}</h1>
  </StyledContainer>
);
`;
          } else if (routeType === 'Dynamic Route') {
            componentContent = `
import styled from '@emotion/styled';
import { NextPageContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// #region: STYLED
const StyledContainer = styled.div({
  /* Add your styles here */
  });
// #endregion

  export const getStaticPaths = () => ({
    paths: [
      // if no locale is provided only the defaultLocale will be generated
      { params: { ${componentName}: 'test1' }, locale: 'en' },
      { params: { ${componentName}: 'test1' }, locale: 'it' },
    ],
    fallback: true,
  });
          
                  
export async function getStaticProps({ locale }: NextPageContext) {
 if (!locale) {
  return {
   notFound: true,
};
}
                  
return {
 props: {
  ...(await serverSideTranslations(locale, ['common'])),
},
};
}
                  
export default () => (
  <StyledContainer>
   <h1> {i18n?.t('page')}</h1>
  </StyledContainer>
);
`;
          }
        } else if (propsType === 'Server Props') {
          componentContent = `
          /** @format */

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// #region: STYLED
const StyledContainer = styled.div({
/* Add your styles here */
});
// #endregion
          
export const getServerSideProps: GetServerSideProps = async context => {
 const locale = context.locale || context.defaultLocale;
  if (!locale) {
   return {
    notFound: true,
};
}
          
const translations = await serverSideTranslations(locale, ['common']);
          
  return {
    props: {
      ...translations,
// other props for the page component
},
};
};
        
export default () => (
  <StyledContainer>
   <h1> {i18n?.t('page')}</h1>
  </StyledContainer>
);
`;
        }
      }

      fs.writeFileSync(componentFilePath, componentContent);

      console.log(`Component "${componentName}" created successfully as "${componentType}" component!`);

      if (hasTest) {
        componentContent = `
/** @format */

import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { ${componentNameUpper} } from '../common/${componentTypeKey}/${componentNameUpper}';
        
describe('${componentNameUpper}', () => {
  test('renders without errors', () => {
  render(<${componentNameUpper} label="Click Me" />);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
});
            
`;
        const componentFilePath = path.join('./_test_', `${componentName}.test.tsx`);
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
