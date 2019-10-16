import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/html'

import { withClassPropertiesKnobs } from '../../../.storybook/withClassKnobsProperties'
import CounterElement from './counter-element'

const stories = storiesOf('Counter component', module)

stories.addDecorator(withKnobs)

stories.add('with a button', () => withClassPropertiesKnobs(CounterElement), {
    notes: 'Hello docss',
})
