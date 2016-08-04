angular.module('todo')
.factory('ProjectService',ProjectService)

function ProjectService(){
	return{
		all:function(){
			var projectString=window.localStorage['myProjects'];
			if(projectString){
				return angular.fromJson(projectString);
			}
			return [];
		},
		save:function(projects){
			window.localStorage['myProjects'] = angular.toJson(projects);
		},
		newProject:function(projectTitle){
			return{
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