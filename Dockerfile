FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app


# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and buildb
COPY . ./

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -yq nodejs build-essential
RUN node -v
RUN npm install -g npm
RUN npm install
RUN npm update
RUN npm install -g @angular/cli
RUN npm install --save-dev @angular-devkit/build-angular
RUN cd /app/ClientApp/ && ng version
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