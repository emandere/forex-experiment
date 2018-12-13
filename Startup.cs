using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using AutoMapper;

using forex_experiment.Models;
using forex_experiment.Repository;
using forex_experiment.Mapper;
using forex_experiment.Domain;
using forex_experiment.Config;

namespace forex_experiment
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<Settings>(options =>
            {
                options.ConnectionString 
                    = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                options.Database 
                    = Configuration.GetSection("MongoConnection:Database").Value;
            });
            ConfigureCommonServices(services);
            //services.AddTransient<IForexRepository,ForexRepository>();
        }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.Configure<Settings>(options =>
            {
                options.ConnectionString 
                    = Configuration.GetSection("MongoConnection:ConnectionStringDev").Value;
                options.Database 
                    = Configuration.GetSection("MongoConnection:Database").Value;
            });
            ConfigureCommonServices(services);

        }


        public void ConfigureCommonServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ForexExperimentProfile());
            });
            IMapper mapper = config.CreateMapper();
            
            services.AddTransient<IForexRepository,ForexRepository>();
            services.AddTransient<ForexExperimentMap,ForexExperimentMap>();
            services.AddSingleton(mapper);
            services.AddAutoMapper();
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            //app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseSpaStaticFiles();
            
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

        }
    }
}
