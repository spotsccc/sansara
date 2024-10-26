export type Config = {
  api: {
    url: string
  }
}

let config: Config

function createConfig(): Config {
  return {
    api: {
      url: '/api'
    }
  }
}

export function getConfig() {
  if (!config) {
    config = createConfig()
  }
  return config
}
