FROM emandere/forex-experiment-base AS build-env
WORKDIR /app
# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore
RUN dotnet build
RUN dotnet publish -c Release -o out

# Copy everything else and buildb
COPY . ./

RUN cd /app/ClientApp/ && npm run build -- --output-path=/app/ClientApp/dist --configuration production






# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
RUN mkdir /ClientApp
RUN mkdir /ClientApp/dist
COPY --from=build-env /app/out .
COPY --from=build-env /app/ClientApp/dist/. /app/ClientApp/dist
ENTRYPOINT ["dotnet", "forex-experiment.dll"]