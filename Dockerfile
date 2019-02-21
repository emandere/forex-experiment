FROM emandere/forex-experiment-base AS build-env
WORKDIR /app
# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN cd /app/ClientApp/ && npm install
RUN cd /app/ClientApp/ && npm run build -- --output-path=/app/ClientApp/dist --configuration production


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