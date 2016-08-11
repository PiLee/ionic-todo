angular.module('todo')
.factory('ProjectService',ProjectService)

function ProjectService(){
	return{
		all:function(){
			var projects=window.localStorage['myProjects'];
			if(projects){
				return angular.fromJson(projects);
			}
			return [];
		},
		save:function(projects){
			window.localStorage['myProjects'] = angular.toJson(projects);
		},
		getTask:function(activeProjectId,taskId,callback){
			var projects = angular.fromJson(window.localStorage['myProjects']);
			for(var i in projects){
				var project=projects[i];
				if(project.id===activeProjectId){
					for(var j=0,len=project.tasks.length;j<len;j++){
						if(project.tasks[j].id===taskId){
							callback(project,j);
							break;
						}
					}
				}
			}
			this.save(projects);
		},
		taskDone:function(activeProjectId,taskId){
			this.getTask(activeProjectId,taskId,function(project,j){
				project.tasks[j].done=true;
			});
		},
		taskDelete:function(activeProjectId,taskId){
			this.getTask(activeProjectId,taskId,function(project,j){
				project.tasks.splice(j,1);
			});
		},
		newProject:function(projectTitle){
			return{
				id:new Date().getTime(),
				title:projectTitle,
				tasks:[]
			};
		},
		getLastActiveIndex:function(){
			return parseInt(window.localStorage['lastActiveProject']) || 0;
		},
		setLastActiveIndex:function(index){
			window.localStorage['lastActiveProject'] = index;
		}
	}
}