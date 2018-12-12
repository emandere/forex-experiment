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
    //[Route("api/[controller]/[action]")]
    //[ApiController]
    [Route("api/[controller]")]
    public class ExperimentController : ControllerBase
    {
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

    }

}