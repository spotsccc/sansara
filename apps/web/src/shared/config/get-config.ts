export type Config = {
  api: {
    url: string
  }
}

let config: Config

function createConfig(): Config {
  return {
    api: {
      url: 'http://localhost:3000'
    }
  }
}

export function getConfig() {
  if (!config) {
    config = createConfig()
  }
  return config
}
