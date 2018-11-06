FROM emandere/forex-experiment-base AS build-env
WORKDIR /app

RUN cd /app/ClientApp/ && npm install -g npm
RUN cd /app/ClientApp/ && npm update
RUN cd /app/ClientApp/ && npm run build -- --output-path=/app/ClientApp/dist --configuration production
#RUN cd /app/ClientApp/ && npm install -g @angular/cli
#RUN cd /app/ClientApp/ && npm install --save-dev @angular-devkit/build-angular
#RUN cd /app/ClientApp/ && ng version
#RUN cd /app/ClientApp/ && ng build -prod --output-path=/app/ClientApp/dist

RUN dotnet build
RUN dotnet publish -c Release -o out



# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
RUN mkdir /ClientApp
RUN mkdir /ClientApp/dist
COPY --from=build-env /app/out .
COPY --from=build-env /app/ClientApp/dist/. /app/ClientApp/dist
ENTRYPOINT ["dotnet", "forex-experiment.dll"]