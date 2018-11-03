FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app


# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and buildb
COPY . ./
RUN dotnet build
RUN dotnet publish -c Release -o out

WORKDIR /app/ClientDist
RUN ng build -prod --output-path=/app/ClientDist/dist


# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
RUN mkdir /ClientDist
COPY --from=build-env /app/out .
COPY --from=build-env /app/ClientDist/dist /app/ClientDist/dist
ENTRYPOINT ["dotnet", "forex-experiment.dll"]