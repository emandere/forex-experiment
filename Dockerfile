FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app


# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and buildb
COPY . ./

RUN npm install -g @angular/cli
RUN cd /app/ClientApp/ && ng build -prod --output-path=/app/ClientApp/dist

RUN dotnet build
RUN dotnet publish -c Release -o out




# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
RUN mkdir /ClientApp
COPY --from=build-env /app/out .
COPY --from=build-env /app/ClientApp/dist /app/ClientApp/.
ENTRYPOINT ["dotnet", "forex-experiment.dll"]