@E-Mello

<!-- WebPage for help: https://maximorlov.com/4-reasons-why-your-docker-containers-cant-talk-to-each-other/#:~:text=Containers%20can%20only%20communicate%20with,can%20have%20multiple%20containers%20inside. -->

### You can check the IP address of the database service with the command docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name>

### You can check if the PostgreSQL service is running correctly, by connecting to the database service's shell:

    $ docker exec -it database sh

### To check the network, you can use the `docker network inspect command`. The syntax is docker network inspect <network-name>

### You can also use the --format option to display the output in a more human-readable format. For example, you can use the following command to show the network's IP address range in a more concise way:

    $ docker network inspect --format '{{ .IPAM.Config }}' mynetwork

### For example, if you only want to see the network's driver, you can use the following command:

    $ docker network inspect --format '{{ .Driver }}' mynetwork

### You can also use the jq command-line tool to parse the JSON output and extract specific information. For example, if you want to see only the IPAM configuration of the network, you can use the following command:

    $ docker network inspect mynetwork | jq '.[].IPAM'

### List all networks a container belongs to

    $ docker inspect -f '{{range $key, $value := .NetworkSettings.Networks}}{{$key}} {{end}}' [container]

### List all containers belonging to a network by name

    $ docker network inspect -f '{{range .Containers}}{{.Name}} {{end}}' [network]

### Attach a running container to a network

    $ docker network connect [network] [container]

### Start a container attached to a specific network

    $ docker run --network [network] [container]

### With containerA already running, test if containerA can connect to containerB by using its name

    $ docker exec [containerA] ping [containerB] -c2

### Create a network

    $ docker network create [network]

### Find out if an IP address is reachable from a container

    $ docker exec [container] ping [ip_address] -c2

### Get a container's IP address inside a specific network

    $ docker inspect -f '{{.NetworkSettings.Networks.[network].IPAddress}}' [container]

### Get ICC setting for a specific network

    $ docker inspect -f '{{index .Options "com.docker.network.bridge.enable_icc"}}' [network]

### Create a network and explicitly enable ICC

    $ docker network create -o com.docker.network.bridge.enable_icc=true [network]
