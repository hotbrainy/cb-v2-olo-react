module.exports = {
    stories    : [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons     : [
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        '@storybook/preset-create-react-app',
        'storybook-addon-designs'
    ],
    staticDirs : [
        // '../static',
        '../public'
    ],
    features   : {
        // emotionAlias : false,
        previewMdx2 : true // 👈 MDX 2 enabled here
    },
    framework  : '@storybook/react',
    core       : {
        builder : '@storybook/builder-webpack5'
    }
};