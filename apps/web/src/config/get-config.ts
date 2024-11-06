export type Config = {
  api: {
    url: string
  }
}

let config: Config

function createConfig(): Config {
  return {
    api: {
      url: import.meta.env.VITE_API_URL ?? '/api'
    }
  }
}

export function getConfig() {
  if (!config) {
    config = createConfig()
  }
  return config
}
