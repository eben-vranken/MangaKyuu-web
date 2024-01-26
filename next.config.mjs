// next.config.mjs
import path from 'path';

export default {
    webpack: (config, { isServer }) => {
        // Add this rule for binary files
        config.module.rules.push({
            test: /\.(node)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        });

        return config;
    },
};
