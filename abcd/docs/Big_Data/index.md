# Distrubuted System Overview

Course side:
1. Understand the new issues appearing as datasets grow  
2. Be able to setup a Hadoop cluster and use it  
3. Understand why traditional algorithms fail on big data  
4. Be able to implement advanced algorithms for big data  

Personnal side:
1. Derive algorithms for big data
2. Use and work “inside” Hadoop, Drill, and Spark
3. Relate known strategies to new problems
4. Perform extra research


## Topic 1: New issues for Big data

!!! note "Big Data Issues"
    (1) increase throughput: caching, branch prediction, RAID  
    (2) size of data size: >1T (old definition)   

!!! note "Hadoop/Drill/Spark/..."
    Goal: efficiently analyse massive amount of data  
    Hadoop: **batch job**, latency not important, write on disk  
    Drill: **real-time** job, sql friendly  
    Spark: **real-time** job, good analytics  

!!! note "Zookeeper"
    Configuration Management & Coordination Service.  
    - Dependent of Drill.  
    - No large data-store, allow different nodes in cluster to communicate;  
    - let various applications of hadoop to work together.  
    Node communication (like dbus)  
    Leader/Follower/Observer  

!!! note "YARN"
    "Yet Another Resource Negotiator"  
    Resource Manager (whole system)  
    Node Manager (container)  
    Application Manager (application)  

!!! note "YARN: 3 working options"  
    3 ways of using YARN:  
    1. One application per user job (MapReduce)  
    2. One application per user session (Spark)  
    3. Long-running application shared among users (Drill)  

!!! note "YARN scheduler"
    3 scheduler mode  
    1. FIFO: good for batch  
    2. Capacity: waster resource  
    3. Fair: delay due to the resource reallocation  

    !!! success "Example"
        Total: 100 CPU, 10 TB  
        - A: 2 CPU, 300 GB - (2%, 3%) - 3%  
        - B: 6 CPU, 200 GB - (6%, 1%) - 6%  
        if A have 10 containers, B will have 5 containers.  

!!! note "YARN: workflow"
    1. client request Resource manager (return assigned id)  
    2. request a Node to run Application Master (assigned by Resource Manager->Node Manager, return id)  
    3. Application Master register itself to Resource Manager (later it can apply for resource)  
    4. Application Master request containers from the Resource Manager  
    5. Application Master inform the Node Manager to do the initialization  
    6. Application Master monitor the Running status of all the Node Managers  
    7. Application Master send heartbeat to the client, report the process  
    8. Application Manager undo the register on Resource Manager, Resource Manager shut down the Application Master and stop the tasks, free all the Node Manager.  

!!! note "Hadoop: MapReduce"  
    1. fetch file information  
    2. client submit job to YARN  
    3. YARN calculate the resource, and start the MapTasks  
    4. Read data with gradually increased offset value  
    5. YARN starts Map Task (create a Map Tasks for each split)  
    6. Ring Buffer (>80%)  
    7. Shuffle (quick sort)  
    8. Shuffle (merge sort)  
    9. Local Reducer  
    10. YARN starts Reduce Task (depends on Map Tasks number)  
    11. YARN fetch data to memory (+disk)  
    12. Reduce, output Key Value pair  
    13. Write back to hdfs  

!!! note "HDFS: merge small files"
    why?  
    1. the memory of namenode: meta data  
    2. the latency of fetching too many small files   
    3. timecost of starting too many tasks  
    solutions:  
    1. Hadoop archive (HAR): A MapReduce Task  
    2. SequenceFile / TextFile (Filecrush/Avro): serialize `<key, value>` pair where key is the filename and value is the file content.
    3. CombineFileInputFormat  

!!! note "HDFS: Failure Tolarence"
    #### HDFS: datanode failure
    datanode send heartbeat to namenode every 3 sec
    #### HDFS: network failure
    datanode does not respond the request
    #### HDFS: Data failure
    checksum, data lost if network is unstable, read from other data node

!!! note "HDFS: general"
    - Block Size is 128MB by default
    - Task Size is 128MB by default 
    - Pro: high throughput
    - Con: large latency
    - Inputformat: (1) split big files to blocks (2) merge small files

!!! note "Container"
    A container is an environment with restricted resources where application-specific processes are run.

!!! note "JAVA"
    JVM:  
    JAVA: cross-platform  
    - Default MapReduce Format: LongWritable, TEXT.  
    ```java
    public class MyMapper extends Mapper<LongWritable, Text, Text, IntWritable>{
        @Override
        public void map (LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String[] data = value.toString().split(",");
            Text id = new Text(data[1]);
            IntWritable grade = new IntWritable(Integer.parseInt(data[2]));
            context.write(id, grade);
        }
    }
    ```
    
!!! note "maven"
    ```
    mvn package
    mvn compile
    ```

!!! note "OS"
    namespace: security. hierarchical management of processes isolation

## Topic 2: Hadoop cluster setup, what is inside Hadoop, Drill and Spark

!!! note "MapReduce Spill"
    spill happens when the memory is not enough. It will write the data to the disk. For MapReduce1.0, spilling will happen at least once because the output of the Mapper will be written to the disk.

!!! note "speed up a MapReduce Job"
    1. Provide shuffle with as much memory as possible  
    2. Keep enough memory for map and reduce functions  
    3. Optimize the code with respect to memory consumption  
    4. Minimize the number of spills for the map part.  
    5. Keep intermediate reduce data in memory  

