import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions() // busca todas as informações de ormconfig.json

  return createConnection(
    Object.assign(defaultOptions, { // busca objeto defaultOptions e sobrescreve variável database
      database: process.env.NODE_ENV === 'test' // variável de ambiente NODE_ENV definida no package.json no comando test
        ? './src/database/database.test.sqlite' // banco de dados de teste
        : defaultOptions.database // banco de dados padrão do projeto
    })
  )
}