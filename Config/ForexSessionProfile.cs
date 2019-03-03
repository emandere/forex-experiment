using System;
using AutoMapper;
using forex_experiment.Domain;
using forex_experiment.Models;
namespace forex_experiment.Config
{
    public class ForexSessionProfile:Profile
    {
        public ForexSessionProfile()
        {
            CreateMap<ForexSession, ForexSessionMongo>();
            CreateMap<ForexSessionMongo, ForexSession>()
                .ForMember
                ( dest=>dest.StartDate,
                        opts=>opts.MapFrom
                        (
                            src => DateTime.Parse(src.StartDate).ToString("yyyy-MM-dd")
                        )
                )
                .ForMember
                (dest=>dest.EndDate,
                        opts=>opts.MapFrom
                        (
                            src => DateTime.Parse(src.EndDate).ToString("yyyy-MM-dd")
                        )
                );

            CreateMap<SessionUser,SessionUserMongo>();
            CreateMap<SessionUserMongo,SessionUser>();

            CreateMap<Accounts,AccountsMongo>();
            CreateMap<AccountsMongo,Accounts>();

            CreateMap<Account,AccountMongo>();
            CreateMap<AccountMongo,Account>();

            CreateMap<BalanceHistory,BalanceHistoryMongo>();
            CreateMap<BalanceHistoryMongo,BalanceHistory>();

            CreateMap<Trade,TradeMongo>();
            CreateMap<TradeMongo,Trade>();

            CreateMap<Order,OrderMongo>();
            CreateMap<OrderMongo,Order>();
               
        }

    }
}