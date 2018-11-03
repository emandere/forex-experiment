FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app


# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and buildb
COPY . ./

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm
RUN npm install
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