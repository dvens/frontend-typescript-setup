interface Window {
    EnvironmentSettings: {
        environment: string;
    };
}

declare module '*.scss' {
    const value: string;
    export default value;
}

declare module '*.njk' {
    const value: {
        render: Function;
    };
    export default value;
}

declare module '*.md' {
    const value: string;
    export default value;
}

declare module '*.json' {
    const value: any;
    export default value;
}
