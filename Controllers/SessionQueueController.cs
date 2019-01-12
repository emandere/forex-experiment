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
    public class SessionQueueController:ControllerBase
    {
        private readonly ForexExperimentMap _forexExperimentMap;
       
        public SessionQueueController(ForexExperimentMap forexExperimentMap)
        {   
            _forexExperimentMap = forexExperimentMap;
        }
        ///api/sessionqueue/GetQueuedSessions
        [HttpGet("[action]")]
        public async Task<ActionResult> GetQueuedSessions()
        {
            var sessionQueueVar=new {
                sessions= await _forexExperimentMap.GetAllQueuedSessions()   
            };
            return Ok(JsonConvert.SerializeObject(sessionQueueVar));
        }

        ///api/sessionqueue/GetInProcessSessions
        [HttpGet("[action]")]
        public async Task<ActionResult> GetInProcessSessions()
        {
            var sessionQueueVar=new {
                sessions= await _forexExperimentMap.GetInProcessSessions()   
            };
            return Ok(JsonConvert.SerializeObject(sessionQueueVar));
        }
    }
}