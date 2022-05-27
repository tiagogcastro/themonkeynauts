import { ListLogsController } from './ListLogsController'
import { ListLogsBusinessLogic } from './ListLogsBusinessLogic'
import { LogsRepository } from '../../repositories/implementations/LogsRepositories'

const logsRepository = new LogsRepository()

const listLogsBusinessLogic = new ListLogsBusinessLogic(logsRepository)

const listLogsController = new ListLogsController(listLogsBusinessLogic)

export {
  listLogsController,
  listLogsBusinessLogic,
}