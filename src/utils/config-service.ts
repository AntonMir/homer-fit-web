export default class ConfigService {
  public get(key: string | undefined): string {
    try {
      const result = key && process.env[key];
      if (!result) {
        throw new Error(`Environment variable "${key}" is not set!`);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
