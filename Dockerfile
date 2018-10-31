FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app
RUN npm install

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out


WORKDIR /app/ClientApp
RUN npm build 

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "forex-experiment.dll"]