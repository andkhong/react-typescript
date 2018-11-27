declare const process: {
  readonly env: {
    readonly NODE_ENV: 'development' | 'production';
    readonly SETTINGS: {
      
    };
  };
}

export const { SETTINGS } = process.env;