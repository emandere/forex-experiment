using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using forex_experiment.Repository;
using forex_experiment.Domain;

namespace forex_experiment.Mapper
{
    public class ForexExperimentMap
    {
        private readonly IMapper _mapper;
        private readonly IForexRepository _forexRepository;
        public ForexExperimentMap(IMapper mapper,IForexRepository forexRepository)
        {
            _mapper = mapper;
            _forexRepository = forexRepository;
        }

        public async Task<IEnumerable<ForexExperiment>> GetExperiments()
        {
            var allExperiments = await _forexRepository.GetAllExperiments();
            return allExperiments.Select((exp)=>_mapper.Map<ForexExperiment>(exp));
        }

    }
}