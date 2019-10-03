import { storiesOf } from "@storybook/html";

import "./counter-element";

storiesOf("Hello component", module).add(
    "Hello story",
    () => {
        return `<counter-element></counter-element>`;
    },
    { notes: "Hello docss" }
);
