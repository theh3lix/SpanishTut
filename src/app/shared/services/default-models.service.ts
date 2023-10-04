import { Settings } from "src/app/features/vocabulary/models/settings.model"
import { Stats } from "src/app/features/vocabulary/models/stats.model"

export class DefaultModelsService {
    defaultSettingsModel() : Settings {
        return {
          wordsAmount: 0,
          exerciseType: '1',
          categories: []
        }
      }
    
      defaultStatsModel() : Stats {
        return {
          totalWords: 0,
          guessedWords: 0,
          correctGuesses: 0,
          wrongGuesses: 0,
          message: ''
        }
      }
}