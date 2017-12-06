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

Frameworks and Tools used 

- A Ubuntu 16 Linux Box. 
- Openstack Cloud platform.

Technologies
- Bootstrap - Framework for creating a cross platform user friendly UI
- Node.js and Angular.js - Web application development Javascript Framework.
- Logstash - Fetching the logs, parsing it, filtering the data and passing it to elasticsearch. 
- Elasticsearch - Storing the Log files data in its indexed database and for searching the logs with its search query API. 
also daily indexes are created for each day for different componenets.


