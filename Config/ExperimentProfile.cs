using AutoMapper;
using forex_experiment.Domain;
using forex_experiment.Models;
namespace forex_experiment.Config
{
    public class ForexExperimentProfile:Profile
    {
        public ForexExperimentProfile()
        {
            CreateMap<ForexExperiment, ForexExperimentMongo>()
                .ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<ForexExperimentMongo, ForexExperiment>()
                .ForMember(x => x.sessions, opt => opt.Ignore());
        }

    }
}