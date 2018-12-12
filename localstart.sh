#!/bin/bash
set +e
declare -r volumecount=$(docker.exe volume ls -qf dangling=true | wc -l)
if [ $volumecount -gt 0 ]
then
   docker.exe volume rm -f $(docker.exe volume ls -qf dangling=true)
fi

declare -r rmicount=$(docker.exe images -q --filter "dangling=true" | wc -l)
if [ $rmicount -gt 0 ]
then
   docker.exe rmi -f  $(docker.exe images -q --filter "dangling=true")
fi

declare -a tags=("forexapp" "importdatafromcloud" "strategyapp" "forex-experiment")
docker.exe build -t forexapp github.com/emandere/forex
docker.exe build -t importdatafromcloudapp -f DockerfileImportDataFromCloud github.com/emandere/forex
docker.exe build -t strategyapp -f DockerfileForexStrategyExecute github.com/emandere/forex
docker.exe build -t forex-experiment github.com/emandere/forex-experiment
for tag in "${tags[@]}"
do
   echo "$tag"
    docker.exe rm -f $(docker.exe ps -a -q --filter name="$tag")
   # docker.exe rmi $( docker images -a -q --filter name="$tag" --filter status="running")
done

docker.exe run -d -t -i -p 122:80 --name forexapp --restart=always --link mongo:mongo forexapp > log.txt
docker.exe run -d -t -i -p 8081:80 --name forex-experiment --restart=always --link mongo:mongo forex-experiment
docker.exe run -d -t -i --name importdatafromcloudapp --restart=always --link mongo:mongo importdatafromcloudapp
docker.exe run -d -t -i --name strategyapp --restart=always --link mongo:mongo strategyapp
declare -r rmicountcleanup=$(docker.exe images -q --filter "dangling=true" | wc -l)
if [ $rmicountcleanup -gt 0 ]
then
 docker.exe rmi -f $(docker.exe images -q --filter "dangling=true")
fi
exit