!!! note "Drill"
    Parties optionally involved in a Drill job:  
    1. YARN  
    2. HDFS  
    3. Hive  
    4. HBase  
    - Drill-on-Yarn: Running Drill as a YARN application  
    - Drillbit: A Drill Process  
    - Foreman  
    #### Step 1: Start Drill on the client machine  
    ```
    drill-on-yarn.sh --site $DRILL_SITE [start/stop/status]
    ```
    #### Step 2: Upload resources to the FS and request resources for the application master
    Since we are running drill as a YARN application, we have to upload all the jars.  
    ```
    drill.yarn: drill-install: client-path: "/opt/drill_master/drill.tar.gz"
    drill.yarn: dfs: app-dir: "/user/drill"
    ```
    #### Step 3: Ask a node manager to prepare and start a container for the application master
    ```
    drill.yarn: http: port: 8048 # the admin web service
    ```
    #### Step 4: The application master contacts the resource manager to obtain more containers
    ```
    drill.yarn: cluster: count: 3 # Drill-on-YARN runs each on a seperate hosts
    ```
    #### Step 5: Request the start of Drill software on each assigned node
    Drill will have a drill-master, where the application master is.
    #### Step 6: Start a "Drill process" called a drillbit
    Drillbit is a process, drill is an application, handles queries
    ```

    ```
    #### Step 7: Each drillbit starts and registers with Zookeeper
    ```
    drill.exec: zk.connect: "59.78.36.36:2181,59.78.35.67:2181,59.78.36.88:2181" # list of zookeeper hosts
    ```
    #### Step 8: The application master checks the health of each drillbit through Zookeeper
    Each datanode should configure the zk (align with drillbit)
    ```
    tickTime=2000
    dataDir=/opt/zookeeper/data
    clientPort=2181
    initLimit=5
    syncLimit=2
    server.3=59.78.36.36:2888:3888
    server.2=59.78.36.88:2888:3888
    server.1=59.78.35.67:2888:3888
    ```
    #### Step 9: Use Zookeeper to retrieve information on the drillbits, run queries, etc.

!!! note "Drillbit"
    Foreman drillbit: the drillbit that receives the query (each drillbit has a service deployed at port 8048 and 8047, which can receive queries from the user.)   
    **Foreman drillbit** is responsible for driving the whole query: from SQL, logical plan, Optimizer, Physical Plan, Execution, Storage(if update)  
    Each drillbit contains all services and capabilities of Drill  
    Columnar execution  
    Optimistic query execution： (1) assume queries will success (2) re-run failed queries (3) never store intermediate results (only if memory is run out of)   
    Vectorization  
    Runtime Compilation  

!!! note "Drill Fragmentation"
    The physical plan is an **execution tree** with multiple fragments (JSON format).  
    Major fragments:  
    Minor fragments:  
    - Root Minor fragments: run the foreman  
    - Intermediate Minor fragments: pass aggregated results to the root fragment  
    - Leaf Minor fragments: parallel data fetching  

!!! note "Spark"
    #### About RDD
    RDD: Resilient Distributed Dataset  
    (1) Read-only (2) Partitioned  
    fork and join optimization  
    Spark DAG Scheduler  
    - Resilient: reconstruct the RDD based on partition loss  
    #### Run spark
    we only need to set the spark variables
    ```
    export YARN_CONF_DIR=$HADOOP_HOME/etc/hadoop
    export SPARK_HOME="/usr/local/spark"
    export PATH=$PATH:$SPARK_HOME/bin
    export LD_LIBRARY_PATH=${HADOOP_HOME}/lib/native
    export SPARK_DIST_CLASSPATH=$(hadoop classpath)
    ```
    ### Spark running mode:
    1. client mode: the process is running on the master (for interactive)  
    2. cluster mode: the process is running as a YARN application (fully utilize hadoop)  
    ### Why is Spark fast
    1. Distributed collections of object that can be cached in memory  
    2. Manipulated through various parallel operations  
    3. Automatically rebuild on failure  
    
!!! note "Spark RDD optimization"
    #### Transformation
    Using lazy evaluation (not executed until it sees an action, reorganize and optimize the process "fork and join"). avoid returning large datasets.  
    #### Narrow Transformations
    - `rdd.map(lambda x:x+1)`  
    - `rdd.filter()`  
    - `rdd.flatmap()`  
    #### wide transforamtions
    - `rdd.join()`  
    - `rdd.cartesian()`  
    - `rdd.groupbykey()`  
    - `rdd.reducebykey()`  
    ```python
    import pyspark.sql as sql
    spark = sql.session.SparkSession.builder.master("yarn").appName("test").getOrCreate()
    grade_rdd = spark.read.text("hdfs://hadoop-master:9000/user/hadoop/" + str(row_count) + ".csv").rdd
    grade_pairs = grade_rdd.flatMap(lambda row: [tuple(row.value.split(",")[1:3])])
    max_grade = grade_pairs.reduceByKey(lambda x, y: max([x, y]))
    max_grade.collect()
    ```
    #### Action
    `rdd.collect()`


!!! note "LXC"
    Linux Container

!!! note "Docker"
    based on LXC

!!! note "Kubernetes"
    organize small cluster of containers

    !!! success "when to use what?"
        ~5GB: powerful personal computer  
        ~100GB: Kubernetes  
        ~1PB: hadoop  

!!! note "LVM"
    Logical Volumn Manager: manage filesysten disk partition

!!! note "RPC"
    Remote Procedure Call: contact Name Node