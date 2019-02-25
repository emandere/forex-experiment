using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using forex_experiment.Mapper;
using forex_experiment.Domain;

namespace forex_experiment.Controllers
{
    [Route("api/[controller]")]
    public class SessionController:ControllerBase
    {
        private readonly ForexExperimentMap _forexExperimentMap;
        public SessionController(ForexExperimentMap forexExperimentMap)
        {   
            _forexExperimentMap = forexExperimentMap;
        }
        [HttpGet("[action]/{id}")]
        public async Task<ActionResult> GetSession(string id)
        {
            var sessionVar = new 
            { 
                session=await _forexExperimentMap.GetForexSession(id)
            };
            return Ok(JsonConvert.SerializeObject(sessionVar));
        }

    }
}