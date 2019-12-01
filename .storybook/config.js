import {
    configure,
    addDecorator
} from '@storybook/html';
import {
    withA11y
} from '@storybook/addon-a11y';

import './globalStyles.scss';

const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addDecorator(withA11y);
configure(loadStories, module);
