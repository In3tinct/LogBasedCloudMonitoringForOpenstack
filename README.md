# LogBasedCloudMonitoringForOpenstack
295B Master's project

Openstack is an open source cloud platform which is used to create private clouds. Openstack contains multiple components and their 
Administration and maintanence is very important to keep it available to the users. One needs to be continously monitor the log files 
generated. To read and manage the log files on the file system is a cumbersome job and it can eat a lot of time to find and trace the issues. 

Our application focuses on fetching the log files, parsing it, saving it and displaying it in a user friendly dashboard. 
Logs are characterizied with date, log type (Error, Warning, Debug, Trace) and Message in the logs.
we have primarily included the most important components of OpenStack namely Nova, Neutron and Cinder. 

Apart from our basic feature of continous monitoring of the componenets, Our application provides the below features as well

1) Searching the log files on the basis of Log type and Date. 

2) Sending an email to the administrator group of the platform in case there is an error in any of the components.

3) Using the trace logs to identify the specific python files responsible for the errors generated. 

4) Keeping a track of the user IP address used to login to the Openstack Horizon dashboard.

5) Logging the new instances created along with the private IP's assigned to them. 

6) A Dashboard with different quota limits like no. of instances used, Volume used, VCPU used, RAM used. 

7) Warnings are generated and displayed on the home screen if the quota is about to get filled which would warn 
the Administrator and the quotas can be managed or increased, avoiding user inconvience which may arise while creating 
instances.

Frameworks and Tools used 

- A Ubuntu 16 Linux Box with 32GB of RAM
- Openstack Cloud platform, Version- Newton

Technologies
- Bootstrap - Framework for creating a cross platform user friendly UI
- Node.js v6.11.3 and Angular.js v1 - Web application development Javascript Framework.
- Logstash - Fetching the logs, parsing it, filtering the data and passing it to elasticsearch. 
- Elasticsearch - Storing the Log files data in its indexed database and for searching the logs with its search query API. 
also daily indexes are created for each day for different componenets.

Running the project
- Import the project in any of the IDE capable of running node.js. 
- Update the modules using npm update, run npm update in the same directory as your package.json file
the packages will confer to version mentioned in package.json.
- Right click on app.js and start the server. 
by default the application runs on port 3000
- Visit http://localhost:3000/


