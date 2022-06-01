const config = {
    verbose: true,
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.js'],
    testPathIgnorePatterns: ['node_modules', 'dist'],
    transform: {
        '^.+\\.tsx$': 'ts-jest',
    },
    moduleFileExtensions: ['js','ts','tsx','jsx', 'json', 'node'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transformIgnorePatterns: ['node_modules/(?!(enzyme|react-native-web)/)'],
    // moduleDirectories: ['node_modules', 'src/__test__/utils',__dirname],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: false,
        },
    },
};
