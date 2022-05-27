# Padrões de sintaxe para o código do projeto
# Default code sintex to project 


variables -> camelCase 
  # exemple: const playerController = ''

files ->  kebab-case
  # exemple: player-controller.ts

functions -> camelCase 
  # exemple: function playerController() {}

class -> PascalCase 
  # exemple: class PlayerController {}

objects -> snake_case 
  # exemples: 
  # {
  #   property_x: 'value'
  # }
  
parameters -> snake_case 
  # function (param_case: string) {}

constructor params -> camelCase
  # constructor(private createPlayerBusinessLogic: CreatePlayerBusinessLogic) {}

routes -> kebab-case
  # exemple: app.post('/players/player-create')
