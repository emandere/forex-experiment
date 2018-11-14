using System.Threading.Tasks;
using System.Collections.Generic;
using forex_experiment.Models;

namespace forex_experiment.Repository
{
    public interface IForexRepository
    {
        //Task<IEnumerable<ForexExperiment>> GetAllNotes();
        Task<IEnumerable<ForexExperiment>> GetAllExperiments();
        Task AddExperiment(ForexExperiment item);
        Task PushTradingStrategySession(TradingSession item);
        Task DeleteExperiment(string name);
    }
}
